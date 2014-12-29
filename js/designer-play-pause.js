function war_AudioPlaylistDesignerPlayPause()
{
	var _this = this;

    _this.tab_index                  = 5;
	_this.transparency_shape         = 0;
	_this.outline_width_factor       = 3.3;
	_this.round_shape_factor         = 0.3;
	_this.scale_shape_factor         = 2;
	_this.canvas_marker_margin       = 20;
	_this.draw_margin                = 10;
	_this.button_virtual_size        = 400;
	_this.button_virtual_gap         = 20;
	_this.button_x                   = -_this.button_virtual_size / 2;
	_this.button_y                   = -_this.button_virtual_size / 2;
	_this.shape_play_top             = [ -45, -76 ];
	_this.shape_play_right           = [ +88,   0 ];
	_this.shape_play_bottom          = [ -45, +76 ];
	_this.shape_pause_top_left       = [ +13, +76 ];
	_this.shape_pause_bottom_right   = [ +40, -76 ];
	_this.trans_button_play_x        = _this.button_virtual_size / 2;
	_this.trans_button_play_y        = _this.button_virtual_size / 2;
	_this.trans_button_pause_x       = _this.button_virtual_size + _this.button_virtual_gap + _this.button_virtual_size / 2;
	_this.trans_button_pause_y       = _this.button_virtual_size / 2;
	_this.trans_hover_play_x         = _this.button_virtual_size / 2;
	_this.trans_hover_play_y         = _this.button_virtual_size + _this.button_virtual_gap + _this.button_virtual_size / 2;
	_this.trans_hover_pause_x        = _this.button_virtual_size + _this.button_virtual_gap + _this.button_virtual_size / 2;
	_this.trans_hover_pause_y        = _this.button_virtual_size + _this.button_virtual_gap + _this.button_virtual_size / 2;
    _this.is_initialised = false;

	jQuery( document ).ready( function()
	{
		_this.initTab();
		_this.initCanvas();
		_this.initColor( 'button',            'normal', 'fill' );
		_this.initColor( 'button',            'hover',  'fill' );
		_this.initColor( 'shape',             'normal', 'fill' );
		_this.initColor( 'shape',             'hover',  'fill' );
		_this.initColor( 'outline',           'normal', 'stroke' );
		_this.initColor( 'outline',           'hover',  'stroke' );
		_this.initBindShapeAndOutlineColors();
		_this.initPercent( 'outline_width' );
		_this.initPercent( 'round_button' );
		_this.initPercent( 'round_shape' );
		_this.initPercent( 'scale_shape' );
		_this.initPercent( 'transparency_button' );
		//_this.initPercent( 'transparency_shape' );
		_this.initPercent( 'zoom_user' );
		_this.initButtonSize();
		_this.initSubmit();
		_this.initPreviewButtons();
		_this.initUseDesignerButton();

		if( jQuery( '#war_sdy_pl_tabs' ).tabs( 'option', 'active' ) == _this.tab_index )
		{
			_this.design_pp_tab_is_visible = true;
			_this.setCanvas();
			_this.draw();
		}
		else
		{
			_this.design_pp_tab_is_visible = false;
		}
		
		jQuery( '#war_sdy_pl_tabs' ).on( 'tabsactivate', function( event, ui )
		{
			if( ui.newPanel.attr( 'id' ) == 'war_sdy_pl_tab_panel_designer_pp' )
			{
                var jquery_checkbox = jQuery( '#war_sdy_pl_design_pp_use_designer_button' );
                var pp_images_to_use = jQuery( 'input[name=war_sdy_pl_pp_images_to_use]:checked' ).val();
                jquery_checkbox.prop( 'checked', pp_images_to_use == 'designer' );

				_this.design_pp_tab_is_visible = true;
				_this.setCanvas();
				_this.draw();		
			}
			else
			{
				_this.design_pp_tab_is_visible = false;
			}
		} );
		
		jQuery( window ).resize( function()
		{
			if( _this.design_pp_tab_is_visible )
			{
				_this.setCanvas();
				_this.draw();
			}
		} );
        _this.is_initialised = true;
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.setCanvas = function()
{
	var _this = this;
	
	var jquery_marker_left = jQuery( '#war_sdy_pl_design_pp_canvas_marker_left' );
	var offset_left = parseInt( jquery_marker_left.offset().left );
	offset_left += _this.canvas_marker_margin;
	var canvas_width  = jQuery( window ).width() - offset_left;

	var jquery_marker_top = jQuery( '#war_sdy_pl_design_pp_canvas_marker_top' );
	var offset_top = parseInt( jquery_marker_top.offset().top );
	offset_top += _this.canvas_marker_margin;
	var canvas_height = jQuery( window ).height() - offset_top;
	
	_this.canvas_size = Math.min( canvas_width, canvas_height ) * _this.zoom_user * 2 / 100;
	_this.canvas_jquery.attr( 'width',  _this.canvas_size );
	_this.canvas_jquery.attr( 'height', _this.canvas_size );
	_this.virtual_zoom  = ( ( _this.canvas_size - 2 * _this.draw_margin ) * 100 / ( 2 * _this.button_virtual_size + _this.button_virtual_gap ) );
	_this.zoom = _this.virtual_zoom;
}

war_AudioPlaylistDesignerPlayPause.prototype.initTab = function()
{
	var _this = this;

	/*
    var jquery_zoom = jQuery( '#war_sdy_pl_design_pp_color_button_normal_bg' );
	var th = jquery_zoom.parent().parent().parent().find( 'th' );
	th.each( function( index, value )
	{
		th.css( 'width', '100px' );
	} );
	*/
}

war_AudioPlaylistDesignerPlayPause.prototype.initCanvas = function()
{
	var _this = this;
	
	_this.canvas_jquery = jQuery( '#war_canvas' );
	_this.canvas = _this.canvas_jquery.get( 0 );
	_this.canvas_ctx = _this.canvas.getContext( '2d' );
	_this.canvas_ctx.lineJoin = 'miter';
	_this.canvas_ctx.lineWidth = 1;		

	_this.canvas_save_jquery = jQuery( '#war_canvas_save' );
	_this.canvas_save = _this.canvas_save_jquery.get( 0 );
	_this.canvas_save_ctx = _this.canvas_save.getContext( '2d' );
	_this.canvas_save_ctx.lineJoin = 'miter';
	_this.canvas_save_ctx.lineWidth = 1;

	_this.canvas_final_jquery = jQuery( '#war_canvas_final' );
	_this.canvas_final = _this.canvas_final_jquery.get( 0 );
	_this.canvas_final_ctx = _this.canvas_final.getContext( '2d' );
	_this.canvas_final_ctx.lineJoin = 'miter';
	_this.canvas_final_ctx.lineWidth = 1;
}

war_AudioPlaylistDesignerPlayPause.prototype.initColor = function( item, mode, what )
{
	this.initColorBaseAny( item, mode, what, 'red' );
	this.initColorBaseAny( item, mode, what, 'green' );
	this.initColorBaseAny( item, mode, what, 'blue' );
	this.initColorHex( item, mode, what );	
}

war_AudioPlaylistDesignerPlayPause.prototype.initColorHex = function( component, button_mode, draw_item )
{
	var _this = this;
	
  var jquery_color = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item );
  var hex_color_str = jquery_color.val();
  var jquery_validation_error = jQuery( '#war_sdy_pl_design_pp_color_'+ component + '_' + button_mode + '_' + draw_item + '_validation_error' );
  if( this.setBaseColorsWithHexCode( component, button_mode, draw_item, hex_color_str ) )
  {
  		eval( '_this.color_' + component + '_' + button_mode + '_' + draw_item + '= hex_color_str' );
  }
	else	
  {
  	jquery_validation_error.html( 'Invalid input: ' + hex_color_str );
  }
  
	jquery_color.change( function( event )
	{
		var hex_color_str = this.value;
		var value = _this.setBaseColorsWithHexCode( component, button_mode, draw_item, hex_color_str );
		if( ! value )
		{
  		jquery_validation_error.html( 'Invalid input: ' + hex_color_str );
  		jquery_color.val( eval( '_this.color_' + component + '_' + button_mode + '_' + draw_item ) );
		}
		else
		{
  		jquery_validation_error.html( '' );
  		eval( '_this.color_' + component + '_' + button_mode + '_' + draw_item + '= hex_color_str' );
			this.value = value;
		  _this.draw();
		}
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.initColorBaseAny = function( component, button_mode, draw_item, base_color_name )
{
	var _this = this;
	
  var jquery_color_base = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_' + base_color_name );
  var jquery_color_base_slider = jQuery( '#war_sdy_pl_design_pp_slider_color_' + component + '_' + button_mode + '_' + draw_item + '_' + base_color_name );
  var jquery_color = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item );

  var hex_color = jquery_color.val();
  var base_color = _this.make3( hexToBaseColor( hex_color ) );
  eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_' + base_color_name + '= base_color' );
  
	function componentToHex( c ) 
	{
		var i = parseInt( c );
    var hex = i.toString( 16 );
    return hex.length == 1 ? '0' + hex : hex;
	}
	
	function rgbToHex( r, g, b ) 
	{
    return '#' + componentToHex( r ) + componentToHex( g ) + componentToHex( b );
	}
	
	function hexToBaseColor( hex_global_value )
	{
		switch( base_color_name )
		{
			case 'red':
				var hex_base_value = hex_global_value.substring( 1, 3 );
				break;

			case 'green':
				var hex_base_value = hex_global_value.substring( 3, 5 );
				break;

			case 'blue':
				var hex_base_value = hex_global_value.substring( 5 );
				break;
		}
		var dec_base_value = parseInt( '0x' + hex_base_value );
		
		return dec_base_value;
	}

  jquery_color_base_slider.slider( 
	{ 
		min:     0,
		max:     255,
		value:   100,
		range:   'min',
		animate: true,
		slide:   function( event, ui )
		       	 {
		       		 jquery_color_base.val( _this.make3( ui.value ) );
		       		 jquery_color_base.change();

							 var red   = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_red'   ).val();
							 var green = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_green' ).val();
							 var blue  = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_blue'  ).val();
							 jquery_color.val( rgbToHex( red, green, blue ) );
		       	 }
  } );

	jquery_color_base.change( function()
	{
	  var jquery_validation_error = jQuery( '#war_sdy_pl_design_pp_color_'+ component + '_' + button_mode + '_' + draw_item + '_validation_error' );
		var color_str = this.value;
		var color = parseInt( color_str );
		if( color_str.match( /^\d+$/ ) && color < 256 )
		{
	  	eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_' + base_color_name + '= _this.make3( color_str )' );
	  	jquery_validation_error.html( '' );
	
			var red   = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_red'   ).val();
			var green = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_green' ).val();
			var blue  = jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_blue'  ).val();
			var color_hex = rgbToHex( red, green, blue );
			jquery_color.val( color_hex );
	  	eval( '_this.color_' + component + '_' + button_mode + '_' + draw_item + '= color_hex' );	
			jquery_color_base_slider.slider( 'value', this.value );
			this.value = _this.make3( color );
	
			_this.draw();
	  }
	  else
	  {
	  	jquery_validation_error.html( '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
	  																'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
	  	                              'Invalid input: ' + color_str );
	  	jquery_color_base.val( eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_' + base_color_name ) );
	  }
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.getRgbObject = function( hex_color_str )
{
	var _this = this;

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex_color_str );
  return result ? 
  {
  	red:   parseInt( result[ 1 ], 16 ),
  	green: parseInt( result[ 2 ], 16 ),
  	blue:  parseInt( result[ 3 ], 16 )
  } : null;
}

war_AudioPlaylistDesignerPlayPause.prototype.setBaseColorsWithHexCode = function( component, button_mode, draw_item, hex_color_str )
{
	var _this = this;

	var rgb_obj = this.getRgbObject( hex_color_str );
  if( rgb_obj == null )
  {
  	return false;
  }
  else
  {
  	if( hex_color_str.indexOf( '#' ) != 0 ) 
  	{
  		hex_color_str = '#' + hex_color_str;
  	}
  	
  	var red   = _this.make3( rgb_obj.red );
  	var green = _this.make3( rgb_obj.green );
  	var blue  = _this.make3( rgb_obj.blue );
 	
		jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_red' ).val(   red );
		jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_green' ).val( green );
		jQuery( '#war_sdy_pl_design_pp_color_' + component + '_' + button_mode + '_' + draw_item + '_blue' ).val(  blue );

		jQuery( '#war_sdy_pl_design_pp_slider_color_' + component + '_' + button_mode + '_' + draw_item + '_red'   ).slider( 'value', red );
		jQuery( '#war_sdy_pl_design_pp_slider_color_' + component + '_' + button_mode + '_' + draw_item + '_green' ).slider( 'value', green );
		jQuery( '#war_sdy_pl_design_pp_slider_color_' + component + '_' + button_mode + '_' + draw_item + '_blue'  ).slider( 'value', blue );
		
		eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_red   = red' ); 
		eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_green = green' ); 
		eval( '_this.' + component + '_' + button_mode + '_' + draw_item + '_blue  = blue' );

	  return hex_color_str;
  }
}

war_AudioPlaylistDesignerPlayPause.prototype.initPercent = function( attribute )
{
	var _this = this;

  var jquery_attr = jQuery( '#war_sdy_pl_design_pp_percent_' + attribute );
  var jquery_attr_slider = jQuery( '#war_sdy_pl_design_pp_slider_percent_' + attribute );
  var jquery_validation_error = jQuery( '#war_sdy_pl_design_pp_percent_'+ attribute + '_validation_error' );
	var percent_str = jquery_attr.val();
	var percent = parseInt( percent_str );
	if( percent_str.match( /^\d+$/ ) && percent < 101 )
	{
		eval( '_this.' + attribute + '= percent' );
	}
	else
	{
		jquery_validation_error.html( 'Invalid input: ' + percent_str );
	}
	
  jquery_attr_slider.slider(
	{
		min:    0,
		max:    100,
		value:  percent,
		range:  'min',
		animate: true,
		slide:  function( event, ui )
		       	{
							jquery_validation_error.html( '' );
		       		jquery_attr.val( _this.make3( ui.value ) );
 		       		eval( '_this.' + attribute + '= ui.value' );
							_this.doDraw( attribute );
		       	}
	} ); 

	jquery_attr.change( function()
	{
		var percent_str = this.value;
		var percent = parseInt( percent_str );
		if( percent_str.match( /^\d+$/ ) && percent < 101 )
		{
			jquery_validation_error.html( '' );
			jquery_attr_slider.slider( 'value', this.value );
 			eval( '_this.' + attribute + '= this.value' );
 			this.value = _this.make3( this.value );
			_this.doDraw( attribute );
		}
		else
		{
			jquery_validation_error.html( 'Invalid input: ' + percent_str );
 			eval( 'this.value = _this.make3( _this.' + attribute + ')' );
		}
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.doDraw = function( attribute )
{
	var _this = this;

	if( attribute == 'zoom_user' )
	{
		_this.setCanvas();
	}
	_this.draw();
}

war_AudioPlaylistDesignerPlayPause.prototype.initButtonSize = function()
{
	var _this = this;

  var jquery_size             = jQuery( '#war_sdy_pl_design_pp_pixel_button_size' );
  var jquery_size_2           = jQuery( '#war_sdy_pl_design_pp_pixel_button_size_2' );
  var jquery_size_slider      = jQuery( '#war_sdy_pl_design_pp_slider_pixel_button_size' );
  var jquery_view_real_size   = jQuery( '#war_sdy_pl_design_pp_view_real_size' );
  var jquery_validation_error = jQuery( '#war_sdy_pl_design_pp_pixel_button_size_validation_error' );
  
  var button_size_str = jquery_size.val();
	var button_size = parseInt( button_size_str );
	if( button_size_str.match( /^\d+$/ ) && button_size < 401 )
	{
		button_size = parseInt( button_size );
		_this.button_size = button_size;
	}
	else
	{
		jquery_validation_error.html( 'Invalid input: ' + button_size_str );
	}
	
  jquery_size_slider.slider(
	{
		min:    0,
		max:    400,
		value:  button_size,
		range:  'min',
		animate: true,
		slide:  function( event, ui )
		       	{
							jquery_validation_error.html( '' );
							var value = _this.make3( ui.value );
							jquery_size.val( value );
		       		jquery_size_2.val( value );
 		       		_this.button_size = parseInt( ui.value );
 						  if( jquery_view_real_size.prop( 'checked' ) )
						  {
			       		var current_button_size = jQuery( this ).slider( 'value' );
			       		var new_button_size = ui.value;
			       		if( Math.abs( new_button_size - current_button_size ) > 15 )
			       		{
			       			_this.animateZoom( current_button_size, new_button_size );
			       		}
			       		else
			       		{
						  		_this.zoom = 100 * new_button_size / _this.button_virtual_size;
									_this.draw();
						  	}
						  }
		       	}
	} ); 
	
	jquery_size.change( function()
	{	
		var button_size_str = this.value;
		var button_size = parseInt( button_size_str );	
		if( button_size_str.match( /^\d+$/ ) && button_size < 401 )
		{
			jquery_validation_error.html( '' );
			var old_button_size = parseInt( jquery_size_slider.slider( 'value' ) );
			var new_button_size = button_size;
			_this.button_size   = new_button_size;
	
			jquery_size_slider.slider( 'value', new_button_size );
		  if( jquery_view_real_size.prop( 'checked' ) )
		  {
				_this.animateZoom( old_button_size, new_button_size );
			}
			this.value = _this.make3( this.value );
   		jquery_size_2.val( this.value );			
			_this.refreshPreviewHere();
		}
		else
		{
			jquery_validation_error.html( '&nbsp;&nbsp;Invalid input: ' + this.value );
 			this.value = _this.make3( _this.button_size );
		}
	} );
	
	jquery_size_2.change( function()
	{	
		var button_size_str = this.value;
		var button_size = parseInt( button_size_str );	
		if( button_size_str.match( /^\d+$/ ) && button_size < 401 )
		{
			jquery_validation_error.html( '' );
			var old_button_size = parseInt( jquery_size_slider.slider( 'value' ) );
			var new_button_size = button_size;
			_this.button_size   = new_button_size;
	
			jquery_size_slider.slider( 'value', new_button_size );
		  if( jquery_view_real_size.prop( 'checked' ) )
		  {
				_this.animateZoom( old_button_size, new_button_size );
			}
			this.value = _this.make3( this.value );
   		jquery_size.val( this.value );			
			_this.refreshPreviewHere();
		}
		else
		{
			jquery_validation_error.html( '&nbsp;&nbsp;Invalid input: ' + this.value );
 			this.value = _this.make3( _this.button_size );
		}
	} );
	
  jquery_view_real_size.change( function()
  {
	  var display_virtual_size = parseInt( _this.button_virtual_size * _this.virtual_zoom / 100 );
	  var button_size = jQuery( '#war_sdy_pl_design_pp_pixel_button_size' ).val();

	  if( jquery_view_real_size.prop( 'checked' ) )
	  {
	 		_this.animateZoom( display_virtual_size, button_size );
	  }
	  else
	  {
	  	_this.animateZoom( button_size, display_virtual_size );
	  }
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.animateZoom = function( button_size, new_button_size )
{
	var _this = this;
	
	function iterateZoom()
	{
		if( button_size < new_button_size )
		{
			button_size++;
		}
		else if( button_size > new_button_size )
		{
			button_size--;
		}
		else
		{
			_this.zoom = 100 * new_button_size / _this.button_virtual_size;
			_this.draw();
			clearInterval( interval_id );
			return;
		}
		_this.zoom = 100 * button_size / _this.button_virtual_size;
		_this.draw();
	}
	
	var interval_id = setInterval( iterateZoom, 1 );
}

war_AudioPlaylistDesignerPlayPause.prototype.initSubmit = function()
{
	var _this = this;
	
	var jquery_submit = jQuery( '#submit' );
	jquery_submit.click( function()
	{
		var use_designer_button = jQuery( '#war_sdy_pl_pp_images_to_use_designer' ).prop( 'checked' );
		
		_this.saveButtonsImgDataForSubmit();
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.saveButtonsImgDataForPreview = function()
{
	var _this = this;
	
	// buttons in canvas_save are drawn in real size
	var save_zoom = _this.zoom;
	_this.zoom = 100 * _this.button_size / _this.button_virtual_size;
	var gap = _this.zoom * _this.button_virtual_gap / 100;
	var size = parseInt( 2 * _this.draw_margin + 2 * _this.button_size + gap );
	_this.canvas_save_jquery.attr( 'width',  size );
	_this.canvas_save_jquery.attr( 'height', size );
	_this.canvas_save_size = size;
	_this.draw( 'save' );
	_this.zoom = save_zoom;

	_this.draw( 'final_grid' );
	_this.img_data_grid = _this.canvas_final.toDataURL();
	
	_this.canvas_final_jquery.attr( 'width',  _this.button_size );
	_this.canvas_final_jquery.attr( 'height', _this.button_size );

    // Play Normal
    var data = _this.canvas_save_ctx.getImageData( _this.draw_margin,
                                                   _this.draw_margin,
                                                                                             _this.button_size, _this.button_size );
    _this.canvas_final_ctx.putImageData( data, 0, 0 );
    _this.img_data_play_normal = _this.canvas_final.toDataURL();

    // Play Hover
    var data = _this.canvas_save_ctx.getImageData( _this.draw_margin,
                                                   _this.draw_margin + _this.button_size + gap,
                                                                                             _this.button_size, _this.button_size );
    _this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
    _this.canvas_final_ctx.putImageData( data, 0, 0 );
    _this.img_data_play_hover = _this.canvas_final.toDataURL();

    // Pause Normal
    var data = _this.canvas_save_ctx.getImageData( _this.draw_margin + _this.button_size + gap,
                                                   _this.draw_margin,
                                                                                             _this.button_size, _this.button_size );
    _this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
    _this.canvas_final_ctx.putImageData( data, 0, 0 );
    _this.img_data_pause_normal = _this.canvas_final.toDataURL();

    // Pause Hover
    var data = _this.canvas_save_ctx.getImageData( _this.draw_margin + _this.button_size + gap,
                                                   _this.draw_margin + _this.button_size + gap,
                                                                                             _this.button_size, _this.button_size );
    _this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
    _this.canvas_final_ctx.putImageData( data, 0, 0 );
    _this.img_data_pause_hover = _this.canvas_final.toDataURL();

}

war_AudioPlaylistDesignerPlayPause.prototype.saveButtonsImgDataForSubmit = function()
{
	var _this = this;
	
	// buttons in canvas_save are drawn in real size, then each button is individually extracted and saved in canvas_final
	var save_zoom = _this.zoom;
	_this.zoom = 100 * _this.button_size / _this.button_virtual_size;
	var gap = _this.zoom * _this.button_virtual_gap / 100;
	var size = parseInt( 2 * _this.draw_margin + 2 * _this.button_size + gap );
	_this.canvas_save_jquery.attr( 'width',  size );
	_this.canvas_save_jquery.attr( 'height', size );
	_this.canvas_save_size = size;
	_this.draw( 'save' );
	_this.zoom = save_zoom;
	
	var jquery_img_data_play_normal  = jQuery( '#war_sdy_pl_design_pp_img_data_play_normal' );
	var jquery_img_data_play_hover   = jQuery( '#war_sdy_pl_design_pp_img_data_play_hover' );
	var jquery_img_data_pause_normal = jQuery( '#war_sdy_pl_design_pp_img_data_pause_normal' );
	var jquery_img_data_pause_hover  = jQuery( '#war_sdy_pl_design_pp_img_data_pause_hover' );
	
	_this.canvas_final_jquery.attr( 'width',  _this.button_size );
	_this.canvas_final_jquery.attr( 'height', _this.button_size );

	// Play Normal
	var data = _this.canvas_save_ctx.getImageData( _this.draw_margin, 
	                                               _this.draw_margin, 
																				     		 _this.button_size, _this.button_size );
	_this.canvas_final_ctx.putImageData( data, 0, 0 );
	jquery_img_data_play_normal.val( _this.canvas_final.toDataURL() );

	// Play Hover
	var data = _this.canvas_save_ctx.getImageData( _this.draw_margin, 
	                                               _this.draw_margin + _this.button_size + gap, 
																						     _this.button_size, _this.button_size );
	_this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
	_this.canvas_final_ctx.putImageData( data, 0, 0 );
	jquery_img_data_play_hover.val( _this.canvas_final.toDataURL() );
	
	// Pause Normal
	var data = _this.canvas_save_ctx.getImageData( _this.draw_margin + _this.button_size + gap, 
	                                               _this.draw_margin, 
																		     				 _this.button_size, _this.button_size );
	_this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
	_this.canvas_final_ctx.putImageData( data, 0, 0 );
	jquery_img_data_pause_normal.val( _this.canvas_final.toDataURL() );

	// Pause Hover
	var data = _this.canvas_save_ctx.getImageData( _this.draw_margin + _this.button_size + gap, 
	                                               _this.draw_margin + _this.button_size + gap, 
																		    				 _this.button_size, _this.button_size );
	_this.canvas_final_ctx.clearRect( 0, 0, _this.button_size, _this.button_size );
	_this.canvas_final_ctx.putImageData( data, 0, 0 );
	jquery_img_data_pause_hover.val( _this.canvas_final.toDataURL() );
}

war_AudioPlaylistDesignerPlayPause.prototype.initPreviewButtons = function()
{
	var _this = this;

	_this.saveButtonsImgDataForPreview();
	
	var jquery_button_preview_in_context = jQuery( '#war_sdy_pl_design_pp_button_preview_in_context' );
	var jquery_page_preview_url          = jQuery( '#war_sdy_pl_design_pp_page_preview_url' );
	
	jquery_button_preview_in_context.click( function ()
	{
		_this.saveButtonsImgDataForPreview();
		var page_url = jquery_page_preview_url.val();
		window.open( page_url + '?war_sdy_pl_preview=designer', 'sdy_pl_preview' );
	} );

	var jquery_button_preview_here = jQuery( '#war_sdy_pl_design_pp_button_preview_here' );
	var jquery_img_preview_here    = jQuery( '#war_sdy_pl_design_pp_img_preview_here' );
	
	jquery_img_preview_here.css( 'background-image', 'url(' + _this.img_data_grid + ')' );
	jquery_img_preview_here.attr( 'src', _this.img_data_play_normal );
	
	var hovering    = false;
	var is_play_img = true;
	
	jquery_button_preview_here.click( function ()
	{
		_this.refreshPreviewHere();
	} );

	jquery_img_preview_here.hover( 
		function ()
		{
			hovering = true;
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_data_play_hover );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_data_pause_hover );
			}
		},
		function ()
		{
			hovering = false;
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_data_play_normal );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_data_pause_normal );
			}
		} );

	jquery_img_preview_here.click( function ()
	{
		if( is_play_img )
		{
			jquery_img_preview_here.attr( 'src', _this.img_data_pause_hover );
			is_play_img = false;
		}
		else
		{
			jquery_img_preview_here.attr( 'src', _this.img_data_play_hover );
			is_play_img = true;
		}
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.refreshPreviewHere = function()
{
	var _this = this;
	
	_this.saveButtonsImgDataForPreview();
	var jquery_img_preview_here = jQuery( '#war_sdy_pl_design_pp_img_preview_here' );
	jquery_img_preview_here.attr( 'src', _this.img_data_play_normal );
	jquery_img_preview_here.css( 'background-image', 'url(' + _this.img_data_grid + ')' );
}

war_AudioPlaylistDesignerPlayPause.prototype.draw_buttons = function( ctx, button_type, button_mode )
{
	var _this = this;

	ctx.save();
	
	if( button_type == 'play' )
	{
		var trans_button_x = _this.trans_button_play_x;
		var trans_button_y = _this.trans_button_play_y;
		var trans_hover_x  = _this.trans_hover_play_x;
		var trans_hover_y  = _this.trans_hover_play_y;
	}
	else // button_type == 'pause'
	{
		var trans_button_x = _this.trans_button_pause_x;
		var trans_button_y = _this.trans_button_pause_y;
		var trans_hover_x  = _this.trans_hover_pause_x;
		var trans_hover_y  = _this.trans_hover_pause_y;
	}
		
	if( button_mode == 'normal' )
	{
		ctx.translate( _this.draw_margin + trans_button_x * _this.zoom / 100, 
		               _this.draw_margin + trans_button_y * _this.zoom / 100 );

		var button_fill_red   = _this.button_normal_fill_red;
		var button_fill_green = _this.button_normal_fill_green;
		var button_fill_blue  = _this.button_normal_fill_blue;
		var shape_fill_red    = _this.shape_normal_fill_red;
		var shape_fill_green  = _this.shape_normal_fill_green;
		var shape_fill_blue   = _this.shape_normal_fill_blue;
		if( _this.bind_shape_and_outline_colors )
		{
			var outline_stroke_red    = _this.shape_normal_fill_red;
			var outline_stroke_green  = _this.shape_normal_fill_green;
			var outline_stroke_blue   = _this.shape_normal_fill_blue;
		}
		else
		{
			var outline_stroke_red    = _this.outline_normal_stroke_red;
			var outline_stroke_green  = _this.outline_normal_stroke_green;
			var outline_stroke_blue   = _this.outline_normal_stroke_blue;
		}
	}
	else // button_mode == 'hover'
	{
		ctx.translate( _this.draw_margin + trans_hover_x * _this.zoom / 100, 
		               _this.draw_margin + trans_hover_y * _this.zoom / 100 );

		var button_fill_red   = _this.button_hover_fill_red;
		var button_fill_green = _this.button_hover_fill_green;
		var button_fill_blue  = _this.button_hover_fill_blue;
		var shape_fill_red    = _this.shape_hover_fill_red;
		var shape_fill_green  = _this.shape_hover_fill_green;
		var shape_fill_blue   = _this.shape_hover_fill_blue;
		if( _this.bind_shape_and_outline_colors )
		{
			var outline_stroke_red    = _this.shape_hover_fill_red;
			var outline_stroke_green  = _this.shape_hover_fill_green;
			var outline_stroke_blue   = _this.shape_hover_fill_blue;
		}
		else
		{
			var outline_stroke_red    = _this.outline_hover_stroke_red;
			var outline_stroke_green  = _this.outline_hover_stroke_green;
			var outline_stroke_blue   = _this.outline_hover_stroke_blue;
		}
	}
		
	ctx.lineWidth     = ( ( _this.outline_width / 100 ) * _this.button_virtual_size / _this.outline_width_factor ) * _this.zoom / 100;
	var button_radius = ( _this.round_button / 100 ) * _this.button_virtual_size / 2;
	var button_color  = 'rgba(' + button_fill_red + ',' + button_fill_green + ',' + button_fill_blue + ',' + ( 100 - _this.transparency_button ) / 100 + ')';
	var outline_color = 'rgba(' + outline_stroke_red + ',' + outline_stroke_green + ',' + outline_stroke_blue + ',' + ( 100 - _this.transparency_shape ) / 100 + ')';
	ctx.fillStyle   = button_color;
	ctx.strokeStyle = _this.outline_width > 0 ? outline_color : button_color;
	ctx.roundRect( _this.button_x * _this.zoom / 100,
	               _this.button_y * _this.zoom / 100, 
	               _this.button_virtual_size * _this.zoom / 100, 
	               _this.button_virtual_size * _this.zoom / 100, 
	               button_radius * _this.zoom / 100 );
	ctx.fill();
	ctx.stroke();
	ctx.lineWidth = 1;

  var shape_radius = ( _this.round_shape * _this.round_shape_factor / 100 ) * _this.button_virtual_size / 2;
	var shape_color  = 'rgba(' + shape_fill_red + ',' + shape_fill_green + ',' + shape_fill_blue + ',' + ( 100 - _this.transparency_shape ) / 100 + ')';
	ctx.fillStyle   = shape_color;
	ctx.strokeStyle = shape_color;
	ctx.lineJoin = 'round';
	ctx.lineWidth = shape_radius * _this.zoom / 100;
	ctx.scale( _this.scale_shape * _this.scale_shape_factor / 100, _this.scale_shape * _this.scale_shape_factor / 100 );

  if( button_type == 'play' )
	{
		ctx.beginPath();
		ctx.moveTo( _this.shape_play_top[ 0 ] * _this.zoom / 100, _this.shape_play_top[ 1 ] * _this.zoom / 100 );
		ctx.lineTo( _this.shape_play_right[ 0 ] * _this.zoom / 100, _this.shape_play_right[ 1 ] * _this.zoom / 100 );
		ctx.lineTo( _this.shape_play_bottom[ 0 ] * _this.zoom / 100, _this.shape_play_bottom[ 1 ] * _this.zoom / 100 );
	}
	else  // button_type == 'pause'
	{
		var top_left = new Array();
		var bottom_right = new Array();
		top_left[ 0 ]     = ( _this.shape_pause_top_left[ 0 ] + shape_radius / 2 ) * _this.zoom / 100;
		top_left[ 1 ]     = _this.shape_pause_top_left[ 1 ]     * _this.zoom / 100;
		bottom_right[ 0 ] = _this.shape_pause_bottom_right[ 0 ] * _this.zoom / 100;
		bottom_right[ 1 ] = _this.shape_pause_bottom_right[ 1 ] * _this.zoom / 100;

		ctx.beginPath();
		ctx.moveTo( top_left[ 0 ],     top_left[ 1 ] );
		ctx.lineTo( bottom_right[ 0 ], top_left[ 1 ] );
		ctx.lineTo( bottom_right[ 0 ], bottom_right[ 1 ] );
		ctx.lineTo( top_left[ 0 ],     bottom_right[ 1 ] );
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo( -top_left[ 0 ],     top_left[ 1 ] );
		ctx.lineTo( -bottom_right[ 0 ], top_left[ 1 ] );
		ctx.lineTo( -bottom_right[ 0 ], bottom_right[ 1 ] );
		ctx.lineTo( -top_left[ 0 ],     bottom_right[ 1 ] );
	}
  
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();	
}

war_AudioPlaylistDesignerPlayPause.prototype.draw_pause = function( ctx, button_mode )
{
	var _this = this;

	ctx.save();
	if( button_mode == 'normal' )
	{
		ctx.translate(  _this.draw_margin + _this.trans_button_pause_x * _this.zoom / 100, 
		                _this.draw_margin + _this.trans_button_pause_y * _this.zoom / 100 );

		var button_fill_red   = _this.button_normal_fill_red;
		var button_fill_green = _this.button_normal_fill_green;
		var button_fill_blue  = _this.button_normal_fill_blue;
		var shape_fill_red    = _this.shape_normal_fill_red;
		var shape_fill_green  = _this.shape_normal_fill_green;
		var shape_fill_blue   = _this.shape_normal_fill_blue;
		if( _this.bind_shape_and_outline_colors )
		{
			var outline_stroke_red    = _this.shape_normal_fill_red;
			var outline_stroke_green  = _this.shape_normal_fill_green;
			var outline_stroke_blue   = _this.shape_normal_fill_blue;
		}
		else
		{
			var outline_stroke_red    = _this.outline_normal_stroke_red;
			var outline_stroke_green  = _this.outline_normal_stroke_green;
			var outline_stroke_blue   = _this.outline_normal_stroke_blue;
		}
	}
	else if( button_mode == 'hover' )
	{
		ctx.translate(  this.draw_margin + _this.trans_hover_pause_x * _this.zoom / 100, 
		                _this.draw_margin + _this.trans_hover_pause_y * _this.zoom / 100 );

		var button_fill_red   = _this.button_hover_fill_red;
		var button_fill_green = _this.button_hover_fill_green;
		var button_fill_blue  = _this.button_hover_fill_blue;
		var shape_fill_red    = _this.shape_hover_fill_red;
		var shape_fill_green  = _this.shape_hover_fill_green;
		var shape_fill_blue   = _this.shape_hover_fill_blue;
		if( _this.bind_shape_and_outline_colors )
		{
			var outline_stroke_red    = _this.shape_hover_fill_red;
			var outline_stroke_green  = _this.shape_hover_fill_green;
			var outline_stroke_blue   = _this.shape_hover_fill_blue;
		}
		else
		{
			var outline_stroke_red    = _this.outline_hover_stroke_red;
			var outline_stroke_green  = _this.outline_hover_stroke_green;
			var outline_stroke_blue   = _this.outline_hover_stroke_blue;
		}
	}
	
	ctx.lineWidth     = ( ( _this.outline_width / 100 ) * _this.button_virtual_size / _this.outline_width_factor ) * _this.zoom / 100;
	var button_radius = ( _this.round_button / 100 ) * _this.button_virtual_size / 2;
	var button_color  = 'rgba(' + button_fill_red + ',' + button_fill_green + ',' + button_fill_blue + ',' + ( 100 - _this.transparency_button ) / 100 + ')';
	var outline_color = 'rgba(' + outline_stroke_red + ',' + outline_stroke_green + ',' + outline_stroke_blue + ',' + ( 100 - _this.transparency_button ) / 100 + ')';
	var shape_color   = 'rgba(' + shape_fill_red + ',' + shape_fill_green + ',' + shape_fill_blue + ',' + ( 100 - _this.transparency_shape ) / 100 + ')';
	ctx.fillStyle   = button_color;
	ctx.strokeStyle = _this.outline_width > 0 ? outline_color : button_color;
	ctx.roundRect( _this.button_x * _this.zoom / 100, 
	               _this.button_y * _this.zoom / 100, 
	               _this.button_virtual_size * _this.zoom / 100, 
	               _this.button_virtual_size * _this.zoom / 100, 
	               button_radius * _this.zoom / 100 );
	ctx.fill();
	ctx.stroke();
	ctx.lineWidth = 1;
}

war_AudioPlaylistDesignerPlayPause.prototype.draw = function( ctx_str )
{
	var _this = this;
	
	if( ctx_str === undefined )
	{
		ctx = _this.canvas_ctx;
		var canvas_size  = _this.canvas_size;
		ctx.drawGrid( canvas_size );
	}
	else if( ctx_str == 'save' )
	{
		ctx = _this.canvas_save_ctx;
		var canvas_size  = _this.canvas_save_size;
		ctx.clearRect( 0, 0, canvas_size, canvas_size );
	}
	else if( ctx_str == 'final_grid' )
	{
		ctx = _this.canvas_final_ctx;
		var canvas_size  = _this.button_size + 10;
		ctx.drawGrid( canvas_size );
		return;
	}
	
	_this.draw_buttons( ctx, 'play',  'normal' );
	_this.draw_buttons( ctx, 'pause', 'normal' );
	_this.draw_buttons( ctx, 'play',  'hover' );
	_this.draw_buttons( ctx, 'pause', 'hover' );
}

war_AudioPlaylistDesignerPlayPause.prototype.make3 = function( value )
{
	var _this = this;
	
	value = parseInt( value );
 	var value = value < 100 ? '0' + value : value;
 	value = value <  10 ? '0' + value : value;
 	
 	return value;
}

CanvasRenderingContext2D.prototype.roundRect = function( x, y, width, height, radius ) 
{
	if( this.lineWidth > width )  this.lineWidth = width;
	if( this.lineWidth > height ) this.lineWidth = height;
	x += this.lineWidth / 2;
	y += this.lineWidth / 2;
	width  -= this.lineWidth;
	height -= this.lineWidth;
  if ( width  < 2 * radius ) radius = width  / 2;
  if ( height < 2 * radius ) radius = height / 2;
  this.beginPath();
  this.moveTo( x + radius, y );
  this.arcTo( x + width, y,          x + width, y + height, radius );
  this.arcTo( x + width, y + height, x,         y + height, radius );
  this.arcTo( x,         y + height, x,         y,          radius );
  this.arcTo( x,         y,          x + width, y,          radius );
  this.closePath();
  return this;
}

CanvasRenderingContext2D.prototype.drawGrid = function( size, grid_type_str ) 
{
	this.clearRect( 0, 0, size, size );

	this.strokeStyle = '#aaaaaa';
	this.lineWidth = 1;

	if( size > 400 )
	{
		var step = parseInt( size / 30 );
	}
	else if( size > 100 )
	{
		var step = parseInt( size / 20 );
	}
	else if( size > 60 )
	{
		var step = parseInt( size / 10 );
	}
	else if( size > 30 )
	{
		var step = parseInt( size / 7 );
	}
	else
	{
		var step = parseInt( size / 3 );
	}
		
	var size_1 = size - 2;
	var size_2 = size * 2;
	if( grid_type_str === undefined )
	{
		for( var i = 0; i < size_1; i += step )
		{
			this.moveTo( i, 0 );
			this.lineTo( i, size );
			this.moveTo( 0, i );
			this.lineTo( size, i );
		}
	}
	else
	{
		this.moveTo( 0, 0 );
		this.lineTo( size, size )
			
		for( var i = 0; i < size_2; i += step )
		{
			this.moveTo( 0, i );
			this.lineTo( i, 0 );
			if( i <= size )
			{
				this.moveTo( 0, i );
				this.lineTo( size, size + i );
				this.moveTo( i, 0 );
				this.lineTo( size, size - i );
			}
		}
	}
	this.stroke();
	
  return this;
}

war_AudioPlaylistDesignerPlayPause.prototype.initUseDesignerButton = function()
{
	_this = this;

	var jquery_checkbox_use_designer = jQuery( '#war_sdy_pl_design_pp_use_designer_button' );

	if( war_sdy_pl_admin.pp_images_to_use == 'designer' )
	{
		jquery_checkbox_use_designer.prop( 'checked', true );
	}

    jquery_checkbox_use_designer.change( function()
	{
		if( jquery_checkbox_use_designer.prop( 'checked' ) )
		{
			jQuery( '#war_sdy_pl_pp_images_to_use_designer' ).prop( 'checked', true );
			war_sdy_pl_admin.pp_images_to_use = 'designer';
		}
		else
		{
			jQuery( '#war_sdy_pl_pp_images_to_use_default' ).prop( 'checked', true );
			war_sdy_pl_admin.pp_images_to_use = 'default';
		}
	} );
}

war_AudioPlaylistDesignerPlayPause.prototype.initBindShapeAndOutlineColors = function()
{
	_this = this;

	var jquery_checkbox = jQuery( '#war_sdy_pl_design_pp_bind_shape_and_outline_colors' );
	_this.bind_shape_and_outline_colors = jquery_checkbox.prop( 'checked' );
	
  var jquery_color_outline_normal = jQuery( '#war_sdy_pl_design_pp_color_outline_normal_stroke' );
  var jquery_color_outline_hover  = jQuery( '#war_sdy_pl_design_pp_color_outline_hover_stroke' );

	_this.bind_shape_and_outline_colors = jquery_checkbox.prop( 'checked' );
	if( _this.bind_shape_and_outline_colors )
	{
		jquery_color_outline_normal.parent().parent().hide();
		jquery_color_outline_hover.parent().parent().hide();
	}
	else
	{
		jquery_color_outline_normal.parent().parent().show();
		jquery_color_outline_hover.parent().parent().show();
	}

	jquery_checkbox.change( function()
	{
		_this.bind_shape_and_outline_colors = jquery_checkbox.prop( 'checked' );
		if( _this.bind_shape_and_outline_colors )
		{
			jquery_color_outline_normal.parent().parent().hide();
			jquery_color_outline_hover.parent().parent().hide();
		}
		else
		{
			jquery_color_outline_normal.parent().parent().show();
			jquery_color_outline_hover.parent().parent().show();
		}
		_this.draw();
	} );
}