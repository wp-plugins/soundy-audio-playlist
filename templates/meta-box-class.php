<?php

class WarSoundyAudioPlaylistMetaBox
{
	public $sdy_pl; // WarSoundyAudioPlaylist Object
    public $post_id;

	public function __construct( $sdy_pl_object )
	{
		$this->sdy_pl = $sdy_pl_object;

        add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
        add_action( 'save_post', array( $this, 'save_post_data' ) );
	}

    public function add_meta_box( $post )
    {
        $screen = get_current_screen();

        add_meta_box( 'sdy_pl-meta-box',
                      'Soundy Audio Playlist',
                      array( $this, 'render_meta_box' ),
                      $screen->post_type,
                      'normal',
                      'high' );
    }

    public function render_meta_box( $post )
    {
        $this->sdy_pl->post_id = $this->post_id = $post->ID;

        $sdy_pl_enable            = get_post_meta( $this->post_id, 'war_sdy_pl_enable', true );
        $sdy_pl_enable            = $sdy_pl_enable ? $sdy_pl_enable : 'no';
        $enable_pp_corner         = get_post_meta( $this->post_id, 'war_sdy_pl_pp_corner_enable', true );
        $enable_pp_corner         = $enable_pp_corner ? $enable_pp_corner : 'default';
        $autoplay                 = get_post_meta( $this->post_id, 'war_sdy_pl_autoplay', true );
        $autoplay                 = $autoplay ? $autoplay : 'no';
        $play_mode                = get_post_meta( $this->post_id, 'war_sdy_pl_play_mode', true );
        $play_mode                = $play_mode ? $play_mode : 'seq_from_first';
        $audio_loop               = get_post_meta( $this->post_id, 'war_sdy_pl_loop', true );
        $audio_loop               = $audio_loop ? $audio_loop : 'no';
        $soundtracks_default      = str_replace( 'war_soundtrack' , 'war_back_end_soundtrack',
                                                 html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' ) );
        $soundtracks              = 'default';

        $yellow_select_id         = get_post_meta( $this->post_id, 'war_sdy_pl_yellow_select_id', true );
        $playlist_title_default   = get_option( 'war_sdy_pl_playlist_title' );
        $playlist_title           = $playlist_title_default;

        $pp_images_to_use = get_option( 'war_sdy_pl_pp_images_to_use' );

        if( $pp_images_to_use == 'default' )
        {
            $button_url_play  = get_option( 'war_sdy_pl_url_play_button' );
            $hover_url_play   = get_option( 'war_sdy_pl_url_play_hover' );
            $button_url_pause = get_option( 'war_sdy_pl_url_pause_button' );
            $hover_url_pause  = get_option( 'war_sdy_pl_url_pause_hover' );
        }
        else //if( $pp_images_to_use == 'designer' )
        {
            $button_url_play  = get_option( 'war_sdy_pl_design_pp_img_data_play_normal' );
            $hover_url_play   = get_option( 'war_sdy_pl_design_pp_img_data_play_hover' );
            $button_url_pause = get_option( 'war_sdy_pl_design_pp_img_data_pause_normal' );
            $hover_url_pause  = get_option( 'war_sdy_pl_design_pp_img_data_pause_hover' );
        }

        $column_layout = get_post_meta( $this->post_id, 'war_sdy_pl_column_layout', true );
        $column_layout = $column_layout ? $column_layout : 'default';

        $column_order = get_post_meta( $this->post_id, 'war_sdy_pl_column_order', true );
        $column_order = $column_order ? $column_order : 'default';

        $font_size = get_post_meta( $this->post_id, 'war_sdy_pl_font_size', true );
        $font_size = $font_size ? $font_size : 'default';

        $outer_box_width = get_post_meta( $this->post_id, 'war_sdy_pl_outer_box_width', true );
        $outer_box_width = $outer_box_width ? $outer_box_width : 'default';

        $scrolling_enable = get_post_meta( $this->post_id, 'war_sdy_pl_scrolling_enable', true );
        $scrolling_enable = $scrolling_enable ? $scrolling_enable : 'no';

        include( sprintf( "%s/meta-box.php", dirname( __FILE__ ) ) );
    }

    public function save_post_data( $post_id )
    {
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
            return $post_id;

        if ( 'page' == $_POST[ 'post_type' ] )
        {
            if ( ! current_user_can( 'edit_page', $post_id ) )
                return $post_id;
        }
        else
        {
            if ( ! current_user_can( 'edit_post', $post_id ) )
                return $post_id;
        }

        if( $_POST[ 'war_sdy_pl_soundtracks' ] == 'default' )
        {
            $playlist_title = 'default';
        }
        else
        {
            $playlist_title = $this->sdy_pl->do_sanitize_field( $_POST[ 'war_sdy_pl_playlist_title' ] );
        }
        update_post_meta( $post_id,
            'war_sdy_pl_playlist_title',
            $playlist_title );

        update_post_meta( $post_id,
            'war_sdy_pl_enable',
            $_POST[ 'war_sdy_pl_enable' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_pp_corner_enable',
            $_POST[ 'war_sdy_pl_pp_corner_enable' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_scrolling_enable',
            $_POST[ 'war_sdy_pl_scrolling_enable' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_scrolling_height',
            $_POST[ 'war_sdy_pl_scrolling_height' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_outer_box_width',
            $_POST[ 'war_sdy_pl_outer_box_width' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_playlist_outer_box_width_value',
            $_POST[ 'war_sdy_pl_playlist_outer_box_width_value' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_playlist_outer_box_width_unit',
            $_POST[ 'war_sdy_pl_playlist_outer_box_width_unit' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_font_size',
            $_POST[ 'war_sdy_pl_font_size' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_playlist_font_size_value',
            $_POST[ 'war_sdy_pl_playlist_font_size_value' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_playlist_font_size_unit',
            $_POST[ 'war_sdy_pl_playlist_font_size_unit' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_autoplay',
            $_POST[ 'war_sdy_pl_autoplay' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_play_mode',
            $_POST[ 'war_sdy_pl_play_mode' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_loop',
            $_POST[ 'war_sdy_pl_loop' ] );

        $soundtracks = $this->sdy_pl->do_sanitize_field_no_hmtl_encode( $_POST[ 'war_sdy_pl_soundtracks' ] );
        update_post_meta( $post_id,
            'war_sdy_pl_soundtracks',
            $soundtracks );

        update_post_meta( $post_id,
            'war_sdy_pl_yellow_select_id',
            $_POST[ 'war_sdy_pl_yellow_select_id' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_column_layout',
            $_POST[ 'war_sdy_pl_column_layout' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_column_order',
            $_POST[ 'war_sdy_pl_column_order' ] );

        update_post_meta( $post_id,
            'war_sdy_pl_column_ordered_names',
            $_POST[ 'war_sdy_pl_column_ordered_names' ] );

        foreach( $this->sdy_pl->playlist_column_names_titles as $name => $title )
        {
            $this->update_post_meta_column( $post_id, $name );
        }
    }

    private function update_post_meta_column( $post_id, $column_name )
    {
        update_post_meta( $post_id,
            'war_sdy_pl_column_do_display_' . $column_name,
            $_POST[ 'war_sdy_pl_column_do_display_' . $column_name ] );
        update_post_meta( $post_id,
            'war_sdy_pl_column_width_value_' . $column_name,
            $_POST[ 'war_sdy_pl_column_width_value_' . $column_name ] );
        update_post_meta( $post_id,
            'war_sdy_pl_column_width_unit_' . $column_name,
            $_POST[ 'war_sdy_pl_column_width_unit_' . $column_name ] );
    }
}

?>