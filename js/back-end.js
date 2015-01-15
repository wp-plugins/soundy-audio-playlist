function WarSoundyAudioPlaylistAdmin( mode, args )
{
	var _this = this;

	_this.color_blue_start                 = args.color_blue_start;
	_this.color_blue_end                   = args.color_blue_end;
	_this.color_yellow_start               = args.color_yellow_start;
	_this.color_yellow_end                 = args.color_yellow_end;
	_this.plugin_url                       = args.plugin_url;	
	_this.time_to_get_soundtrack_duration  = args.time_to_get_soundtrack_duration;
    _this.sdy_pl_pro_home_url              = args.sdy_pl_pro_home_url;

	jQuery( document ).ready( function() 
	{
		if( mode == 'settings' )
		{
			_this.initSettingsTabs( args );
		}
		else
		{
			_this.initMetaBox( args );
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSettingsTabs = function( args )
{
	var _this = this;

	_this.is_metabox = false;
	
	_this.default_button_dimensions = args.default_button_dimensions;
	_this.default_play_button_url   = args.default_play_button_url;
	_this.default_play_hover_url    = args.default_play_hover_url;
	_this.default_pause_button_url  = args.default_pause_button_url;
	_this.default_pause_hover_url   = args.default_pause_hover_url;
	_this.is_pro                    = args.is_pro;
	_this.is_trial                  = args.is_trial;

	_this.bindMediaUploader( 'war_sdy_pl_audio_file_url',   'war_audio_library_button',        'audio' );
	_this.bindMediaUploader( 'war_sdy_pl_url_play_button',  'img_play_button_library_button',  'image' );
	_this.bindMediaUploader( 'war_sdy_pl_url_play_hover',   'img_play_hover_library_button',   'image' );
	_this.bindMediaUploader( 'war_sdy_pl_url_pause_button', 'img_pause_button_library_button', 'image' );
	_this.bindMediaUploader( 'war_sdy_pl_url_pause_hover',  'img_pause_hover_library_button',  'image' );
    _this.removeSkimLinks();
	_this.initTabs();
	_this.initEnterKey();
	_this.initAudioFileURL();
	_this.initAudioType();
	_this.initAudioVolume();
	_this.initBuySoundyPro();
	_this.initPlayPauseImagesToUse();
	_this.initButtonImgUrls();
	_this.initSwapNormalHover();
	_this.initDefaultButtons();
	_this.initImgPreviewHere();
	_this.initImgPreviewInContextDefault();
	_this.initPlayPausePosition();
	_this.initImgPreviewInContextPosition();
    _this.initResponsiveTab();
	_this.initSoundtracks();
	_this.initSoundtrackAdd();
	_this.initSoundtrackModify();
	_this.initSoundtrackDelete();
	_this.initSoundtrackClearAll();
	_this.initSoundtrackClearFields();
	_this.initSoundtrackUndo();
	_this.initSoundtrackImport();
	_this.initSoundtrackDefault();
	_this.initSubmit();
}

WarSoundyAudioPlaylistAdmin.prototype.initMetaBox = function( args )
{
	var _this = this;

	_this.is_metabox = true;

	_this.bindMediaUploader( 'war_sdy_pl_audio_file_url', 'war_audio_library_button', 'audio' );
    _this.removeSkimLinks();
	_this.initTabs();
	_this.initEnterKey();
	_this.initAudioFileURL();
	_this.initAudioType();
	_this.initAudioVolume();
    _this.initBuySoundyPro();
    _this.initSoundtracksForMetabox();
	_this.initSoundtrackAdd();
	_this.initSoundtrackModify();
	_this.initSoundtrackDelete();
	_this.initSoundtrackClearAll();
	_this.initSoundtrackClearFields();
	_this.initSoundtrackUndo();
	_this.initSoundtrackImport();
	_this.initSoundtrackDefault();
	_this.initSoundtrackYellowSelect();
	_this.initSoundtrackYellowUnselect();
	_this.initSubmitMetabox();
}

WarSoundyAudioPlaylistAdmin.prototype.removeSkimLinks = function()
{
    var _this = this;

    var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );

    jquery_soundtracks_list.children().each( function( index, li )
    {
        var jquery_li = jQuery( li );

        var jquery_url = jquery_li.children( '.war_back_end_soundtrack_url' );
        var soundtrack_url = jquery_url.html();
        // Removes any HTML tag like: <span class="skimlinks-unlinked">...</span> in URL
        soundtrack_url = soundtrack_url.replace( /<[^>]+\>/g, '' );
        jquery_url.html( soundtrack_url );

        var jquery_time = jquery_li.children( '.war_back_end_soundtrack_time' );
        var soundtrack_time = jquery_time.html();
        // Removes Invalid Soundtrack Time
        var reg_invalid_time = /[^0-9:]/;
        if( reg_invalid_time.test( soundtrack_time ) )
        {
            jquery_time.html( '&infin;' );
        }
    } );
}

WarSoundyAudioPlaylistAdmin.prototype.initTabs = function()
{
	var _this = this;
	
  if( ! sessionStorage.getItem( 'war_sdy_pl_tab_index' ) )  
    sessionStorage.setItem( 'war_sdy_pl_tab_index', 0 ); 

  jQuery( '#war_sdy_pl_tabs' ).tabs( 
	{ 
		active:    sessionStorage.war_sdy_pl_tab_index,
		activate : function( event, ui )
							 {
        			 	 //  Get future value
        				 var new_index = ui.newTab.index();
        				 sessionStorage.setItem( 'war_sdy_pl_tab_index', new_index );
        			 } 
  } );	
}

WarSoundyAudioPlaylistAdmin.prototype.initEnterKey = function()
{
	var _this = this;
	
	var jquery = _this.is_metabox ? jQuery( '.war_sdy_pl_form_table' ) : jQuery( document );

	// Prevent Enter Key to submit the form:
	jquery.keydown( function( event )
	{
		if( event.keyCode == 13 ) 
		{
            event.preventDefault();
            if( jQuery( event.target ).is( 'input' ) )
            {
                jQuery( event.target ).change();
            }
            return false;
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initBuySoundyPro = function()
{
	var _this = this;

	var jquery_pro_buy = jQuery( '#war_sdy_pl_pro_buy' );
	jquery_pro_buy.click( function()
	{
		window.open( _this.sdy_pl_pro_home_url, 'sdy_pl_pro_home' );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundTrack = function()
{
	var _this = this;
	
	if( jQuery( 'input[name=war_sdy_pl_soundtrack][value=custom]' ).prop( 'checked' ) )
	{
		jQuery( '#war_sdy_pl_audio_file_url' ).css( 'backgroundColor', '#c0e7f0' );
	}
	
	jQuery( '#war_sdy_pl_audio_file_url' ).click( function()
	{
		jQuery( 'input[name=war_sdy_pl_soundtrack][value=custom]' ).prop( 'checked', true );
		jQuery( '#war_sdy_pl_audio_file_url' ).css( 'backgroundColor', '#c0e7f0' );
	} );

	jQuery( '#war_sdy_pl_audio_file_url' ).change( function()
	{
		jQuery( 'input[name=war_sdy_pl_soundtrack][value=custom]' ).prop( 'checked', true );
		jQuery( '#war_sdy_pl_audio_file_url' ).css( 'backgroundColor', '#c0e7f0' );
	} );

	jQuery( '#war_sdy_pl_soundtrack_default' ).change( function() // called when Default radio button is clicked
	{
		var audio_type = _this.getAudioTypeFromURL( _this.default_audio_url );
		
		var player_was_playing = ! jQuery( '#war_sdy_pl_audio_player' )[ 0 ].paused;
			 			
		jQuery( '#war_sdy_pl_audio_file_url' ).val( _this.default_audio_url );
		jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'src', _this.default_audio_url );
		jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'type', 'audio/' + audio_type );
		jQuery( '#war_sdy_pl_audio_player' )[ 0 ].load();
		
		if( player_was_playing ) jQuery( '#war_sdy_pl_audio_player' )[ 0 ].play();
		jQuery( '#war_sdy_pl_audio_file_url' ).css( 'backgroundColor', '' );
	} );

	jQuery( '#war_sdy_pl_soundtrack_custom' ).change( function() // called when Custom radio button is clicked
	{
		jQuery( '#war_sdy_pl_audio_file_url' ).css( 'backgroundColor', '#c0e7f0' );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initAudioVolume = function()
{
	var _this = this;

    var audio_player = jQuery( '#war_sdy_pl_audio_player' ).get( 0 );
    var audio_volume_jquery = jQuery( '#war_sdy_pl_audio_volume' );
    var audio_volume = audio_volume_jquery.val();
    if( ! audio_volume )
    {
        audio_volume = 80;
        audio_volume_jquery.val( 80 );
    }
    audio_player.volume = audio_volume / 100;
    var audio_volume_slider_jquery = jQuery( '#war_sdy_pl_audio_volume_slider' );

    audio_volume_slider_jquery.slider(
    {
        min:     0,
        max:     100,
        value:   audio_volume,
        range:   'min',
        animate: true,
        slide:   function( event, ui )
                 {
                     audio_player.volume = ui.value / 100;
                     audio_volume_jquery.val( ui.value );
                 }
    } );

	audio_volume_jquery.change( function()
	{
	    audio_volume_slider_jquery.slider( 'value', this.value );
		audio_player.volume = this.value / 100;
	} );

	if( _this.is_metabox )
	{
		if( jQuery( 'input[name=war_sdy_pl_audio_volume_def][value=custom]' ).prop( 'checked' ) )
		{
			audio_volume_jquery.css( 'backgroundColor', '#c0e7f0' );
		}

		audio_volume_jquery.click( function()
		{
			jQuery( 'input[name=war_sdy_pl_audio_volume_def][value=custom]' ).prop( 'checked', true );
			audio_volume_jquery.css( 'backgroundColor', '#c0e7f0' );
		} );

		var audio_volume_jquery_default = jQuery( '#war_sdy_pl_audio_volume_default' );
		audio_volume_jquery_default.change( function() // called when Default radio button is clicked
		{
		  audio_volume_jquery.val( _this.default_audio_volume );
			audio_volume_slider_jquery.slider( 'value', _this.default_audio_volume );
			audio_player.volume = _this.default_audio_volume / 100;
			audio_volume_jquery.css( 'backgroundColor', '' );
		} );
		
		audio_volume_slider_jquery.on( "slidestart", function( event, ui )
		{
			jQuery( 'input[name=war_sdy_pl_audio_volume_def][value=custom]' ).prop( 'checked', true );
			audio_volume_jquery.css( 'backgroundColor', '#c0e7f0' );
		} );
		
		var audio_volume_jquery_custom = jQuery( '#war_sdy_pl_audio_volume_custom' );
		audio_volume_jquery_custom.change( function() // called when Custom radio button is clicked
		{
			audio_volume_jquery.css( 'backgroundColor', '#c0e7f0' );
			audio_volume_slider_jquery.css( 'backgroundColor', '#c0e7f0' );
		} );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.initAudioTitle = function()
{
	var _this = this;

	if( jQuery( 'input[name=war_sdy_pl_audio_title_def][value=custom]' ).prop( 'checked' ) )
	{
		jQuery( '#war_sdy_pl_audio_title' ).css( 'backgroundColor', '#c0e7f0' );
	}
	
	jQuery( '#war_sdy_pl_audio_title' ).click( function()
	{
		jQuery( 'input[name=war_sdy_pl_audio_title_def][value=custom]' ).prop( 'checked', true );
		jQuery( '#war_sdy_pl_audio_title' ).css( 'backgroundColor', '#c0e7f0' );
	} );

	jQuery( '#war_sdy_pl_audio_title_default' ).change( function() // called when Default radio button is clicked
	{
		jQuery( '#war_sdy_pl_audio_title' ).val( _this.default_audio_title );
		jQuery( '#war_sdy_pl_audio_title' ).css( 'backgroundColor', '' );
	} );

	jQuery( '#war_sdy_pl_audio_title_custom' ).change( function() // called when Custom radio button is clicked
	{
		jQuery( '#war_sdy_pl_audio_title' ).css( 'backgroundColor', '#c0e7f0' );
	} );
}

// Not used anymore:
WarSoundyAudioPlaylistAdmin.prototype.setDefaultButtonURL = function( button_type, url )
{
	var _this = this;

	jQuery( '#war_sdy_pl_url_' + button_type ).val( url );
	jQuery( '#war_sdy_pl_url_' + button_type + '_img' ).attr( 'src', url );

	switch( button_type )
	{
		case 'play_button':
			var button_name = 'Play Button';
			break;
		case 'play_hover':
			var button_name = 'Play Hover';
			break;
		case 'pause_button':
			var button_name = 'Pause Button';
			break;
		case 'pause_hover':
			var button_name = 'Pause Hover';
			break;
	}

	alert( button_name + ' Image URL reset to default.\n' +
	       'You still have to save the changes.' );
	
	if( event.preventDefault ) event.preventDefault(); else event.returnValue = false;
}

WarSoundyAudioPlaylistAdmin.prototype.initSwapNormalHover = function()
{
	jQuery( '#war_sdy_pl_button_swap_normal_hover' ).click( function()
	{
		var url_play_button = jQuery( '#war_sdy_pl_url_play_button' ).val();
		var url_play_hover  = jQuery( '#war_sdy_pl_url_play_hover' ).val();
		jQuery( '#war_sdy_pl_url_play_button' ).val( url_play_hover );
		jQuery( '#war_sdy_pl_url_play_button' ).change();
		jQuery( '#war_sdy_pl_url_play_hover' ).val(  url_play_button );
		jQuery( '#war_sdy_pl_url_play_hover' ).change();
		
		var url_pause_button = jQuery( '#war_sdy_pl_url_pause_button' ).val();
		var url_pause_hover  = jQuery( '#war_sdy_pl_url_pause_hover' ).val();
		jQuery( '#war_sdy_pl_url_pause_button' ).val( url_pause_hover );
		jQuery( '#war_sdy_pl_url_pause_button' ).change();
		jQuery( '#war_sdy_pl_url_pause_hover' ).val(  url_pause_button );		
		jQuery( '#war_sdy_pl_url_pause_hover' ).change();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initDefaultButtons = function()
{
	var _this = this;

	var dims = [ 24, 32, 48, 64 ];
	for( var index in dims )
	{
		var dim = dims[ index ];
		jQuery( '#button_default_buttons_' + dim ).click( function()
		{
			var dimensions = this.value;
			var url_play_button  = _this.default_play_button_url.replace(  _this.default_button_dimensions, dimensions );
			var url_play_hover   = _this.default_play_hover_url.replace(   _this.default_button_dimensions, dimensions );
			var url_pause_button = _this.default_pause_button_url.replace( _this.default_button_dimensions, dimensions );
			var url_pause_hover  = _this.default_pause_hover_url.replace(  _this.default_button_dimensions, dimensions );
	
			jQuery( '#war_sdy_pl_url_play_button' ).val( url_play_button );
			jQuery( '#war_sdy_pl_url_play_button' ).change();
			jQuery( '#war_sdy_pl_url_play_button_img' ).attr( 'src', url_play_button );
		
			jQuery( '#war_sdy_pl_url_play_hover' ).val( url_play_hover );
			jQuery( '#war_sdy_pl_url_play_hover' ).change();
			jQuery( '#war_sdy_pl_url_play_hover_img' ).attr( 'src', url_play_hover );
		
			jQuery( '#war_sdy_pl_url_pause_button' ).val( url_pause_button );
			jQuery( '#war_sdy_pl_url_pause_button' ).change();
			jQuery( '#war_sdy_pl_url_pause_button_img' ).attr( 'src', url_pause_button );
		
			jQuery( '#war_sdy_pl_url_pause_hover' ).val( url_pause_hover );
			jQuery( '#war_sdy_pl_url_pause_hover' ).change();
			jQuery( '#war_sdy_pl_url_pause_hover_img' ).attr( 'src', url_pause_hover );
		} );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.initImgPreviewHere = function()
{
	var _this = this;

	var jquery_img_preview_here = jQuery( '#war_sdy_pl_img_preview_here' );
	
	_this.img_url_play_button  = jQuery( '#war_sdy_pl_url_play_button' ).val();
	_this.img_url_play_hover   = jQuery( '#war_sdy_pl_url_play_hover' ).val();
	_this.img_url_pause_button = jQuery( '#war_sdy_pl_url_pause_button' ).val();
	_this.img_url_pause_hover  = jQuery( '#war_sdy_pl_url_pause_hover' ).val();

	//jquery_img_preview_here.css( 'background-image', 'url(' + jquery_img_data_grid.val() + ')' );
	jquery_img_preview_here.attr( 'src', _this.img_url_play_button );
	jquery_img_preview_here.fadeIn();
	
	var hovering    = false;
	var is_play_img = true;
	
	function displayImgPreviewHere()
	{
		if( hovering )
		{
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_play_hover );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_pause_hover );
			}
		}
		else
		{
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_play_button );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_pause_button );
			}
		}
	}

	var types = [ 'play_button', 'play_hover', 'pause_button', 'pause_hover' ];
	for( var index in types )
	{
		var type = types[ index ];
		jQuery( '#war_sdy_pl_url_' + type ).change( function() 
		{
			var url = this.value;
			var type = this.id.replace( 'war_sdy_pl_url_', '' );
			eval( '_this.img_url_' + type + '= url' );
			displayImgPreviewHere();
		} );
	}

	jquery_img_preview_here.hover( 
		function ()
		{
			hovering = true;
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_play_hover );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_pause_hover );
			}
		},
		function ()
		{
			hovering = false;
			if( is_play_img )
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_play_button );
			}
			else
			{
				jquery_img_preview_here.attr( 'src', _this.img_url_pause_button );
			}
		} );

	jquery_img_preview_here.click( function ()
	{
		if( is_play_img )
		{
			jquery_img_preview_here.attr( 'src', _this.img_url_pause_hover );
			is_play_img = false;
		}
		else
		{
			jquery_img_preview_here.attr( 'src', _this.img_url_play_hover );
			is_play_img = true;
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initImgPreviewInContextDefault = function()
{
	var _this = this;
	
	var jquery_button_preview_in_context = jQuery( '#war_sdy_pl_button_preview_in_context_default' );
	var jquery_page_preview_url          = jQuery( '#war_sdy_pl_page_preview_url_default' );
	
	jquery_button_preview_in_context.click( function ()
	{
		var page_url = jquery_page_preview_url.val();
		window.open( page_url + '?war_sdy_pl_preview=default', 'sdy_pl_preview' );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initImgPreviewInContextPosition = function()
{
	var _this = this;
	
	var jquery_button_preview_in_context = jQuery( '#war_sdy_pl_button_preview_in_context_position' );
	var jquery_page_preview_url          = jQuery( '#war_sdy_pl_page_preview_url_position' );
	
	if( ( ! _this.is_pro ) || _this.is_trial )
	{
		var preview = 'default';
	}
	else
	{
		var preview = 'position';
	}
	
	jquery_button_preview_in_context.click( function ()
	{
		var page_url = jquery_page_preview_url.val();
		window.open( page_url + '?war_sdy_pl_preview=' + preview, 'sdy_pl_preview' );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initPlayPausePosition = function()
{
	var _this = this;

    var comment_yes = 'Play/Pause button can also be inserted with short code or template tag';
    var comment_no  = 'Play/Pause button can still be inserted with short code or template tag';

    var jquery_comment = jQuery( '#war_sdy_pl_pp_corner_enable_comment' );
    if( jQuery( 'input[name=war_sdy_pl_pp_corner_enable]:checked' ).val() == 'yes' )
    {
        jquery_comment.html( comment_yes );
    }
    else
    {
        jquery_comment.html( comment_no );
    }

    jQuery( 'input[name=war_sdy_pl_pp_corner_enable]:checked' ).change( function()
    {
        if( this.value == 'yes' )
        {
            jquery_comment.html( comment_yes );
        }
        else
        {
            jquery_comment.html( comment_no );
        }
    } );

	var position_map = 
	{ 
		'document' : '(absolute positioning: button will scroll with page content)', 
		'window'   : '(fixed positioning: button will NOT scroll with page content)'
	};

	jQuery( '#war_sdy_pl_pp_position' ).change( function()
	{
		var position_type = this.options[ this.selectedIndex ].value;
		jQuery( '#war_sdy_pl_pp_comment' ).html( position_map[ position_type ] );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initButtonImgUrls = function()
{
	var _this = this;

	var types = [ 'play_button', 'play_hover', 'pause_button', 'pause_hover' ];
	for( var index in types )
	{
		var type = types[ index ];
		jQuery( '#war_sdy_pl_url_' + type ).change( function() 
		{
			var url = this.value;
			jQuery( '#' + this.id + '_img' ).attr( 'src', url );
		} );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.getAudioTypeFromURL = function( url )
{
	var _this = this;

	var file_extension = url.substr( url.lastIndexOf( '.' ) + 1 );
	var audio_type = '';
	
	switch( file_extension )
	{
		case 'mp3':
		case 'mpg':
		case 'mpeg':
			audio_type = 'mpeg';
			break;
		case 'ogg':
			audio_type = 'ogg';
			break;
		case 'wav':
		case 'wave':
			audio_type = 'wav';
			break;
	}
	
	return audio_type;
}

WarSoundyAudioPlaylistAdmin.prototype.initAudioFileURL = function()
{
	var _this = this;

	jQuery( '#war_sdy_pl_audio_file_url').change( function()
	{
		var url = this.value;	
		if( url )
		{
			jQuery( '#war_button_soundtrack_add' ).removeClass( 'war_button_inactive' );
            if( jQuery( '#war_sdy_pl_back_end_playlist').children().length )
            {
                jQuery( '#war_button_soundtrack_modify' ).removeClass( 'war_button_inactive' );
            }
			var audio_type = _this.getAudioTypeFromURL( url );
			if( audio_type )
			{
				var mime_type = 'audio/' + audio_type;
				jQuery( '#war_sdy_pl_audio_type' ).val( mime_type );
			}
			else
			{
				var mime_type = jQuery( '#war_sdy_pl_audio_type' ).val();
			}
			if( jQuery( '#war_sdy_pl_audio_volume' ).val() == 0 )
			{
				jQuery( '#war_sdy_pl_audio_volume' ).val( 80 );
				jQuery( '#war_sdy_pl_audio_volume' ).change();
			}
			var player_was_playing = ! jQuery( '#war_sdy_pl_audio_player' )[ 0 ].paused;
			jQuery( '#war_sdy_pl_audio_player' ).attr( 'src', url );
			jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'src', url );
			jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'type', mime_type );
			jQuery( '#war_sdy_pl_audio_player' )[ 0 ].load();
			if( player_was_playing ) jQuery( '#war_sdy_pl_audio_player' )[ 0 ].play();
		}
		else
		{
			var mime_type = '';
			jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'src', url );
			jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'type', 'audio/mpeg' );
		}
	} );
	
	jQuery( '#war_sdy_pl_audio_player' ).bind( 'loadedmetadata', function()
	{
        if( this.src != jQuery( '#war_sdy_pl_audio_file_url' ).val() ) return;

        var reg_valid_duration = /^[0-9.]+$/;
        if( reg_valid_duration.test( this.duration ) )
        {
            var seconds = Math.round( this.duration );
            var hms_time = _this.secondsToHms( seconds );
            var hms_time_2 = hms_time;
        }
        else
        {
            var hms_time = '&infin;';
            jQuery( 'body' ).append( '<div id="war_sdy_pl_temp">&infin;</div>' );
            var hms_time_2 = jQuery( '#war_sdy_pl_temp' ).text();
            jQuery( '#war_sdy_pl_temp' ).remove();
        }

        jQuery( '#war_sdy_pl_audio_time' ).val( hms_time_2 );
		if( _this.jquery_li_selected )
		{
			var soundtrack_url = _this.jquery_li_selected.children( '.war_back_end_soundtrack_url' ).html();
			if( this.src != soundtrack_url ) return;
			var soundtrack_time = _this.jquery_li_selected.children( '.war_back_end_soundtrack_time' );
			if( ! soundtrack_time.html() )
			{
				soundtrack_time.html( hms_time );
			}
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initAudioType = function()
{
	var _this = this;

	jQuery( '#war_sdy_pl_audio_type').change( function()
	{
		var audio_type = jQuery( this ).val();
		var player_was_playing = ! jQuery( '#war_sdy_pl_audio_player' )[ 0 ].paused;
		jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'type', audio_type );
		jQuery( '#war_sdy_pl_audio_player' )[ 0 ].load();
		if( player_was_playing ) jQuery( '#war_sdy_pl_audio_player' )[ 0 ].play();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.bindMediaUploader = function( field_name, button_name, field_type )
{
	var _this = this;

	jQuery( '#' + button_name ).click( function() 
	{
		jQuery( '#TB_window' ).html( '' ); // to avoid multiple title bars
 		tb_show( '', 'media-upload.php?type=' + field_type + '&amp;TB_iframe=true');

		window.send_to_editor = function( html )
		{
			if( field_type == 'image' )
			{
	 			var url = jQuery( 'img', html ).attr( 'src' );
	 			jQuery( '#' + field_name + '_img' ).attr( 'src', url );
	 		}
	 		else if( field_type == 'audio' )
	 		{
	 			var url = jQuery( html ).attr( 'href' );
	 			var title = jQuery( html ).text().trim();
	 			if( title != '' )
	 			{
	 				jQuery( '#war_sdy_pl_audio_title' ).val( title );
	 			} 
	 		}
	 		
	 		var jq = jQuery( '#' + field_name );
	 		jq.val( url );
	 		jq.change();	 		
	 		tb_remove();
		}
		
 		return false;
	} );			 
}

WarSoundyAudioPlaylistAdmin.prototype.initPlayPauseImagesToUse = function()
{
	var _this = this;

	_this.pp_images_to_use = jQuery( 'input[name=war_sdy_pl_pp_images_to_use]:checked' ).val();
	
	jQuery( 'input[name=war_sdy_pl_pp_images_to_use]' ).change( function()
	{
		_this.pp_images_to_use = jQuery( 'input[name=war_sdy_pl_pp_images_to_use]:checked' ).val();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initResponsiveTab = function()
{
    var _this = this;

    var jquery_radio_responsive_mode = jQuery( 'input:radio[name=war_sdy_pl_responsive_mode]' );
    var jquery_responsive_table_row = jQuery( '#war_sdy_pl_responsive_list').parent().parent();
    var jquery_responsive_scale_row = jQuery( '#war_sdy_pl_responsive_scale_reference_window_width').parent().parent();
    var jquery_include_player_div   = jQuery( '#war_sdy_pl_responsive_include_audio_player_button_container' );

    var jquery_tr = jQuery( '#war_sdy_pl_responsive_mode_table' ).parent().parent();
    var th = jquery_tr.children( 'th' );
    th.css( 'width', '10%' );

    jquery_radio_responsive_mode.change
    (
        function()
        {
            var mode = jQuery( 'input:radio[name=war_sdy_pl_responsive_mode]:checked' ).val();

            if( mode == 'none' )
            {
                jquery_responsive_table_row.hide();
                jquery_responsive_scale_row.hide();
                jquery_include_player_div.hide();
            }
            else if( mode == 'table' )
            {
                jquery_responsive_table_row.show();
                jquery_responsive_scale_row.hide();
                jquery_include_player_div.show();
            }
            else if( mode == 'scale' )
            {
                jquery_responsive_table_row.hide();
                jquery_responsive_scale_row.show();
                jquery_include_player_div.show();
            }
        }
    );

    jquery_radio_responsive_mode.change();

    var jquery_responsive_list = jQuery( '#war_sdy_pl_responsive_list' );
    jquery_responsive_list.sortable(
        {
            axis:        'y',
            opacity:     1,
            placeholder: 'war_sdy_pl_responsive_sortable_placeholder'
        } );
    // jquery_responsive_list.disableSelection();

    jQuery( '.war_sdy_pl_responsive_input_field_integer' ).change
    (
        function()
        {
            this.value = this.value.trim();
            if( /[^0-9]/.test( this.value ) && this.value != '' )
            {
                jQuery( this ).css( 'background-color', '#ffbbbb' );
                jQuery( this ).focus();
                var pos = jQuery( this ).offset();
                jQuery( 'body' ).append( '<div id="war_sdy_pl_error_temp">Error !</div>' );
                _this.jquery_error_responsive_integer = jQuery( '#war_sdy_pl_error_temp' );
                _this.jquery_error_responsive_integer.css( 'position', 'absolute' );
                _this.jquery_error_responsive_integer.css( 'top', pos.top + 4 );
                _this.jquery_error_responsive_integer.css( 'left', pos.left - 40 );
                _this.jquery_error_responsive_integer.css( 'color', 'red' );
            }
            else
            {
                jQuery( this ).css( 'background-color', '' );
                if( _this.jquery_error_responsive_integer != undefined )
                {
                    _this.jquery_error_responsive_integer.remove();
                }
            }
        }
    );

    jQuery( '#war_sdy_pl_responsive_scale_button_current_window_width' ).click
    (
        function()
        {
            var window_width = jQuery( window ).width();
            var jquery_width = jQuery( '#war_sdy_pl_responsive_scale_reference_window_width' );
            jquery_width.val( window_width );
            jquery_width.css( 'background-color', '#1e8cbe' );
            jquery_width.animate(
                {
                    backgroundColor: ''
                }, 1000 );
        }
    );

    jQuery( '#war_sdy_pl_responsive_preview_window_width' ).change
    (
        function()
        {
            if( this.value > screen.width )
            {
                jQuery( this ).css( 'background-color', '#ffbbbb' );
                jQuery( this ).focus();
                var pos = jQuery( this ).offset();
                jQuery( 'body' ).append( '<div id="war_sdy_pl_responsive_error_temp_preview">' +
                    'Error: Preview Window Width cannot be larger than current screen width (' + screen.width + ' px).</div>' );
                _this.jquery_error_responsive_preview = jQuery( '#war_sdy_pl_responsive_error_temp_preview' );
                _this.jquery_error_responsive_preview.css( 'position', 'absolute' );
                _this.jquery_error_responsive_preview.css( 'top', pos.top + 4 );
                _this.jquery_error_responsive_preview.css( 'left', pos.left + 110 );
                _this.jquery_error_responsive_preview.css( 'color', 'red' );
            }
            else
            {
                jQuery( this ).css( 'background-color', '' );
                if( _this.jquery_error_responsive_preview != undefined )
                {
                    _this.jquery_error_responsive_preview.remove();
                }
            }
        }
    );

    jQuery( '#war_sdy_pl_responsive_button_preview' ).click
    (
        function()
        {
            var window_width = jQuery( '#war_sdy_pl_responsive_preview_window_width' ).val();
            var window_left = Math.round( screen.width / 2 - window_width / 2 );
            var window_top  = Math.round( screen.height / 2 - window_width / 2 );
            window_top = ( window_top < 0 ) ? 0 : window_top;
            var page_url = jQuery( '#war_sdy_pl_responsive_preview_url' ).val();
            if( _this.window_responsive_preview != undefined ) _this.window_responsive_preview.close();
            _this.window_responsive_preview = window.open( page_url, 'war_sdy_pl_responsive_preview',
                'width=' + window_width + ',height=' + window_width + ',left=' + window_left + ',top=' + window_top );
        }
    );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtracksForMetabox = function()
{
	var _this = this;
	
	_this.initSoundtracks();

	var jquery_soundtracks_radio = jQuery( 'input[name=war_sdy_pl_soundtracks_def]' );
	jquery_soundtracks_radio.change( function()
	{
		var radio_value = jQuery( 'input[name=war_sdy_pl_soundtracks_def]:checked' ).val();
		_this.setPlaylist( radio_value );
	} );

	_this.setPlaylist( 'init' );
}

WarSoundyAudioPlaylistAdmin.prototype.setPlaylist = function( mode )
{
	var _this = this;
	
	var is_init = ( mode == 'init' );
	if( is_init ) mode = 'default';
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );

    _this.removeSelection( _this.jquery_li_selected );
    jQuery( '#war_sdy_pl_playlist_title_custom' ).html( jQuery( '#war_sdy_pl_playlist_title' ).val() );
    jQuery( '#war_sdy_pl_playlist_title' ).val( jQuery( '#war_sdy_pl_playlist_title_default' ).html() );
    jQuery( '#war_sdy_pl_soundtracks_custom' ).html( jquery_soundtracks_list.html() );
    if( ! is_init ) _this.unselectSoundtrackYellow();
    jquery_soundtracks_list.html( jQuery( '#war_sdy_pl_soundtracks_default' ).html() );
    if( jquery_soundtracks_list.children().length )
    {
        _this.selectSoundtrack( jquery_soundtracks_list.children().first() );
    }
    else
    {
        jQuery( '#war_button_soundtrack_yellow_select' ).addClass( 'war_button_inactive' );
    }
    jquery_soundtracks_list.sortable( 'disable' );
    jquery_soundtracks_list.children().css( 'cursor', 'pointer' );
    jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
    jQuery( '#war_sdy_pl_playlist_comment' ).html( 'Click or use ↑ ↓ ← → for selecting. The list is scrollable.' );
    jQuery( '#war_sdy_pl_playlist_custom_comment' ).html( 'Default playlist does not belong to page and cannot be modified.' );
    _this.makeSoundtrackButtonsActive();
    jQuery( '#war_sdy_pl_button_container_add' ).hide();
    jQuery( '#war_sdy_pl_button_container_modify' ).hide();
    jQuery( '#war_sdy_pl_button_container_delete' ).hide();
    jQuery( '#war_sdy_pl_button_container_clear_all' ).hide();
    jQuery( '#war_sdy_pl_button_container_import' ).hide();
    jQuery( '#war_sdy_pl_button_container_undo' ).hide();
    jQuery( '#war_sdy_pl_playlist_title' ).prop( 'readonly', true );
    // Soundtrack Fields:
    jQuery( '#war_sdy_pl_field_container_audio_volume' ).hide();
    jQuery( '#war_sdy_pl_field_container_media_library' ).hide();
    jQuery( '#war_sdy_pl_field_container_audio_type' ).hide();
    jQuery( '#war_sdy_pl_audio_title' ).prop( 'readonly', true );
    jQuery( '#war_sdy_pl_audio_artist' ).prop( 'readonly', true );
    jQuery( '#war_sdy_pl_audio_composer' ).prop( 'readonly', true );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	jquery_soundtracks_list.sortable(
	{
		axis:        'y',
		opacity:     1,
		placeholder: 'war_sdy_pl_back_end_playlist_sortable_placeholder',
		change:      function( event, ui ) 
				     {
					    _this.numberSoundtracksWhileSorting( ui.item.index(), ui.placeholder.index() );
					 }
	} );
	jquery_soundtracks_list.disableSelection();
	
	jquery_soundtracks_list.on( 'click', 'li', function()
	{
		_this.selectSoundtrack( this );
	} );
	
	_this.jquery_li_selected = null;
    if( jquery_soundtracks_list.children().length )
    {
        jquery_soundtracks_list.children().first().click();
        if( jQuery( '#war_sdy_pl_playlist_title').val() != 'La Guitare Classique' )
        {
            jQuery( '#war_sdy_pl_courtesy').hide();
        }
    }
    else
    {
        jQuery( '#war_button_soundtrack_add' )          .addClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_modify' )       .addClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_delete' )       .addClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_clear_all' )    .addClass( 'war_button_inactive' );
        if( _this.is_metabox )
        {
            jQuery( '#war_button_soundtrack_yellow_select' )    .addClass( 'war_button_inactive' );
            jQuery( '#war_button_soundtrack_yellow_unselect' )  .addClass( 'war_button_inactive' );
        }
        else
        {
            jQuery( '#war_sdy_pl_courtesy').hide();
        }
    }
	jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
	jQuery( '#war_sdy_pl_playlist_comment' ).html( 'Click or use ↑ ↓ ← → for selecting. Drag & drop for sorting. Scrollable list.' );
	
	var jquery_audio_url           = jQuery( '#war_sdy_pl_audio_file_url' );
	var jquery_audio_volume        = jQuery( '#war_sdy_pl_audio_volume' );
    var jquery_audio_volume_slider = jQuery( '#war_sdy_pl_audio_volume_slider' );
	var jquery_audio_title         = jQuery( '#war_sdy_pl_audio_title' );
	var jquery_audio_type          = jQuery( '#war_sdy_pl_audio_type' );
	var jquery_audio_time          = jQuery( '#war_sdy_pl_audio_time' );
	var jquery_audio_artist        = jQuery( '#war_sdy_pl_audio_artist' );
	var jquery_audio_composer      = jQuery( '#war_sdy_pl_audio_composer' );
	
	_this.selected_soundtrack_has_been_changed = false;
	
	jquery_audio_url.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_volume.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_volume_slider.on( 'slidechange', function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_title.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_type.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_time.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_artist.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );
	
	jquery_audio_composer.change( function()
	{
		_this.selected_soundtrack_has_been_changed = true;
	} );

    jQuery( '#war_sdy_pl_tabs' ).on( 'tabsbeforeactivate', function( event, ui )
    {
        if( _this.selected_soundtrack_has_been_changed )
        {
            if( confirm( 'You have changed an audio field but not added or modified a soundtrack. Continue ?' ) )
            {
                _this.selected_soundtrack_has_been_changed = false;
                return true;
            }
            else
            {
                return false;
            }
        }
    } );

    function setArrowKeys( event )
	{
		if( event.keyCode == 38 || event.keyCode == 37 )
		{
			_this.selectSoundtrack( 'up' );
			return false;
		}
		else if( event.keyCode == 40 || event.keyCode == 39 )
		{
			_this.selectSoundtrack( 'down' );
			return false;
		}
	}
	
	jQuery( document ).bind( 'keydown.arrows', setArrowKeys );
	
	jQuery( 'textarea, input' ).focus( function( event )
	{
		jQuery( document ).unbind( 'keydown.arrows' );
	} );
	
	jQuery( 'textarea, input' ).blur( function( event )
	{
		jQuery( document ).bind( 'keydown.arrows', setArrowKeys );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackAdd = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
    var jquery_button_add       = jQuery( '#war_button_soundtrack_add' );

    jquery_button_add.click( function()
	{
        if( jquery_button_add.hasClass( 'war_button_inactive' ) ) return;

		_this.backupSoundtracks();
		var audio_url      = jQuery( '#war_sdy_pl_audio_file_url' ).val().trim();
		var audio_title    = jQuery( '#war_sdy_pl_audio_title' ).val().trim();
		var audio_volume   = jQuery( '#war_sdy_pl_audio_volume' ).val().trim();
		var audio_composer = jQuery( '#war_sdy_pl_audio_composer' ).val().trim();
		var audio_artist   = jQuery( '#war_sdy_pl_audio_artist' ).val().trim();
		var audio_time     = jQuery( '#war_sdy_pl_audio_time' ).val().trim();
		var audio_type     = jQuery( '#war_sdy_pl_audio_type' ).val().trim();
		var audio_id       = _this.getNewSoundtrackID();

		var number = jquery_soundtracks_list.children().length + 1;
		number = ( number < 10 ? '0' + number : number ) + '.';
		jquery_soundtracks_list.append( 
		'<li>' +
            '<div class="war_back_end_soundtrack_index">'   + number         + '</div>' +
            '<div class="war_back_end_soundtrack_url">'      + audio_url      + '</div>' +
            '<div class="war_back_end_soundtrack_title">'    + audio_title    + '</div>' +
            '<div class="war_back_end_soundtrack_artist">'   + audio_artist   + '</div>' +
            '<div class="war_back_end_soundtrack_composer">' + audio_composer + '</div>' +
            '<div class="war_back_end_soundtrack_time">'     + audio_time     + '</div>' +
            '<div class="war_back_end_soundtrack_id">'       + audio_id       + '</div>' +
            '<div class="war_back_end_soundtrack_type">'     + audio_type     + '</div>' +
            '<div class="war_back_end_soundtrack_volume">'   + audio_volume   + '</div>' +
        '</li>' );
		_this.selected_soundtrack_has_been_changed = false;
		var jquery_soundtrack_last = jquery_soundtracks_list.children().last();
		_this.selectSoundtrack( jquery_soundtrack_last );
		_this.emphasizeSelection();
		_this.numberSoundtracks();	
		_this.makeSoundtrackButtonsActive();
		jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.assignIdToSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	jquery_soundtracks_list.children().each( function( index, li )
	{
		var jquery_li = jQuery( li );
		var jquery_id = jquery_li.children( '.war_back_end_soundtrack_id' );
		if( jquery_id.html() ) return;
		jquery_id.html( _this.getNewSoundtrackID() );
	} );	
}

WarSoundyAudioPlaylistAdmin.prototype.assignDurationToSoundtracks = function( jquery_spinner )
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	jquery_soundtracks_list.children().each( function( index, li )
	{
		var jquery_li = jQuery( li );
		var jquery_time = jquery_li.children( '.war_back_end_soundtrack_time' );
		if( jquery_time.html() ) return true;
		if( typeof _this.soundtracks_without_duration === 'undefined' )
		{
			_this.soundtracks_without_duration = new Array();
		}
		_this.soundtracks_without_duration.push( jquery_li );
	} );
	
	if( typeof _this.soundtracks_without_duration !== 'undefined' )
	{
		function selectNextSoundtrack()
		{
			if( index < _this.soundtracks_without_duration.length )
			{
				var jquery_li = _this.soundtracks_without_duration[ index ];
				_this.selectSoundtrack( jquery_li );
				index++;
				setTimeout( selectNextSoundtrack, _this.time_to_get_soundtrack_duration );
			}
			else
			{
				delete _this.soundtracks_without_duration;
				if( typeof jquery_spinner !== 'undefined' )
				{
					jquery_spinner.empty();
				}
			}
		}
		var index = 0;
		setTimeout( selectNextSoundtrack, _this.time_to_get_soundtrack_duration );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.getNewSoundtrackID = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	
	var id_max = 0;
	jquery_soundtracks_list.children().each( function( index, li )
	{
		var jquery_li = jQuery( li );
		var html = jquery_li.children( '.war_back_end_soundtrack_id' ).html();
		if( html )
		{
			var id = html.substr( 1 );
			id_max = Math.max( id, id_max );
		}
	} );
	
	var id = 's' + ( id_max + 1 );
	
	return id;
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackModify = function()
{
	var _this = this;
	
	var jquery_button_modify = jQuery( '#war_button_soundtrack_modify' );
	jquery_button_modify.click( function()
	{
        if( jquery_button_modify.hasClass( 'war_button_inactive' ) ) return;
		_this.modifySoundtrack();
		_this.selected_soundtrack_has_been_changed = false;
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.getSoundtrackById = function( soundtrack_id )
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_soundtrack;
	
	jquery_soundtracks_list.children().each( function( index, li )
	{
		var jquery_li = jQuery( li );
		var id = jquery_li.children( '.war_back_end_soundtrack_id' ).html();
		if( id == soundtrack_id )
		{
			jquery_soundtrack = jquery_li;
			return false;
		}
	} );
	
	return jquery_soundtrack;
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackYellowSelect = function()
{
	var _this = this;
	
	var jquery_button_yellow_select      = jQuery( '#war_button_soundtrack_yellow_select' );
	var jquery_play_mode_from_selected    = jQuery( '#war_sdy_pl_play_mode_seq_from_selected' );
	var jquery_play_mode_selected         = jQuery( '#war_sdy_pl_play_mode_selected' );
	var jquery_yellow_select_id          = jQuery( '#war_sdy_pl_yellow_select_id' );
	
	var yellow_select_id = jquery_yellow_select_id.val();
	if( yellow_select_id )
	{
		var jquery_li = _this.getSoundtrackById( yellow_select_id );
		if( jquery_li )
		{
			_this.selectSoundtrackYellow( jquery_li );
		}
		else
		{
			_this.unselectSoundtrackYellow();
		}
	}
	else
	{
		_this.unselectSoundtrackYellow();
	}

	jquery_button_yellow_select.click( function()
	{
		if( _this.jquery_li_selected_yellow )
		{
			_this.removeSelectionYellow( _this.jquery_li_selected_yellow );
		}
		_this.selectSoundtrackYellow( _this.jquery_li_selected );
	} );

	jquery_play_mode_from_selected.click( function()
	{
		if( _this.jquery_li_selected && ! _this.jquery_li_selected_yellow )
		{
			_this.selectSoundtrackYellow( _this.jquery_li_selected );
		}
	} );

	jquery_play_mode_selected.click( function()
	{
		if( _this.jquery_li_selected && ! _this.jquery_li_selected_yellow )
		{
			_this.selectSoundtrackYellow( _this.jquery_li_selected );
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackYellowUnselect = function()
{
	var _this = this;
	
	var jquery_button_yellow_unselect = jQuery( '#war_button_soundtrack_yellow_unselect' );
	
	jquery_button_yellow_unselect.click( function()
	{
		_this.unselectSoundtrackYellow();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.numberSoundtracksWhileSorting = function( index_item, index_placeholder )
{
	var _this = this;
	
	index_item++; index_placeholder++;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	jquery_soundtracks_list.children().each( function( index, li )
	{
		index++;
		var jquery_li = jQuery( li );
		if( index == index_item )
		{
			if( index_item < index_placeholder )
			{
				index = index_placeholder - 1;		
			}
			else
			{
				index = index_placeholder;		
			}
		}
		else if( index > index_item )
		{
			index--;		
		}
		
		index = ( ( index < 10 ) ? ( '0' + index ) : index ) + '.';
		jquery_li.children( '.war_back_end_soundtrack_index' ).html( index );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.numberSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	jquery_soundtracks_list.children().each( function( index, li )
	{
		index++;
		var jquery_li = jQuery( li );
		index = ( ( index < 10 ) ? ( '0' + index ) : index ) + '.';
		jquery_li.children( '.war_back_end_soundtrack_index' ).html( index );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackDelete = function()
{
	var _this = this;

    var jquery_soundtracks_list          = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_button_add                = jQuery( '#war_button_soundtrack_add' );
    var jquery_button_delete             = jQuery( '#war_button_soundtrack_delete' );
	var jquery_button_modify             = jQuery( '#war_button_soundtrack_modify' );
	var jquery_button_yellow_select      = jQuery( '#war_button_soundtrack_yellow_select' );
	var jquery_button_yellow_unselect    = jQuery( '#war_button_soundtrack_yellow_unselect' );

	jquery_button_delete.click( function()
	{
        if( jquery_button_delete.hasClass( 'war_button_inactive' ) ) return;

		if( ! _this.jquery_li_selected )
		{
			alert( 'Please select a sountrack to delete.');
			return;
		}

		if( _this.selected_soundtrack_has_been_changed )
		{
			if( ! confirm( 'You have changed an audio field but not added or modified a soundtrack. Continue ?' ) )
			{
				return;
			}
		}

		if( jquery_soundtracks_list.children().length == 1 )
		{
			_this.clearAllSoundtracks();
		}
		else
		{
			jquery_soundtracks_list.children().each( function( index, li )
			{
				var jquery_li = jQuery( li );
				if( jquery_li.get( 0 ) === _this.jquery_li_selected.get( 0 ) )
				{
					_this.backupSoundtracks();
					if( _this.jquery_li_selected_yellow &&
							jquery_li.get( 0 ) === _this.jquery_li_selected_yellow.get( 0 ) )
					{
						_this.unselectSoundtrackYellow();
					}
					jquery_li.remove();
					_this.selected_soundtrack_has_been_changed = false;
					_this.numberSoundtracks();
					var new_soundtrack = jquery_soundtracks_list.children( ':eq(' + index + ')' );
					if( new_soundtrack.length )
					{
						_this.selectSoundtrack( new_soundtrack );
					}
					else
					{
						if( index > 0 )
						{
							index--;
							new_soundtrack = jquery_soundtracks_list.children( ':eq(' + index + ')' );
							if( new_soundtrack.length )
							{
								_this.selectSoundtrack( new_soundtrack );
							}
							else
							{
								_this.clearSoundtrackFields();
							}
						}
						else
						{
							_this.clearSoundtrackFields();
						}
					}
					return false;
				}
			} );
			jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackUndo = function()
{
	var _this = this;
	
	var jquery_button_undo       = jQuery( '#war_button_soundtrack_undo' );
	var jquery_soundtracks_list  = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_backups           = jQuery( '#war_sdy_pl_soundtracks_backups' );	
	
	jquery_button_undo.click( function()
	{
		if( jquery_backups.children().length )
		{
			_this.restoreSoundtracks();
			_this.makeSoundtrackButtonsActive();
		}
	} );
}


WarSoundyAudioPlaylistAdmin.prototype.makeSoundtrackButtonsActive = function()
{
	var _this = this;

    if( jQuery( '#war_sdy_pl_back_end_playlist' ).children().length )
    {
        jQuery( '#war_button_soundtrack_add' ).removeClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_modify' ).removeClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_delete' ).removeClass( 'war_button_inactive' );
        jQuery( '#war_button_soundtrack_clear_all' ).removeClass( 'war_button_inactive' );

        var jquery_select = jQuery( '#war_button_soundtrack_yellow_select' );
        if( jquery_select.length ) jquery_select.removeClass( 'war_button_inactive' );
        var jquery_unselect = jQuery( '#war_button_soundtrack_yellow_unselect' );
        if( jquery_unselect.length && _this.jquery_li_selected_yellow )
        {
            jquery_unselect.removeClass( 'war_button_inactive' );
        }
    }
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackDefault = function()
{
	var _this = this;
	
	var jquery_button_default      = jQuery( '#war_button_soundtrack_default' );
	var jquery_soundtracks_list    = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_default_list        = jQuery( '#war_sdy_pl_soundtracks_default' );
    var jquery_default_list_title  = jQuery( '#war_sdy_pl_playlist_title_default' );
    var jquery_list_title          = jQuery( '#war_sdy_pl_playlist_title' );
    var jquery_courtesy            = jQuery( '#war_sdy_pl_courtesy' );
	jquery_button_default.click( function()
	{
        jquery_list_title.val( jquery_default_list_title.html() );
        jquery_courtesy.show();
		_this.backupSoundtracks();
		var default_list = jquery_default_list.html();
		jquery_soundtracks_list.html( default_list );
		_this.selectSoundtrack( jquery_soundtracks_list.children().first() );
		jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );		
		_this.makeSoundtrackButtonsActive();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.modifySoundtrack = function()
{
	var _this = this;	
	
	if( _this.jquery_li_selected )
	{	
		_this.backupSoundtracks();
		var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
		var jquery_audio_url        = jQuery( '#war_sdy_pl_audio_file_url' );
		var jquery_audio_volume     = jQuery( '#war_sdy_pl_audio_volume' );
		var jquery_audio_title      = jQuery( '#war_sdy_pl_audio_title' );
		var jquery_audio_artist     = jQuery( '#war_sdy_pl_audio_artist' );
		var jquery_audio_composer   = jQuery( '#war_sdy_pl_audio_composer' );
		var jquery_audio_time       = jQuery( '#war_sdy_pl_audio_time' );
		var jquery_audio_type       = jQuery( '#war_sdy_pl_audio_type' );

		var audio_url       = jquery_audio_url.val().trim();
		var audio_title     = jquery_audio_title.val().trim();
		var audio_artist    = jquery_audio_artist.val().trim();
		var audio_composer  = jquery_audio_composer.val().trim();
		var audio_time      = jquery_audio_time.val().trim();
		var audio_type      = jquery_audio_type.val().trim();
		
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_url' ).html( audio_url );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_volume' ).html( jquery_audio_volume.val() );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_title' ).html( audio_title );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_artist' ).html( audio_artist );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_composer' ).html( audio_composer );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_time' ).html( audio_time );
		_this.jquery_li_selected.children( '.war_back_end_soundtrack_type' ).html( audio_type );
		
		_this.emphasizeSelection();
	}
}

WarSoundyAudioPlaylistAdmin.prototype.selectSoundtrack = function( li_selected )
{
	var _this = this;
	
	var jquery_li_selected;
	
	if( li_selected instanceof jQuery )
	{
		jquery_li_selected = li_selected;
		li_selected = jquery_li_selected.get( 0 );
	}
	else if( li_selected == 'up' )
	{
		if( _this.jquery_li_selected )
		{
			var jquery_li_selected = _this.jquery_li_selected.prev();
			if( jquery_li_selected.length )
			{
				li_selected = jquery_li_selected.get( 0 );
			}
			else
			{
				return;
			}
		}
		else
		{
			return;			
		}
	}
	else if( li_selected == 'down' )
	{
		if( _this.jquery_li_selected )
		{
			var jquery_li_selected = _this.jquery_li_selected.next();
			if( jquery_li_selected.length )
			{
				li_selected = jquery_li_selected.get( 0 );
			}
			else
			{
				return;
			}
		}
		else
		{
			return;			
		}
	}
	else
	{
		jquery_li_selected = jQuery( li_selected );
	}
	
	if( _this.jquery_li_selected )
	{
		var li_current = _this.jquery_li_selected.get( 0 );
		if( li_selected === li_current )
		{
			return;
		}
	}
	
	// This is to trigger the change event on element with focus, in case it has been changed:
	if( document.activeElement )
	{
		jQuery( document.activeElement ).blur();
	}

	if( _this.selected_soundtrack_has_been_changed )
	{
		if( ! confirm( 'You have changed an audio field but not added or modified a soundtrack. Continue ?' ) )
		{
			return;
		}
	}
	
	function isOutOfViewport( jquery_ul, jquery_li )
	{
    var top = jquery_ul.scrollTop();
    var bottom = top + jquery_ul.height();
    
    var ul_offset = jquery_ul.offset();
    var li_offset = jquery_li.offset();
    var li_top = li_offset.top - ul_offset.top + top + 1;
    var li_bottom = li_top + jquery_li.outerHeight();
    
    return ( top > li_bottom || bottom < ( li_top + 5 ) );
	};
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	if( isOutOfViewport( jquery_soundtracks_list, jquery_li_selected ) )
	{
		var ul = jquery_soundtracks_list.get( 0 );
		var offset = li_selected.offsetTop - ul.offsetTop;
		ul.scrollTop = offset;
	}

	if( _this.jquery_li_selected )
	{
		_this.removeSelection( _this.jquery_li_selected );		
	}
	
	var jquery_audio_url        = jQuery( '#war_sdy_pl_audio_file_url' );
	var jquery_audio_volume     = jQuery( '#war_sdy_pl_audio_volume' );
	var jquery_audio_title      = jQuery( '#war_sdy_pl_audio_title' );
	var jquery_audio_type       = jQuery( '#war_sdy_pl_audio_type' );
	var jquery_audio_time       = jQuery( '#war_sdy_pl_audio_time' );
	var jquery_audio_id         = jQuery( '#war_sdy_pl_audio_id' );
	var jquery_audio_artist     = jQuery( '#war_sdy_pl_audio_artist' );
	var jquery_audio_composer   = jQuery( '#war_sdy_pl_audio_composer' );

	var audio_url = jquery_li_selected.children( '.war_back_end_soundtrack_url' ).html();
	jquery_audio_url.val( audio_url );
	jquery_audio_url.change();
	var audio_volume = jquery_li_selected.children( '.war_back_end_soundtrack_volume' ).html();
	jquery_audio_volume.val( audio_volume );
	jquery_audio_volume.change();
	var audio_title = jquery_li_selected.children( '.war_back_end_soundtrack_title' ).html();
	jquery_audio_title.val( audio_title );
	var audio_type = jquery_li_selected.children( '.war_back_end_soundtrack_type' ).html();
	jquery_audio_type.val( audio_type );
	jquery_audio_type.change();
	var audio_time = jquery_li_selected.children( '.war_back_end_soundtrack_time' ).html();
	jquery_audio_time.val( audio_time );
	var audio_id = jquery_li_selected.children( '.war_back_end_soundtrack_id' ).html();
	jquery_audio_id.val( audio_id );
	var audio_artist = jquery_li_selected.children( '.war_back_end_soundtrack_artist' ).html();
	jquery_audio_artist.val( audio_artist );
	var audio_composer = jquery_li_selected.children( '.war_back_end_soundtrack_composer' ).html();
	jquery_audio_composer.val( audio_composer );

	_this.addSelection( jquery_li_selected );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackImport = function()
{
	var _this = this;

	jQuery( 'body' ).append( '<form id="war_sdy_pl_soundtracks_import_form"></form>' );
	var jquery_form             = jQuery( '#war_sdy_pl_soundtracks_import_form' );
    var jquery_button           = jQuery( '#war_sdy_pl_soundtracks_import_button' );
	var jquery_output           = jQuery( '#war_sdy_pl_soundtracks_import_output' );
	var jquery_spinner          = jQuery( '#war_sdy_pl_soundtracks_import_spinner' );
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
   
	jquery_form.ajaxForm();
  
	jquery_form.submit( function() 
	{ 
		jQuery( this ).ajaxSubmit(
		{
			url:    		ajaxurl,
			target: 		jquery_output,
			type:   		'POST',
            data:           {
                                action: 'sdy_pl_import_soundtracks'
                            },
			beforeSend:     function() 
	                        {
                                jquery_output.empty();
                                jquery_spinner.html( '<img src="' + _this.plugin_url + '/images/spinner.gif" style="vertical-align: middle;"> ' );
                                jquery_spinner.show();
	    					},
	        success: 		function()
	                        {
                                var import_output = jquery_output.html();
                                if( import_output )
                                {
                                    _this.backupSoundtracks();
                                    jquery_soundtracks_list.append( import_output );
                                    _this.numberSoundtracks();
                                    _this.assignIdToSoundtracks();
                                    jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
                                    _this.makeSoundtrackButtonsActive();
                                    _this.assignDurationToSoundtracks( jquery_spinner );
                                }
                                else
                                {
                                    jquery_spinner.empty();
                                    alert( 'No soundtracks found !' );
                                }
                            },
			error:  		function()
					        {
								jquery_output.html( 'An error occured !' );
					        }
		} );
		
    return false;
  } ); 

  jquery_button.click( function()
  {
  	jquery_form.submit();
  } );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackClearAll = function()
{
	var _this = this;

	jQuery( '#war_button_soundtrack_clear_all' ).click( function()
	{
		_this.clearAllSoundtracks();
        jQuery( '#war_sdy_pl_courtesy').hide();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSoundtrackClearFields = function()
{
	var _this = this;

	jQuery( '#war_button_soundtrack_clear_fields' ).click( function()
	{
		_this.clearSoundtrackFields();
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.clearAllSoundtracks = function()
{
	var _this = this;

	_this.backupSoundtracks();
	jQuery( '#war_sdy_pl_back_end_playlist' ).children().remove();
	_this.clearSoundtrackFields();
	
	_this.jquery_li_selected = null;
	_this.unselectSoundtrackYellow();
	jQuery( '#war_sdy_pl_number_of_tracks' ).html( 0 );

	// add and modify deactivated by clearSoundtrackFields()
	jQuery( '#war_button_soundtrack_delete' ).addClass( 'war_button_inactive' );
	jQuery( '#war_button_soundtrack_clear_all' ).addClass( 'war_button_inactive' );
	if( _this.is_metabox )
    {
        jQuery( '#war_button_soundtrack_yellow_select' ).addClass( 'war_button_inactive' );
    }
}

WarSoundyAudioPlaylistAdmin.prototype.clearSoundtrackFields = function()
{
	var _this = this;
	
	var jquery_audio_url       = jQuery( '#war_sdy_pl_audio_file_url' );
	var jquery_audio_volume    = jQuery( '#war_sdy_pl_audio_volume' );
	var jquery_audio_title     = jQuery( '#war_sdy_pl_audio_title' );
	var jquery_audio_time      = jQuery( '#war_sdy_pl_audio_time' );
	var jquery_audio_type      = jQuery( '#war_sdy_pl_audio_type' );
	var jquery_audio_id        = jQuery( '#war_sdy_pl_audio_id' );
	var jquery_audio_artist    = jQuery( '#war_sdy_pl_audio_artist' );
	var jquery_audio_composer  = jQuery( '#war_sdy_pl_audio_composer' );

	jquery_audio_url.val( '' );
	jquery_audio_url.change();
	jquery_audio_volume.val( 80 );
	jquery_audio_volume.change();
	jquery_audio_title.val( '' );
	jquery_audio_time.val( '' );
	jquery_audio_type.val( '' );
	jquery_audio_id.val( '' );
	jquery_audio_artist.val( '' );
	jquery_audio_composer.val( '' );
	
	jQuery( '#war_button_soundtrack_add' ).addClass( 'war_button_inactive' );
	jQuery( '#war_button_soundtrack_modify' ).addClass( 'war_button_inactive' );
	_this.selected_soundtrack_has_been_changed = false;
}

WarSoundyAudioPlaylistAdmin.prototype.htmlEntities = function( str )
{
	var _this = this;
	
  return String( str ).replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' )
                      .replace( /\'/g, '&apos;' ).replace( /\"/g, '&quot;' );
}

WarSoundyAudioPlaylistAdmin.prototype.htmlEntitiesDecode = function( str )
{
	var _this = this;
	
  return String( str ).replace( /&amp;/g, '&' ).replace( /&lt;/g, '<' ).replace( /&gt;/g, '>' )
                      .replace( /&apos;/g, "'" ).replace( /&quot;/g, '"' );
}

WarSoundyAudioPlaylistAdmin.prototype.backupSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	if( jquery_soundtracks_list.children().length )
	{
		var playlist = '';
		jquery_soundtracks_list.children().each( function( index, li )
		{
			var jquery_li = jQuery( li );
			playlist += '<li>' + jquery_li.html() + '</li>';
		} );
		
		var playlist_encoded = _this.htmlEntities( playlist );
		var jquery_backup_list = jQuery( '#war_sdy_pl_soundtracks_backups' );
		if( jquery_backup_list.children().length )
		{
			var last_backup_playlist = jquery_backup_list.children().last().html();
			if( last_backup_playlist == playlist_encoded )
			{
				return;
			}
		}
		jQuery( '#war_sdy_pl_soundtracks_backups' ).append( '<li>' + playlist_encoded + '</li>' );
		jQuery( '#war_button_soundtrack_undo' ).removeClass( 'war_button_inactive' );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.unbackupSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_backups = jQuery( '#war_sdy_pl_soundtracks_backups' );
	
	var jquery_backups = jquery_soundtracks_backups.children();
	if( jquery_backups.length )
	{
		jquery_backups.last().remove();
		if( jquery_soundtracks_backups.children().length == 0 ) jQuery( '#war_button_soundtrack_undo' ).addClass( 'war_button_inactive' );
	}
}

WarSoundyAudioPlaylistAdmin.prototype.restoreSoundtracks = function()
{
	var _this = this;
	
	var jquery_soundtracks_backups = jQuery( '#war_sdy_pl_soundtracks_backups' );
	var jquery_backups = jquery_soundtracks_backups.children();
	if( jquery_backups.length )
	{
		var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
		jquery_soundtracks_list.empty();
		var backup = jquery_backups.last().html();
		jquery_backups.last().remove();
		if( jquery_soundtracks_backups.children().length == 0 ) jQuery( '#war_button_soundtrack_undo' ).addClass( 'war_button_inactive' );
		jquery_soundtracks_list.empty();
		var backup_decoded = _this.htmlEntitiesDecode( backup );
		jquery_soundtracks_list.html( backup_decoded );
		jQuery( '#war_sdy_pl_number_of_tracks' ).html( jquery_soundtracks_list.children().length );
		_this.selectSoundtrack( jquery_soundtracks_list.children().first() );
		_this.selected_soundtrack_has_been_changed = false;
	}
}

String.prototype.hashCode = function() 
{
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

WarSoundyAudioPlaylistAdmin.prototype.setAudioDurationOnSoundtrack = function( jquery_li )
{
	var _this = this;
	
	if( typeof _this.audio_helpers === 'undefined' )
	{
		_this.audio_helpers = new Array();
	}
	
	var id   = jquery_li.children( '.war_back_end_soundtrack_id' ).html();
	var url  = jquery_li.children( '.war_back_end_soundtrack_url' ).html();
	var type = jquery_li.children( '.war_back_end_soundtrack_type' ).html();
	
	_this.audio_helpers[ id ] = new Audio();
	_this.audio_helpers[ id ].src  = url;
	_this.audio_helpers[ id ].type = type;
	_this.audio_helpers[ id ].preload = 'metadata';
	
	_this.audio_helpers[ id ].addEventListener( 'loadedmetadata', function( )
	{
		var duration = this.duration;
		var seconds = Math.round( duration );
		var hms_time = _this.secondsToHms( seconds );
		jquery_li.children( '.war_back_end_soundtrack_time' ).html( hms_time );
	}, false );
}

WarSoundyAudioPlaylistAdmin.prototype.secondsToHms = function( d )
{
	d = Number( d );
	var h = Math.floor( d / 3600 );
	var m = Math.floor( d % 3600 / 60 );
	var s = Math.floor( d % 3600 % 60 );
	return ( ( h > 0 ? h + ':' : '' ) + ( m > 0 ? ( h > 0 && m < 10 ? '0' : '' ) + m + ':' : '0:' ) + ( s < 10 ? '0' : '' ) + s ); 
}

WarSoundyAudioPlaylistAdmin.prototype.initSubmit = function()
{
	var _this = this;

	var spinner = new Image( 20, 20 );
	spinner.src = _this.plugin_url  + '/images/spinner.gif';
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_submit = jQuery( '#submit' );
	jquery_submit.click( function( event )
	{
        if( _this.selected_soundtrack_has_been_changed )
        {
            if( ! confirm( 'You have changed an audio field but not added or modified a soundtrack. Continue ?' ) )
            {
                if( event.preventDefault ) event.preventDefault(); else event.returnValue = false;
                return false;
            }
        }

		jquery_soundtracks_list.children().each( function( index, li )
		{
			var jquery_li = jQuery( li );
			jquery_li.removeAttr( 'class' );
			jquery_li.removeAttr( 'style' );
		} );

		var playlist = jquery_soundtracks_list.html();
        playlist = playlist.replace( /war_back_end_soundtrack/g, 'war_soundtrack' );
		var playlist_encoded = _this.htmlEntities( playlist );
		jQuery( '#war_sdy_pl_soundtracks' ).val( playlist_encoded );

		jQuery( 'p.submit' ).append( ' &nbsp;&nbsp; <img src="' + spinner.src  + '" style="vertical-align: middle;">' );
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.initSubmitMetabox = function()
{
	var _this = this;

	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_back_end_playlist' );
	var jquery_submit = jQuery( '#publish' );
	jquery_submit.click( function()
	{
		var mode = jQuery( 'input[name=war_sdy_pl_soundtracks_def]:checked' ).val();
		if(  mode == 'default' )
		{
			jQuery( '#war_sdy_pl_soundtracks' ).val( 'default' );
		}
		else //if( mode == 'custom' )
		{			
			jquery_soundtracks_list.children().each( function( index, li )
			{
				var jquery_li = jQuery( li );
				jquery_li.removeAttr( 'class' );
				jquery_li.removeAttr( 'style' );
			} );
			var playlist = jquery_soundtracks_list.html();
            playlist = playlist.replace( /war_back_end_soundtrack/g, 'war_soundtrack' );
			var playlist_encoded = _this.htmlEntities( playlist );
			jQuery( '#war_sdy_pl_soundtracks' ).val( playlist_encoded );
		}
	} );
}

WarSoundyAudioPlaylistAdmin.prototype.emphasizeSelection = function()
{
	var _this = this;

	if( ! _this.jquery_li_selected ) return;

	var jquery = _this.jquery_li_selected;

	var selected_is_same_as_yellow = false;
	if( _this.jquery_li_selected_yellow )
	{
		if( _this.jquery_li_selected.get( 0 ) === _this.jquery_li_selected_yellow.get( 0 ) )
		{
			selected_is_same_as_yellow = true;
		}
	}

	if( selected_is_same_as_yellow )
	{
		var start_color = _this.color_yellow_start;
		var end_color   = _this.color_yellow_end;
	}
	else
	{
		var start_color =  _this.color_blue_start;
		var end_color   =  _this.color_blue_end;
	}
	
	jquery.removeClass( 'war_back_end_soundtrack_selected' );
	jquery.css( 'background-color', start_color );
	jquery.animate( 
	{
		backgroundColor: end_color
	}, 1000 );
}

WarSoundyAudioPlaylistAdmin.prototype.unselectSoundtrackYellow = function()
{
	var _this = this;

	if( _this.is_metabox )
	{
		jQuery( '#war_button_soundtrack_yellow_unselect' ).addClass( 'war_button_inactive' );
		jQuery( '#war_sdy_pl_yellow_select_id').val( '' );
		
		var play_mode = jQuery( 'input[name=war_sdy_pl_play_mode]:checked' ).val();
		if( play_mode == 'seq_from_selected' || play_mode == 'selected' )
		{
			var comment = '<span style="color: #ff0000">(no soundtrack selected)</span>';
		}
		else
		{
			var comment = '';
		}
		jQuery( '#war_sdy_pl_play_mode_seq_from_selected_comment' ).html( comment );
		jQuery( '#war_sdy_pl_play_mode_selected_comment' ).html( comment );

		if( _this.jquery_li_selected_yellow )
		{
			_this.removeSelectionYellow( _this.jquery_li_selected_yellow );
		}
	}
}

WarSoundyAudioPlaylistAdmin.prototype.selectSoundtrackYellow = function( jquery_li )
{
	var _this = this;

    if( ! jquery_li ) return;

	_this.jquery_li_selected_yellow = jquery_li;

	var yellow_id = jquery_li.children( '.war_back_end_soundtrack_id' ).html();
	jQuery( '#war_sdy_pl_yellow_select_id' ).val( yellow_id );
	var comment = '<span style="color: #2eaecc">(' + yellow_id + ': ' + jquery_li.children( '.war_back_end_soundtrack_title' ).html().substr( 0, 30 ) + ')</span>';
	jQuery( '#war_sdy_pl_play_mode_seq_from_selected_comment' ).html( comment );
	jQuery( '#war_sdy_pl_play_mode_selected_comment' ).html( comment );
	jQuery( '#war_button_soundtrack_yellow_unselect' ).removeClass( 'war_button_inactive' );

	var start_color = _this.color_yellow_start;
	var end_color   = _this.color_yellow_end;
	jquery_li.removeClass( 'war_back_end_soundtrack_selected' );
	jquery_li.css( 'background-color', start_color );
	jquery_li.animate( 
	{
		backgroundColor: end_color
	}, 1000 );
}

WarSoundyAudioPlaylistAdmin.prototype.addSelection = function( jquery )
{
	var _this = this;
	
	if( ! _this.jquery_li_selected_yellow )
	{
		jquery.addClass( 'war_back_end_soundtrack_selected' );
	}
	else if( jquery.get( 0 ) !== _this.jquery_li_selected_yellow.get( 0 ) )
	{
		jquery.addClass( 'war_back_end_soundtrack_selected' );
	}
	
	_this.jquery_li_selected = jquery;	
	_this.selected_soundtrack_has_been_changed = false;
}

WarSoundyAudioPlaylistAdmin.prototype.removeSelection = function( jquery )
{
	var _this = this;

    if( jquery )
    {
        jquery.removeClass( 'war_back_end_soundtrack_selected' );
        if( ! _this.jquery_li_selected_yellow )
        {
            jquery.css( 'background-color', '#ffffff' );
            jquery.css( 'color', '' );
        }
        else if( jquery.get( 0 ) !== _this.jquery_li_selected_yellow.get( 0 ) )
        {
            jquery.css( 'background-color', '#ffffff' );
            jquery.css( 'color', '' );
        }
    }
}

WarSoundyAudioPlaylistAdmin.prototype.removeSelectionYellow = function( jquery )
{
	var _this = this;

    if( jquery )
    {
        if( _this.is_metabox && jquery.length )
        {
            jquery.css( 'background-color', '#ffffff' );
            jquery.css( 'color', '' );

            if( _this.jquery_li_selected && _this.jquery_li_selected_yellow )
            {
                if( _this.jquery_li_selected.length && _this.jquery_li_selected_yellow.length )
                {
                    if( _this.jquery_li_selected.get( 0 ) === _this.jquery_li_selected_yellow.get( 0 ) )
                    {
                        _this.jquery_li_selected.addClass( 'war_back_end_soundtrack_selected' );
                    }
                }
            }
            _this.jquery_li_selected_yellow = null;
        }
    }
}
