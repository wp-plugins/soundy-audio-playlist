<?php

class WarSoundyAudioPlaylistFrontEnd
{
	private $sdy_pl; // WarSoundyAudioPlaylist Object

	private $button_url_play;
	private $hover_url_play;
	private $button_url_pause;
	private $hover_url_pause;
	
	private $preview;
	private $post_id;
	private $user_agent_is_mobile;
	
	public function __construct( $sdy_pl_object )
	{
		$this->sdy_pl = $sdy_pl_object;
		$this->user_agent_is_mobile = $this->sdy_pl->check_user_agent( 'mobile' );

        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts_front_end' ) );
        add_action( 'wp_head', array( $this, 'insert_audio' ) );
        add_shortcode( 'sdy_pl', array( $this, 'process_shortcode' ) );
	}

	public function enqueue_scripts_front_end( $hook )
	{
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui-widget' );
		wp_enqueue_script( 'jquery-ui-mouse' );
		wp_enqueue_script( 'jquery-ui-slider' );
		wp_enqueue_script( 'jquery-ui-sortable' );
		wp_enqueue_script( 'jquery-effects-core' );
	
		wp_register_script( 'sdy_pl-front-end', $this->sdy_pl->plugin_url . '/js/front-end.js', array( 'jquery' ) );
		wp_enqueue_script( 'sdy_pl-front-end' );
	
		wp_register_style( 'jquery-ui', $this->sdy_pl->plugin_url . '/css/jquery-ui-1.10.4/jquery-ui.css' );
		wp_register_style( 'sdy_pl_front_end', $this->sdy_pl->plugin_url . '/css/style-front-end.css' );

        $playlist_css_file = get_option( 'war_sdy_pl_playlist_css_file_url' );
        wp_register_style( 'sdy_pl_playlist', $playlist_css_file );

		wp_enqueue_style( 'jquery-ui' );
		wp_enqueue_style( 'sdy_pl_front_end' );
        wp_enqueue_style( 'sdy_pl_playlist' );
	}
			
	public function activate()
	{
	}

	public function insert_audio()
	{
		$this->post_id = get_the_ID();
        $this->sdy_pl->post_id = $this->post_id;

        $sdy_pl_enable = get_post_meta( get_the_ID(), 'war_sdy_pl_enable', true );
        $sdy_pl_enable = $sdy_pl_enable ? $sdy_pl_enable : 'no';
        $this->sdy_pl->enable = ( $sdy_pl_enable == 'yes' );
		if( $sdy_pl_enable == 'no' ) return;

		$soundtracks  = html_entity_decode( get_post_meta( $this->post_id, 'war_sdy_pl_soundtracks', true ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
		if( $soundtracks == 'default' || ! $soundtracks )
        {
            $soundtracks = html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
        }
		if( ! $soundtracks ) return;

		$preview = $_GET[ 'war_sdy_pl_preview' ];
		if( $preview )
		{
			$this->preview = $preview;
		}
		else
		{
			$this->preview = 'false';
		}
	
		$autoplay = get_post_meta( $this->post_id, 'war_sdy_pl_autoplay', true );
		$autoplay = $autoplay ? $autoplay : 'no';
	
		$play_mode = get_post_meta( $this->post_id, 'war_sdy_pl_play_mode', true );
		$play_mode = $play_mode ? $play_mode : 'seq_from_first';
	
		$audio_loop  = get_post_meta( $this->post_id, 'war_sdy_pl_loop', true );
		$audio_loop  = $audio_loop ? $audio_loop : 'no';
	
		if( $this->user_agent_is_mobile && $this->disable_sdy_pl_for_mobile ) return;
	
		$pp_code = $this->get_pp_corner_code();
		$pp_code    = str_replace( array( "\n", "\r" ), ' ', $pp_code );
		$soundtracks    = str_replace( array( "\n", "\r" ), ' ', $soundtracks );
		$yellow_select_id = get_post_meta( $this->post_id, 'war_sdy_pl_yellow_select_id', true );

        $playlist_css_use_only = get_option( 'war_sdy_pl_playlist_css_use_only' );
        if( $playlist_css_use_only == 'no' )
        {
            $color_bg_header_footer             = get_option( 'war_sdy_pl_playlist_color_bg_header_footer' );
            $color_txt_header_footer            = get_option( 'war_sdy_pl_playlist_color_txt_header_footer' );
            $color_slider_bar                   = get_option( 'war_sdy_pl_playlist_color_slider_bar' );
            $color_slider_range                 = get_option( 'war_sdy_pl_playlist_color_slider_range' );
            $color_slider_handle                = get_option( 'war_sdy_pl_playlist_color_slider_handle' );
            $color_bg_outer_box                 = get_option( 'war_sdy_pl_playlist_color_bg_outer_box' );
            $color_bg_even_soundtrack           = get_option( 'war_sdy_pl_playlist_color_bg_even_soundtrack' );
            $color_bg_odd_soundtrack            = get_option( 'war_sdy_pl_playlist_color_bg_odd_soundtrack' );
            $color_txt_soundtrack               = get_option( 'war_sdy_pl_playlist_color_txt_soundtrack' );
            $color_bg_soundtrack_selected       = get_option( 'war_sdy_pl_playlist_color_bg_soundtrack_selected' );
            $color_txt_soundtrack_selected      = get_option( 'war_sdy_pl_playlist_color_txt_soundtrack_selected' );
            $color_outline                      = get_option( 'war_sdy_pl_playlist_color_outline' );
            $pixel_outline_width                = get_option( 'war_sdy_pl_playlist_pixel_outline_width' );
            $pixel_soundtrack_separator_width   = get_option( 'war_sdy_pl_playlist_pixel_soundtrack_separator_width' );
            $pixel_soundtrack_vertical_padding  = get_option( 'war_sdy_pl_playlist_pixel_soundtrack_vertical_padding' );
            $pixel_outer_box_corner_rounding    = get_option( 'war_sdy_pl_playlist_pixel_outer_box_corner_rounding' );
            $pixel_inner_box_corner_rounding    = get_option( 'war_sdy_pl_playlist_pixel_inner_box_corner_rounding' );
            $pixel_outer_box_padding            = get_option( 'war_sdy_pl_playlist_pixel_outer_box_padding' );
            $pixel_inner_box_margin             = get_option( 'war_sdy_pl_playlist_pixel_inner_box_margin' );

            $scrolling_enable = get_post_meta( $this->post_id, 'war_sdy_pl_scrolling_enable', true );
            $scrolling_enable = $scrolling_enable ? $scrolling_enable : 'no';
            $scrolling_height = get_post_meta( $this->post_id, 'war_sdy_pl_scrolling_height', true );

            $pixel_outline_width                = intval( $pixel_outline_width )                . 'px';
            $pixel_soundtrack_separator_width   = intval( $pixel_soundtrack_separator_width )   . 'px';
            $pixel_soundtrack_vertical_padding  = intval( $pixel_soundtrack_vertical_padding )  . 'px';
            $pixel_outer_box_corner_rounding    = intval( $pixel_outer_box_corner_rounding )    . 'px';
            $pixel_inner_box_corner_rounding    = intval( $pixel_inner_box_corner_rounding )    . 'px';
            $pixel_outer_box_padding            = intval( $pixel_outer_box_padding )            . 'px';
            $pixel_inner_box_margin             = intval( $pixel_inner_box_margin )             . 'px';
        }

        $outer_box_width  = get_post_meta( $this->post_id, 'war_sdy_pl_outer_box_width', true );
        $outer_box_width = $outer_box_width ? $outer_box_width : 'default';
        if( $outer_box_width == 'default' )
        {
            $outer_box_width_value  = get_option( 'war_sdy_pl_playlist_outer_box_width_value' );
            $outer_box_width_unit   = get_option( 'war_sdy_pl_playlist_outer_box_width_unit' );
        }
        else
        {
            $outer_box_width_value  = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_outer_box_width_value', true );
            $outer_box_width_unit   = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_outer_box_width_unit', true );
        }

        $font_size  = get_post_meta( $this->post_id, 'war_sdy_pl_font_size', true );
        $font_size = $font_size ? $font_size : 'default';
        if( $font_size == 'default' )
        {
            $font_size_value  = get_option( 'war_sdy_pl_playlist_font_size_value' );
            $font_size_unit   = get_option( 'war_sdy_pl_playlist_font_size_unit' );
        }
        else
        {
            $font_size_value  = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_font_size_value', true );
            $font_size_unit   = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_font_size_unit', true );
        }

        $column_layout  = get_post_meta( $this->post_id, 'war_sdy_pl_column_layout', true );
        $column_layout = $column_layout ? $column_layout : 'default';

        $column_order  = get_post_meta( $this->post_id, 'war_sdy_pl_column_order', true );
        $column_order = $column_order ? $column_order : 'default';
        if( $column_order == 'custom' )
        {
            $column_ordered_names_string = get_post_meta( $this->post_id, 'war_sdy_pl_column_ordered_names', true );
            $column_ordered_names_string = $column_ordered_names_string ? $column_ordered_names_string : get_option( 'war_sdy_pl_column_ordered_names' );
        }
        else
        {
            $column_ordered_names_string = get_option( 'war_sdy_pl_column_ordered_names' );
        }
        $column_ordered_names_string = $column_ordered_names_string ? $column_ordered_names_string : $this->sdy_pl->playlist_column_names;

        $responsive_mode = get_option( 'war_sdy_pl_responsive_mode' );
        if( $responsive_mode != 'none' )
        {
            $responsive_include_player_button = get_option( 'war_sdy_pl_responsive_include_audio_player_button' );
            if( $responsive_mode == 'table' )
            {
                $responsive_table_rows = array();
                for( $i = 1; $i <= $this->sdy_pl->responsive_table_number_of_rows; $i++ )
                {
                    $window_width_min = get_option( 'war_sdy_pl_responsive_window_width_min_' . $i );
                    $window_width_min = ( $window_width_min == '' ) ? -1 : $window_width_min;
                    $window_width_max = get_option( 'war_sdy_pl_responsive_window_width_max_' . $i );
                    $window_width_max = ( $window_width_max == '' ) ? -1 : $window_width_max;

                    if( $window_width_min != -1 || $window_width_max != -1 )
                    {
                        $button_size = get_option( 'war_sdy_pl_responsive_button_size_' . $i );
                        $button_size = ( $button_size == '' ) ? -1 : $button_size;
                        $offset_x = get_option( 'war_sdy_pl_responsive_offset_x_' . $i );
                        $offset_x = ( $offset_x == '' ) ? -1 : $offset_x;
                        $offset_y = get_option( 'war_sdy_pl_responsive_offset_y_' . $i );
                        $offset_y = ( $offset_y == '' ) ? -1 : $offset_y;
                        $responsive_table_rows[] = '{ ' .
                            'window_width_min: ' . $window_width_min . ',' .
                            'window_width_max: ' . $window_width_max . ',' .
                            'button_size: '      . $button_size . ',' .
                            'offset_x: '         . $offset_x . ',' .
                            'offset_y: '         . $offset_y .
                            '}';
                    }
                }
            }
            else // if( $responsive_mode == 'scale' )
            {
                $responsive_reference_window_width = get_option( 'war_sdy_pl_responsive_scale_reference_window_width' );
            }
        }
		?>
			<script>
				var war_sdy_pl_front_end = new war_SoundyAudioPlaylistFrontEnd(
				{
					soundtracks:       '<?php echo $soundtracks; ?>',
					autoplay:          '<?php echo $autoplay; ?>',
					play_mode:         '<?php echo $play_mode; ?>',
					audio_loop:        '<?php echo $audio_loop; ?>',
					pp_code:           '<?php echo $pp_code; ?>',
					yellow_select_id:  '<?php echo $yellow_select_id; ?>',
					preview:           '<?php echo $this->preview; ?>',
					button_url_play:   '<?php echo $this->button_url_play; ?>',
					button_url_pause:  '<?php echo $this->button_url_pause; ?>',
					hover_url_play:    '<?php echo $this->hover_url_play; ?>',
					hover_url_pause:   '<?php echo $this->hover_url_pause; ?>',
					user_agent_is_IOS: <?php echo $this->user_agent_is_IOS() ?>
				} );

                var button_play  = new Image();
                var button_pause = new Image();
                var hover_play   = new Image();
                var hover_pause  = new Image();
                button_play.src  = '<?php echo $this->button_url_play; ?>';
                button_pause.src = '<?php echo $this->button_url_pause; ?>';
                hover_play.src   = '<?php echo $this->hover_url_play; ?>';
                hover_pause.src  = '<?php echo $this->hover_url_pause; ?>';

                <?php if( $playlist_css_use_only == 'no' ): ?>
                    var sdy_pl_css_use_only = false;
                    var sdy_pl_css_color_bg_header_footer               = '<?php echo $color_bg_header_footer; ?>';
                    var sdy_pl_css_color_txt_header_footer              = '<?php echo $color_txt_header_footer; ?>';
                    var sdy_pl_css_color_slider_bar                     = '<?php echo $color_slider_bar; ?>';
                    var sdy_pl_css_color_slider_range                   = '<?php echo $color_slider_range; ?>';
                    var sdy_pl_css_color_slider_handle                  = '<?php echo $color_slider_handle; ?>';
                    var sdy_pl_css_color_bg_outer_box                   = '<?php echo $color_bg_outer_box; ?>';
                    var sdy_pl_css_color_bg_even_soundtrack             = '<?php echo $color_bg_even_soundtrack; ?>';
                    var sdy_pl_css_color_bg_odd_soundtrack              = '<?php echo $color_bg_odd_soundtrack; ?>';
                    var sdy_pl_css_color_txt_soundtrack                 = '<?php echo $color_txt_soundtrack; ?>';
                    var sdy_pl_css_color_bg_soundtrack_selected         = '<?php echo $color_bg_soundtrack_selected; ?>';
                    var sdy_pl_css_color_txt_soundtrack_selected        = '<?php echo $color_txt_soundtrack_selected; ?>';
                    var sdy_pl_css_color_outline                        = '<?php echo $color_outline; ?>';
                    var sdy_pl_css_pixel_outline_width                  = '<?php echo $pixel_outline_width; ?>';
                    var sdy_pl_css_pixel_soundtrack_separator_width     = '<?php echo $pixel_soundtrack_separator_width; ?>';
                    var sdy_pl_css_pixel_soundtrack_vertical_padding    = '<?php echo $pixel_soundtrack_vertical_padding; ?>';
                    var sdy_pl_css_pixel_outer_box_corner_rounding      = '<?php echo $pixel_outer_box_corner_rounding; ?>';
                    var sdy_pl_css_pixel_inner_box_corner_rounding      = '<?php echo $pixel_inner_box_corner_rounding; ?>';
                    var sdy_pl_css_pixel_outer_box_padding              = '<?php echo $pixel_outer_box_padding; ?>';
                    var sdy_pl_css_pixel_inner_box_margin               = '<?php echo $pixel_inner_box_margin; ?>';
                    var sdy_pl_css_outer_box_width_value                = '<?php echo $outer_box_width_value; ?>';
                    var sdy_pl_css_outer_box_width_unit                 = '<?php echo $outer_box_width_unit; ?>';
                    var sdy_pl_css_font_size_value                      = '<?php echo $font_size_value; ?>';
                    var sdy_pl_css_font_size_unit                       = '<?php echo $font_size_unit; ?>';
                    var sdy_pl_css_scrolling_enable                     = '<?php echo $scrolling_enable; ?>';
                    var sdy_pl_css_scrolling_height                     = '<?php echo $scrolling_height; ?>';
                <?php else: ?>
                    var sdy_pl_css_use_only = true;
                <?php endif; ?>

                var sdy_pl_column_do_display  = new Array();
                var sdy_pl_column_width_value = new Array();
                var sdy_pl_column_width_unit  = new Array();

                var sdy_pl_column_ordered_names_string = '<?php echo $column_ordered_names_string; ?>';

                <?php
                    foreach( $this->sdy_pl->playlist_column_names_titles as $column_name => $column_title )
                    {
                        $column_data = $this->sdy_pl->get_column_data( $column_name, $column_layout );
                        echo 'sdy_pl_column_do_display[ "'  . $column_name . '" ] = "' . $column_data[ 'do_display' ]  . '";';
                        echo 'sdy_pl_column_width_value[ "' . $column_name . '" ] = "' . $column_data[ 'width_value' ] . '";';
                        echo 'sdy_pl_column_width_unit[ "'  . $column_name . '" ] = "' . $column_data[ 'width_unit' ]  . '";';
                    }
                ?>

                var war_sdy_pl_responsive_mode = '<?php echo $responsive_mode; ?>';
                var war_sdy_pl_responsive_include_player_button = '<?php echo $responsive_include_player_button; ?>';
                var war_sdy_pl_button_corner = '<?php echo get_option( "war_sdy_pl_pp_corner" ); ?>';
                <?php
                    if( $responsive_mode != 'none' )
                    {
                        if( $responsive_mode == 'table' )
                        {
                            echo 'var war_sdy_pl_responsive_table_rows = new Array();';
                            foreach( $responsive_table_rows as $row )
                            {
                                echo 'war_sdy_pl_responsive_table_rows.push( ' . $row . ' );';
                            }
                        }
                        else // if( $responsive_mode == 'scale' )
                        {
                            echo 'var war_sdy_pl_responsive_reference_window_width = ' . $responsive_reference_window_width . ';';
                        }
                    }
                ?>
            </script>
		<?php
	}
	
	public function get_pp_corner_code()
	{
		if( $this->preview == 'false' )
		{
			$pp_images_to_use = get_option( 'war_sdy_pl_pp_images_to_use' );
	
			if( $pp_images_to_use == 'default' )
			{
				$this->button_url_play  = get_option( 'war_sdy_pl_url_play_button' );
				$this->hover_url_play   = get_option( 'war_sdy_pl_url_play_hover' );
				$this->button_url_pause = get_option( 'war_sdy_pl_url_pause_button' );
				$this->hover_url_pause  = get_option( 'war_sdy_pl_url_pause_hover' );
			}
			else //if( $pp_images_to_use == 'designer' )
			{
				$this->button_url_play  = get_option( 'war_sdy_pl_design_pp_img_data_play_normal' );
				$this->hover_url_play   = get_option( 'war_sdy_pl_design_pp_img_data_play_hover' );
				$this->button_url_pause = get_option( 'war_sdy_pl_design_pp_img_data_pause_normal' );
				$this->hover_url_pause  = get_option( 'war_sdy_pl_design_pp_img_data_pause_hover' );
			}
		}

		$pp_corner_enable = $this->sdy_pl->get_meta_data( 'war_sdy_pl_pp_corner_enable' );
		if( $pp_corner_enable == 'yes' )
		{
			$button_position  = get_option( 'war_sdy_pl_pp_position' );
			$position = ( $button_position == 'document' ) ? 'absolute' : 'fixed';
	
			$button_corner = get_option( 'war_sdy_pl_pp_corner' );
			switch( $button_corner )
			{
				case upper_right: 
					$dim_x = 'right';
					$dim_y = 'top';
					break;
				case upper_left: 
					$dim_x = 'left';
					$dim_y = 'top';
					break;
				case bottom_right: 
					$dim_x = 'right';
					$dim_y = 'bottom';
					break;
				case bottom_left: 
					$dim_x = 'left';
					$dim_y = 'bottom';
					break;
			}
	
			$button_x = get_option( 'war_sdy_pl_offset_x' ) .
			            get_option( 'war_sdy_pl_offset_x_unit' );
			$button_y = get_option( 'war_sdy_pl_offset_y' ) .
			            get_option( 'war_sdy_pl_offset_y_unit' );
			
			$position_css_code = "position: $position; $dim_x: $button_x; $dim_y: $button_y;";
		
			$pp_code = '<img class="war_sdy_pl_audio_control war_sdy_pl_pp_corner" style="' . $position_css_code . '">';
		}
		else
		{
			$pp_code = '';
		}
			
		return $pp_code;
	}

	public function process_shortcode( $atts )
	{
        $sdy_pl_enable = get_post_meta( get_the_ID(), 'war_sdy_pl_enable', true );
        $sdy_pl_enable = $sdy_pl_enable ? $sdy_pl_enable : 'no';
        $this->sdy_pl->enable = ( $sdy_pl_enable == 'yes' );
        $this->sdy_pl->enable = ( $sdy_pl_enable == 'yes' );
        if( $sdy_pl_enable == 'no' ) return '<span style="color: red;"> Soundy Audio Playlist is disabled. You can enable it in General tab of plugin meta box. </span>';

		if( $atts[ 0 ] )
		{
			if( $atts[ 0 ] == 'playlist' )
			{
				return sdy_pl_get_playlist();
			}
			elseif( $atts[ 0 ] == 'playlist_title' )
			{
				return sdy_pl_get_playlist_title();
			}
			elseif( $atts[ 0 ] == 'playlist_status' )
			{
				return sdy_pl_get_playlist_status();
			}
			elseif( $atts[ 0 ] == 'button_play_pause' )
			{
				return sdy_pl_get_button_play_pause();
			}
            elseif( $atts[ 0 ] == 'button_previous' )
            {
                return sdy_pl_get_button_previous();
            }
            elseif( $atts[ 0 ] == 'button_next' )
            {
                return sdy_pl_get_button_next();
            }
			elseif( $atts[ 0 ] == 'number_of_tracks' )
			{
				return sdy_pl_get_number_of_tracks();
			}
			elseif( $atts[ 0 ] == 'title' )
			{
				return sdy_pl_get_title();
			}
			elseif( $atts[ 0 ] == 'artist' )
			{
				return sdy_pl_get_artist();
			}
			elseif( $atts[ 0 ] == 'composer' )
			{
				return sdy_pl_get_composer();
			}
			elseif( $atts[ 0 ] == 'id' )
			{
				return sdy_pl_get_id();
			}
			elseif( $atts[ 0 ] == 'index' )
			{
				return sdy_pl_get_index();
			}
			elseif( $atts[ 0 ] == 'type' )
			{
				return sdy_pl_get_type();
			}
			elseif( $atts[ 0 ] == 'volume' )
			{
				return sdy_pl_get_volume();
			}
            elseif( $atts[ 0 ] == 'volume_slider' )
            {
                return sdy_pl_get_volume_slider();
            }
			elseif( $atts[ 0 ] == 'duration' )
			{
				return sdy_pl_get_duration();
			}
			elseif( $atts[ 0 ] == 'time' )
			{
				return sdy_pl_get_time();
			}
			elseif( $atts[ 0 ] == 'time_slider' )
			{
				return sdy_pl_get_time_slider();
			}
			elseif( $atts[ 0 ] == 'url' )
			{
				return sdy_pl_get_url();
			}
            elseif( $atts[ 0 ] == 'speaker_icon' )
            {
                return sdy_pl_get_speaker_icon();
            }
		}
	}
	
	public function user_agent_is_IOS() 
	{
        $user_agent = strtolower ( $_SERVER[ 'HTTP_USER_AGENT' ] );
    
		if( preg_match ( "/ipod|iphone|ipad/", $user_agent ) )
		{
			return 'true';
		}
		else
		{
			return 'false';
		}
	}
}

?>