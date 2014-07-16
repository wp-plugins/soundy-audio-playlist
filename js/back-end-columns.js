function WarSoundyAudioPlaylistAdminColumns( mode )
{
	var _this = this;

    _this.is_metabox = ( mode == 'meta_box' );


    jQuery( document ).ready( function()
    {
        _this.jquery_playlist                       = jQuery( '#war_sdy_pl_playlist' );
        _this.jquery_column_captions_row            = jQuery( '.war_sdy_pl_playlist_columns_caption_row' );
        _this.jquery_column_ordered_names           = jQuery( '#war_sdy_pl_column_ordered_names' );
        _this.jquery_column_ordered_names_default   = jQuery( '#war_sdy_pl_column_ordered_names_default' );
        _this.jquery_column_order_name_list         = jQuery( '#war_sdy_pl_column_order_name_list' );

        _this.jquery_column_captions                = _this.jquery_column_captions_row.children();
        _this.jquery_soundtracks                    = _this.jquery_playlist.children();
        _this.jquery_soundtrack_columns             = _this.jquery_soundtracks.children();
        _this.column_ordered_names                  = _this.jquery_column_ordered_names.val().split( ',' );
        _this.jquery_li_selected                    = _this.jquery_soundtracks.first();
        if( _this.is_metabox )
        {
            _this.column_ordered_names_default  = _this.jquery_column_ordered_names_default.val().split( ',' );
        }

        _this.initColumns();
    } );
}

WarSoundyAudioPlaylistAdminColumns.prototype.initColumns = function()
{
    var _this = this;

    /*
    _this.initSoundtrackTitleAndArtist();
    _this.initSliderTime();
    _this.initSliderVolume();
    */
    _this.initColumnsOrder();
    if( ! sdy_pl_css_use_only )
    {
        _this.initPlaylistCSS();
    }
    if( _this.is_metabox )
    {
        _this.initRadioOrderDefaultOrCustom();
        _this.initRadioLayoutDefaultOrCustom();
    }

    for( var index in _this.column_ordered_names )
    {
        _this.initColumn( _this.column_ordered_names[ index ] );
    }
}

WarSoundyAudioPlaylistAdminColumns.prototype.initRadioOrderDefaultOrCustom = function()
{
    var _this = this;


    var jquery_radio_order = jQuery( 'input[name=war_sdy_pl_column_order]' );

    jquery_radio_order.change
    (
        function()
        {
            if( this.value == 'default' )
            {
                _this.column_ordered_names = _this.column_ordered_names_default;
            }
            else //if( this.value == 'custom' )
            {
                _this.column_ordered_names = _this.jquery_column_ordered_names.val().split( ',' );
            }
            _this.orderColumnNameList();
            _this.orderColumnFields();
            _this.orderColumns();
        }
    );
}

WarSoundyAudioPlaylistAdminColumns.prototype.orderColumnNameList = function()
{
    var _this = this;

    for( var index in _this.column_ordered_names )
    {
        var column_name = _this.column_ordered_names[ index ];

        var jquery_column_item = jQuery( '#war_sdy_pl_column_order_item_' );
        jquery_column_item.detach();
        _this.jquery_column_order_name_list.append( jquery_column_item );
    }
}

WarSoundyAudioPlaylistAdminColumns.prototype.initColumnsOrder = function()
{
    var _this = this;

    for( var index in _this.column_ordered_names )
    {
        var column_name = _this.column_ordered_names[ index ];

        if( jQuery( '#war_sdy_pl_column_do_display_' + column_name ).val() == 'no' )
        {
            jQuery( '#war_sdy_pl_column_order_item_' + column_name ).hide();
        }
    }

    _this.orderColumnFields();
    _this.orderColumns();

    _this.jquery_column_order_name_list.sortable
    (
        {
            axis:           'x',
            placeholder:    'war_sdy_pl_column_order_sortable_placeholder',
            stop:           function( event, ui )
                            {
                                var name_list = '';
                                _this.jquery_column_order_name_list.children().each
                                (
                                    function( index, li )
                                    {
                                        var jquery_li = jQuery( li );
                                        var name = jquery_li.children().filter( '.war_sdy_pl_name' ).html();
                                        name_list += ',' + name;
                                    }
                                );
                                name_list = name_list.substr( 1 );
                                _this.jquery_column_ordered_names.val( name_list );
                                _this.column_ordered_names = name_list.split( ',' );
                                _this.orderColumnFields();
                                _this.orderColumns();
                                jQuery( '#war_sdy_pl_column_order_custom' ).prop( 'checked', true );
                            }
        }
    );
}

WarSoundyAudioPlaylistAdminColumns.prototype.orderColumnFields = function()
{
    var _this = this;

    var jquery_column_layout_field_list = jQuery( '#war_sdy_pl_column_layout_field_list' );

    for( var index in _this.column_ordered_names )
    {
        var column_name = _this.column_ordered_names[ index ];

        var jquery_column_field = jQuery( '#war_sdy_pl_column_layout_field_' + column_name );
        var do_display = jQuery( '#war_sdy_pl_column_do_display_' + column_name ).val() == 'yes';
        jquery_column_field.detach();
        if( do_display )
        {
            jquery_column_layout_field_list.append( jquery_column_field );
        }
        else
        {
            jquery_column_layout_field_list.prepend( jquery_column_field );
        }
    }
}

WarSoundyAudioPlaylistAdminColumns.prototype.orderColumns = function()
{
    var _this = this;

    for( var index in _this.column_ordered_names )
    {
        var column_name = _this.column_ordered_names[ index ];

        var jquery_column_caption = _this.jquery_column_captions.filter( '.war_soundtrack_' + column_name );
        jquery_column_caption.detach();
        _this.jquery_column_captions_row.append( jquery_column_caption );
    }

    _this.jquery_soundtracks.each
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

WarSoundyAudioPlaylistAdminColumns.prototype.initSoundtrackTitleAndArtist = function()
{
    var _this = this;

    if( _this.jquery_soundtracks.length )
    {
        var jquery_first = _this.jquery_soundtracks.first();
        var title        = jquery_first.children().filter( '.war_soundtrack_title').html();
        var artist_name  = jquery_first.children().filter( '.war_soundtrack_artist').html();
        if( sdy_pl_css_use_only )
        {
            jquery_first.addClass( 'war_soundtrack_selected' );
        }
    }
    else
    {
        var title       = 'Soundtrack Title';
        var artist_name = 'Artist Name';
    }

    jQuery( '.war_sdy_pl_placeholder_soundtrack_current_title' ).html( title );
    jQuery( '.war_sdy_pl_placeholder_soundtrack_current_artist' ).html( artist_name );
}

WarSoundyAudioPlaylistAdminColumns.prototype.initSliderTime = function()
{
    var _this = this;

    jQuery( '.war_sdy_pl_placeholder_soundtrack_current_time').html( '0:15' );

    var jquery_soundtracks = _this.jquery_playlist.children();
    if( jquery_soundtracks.length )
    {
        var duration = jquery_soundtracks.first().children().filter( '.war_soundtrack_time' ).html();
    }
    else
    {
        var duration = '3:27';
    }
    jQuery( '.war_sdy_pl_placeholder_soundtrack_current_duration').html( duration );

    jQuery( '.war_sdy_pl_playlist_time_slider' ).slider
    (
        {
            min:    0,
            max:    100,
            value:  30
        }
    );
}

WarSoundyAudioPlaylistAdminColumns.prototype.initSliderVolume = function()
{
    var _this = this;

    jQuery( '.war_sdy_pl_playlist_volume_slider' ).slider
    (
        {
            min:     0,
            max:     100,
            value:   80,
            range:   'min'
        }
    );
}

WarSoundyAudioPlaylistAdminColumns.prototype.initRadioLayoutDefaultOrCustom = function()
{
    var _this = this;

    var jquery_radio_layout = jQuery( 'input[name=war_sdy_pl_column_layout]' );

    jquery_radio_layout.change
    (
        function()
        {
            if( this.value == 'default' )
            {
                for( var index in _this.column_ordered_names )
                {
                    var column_name = _this.column_ordered_names[ index ];

                    var jquery_field_do_display_default   = jQuery( '#war_sdy_pl_column_do_display_default_'  + column_name );
                    var jquery_field_do_display_custom    = jQuery( '#war_sdy_pl_column_do_display_custom_'   + column_name );
                    var jquery_field_hidden_do_display    = jQuery( '#war_sdy_pl_column_do_display_'          + column_name );
                    var jquery_field_checkbox_do_display  = jQuery( '#war_sdy_pl_column_checkbox_do_display_' + column_name );

                    jquery_field_do_display_custom.html( jquery_field_hidden_do_display.val() );
                    if( jquery_field_do_display_default.html() == 'yes' )
                    {
                        jquery_field_checkbox_do_display.prop( 'checked', true );
                    }
                    else
                    {
                        jquery_field_checkbox_do_display.prop( 'checked', false );
                    }
                    jquery_field_checkbox_do_display.change();

                    var jquery_field_width_value_default   = jQuery( '#war_sdy_pl_column_width_value_default_'  + column_name );
                    var jquery_field_width_value_custom    = jQuery( '#war_sdy_pl_column_width_value_custom_'   + column_name );
                    var jquery_field_width_value           = jQuery( '#war_sdy_pl_column_width_value_'          + column_name );

                    jquery_field_width_value_custom.html( jquery_field_width_value.val() );
                    jquery_field_width_value.val( jquery_field_width_value_default.html() );
                    jquery_field_width_value.change();

                    var jquery_field_width_unit_default   = jQuery( '#war_sdy_pl_column_width_unit_default_'  + column_name );
                    var jquery_field_width_unit_custom    = jQuery( '#war_sdy_pl_column_width_unit_custom_'   + column_name );
                    var jquery_field_width_unit           = jQuery( '#war_sdy_pl_column_width_unit_'          + column_name );

                    jquery_field_width_unit_custom.html( jquery_field_width_unit.val() );
                    jquery_field_width_unit.val( jquery_field_width_unit_default.html() );
                    jquery_field_width_unit.change();
                }
            }
            else //if( this.value == 'custom' )
            {
                for( var index in _this.column_ordered_names )
                {
                    var column_name = _this.column_ordered_names[ index ];

                    var jquery_field_do_display_custom    = jQuery( '#war_sdy_pl_column_do_display_custom_'   + column_name );
                    var jquery_field_checkbox_do_display  = jQuery( '#war_sdy_pl_column_checkbox_do_display_' + column_name );

                    if( jquery_field_do_display_custom.html() == 'yes' )
                    {
                        jquery_field_checkbox_do_display.prop( 'checked', true );
                    }
                    else
                    {
                        jquery_field_checkbox_do_display.prop( 'checked', false );
                    }
                    jquery_field_checkbox_do_display.change();

                    var jquery_field_width_value_custom    = jQuery( '#war_sdy_pl_column_width_value_custom_'   + column_name );
                    var jquery_field_width_value           = jQuery( '#war_sdy_pl_column_width_value_'          + column_name );

                    jquery_field_width_value.val( jquery_field_width_value_custom.html() );
                    jquery_field_width_value.change();

                    var jquery_field_width_unit_custom    = jQuery( '#war_sdy_pl_column_width_unit_custom_'   + column_name );
                    var jquery_field_width_unit           = jQuery( '#war_sdy_pl_column_width_unit_'          + column_name );

                    jquery_field_width_unit.val( jquery_field_width_unit_custom.html() );
                    jquery_field_width_unit.change();
                }
            }
        }
    );
}

WarSoundyAudioPlaylistAdminColumns.prototype.initColumn = function( column_name )
{
    var _this = this;

    var jquery_radio_layout_custom          = jQuery( '#war_sdy_pl_column_layout_custom' );

    var jquery_playlist_column_caption      = _this.jquery_column_captions.filter( '.war_soundtrack_' + column_name );
    var jquery_playlist_column              = _this.jquery_soundtrack_columns.filter( '.war_soundtrack_' + column_name );

    var jquery_column_layout_field_list     = jQuery( '#war_sdy_pl_column_layout_field_list' );

    var jquery_column_layout_field          = jQuery( '#war_sdy_pl_column_layout_field_'        + column_name );
    var jquery_column_do_display            = jQuery( '#war_sdy_pl_column_do_display_'          + column_name );
    var jquery_column_checkbox_do_display   = jQuery( '#war_sdy_pl_column_checkbox_do_display_' + column_name );
    var jquery_column_width_value           = jQuery( '#war_sdy_pl_column_width_value_'         + column_name );
    var jquery_column_width_value_slider    = jQuery( '#war_sdy_pl_column_width_value_slider_'  + column_name );
    var jquery_column_width_unit            = jQuery( '#war_sdy_pl_column_width_unit_'          + column_name );

    if( jquery_column_checkbox_do_display.prop( 'checked' ) )
    {
        var width_unit  = jquery_column_width_unit.val();
        if( width_unit == 'px' || width_unit == '%' || width_unit == 'mm' )
        {
            jquery_column_width_value_slider.show();
        }
        else
        {
            jquery_column_width_value_slider.hide();
        }
    }
    else
    {
        jquery_column_width_value.hide();
        jquery_column_width_value_slider.hide();
        jquery_column_width_unit.hide();
        jquery_playlist_column_caption.hide();
        jquery_playlist_column.hide();

        jquery_column_layout_field.detach();
        jquery_column_layout_field_list.prepend( jquery_column_layout_field );
    }

    var width_value = jquery_column_width_value.val();
    jquery_column_width_value_slider.slider(
    {
        min:        0,
        max:        100,
        value:      width_value,
        range:      'min',
        animate:    true,
        slide:      function( event, ui )
                    {
                        jquery_column_width_value.val( ui.value );

                        var width_unit = jquery_column_width_unit.val();
                        jquery_playlist_column_caption.css( 'width', ui.value + width_unit );
                        jquery_playlist_column.css( 'width', ui.value + width_unit );
                    },
        stop:       function( event, ui )
                    {
                        jquery_radio_layout_custom.prop( 'checked', true );
                    }
    } );

    jquery_playlist_column_caption.css( 'width', width_value + width_unit );
    jquery_playlist_column.css( 'width', width_value + width_unit );

    jquery_column_checkbox_do_display.click( function()
    {
        jquery_radio_layout_custom.prop( 'checked', true );
    } );

    jquery_column_checkbox_do_display.change( function()
    {
        if( jquery_column_checkbox_do_display.prop( 'checked' ) )
        {
            jquery_column_do_display.val( 'yes' );
            jquery_column_width_value.show();
            jquery_column_width_value_slider.show();
            jquery_column_width_unit.show();
            jquery_playlist_column_caption.show();
            jquery_playlist_column.show();

            jquery_column_layout_field.detach();
            jquery_column_layout_field_list.append( jquery_column_layout_field );

            jQuery( '#war_sdy_pl_column_order_item_' + column_name).show();
            _this.orderColumnFields();
        }
        else
        {
            jquery_column_do_display.val( 'no' );
            jquery_column_width_value.hide();
            jquery_column_width_value_slider.hide();
            jquery_column_width_unit.hide();
            jquery_playlist_column_caption.hide();
            jquery_playlist_column.hide();

            jquery_column_layout_field.detach();
            jquery_column_layout_field_list.prepend( jquery_column_layout_field );

            jQuery( '#war_sdy_pl_column_order_item_' + column_name).hide();
        }
    } );

    jquery_column_width_value.click( function()
    {
        jquery_radio_layout_custom.prop( 'checked', true );
    } );

    jquery_column_width_value.change( function()
    {
        jquery_column_width_value_slider.slider( 'value', this.value );
        jquery_playlist_column_caption.css( 'width', this.value + jquery_column_width_unit.val() );
        jquery_playlist_column.css( 'width', this.value + jquery_column_width_unit.val() );
    } );

    jquery_column_width_unit.click( function()
    {
        jquery_radio_layout_custom.prop( 'checked', true );
    } );

    jquery_column_width_unit.change( function()
    {
        if( this.value == 'px' || this.value == '%' || this.value == 'mm' )
        {
            jquery_column_width_value_slider.show();
        }
        else
        {
            jquery_column_width_value_slider.hide();
        }
        jquery_playlist_column_caption.css( 'width', jquery_column_width_value.val() + this.value );
        jquery_playlist_column.css( 'width', jquery_column_width_value.val() + this.value );
    } );
}


WarSoundyAudioPlaylistAdminColumns.prototype.initPlaylistCSS = function()
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

    jQuery( '.war_sdy_pl_playlist_outer_box' ).css( 'background-color', sdy_pl_css_color_bg_outer_box );

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
}
