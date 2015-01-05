<?php

class WarSoundyAudioPlaylistDesignerPlaylist
{
	public $sdy_pl; // WarSoundyAudioPlaylist Object
    public $outer_box_width_value               = '100';
    public $outer_box_width_unit                = '%';
    public $color_bg_header_footer              = '#813ca0';
    public $color_txt_header_footer             = '#ffffff';
    public $color_slider_bar                    = '#00b3ff';
    public $color_slider_range                  = '#cc00cc';
    public $color_slider_handle                 = '#ff0000';
    public $color_bg_outer_box                  = '#ffa8ff';
    public $color_bg_even_soundtrack            = '#ffffff';
    public $color_bg_odd_soundtrack             = '#eeeeee';
    public $color_txt_soundtrack                = '#4500ff';
    public $color_bg_soundtrack_selected        = '#007cf0';
    public $color_txt_soundtrack_selected       = '#ffffff';
    public $color_outline                       = '#0000c1';
    public $pixel_outline_width                 = '2';
    public $pixel_soundtrack_separator_width    = '1';
    public $pixel_soundtrack_vertical_padding   = '4';
    public $pixel_outer_box_corner_rounding     = '10';
    public $pixel_inner_box_corner_rounding     = '5';
    public $pixel_outer_box_padding             = '10';
    public $pixel_inner_box_margin              = '10';
    public $font_size_value                     = '100';
    public $font_size_unit                      = '%';

	public function __construct( $sdy_pl_object )
	{
		$this->sdy_pl = $sdy_pl_object;
        // $this->activate();

	    if( ( isset( $_GET['page'] ) && ( $_GET['page'] == 'sdy_pl' ) ) )
        {
		    add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
	    }
	}

	public function admin_scripts()
	{
		wp_register_script( 'sdy_pl-designer-playlist', $this->sdy_pl->plugin_url . '/js/designer-playlist.js' );
		wp_enqueue_script( 'sdy_pl-designer-playlist' );

		wp_register_style( 'sdy_pl-designer-playlist', $this->sdy_pl->plugin_url . '/css/style-designer-playlist.css' );
		wp_enqueue_style( 'sdy_pl-designer-playlist' );

        wp_register_style( 'sdy_pl-designer-playlist-preview', $this->sdy_pl->plugin_url . '/css/style-designer-playlist-preview.css' );
        wp_enqueue_style( 'sdy_pl-designer-playlist-preview' );
	}

	public function activate()
	{
        add_option( 'war_sdy_pl_playlist_outer_box_width_value',                $this->outer_box_width_value );
        add_option( 'war_sdy_pl_playlist_outer_box_width_unit',                 $this->outer_box_width_unit );
		add_option( 'war_sdy_pl_playlist_color_bg_header_footer',               $this->color_bg_header_footer );
        add_option( 'war_sdy_pl_playlist_color_txt_header_footer',              $this->color_txt_header_footer );
        add_option( 'war_sdy_pl_playlist_color_slider_bar',                     $this->color_slider_bar );
        add_option( 'war_sdy_pl_playlist_color_slider_range',                   $this->color_slider_range );
        add_option( 'war_sdy_pl_playlist_color_slider_handle',                  $this->color_slider_handle );
        add_option( 'war_sdy_pl_playlist_color_bg_outer_box',                   $this->color_bg_outer_box );
        add_option( 'war_sdy_pl_playlist_color_bg_even_soundtrack',             $this->color_bg_even_soundtrack );
        add_option( 'war_sdy_pl_playlist_color_bg_odd_soundtrack',              $this->color_bg_odd_soundtrack );
        add_option( 'war_sdy_pl_playlist_color_txt_soundtrack',                 $this->color_txt_soundtrack );
        add_option( 'war_sdy_pl_playlist_color_bg_soundtrack_selected',         $this->color_bg_soundtrack_selected );
        add_option( 'war_sdy_pl_playlist_color_txt_soundtrack_selected',        $this->color_txt_soundtrack_selected );
        add_option( 'war_sdy_pl_playlist_color_outline',                        $this->color_outline );
        add_option( 'war_sdy_pl_playlist_pixel_outline_width',                  $this->pixel_outline_width );
        add_option( 'war_sdy_pl_playlist_pixel_soundtrack_separator_width',     $this->pixel_soundtrack_separator_width );
        add_option( 'war_sdy_pl_playlist_pixel_soundtrack_vertical_padding',    $this->pixel_soundtrack_vertical_padding );
        add_option( 'war_sdy_pl_playlist_pixel_outer_box_corner_rounding',      $this->pixel_outer_box_corner_rounding );
        add_option( 'war_sdy_pl_playlist_pixel_inner_box_corner_rounding',      $this->pixel_inner_box_corner_rounding );
        add_option( 'war_sdy_pl_playlist_pixel_outer_box_padding',              $this->pixel_outer_box_padding );
        add_option( 'war_sdy_pl_playlist_pixel_inner_box_margin',               $this->pixel_inner_box_margin );
        add_option( 'war_sdy_pl_playlist_font_size_value',                      $this->font_size_value );
        add_option( 'war_sdy_pl_playlist_font_size_unit',                       $this->font_size_unit );
	}

	public function add_settings_section()
	{
		add_settings_section
        (
    	    'war_sdy_pl_settings_section_designer_playlist',
            'Playlist Designer<span id="war_sdy_pl_design_pl_preview_marker_top"></span>',
            array( $this, 'display_settings_header' ),
            'sdy_pl'
        );

        $this->add_setting( 'Header/Footer Background Color',       'bg_header_footer',             'color' );
        $this->add_setting( 'Header/Footer Text Color',             'txt_header_footer',            'color' );
        $this->add_setting( 'Sliders Bar Color',                    'slider_bar',                   'color' );
        $this->add_setting( 'Sliders Range Color',                  'slider_range',                 'color' );
        $this->add_setting( 'Sliders Handle Color',                 'slider_handle',                'color' );
        $this->add_setting( 'Outer Box Background Color',           'bg_outer_box',                 'color' );
        $this->add_setting( 'Even Soundtrack Background Color',     'bg_even_soundtrack',           'color' );
        $this->add_setting( 'Odd Soundtrack Background Color',      'bg_odd_soundtrack',            'color' );
        $this->add_setting( 'Soundtrack Text Color',                'txt_soundtrack',               'color' );
        $this->add_setting( 'Selected Soundtrack Background Color', 'bg_soundtrack_selected',       'color' );
        $this->add_setting( 'Selected Soundtrack Text Color',       'txt_soundtrack_selected',      'color' );
        $this->add_setting( 'Outline Color',                        'outline',                      'color' );
        $this->add_setting( 'Outline Width',                        'outline_width',                'pixel' );
        $this->add_setting( 'Soundtrack Separator Line Width',      'soundtrack_separator_width',   'pixel' );
        $this->add_setting( 'Soundtrack Vertical Padding',          'soundtrack_vertical_padding',  'pixel' );
        $this->add_setting( 'Outer Box Corner Rounding',            'outer_box_corner_rounding',    'pixel' );
        $this->add_setting( 'Inner Box Corner Rounding',            'inner_box_corner_rounding',    'pixel' );
        $this->add_setting( 'Outer Box Padding',                    'outer_box_padding',            'pixel' );
        $this->add_setting( 'Inner Box Margin',                     'inner_box_margin',             'pixel' );
        $this->add_setting_outer_box_width();
        $this->add_setting_font_size();
	}

	public function add_setting( $label, $name, $type )
	{
        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_' . $type . '_' . $name );
		add_settings_field(
		'war_sdy_pl_playlist_' . $type . '_' . $name,
		$label,
		array( $this, 'add_setting_' . $type ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_playlist',
		array( $name )
		);
	}

	public function display_settings_header()
	{
        echo 'In this tab you can control the appearance of the playlists<br>' .
             'inserted in pages or posts with the <span class="war_bold">[sdy_pl playlist]</span> short code.';
        echo '<div id="war_sdy_pl_design_pl_preview">';
            $this->display_preview_playlist();
        echo '</div>';
	}

	public function add_setting_color( $args )
	{
		$name = $args[ 0 ];
		?>
            <div    class="war_sdy_pl_design_pl_color_rgb_label">Hex:</div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_color"
                    value="<?php echo get_option( 'war_sdy_pl_playlist_color_' . $name ); ?>"
                    name="war_sdy_pl_playlist_color_<?php echo $name; ?>"
                    id="war_sdy_pl_design_pl_color_<?php echo $name; ?>" />
            <span   id="war_sdy_pl_design_pl_color_<?php echo $name; ?>_validation_error"
                    class="war_sdy_pl_design_pl_validation_error"></span>
            <br>
            <div    class="war_sdy_pl_design_pl_color_rgb_label war_sdy_pl_design_pl_color_red">Red:</div>
            <div    id="war_sdy_pl_design_pl_slider_color_<?php echo $name; ?>_red"
                    class="war_sdy_pl_design_pl_slider_red"></div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_rgb_255 war_sdy_pl_design_pl_color_red war_sdy_pl_design_pl_color_border_red"
                    id="war_sdy_pl_design_pl_color_<?php echo $name; ?>_red" /> <span class="war_sdy_pl_design_pl_comment">/ 255</span>
            <br>
            <div    class="war_sdy_pl_design_pl_color_rgb_label war_sdy_pl_design_pl_color_green">Green:</div>
            <div    id="war_sdy_pl_design_pl_slider_color_<?php echo $name; ?>_green"
                    class="war_sdy_pl_design_pl_slider_green"></div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_rgb_255 war_sdy_pl_design_pl_color_green war_sdy_pl_design_pl_color_border_green"
                    id="war_sdy_pl_design_pl_color_<?php echo $name; ?>_green" /> <span class="war_sdy_pl_design_pl_comment">/ 255</span>
            <br>
            <div    class="war_sdy_pl_design_pl_color_rgb_label war_sdy_pl_design_pl_color_blue">Blue:</div>
            <div    id="war_sdy_pl_design_pl_slider_color_<?php echo $name; ?>_blue"
                    class="war_sdy_pl_design_pl_slider_blue"></div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_rgb_255 war_sdy_pl_design_pl_color_blue war_sdy_pl_design_pl_color_border_blue"
                    id="war_sdy_pl_design_pl_color_<?php echo $name; ?>_blue" /> <span class="war_sdy_pl_design_pl_comment">/ 255</span>
            <span   id="war_sdy_pl_design_pl_preview_marker_left"></span>
		<?php
	}

	public function add_setting_percent( $args )
	{
		$name  = $args[ 0 ];
		$value = $args[ 1 ];
		if( $value == '' )
		{
			$value = ( int )get_option( 'war_sdy_pl_playlist_percent_' . $name );
		}
		if( $value <  10 ) $value = '0' . $value;
		if( $value < 100 ) $value = '0' . $value;
		?>
            <div    id="war_sdy_pl_design_pl_slider_percent_<?php echo $name; ?>"
                    class="war_sdy_pl_design_pl_slider"></div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_percent"
                    value="<?php echo $value; ?>"
                    name="war_sdy_pl_playlist_percent_<?php echo $name; ?>"
                    id="war_sdy_pl_design_pl_percent_<?php echo $name; ?>" /> <span class="war_sdy_pl_design_pl_comment">%</span>
            <span   id="war_sdy_pl_design_pl_percent_<?php echo $name; ?>_validation_error"
                    class="war_sdy_pl_design_pl_validation_error"></span>
		<?php
	}

    public function add_setting_pixel( $args )
    {
        $name  = $args[ 0 ];
        $value = ( int )get_option( 'war_sdy_pl_playlist_pixel_' . $name );
        if( $value <  10 ) $value = '0' . $value;
        if( $value < 100 ) $value = '0' . $value;
        ?>
            <div    id="war_sdy_pl_design_pl_slider_pixel_<?php echo $name; ?>"
                    class="war_sdy_pl_design_pl_slider"></div>
            <input  type="text"
                    class="war_sdy_pl_design_pl_pixel"
                    value="<?php echo $value; ?>"
                    name="war_sdy_pl_playlist_pixel_<?php echo $name; ?>"
                    id="war_sdy_pl_design_pl_pixel_<?php echo $name; ?>" /> <span class="war_sdy_pl_design_pl_comment">px</span>
            <span   id="war_sdy_pl_design_pl_pixel_<?php echo $name; ?>_validation_error"
                    class="war_sdy_pl_design_pl_validation_error"></span>
        <?php
    }

    public function add_setting_font_size()
    {
        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_font_size_value' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_font_size_unit' );
        add_settings_field(
            'war_sdy_pl_playlist_font_size',
            'Font Size',
            array( $this, 'add_setting_field_font_size' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_designer_playlist'
        );
    }

    public function add_setting_field_font_size()
    {
        $value = ( int )get_option( 'war_sdy_pl_playlist_font_size_value' );
        if( $value <  10 ) $value = '0' . $value;
        if( $value < 100 ) $value = '0' . $value;
        $unit  = get_option( 'war_sdy_pl_playlist_font_size_unit' );
        ?>
        <div    id="war_sdy_pl_design_pl_slider_font_size_value"
                class="war_sdy_pl_design_pl_slider"></div>
        <input  type="text"
                class="war_sdy_pl_design_pl_percent"
                value="<?php echo $value; ?>"
                name="war_sdy_pl_playlist_font_size_value"
                id="war_sdy_pl_playlist_font_size_value" />
        <select name="war_sdy_pl_playlist_font_size_unit"
                id="war_sdy_pl_playlist_font_size_unit" style="width: 50px; height: 20px;">
            <?php echo $this->sdy_pl->get_select_options( $unit, $this->sdy_pl->units_font_size ); ?>
        </select>
        <span   id="war_sdy_pl_playlist_font_size_validation_error"
                class="war_sdy_pl_design_pl_validation_error"></span>
        <?php
    }

    public function add_setting_outer_box_width()
    {
        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_outer_box_width_value' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_outer_box_width_unit' );
        add_settings_field(
            'war_sdy_pl_playlist_outer_box_width',
            'Outer Box Width',
            array( $this, 'add_setting_field_outer_box_width' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_designer_playlist'
        );
    }

    public function add_setting_field_outer_box_width()
    {
        $value = ( int )get_option( 'war_sdy_pl_playlist_outer_box_width_value' );
        if( $value <  10 ) $value = '0' . $value;
        if( $value < 100 ) $value = '0' . $value;
        $unit  = get_option( 'war_sdy_pl_playlist_outer_box_width_unit' );
        ?>
        <div    id="war_sdy_pl_design_pl_slider_outer_box_width_value"
                class="war_sdy_pl_design_pl_slider"></div>
        <input  type="text"
                class="war_sdy_pl_design_pl_thousand"
                value="<?php echo $value; ?>"
                name="war_sdy_pl_playlist_outer_box_width_value"
                id="war_sdy_pl_playlist_outer_box_width_value" />
        <select name="war_sdy_pl_playlist_outer_box_width_unit"
                id="war_sdy_pl_playlist_outer_box_width_unit" style="width: 50px; height: 20px;">
            <?php echo $this->sdy_pl->get_select_options( $unit, $this->sdy_pl->units_length ); ?>
        </select>
        <span   id="war_sdy_pl_playlist_outer_box_width_validation_error"
                class="war_sdy_pl_design_pl_validation_error"></span>
        <?php
    }

    public function display_preview_playlist()
    {
        ?>
            <div class="war_sdy_pl_designer_preview_playlist_outer_box">
                <ul class="war_sdy_pl_designer_preview_playlist">
                    <li class="war_sdy_pl_designer_preview_soundtrack_row_header">
                        <div class="war_sdy_pl_designer_preview_playlist_pp_button">
                            <?php sdy_pl_button_play_pause(); ?>
                        </div>
                        <div class="war_sdy_pl_designer_preview_playlist_title_global">
                            <div class="war_sdy_pl_designer_preview_playlist_title">
                                La&nbsp;Guitare
                            </div>
                            <div class="war_sdy_pl_designer_preview_playlist_volume_container">
                                <?php echo $this->display_preview_icon_speaker(); ?>
                                <div class="war_sdy_pl_designer_preview_playlist_volume_slider"></div>
                            </div>
                        </div>
                        <div class="war_sdy_pl_designer_preview_playlist_header_right_hand">
                            <div class="war_sdy_pl_designer_preview_playlist_time_slider_global">
                                <div class="war_sdy_pl_designer_preview_playlist_soundtrack_time_local">
                                    0:07
                                </div>
                                <div class="war_sdy_pl_designer_preview_playlist_time_slider_local">
                                    <div class="war_sdy_pl_designer_preview_playlist_time_slider"></div>
                                </div>
                                <div class="war_sdy_pl_designer_preview_playlist_soundtrack_duration_local">
                                    0:32
                                </div>
                            </div>
                            <div class="war_sdy_pl_designer_preview_playlist_soundtrack_title_global">
                                <div class="war_sdy_pl_designer_preview_playlist_previous_local">
                                    <?php $this->display_preview_icon_previous(); ?>
                                </div>
                                <div class="war_sdy_pl_designer_preview_playlist_header_soundtrack_title">
                                    <div class="war_sdy_pl_designer_preview_playlist_header_soundtrack_title">
                                        Ecossaise
                                    </div>
                                    <div class="war_sdy_pl_designer_preview_playlist_header_soundtrack_artist">
                                        Jean-Maurice Mourat
                                    </div>
                                </div>
                                <div class="war_sdy_pl_designer_preview_playlist_next_local">
                                    <?php $this->display_preview_icon_next(); ?>
                                </div>
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </li>
                </ul>
                <ul class="war_sdy_pl_designer_preview_playlist">
                    <li class="war_sdy_pl_designer_preview_playlist_columns_caption_row" >
                        <div class="war_designer_preview_soundtrack_index">#</div>
                        <div class="war_designer_preview_soundtrack_title">Title</div>
                        <div class="war_designer_preview_soundtrack_time">Time</div>
                        <div class="war_designer_preview_soundtrack_composer">Composer</div>
                    </li>
                </ul>
                <ul id="war_sdy_pl_designer_preview_playlist" class="war_sdy_pl_designer_preview_playlist">
                    <li>
                        <div class="war_designer_preview_soundtrack_index">01.</div>
                        <div class="war_designer_preview_soundtrack_title">Bransle du Poictou</div>
                        <div class="war_designer_preview_soundtrack_time">0:29</div>
                        <div class="war_designer_preview_soundtrack_composer">Adrian Le Roy (1520-1598)</div>
                    </li>
                    <li class="war_designer_preview_soundtrack_selected">
                        <div class="war_designer_preview_soundtrack_index">02.</div>
                        <div class="war_designer_preview_soundtrack_title">Ecossaise</div>
                        <div class="war_designer_preview_soundtrack_time">0:32</div>
                        <div class="war_designer_preview_soundtrack_composer">Mauro Giuliani (1780-1840)</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">03.</div>
                        <div class="war_designer_preview_soundtrack_title">Folklore italien</div>
                        <div class="war_designer_preview_soundtrack_time">0:47</div>
                        <div class="war_designer_preview_soundtrack_composer">Anonymous</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">04.</div>
                        <div class="war_designer_preview_soundtrack_title">Greensleeves</div>
                        <div class="war_designer_preview_soundtrack_time">1:12</div>
                        <div class="war_designer_preview_soundtrack_composer">Anonymous</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">05.</div>
                        <div class="war_designer_preview_soundtrack_title">Danse allemande</div>
                        <div class="war_designer_preview_soundtrack_time">1:01</div>
                        <div class="war_designer_preview_soundtrack_composer">Franz Hünten (1793-1878)</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">06.</div>
                        <div class="war_designer_preview_soundtrack_title">Allegretto</div>
                        <div class="war_designer_preview_soundtrack_time">0:37</div>
                        <div class="war_designer_preview_soundtrack_composer">Mauro Giuliani (1780-1840)</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">07.</div>
                        <div class="war_designer_preview_soundtrack_title">Donne-moi la fleur</div>
                        <div class="war_designer_preview_soundtrack_time">0:33</div>
                        <div class="war_designer_preview_soundtrack_composer">Anonymous</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">08.</div>
                        <div class="war_designer_preview_soundtrack_title">Tourdion</div>
                        <div class="war_designer_preview_soundtrack_time">1:15</div>
                        <div class="war_designer_preview_soundtrack_composer">Pierre Attaingnant (1498-1552)</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">09.</div>
                        <div class="war_designer_preview_soundtrack_title">Ballet</div>
                        <div class="war_designer_preview_soundtrack_time">1:18</div>
                        <div class="war_designer_preview_soundtrack_composer">Ferdinando Carulli (1770-1841)</div>
                    </li>
                    <li>
                        <div class="war_designer_preview_soundtrack_index">10.</div>
                        <div class="war_designer_preview_soundtrack_title">Waltz</div>
                        <div class="war_designer_preview_soundtrack_time">1:19</div>
                        <div class="war_designer_preview_soundtrack_composer">Anonymous (1870)</div>
                    </li>
                </ul>
                <ul class="war_sdy_pl_designer_preview_playlist">
                    <li class="war_sdy_pl_designer_preview_soundtrack_row_footer">
                        <div class="war_sdy_pl_designer_preview_soundtrack_row_footer_div">
                            <span style="margin-right: 0.8em;">10 tracks</span>
                            •
                            <span id="war_sdy_pl_designer_preview_playlist_comment" style="margin-left: 1%; margin-right: 1%;">Click or use ↑ ↓ ← → to select</span>
                            •
                            <span style="margin-left: 1%;">Double-click to play or pause</span>
                        </div>
                    </li>
                </ul>
            </div>
        <?php
    }

    public function display_preview_icon_speaker()
    {
        ?>
            <svg    width="20"
                    height="20"
                    class="war_sdy_pl_designer_preview_playlist_volume_icon">
                <g
                    id="my_group"
                    transform="scale( 0.8, 0.8 ) translate( 0, 8 )">
                    <path
                        id="rect3180-0"
                        d="m8.0134-2.3842e-8c-0.30522 0-0.56653 0.12796-0.75 0.34375l-2.25 2.6562h-2c-0.552 0-1 0.448-1 1-0.00627 0.99607 0.00222 2.0145 0 3 0 0.552 0.448 1 1 1h2l2.1562 2.4688c0.1714 0.305 0.4693 0.531 0.8438 0.531 0.552 0 1-0.448 1-1v-9c0-0.552-0.448-1-1-1z"
                        style="opacity:.3;fill-rule:evenodd;fill:#fff" />
                    <path
                        id="path3209-4"
                        d="m17.868-2.15s2.6135 2.4227 2.6135 7.6349c0 5.1866-2.618 7.6651-2.618 7.6651m-2.971-13.055s1.8454 1.7448 1.7797 5.4045c-0.0662 3.6901-1.8093 5.4045-1.8093 5.4045m-3-8.6827s0.98347 0.79498 1.0085 3.2306c0.02476 2.4053-1.0085 3.3256-1.0085 3.3256"
                        style="opacity:.3;stroke-width:1.7;stroke:#fff;stroke-linecap:round;fill:none" />
                    <path
                        class="war_designer_preview_icon_speaker_graphic_2"
                        d="m17.868-3.15s2.6135 2.4227 2.6135 7.6349c0 5.1866-2.618 7.6651-2.618 7.6651m-2.971-13.055s1.8454 1.7448 1.7797 5.4045c-0.0662 3.6901-1.8093 5.4045-1.8093 5.4045m-3-8.6827s0.98347 0.79498 1.0085 3.2306c0.02476 2.4053-1.0085 3.3256-1.0085 3.3256"
                        style="stroke-width:1.7;stroke-linecap:round;fill:none" />
                    <path
                        class="war_designer_preview_icon_speaker_graphic_1"
                        d="m8.0134-1c-0.30522 0-0.56653 0.12796-0.75 0.34375l-2.25 2.6562h-2c-0.552 0-1 0.448-1 1-0.00627 0.99607 0.00222 2.0145 0 3 0 0.552 0.448 1 1 1h2l2.1562 2.4688c0.1714 0.3049 0.4693 0.5312 0.8438 0.5312 0.552 0 1-0.448 1-1v-9c0-0.552-0.448-1-1-1z"
                        style="fill-rule:evenodd" />
                </g>
            </svg>
        <?php
    }

    public function display_preview_icon_previous()
    {
        ?>
            <svg    width="30"
                    height="15">
                <g  class="war_designer_preview_icon_previous_next_graphic">
                    <polygon points="0,7 14,0 14,14" />
                    <polygon points="15,7 29,0 29,14" />
                </g>
            </svg>
        <?php
    }

    public function display_preview_icon_next()
    {
        ?>
        <svg    width="30"
                height="15">
            <g  class="war_designer_preview_icon_previous_next_graphic">
                <polygon points="0,0 14,7 0,14" />
                <polygon points="15,0 29,7 15,14" />
            </g>
        </svg>
    <?php
    }
}
