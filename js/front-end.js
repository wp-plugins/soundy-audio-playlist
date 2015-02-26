function war_SoundyAudioPlaylistFrontEnd( args )
{
	var _this = this;

	_this.soundtracks_list         = args.soundtracks;
	_this.autoplay                 = args.autoplay;
	_this.play_mode                = args.play_mode;
	_this.audio_loop               = args.audio_loop;
	_this.pp_code                  = args.pp_code;
	_this.yellow_select_id         = args.yellow_select_id;
	_this.preview                  = args.preview;
	_this.button_url_play_normal   = args.button_url_play;
	_this.button_url_pause_normal  = args.button_url_pause;
	_this.button_url_play_hover    = args.hover_url_play;
	_this.button_url_pause_hover   = args.hover_url_pause;
	_this.user_agent_is_IOS        = args.user_agent_is_IOS;

    _this.autoplay = _this.user_agent_is_IOS ? 'no' : _this.autoplay;

	jQuery.noConflict();

    _this.autoplay = ( _this.autoplay == 'yes' );
	_this.audio_loop = ( _this.audio_loop == 'yes' );

    _this.is_preview              = _this.preview != 'false';
	_this.hovering                = false;
	_this.jquery_li_selected      = null;
	_this.is_playlist_shortcode   = false;
	_this.is_playing              = _this.autoplay;
    _this.is_audio_mode_logic     = true;

	jQuery( document ).ready( function() 
	{
		if( _this.pp_code )
		{
			jQuery( 'body' ).append( _this.pp_code );
		}

        _this.audio_player_element = new Audio();
        _this.audio_player = jQuery( _this.audio_player_element );
        _this.audio_control = jQuery( '.war_sdy_pl_audio_control' );
        _this.column_ordered_names = sdy_pl_column_ordered_names_string.split( ',' );
        var jquery_playlist = jQuery( '#war_sdy_pl_playlist' );
        if( jquery_playlist.length )
        {
            _this.jquery_playlist = jquery_playlist;
        }
        else
        {
            jQuery( 'body' ).append( '<ul id="war_sdy_pl_playlist" class="war_hidden"></ul>' );
            _this.jquery_playlist = jQuery( '#war_sdy_pl_playlist' );
            _this.jquery_playlist.append( _this.soundtracks_list );
        }

        _this.initPlaylist();
        _this.initShortcodePlaceholders();

		if( _this.is_preview )
		{
            _this.initPreview();
        }

		_this.setEventHandlersForPlayPauseButtons();
		_this.setEventHandlersForAudioPlayer();
        _this.initPlayMode();
        _this.initPlaylistColumns();

        if( ! sdy_pl_css_use_only )
        {
            _this.initPlaylistCSS();
        }

        _this.makePlaylistResponsive();
        _this.makePlayPauseButtonResponsive();

        jQuery( window ).resize( function()
        {
            _this.makePlaylistResponsive();
            _this.makePlayPauseButtonResponsive();
        } );
	} );
}

war_SoundyAudioPlaylistFrontEnd.prototype.initPlayMode = function()
{
    var _this = this;

    var soundtracks = _this.jquery_playlist.children();
    var first_soundtrack = null;
    switch( _this.play_mode )
    {
        case 'seq_from_first':
        case 'seq_from_selected':
            if( _this.play_mode == 'seq_from_first' )
            {
                first_soundtrack = soundtracks.first();
            }
            else //if( _this.play_mode == 'seq_from_selected' )
            {
                if( _this.yellow_select_id )
                {
                    var soundtrack = _this.getSoundtrackById( _this.yellow_select_id );
                    first_soundtrack = ( soundtrack && soundtrack.length ) ? soundtrack : soundtracks.first();
                }
                else
                {
                    first_soundtrack = soundtracks.first();
                }
            }
            _this.current_soundtrack = first_soundtrack;
            if( _this.autoplay )
            {
                _this.loadAudioPlayer( 'play' );
            }
            else
            {
                _this.loadAudioPlayer( 'pause' );
            }

            _this.audio_player.bind( 'ended.audio_mode_logic' , function()
            {
                var next_soundtrack = _this.current_soundtrack.next();
                if( next_soundtrack.length )
                {
                    _this.current_soundtrack = next_soundtrack;
                }
                else
                {
                    _this.current_soundtrack = soundtracks.first();
                }
                if( _this.current_soundtrack.get( 0 ) !== first_soundtrack.get( 0 ) )
                {
                    _this.loadAudioPlayer( 'play' );
                }
                else if( _this.current_soundtrack.get( 0 ) === first_soundtrack.get( 0 ) && _this.audio_loop )
                {
                    _this.loadAudioPlayer( 'play' );
                }
                else //if( _this.current_soundtrack.get( 0 ) === first_soundtrack.get( 0 ) && ! _this.audio_loop )
                {
                    _this.loadAudioPlayer( 'pause' );
                }
            } );
            break;
    
        case 'random_one':
            if( soundtracks.length == 1 )
            {
                _this.current_soundtrack = soundtracks.first();
                if( _this.autoplay )
                {
                    _this.loadAudioPlayer( 'play', _this.audio_loop );
                }
                else
                {
                    _this.loadAudioPlayer( 'pause', _this.audio_loop );
                }
            }
            else
            {
                var index_last = sessionStorage.getItem( 'war_sdy_pl_soundtrack_index' );
                var index_random = Math.floor( Math.random() * soundtracks.length );
                if( index_last )
                {
                    index_last--;
                    while( index_random == index_last )
                    {
                        index_random = Math.floor( Math.random() * soundtracks.length );
                    }
                }
                sessionStorage.setItem( 'war_sdy_pl_soundtrack_index', index_random + 1 );
                var index_selector = ':eq(' + index_random + ')';
                _this.current_soundtrack = soundtracks.filter( index_selector );
                if( _this.autoplay )
                {
                    _this.loadAudioPlayer( 'play', _this.audio_loop );
                }
                else
                {
                    _this.loadAudioPlayer( 'pause', _this.audio_loop );
                }
            }
            break;
    
        case 'random_all':
            if( soundtracks.length == 1 )
            {
                _this.current_soundtrack = soundtracks.first();
                if( _this.autoplay )
                {
                    _this.loadAudioPlayer( 'play', _this.audio_loop );
                }
                else
                {
                    _this.loadAudioPlayer( 'pause', _this.audio_loop );
                }
            }
            else
            {
                var indexes = new Array();
                var index_random = Math.floor( Math.random() * soundtracks.length );
                var index_last = sessionStorage.getItem( 'war_sdy_pl_soundtrack_index' );
                var there_is_index_last = false;
                if( index_last )
                {
                    there_is_index_last = true;
                    index_last--;
                    indexes[ index_last ] = true;
                    while( index_random == index_last )
                    {
                        index_random = Math.floor( Math.random() * soundtracks.length );
                    }
                }
                sessionStorage.setItem( 'war_sdy_pl_soundtrack_index', index_random + 1 );
                indexes[ index_random ] = true;
                var index_selector = ':eq(' + index_random + ')';
                _this.current_soundtrack = soundtracks.filter( index_selector );
                if( _this.autoplay )
                {
                    _this.loadAudioPlayer( 'play' );
                }
                else
                {
                    _this.loadAudioPlayer( 'pause' );
                }
    
                _this.number_of_playings = 0;
    
                _this.audio_player.bind( 'ended.audio_mode_logic' , function()
                {
                    if( _this.arrayLength( indexes ) < soundtracks.length )
                    {
                        do
                        {
                            var index_random = Math.floor( Math.random() * soundtracks.length );
                        }
                        while( index_random in indexes );
                        indexes[ index_random ] = true;
                        var index_selector = ':eq(' + index_random + ')';
                        _this.current_soundtrack = soundtracks.filter( index_selector );
                        if( _this.number_of_playings && ! _this.audio_loop )
                        {
                            _this.loadAudioPlayer( 'pause' );
                            _this.number_of_playings = 0;
                        }
                        else
                        {
                            _this.loadAudioPlayer( 'play' );
                        }
                    }
                    else
                    {
                        if( there_is_index_last )
                        {
                            var index_selector = ':eq(' + index_last + ')';
                            var soundtrack = soundtracks.filter( index_selector );
                            if( soundtrack.length )
                            {
                                _this.current_soundtrack = soundtrack;
                                _this.loadAudioPlayer( 'play' );
                            }
                        }
                        indexes = new Array();
                        indexes[ index_last ] = true;
                        _this.number_of_playings++;
                    }
                } );
            }
            break;
    
        case 'selected':
            var soundtrack = _this.getSoundtrackById( _this.yellow_select_id );
            _this.current_soundtrack = ( soundtrack && soundtrack.length ) ? soundtrack : soundtracks.first();
            if( _this.autoplay )
            {
                _this.loadAudioPlayer( 'play', _this.audio_loop );
            }
            else
            {
                _this.loadAudioPlayer( 'pause', _this.audio_loop );
            }
            break;
    }
}

war_SoundyAudioPlaylistFrontEnd.prototype.arrayLength = function( arr )
{
	var _this = this;
	
	var length = 0;
	for( var index in arr )
	{
		if ( ! isNaN( index ) ) length++;
	}
	
	return length;
}

war_SoundyAudioPlaylistFrontEnd.prototype.getSoundtrackById = function( id )
{
	var _this = this;
	
	var found_soundtrack = null;
	
	_this.jquery_playlist.children().each( function( index, li )
	{
		var jquery_li = jQuery( li );
		var jquery_id = jquery_li.children( '.war_soundtrack_id' );
		if( jquery_id.html() == id )
		{
			found_soundtrack = jquery_li;
			return false;
		}
	} );
	
	return found_soundtrack;
}

war_SoundyAudioPlaylistFrontEnd.prototype.loadAudioPlayer = function( mode, audio_loop, origin )
{
	var _this = this;
	
	var audio_index       = _this.current_soundtrack.index() + 1;
	var audio_id          = _this.current_soundtrack.children( '.war_soundtrack_id' ).html();
	var audio_url         = _this.current_soundtrack.children( '.war_soundtrack_url' ).html();
	var audio_type        = _this.current_soundtrack.children( '.war_soundtrack_type' ).html();
	var audio_duration    = _this.current_soundtrack.children( '.war_soundtrack_time' ).html();
	var audio_title       = _this.current_soundtrack.children( '.war_soundtrack_title' ).html();
	var audio_artist      = _this.current_soundtrack.children( '.war_soundtrack_artist' ).html();
	var audio_composer    = _this.current_soundtrack.children( '.war_soundtrack_composer' ).html();
    var audio_volume      = parseInt( _this.current_soundtrack.children( '.war_soundtrack_volume' ).html() );

    // Removes any HTML tag like: <span class="skimlinks-unlinked">...</span> in URL
    var audio_url = audio_url.replace( /<[^>]+\>/g, '' );

    _this.audio_control.attr( 'title', audio_title );
	_this.audio_player_element.src      = audio_url;
	_this.audio_player_element.type     = audio_type;
	_this.audio_player_element.volume   = audio_volume / 100;
	_this.audio_player_element.loop     = audio_loop;
	_this.audio_player_element.preload  = 'auto';
	
	if( mode == 'auto' )
	{
		mode = _this.is_playing ? 'play' : 'pause';
	}
	
	if( mode == 'play' )
	{
		_this.audio_player_element.autoplay = true;		
		_this.audio_control.attr( 'src', _this.button_url_pause_normal );
	}
	else //if( mode == 'pause' )
	{
		_this.audio_player_element.autoplay = false;		
		_this.audio_control.attr( 'src', _this.button_url_play_normal );
	}

    // highlight soundtrack in displayed playlist if playlist is displayed
	if( _this.is_playlist_shortcode && typeof origin == 'undefined' )
	{
		_this.selectSoundtrack( _this.current_soundtrack, 'noload' );
	}

    if( _this.playlist_volume_slider.length )
    {
        _this.playlist_volume_slider.slider( 'value', audio_volume );
    }

	if( _this.jquery_placeholder_soundtrack_current_index.length )
	{
		_this.jquery_placeholder_soundtrack_current_index.html( audio_index );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_id.length )
	{
		_this.jquery_placeholder_soundtrack_current_id.html( audio_id );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_url.length )
	{
		_this.jquery_placeholder_soundtrack_current_url.html( audio_url );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_type.length )
	{
		_this.jquery_placeholder_soundtrack_current_type.html( audio_type );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_volume.length )
	{
		_this.jquery_placeholder_soundtrack_current_volume.html( audio_volume );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_duration.length )
	{
		_this.jquery_placeholder_soundtrack_current_duration.html( audio_duration );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_title.length )
	{
		_this.jquery_placeholder_soundtrack_current_title.html( audio_title );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_artist.length )
	{
		_this.jquery_placeholder_soundtrack_current_artist.html( audio_artist );
	}
	
	if( _this.jquery_placeholder_soundtrack_current_composer.length )
	{
		_this.jquery_placeholder_soundtrack_current_composer.html( audio_composer );
	}
	
	if( _this.jquery_placeholder_playlist_current_status.length )
	{
		_this.jquery_placeholder_playlist_current_status.html( _this.is_playing ? 'Playing' : 'Paused' );
	}
}

war_SoundyAudioPlaylistFrontEnd.prototype.setEventHandlersForPlayPauseButtons = function()
{
	var _this = this;
	
	if( _this.audio_control.length )
	{
		_this.audio_control.click( 
			function() 
			{ 
				if( _this.audio_player_element.paused )
				{
					_this.audio_player_element.play();
					_this.audio_control.attr( 'src', _this.button_url_pause_hover );
				}
				else
				{
					_this.audio_player_element.pause();
					_this.audio_control.attr( 'src', _this.button_url_play_hover );
				}
			}
        );
			
		_this.audio_control.hover( 
			function() 
			{ 
				_this.hovering = true;
				if( _this.audio_player_element.paused )
				{
					_this.audio_control.attr( 'src', _this.button_url_play_hover );
				}
				else
				{
					_this.audio_control.attr( 'src', _this.button_url_pause_hover );
				}
			},
			function() 
			{ 
				_this.hovering = false;
				if( _this.audio_player_element.paused )
				{
					_this.audio_control.attr( 'src', _this.button_url_play_normal );
				}
				else
				{
					_this.audio_control.attr( 'src', _this.button_url_pause_normal );
				}
			}
		);
			
		_this.audio_player.bind( 'ended' , function()
		{
			if( _this.hovering )
			{
				_this.audio_control.attr( 'src', _this.button_url_play_hover );
			}
			else
			{
				_this.audio_control.attr( 'src', _this.button_url_play_normal );
			}
		} );

		_this.audio_player.bind( 'play' , function()
	    {
			if( _this.hovering )
			{
				_this.audio_control.attr( 'src', _this.button_url_pause_hover );
			}
			else
			{
				_this.audio_control.attr( 'src', _this.button_url_pause_normal );
			}
		} );

		_this.audio_player.bind( 'pause' , function()
	    {
			if( _this.hovering )
			{
				_this.audio_control.attr( 'src', _this.button_url_play_hover );
			}
			else
			{
				_this.audio_control.attr( 'src', _this.button_url_play_normal );
			}
		} );
	}
}

war_SoundyAudioPlaylistFrontEnd.prototype.setEventHandlersForAudioPlayer = function()
{
	var _this = this;
		
	_this.audio_player.bind( 'ended' , function()
	{
		_this.is_playing = false;
		
		if( _this.jquery_placeholder_playlist_current_status.length )
		{
			_this.jquery_placeholder_playlist_current_status.html( 'Paused' );
		}
	} );

	_this.audio_player.bind( 'play' , function()
  {
		_this.is_playing = true;
		
		if( _this.jquery_placeholder_playlist_current_status.length )
		{
			_this.jquery_placeholder_playlist_current_status.html( 'Playing' );
		}
	} );

	_this.audio_player.bind( 'pause' , function()
    {
		_this.is_playing = false;
		
		if( _this.jquery_placeholder_playlist_current_status.length )
		{
			_this.jquery_placeholder_playlist_current_status.html( 'Paused' );
		}
	} );
	
	if( _this.playlist_time_slider.length )
	{
		_this.audio_player.bind( 'loadedmetadata', function()
		{
            var duration_str = _this.current_soundtrack.children( '.war_soundtrack_time' ).html();
            if( duration_str == '∞' )
            {
                _this.playlist_time_slider.slider( 'option', 'max', '' );
                return;
            }
            if( _this.user_agent_is_IOS )
            {
                // IOS Duration Bug turn around
                var dur = duration_str.split( ':' );
                var duration = dur[ 0 ] * 60 + dur[ 1 ];
            }
            else
            {
                var duration = Math.round( _this.audio_player_element.duration );
            }
			_this.playlist_time_slider.slider( 'option', 'max', duration );
		} );
	}
}

war_SoundyAudioPlaylistFrontEnd.prototype.initPlaylist = function()
{
	var _this = this;
	
	var jquery_playlist = jQuery( '#war_sdy_pl_playlist' );

    jquery_playlist.children().each( function( index, li )
    {
        var jquery_li = jQuery( li );

        var jquery_time = jquery_li.children( '.war_soundtrack_time' );
        var soundtrack_time = jquery_time.html();
        // Removes Invalid Soundtrack Time
        var reg_invalid_time = /[^0-9:]/;
        if( reg_invalid_time.test( soundtrack_time ) )
        {
            jquery_time.html( '&infin;' );
        }
    } );

	if( jquery_playlist.length )
	{
		_this.is_playlist_shortcode = true;

        jquery_playlist.on( 'click', 'li', function()
		{
			_this.selectSoundtrack( this, 'load' );
		} );

        //disable text selection when double-clicking
        jquery_playlist.disableSelection();

		jquery_playlist.on( 'dblclick', 'li', function( event )
		{
			if( _this.is_playing )
			{
				_this.audio_player_element.pause();
				_this.is_playing = false;
			}
			else
			{
				_this.audio_player_element.play();
				_this.is_playing = true;
			}
            event.preventDefault();
		} );

        jQuery( '.war_sdy_pl_button_previous' ).on( 'click', function( event )
        {
            _this.selectSoundtrack( 'up', 'load' );
            event.preventDefault();
            return false;
        } );

        jQuery( '.war_sdy_pl_button_next' ).on( 'click', function( event )
        {
            _this.selectSoundtrack( 'down', 'load' );
            event.preventDefault();
            return false;
        } );

		function setArrowKeys( event )
		{
			if( event.keyCode == 38 || event.keyCode == 37 )
			{
				_this.selectSoundtrack( 'up', 'load' );
				return false;
			}
			else if( event.keyCode == 40 || event.keyCode == 39 )
			{
				_this.selectSoundtrack( 'down', 'load' );
				return false;
			}
		}
		
		jQuery( document ).bind( 'keydown', setArrowKeys );
		
		jQuery( 'textarea, input' ).focus( function( event )
		{
			jQuery( document ).unbind( 'keydown' );
		} );
		
		jQuery( 'textarea, input' ).blur( function( event )
		{
			jQuery( document ).bind( 'keydown', setArrowKeys );
		} );
	}
}

war_SoundyAudioPlaylistFrontEnd.prototype.initPlaylistColumns = function()
{
    var _this = this;

    var jquery_playlist        = jQuery( '#war_sdy_pl_playlist' );
    var jquery_column_captions = jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' ).children();
    var jquery_columns         = jquery_playlist.children().children();

    for( var index in _this.column_ordered_names )
    {
        var column_name        = _this.column_ordered_names[ index ];
        var column_do_display  = sdy_pl_column_do_display[ column_name ];
        var column_width_value = sdy_pl_column_width_value[ column_name ];
        var column_width_unit  = sdy_pl_column_width_unit[ column_name ];

        var jquery_playlist_column_caption = jquery_column_captions.filter( '.war_soundtrack_' + column_name );
        var jquery_playlist_column         = jquery_columns.filter( '.war_soundtrack_' + column_name );
        jquery_playlist_column_caption.css( 'width', column_width_value + column_width_unit );
        jquery_playlist_column.css( 'width', column_width_value + column_width_unit );
        if( column_do_display == 'no' )
        {
            jquery_playlist_column_caption.hide();
            jquery_playlist_column.hide();
        }
    }

    _this.orderColumns();
}

war_SoundyAudioPlaylistFrontEnd.prototype.orderColumns = function()
{
    var _this = this;

    var jquery_column_captions_row = jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' );
    var jquery_column_captions     = jquery_column_captions_row.children();

    for( var index in _this.column_ordered_names )
    {
        var column_name = _this.column_ordered_names[ index ];

        var jquery_column_caption = jquery_column_captions.filter( '.war_soundtrack_' + column_name );
        jquery_column_caption.detach();
        jquery_column_captions_row.append( jquery_column_caption );
    }

    var jquery_soundtracks_list = jQuery( '#war_sdy_pl_playlist' );

    jquery_soundtracks_list.children().each
    (
        function( index, li )
        {
            var jquery_li = jQuery( li );

            for( var i in _this.column_ordered_names )
            {
                var column_name = _this.column_ordered_names[ i ];

                var jquery_column = jquery_li.children().filter( '.war_soundtrack_' + column_name );
                jquery_column.detach();
                jquery_li.append( jquery_column );
            }
        }
    );
}

war_SoundyAudioPlaylistFrontEnd.prototype.makePlaylistResponsive = function()
{
    var _this = this;

    var inner_width = jQuery( 'li.war_sdy_pl_playlist_row_header' ).width();
    var width_slider_volume = Math.min( Math.round( 0.23 * inner_width ), 250 );
    var width_slider_time   = Math.min( Math.round( 0.30 * inner_width ), 400 );

    if( inner_width > 600 )
    {
        jQuery( 'div.war_sdy_pl_playlist_header_left_hand_container' ).css( 'display', 'table-cell' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'display', 'table-cell' );
        jQuery( 'div.war_sdy_pl_playlist_header_left_hand_container' ).css( 'width', '50%' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'width', '50%' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'text-align', 'right' );
    }
    else
    {
        jQuery( 'div.war_sdy_pl_playlist_header_left_hand_container' ).css( 'display', 'table-row' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'display', 'table-row' );
        jQuery( 'div.war_sdy_pl_playlist_header_left_hand_container' ).css( 'width', '100%' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'width', '100%' );
        jQuery( 'div.war_sdy_pl_playlist_header_right_hand_container' ).css( 'text-align', 'center' );
        width_slider_volume = Math.round( 1.8 * width_slider_volume );
        width_slider_time   = Math.round( 1.8 * width_slider_time );
    }

    var width_button = jQuery( 'img.war_sdy_pl_audio_control' ).width();
    var width_left = Math.round( jQuery( 'div.war_sdy_pl_playlist_header_left_hand_container' ).width() );
    var width_title = width_left - width_button;
    jQuery( 'div.war_sdy_pl_playlist_pp_button' ).css( 'min-width', width_button );
    jQuery( 'div.war_sdy_pl_playlist_title_global' ).css( 'width', width_title  );

    jQuery( 'div.war_sdy_pl_playlist_volume_slider' ).css( 'width', width_slider_volume );
    jQuery( 'div.war_sdy_pl_playlist_time_slider' ).css( 'width', width_slider_time );
}

war_SoundyAudioPlaylistFrontEnd.prototype.initPlaylistCSS = function()
{
    var _this = this;

    var jquery_header       = jQuery( 'li.war_sdy_pl_playlist_row_header' );
    var jquery_footer       = jQuery( 'li.war_sdy_pl_playlist_row_footer' );
    var jquery_captions     = jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' );

    jquery_header.css(   'background-color', sdy_pl_css_color_bg_header_footer );
    jquery_captions.css( 'background-color', sdy_pl_css_color_bg_header_footer );
    jquery_footer.css(   'background-color', sdy_pl_css_color_bg_header_footer );

    jquery_header.css(   'color', sdy_pl_css_color_txt_header_footer );
    jquery_captions.css( 'color', sdy_pl_css_color_txt_header_footer );
    jquery_footer.css(   'color', sdy_pl_css_color_txt_header_footer );

    var jquery_previous_next = jQuery( '.war_sdy_pl_icon_previous_next_graphic' );
    jquery_previous_next.css( 'fill',   sdy_pl_css_color_txt_header_footer );
    jquery_previous_next.css( 'stroke', sdy_pl_css_color_txt_header_footer );

    var jquery_speaker_icon_1 = jQuery( '.war_sdy_pl_icon_speaker_graphic_1' );
    var jquery_speaker_icon_2 = jQuery( '.war_sdy_pl_icon_speaker_graphic_2' );
    jquery_speaker_icon_1.css( 'fill',   sdy_pl_css_color_txt_header_footer );
    jquery_speaker_icon_2.css( 'stroke', sdy_pl_css_color_txt_header_footer );

    var jquery_slider_bar_volume = jQuery( '.war_sdy_pl_playlist_volume_slider' );
    var jquery_slider_bar_time   = jQuery( '.war_sdy_pl_playlist_time_slider' );
    jquery_slider_bar_volume.css( 'background', sdy_pl_css_color_slider_bar );
    jquery_slider_bar_time.css(   'background', sdy_pl_css_color_slider_bar );

    var jquery_slider_range_volume = jQuery( '.war_sdy_pl_playlist_volume_slider .ui-slider-range' );
    var jquery_slider_range_time   = jQuery( '.war_sdy_pl_playlist_time_slider .ui-slider-range' );
    jquery_slider_range_volume.css( 'background', sdy_pl_css_color_slider_range );
    jquery_slider_range_time.css(   'background', sdy_pl_css_color_slider_range );

    var jquery_slider_handle_volume = jQuery( '.war_sdy_pl_playlist_volume_slider .ui-slider-handle' );
    var jquery_slider_handle_time   = jQuery( '.war_sdy_pl_playlist_time_slider .ui-slider-handle' );
    jquery_slider_handle_volume.css( 'background', sdy_pl_css_color_slider_handle );
    jquery_slider_handle_time.css(   'background', sdy_pl_css_color_slider_handle );

    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css( 'background-color', sdy_pl_css_color_bg_outer_box );
    var val = sdy_pl_css_outer_box_width_unit == '%' ? 0.98 * sdy_pl_css_outer_box_width_value : sdy_pl_css_outer_box_width_value;
    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css( 'width', val + sdy_pl_css_outer_box_width_unit );
    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css( 'font-size', sdy_pl_css_font_size_value + sdy_pl_css_font_size_unit );

    jQuery( '#war_sdy_pl_playlist li' ).css(                  'background-color', sdy_pl_css_color_bg_even_soundtrack );
    jQuery( '#war_sdy_pl_playlist li:nth-child( odd )' ).css( 'background-color', sdy_pl_css_color_bg_odd_soundtrack );
    jQuery( '#war_sdy_pl_playlist li' ).css(                  'color',            sdy_pl_css_color_txt_soundtrack );

    _this.jquery_li_selected.css( 'background-color', sdy_pl_css_color_bg_soundtrack_selected );
    _this.jquery_li_selected.css( 'color',            sdy_pl_css_color_txt_soundtrack_selected );

    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css(                     'border-color', sdy_pl_css_color_outline );
    jQuery( 'li.war_sdy_pl_playlist_row_header' ).css(                     'border-color', sdy_pl_css_color_outline );
    jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' ).css(            'border-color', sdy_pl_css_color_outline );
    jQuery( '#war_sdy_pl_playlist li' ).css(                               'border-color', sdy_pl_css_color_outline );
    jQuery( 'li.war_sdy_pl_playlist_row_footer' ).css(                     'border-color', sdy_pl_css_color_outline );
    jQuery( '.war_sdy_pl_playlist_volume_slider' ).css(                    'border-color', sdy_pl_css_color_outline );
    jQuery( '.war_sdy_pl_playlist_time_slider' ).css(                      'border-color', sdy_pl_css_color_outline );
    jQuery( '.war_sdy_pl_playlist_volume_slider .ui-slider-handle' ).css(  'border-color', sdy_pl_css_color_outline );
    jQuery( '.war_sdy_pl_playlist_time_slider .ui-slider-handle' ).css(    'border-color', sdy_pl_css_color_outline );

    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'border-top-width',      sdy_pl_css_pixel_soundtrack_separator_width  );
    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'border-bottom-width',   sdy_pl_css_pixel_soundtrack_separator_width  );
    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'padding-top',           sdy_pl_css_pixel_soundtrack_vertical_padding  );
    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'padding-bottom',        sdy_pl_css_pixel_soundtrack_vertical_padding  );
    jQuery( 'ul#war_sdy_pl_playlist' ).children().first().css(     'border-top-width',      sdy_pl_css_pixel_outline_width  );
    jQuery( 'ul#war_sdy_pl_playlist' ).children().last().css(      'border-bottom-width',   sdy_pl_css_pixel_outline_width  );

    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css(             'border-width',          sdy_pl_css_pixel_outline_width  );
    jQuery( 'li.war_sdy_pl_playlist_row_header' ).css(             'border-width',          sdy_pl_css_pixel_outline_width  );
    jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' ).css(    'border-width',          sdy_pl_css_pixel_outline_width  );
    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'border-left-width',     sdy_pl_css_pixel_outline_width  );
    jQuery( 'ul#war_sdy_pl_playlist li' ).css(                     'border-right-width',    sdy_pl_css_pixel_outline_width  );
    jQuery( 'li.war_sdy_pl_playlist_row_footer' ).css(             'border-width',          sdy_pl_css_pixel_outline_width  );

    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css(              'border-radius',                sdy_pl_css_pixel_outer_box_corner_rounding );
    jQuery( 'li.war_sdy_pl_playlist_row_header' ).css(              'border-radius',                sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' ).css(     'border-radius',                sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'ul#war_sdy_pl_playlist').children().first().css(       'border-top-left-radius',       sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'ul#war_sdy_pl_playlist').children().first().css(       'border-top-right-radius',      sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'ul#war_sdy_pl_playlist').children().last().css(        'border-bottom-left-radius',    sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'ul#war_sdy_pl_playlist').children().last().css(        'border-bottom-right-radius',   sdy_pl_css_pixel_inner_box_corner_rounding );
    jQuery( 'li.war_sdy_pl_playlist_row_footer' ).css(              'border-radius',                sdy_pl_css_pixel_inner_box_corner_rounding );

    jQuery( 'div.war_sdy_pl_playlist_outer_box' ).css( 'padding', sdy_pl_css_pixel_outer_box_padding );

    jQuery( 'li.war_sdy_pl_playlist_row_header' ).css(          'margin-bottom',    sdy_pl_css_pixel_inner_box_margin );
    jQuery( 'li.war_sdy_pl_playlist_columns_caption_row' ).css( 'margin-bottom',    sdy_pl_css_pixel_inner_box_margin );
    jQuery( 'li.war_sdy_pl_playlist_row_footer' ).css(          'margin-top',       sdy_pl_css_pixel_inner_box_margin );

    if( sdy_pl_css_scrolling_enable == 'yes' )
    {
        var border_height = jQuery( '#war_sdy_pl_playlist').children().first().css( 'border-top-width' );
        border_height = border_height.replace( 'px', '' );
        var row_height = jQuery( '#war_sdy_pl_playlist').children().first().outerHeight();
        row_height -= border_height;
        var rows = sdy_pl_css_scrolling_height;
        var height = rows * row_height;
        jQuery( '#war_sdy_pl_playlist' ).css( 'overflow-y', 'auto' );
        jQuery( '#war_sdy_pl_playlist' ).css( 'height', height );
    }
}

war_SoundyAudioPlaylistFrontEnd.prototype.initShortcodePlaceholders = function()
{
    var _this = this;

    if( ! _this.is_playlist_shortcode )
    {
        var audio_code = '<ul class="war_sdy_pl_playlist" style="display: none;">' + _this.soundtracks_list + '</ul>';
        jQuery( 'body' ).append( audio_code );
    }

    _this.jquery_placeholder_soundtrack_current_index     = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_index' );
    _this.jquery_placeholder_soundtrack_current_id        = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_id' );
    _this.jquery_placeholder_soundtrack_current_url       = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_url' );
    _this.jquery_placeholder_soundtrack_current_type      = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_type' );
    _this.jquery_placeholder_soundtrack_current_volume    = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_volume' );
    _this.jquery_placeholder_soundtrack_current_time      = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_time' );
    _this.jquery_placeholder_soundtrack_current_duration  = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_duration' );
    _this.jquery_placeholder_soundtrack_current_title     = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_title' );
    _this.jquery_placeholder_soundtrack_current_artist    = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_artist' );
    _this.jquery_placeholder_soundtrack_current_composer  = jQuery( '.war_sdy_pl_placeholder_soundtrack_current_composer' );
    _this.jquery_placeholder_playlist_current_status      = jQuery( '.war_sdy_pl_placeholder_playlist_current_status' );

    if( _this.jquery_placeholder_soundtrack_current_time )
    {
        _this.jquery_placeholder_soundtrack_current_time.html( '0:00' );
    }

    _this.playlist_time_slider = jQuery( '.war_sdy_pl_playlist_time_slider' );
    if( _this.playlist_time_slider.length )
    {
        _this.playlist_time_slider.slider
        (
            {
                min:     0,
                value:   0,
                range:   'min',
                slide:   function( event, ui )
                {
                    _this.audio_player_element.currentTime = ui.value;
                },
                start:   function( event, ui )
                {
                    _this.playlist_time_slider_is_sliding = true;
                },
                stop:    function( event, ui )
                {
                    _this.playlist_time_slider_is_sliding = false;
                }
            }
        );

        function permanentUpdateCurrentTime_1()
        {
            if( _this.audio_player_element.readyState > 1 )
            {
                var current_time = Math.round( _this.audio_player_element.currentTime );
                _this.jquery_placeholder_soundtrack_current_time.html( _this.secondsToHms( current_time ) );
                if( ! _this.playlist_time_slider_is_sliding )
                {
                    _this.playlist_time_slider.slider( 'value', current_time );
                }
            }

            setTimeout( permanentUpdateCurrentTime_1, 1000 );
        }
        permanentUpdateCurrentTime_1();
    }
    else if( _this.jquery_placeholder_soundtrack_current_time.length )
    {
        function permanentUpdateCurrentTime_2()
        {
            if( _this.audio_player_element.readyState > 1 )
            {
                _this.jquery_placeholder_soundtrack_current_time.html( _this.secondsToHms( Math.round( _this.audio_player_element.currentTime ) ) );
            }

            setTimeout( permanentUpdateCurrentTime_2, 1000 );
        }
        permanentUpdateCurrentTime_2();
    }

    _this.playlist_volume_slider = jQuery( '.war_sdy_pl_playlist_volume_slider' );
    if( _this.playlist_volume_slider.length )
    {
        _this.playlist_volume_slider.slider
        (
            {
                min:     0,
                max:     100,
                value:   80,
                range:   'min',
                slide:   function( event, ui )
                {
                    _this.audio_player_element.volume = ui.value / 100;
                }
            }
        );
    }
}

war_SoundyAudioPlaylistFrontEnd.prototype.initPreview = function()
{
    var _this = this;

    // Workaround for the preview player hanging:
    var opener_player = window.opener.jQuery( '#war_sdy_pl_audio_player' )[ 0 ];
    opener_player.play();
    opener_player.pause();

    if( _this.preview == 'position' )
    {
        var pp_images_to_use = window.opener.jQuery( 'input[name=war_sdy_pl_pp_images_to_use]:checked' ).val();

        if( pp_images_to_use == 'none' )
        {
            _this.preview = 'default';
        }
        else
        {
            _this.preview = pp_images_to_use;
        }
    }

    if( _this.preview == 'designer' )
    {
        _this.button_url_play_normal  = window.opener.war_design_pp.img_data_play_normal;
        _this.button_url_pause_normal = window.opener.war_design_pp.img_data_pause_normal;
        _this.button_url_play_hover   = window.opener.war_design_pp.img_data_play_hover;
        _this.button_url_pause_hover  = window.opener.war_design_pp.img_data_pause_hover;
    }
    else if( _this.preview == 'default' )
    {
        _this.button_url_play_normal  = window.opener.jQuery( '#war_sdy_pl_url_play_button' ).val();
        _this.button_url_pause_normal = window.opener.jQuery( '#war_sdy_pl_url_pause_button' ).val();
        _this.button_url_play_hover   = window.opener.jQuery( '#war_sdy_pl_url_play_hover' ).val();
        _this.button_url_pause_hover  = window.opener.jQuery( '#war_sdy_pl_url_pause_hover' ).val();
    }

    var position = window.opener.jQuery( '#war_sdy_pl_pp_position' ).children( 'option:selected' ).val();
    if( position == 'document' )
    {
        _this.audio_control.css( 'position', 'absolute' );
    }
    else
    {
        _this.audio_control.css( 'position', 'fixed' );
    }

    var pp_corner = window.opener.jQuery( '#war_sdy_pl_pp_corner' ).children( 'option:selected' ).val();
    var offset_x  = window.opener.jQuery( '#war_sdy_pl_offset_x' ).val() + window.opener.jQuery( '#war_sdy_pl_offset_x_unit' ).val();
    var offset_y  = window.opener.jQuery( '#war_sdy_pl_offset_y' ).val() + window.opener.jQuery( '#war_sdy_pl_offset_y_unit' ).val();
    switch( pp_corner )
    {
        case 'upper_right':
            _this.audio_control.css( 'top',    offset_y );
            _this.audio_control.css( 'right',  offset_x );
            _this.audio_control.css( 'bottom', '' );
            _this.audio_control.css( 'left',   '' );
            break;
        case 'upper_left':
            _this.audio_control.css( 'top',    offset_y );
            _this.audio_control.css( 'right',  '' );
            _this.audio_control.css( 'bottom', '' );
            _this.audio_control.css( 'left',   offset_x );
            break;
        case 'bottom_right':
            _this.audio_control.css( 'top',    '' );
            _this.audio_control.css( 'right',  offset_x );
            _this.audio_control.css( 'bottom', offset_y );
            _this.audio_control.css( 'left',   '' );
            break;
        case 'bottom_left':
            _this.audio_control.css( 'top',    '' );
            _this.audio_control.css( 'right',  '' );
            _this.audio_control.css( 'bottom', offset_y );
            _this.audio_control.css( 'left',   offset_x );
            break;
    }
}


war_SoundyAudioPlaylistFrontEnd.prototype.numberSoundtracksWhileSorting = function( index_item, index_placeholder )
{
	var _this = this;
	
	index_item++; index_placeholder++;
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_playlist' );
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
		jquery_li.children( '.war_soundtrack_index' ).html( index );
	} );
}

war_SoundyAudioPlaylistFrontEnd.prototype.selectSoundtrack = function( li_selected, soundtrack_action )
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
                jquery_li_selected = _this.jquery_li_selected.parent().children().last();
                if( jquery_li_selected.length )
                {
                    li_selected = jquery_li_selected.get( 0 );
                }
                else
                {
                    return;
                }
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
                jquery_li_selected = _this.jquery_li_selected.parent().children().first();
                if( jquery_li_selected.length )
                {
                    li_selected = jquery_li_selected.get( 0 );
                }
                else
                {
                    return;
                }
			}
		}
		else
		{
			return;			
		}
	}
	else if( typeof li_selected == 'string' )
	{
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
	
	var jquery_soundtracks_list = jQuery( '#war_sdy_pl_playlist' );
	if( isOutOfViewport( jquery_soundtracks_list, jquery_li_selected ) )
	{
		var ul = jquery_soundtracks_list.get( 0 );
		var offset = li_selected.offsetTop - ul.offsetTop;
		ul.scrollTop = offset;
	}

	if( _this.jquery_li_selected )
	{
        if( sdy_pl_css_use_only )
        {
            _this.jquery_li_selected.removeClass( 'war_soundtrack_selected' );
        }
        else
        {
            var is_odd = _this.jquery_li_selected.index() % 2 == 0;
            _this.jquery_li_selected.css( 'background-color', is_odd ? sdy_pl_css_color_bg_odd_soundtrack : sdy_pl_css_color_bg_even_soundtrack );
            _this.jquery_li_selected.css( 'color',  sdy_pl_css_color_txt_soundtrack );
        }
	}
    _this.jquery_li_selected = jquery_li_selected;

    if( sdy_pl_css_use_only )
    {
        jquery_li_selected.addClass( 'war_soundtrack_selected' );
    }
    else
    {
        _this.jquery_li_selected.css( 'background-color', sdy_pl_css_color_bg_soundtrack_selected );
        _this.jquery_li_selected.css( 'color',            sdy_pl_css_color_txt_soundtrack_selected );
    }

	if( soundtrack_action == 'load' )
	{
		//stop audio mode logic because of user action:
        if( _this.is_audio_mode_logic )
        {
            _this.audio_player.unbind( 'ended.audio_mode_logic' );
            _this.is_audio_mode_logic = false;
            _this.setAudioModeSequential();
        }

		_this.current_soundtrack = _this.jquery_li_selected;
		var audio_loop = false;
		_this.loadAudioPlayer( 'auto', audio_loop, 'select' );
	}
}

war_SoundyAudioPlaylistFrontEnd.prototype.setAudioModeSequential = function()
{
    var _this = this;

    _this.audio_player.bind( 'ended' , function()
    {
        var soundtracks = _this.jquery_playlist.children();

        var next_soundtrack = _this.current_soundtrack.next();
        if( next_soundtrack.length )
        {
            _this.current_soundtrack = next_soundtrack;
        }
        else
        {
            _this.current_soundtrack = soundtracks.first();
        }
        if( _this.current_soundtrack.length )
        {
            _this.loadAudioPlayer( 'play' );
        }
    } );
}

war_SoundyAudioPlaylistFrontEnd.prototype.secondsToHms = function( d )
{
	d = Number( d );
	var h = Math.floor( d / 3600 );
	var m = Math.floor( d % 3600 / 60 );
	var s = Math.floor( d % 3600 % 60 );
	return ( ( h > 0 ? h + ':' : '' ) + ( m > 0 ? ( h > 0 && m < 10 ? '0' : '' ) + m + ':' : '0:' ) + ( s < 10 ? '0' : '' ) + s ); 
}

war_SoundyAudioPlaylistFrontEnd.prototype.makePlayPauseButtonResponsive = function()
{
    var _this = this;

    if( war_sdy_pl_responsive_mode != 'none' )
    {
        if( war_sdy_pl_responsive_include_player_button )
        {
            var audio_control_selector = '.war_sdy_pl_audio_control';
        }
        else
        {
            var audio_control_selector = '.war_sdy_pl_audio_control.war_sdy_pl_no_player, .war_sdy_pl_audio_control.war_sdy_pl_pp_corner';
        }

        var window_width = jQuery( window ).width();

        switch( war_sdy_pl_button_corner )
        {
            case 'upper_right':
            default:
                var prop_x = 'right';
                var prop_y = 'top';
                break;
            case 'upper_left':
                var prop_x = 'left';
                var prop_y = 'top';
                break;
            case 'bottom_right':
                var prop_x = 'right';
                var prop_y = 'bottom';
                break;
            case 'bottom_left':
                var prop_x = 'left';
                var prop_y = 'bottom';
                break;
        }

        if( war_sdy_pl_responsive_mode == 'table' )
        {
            for( var index in war_sdy_pl_responsive_table_rows )
            {
                var row = war_sdy_pl_responsive_table_rows[ index ];
                if( row.button_size != -1 )
                {
                    if( row.window_width_min != -1 && row.window_width_max != -1 )
                    {
                        if( row.window_width_min <= window_width && window_width <= row.window_width_max )
                        {
                            jQuery( audio_control_selector ).css( 'width', row.button_size );
                        }
                    }
                    else if( row.window_width_min != -1 )
                    {
                        if( row.window_width_min <= window_width )
                        {
                            jQuery( audio_control_selector ).css( 'width', row.button_size );
                        }
                    }
                    else if( row.window_width_max != -1 )
                    {
                        if( window_width <= row.window_width_max )
                        {
                            jQuery( audio_control_selector ).css( 'width', row.button_size );
                        }
                    }
                }
            }

            if( jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).length )
            {
                for( var index in war_sdy_pl_responsive_table_rows )
                {
                    var row = war_sdy_pl_responsive_table_rows[ index ];
                    if( row.offset_x != -1 || row.offset_y != -1 )
                    {
                        if( row.window_width_min != -1 && row.window_width_max != -1 )
                        {
                            if( row.window_width_min <= window_width && window_width <= row.window_width_max )
                            {
                                if( row.offset_x != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_x, row.offset_x );
                                if( row.offset_y != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_y, row.offset_y );
                            }
                        }
                        else if( row.window_width_min != -1 )
                        {
                            if( row.window_width_min <= window_width )
                            {
                                if( row.offset_x != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_x, row.offset_x );
                                if( row.offset_y != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_y, row.offset_y );
                            }
                        }
                        else if( row.window_width_max != -1 )
                        {
                            if( window_width <= row.window_width_max )
                            {
                                if( row.offset_x != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_x, row.offset_x );
                                if( row.offset_y != -1 ) jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( prop_y, row.offset_y );
                            }
                        }
                    }
                }
            }
        }
        else // if( war_sdy_pl_responsive_mode == 'scale' )
        {
            var scale_factor = ( window_width * 0.7 / war_sdy_pl_responsive_reference_window_width ) + 0.3;

            jQuery( audio_control_selector ).load
            (
                function()
                {
                    var button_size = jQuery( this ).width();
                    var responsive_button_size = Math.round( button_size * scale_factor );
                    jQuery( audio_control_selector ).css( 'width', responsive_button_size );
                    jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' ).css( 'width', responsive_button_size );

                    var jquery_corner_button = jQuery( '.war_sdy_pl_audio_control.war_sdy_pl_pp_corner' );
                    if( jquery_corner_button.length )
                    {
                        var offset_x = jquery_corner_button.css( prop_x );
                        offset_x = offset_x.replace( 'px', '' );
                        var offset_y = jquery_corner_button.css( prop_y );
                        offset_y = offset_y.replace( 'px', '' );
                        var responsive_offset_x = Math.round( offset_x * scale_factor );
                        var responsive_offset_y = Math.round( offset_y * scale_factor );

                        jquery_corner_button.css( prop_x, responsive_offset_x );
                        jquery_corner_button.css( prop_y, responsive_offset_y );
                    }

                    jQuery( audio_control_selector ).unbind( 'load' );
                }
            );
        }
    }
}