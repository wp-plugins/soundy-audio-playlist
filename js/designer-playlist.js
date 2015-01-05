function war_AudioPlaylistDesignerPlaylist()
{
	var _this = this;

    _this.tab_index                         = 2;
    _this.preview_marker_margin_width       = 70;
    _this.preview_marker_margin_height      = 20;

    jQuery( document ).ready( function()
	{
		_this.initTab();
        _this.initPreview();
        _this.initPlayPauseButton();
		_this.initColor( 'bg_header_footer' );
        _this.initColor( 'txt_header_footer' );
        _this.initColor( 'slider_bar' );
        _this.initColor( 'slider_range' );
        _this.initColor( 'slider_handle' );
        _this.initColor( 'bg_outer_box' );
        _this.initColor( 'bg_even_soundtrack' );
        _this.initColor( 'bg_odd_soundtrack' );
        _this.initColor( 'txt_soundtrack' );
        _this.initColor( 'bg_soundtrack_selected' );
        _this.initColor( 'txt_soundtrack_selected' );
        _this.initColor( 'outline' );
        _this.initPixel( 'outline_width', 10 );
        _this.initPixel( 'soundtrack_separator_width',  10 );
        _this.initPixel( 'soundtrack_vertical_padding', 10 );
        _this.initPixel( 'outer_box_corner_rounding',   40 );
        _this.initPixel( 'inner_box_corner_rounding',   40 );
        _this.initPixel( 'outer_box_padding',           40 );
        _this.initPixel( 'inner_box_margin',            40 );
        _this.initOuterBoxWidth();
        _this.initFontSize();

		if( jQuery( '#war_sdy_pl_tabs' ).tabs( 'option', 'active' ) == _this.tab_index )
		{
			_this.design_pl_tab_is_visible = true;
		}
		else
		{
			_this.design_pl_tab_is_visible = false;
		}
		
		jQuery( '#war_sdy_pl_tabs' ).on( 'tabsactivate', function( event, ui )
		{
			if( ui.newPanel.attr( 'id' ) == 'war_sdy_pl_tab_panel_designer_pl' )
			{
				_this.design_pl_tab_is_visible = true;
                _this.initPlayPauseButton();
                _this.setPreview();
			}
			else
			{
				_this.design_pl_tab_is_visible = false;
			}
		} );
		
		jQuery( window ).resize( function()
		{
			if( _this.design_pl_tab_is_visible )
			{
                _this.setPreview();
			}
		} );
	} );
}

war_AudioPlaylistDesignerPlaylist.prototype.initTab = function()
{
	var _this = this;

    var jquery_tr = jQuery( '#war_sdy_pl_design_pl_color_bg_header_footer' ).parent().parent();
    var th = jquery_tr.children( 'th' );
    th.css( 'width', '10%' );
}

war_AudioPlaylistDesignerPlaylist.prototype.initPreview = function()
{
    var _this = this;

    _this.setPreview();

    var jquery_time_slider = jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider' );
    jquery_time_slider.slider
    (
        {
            min:    0,
            max:    100,
            value:  20,
            range:  'min'
        }
    );

    var jquery_volume_slider = jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider' );
    jquery_volume_slider.slider
    (
        {
            min:    0,
            max:    100,
            value:  70,
            range:  'min'
        }
    );
}

war_AudioPlaylistDesignerPlaylist.prototype.setPreview = function()
{
    var _this = this;

    var jquery_marker_left = jQuery( '#war_sdy_pl_design_pl_preview_marker_left' );
    var offset_left = parseInt( jquery_marker_left.offset().left );
    offset_left += _this.preview_marker_margin_width;
    var preview_width  = jQuery( window ).width() - offset_left;

    var jquery_marker_top = jQuery( '#war_sdy_pl_design_pl_preview_marker_top' );
    var offset_top = parseInt( jquery_marker_top.offset().top );
    offset_top += _this.preview_marker_margin_height;
    var preview_height = jQuery( window ).height() - offset_top;

    var jquery_preview = jQuery( '#war_sdy_pl_design_pl_preview' );
    jquery_preview.css( 'width',  preview_width );
    jquery_preview.css( 'height', preview_height );
}

war_AudioPlaylistDesignerPlaylist.prototype.initPlayPauseButton = function()
{
    var _this = this;

    var pseudo_playing = false;

    var pp_images_to_use = jQuery( 'input[name=war_sdy_pl_pp_images_to_use]:checked' ).val();

    if( pp_images_to_use == 'designer' && war_design_pp.is_initialised )
    {
        war_design_pp.saveButtonsImgDataForPreview();
        var button_url_play_normal  = war_design_pp.img_data_play_normal;
        var button_url_play_hover   = war_design_pp.img_data_play_hover;
        var button_url_pause_normal = war_design_pp.img_data_pause_normal;
        var button_url_pause_hover  = war_design_pp.img_data_pause_hover;
    }
    else if( pp_images_to_use == 'designer' )
    {
        var button_url_play_normal  = sdy_pl_button_url_play_normal.src;
        var button_url_play_hover   = sdy_pl_button_url_play_hover.src;
        var button_url_pause_normal = sdy_pl_button_url_pause_normal.src;
        var button_url_pause_hover  = sdy_pl_button_url_pause_hover.src;
    }
    else
    {
        var button_url_play_normal  = jQuery( '#war_sdy_pl_url_play_button' ).val();
        var button_url_play_hover   = jQuery( '#war_sdy_pl_url_play_hover' ).val();
        var button_url_pause_normal = jQuery( '#war_sdy_pl_url_pause_button' ).val();
        var button_url_pause_hover  = jQuery( '#war_sdy_pl_url_pause_hover' ).val();
    }

    var jquery_audio_control    = jQuery( '.war_sdy_pl_audio_control' );
    jquery_audio_control.prop( 'src', button_url_play_normal );

    jquery_audio_control.hover(
        function()
        {
            if( pseudo_playing )
            {
                jquery_audio_control.prop( 'src', button_url_pause_hover );
            }
            else
            {
                jquery_audio_control.prop( 'src', button_url_play_hover );
            }
        },
        function()
        {
            if( pseudo_playing )
            {
                jquery_audio_control.prop( 'src', button_url_pause_normal );
            }
            else
            {
                jquery_audio_control.prop( 'src', button_url_play_normal );
            }
        }
    );
    jquery_audio_control.click(
        function()
        {
            if( pseudo_playing )
            {
                jquery_audio_control.prop( 'src', button_url_play_hover );
                pseudo_playing = false;
            }
            else
            {
                jquery_audio_control.prop( 'src', button_url_pause_hover );
                pseudo_playing = true;
            }
        }
    );
}

war_AudioPlaylistDesignerPlaylist.prototype.initColor = function( item )
{
    var _this = this;

	_this.initColorBaseAny( item, 'red' );
	_this.initColorBaseAny( item, 'green' );
	_this.initColorBaseAny( item, 'blue' );
	_this.initColorHex( item );
}

war_AudioPlaylistDesignerPlaylist.prototype.initColorHex = function( component )
{
	var _this = this;
	
    var jquery_color = jQuery( '#war_sdy_pl_design_pl_color_' + component );
    var hex_color_str = jquery_color.val();
    var jquery_validation_error = jQuery( '#war_sdy_pl_design_pl_color_'+ component + '_validation_error' );
    if( this.setBaseColorsWithHexCode( component, hex_color_str ) )
    {
  		eval( '_this.color_' + component + '= hex_color_str' );
        _this.setColor( component, hex_color_str );
    }
    else
    {
  	    jquery_validation_error.html( 'Invalid input: ' + hex_color_str );
    }
  
	jquery_color.change( function( event )
	{
		var hex_color_str = this.value;
		var value = _this.setBaseColorsWithHexCode( component, hex_color_str );
		if( value )
		{
            jquery_validation_error.html( '' );
            eval( '_this.color_' + component + '= value' );
            _this.setColor( component, value );
			this.value = value;
		}
        else
        {
            jquery_validation_error.html( 'Invalid input: ' + hex_color_str );
            jquery_color.val( eval( '_this.color_' + component ) );
        }
	} );
}

war_AudioPlaylistDesignerPlaylist.prototype.initColorBaseAny = function( component, base_color_name )
{
	var _this = this;

    var jquery_color_base = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_' + base_color_name );
    var jquery_color_base_slider = jQuery( '#war_sdy_pl_design_pl_slider_color_' + component + '_' + base_color_name );
    var jquery_color = jQuery( '#war_sdy_pl_design_pl_color_' + component );

    var hex_color = jquery_color.val();
    var base_color = _this.make3( hexToBaseColor( hex_color ) );
    eval( '_this.' + component + '_' + base_color_name + '= base_color' );

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
		min:        0,
		max:        255,
		value:      100,
		range:      'min',
		animate:    true,
		slide:      function( event, ui )
		       	    {
		       		    jquery_color_base.val( _this.make3( ui.value ) );
		       		    jquery_color_base.change();

				        var red   = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_red'   ).val();
						var green = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_green' ).val();
						var blue  = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_blue'  ).val();
						jquery_color.val( rgbToHex( red, green, blue ) );
		       	 }
    } );

	jquery_color_base.change( function()
	{
	    var jquery_validation_error = jQuery( '#war_sdy_pl_design_pl_color_'+ component + '_validation_error' );
		var color_str = this.value;
		var color = parseInt( color_str );
		if( color_str.match( /^\d+$/ ) && color < 256 )
		{
	  	    eval( '_this.' + component + '_' + base_color_name + '= _this.make3( color_str )' );
	  	    jquery_validation_error.html( '' );
	
			var red   = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_red'   ).val();
			var green = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_green' ).val();
			var blue  = jQuery( '#war_sdy_pl_design_pl_color_' + component + '_blue'  ).val();
			var color_hex = rgbToHex( red, green, blue );
			jquery_color.val( color_hex );
	  	    eval( '_this.color_' + component + '= color_hex' );
            _this.setColor( component, color_hex );
			jquery_color_base_slider.slider( 'value', this.value );
			this.value = _this.make3( color );
	    }
	    else
	    {
	  	    jquery_validation_error.html( '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
	  									  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
	  	                                  'Invalid input: ' + color_str );
	  	    jquery_color_base.val( eval( '_this.' + component + '_' + base_color_name ) );
	    }
	} );
}

war_AudioPlaylistDesignerPlaylist.prototype.getRgbObject = function( hex_color_str )
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

war_AudioPlaylistDesignerPlaylist.prototype.setBaseColorsWithHexCode = function( component, hex_color_str )
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
 	
		jQuery( '#war_sdy_pl_design_pl_color_' + component + '_red' ).val(   red );
		jQuery( '#war_sdy_pl_design_pl_color_' + component + '_green' ).val( green );
		jQuery( '#war_sdy_pl_design_pl_color_' + component + '_blue' ).val(  blue );

		jQuery( '#war_sdy_pl_design_pl_slider_color_' + component + '_red'   ).slider( 'value', red );
		jQuery( '#war_sdy_pl_design_pl_slider_color_' + component + '_green' ).slider( 'value', green );
		jQuery( '#war_sdy_pl_design_pl_slider_color_' + component + '_blue'  ).slider( 'value', blue );
		
		eval( '_this.' + component + '_red   = red' );
		eval( '_this.' + component + '_green = green' );
		eval( '_this.' + component + '_blue  = blue' );

	  return hex_color_str;
  }
}


war_AudioPlaylistDesignerPlaylist.prototype.setColor = function( component, hex_color_str )
{
    var _this = this;

    switch( component )
    {
        case 'bg_header_footer':

            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(             'background-color', hex_color_str  );
            jQuery( 'li.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(    'background-color', hex_color_str  );
            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(             'background-color', hex_color_str  );
            break;

        case 'txt_header_footer':

            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(             'color', hex_color_str  );
            jQuery( 'li.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(    'color', hex_color_str  );
            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(             'color', hex_color_str  );
            jQuery( '.war_designer_preview_icon_speaker_graphic_1' ).css(     'fill',   hex_color_str );
            jQuery( '.war_designer_preview_icon_speaker_graphic_2' ).css(     'stroke', hex_color_str );
            jQuery( '.war_designer_preview_icon_previous_next_graphic' ).css( 'fill',   hex_color_str );
            break;

        case 'slider_bar':

            jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider' ).css( 'background', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider' ).css(   'background', hex_color_str );
            break;

        case 'slider_range':

            jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider .ui-slider-range' ).css( 'background', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider .ui-slider-range' ).css(   'background', hex_color_str );
            break;

        case 'slider_handle':

            jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider .ui-slider-handle' ).css( 'background', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider .ui-slider-handle' ).css(   'background', hex_color_str );
            break;

        case 'bg_outer_box':

            jQuery( '.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'background', hex_color_str );
            break;

        case 'bg_even_soundtrack':

            var soundtrack_selected_bg_color = jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'background-color' );
            jQuery( '#war_sdy_pl_designer_preview_playlist li:nth-child( even )' ).css( 'background', hex_color_str );
            jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'background-color', soundtrack_selected_bg_color );
            break;

        case 'bg_odd_soundtrack':

            var soundtrack_selected_bg_color = jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'background-color' );
            jQuery( '#war_sdy_pl_designer_preview_playlist li:nth-child( odd )' ).css( 'background', hex_color_str );
            jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'background-color', soundtrack_selected_bg_color );
            break;

        case 'txt_soundtrack':

            jQuery( '#war_sdy_pl_designer_preview_playlist li' ).css( 'color', hex_color_str );
            break;

        case 'bg_soundtrack_selected':

            jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'background-color', hex_color_str );
            break;

        case 'txt_soundtrack_selected':

            jQuery( '.war_designer_preview_soundtrack_selected' ).css( 'color', hex_color_str );
            break;

        case 'outline':

            jQuery( '.war_sdy_pl_designer_preview_playlist_outer_box' ).css(                        'border-color', hex_color_str );
            jQuery( '#war_sdy_pl_designer_preview_playlist li' ).css(                               'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(                     'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(              'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(                     'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider' ).css(                    'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider' ).css(                      'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_volume_slider .ui-slider-handle' ).css(  'border-color', hex_color_str );
            jQuery( '.war_sdy_pl_designer_preview_playlist_time_slider .ui-slider-handle' ).css(    'border-color', hex_color_str );
            break;
    }
}

war_AudioPlaylistDesignerPlaylist.prototype.initPercent = function( attribute )
{
	var _this = this;

    var jquery_attr = jQuery( '#war_sdy_pl_design_pl_percent_' + attribute );
    var jquery_attr_slider = jQuery( '#war_sdy_pl_design_pl_slider_percent_' + attribute );
    var jquery_validation_error = jQuery( '#war_sdy_pl_design_pl_percent_'+ attribute + '_validation_error' );
	var percent_str = jquery_attr.val();
	var percent = parseInt( percent_str );
	if( percent_str.match( /^\d+$/ ) && percent < 101 )
	{
		eval( '_this.' + attribute + '= percent' );
        _this.setPercent( attribute, percent );
	}
	else
	{
		jquery_validation_error.html( 'Invalid input: ' + percent_str );
	}

    jquery_attr_slider.slider(
	{
		min:        0,
		max:        100,
		value:      percent,
		range:      'min',
		animate:    true,
		slide:      function( event, ui )
		       	    {
                        jquery_validation_error.html( '' );
                        jquery_attr.val( _this.make3( ui.value ) );
                        eval( '_this.' + attribute + '= ui.value' );
                        _this.setPercent( attribute, ui.value );
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
            _this.setPercent( attribute, percent );
 			this.value = _this.make3( this.value );
		}
		else
		{
			jquery_validation_error.html( 'Invalid input: ' + percent_str );
 			eval( 'this.value = _this.make3( _this.' + attribute + ')' );
		}
	} );
}

war_AudioPlaylistDesignerPlaylist.prototype.setPercent = function( component, value )
{
    var _this = this;

    value += '%';

    switch( component )
    {
        case 'font_size':

            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'font-size', value );
            break;
    }
}

war_AudioPlaylistDesignerPlaylist.prototype.initPixel = function( attribute, max_value )
{
    var _this = this;

    var jquery_attr = jQuery( '#war_sdy_pl_design_pl_pixel_' + attribute );
    var jquery_attr_slider = jQuery( '#war_sdy_pl_design_pl_slider_pixel_' + attribute );
    var jquery_validation_error = jQuery( '#war_sdy_pl_design_pl_pixel_'+ attribute + '_validation_error' );
    var pixel_str = jquery_attr.val();
    var pixel = parseInt( pixel_str );
    if( pixel_str.match( /^\d+$/ ) && pixel < ( max_value + 1 ) )
    {
        eval( '_this.pixel_' + attribute + '= pixel' );
        _this.setPixel( attribute, pixel );
    }
    else
    {
        jquery_validation_error.html( 'Invalid input: ' + pixel_str );
    }

    jquery_attr_slider.slider(
        {
            min:        0,
            max:        max_value,
            value:      pixel,
            range:      'min',
            animate:    true,
            slide:      function( event, ui )
            {
                jquery_validation_error.html( '' );
                jquery_attr.val( _this.make3( ui.value ) );
                eval( '_this.pixel_' + attribute + '= ui.value' );
                _this.setPixel( attribute, ui.value );
            }
        } );

    jquery_attr.change( function()
    {
        var pixel_str = this.value;
        var pixel = parseInt( pixel_str );
        if( pixel_str.match( /^\d+$/ ) && pixel < ( max_value + 1 ) )
        {
            jquery_validation_error.html( '' );
            jquery_attr_slider.slider( 'value', this.value );
            eval( '_this.pixel_' + attribute + '= this.value' );
            _this.setPixel( attribute, this.value );
            this.value = _this.make3( this.value );
        }
        else
        {
            jquery_validation_error.html( 'Invalid input: ' + pixel_str );
            eval( 'this.value = _this.make3( _this.pixel_' + attribute + ')' );
        }
    } );
}

war_AudioPlaylistDesignerPlaylist.prototype.setPixel = function( component, value )
{
    var _this = this;

    value += 'px';

    switch( component )
    {
        case 'outline_width':

            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css(             'border-width',         value  );
            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(           'border-width',         value  );
            jQuery( 'li.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(    'border-width',         value  );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist li' ).css(                     'border-left-width',    value  );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist li' ).css(                     'border-right-width',   value  );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist' ).children().first().css(     'border-top-width',     value  );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist' ).children().last().css(      'border-bottom-width',  value  );
            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(           'border-width',         value  );
            break;

        case 'soundtrack_separator_width':

            jQuery( 'ul#war_sdy_pl_designer_preview_playlist li' ).css( 'border-top-width',    value  );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist li' ).css( 'border-bottom-width', value  );
            var border_width = jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'border-width' );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().first().css( 'border-top-width',    border_width );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().last().css(  'border-bottom-width', border_width );
            break;

        case 'soundtrack_vertical_padding':

            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().css( 'padding-top',       value );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().css( 'padding-bottom',    value );
            break;

        case 'outer_box_corner_rounding':

            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'border-radius', value );
            break;

        case 'inner_box_corner_rounding':

            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(           'border-radius',                value );
            jQuery( 'li.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(    'border-radius',                value );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().first().css(      'border-top-left-radius',       value );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().first().css(      'border-top-right-radius',      value );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().last().css(       'border-bottom-left-radius',    value );
            jQuery( 'ul#war_sdy_pl_designer_preview_playlist').children().last().css(       'border-bottom-right-radius',   value );
            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(           'border-radius',                value );
            break;

        case 'outer_box_padding':

            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'padding', value );
            break;

        case 'inner_box_margin':

            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_header' ).css(           'margin-bottom',    value );
            jQuery( 'li.war_sdy_pl_designer_preview_playlist_columns_caption_row' ).css(    'margin-bottom',    value );
            jQuery( 'li.war_sdy_pl_designer_preview_soundtrack_row_footer' ).css(           'margin-top',       value );
            break;
    }
}

war_AudioPlaylistDesignerPlaylist.prototype.initFontSize = function()
{
    var _this = this;

    var jquery_value = jQuery( '#war_sdy_pl_playlist_font_size_value' );
    var jquery_unit  = jQuery( '#war_sdy_pl_playlist_font_size_unit' );
    var jquery_slider = jQuery( '#war_sdy_pl_design_pl_slider_font_size_value' );
    var jquery_validation_error = jQuery( '#war_sdy_pl_playlist_font_size_validation_error' );
    var unit = jquery_unit.val();
    var value_str = jquery_value.val();
    var value = parseInt( value_str );
    if( value_str.match( /^\d+$/ ) )
    {
        jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'font-size', value + unit );
    }
    else
    {
        jquery_validation_error.html( 'Invalid input: ' + value_str );
    }

    jquery_slider.slider(
        {
            min:        0,
            max:        100,
            value:      value,
            range:      'min',
            animate:    true,
            slide:      function( event, ui )
            {
                var unit = jquery_unit.val();
                jquery_validation_error.html( '' );
                jquery_value.val( _this.make3( ui.value ) );
                jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'font-size', ui.value + unit );
            }
        } );

    jquery_value.change( function()
    {
        var unit = jquery_unit.val();
        var value_str = this.value;
        var value = parseInt( value_str );
        if( value_str.match( /^\d+$/ ) )
        {
            jquery_validation_error.html( '' );
            jquery_slider.slider( 'value', this.value );
            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'font-size', value + unit );;
            this.value = _this.make3( this.value );
        }
        else
        {
            jquery_validation_error.html( 'Invalid input: ' + value_str );
        }
    } );

    jquery_unit.change( function()
    {
        var unit = this.value;
        var value = jquery_value.val();

        jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'font-size', value + unit );
    } );
}

war_AudioPlaylistDesignerPlaylist.prototype.initOuterBoxWidth = function()
{
    var _this = this;

    var jquery_value = jQuery( '#war_sdy_pl_playlist_outer_box_width_value' );
    var jquery_unit  = jQuery( '#war_sdy_pl_playlist_outer_box_width_unit' );
    var jquery_slider = jQuery( '#war_sdy_pl_design_pl_slider_outer_box_width_value' );
    var jquery_validation_error = jQuery( '#war_sdy_pl_playlist_outer_box_width_validation_error' );
    var unit = jquery_unit.val();
    var value_str = jquery_value.val();
    var value = parseInt( value_str );
    if( value_str.match( /^\d+$/ ) )
    {
        if( unit == '%' )
        {
            jquery_value.val( _this.make3( value ) );
        }
        else
        {
            jquery_value.val( _this.make4( value ) );
        }
        var val = ( unit == '%' ) ? value * 0.9 : value;
        jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'width', val + unit );
    }
    else
    {
        jquery_validation_error.html( 'Invalid input: ' + value_str );
    }

    if( unit == '%' )
    {
        var max_value = 100;
        jquery_value.removeClass( 'war_sdy_pl_design_pl_thousand' );
        jquery_value.addClass( 'war_sdy_pl_design_pl_percent' );
    }
    else
    {
        var max_value = 2000;
        jquery_value.removeClass( 'war_sdy_pl_design_pl_percent' );
        jquery_value.addClass( 'war_sdy_pl_design_pl_thousand' );
    }

    jquery_slider.slider(
    {
        min:        0,
        max:        max_value,
        value:      value,
        range:      'min',
        animate:    true,
        slide:      function( event, ui )
        {
            var unit = jquery_unit.val();
            jquery_validation_error.html( '' );
            if( unit == '%' )
            {
                jquery_value.val( _this.make3( ui.value ) );
            }
            else
            {
                jquery_value.val( _this.make4( ui.value ) );
            }
            var val = ( unit == '%' ) ? ui.value * 0.9 : ui.value;
            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'width', val + unit );
        }
    } );

    jquery_value.change( function()
    {
        var unit = jquery_unit.val();
        var value_str = this.value;
        var value = parseInt( value_str );
        if( value_str.match( /^\d+$/ ) )
        {
            jquery_validation_error.html( '' );
            jquery_slider.slider( 'value', this.value );
            var val = ( unit == '%' ) ? this.value * 0.9 : this.value;
            jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'width', val + unit );
            if( unit == '%' )
            {
                this.value = _this.make3( this.value );
            }
            else
            {
                this.value = _this.make4( this.value );
            }
        }
        else
        {
            jquery_validation_error.html( 'Invalid input: ' + value_str );
        }
    } );

    jquery_unit.change( function()
    {
        var unit = this.value;
        var value = jquery_value.val();
        if( unit == '%' )
        {
            jquery_value.removeClass( 'war_sdy_pl_design_pl_thousand' );
            jquery_value.addClass( 'war_sdy_pl_design_pl_percent' );
            jquery_slider.slider( { max: 100 } );
            if( value > 100 )
            {
                jquery_slider.slider( { value: 100 } );
                jquery_value.val( '100' );
                value = 100;
            }
            else
            {
                jquery_value.val( _this.make3( value ) );
            }
        }
        else
        {
            jquery_value.removeClass( 'war_sdy_pl_design_pl_percent' );
            jquery_value.addClass( 'war_sdy_pl_design_pl_thousand' );
            jquery_slider.slider( { max: 2000 } );
            if( value > 2000 )
            {
                jquery_slider.slider( { value: 2000 } );
                jquery_value.val( '2000' );
                value = 2000;
            }
            else
            {
                jquery_value.val( _this.make4( value ) );
            }
        }
        var val = ( unit == '%' ) ? value * 0.9 : value;
        jQuery( 'div.war_sdy_pl_designer_preview_playlist_outer_box' ).css( 'width', val + unit );
    } );
}

war_AudioPlaylistDesignerPlaylist.prototype.make3 = function( value )
{
    var _this = this;

    value = parseInt( value );
    var value = value < 100 ? '0' + value : value;
    value = value <  10 ? '0' + value : value;

    return value;
}

war_AudioPlaylistDesignerPlaylist.prototype.make4 = function( value )
{
    var _this = this;

    value = parseInt( value );
    var value = value < 1000 ? '0' + value : value;
    value = value < 100 ? '0' + value : value;
    value = value <  10 ? '0' + value : value;

    return value;
}
