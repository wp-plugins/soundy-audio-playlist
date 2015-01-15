<?php
/**
 * @package Soundy_Audio_Playlist_PRO
 * @version 2.2
 */
/*
Plugin Name: Soundy Audio Playlist
Plugin URI: http://webartisan.ch/en/products/soundy-audio-playlist/free-wordpress-plugin/
Description: This plugin allows any page or post to play and display an audio playlist.
Version: 2.2
Author: Bertrand du Couédic
Author URI: http://webartisan.ch/en/about
License: GPL2

Copyright 2014 Bertrand du Couédic  (email: bducouedic@webartisan.ch)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class WarSoundyAudioPlaylist
{
	public $sdy_pl_type                      = 'free';
	public $sdy_pl_subtype                   = '';
	public $sdy_pl_version                   = '2.2';
	public $sdy_pl_free_home_wp_url          = 'http://wordpress.org/plugins/soundy-audio-playlist/';
	public $sdy_pl_pro_home_url              = 'http://webartisan.ch/en/products/soundy-audio-playlist/pro-wordpress-plugin/';
    public $sdy_pl_pro_updates_url           = 'http://webartisan.ch/products/updates/';
	public $disable_sdy_pl_for_mobile        = false;
	public $autoplay                         = 'yes';
	public $loop                             = 'yes';
	public $pp_images_to_use                 = 'designer';
	public $pp_corner_enable                 = 'yes';
	public $pp_position                      = 'window';
	public $pp_corner                        = 'upper_right';
	public $offset_x                         = 35;
	public $offset_x_unit                    = 'px';
	public $offset_y                         = 35;
	public $offset_y_unit                    = 'px';
	public $button_dimensions                = '48x48';
	public $color_blue_start                 = '#1e8cbe';
	public $color_blue_end                   = '#c0e7f0';
	public $color_yellow_start               = '#ffff00';
	public $color_yellow_end                 = '#ffffaa';
	public $time_to_get_soundtrack_duration  = 600; // milliseconds
    public $responsive_mode                  = 'none';
    public $responsive_table_number_of_rows  = 10;
    public $responsive_scale_reference_window_width = 2048;

    public  $playlist_column_names            = 'index, title, artist, composer, time, id';
    public  $playlist_column_names_titles     = array
    (
        'index'    => 'Index',
        'title'    => 'Title',
        'artist'   => 'Artist',
        'composer' => 'Composer',
        'time'     => 'Time',
        'id'       => 'ID'
    );
    
    public $column_do_display_index          = 'yes';
    public $column_width_value_index         = '24';
    public $column_width_unit_index          = 'px';

    public $column_do_display_title          = 'yes';
    public $column_width_value_title         = '25';
    public $column_width_unit_title          = '%';

    public $column_do_display_artist         = 'yes';
    public $column_width_value_artist        = '25';
    public $column_width_unit_artist         = '%';

    public $column_do_display_composer       = 'yes';
    public $column_width_value_composer      = '25';
    public $column_width_unit_composer       = '%';

    public $column_do_display_time           = 'yes';
    public $column_width_value_time          = '42';
    public $column_width_unit_time           = 'px';

    public $column_do_display_id             = 'no';
    public $column_width_value_id            = '3';
    public $column_width_unit_id             = '%';

    public $page_preview_url                 = '';

	public $design_pp; // WarSoundyAudioPlaylistDesignerPlayPause Object
    public $design_pl; // WarSoundyAudioPlaylistDesignerPlaylist Object
	public $post_id;

    public $play_button_url                   = '/images/buttons/48x48/play-square-grey.png';
    public $play_hover_url                    = '/images/buttons/48x48/play-square-blue.png';
    public $pause_button_url                  = '/images/buttons/48x48/pause-square-grey.png';
    public $pause_hover_url                   = '/images/buttons/48x48/pause-square-blue.png';
    public $previous_button_url               = '/images/buttons/icon-previous.png';
    public $next_button_url                   = '/images/buttons/icon-next.png';
    public $icon_speaker_url                  = '/images/audio-volume.svg';
    public $playlist_css_file_url             = '/css/style-playlist.css';

    public $playlist_css_use_only = 'no';

	public $front_end;  // WarSoundyAudioPlaylistFrontEnd Object
    public $playlist;   // WarSoundyAudioPlaylistPlaylist Object
    public $meta_box;   // WarSoundyAudioPlaylistMetaBox Object
	public $plugin_name;
	public $plugin_url;
	public $plugin_path;
	public $plugin_path_file = __FILE__;
    public $site_url;
    public $media_library_path = '/wp-content/uploads';

    public $units_length = array(
		'px' => 'px',
		'%'  => '%',
		'in' => 'in',
		'mm' => 'mm',
		'cm' => 'cm'
	);

    public $units_font_size = array(
        'pt' => 'pt',
        'px' => 'px',
        '%'  => '%',
        'in' => 'in',
        'mm' => 'mm',
        'cm' => 'cm',
        'em' => 'em',
        'pc' => 'pc'
    );

    public $audio_playlist_title_default = 'La Guitare Classique';
    public $audio_playlist = array(
        array(
            'id'       => 's1',
            'title'    => 'Bransle du Poictou',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Adrian Le Roy (1520-1598)',
            'url'      => 'http://k007.kiwi6.com/hotlink/bk1p8zzxwi/Bransle_du_Poictou.mp3',
            'volume'   => '80',
            'time'     => '0:29',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's2',
            'title'    => 'Ecossaise',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Mauro Giuliani (1780-1840)',
            'url'      => 'http://k007.kiwi6.com/hotlink/wx4b4whrcs/Ecossaise.mp3',
            'volume'   => '80',
            'time'     => '0:32',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's3',
            'title'    => 'Folklore italien',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Anonymous',
            'url'      => 'http://k007.kiwi6.com/hotlink/52i1dpvman/Folklore_italien.mp3',
            'volume'   => '80',
            'time'     => '0:47',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's4',
            'title'    => 'Greensleeves',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Anonymous',
            'url'      => 'http://k007.kiwi6.com/hotlink/1j71z23nl8/Greensleeves.mp3',
            'volume'   => '80',
            'time'     => '1:12',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's5',
            'title'    => 'Danse allemande',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Franz Hünten (1793-1878)',
            'url'      => 'http://k007.kiwi6.com/hotlink/dsbbxlox92/Danse_allemande.mp3',
            'volume'   => '80',
            'time'     => '1:01',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's6',
            'title'    => 'Allegretto',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Mauro Giuliani (1780-1840)',
            'url'      => 'http://k007.kiwi6.com/hotlink/k2fgiomoyc/Allegretto.mp3',
            'volume'   => '80',
            'time'     => '0:37',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's7',
            'title'    => 'Donne-moi la fleur',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Anonymous',
            'url' 	   => 'http://k007.kiwi6.com/hotlink/0k5x5ri4qf/Donne-moi_la_fleur.mp3',
            'volume'   => '80',
            'time'     => '0:33',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's8',
            'title'    => 'Tourdion',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Pierre Attaingnant (1498-1552)',
            'url' 	   => 'http://k007.kiwi6.com/hotlink/94l4xhdphm/Tourdion.mp3',
            'volume'   => '80',
            'time'     => '1:15',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's9',
            'title'    => 'Ballet',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Ferdinando Carulli (1770-1841)',
            'url' 	   => 'http://k007.kiwi6.com/hotlink/m9cdfzpm16/Ballet.mp3',
            'volume'   => '80',
            'time'     => '1:18',
            'type'     => 'audio/mpeg',
        ),
        array(
            'id'       => 's10',
            'title'    => 'Waltz',
            'artist'   => 'Jean-Maurice Mourat',
            'composer' => 'Anonymous (1870)',
            'url' 	   => 'http://k007.kiwi6.com/hotlink/j12i9ggd0v/Waltz.mp3',
            'volume'   => '80',
            'time'     => '1:19',
            'type'     => 'audio/mpeg',
        )
    );

	public function __construct()  
	{
		$this->plugin_path              = dirname( __FILE__ );
		$this->plugin_name              = substr( $this->plugin_path, strrpos( $this->plugin_path, '/' ) + 1 );
		$this->plugin_url               = WP_PLUGIN_URL . '/' . $this->plugin_name;
        $this->site_url                 = get_site_url();
        $this->media_library_path       = substr( $this->plugin_path, 0, strrpos( $this->plugin_path, '/wp-content/' ) ) . $this->media_library_path;

        /*
        Default soundtracks stored now on kiwi6.com
		foreach( $this->audio_playlist as &$soundtrack )
		{
			$soundtrack[ 'url' ] = $this->plugin_url . $soundtrack[ 'url' ];
		}
        */
		
		$this->play_button_url          = $this->plugin_url . $this->play_button_url;
		$this->play_hover_url           = $this->plugin_url . $this->play_hover_url;
		$this->pause_button_url         = $this->plugin_url . $this->pause_button_url;
		$this->pause_hover_url          = $this->plugin_url . $this->pause_hover_url;
		$this->previous_button_url      = $this->plugin_url . $this->previous_button_url;
		$this->next_button_url          = $this->plugin_url . $this->next_button_url;
		$this->icon_speaker_url         = $this->plugin_url . $this->icon_speaker_url;
        $this->playlist_css_file_url    = $this->plugin_url . $this->playlist_css_file_url;

        $this->playlist_column_names = preg_replace( '/\s/', '', $this->playlist_column_names );

		if( is_admin() )
		{
            include( sprintf( "%s/templates/designer-play-pause.php", dirname( __FILE__ ) ) );
            $this->design_pp = new WarSoundyAudioPlaylistDesignerPlayPause( $this );

            include( sprintf( "%s/templates/designer-playlist.php", dirname( __FILE__ ) ) );
            $this->design_pl = new WarSoundyAudioPlaylistDesignerPlaylist( $this );

			register_activation_hook( __FILE__, array( $this, 'activate' ) ); 
			register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
	
			add_action( 'admin_menu', array( $this, 'add_plugin_settings_menu' ) );
			add_action( 'admin_init', array( $this, 'register_settings' ) ); 
			
			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'add_settings_link_to_plugins_page_sdy_pl_entry' ) );
		    add_filter( 'plugin_row_meta', array( $this, 'add_pro_buy_link_to_plugins_page_sdy_pl_entry' ), 10, 2 );

			$uri = $_SERVER[ 'REQUEST_URI' ];
			$is_edit_post =  ( strpos( $uri, '/wp-admin/post.php' ) == 0 ) ||
		      						 ( strpos( $uri, '/wp-admin/post-new.php' ) == 0 );
		  
		    if( ( isset( $_GET[ 'page' ] ) && ( $_GET[ 'page' ] == 'sdy_pl' ) ) || $is_edit_post )
		    {
                add_action( 'wp_ajax_sdy_pl_import_soundtracks', array( $this, 'import_soundtracks' ) );
				add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
				// to get 'Insert into Post' Button in Upload Dialog:
				add_filter( 'get_media_item_args', array( $this, 'get_media_item_args' ) ); 
			}
			
			if( $is_edit_post )
			{
                include( sprintf( "%s/templates/meta-box-class.php", dirname( __FILE__ ) ) );
                $this->meta_box = new WarSoundyAudioPlaylistMetaBox( $this );
			}
		}
		else
		{
                include( sprintf( "%s/templates/front-end.php", dirname( __FILE__ ) ) );
                $this->front_end = new WarSoundyAudioPlaylistFrontEnd( $this );
		}

        include( sprintf( "%s/templates/playlist.php", dirname( __FILE__ ) ) );
        $this->playlist = new WarSoundyAudioPlaylistPlaylist( $this );

        if( $this->sdy_pl_version != get_option( 'war_sdy_pl_version' ) )
        {
            // Init playlist font size and width in playlist designer
            $this->design_pl->activate();
            update_option( 'war_sdy_pl_version', $this->sdy_pl_version );

            $this->initResponsive();
        }
	}

	public function activate() 
	{
		add_option( 'war_sdy_pl_type',                      $this->sdy_pl_type );
		add_option( 'war_sdy_pl_version',                   $this->sdy_pl_version );
		add_option( 'war_sdy_pl_playlist_title_default',    $this->audio_playlist_title_default );
		add_option( 'war_sdy_pl_pp_images_to_use',          $this->pp_images_to_use );
		add_option( 'war_sdy_pl_pp_corner_enable',          $this->pp_corner_enable );
		add_option( 'war_sdy_pl_pp_position',               $this->pp_position );
		add_option( 'war_sdy_pl_pp_corner',                 $this->pp_corner );
		add_option( 'war_sdy_pl_offset_x',                  $this->offset_x );
		add_option( 'war_sdy_pl_offset_x_unit',             $this->offset_x_unit );
		add_option( 'war_sdy_pl_offset_y',                  $this->offset_y );
		add_option( 'war_sdy_pl_offset_y_unit',             $this->offset_y_unit );
		add_option( 'war_sdy_pl_page_preview_url', 	        $this->page_preview_url );
        add_option( 'war_sdy_pl_playlist_css_file_url',     $this->playlist_css_file_url );
        add_option( 'war_sdy_pl_playlist_css_use_only',     $this->playlist_css_use_only );

        $audio_playlist = '';
        $index = 0;
        foreach( $this->audio_playlist as &$soundtrack )
        {
            $index++;
            $index = ( $index < 10 ) ? ( '0' . $index ) : $index;
            $audio_playlist .= '<li>';
            $audio_playlist .= '<div class="war_soundtrack_index">'    . $index . '.'              . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_title">'    . $soundtrack[ 'title' ]    . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_artist">'   . $soundtrack[ 'artist' ]   . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_composer">' . $soundtrack[ 'composer' ] . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_url">'      . $soundtrack[ 'url' ]      . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_volume">'   . $soundtrack[ 'volume' ]   . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_time">'     . $soundtrack[ 'time' ]     . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_id">'       . $soundtrack[ 'id' ]       . '</div>';
            $audio_playlist .= '<div class="war_soundtrack_type">'     . $soundtrack[ 'type' ]     . '</div>';
            $audio_playlist .= '</li>';
        }
        update_option( 'war_sdy_pl_default_soundtracks', $audio_playlist );

		if( ! get_option( 'war_sdy_pl_url_play_button' ) )
		{ 
			update_option( 'war_sdy_pl_url_play_button', $this->play_button_url );
		} 
		if( ! get_option( 'war_sdy_pl_url_play_hover' ) )
		{ 
			update_option( 'war_sdy_pl_url_play_hover', $this->play_hover_url );
		} 
		if( ! get_option( 'war_sdy_pl_url_pause_button' ) )
		{ 
			update_option( 'war_sdy_pl_url_pause_button', $this->pause_button_url );
		} 
		if( ! get_option( 'war_sdy_pl_url_pause_hover' ) )
		{ 
			update_option( 'war_sdy_pl_url_pause_hover', $this->pause_hover_url );
		}

        $image_play_normal      = get_option( 'war_sdy_pl_url_play_button' );
        $image_play_hover       = get_option( 'war_sdy_pl_url_play_hover' );
        $image_pause_normal     = get_option( 'war_sdy_pl_url_pause_button' );
        $image_pause_hover      = get_option( 'war_sdy_pl_url_pause_hover' );
        $playlist_css_file_url  = get_option( 'war_sdy_pl_playlist_css_file_url' );

        $image_play_normal      = str_replace( 'soundy-audio-playlist-pro', 'soundy-audio-playlist', $image_play_normal );
        $image_play_hover       = str_replace( 'soundy-audio-playlist-pro', 'soundy-audio-playlist', $image_play_hover );
        $image_pause_normal     = str_replace( 'soundy-audio-playlist-pro', 'soundy-audio-playlist', $image_pause_normal );
        $image_pause_hover      = str_replace( 'soundy-audio-playlist-pro', 'soundy-audio-playlist', $image_pause_hover );
        $playlist_css_file_url  = str_replace( 'soundy-audio-playlist-pro', 'soundy-audio-playlist', $playlist_css_file_url );

        update_option( 'war_sdy_pl_url_play_button',        $image_play_normal );
        update_option( 'war_sdy_pl_url_play_hover',         $image_play_hover );
        update_option( 'war_sdy_pl_url_pause_button',       $image_pause_normal );
        update_option( 'war_sdy_pl_url_pause_hover',        $image_pause_hover );
        update_option( 'war_sdy_pl_playlist_css_file_url',  $playlist_css_file_url );

        if( ! get_option( 'war_sdy_pl_design_pp_img_data_play_normal' ) )
        {
            update_option( 'war_sdy_pl_design_pp_img_data_play_normal', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADFElEQVR4Xu2bsWsUQRTGvyNXRPfAK4QoWCQSwcLDCwiaztO0GlttTMDYafpoafwDLG2ijbaKrXp2IgoqsRRNIWjA4gKJpjCM75vL5pZL9NjkZnZ2dh4Me9m9cPt+896beTPzStgmzaty69Jm2/44v3eeyKtLazxMqlDq/NGsy+cFabz6LB9EuWkBwSs2AWjlm9Kq2DegMHEYGD/oF4TXP4Hn34HfG9S5Ja1BCDGA97rnhyOF2zVgaDBhGR5xWF5XuLMILK1RP7GAxph8aE5p02fPL4wDUdlP5eN+JIQbb2NLmCYABodJXDiicH3Ub+VjCPc/Kzz7Rl2fEoDS9+/WFWrVYgBYbCnMafdvFR0AR4FCW0AAECwguECIASEIFnkeEEaBMAoYHQW+rAJvJA2NysC5Q0BFri5IZyps0AWo/Oy7jrqEMDMKnBcQWYsVAI+WgMfSuuVoBbgmIGrV7DBkCiBW+4ysOBHE0KB9EE4AiNW+MgxZi7AbH5wCQBC244NzAGJrsBUfnAVgKz44D8B0fMgNAFPxIVcATMSHXALoZ3zINYB+xAcvABAEh8152dZMm2R5A4AQOJ2elJlkGsk3AC5gJTawZo8DEykzzHwC6FKcPT4SyZbeWEFd4LIkURd3mUTlxwJ26PXTkkZzYWUvabT7AP5h7jPH+rOQ4i6AHRSPBiTSi+JpA93/RgV3AXS99V78PD8ADPm5+wAM+7m7ACz5ubsALPm5WwAy8HO3ACTehtPXfo3naRKg5HetDIPcGpuTA6hrG+2fNjGeOw2AL7e8Drz40V73555g2rx9twr2+j8rFtDrJbJ8HgBsnRQ1uD2eZQ/3+u1gAcEC4sPSwQXCISmjh6R6BaOsnocgGIJgCILtkhm1Eoqmtsrm9pcV7p3yt2YwDrgsm7spBzh//eH+GsvmKC+liLB0EiMVhVsn/IVA5ec/AV9Xaf4f5fxuPVE6q14JhAOgJXAN3svSWUnNdc+rFdH1bKJ0llbA+mH1QFuC18KeL011FU8nNdaltFI+r4SQWIQXontcLFyXz0snd+QvU6eB88rzhm4AAAAASUVORK5CYII=' );
        }
        if( ! get_option( 'war_sdy_pl_design_pp_img_data_play_hover' ) )
        {
            update_option( 'war_sdy_pl_design_pp_img_data_play_hover', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADMElEQVR4Xu2bvVMTQRjGnxi+BBxpsbLSUkfsTWrH0RYstILW8A8Q/wFjCxUUYGtja0Ivjq1WVlqq48gAEtbn3eQgJKhzmd293c3uTCY3uZube37vR/bdvbeEgdG8zZ+e8CPfMY0PFLMFVOX7dJTODptzPG7w8zQm1Rdo2eRvNYL4Lue6ALT4Zmb1OyirBYzhLspRsHiHNvZwjPdoZwYXL6gKhAyAiK/MAOoFprGAco9nRMFAi9hDW61iH786hm8RQJUHzUrX+tjGtLoZqfjMjB8J4TH2MwNrAK958uF9jKvnmIrS8v0+vIYD9Qa/ReuWAPjGg7l1Wj9W1+8HIKGw0vECyQFNJReMKABJBglA8oAUAikHpCSY/gXS3+BoToTSPMDqROgnFD6xFJ0lZxZZ3pSVPVNhex4g4ll14QtOtHDWGVjFpBcgnADYwBE2cDhg9QcY1yCuZGsxBfhFoQBEr4hfJIhlgihiFA4gE30Nl7Q3VLj85nJ4AyAT7To/eAcgA+EqP3gLwFV+8BqAi/wQBACb+SEoADbyQ5AATOaHYAGYyg/BA+gNizVM5Z5DRQNAlAsAmT/kGVEBkKn0Eiby6NebpN2dIXvl8N+qwVxP+p+LZ3l+BzOQmiLPCBCA7N2c37eV+kHcP694ARUQgEHh8wRRx2W9wDLsCAjAmURxd1k/yBvvF0EKDsAik9wyP6ZWkTwFYDbO/xUengGwE+cBAbAT58EBMB3nngJwF+eeAXAf554BcB/nhQPgXw1YcJx7DpdxXjgAeYAW3899xS2yeRYrMpEZZt4+7HTXCwA2Ht7EPZ1MhEw8qK17JAAuFkRsWc/EfZMHJA9wsCZowlVt3SOFQAqBFAL29wVsxa+J+/blgLfsoSvdqmGS3VQTI9E0tY0j1cAhtapdeVP0Gak2WLCoHfYMcuU1agh8gVMtsUr9ihPRWRMA7BpVn+kFV+9hTNW52xIrBBFfxwF2cSzW/0HN17PO0QppSPcobrBtdoWlK2FE5QkUrdZZmvPd5dOmSXaOtnqbpx+RyqZ4golE4+89tOWptdqSZ+yzsm6ifkkQvCA2EFq4dMky53U6x2X8AVUFecFR9ZtDAAAAAElFTkSuQmCC' );
        }
        if( ! get_option( 'war_sdy_pl_design_pp_img_data_pause_normal' ) )
        {
            update_option( 'war_sdy_pl_design_pp_img_data_pause_normal', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC1klEQVR4Xu1bPW8TQRB9p6RAGAkXEUpB4VAbYapQgEgIbRB0BIrwD9ySkBKFEn5C0gAdEdTkQgWRkEDCBQ0hEhR8uCBSLAUJtMwsvnhvbUKk+5B891Y627rsbe69m52dmb0XoK+FU3KqKYd+V/v/PrRn3sqdr8ixCkz/iFAEPTihgn3SBT60KA9x4wr+mpCwoX27BFjwoRwNO8ClcYPL44cYa4i6fNgFnn4Cvv+MHrqSsBYRoKYxj6MjBvfOAqeOOZYxRCD/d6udXwb33wObbcWnljAhP0J96m/stcsNg9PVYoKPyFESbgvc7Y7iXFUCHsiPJibHDJbqxQYfkfCybbDcslYgH+viDIKLuF4zuFkrBwFKxKz1geoEuwSUwfxdH0ECaAGcAvQBdIJcBbgMMg5gIJR1JLglaehmuxeDVUaBKycH523vJEFr7dcqgBNHgJmM0vJcIkEF33zdD/bcGHCnHj+v4Be1aOO1uRpwQ460Wy4EPNwGHslhm/m76kbt2VQc0t2WYylOX7WYx+fThp9TMhQjwCPBJ2BBcvTWzmCgft806MjfAkhAfBrQAjwfwClAH0AnyFWAyyDjAAZCAxlgJOjFDAyFU2CAucCGZTHbkhizQbcewGyQ2WCsKsR0mOlwfC1jPYD1ANYDWA8ofj3A8XsHbow4/SojsjFyIYXg3xsil1xAt8YWxbl1fsf/+6RsjS2VYWtMYX/dA55/6RGgG57/eg9ZCXvlbKQe1DepTeRiAUlvMsvrSUAe6XCWTzDp2LQAWkAOFaGkZprl9ZwCnAKcAtlXhbOcw0nH7vMB5ZXMdEVT9apI5hrl0Azti6bMTjllcwvyQubH3Ug2p5MpXJGPeVRGRU4mMsJSCCeNvIwQRDI5lc4aWRiDM9a3zBRVOvsZ+LYXTfNp1Q974mmzZjWEhW72yV/1xNMuYiufvyUWIZ2C48XhwrwQPPKAVULfk8//AR2ra68M7XpZAAAAAElFTkSuQmCC' );
        }
        if( ! get_option( 'war_sdy_pl_design_pp_img_data_pause_hover' ) )
        {
            update_option( 'war_sdy_pl_design_pp_img_data_pause_hover', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADDUlEQVR4Xu1bPVATQRh9AUKC6GirjVgorTPYS2rxp1UaLDR2ilpLYu2MttBoha2gth72MkPpTyGVtQzRoIGs70tycbPJDGZm70zuvp2EyS2by7633+59vxl0tWCKXVf5vtb9v6Hu2eLs14DCho0i0wkpWOJ1aahhHj55IeAmidiWoRYBwXNeL0jnWYyYWWQxjREcs4ccfvOBHPERB/iMOt6iFuL9zokW+NpqdQSy6rL6eIS8uYKsIxkDiavvSX1D3TxAFV9QF3yyJQr80NjzX5MOPmRrF8bMoYIfTekvCwH3+OGpiP1LTCZy5V1RWUfNPMaeYN3mn3c8FDIXbyFnihhPBQEiBQVUGljbBDzBBA++sVQQIMAvYLchGG0ClnHEzGBUCej7aB3SL6gE6BbQM0APQX0K6GNQ9YDoFSGqnTRFD9rawlH+5DRGe2oP7tiTNMdP8R1Fi0UPEEDz+AmaoR0Y7iOHGxjv6PtEku7QVJXv2G0JeVymb8J3i4WAFfzGCn71nPsHulrsVsIe3qDWNVYkYB2TvvHHYwt0EyCr2zQ3XAKKlJRNa6vYiN2xPtj4TxKgBKgE6BbQM0APQX0K6GNQ9QBVhFQTVFXYMYbUFlBjSK1BNYfVH6AOkb/OU/UIWQyoS8zRGdQn6IEBdYrGkR+gbvE+AiOSwPge+/8URPGwA+IJjIhiI0aO25iMBSZldXS/ZlSozOiQ2+YYFisxPOa7xXIGyKQ3uKoCrtKK+Z0j+NuMC/bKQZZxdnhsBmO4TgKiyFeOjQDfK+frfkpAHE8BX6sVxX1UAlQCNE+wsbM0WTqsF9BscU2XT3m9wCJLZuZTUjIjh5+lBwTPeH33ErKmjHwqKkZon5iHqBKr2ZGqsVkSEAgrzMczzMtLPAlFVM0m9gXnWgtss3KMlppZxoRYX4klgQmZhhZniO9MWDk6RXFgJWXmOHN5WV2ZAyvIEkUEnS1mleZ2a+VF4KV++IVdO3yeJLwiCaejMD4G7J6LBC9nn1sZHZxgHytJzULyiDA7xMStLvialePS/gDb+WifhuClyQAAAABJRU5ErkJggg==' );
        }

        $this->design_pp->activate();
        $this->design_pl->activate();
        $this->initResponsive();
	}
	
	public function deactivate() 
	{
	}

    public function initResponsive()
    {
        add_option( 'war_sdy_pl_responsive_mode', $this->responsive_mode );
        add_option( 'war_sdy_pl_responsive_scale_reference_window_width', $this->responsive_scale_reference_window_width );

        $table_rows = array(
            array(
                'comment'           => 'Low Res. Mobile',
                'window_width_min'  => '',
                'window_width_max'  => 400,
                'button_size'       => 20,
                'offset_x'          => 20,
                'offset_y'          => 20
            ),
            array(
                'comment'           => 'Medium Res. Mobile',
                'window_width_min'  => 401,
                'window_width_max'  => 800,
                'button_size'       => 25,
                'offset_x'          => 25,
                'offset_y'          => 25
            ),
            array(
                'comment'           => 'High Res. Mobile',
                'window_width_min'  => 801,
                'window_width_max'  => 1200,
                'button_size'       => 30,
                'offset_x'          => 30,
                'offset_y'          => 30
            ),
            array(
                'comment'           => 'Low Res. Screen',
                'window_width_min'  => 1201,
                'window_width_max'  => 1600,
                'button_size'       => 35,
                'offset_x'          => 35,
                'offset_y'          => 35
            ),
            array(
                'comment'           => 'Medium Res. Screen',
                'window_width_min'  => 1601,
                'window_width_max'  => 2000,
                'button_size'       => 40,
                'offset_x'          => 40,
                'offset_y'          => 40
            ),
            array(
                'comment'           => 'High Res. Screen',
                'window_width_min'  => 2001,
                'window_width_max'  => '',
                'button_size'       => 50,
                'offset_x'          => 50,
                'offset_y'          => 50
            )
        );

        for( $i = 0; $i < count( $table_rows ); $i++ )
        {
            $index = $i + 1;
            $row = $table_rows[ $i ];

            add_option( 'war_sdy_pl_responsive_comment_'          . $index, $row[ 'comment' ] );
            add_option( 'war_sdy_pl_responsive_window_width_min_' . $index, $row[ 'window_width_min' ] );
            add_option( 'war_sdy_pl_responsive_window_width_max_' . $index, $row[ 'window_width_max' ] );
            add_option( 'war_sdy_pl_responsive_button_size_'      . $index, $row[ 'button_size' ] );
            add_option( 'war_sdy_pl_responsive_offset_x_'         . $index, $row[ 'offset_x' ] );
            add_option( 'war_sdy_pl_responsive_offset_y_'         . $index, $row[ 'offset_y' ] );
        }
    }

	public function add_plugin_settings_menu() 
	{
		$html_page_title = 'Soundy Audio Playlist';
		$settings_entry_name = $html_page_title;
		add_options_page( $html_page_title, $settings_entry_name, 'manage_options', 'sdy_pl', array( $this, 'create_plugin_settings_page' ) ); 
	}
	
	public function create_plugin_settings_page() 
	{ 
		if( ! current_user_can( 'manage_options' ) ) 
		{ 
			wp_die( __('You do not have sufficient permissions to access this page.' ) );
	    }

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

        include( sprintf( "%s/templates/settings.php", dirname( __FILE__ ) ) );
	}
	
	public function get_media_item_args( $args )
	{
		// to get 'Insert into Post' Button in Upload Dialog:
		$args[ 'send' ] = true;
		return $args;
	}
	
	public function admin_scripts( $hook )
	{
		wp_register_script( 'sdy_pl-jquery-form', $this->plugin_url . '/js/jquery.form.js' );
		wp_register_script( 'sdy_pl-back-end', $this->plugin_url . '/js/back-end.js', array( 'jquery', 'media-upload', 'thickbox' ) );
        wp_register_script( 'sdy_pl-back-end-columns', $this->plugin_url . '/js/back-end-columns.js', array( 'jquery' ) );

		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui-widget' );
		wp_enqueue_script( 'jquery-ui-mouse' );
		wp_enqueue_script( 'jquery-ui-tabs' );
		wp_enqueue_script( 'jquery-ui-slider' );
		wp_enqueue_script( 'jquery-ui-sortable' );
		wp_enqueue_script( 'jquery-effects-core' );
		
		wp_enqueue_script( 'sdy_pl-jquery-form' );
		wp_enqueue_script( 'sdy_pl-back-end' );
        wp_enqueue_script( 'sdy_pl-back-end-columns' );
		wp_enqueue_script( 'thickbox' );
		wp_enqueue_script( 'button-upload' );
		
		wp_register_style( 'jquery-ui', $this->plugin_url . '/css/jquery-ui-1.10.4/jquery-ui.css' );
		wp_register_style( 'sdy_pl', $this->plugin_url . '/css/style-back-end.css' );
		if( $this->check_user_agent( 'firefox' ) )
		{
			wp_register_style( 'sdy_pl_firefox', $this->plugin_url . '/css/style-back-end-firefox.css' );
		}

        $playlist_css_file = get_option( 'war_sdy_pl_playlist_css_file_url' );
        wp_register_style( 'sdy_pl_playlist', $playlist_css_file );

		wp_enqueue_style( 'sdy_pl' );
		wp_enqueue_style( 'sdy_pl_firefox' );
        wp_enqueue_style( 'sdy_pl_playlist' );

        wp_enqueue_style( 'jquery-ui' );
		wp_enqueue_style( 'thickbox' );
	}
		
	public function add_settings_link_to_plugins_page_sdy_pl_entry( $links ) 
	{ 
		$settings_link = '<a href="options-general.php?page=sdy_pl">Settings</a>'; 
		array_unshift( $links, $settings_link ); 
		return $links; 
	}
	
	public function add_pro_buy_link_to_plugins_page_sdy_pl_entry( $links, $file ) 
	{
		$plugin_name = plugin_basename( __FILE__ );
		
		if ( strpos( $file, $plugin_name ) !== false ) 
		{
            $link_title = 'Upgrade to Soundy Audio Playlist PRO';
            $pro_link = '<a href="' . $this->sdy_pl_pro_home_url . '" target="_blank" class="war_sdy_pl_hit_link">' . $link_title . '</a>';
			$link = array_shift( $links );
            array_shift( $links );
            array_unshift( $links, 'By <a href="http://webartisan.ch" target="_blank">WebArtisan.ch</a>' );
			array_unshift( $links, $pro_link );
			array_unshift( $links, $link );

            $free_wp_link_title = 'WordPress.org Plugin Page';
            $free_wp_link = '<a href="' . $this->sdy_pl_free_home_wp_url . '" target="_blank">' . $free_wp_link_title . '</a>';
            array_push( $links, $free_wp_link );
		}
		
		return $links;
	}
	
	public function get_audio_type_from_URL( $url )
	{
		$file_extension = pathinfo( $url, PATHINFO_EXTENSION );
		$audio_type = '';
	
		switch( $file_extension )
		{
			case 'mp3':
			case 'mpg':
			case 'mpeg':
				$audio_type = 'mpeg';
				break;
			case 'ogg':
				$audio_type = 'ogg';
				break;
			case 'wav':
			case 'wave':
				$audio_type = 'wav';
				break;
		}
		
		return $audio_type;
	}

	public function do_settings_section( $page_id, $section_id )
	{
		global $wp_settings_sections, $wp_settings_fields;

		if ( ! isset( $wp_settings_fields ) ||
				 ! isset( $wp_settings_fields[ $page_id ] ) ||
				 ! isset( $wp_settings_fields[ $page_id ][ $section_id ] ) ) 
			return;
		
		$section = $wp_settings_sections[ $page_id ][ $section_id ];
		if ( $section[ 'title' ] )
		echo "<h3>{$section[ 'title' ]}</h3>\n";

		if ( $section[ 'callback' ] )
			call_user_func( $section[ 'callback' ], $section );

		echo '<table class="form-table">';
		do_settings_fields( $page_id, $section_id );
		echo '</table>';
	}

	public function register_settings()
	{    
		$this->add_settings_section_playlist();
        $this->add_settings_section_columns();
        $this->design_pl->add_settings_section();
		$this->add_settings_section_playlist_css();
        $this->add_settings_section_play_pause_button();
        $this->design_pp->add_settings_section();
		$this->add_settings_section_play_pause_position_corner();
        $this->add_settings_section_play_pause_responsive();
		$this->add_settings_section_play_pause_position_static();
	}

	public function add_settings_section_playlist()
	{
		add_settings_section(
		'war_sdy_pl_settings_section_playlist',
		'Playlist',
		array( $this, 'display_settings_section_playlist_header' ),
		'sdy_pl'
		);
		
		register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_title', array( $this, 'do_sanitize_field' ) );
		add_settings_field(
		'war_sdy_pl_playlist_title',
		'Playlist Title',
		array( $this, 'add_settings_field_playlist_title' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_playlist'
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_soundtracks', array( $this, 'do_sanitize_field_no_hmtl_encode' ) );
		add_settings_field(
		'war_sdy_pl_soundtracks',
		'Soundtracks',
		array( $this, 'add_settings_field_soundtracks' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_playlist'
				);
		
		add_settings_field(
		'war_sdy_pl_audio_file_url',
		'Selected Soundtrack',
		array( $this, 'add_settings_field_audio_file_URL' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_playlist'
		);
	}

    public function add_settings_section_playlist_css()
    {
        add_settings_section
        (
            'war_sdy_pl_settings_section_playlist_css',
            'Playlist CSS',
            array( $this, 'display_settings_section_playlist_css_header' ),
            'sdy_pl'
        );

        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_css_file_url' );
        add_settings_field
        (
            'war_sdy_pl_playlist_css_file_url',
            'CSS File URL',
            array( $this, 'add_settings_field_playlist_css_file_url' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_playlist_css'
        );

        register_setting( 'war_sdy_pl', 'war_sdy_pl_playlist_css_use_only' );
        add_settings_field
        (
            'war_sdy_pl_playlist_css_use_only',
            'CSS Mode',
            array( $this, 'add_settings_field_playlist_css_use_only' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_playlist_css'
        );
    }

    public function add_settings_field_playlist_css_file_url( $args )
    {
        $css_file_url = get_option( 'war_sdy_pl_playlist_css_file_url' );
        ?>
            <input id="war_sdy_pl_playlist_css_file_url"
                   name="war_sdy_pl_playlist_css_file_url"
                   type="text"
                   value="<?php echo $css_file_url; ?>"
                   class="war_sdy_pl_txt_input" />
            <br>
            <span class="war_comment">
                Do not modify <?php echo $this->playlist_css_file_url; ?>.
                <br>
                Instead, copy this file to another location outside Soundy's directory and specify the URL of this location in the field above.
                <br>
                You can then customize and modify this CSS file copy.
            </span>
        <?php
    }

    public function add_settings_field_playlist_css_use_only( $args )
    {
        $css_use_only = get_option( 'war_sdy_pl_playlist_css_use_only' );
        ?>
            <input type="radio"
                   id="war_sdy_pl_playlist_css_use_only_yes"
                   name="war_sdy_pl_playlist_css_use_only"
                   value="yes"
                   style="margin: 5px 0 5px 0;" <?php echo ( $css_use_only == 'yes' ? 'checked' : '' ); ?>/>
            <label for="war_sdy_pl_playlist_css_use_only_yes"
                   style="margin-top: 0;">Use CSS Only</label>
            <br>
            <input type="radio"
                   id="war_sdy_pl_playlist_css_use_only_no"
                   name="war_sdy_pl_playlist_css_use_only"
                   value="no"
                   style="margin: 5px 0 5px 0;" <?php echo ( $css_use_only == 'no' ? 'checked' : '' ); ?>/>
            <label for="war_sdy_pl_playlist_css_use_only_no"
                   style="margin-top: 0;">Use CSS and Playlist Designer</label>
        <?php
    }

    public function add_settings_section_columns()
    {
        add_settings_section
        (
            'war_sdy_pl_settings_section_columns',
            'Display',
            array( $this, 'display_settings_section_columns_header' ),
            'sdy_pl'
        );

        register_setting( 'war_sdy_pl', 'war_sdy_pl_column_ordered_names' );
        add_settings_field
        (
            'war_sdy_pl_column_ordered_names',
            '<div style="padding-top: 12px;">Column Order</div>',
            array( $this, 'add_settings_field_column_order' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_columns'
        );

        foreach( $this->playlist_column_names_titles as $name => $title )
        {
            $this->register_setting_column( $name );
        }
        add_settings_field
        (
            'war_sdy_pl_columns_layout',
            'Column Layout',
            array( $this, 'add_settings_field_columns_layout' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_columns'
        );

        add_settings_field
        (
            'war_sdy_pl_columns_preview',
            'Preview',
            array( $this, 'add_settings_field_columns_preview' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_columns'
        );
    }

    public function register_setting_column( $column_name )
    {
        register_setting( 'war_sdy_pl', 'war_sdy_pl_column_do_display_'  . $column_name );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_column_width_value_' . $column_name );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_column_width_unit_'  . $column_name );
    }

    public function add_settings_section_play_pause_button()
	{
		add_settings_section(
    	'war_sdy_pl_settings_section_play_pause_button',
        'Play/Pause Button',
        array( $this, 'display_settings_section_play_pause_button_header' ),
        'sdy_pl'
        );
    
		register_setting( 'war_sdy_pl', 'war_sdy_pl_pp_images_to_use' ); 
        add_settings_field(
	    'war_sdy_pl_pp_images_to_use',
	    'Play/Pause Button Images',
	    array( $this, 'add_settings_field_pp_images_to_use' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button'
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_url_play_button', array( $this, 'do_sanitize_field' ) ); 
        add_settings_field(
	    'war_sdy_pl_url_play_button',
	    'Play Normal URL',
	    array( $this, 'add_settings_field_url_pp_button' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'play_button' )
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_url_play_hover', array( $this, 'do_sanitize_field' ) ); 
        add_settings_field(
	    'war_sdy_pl_url_play_hover',
	    'Play Hover URL',
	    array( $this, 'add_settings_field_url_pp_button' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'play_hover' )
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_url_pause_button', array( $this, 'do_sanitize_field' ) ); 
        add_settings_field(
	    'war_sdy_pl_url_pause_button',
	    'Pause Normal URL',
	    array( $this, 'add_settings_field_url_pp_button' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'pause_button' )
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_url_pause_hover', array( $this, 'do_sanitize_field' ) ); 
        add_settings_field(
	    'war_sdy_pl_url_pause_hover',
	    'Pause Hover URL',
	    array( $this, 'add_settings_field_url_pp_button' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'pause_hover' )
		);

        add_settings_field
        (
	    'war_sdy_pl_swap_normal_hover',
	    'Swap Normal &lt;-&gt; Hover',
	    array( $this, 'add_settings_field_swap_normal_hover' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'pause_hover' )
		);

        add_settings_field
        (
	    'war_sdy_pl_reset_default_buttons',
	    'Default Buttons',
	    array( $this, 'add_settings_field_default_buttons' ),
	    'sdy_pl',
	    'war_sdy_pl_settings_section_play_pause_button',
	    array( 'pause_hover' )
        );

        add_settings_field
        (
	    'war_sdy_pl_img_preview_here',
	    'Button Preview',
	    array( $this, 'add_settings_field_img_preview_here' ),
	    'sdy_pl',
	    'war_sdy_pl_settings_section_play_pause_button'
        );

        add_settings_field
        (
			'war_sdy_pl_preview_in_context_default',
			'Preview in Context',
			array( $this, 'add_settings_field_preview_in_context_default' ),
			'sdy_pl',                       
			'war_sdy_pl_settings_section_play_pause_button'
		);
	}
		
	public function add_settings_section_play_pause_position_corner()
	{
		add_settings_section(
    	'war_sdy_pl_settings_section_play_pause_position_corner',
        'Play/Pause Corner Position',
        array( $this, 'display_settings_section_play_pause_position_corner_header' ),
        'sdy_pl'
        );
		
		register_setting( 'war_sdy_pl', 'war_sdy_pl_pp_corner_enable' );
		add_settings_field(
		'war_sdy_pl_pp_corner_enable',
		'Corner Insertion',
		array( $this, 'add_settings_field_pp_corner_enable' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_play_pause_position_corner'
		);
		
		register_setting( 'war_sdy_pl', 'war_sdy_pl_pp_position' ); 
		register_setting( 'war_sdy_pl', 'war_sdy_pl_pp_corner' ); 
        add_settings_field(
	    'war_sdy_pl_pp_corner',
	    'Corner Position',
	    array( $this, 'add_settings_field_pp_position' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_position_corner'
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_offset_x' ); 
		register_setting( 'war_sdy_pl', 'war_sdy_pl_offset_x_unit' ); 
        add_settings_field(
	    'war_sdy_pl_offset_x',
	    'Button X Offset',
	    array( $this, 'add_settings_field_offset_x' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_position_corner'
		);

		register_setting( 'war_sdy_pl', 'war_sdy_pl_offset_y' ); 
		register_setting( 'war_sdy_pl', 'war_sdy_pl_offset_y_unit' ); 
        add_settings_field(
	    'war_sdy_pl_offset_y',
	    'Button Y Offset',
	    array( $this, 'add_settings_field_offset_y' ),
	    'sdy_pl',                       
	    'war_sdy_pl_settings_section_play_pause_position_corner'
		);

        add_settings_field(
	    'war_sdy_pl_preview_in_context_position',
	    'Preview in Context',
	    array( $this, 'add_settings_field_preview_in_context_position' ),
	    'sdy_pl',
	    'war_sdy_pl_settings_section_play_pause_position_corner'
        );
	}

    public function add_settings_section_play_pause_responsive()
    {
        add_settings_section(
            'war_sdy_pl_settings_section_play_pause_responsive',
            'Play/Pause Button Responsiveness',
            array( $this, 'display_settings_section_play_pause_responsive_header' ),
            'sdy_pl'
        );

        register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_mode' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_include_audio_player_button' );
        add_settings_field(
            'war_sdy_pl_responsive_mode',
            'Responsive Mode',
            array( $this, 'add_settings_field_responsive_mode' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_play_pause_responsive'
        );

        for( $i = 1; $i <= $this->responsive_table_number_of_rows; $i++ )
        {
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_comment_' . $i, array( $this, 'do_sanitize_field' ) );
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_window_width_min_' . $i );
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_window_width_max_' . $i );
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_button_size_' . $i );
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_offset_x_' . $i );
            register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_offset_y_' . $i );
        }
        add_settings_field(
            'war_sdy_pl_responsive_table',
            'Table Driven Mode',
            array( $this, 'add_settings_field_responsive_table' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_play_pause_responsive'
        );

        register_setting( 'war_sdy_pl', 'war_sdy_pl_responsive_scale_reference_window_width' );
        add_settings_field(
            'war_sdy_pl_responsive_scale_reference_window_width',
            'Scale Driven Mode',
            array( $this, 'add_settings_field_responsive_scale' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_play_pause_responsive'
        );

        add_settings_field(
            'war_sdy_pl_responsive_preview',
            'Preview',
            array( $this, 'add_settings_field_responsive_preview' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_play_pause_responsive'
        );
    }

    public function add_settings_section_play_pause_position_static()
	{
		add_settings_section
        (
            'war_sdy_pl_settings_section_play_pause_position_static',
            'Template Tags',
            array( $this, 'display_settings_section_play_pause_position_static_header' ),
            'sdy_pl'
        );
    
        add_settings_field
        (
            'war_sdy_pl_template_tags',
            '',
            array( $this, 'add_settings_field_template_tags' ),
            'sdy_pl',
            'war_sdy_pl_settings_section_play_pause_position_static'
		);
    }

    public function display_settings_section_playlist_header()
    {
        echo 'In this tab you can control the content of the site default playlist.<br>' .
             'To rapidly have a test playlist at disposal to experiment the plugin, click on the "Test" button and then the "Save Changes" button.' .
             '<span id="war_sdy_pl_courtesy"><br>The test playlist delivered with this plugin is the courtesy of ' .
             '<a href="http://fr.wikipedia.org/wiki/Jean-Maurice_Mourat" target="_blank">Jean-Maurice Mourat</a>.<br>' .
             'The hosting of the test soundtracks is the courtesy of <a href="http://www.kiwi6.com/" target="_blank">Kiwi6</a>.</span>';
    }

    public function display_settings_section_playlist_css_header()
    {
        echo 'In this tab you can control how CSS is used to shape playlists inserted with the <span class="war_bold">[sdy_pl playlist]</span> short code.';
    }

    public function display_settings_section_columns_header()
    {
        echo 'In this tab you can control the display of the columns of the playlists inserted in pages or posts with the <span class="war_bold">[sdy_pl playlist]</span> short code.';
    }

	public function display_settings_section_play_pause_button_header() 
	{
	   echo 'In this tab you can upload your own play/pause button images.';
	}
		
	public function display_settings_section_play_pause_position_corner_header() 
	{
	   echo 'In this tab you can position the play/pause button in any corner of the page/post window or document.';
	}

	public function display_settings_section_play_pause_position_static_header()
	{
		echo '&nbsp;&nbsp;&nbsp;&nbsp;The get version of each template tag returns the element instead of inserting it.';
	}

    public function display_settings_section_play_pause_responsive_header()
    {
        echo 'In this tab you can control the responsiveness of the Play/Pause button.';
    }

    public function add_settings_field_responsive_mode( $args )
    {
        $responsive_mode = get_option( 'war_sdy_pl_responsive_mode' );
        $responsive_mode = $responsive_mode ? $responsive_mode : 'none';
        $include_player_button = get_option( 'war_sdy_pl_responsive_include_audio_player_button' );
        $include_player_button = $include_player_button ? $include_player_button : 'no';
        ?>
        <input type="radio"
               id="war_sdy_pl_responsive_mode_none"
               name="war_sdy_pl_responsive_mode"
               value="none"
               style="margin: 5px 0 5px 0;" <?php echo ( $responsive_mode == 'none' ? 'checked' : '' ); ?>/>
        <label for="war_sdy_pl_responsive_mode_none"
               style="margin-top: 0;">No Responsiveness</label>
        <br>
        <input type="radio"
               id="war_sdy_pl_responsive_mode_table"
               name="war_sdy_pl_responsive_mode"
               value="table"
               style="margin: 5px 0 5px 0;" <?php echo ( $responsive_mode == 'table' ? 'checked' : '' ); ?>/>
        <label for="war_sdy_pl_responsive_mode_table"
               style="margin-top: 0;">Table Driven Responsive Mode</label>
        <br>
        <input type="radio"
               id="war_sdy_pl_responsive_mode_scale"
               name="war_sdy_pl_responsive_mode"
               value="scale"
               style="margin: 5px 0 5px 0;" <?php echo ( $responsive_mode == 'scale' ? 'checked' : '' ); ?>/>
        <label for="war_sdy_pl_responsive_mode_scale"
               style="margin-top: 0;">Scale Driven Responsive Mode</label>
        <div id="war_sdy_pl_responsive_include_audio_player_button_container" style="margin-top: 25px;">
            <input type="checkbox"
                   value="yes"
                   id="war_sdy_pl_responsive_include_audio_player_button"
                   name="war_sdy_pl_responsive_include_audio_player_button"
                <?php echo ( $include_player_button == 'yes' ? 'checked' : '' ); ?>/>
            Make Audio Player Play/Pause button also responsive
        </div>
        <?php
    }

    public function add_settings_field_responsive_table( $args )
    {
        $responsive_mode = get_option( 'war_sdy_pl_responsive_table' );
        $responsive_mode = $responsive_mode ? $responsive_mode : 'none';
        ?>
        <span class="war_comment">You can define window width ranges with corresponding button width/height and offsets.<br>
            Button X and Y Offset Fields are used only for Play/Pause button positioned in a corner.<br>
            Button Width/Height Field is used for all Play/Pause buttons.</span>
        <ul class="war_sdy_pl_responsive_list">
            <li class="war_sdy_pl_responsive_list_row_header">
                <div class="war_sdy_pl_responsive_comment">Comment</div>
                <div class="war_sdy_pl_responsive_list_field">From<br>Window<br>Width</div>
                <div class="war_sdy_pl_responsive_list_field">To<br>Window<br>Width</div>
                <div class="war_sdy_pl_responsive_list_field">Button<br>Width/<br>Height</div>
                <div class="war_sdy_pl_responsive_list_field">Button<br>X<br>Offset</div>
                <div class="war_sdy_pl_responsive_list_field">Button<br>Y<br>Offset</div>
            </li>
        </ul>
        <ul id="war_sdy_pl_responsive_list"
            class="war_sdy_pl_responsive_list">
            <?php
            for( $i = 1; $i <= $this->responsive_table_number_of_rows; $i++ )
            {
                ?>
                <li>
                    <div class="war_sdy_pl_responsive_comment">
                        <input type="text"
                               name="war_sdy_pl_responsive_comment_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_comment_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_comment_' . $i ); ?>"
                               size="20" />
                    </div>
                    <div class="war_sdy_pl_responsive_list_field">
                        <input type="text"
                               class="war_sdy_pl_responsive_input_field_integer"
                               name="war_sdy_pl_responsive_window_width_min_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_window_width_min_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_window_width_min_' . $i ); ?>"
                               size="4" /> px
                    </div>
                    <div class="war_sdy_pl_responsive_list_field">
                        <input type="text"
                               class="war_sdy_pl_responsive_input_field_integer"
                               name="war_sdy_pl_responsive_window_width_max_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_window_width_max_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_window_width_max_' . $i ); ?>"
                               size="4" /> px
                    </div>
                    <div class="war_sdy_pl_responsive_list_field">
                        <input type="text"
                               class="war_sdy_pl_responsive_input_field_integer"
                               name="war_sdy_pl_responsive_button_size_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_button_size_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_button_size_' . $i ); ?>"
                               size="4" /> px
                    </div>
                    <div class="war_sdy_pl_responsive_list_field">
                        <input type="text"
                               class="war_sdy_pl_responsive_input_field_integer"
                               name="war_sdy_pl_responsive_offset_x_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_offset_x_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_offset_x_' . $i ); ?>"
                               size="4" /> px
                    </div>
                    <div class="war_sdy_pl_responsive_list_field">
                        <input type="text"
                               class="war_sdy_pl_responsive_input_field_integer"
                               name="war_sdy_pl_responsive_offset_y_<?php echo $i; ?>"
                               id="war_sdy_pl_responsive_offset_y_<?php echo $i; ?>"
                               value="<?php echo get_option( 'war_sdy_pl_responsive_offset_y_' . $i ); ?>"
                               size="4" /> px
                    </div>
                </li>
                <?php
            }
            ?>
        </ul>
        <ul class="war_sdy_pl_responsive_list">
            <li class="war_sdy_pl_responsive_list_row_footer">
                    <span style="font-size: 1em;">
                        <span id="war_comment" style="margin-left: 1%;">You can change the order of the rows with drag & drop.</span>
                    </span>
            </li>
        </ul>
        <?php
    }

    public function add_settings_field_responsive_scale( $args )
    {
        ?>
        <div class="war_comment" style="margin-bottom: 6px;">Play/Pause button width, height and offsets are scaled according to window width.<br>
            The Reference Window Width is the window width for which the scale factor is 1.</div>
        <div style="font-weight: bold;">Reference Window Width:</div>
        <input id="war_sdy_pl_responsive_scale_reference_window_width"
               name="war_sdy_pl_responsive_scale_reference_window_width"
               class="war_sdy_pl_responsive_input_field_integer"
               value="<?php echo get_option( 'war_sdy_pl_responsive_scale_reference_window_width' ); ?>"
               size="4"
               style="margin-top: 3px; margin-bottom: 3px;" /> px<br>
        <button id="war_sdy_pl_responsive_scale_button_current_window_width"
                type="button"
                class="war_sdy_pl"
                style="margin-top: 3px; margin-bottom: 3px;" />Insert Current Window Width</button>
        <?php
    }

    public function add_settings_field_responsive_preview( $args )
    {
        ?>
        <div class="war_comment" style="margin-bottom: 6px;">IMPORTANT: You must save your changes before using Preview.</div>
        <div style="font-weight: bold;">Preview Window Width:</div>
        <input id="war_sdy_pl_responsive_preview_window_width"
               class="war_sdy_pl_responsive_input_field_integer"
               value=""
               size="4"
               style="margin-top: 3px; margin-bottom: 3px;" /> px
        <div style="margin-top: 3px; margin-bottom: 3px;">
            <div style="font-weight: bold;">Page:</div>
            <select id="war_sdy_pl_responsive_preview_url"
                    class="war_sdy_pl_page_preview_url"
                    style="margin-top: 3px; margin-bottom: 3px;">
                <?php $this->add_page_preview_url_options() ?>
            </select>
        </div>
        <button id="war_sdy_pl_responsive_button_preview"
                type="button"
                class="war_sdy_pl"
                style="margin-top: 3px; margin-bottom: 3px;" />Preview</button>
        <?php
    }

    public function add_settings_field_audio_file_URL( $args )
	{
		$this->add_field_audio_file_URL( false );
	}

	public function add_field_audio_file_URL( $is_meta_box ) 
	{
		?>
        <div id="war_sdy_pl_field_container_audio_file_url"
             class="war_sdy_pl_label_field_container_full_width">
            <span class="war_sdy_pl_label">URL:</span>
		    <input  id="war_sdy_pl_audio_file_url"
		            type="text"
		            class="war_sdy_pl_txt_input" />
        </div>
		<div style="margin-top: 5px;">
			<div id="war_sdy_pl_field_container_audio_volume" 
			     class="war_sdy_pl_label_field_container">
				<span class="war_sdy_pl_label">Volume:</span>
				<div id="war_sdy_pl_audio_volume_slider"
					     class="war_sdy_pl_slider"></div>
					<input type="text"
					       class="war_sdy_pl_audio_volume"
					       id="war_sdy_pl_audio_volume" /> %
			</div>
			<div id="war_sdy_pl_field_container_media_library" 
			     class="war_sdy_pl_label_field_container">
		    <button id="war_audio_library_button" 
		            type="button" 
		            class="war_sdy_pl" />Media Library</button>
			</div>
			<div id="war_sdy_pl_field_container_audio_player" 
			     class="war_sdy_pl_label_field_container">
				<audio id="war_sdy_pl_audio_player" 
					     class="war_sdy_pl"
					     controls
						   style="margin-right: 10px;">
					<source id="war_sdy_pl_audio_player_source">
			  </audio>
			</div>
		</div>
		<div style="margin-top: 5px;">
			<div id="war_sdy_pl_field_container_audio_type"
			     class="war_sdy_pl_label_field_container">
				<span class="war_sdy_pl_label">Type:</span>
				<select id="war_sdy_pl_audio_type">
					<option value="unknown">unknown</option>
				    <option value="audio/mpeg">audio/mpeg</option>
					<option value="audio/ogg">audio/ogg</option>
					<option value="audio/wav">audio/wav</option>
				</select>
			</div>
			<div class="war_sdy_pl_label_field_container">
				<span class="war_sdy_pl_label">Time:</span>
				<input type="text"
							 class="war_sdy_pl_txt_input"
							 readonly
							 title="Soundtrack duration (read-only)"
							 style="width: 60px;"
				       id="war_sdy_pl_audio_time" />
			</div>
			<div class="war_sdy_pl_label_field_container">
				<span class="war_sdy_pl_label">ID:</span>
				<input type="text"
							 class="war_sdy_pl_txt_input"
							 readonly
							 title="Soundtrack ID (read-only)"
							 style="width: 80px;"
				       id="war_sdy_pl_audio_id" />
			</div>
		</div>
		<div style="margin-top: 5px;">
			<div class="war_sdy_pl_label_field_container_full_width">
				<div class="war_sdy_pl_label">Title:</div>
				<input  type="text"
				        class="war_sdy_pl_txt_input"
					    id="war_sdy_pl_audio_title" />
			</div>
			<div class="war_sdy_pl_label_field_container_full_width">
				<div   class="war_sdy_pl_label">Artist:</div>
				<input  type="text"
					    class="war_sdy_pl_txt_input"
				        id="war_sdy_pl_audio_artist" />
			</div>
			<div class="war_sdy_pl_label_field_container_full_width">
				<div class="war_sdy_pl_label">Composer:</div>
				<input  type="text"
					    class="war_sdy_pl_txt_input"
				        id="war_sdy_pl_audio_composer" />
			</div>
			<br>
			<button id="war_button_soundtrack_clear_fields" 
         	    type="button" 
            	title="Clear all selected soundtrack fields"
            	class="war_sdy_pl_soundtrack_button" />Clear</button>
		</div>
		<?php
	}

	public function add_settings_field_playlist_title( $args )
	{
        $playlist_title = $this->html_entity_decode( get_option( 'war_sdy_pl_playlist_title' ) );
        $playlist_title_default = $this->html_entity_decode( get_option( 'war_sdy_pl_playlist_title_default' ) );
		?>
            <script>
                jQuery( document ).ready
                (
                    function()
                    {
                        var jquery_tr = jQuery( '#war_sdy_pl_playlist_title' ).parent().parent();
                        var th = jquery_tr.children().filter( 'th' );
                        th.css( 'width', '12%' );
                    }
                );
            </script>
            <input id="war_sdy_pl_playlist_title"
                   name="war_sdy_pl_playlist_title"
                   type="text"
                   value="<?php echo $playlist_title; ?>"
                   class="war_sdy_pl_txt_input" /><span id="war_sdy_pl_playlist_title_default" style="display: none;"><?php echo $playlist_title_default; ?></span>
	    <?php
	}

    public function add_settings_field_column_order( $args )
    {
        ?>
            <script>
                jQuery( document ).ready
                (
                    function()
                    {
                        var jquery_tr = jQuery( '#war_sdy_pl_column_ordered_names' ).parent().parent();
                        var th = jquery_tr.children().filter( 'th' );
                        th.css( 'width', '12%' );
                    }
                );
            </script>
        <?php

        $this->add_field_columns_order( 'default', 'settings' );
    }

    public function add_settings_field_columns_layout( $args )
    {
        $this->add_field_columns_layout( 'default', 'settings' );
    }

    public function add_settings_field_columns_preview( $args )
    {
        sdy_pl_playlist( 'settings', 'columns' );
    }

	public function add_settings_field_soundtracks( $args ) 
	{
		$soundtracks         = str_replace( 'war_soundtrack' , 'war_back_end_soundtrack', html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' ) );
		$soundtracks_default = str_replace( 'war_soundtrack' , 'war_back_end_soundtrack', get_option( 'war_sdy_pl_default_soundtracks' ) );
		$this->add_field_soundtracks( false, $soundtracks, $soundtracks_default );
		$this->add_field_soundtrack_buttons( false, null );
	}
	
	public function add_field_soundtracks( $is_meta_box, $soundtracks, $soundtracks_default ) 
	{
		?>
            <div>
                <input id="war_sdy_pl_soundtracks"
                       name="war_sdy_pl_soundtracks"
                       type="hidden">
                <ul class="war_sdy_pl_back_end_playlist">
                    <li class="war_back_end_soundtrack_row_header"><div class="war_back_end_soundtrack_index">#</div><div class="war_back_end_soundtrack_title">Title</div><div class="war_back_end_soundtrack_artist">Artist</div><div class="war_back_end_soundtrack_composer">Composer</div><div class="war_back_end_soundtrack_time">Time</div><div class="war_back_end_soundtrack_id">ID</div></li>
                </ul>
                <ul id="war_sdy_pl_back_end_playlist"
                    class="war_sdy_pl_back_end_playlist">
                    <?php echo $soundtracks == 'default' ? $soundtracks_default : $soundtracks; ?>
                </ul>
                <ul class="war_sdy_pl_back_end_playlist">
                    <li class="war_back_end_soundtrack_row_footer">
                        <span style="font-size: 1em;">
                            <span style="margin-right: 1%;"><span id="war_sdy_pl_number_of_tracks"></span> tracks</span>
                            •
                            <span id="war_sdy_pl_playlist_comment" style="margin-left: 1%;"></span>
                        </span>
                    </li>
                </ul>
                <ul id="war_sdy_pl_soundtracks_default"       style="display: none;"><?php echo $soundtracks_default; ?></ul>
                <ul id="war_sdy_pl_soundtracks_custom"        style="display: none;"></ul>
                <ul id="war_sdy_pl_soundtracks_backups"       style="display: none;"></ul>
                <ul id="war_sdy_pl_soundtracks_import_output" style="display: none;"></ul>
            </div>
        <?php
	}
			
	public function add_field_soundtrack_buttons( $is_meta_box, $yellow_select_id ) 
	{
	?>
        <div style="width: <?php echo $is_meta_box ? 85 : 95; ?>%; margin: 28px auto 0 auto; text-align: left;">
                <div id="war_sdy_pl_button_container_add"
                     class="war_sdy_pl_soundtrack_button_container">
                <button id="war_button_soundtrack_add"
                        type="button"
                        title="Add soundtrack fields below to new soundtrack above"
                        class="war_sdy_pl_soundtrack_button" />Add</button>
                </div>
                <div id="war_sdy_pl_button_container_modify"
                     class="war_sdy_pl_soundtrack_button_container">
                    <button id="war_button_soundtrack_modify"
                        type="button"
                        title="Modify selected soundtrack above with soundtrack fields below"
                        class="war_sdy_pl_soundtrack_button" />Modify</button>
                </div>
                <div id="war_sdy_pl_button_container_delete"
                     class="war_sdy_pl_soundtrack_button_container">
                <button id="war_button_soundtrack_delete"
                        type="button"
                        title="Delete selected soundtrack above"
                        class="war_sdy_pl_soundtrack_button" />Delete</button>
                </div>
                <div id="war_sdy_pl_button_container_clear_all"
                     class="war_sdy_pl_soundtrack_button_container">
                <button id="war_button_soundtrack_clear_all"
                        type="button"
                        title="Delete all soundtracks above"
                        class="war_sdy_pl_soundtrack_button" />Clear</button>
                </div>
                <div id="war_sdy_pl_button_container_import"
                     class="war_sdy_pl_soundtrack_button_container">
                <button id="war_sdy_pl_soundtracks_import_button"
                        type="button"
                        title="Import all MP3, OGG and WAV audio files from the WP media library"
                        class="war_sdy_pl_soundtrack_button" />Import</button>
                    <span id="war_sdy_pl_soundtracks_import_spinner" style="color: #2eaecc;"></span>
                </div>
            <?php if( $is_meta_box ): ?>
                <div class="war_sdy_pl_soundtrack_button_container">
                    <button id="war_button_soundtrack_yellow_select"
                            type="button"
                            title="Yellow select blue selected soundtrack (used by play mode)"
                            class="war_sdy_pl_soundtrack_button" />Select</button>
                  <input id="war_sdy_pl_yellow_select_id"
                         name="war_sdy_pl_yellow_select_id"
                         type="hidden"
                         value="<?php echo $yellow_select_id; ?>">
                  </div>
                    <div class="war_sdy_pl_soundtrack_button_container">
                    <button id="war_button_soundtrack_yellow_unselect"
                            type="button"
                            title="Unselect yellow selected soundtrack"
                            class="war_sdy_pl_soundtrack_button" />Unselect</button>
                </div>
            <?php else: ?>
                <div class="war_sdy_pl_soundtrack_button_container">
                    <button id="war_button_soundtrack_default"
                            type="button"
                            title="Replace current playlist with Soundy test playlist"
                            class="war_sdy_pl_soundtrack_button" />Test</button>
                </div>
            <?php endif; ?>
            <div id="war_sdy_pl_button_container_undo"
                     class="war_sdy_pl_soundtrack_button_container">
                    <button id="war_button_soundtrack_undo"
                        type="button"
                        title="Undo last playlist modification"
                        class="war_sdy_pl_soundtrack_button war_button_inactive" />Undo</button>
            </div>
        </div>
    <?php     
	}
	
	public function add_settings_field_pp_images_to_use( $args )
	{
		$pp_images_to_use = get_option( 'war_sdy_pl_pp_images_to_use' );
		?>
            <input type="radio"
                         id="war_sdy_pl_pp_images_to_use_default"
                         name="war_sdy_pl_pp_images_to_use"
                         value="default"
                         style="margin: 5px 0 5px 0;" <?php echo ( $pp_images_to_use == 'default' ? 'checked' : '' ); ?>/>
            <label for="war_sdy_pl_pp_images_to_use_default"
                   style="margin-top: 0;">Use button images defined in this Play/Pause Button tab</label>
            <br>
            <input type="radio"
                         id="war_sdy_pl_pp_images_to_use_designer"
                         name="war_sdy_pl_pp_images_to_use"
                         value="designer"
                         style="margin: 5px 0 5px 0;" <?php echo ( $pp_images_to_use == 'designer' ? 'checked' : '' ); ?>/>
            <label for="war_sdy_pl_pp_images_to_use_designer"
                   style="margin-top: 0;">Use button images defined in the Play/Pause Designer tab</label>
		<?php     
	}
	
	public function add_settings_field_url_pp_button( $args )
	{
		$type = $args[ 0 ];
		?>
            <input id="war_sdy_pl_url_<?php echo $type; ?>"
                   name="war_sdy_pl_url_<?php echo $type; ?>"
                   type="text"
                   class="war_sdy_pl_txt_input"
                   value="<?php echo get_option( "war_sdy_pl_url_$type" ); ?>" />
            <div style="margin-top: 5px;">
            <button id="img_<?php echo $type; ?>_library_button"
                    type="button"
                    value="Media Library"
                    class="war_sdy_pl_button_media_library_pp_button" />Media Library</button>
            <img id="war_sdy_pl_url_<?php echo $type; ?>_img"
                 src="<?php echo get_option( "war_sdy_pl_url_$type" ); ?>"
                 class="war_sdy_pl" >
            </div>
        <?php
	}

	public function add_settings_field_swap_normal_hover( $args )
	{
		?>
		<button id="war_sdy_pl_button_swap_normal_hover"
		        type="button"
						class="war_sdy_pl">Swap</button>
		<?php
	}
	
	public function add_settings_field_default_buttons( $args )
	{
		?>
    <button id="button_default_buttons_24" 
            type="button" 
            value="24x24"
            class="war_sdy_pl"
            style="margin-right: 10px;" />24x24</button>
    <button id="button_default_buttons_32" 
            type="button" 
            value="32x32"
            class="war_sdy_pl"
            style="margin-right: 10px;" />32x32</button>
    <button id="button_default_buttons_48" 
            type="button" 
            value="48x48"
            class="war_sdy_pl"
            style="margin-right: 10px;" />48x48</button>
    <button id="button_default_buttons_64" 
            type="button" 
            value="64x64"
            class="war_sdy_pl"
            style="margin-right: 10px;" />64x64</button>
		<?php     
	}

	public function add_settings_field_img_preview_here( $args )
	{
		?>
		<img id="war_sdy_pl_img_preview_here">
		<?php     
	}

	public function add_settings_field_preview_in_context_default( $args )
	{
		?>
			<span id="war_sdy_pl_page_preview_label"
			      class="war_sdy_pl_page_preview_label">Page:</span>
			<select id="war_sdy_pl_page_preview_url_default"
			        class="war_sdy_pl_page_preview_url">
			 	<?php $this->add_page_preview_url_options() ?>
			</select>
			<br>
			<button id="war_sdy_pl_button_preview_in_context_default"
				      type="button"
					    style="margin-top: 8px;"
				      class="war_sdy_pl">Preview</button>
			<?php     
		}

		public function add_settings_field_preview_in_context_position( $args )
		{
			?>
				<span id="war_sdy_pl_page_preview_label"
			  	    class="war_sdy_pl_page_preview_label">Page:</span>
				<select id="war_sdy_pl_page_preview_url_position"
			        	class="war_sdy_pl_page_preview_url">
				<?php $this->add_page_preview_url_options() ?>
				</select>
				<br>
				<button id="war_sdy_pl_button_preview_in_context_position"
					      type="button"
					      style="margin-top: 8px;"
				        class="war_sdy_pl">Preview</button>
				<?php     
			}

	public function add_page_preview_url_options()
	{
		echo '<option value="/">Select Page</option>';
		$page_preview_url = get_option( 'war_sdy_pl_page_preview_url' );
		$pages = get_pages();
		foreach( $pages as $page )
		{
			$page_link = get_page_link( $page->ID );
			$option = '<option value="' . $page_link . '"';
			if( $page_link == $page_preview_url )
			{
				$option .= ' selected>';
			}
			else
			{
				$option .= '>';
			}
			$option .= $page->post_title;
			$option .= '</option>';
			echo $option;
		}
	}

	public function add_settings_field_pp_corner_enable( $args )
	{
		$pp_corner_enable = get_option( 'war_sdy_pl_pp_corner_enable' );
		?>
			<input type="radio" 
						 id="war_sdy_pl_pp_corner_enable_yes" 
						 name="war_sdy_pl_pp_corner_enable" 
						 value="yes" <?php echo ( $pp_corner_enable == 'yes' ? 'checked' : '' ); ?>/>
			<label for="war_sdy_pl_pp_corner_enable_yes" style="margin-right: 1em;">Yes</label>
			
			<input type="radio" 
						 id="war_sdy_pl_pp_corner_enable_no" 
						 name="war_sdy_pl_pp_corner_enable" 
						 value="no" <?php echo ( $pp_corner_enable == 'no' ? 'checked' : '' ); ?>/>
			<label for="war_sdy_pl_pp_corner_enable_no" style="margin-right: 1em;">No</label>
            <span id="war_sdy_pl_pp_corner_enable_comment"
                  class="war_comment"></span>
		<?php	
	}
	
	public function add_settings_field_pp_position( $args )
	{
		$pp_position = get_option( 'war_sdy_pl_pp_position' );
		$pp_corner   = get_option( 'war_sdy_pl_pp_corner' );
		
		$pp_comment = $pp_position == 'document' ? 
									'(absolute positioning: button will scroll with page content)' : 
									'(fixed positioning: button will NOT scroll with page content)';
		
		$positions = array( 
												 'document'  => 'Document',
												 'window'    => 'Window'
											);
		$options_position = '';
		foreach( $positions as $position_id => $position_desc )
		{
   		$options_position .= '<option value="' . $position_id. '" ' . 
   		                     ( $position_id == $pp_position ? 'selected' : '' ) . '>' . $position_desc . '</option>';
		}		

		$corners = array( 
											'upper_right'  => 'Upper Right Corner',
											'bottom_right' => 'Bottom Right Corner',
											'upper_left'   => 'Upper Left Corner', 
											'bottom_left'  => 'Bottom Left Corner'
										);
		$options_corner = '';
		foreach( $corners as $corner_id => $corner_desc )
		{
   		$options_corner .= '<option value="' . $corner_id. '" ' . 
   		                   ( $corner_id == $pp_corner ? 'selected' : '' ) . '>' . $corner_desc . '</option>';
		}		
		?>
		<select id="war_sdy_pl_pp_position"
				name="war_sdy_pl_pp_position">
			<?php echo $options_position; ?>
		</select>
		<span id="war_sdy_pl_pp_comment"
              class="war_comment"><?php echo $pp_comment; ?></span>
		<br>
		<select id="war_sdy_pl_pp_corner"
				name="war_sdy_pl_pp_corner"
				style="margin-top: 8px;">
			<?php echo $options_corner; ?>
		</select>
		<?php     
	}
	
	public function add_settings_field_offset_x( $args )
	{
        $unit = get_option( 'war_sdy_pl_offset_x_unit' );
        $unit_options = $this->get_select_options( $unit, $this->units_length );
		?>
            <input type="text"
                   name="war_sdy_pl_offset_x"
                   id="war_sdy_pl_offset_x"
                   value="<?php echo get_option( 'war_sdy_pl_offset_x' ); ?>"
                   size="4" />
            <select id="war_sdy_pl_offset_x_unit"
                    name="war_sdy_pl_offset_x_unit">
                <?php echo $unit_options; ?>
            </select>
            <span class="war_comment">
                Horizontal length between button and vertical corner edge
            </span>
		<?php
	}

    public function add_settings_field_offset_y( $args )
    {
        $unit = get_option( 'war_sdy_pl_offset_y_unit' );
        $unit_options = $this->get_select_options( $unit, $this->units_length );
        ?>
            <input type="text"
                   name="war_sdy_pl_offset_y"
                   id="war_sdy_pl_offset_y"
                   value="<?php echo get_option( 'war_sdy_pl_offset_y' ); ?>"
                   size="4" />
            <select id="war_sdy_pl_offset_y_unit"
                    name="war_sdy_pl_offset_y_unit">
                <?php echo $unit_options; ?>
            </select>
            <span class="war_comment">
                Vertical length between button and horizontal corner edge
            </span>
        <?php
    }

	public function add_settings_field_template_tags( $args )
	{
		?>
            <script>
                jQuery( document ).ready
                (
                    function()
                    {
                        var jquery_tr = jQuery( '#sdy_pl_template_tags_table' ).parent().parent();
                        var th = jquery_tr.children().filter( 'th' );
                        th.css( 'width', '3%' );
                    }
                );
            </script>
            <table id="sdy_pl_template_tags_table" class="war_sdy_pl_shortcodes">
                <tr>
                    <th>
                        Template Tags
                    </th>
                    <td class="war_bold">
                        Description
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_playlist()
                        <br>
                        sdy_pl_get_playlist()
                    </th>
                    <td>
                        Inserts the playlist associated with a page or post.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_playlist_title()
                        <br>
                        sdy_pl_get_playlist_title()
                    </th>
                    <td>
                        Inserts the title of the playlist associated with a page or post.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_number_of_tracks()
                        <br>
                        sdy_pl_get_number_of_tracks()
                    </th>
                    <td>
                        Inserts the number of soundtracks of the playlist associated with a page or post.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_playlist_status()
                        <br>
                        sdy_pl_get_playlist_status()
                    </th>
                    <td>
                        Inserts the status of the playlist associated with a page or post. The status can be "Playing" or "Paused".
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_button_play_pause()
                        <br>
                        sdy_pl_get_button_play_pause()
                    </th>
                    <td>
                        Inserts the Play/Pause button.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_button_previous()
                        <br>
                        sdy_pl_get_button_previous()
                    </th>
                    <td>
                        Inserts the Previous button.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_button_next()
                        <br>
                        sdy_pl_get_button_next()
                    </th>
                    <td>
                        Inserts the Next button.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_title()
                        <br>
                        sdy_pl_get_title()
                    </th>
                    <td>
                        Inserts the title of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_artist()
                        <br>
                        sdy_pl_get_artist()
                    </th>
                    <td>
                        Inserts the name of the artist of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_composer()
                        <br>
                        sdy_pl_get_composer()
                    </th>
                    <td>
                        Inserts the name of the composer of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_volume()
                        <br>
                        sdy_pl_get_volume()
                    </th>
                    <td>
                        Inserts the volume of the playing soundtrack in percentage format. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_volume_slider()
                        <br>
                        sdy_pl_get_volume_slider()
                    </th>
                    <td>
                        Inserts the volume of the playing soundtrack in percentage format. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_duration()
                        <br>
                        sdy_pl_get_duration()
                    </th>
                    <td>
                        Inserts the duration of the playing soundtrack in hh:mm:ss format. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_time()
                        <br>
                        sdy_pl_get_time()
                    </th>
                    <td>
                        Inserts the current elapsed playing time of the playing soundtrack in hh:mm:ss format. Updated every second.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_time_slider()
                        <br>
                        sdy_pl_get_time_slider()
                    </th>
                    <td>
                        Inserts a slider indicating the progression od the playing soundtrack.
                        The slider can also be used to position the playback at any time point. Updated every second.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_id()
                        <br>
                        sdy_pl_get_id()
                    </th>
                    <td>
                        Inserts the ID of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_index()
                        <br>
                        sdy_pl_get_index()
                    </th>
                    <td>
                        Inserts the index of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_url()
                        <br>
                        sdy_pl_get_url()
                    </th>
                    <td>
                        Inserts the url of the playing soundtrack. Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_type()
                        <br>
                        sdy_pl_get_type()
                    </th>
                    <td>
                        Inserts the type of the playing soundtrack. The value inserted can be "audio/mpeg", "audio/ogg" or "audio/wav". Updated when soundtrack changes.
                    </td>
                </tr>
                <tr>
                    <th>
                        sdy_pl_speaker_icon()
                        <br>
                        sdy_pl_get_speaker_icon()
                    </th>
                    <td>
                        Inserts the speaker icon.
                    </td>
                </tr>
            </table>
		<?php
	}

	public function get_meta_data( $meta_data_name, $can_be_default = false )
	{
		$meta_data = get_post_meta( $this->post_id, $meta_data_name, true );			

		if( $meta_data == 'no_value' )
		{
			$meta_data = '';
		}
		
		if( ( $meta_data == '' || $meta_data == 'default' ) && $can_be_default )
		{
			$meta_data = 'default';
		}
		elseif( $meta_data == '' || $meta_data == 'default' )
		{
			$meta_data = get_option( $meta_data_name );
		}
				
		return $meta_data;
	}

    public function get_column_data( $column_name, $column_layout )
    {
        $id_do_display   = 'war_sdy_pl_column_do_display_'  . $column_name;
        $id_width_value  = 'war_sdy_pl_column_width_value_' . $column_name;
        $id_width_unit   = 'war_sdy_pl_column_width_unit_'  . $column_name;

        if( $column_layout == 'default' )
        {
            $column_do_display   = get_option( $id_do_display );
            $column_width_value  = get_option( $id_width_value );
            $column_width_unit   = get_option( $id_width_unit );
        }
        else
        {
            $column_do_display   = get_post_meta( $this->post_id, $id_do_display, true );
            $column_width_value  = get_post_meta( $this->post_id, $id_width_value, true );
            $column_width_unit   = get_post_meta( $this->post_id, $id_width_unit, true );
        }

        if( ! $column_do_display )
        {
            eval( '$column_do_display = $this->column_do_display_' . $column_name . ';' );
        }
        if( ! $column_width_value )
        {
            eval( '$column_width_value = $this->column_width_value_' . $column_name . ';' );
        }
        if( ! $column_width_unit )
        {
            eval( '$column_width_unit = $this->column_width_unit_' . $column_name . ';' );
        }

        return array
        (
            'do_display'         => $column_do_display,
            'width_value'        => $column_width_value,
            'width_unit'         => $column_width_unit,
            'width_unit_options' => $this->get_select_options( $column_width_unit, $this->units_length )
        );
    }

    public function add_field_columns_layout( $column_layout, $context )
    {
        $this->add_columns_layout_captions();
        echo '<div id="war_sdy_pl_column_layout_field_list">';
            foreach( $this->playlist_column_names_titles as $name => $title )
            {
                $this->add_field_column( $name, $title, $column_layout, $context );
            }
        echo '</div>';
    }

    public function add_columns_layout_captions()
    {
        ?>
            <div class="war_sdy_pl_column_layout_container war_sdy_pl_column_layout_captions">
                <div class="war_sdy_pl_column_do_display_container war_sdy_pl_container">
                    Show
                </div>
                <div class="war_sdy_pl_column_label war_sdy_pl_container">
                    Name
                </div>
                <div class="war_sdy_pl_slider_container_column war_sdy_pl_container">
                    Column Width Value Slider
                </div>
                <div class="war_sdy_pl_container">
                    <div class="war_sdy_pl_column_width_value war_sdy_pl_container">
                        Value
                    </div>
                    <div class="war_sdy_pl_column_width_unit war_sdy_pl_container">
                        Unit
                    </div>
                </div>
            </div>
        <?php
    }

    public function add_field_column( $column_name, $column_label, $column_layout, $context )
    {
        $column_data = $this->get_column_data( $column_name, $column_layout );
        if( $context == 'meta_box' )
        {
            $column_data_default = $this->get_column_data( $column_name, 'default' );
        }
        ?>
            <div id="war_sdy_pl_column_layout_field_<?php echo $column_name; ?>" class="war_sdy_pl_column_layout_container">
                <?php if( $context == 'meta_box' ): ?>
                    <div id="war_sdy_pl_column_do_display_default_<?php echo $column_name; ?>" style="display: none;"><?php echo $column_data_default[ 'do_display' ]; ?></div>
                    <div id="war_sdy_pl_column_do_display_custom_<?php echo $column_name; ?>"  style="display: none;"><?php echo $column_data[ 'do_display' ]; ?></div>
                    <div id="war_sdy_pl_column_width_value_default_<?php echo $column_name; ?>" style="display: none;"><?php echo $column_data_default[ 'width_value' ]; ?></div>
                    <div id="war_sdy_pl_column_width_value_custom_<?php echo $column_name; ?>"  style="display: none;"><?php echo $column_data[ 'width_value' ]; ?></div>
                    <div id="war_sdy_pl_column_width_unit_default_<?php echo $column_name; ?>" style="display: none;"><?php echo $column_data_default[ 'width_unit' ]; ?></div>
                    <div id="war_sdy_pl_column_width_unit_custom_<?php echo $column_name; ?>"  style="display: none;"><?php echo $column_data[ 'width_unit' ]; ?></div>
                <?php endif; ?>
                <div class="war_sdy_pl_column_do_display_container war_sdy_pl_container">
                    <input type="hidden"
                           id="war_sdy_pl_column_do_display_<?php echo $column_name; ?>"
                           name="war_sdy_pl_column_do_display_<?php echo $column_name; ?>"
                           value="<?php echo $column_data[ 'do_display' ]; ?>" />
                    <input type="checkbox"
                           id="war_sdy_pl_column_checkbox_do_display_<?php echo $column_name; ?>"
                           name="war_sdy_pl_column_checkbox_do_display_<?php echo $column_name; ?>"
                           <?php echo $column_data[ 'do_display' ] == 'yes' ? 'checked' : ''; ?> />
                </div>
                <div class="war_sdy_pl_column_label war_sdy_pl_container">
                    <label for="war_sdy_pl_column_checkbox_do_display_<?php echo $column_name; ?>"
                           style="margin-right: 1em;"><?php echo $column_label; ?></label>
                </div>
                <div class="war_sdy_pl_slider_container_column war_sdy_pl_container">
                    <div id="war_sdy_pl_column_width_value_slider_<?php echo $column_name; ?>"
                         class="war_sdy_pl_slider">
                    </div>
                </div>
                <div class="war_sdy_pl_container">
                    <div class="war_sdy_pl_column_width_value war_sdy_pl_container">
                        <input type="text"
                               id="war_sdy_pl_column_width_value_<?php echo $column_name; ?>"
                               name="war_sdy_pl_column_width_value_<?php echo $column_name; ?>"
                               size="4"
                               value="<?php echo $column_data[ 'width_value' ]; ?>" />
                    </div>
                    <div class="war_sdy_pl_column_width_unit war_sdy_pl_container">
                        <select id="war_sdy_pl_column_width_unit_<?php echo $column_name; ?>"
                                name="war_sdy_pl_column_width_unit_<?php echo $column_name; ?>">
                            <?php echo $column_data[ 'width_unit_options' ]; ?>
                        </select>
                    </div>
                </div>
            </div>
        <?php
    }

    public function add_field_columns_order( $column_order, $context )
    {
        $column_ordered_names_string_default = get_option( 'war_sdy_pl_column_ordered_names' );
        $column_ordered_names_string_default = $column_ordered_names_string_default ? $column_ordered_names_string_default : $this->playlist_column_names;

        if( $context == 'settings' )
        {
            $column_ordered_names_string = $column_ordered_names_string_default;
        }
        else //if( $context == 'meta_box' )
        {
            echo '<input id="war_sdy_pl_column_ordered_names_default"  type="hidden" value="' . $column_ordered_names_string_default . '">';

            if( $column_order == "default" )
            {
                $column_ordered_names_string = $column_ordered_names_string_default;
            }
            else //if( $column_order == 'custom' )
            {
                $column_ordered_names_string = get_post_meta( $this->post_id, 'war_sdy_pl_column_ordered_names', true );
            }
        }

        if( $column_ordered_names_string )
        {
            $column_ordered_names_array = explode( ',', $column_ordered_names_string );
            $column_ordered_names_titles = array();
            foreach( $column_ordered_names_array as $name )
            {
                $column_ordered_names_titles[ $name ] = $this->playlist_column_names_titles[ $name ];
            }
        }
        else
        {
            $column_ordered_names_string = $this->playlist_column_names;
            $column_ordered_names_array = explode( ',', $column_ordered_names_string );
            $column_ordered_names_titles = $this->playlist_column_names_titles;
        }

        echo '<input id="war_sdy_pl_column_ordered_names" name="war_sdy_pl_column_ordered_names" type="hidden" value="' . $column_ordered_names_string . '">';
        echo '<ul id="war_sdy_pl_column_order_name_list">';
        foreach( $column_ordered_names_titles as $name => $title )
        {
            echo '<li id="war_sdy_pl_column_order_item_' . $name . '"><div class="war_sdy_pl_name war_hidden">' . $name . '</div>' . $title . '</li>';
        }
        echo '</ul>';
        echo '<span class="war_comment" style="margin-left: 2%; position: relative; top: 3px;">Drag & Drop to change column order</span>';
    }

    public function add_field_scrolling( $context )
    {
        $height = get_post_meta( $this->post_id, 'war_sdy_pl_scrolling_height', true );
        $height = $height ? $height : 10;
        $options_height = array();
        for( $i = 1; $i < 100; $i++ )
        {
            $nb_formatted = $i < 10 ? '0' . $i : $i;
            $selected = $i == $height ? 'selected' : '';
            $options_height[] = '<option value="' . $i .'" ' . $selected . '>' . $nb_formatted . '</option>';
        }
        $options_height = implode( '', $options_height );

        echo '<div id="war_sdy_pl_scrolling_height_container">';
        echo    '<select id="war_sdy_pl_scrolling_height" name="war_sdy_pl_scrolling_height" style="margin-left: 0px;">' . $options_height . '</select>';
        echo    '<span style="margin-left: 10px;">rows in scrolling area</span>';
        echo '</div>';
    }

    public function add_field_outer_box_width( $context )
    {
        $outer_box_width = get_post_meta( $this->post_id, 'war_sdy_pl_outer_box_width', true );
        $outer_box_width = $outer_box_width ? $outer_box_width : 'default';

        $outer_box_width_value_default = intval( get_option( 'war_sdy_pl_playlist_outer_box_width_value' ), 10 );
        $outer_box_width_unit_default = get_option( 'war_sdy_pl_playlist_outer_box_width_unit' );

        if( $context == 'settings' )
        {
            $outer_box_width_value = $outer_box_width_value_default;
            $outer_box_width_unit  = $outer_box_width_unit_default;
        }
        else //if( $context == 'meta_box' )
        {
            echo '<input id="war_sdy_pl_outer_box_width_value_default"  type="hidden" value="' . $outer_box_width_value_default . '">';
            echo '<input id="war_sdy_pl_outer_box_width_unit_default"  type="hidden" value="' . $outer_box_width_unit_default . '">';

            if( $outer_box_width == "default" )
            {
                $outer_box_width_value = $outer_box_width_value_default;
                $outer_box_width_unit  = $outer_box_width_unit_default;
            }
            else //if( $column_order == 'custom' )
            {
                $outer_box_width_value  = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_outer_box_width_value', true );
                $outer_box_width_unit   = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_outer_box_width_unit', true );
            }
        }

        echo '<div class="war_sdy_pl_outer_box_width_container">';
        echo    '<div id="war_sdy_pl_slider_outer_box_width" class="war_sdy_pl_slider"></div>';
        echo    '<input id="war_sdy_pl_playlist_outer_box_width_value" name="war_sdy_pl_playlist_outer_box_width_value" type="text" size="4" value="' . $outer_box_width_value . '">';
        $unit_options = $this->get_select_options( $outer_box_width_unit, $this->units_length );
        echo    '<select id="war_sdy_pl_playlist_outer_box_width_unit" name="war_sdy_pl_playlist_outer_box_width_unit" style="margin-left: 12px;">' . $unit_options . '</select>';
        echo    '&nbsp;&nbsp;<span id="war_sdy_pl_playlist_outer_box_width_validation_error" class="war_sdy_pl_validation_error"></span>';
        echo '</div>';
    }
    
    public function add_field_font_size( $context )
    {
        $font_size = get_post_meta( $this->post_id, 'war_sdy_pl_font_size', true );
        $font_size = $font_size ? $font_size : 'default';

        $font_size_value_default = intval( get_option( 'war_sdy_pl_playlist_font_size_value' ), 10 );
        $font_size_unit_default = get_option( 'war_sdy_pl_playlist_font_size_unit' );

        if( $context == 'settings' )
        {
            $font_size_value = $font_size_value_default;
            $font_size_unit  = $font_size_unit_default;
        }
        else //if( $context == 'meta_box' )
        {
            echo '<input id="war_sdy_pl_font_size_value_default"  type="hidden" value="' . $font_size_value_default . '">';
            echo '<input id="war_sdy_pl_font_size_unit_default"  type="hidden" value="' . $font_size_unit_default . '">';

            if( $font_size == "default" )
            {
                $font_size_value = $font_size_value_default;
                $font_size_unit  = $font_size_unit_default;
            }
            else //if( $column_order == 'custom' )
            {
                $font_size_value  = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_font_size_value', true );
                $font_size_unit   = get_post_meta( $this->post_id, 'war_sdy_pl_playlist_font_size_unit', true );
            }
        }

        echo '<div class="war_sdy_pl_font_size_container">';
        echo    '<div id="war_sdy_pl_slider_font_size" class="war_sdy_pl_slider"></div>';
        echo    '<input id="war_sdy_pl_playlist_font_size_value" name="war_sdy_pl_playlist_font_size_value" type="text" size="4" value="' . $font_size_value . '">';
        $unit_options = $this->get_select_options( $font_size_unit, $this->units_font_size );
        echo    '<select id="war_sdy_pl_playlist_font_size_unit" name="war_sdy_pl_playlist_font_size_unit" style="margin-left: 12px;">' . $unit_options . '</select>';
        echo    '&nbsp;&nbsp;<span id="war_sdy_pl_playlist_font_size_validation_error" class="war_sdy_pl_validation_error"></span>';
        echo '</div>';
    }

	public function do_sanitize_field( $value )
	{
		return htmlentities( sanitize_text_field( $value ), ENT_QUOTES, 'UTF-8' );
	}

    public function html_entity_decode( $value )
    {
        return( str_replace( '"', '&quot;', html_entity_decode( $value, ENT_QUOTES ) ) );
    }

	public function do_sanitize_field_no_hmtl_encode( $value )
	{
		return sanitize_text_field( $value );
	}
	
	public function check_user_agent ( $type = NULL ) 
	{
    $user_agent = strtolower ( $_SERVER['HTTP_USER_AGENT'] );
    if ( $type == 'bot' ) 
    {
      // matches popular bots
      if ( preg_match ( "/googlebot|adsbot|yahooseeker|yahoobot|msnbot|watchmouse|pingdom\.com|feedfetcher-google/", $user_agent ) ) 
      {
        return true;
        // watchmouse|pingdom\.com are "uptime services"
      }
    } 
    elseif ( $type == 'browser' ) 
    {
      // matches core browser types
      if ( preg_match ( "/mozilla\/|opera\//", $user_agent ) )
      {
      	return true;
      }
    } 
    elseif ( $type == 'mobile' )
    {
      // matches popular mobile devices that have small screens and/or touch inputs
      // mobile devices have regional trends; some of these will have varying popularity in Europe, Asia, and America
      // detailed demographics are unknown, and South America, the Pacific Islands, and Africa trends might not be represented, here
      if ( preg_match ( "/phone|iphone|itouch|ipod|symbian|android|htc_|htc-|palmos|blackberry|opera mini|iemobile|windows ce|nokia|fennec|hiptop|kindle|mot |mot-|webos\/|samsung|sonyericsson|^sie-|nintendo/", $user_agent ) ) 
      {
        // these are the most common
        return true;
      } 
      elseif ( preg_match ( "/mobile|pda;|avantgo|eudoraweb|minimo|netfront|brew|teleca|lg;|lge |wap;| wap /", $user_agent ) ) 
      {
        // these are less common, and might not be worth checking
        return true;
      }
    }
    elseif( $type == 'firefox' )
    {
    	if ( strpos( $user_agent, 'firefox' ) !== false )
      {
      	return true;
      }
    }
    return false;
	}

    public function get_select_options( $value, $option_values )
    {
        $options = '';
        foreach ( $option_values as $option_value => $option_display )
        {
            $options .= '<option value="' . $option_value . '"';
            if( $option_value == $value )
            {
                $options .= ' selected>';
            }
            else
            {
                $options .= '>';
            }
            $options .=  $option_display . '</option>';
        }
        return $options;
    }

    public function insert_playlist_css_js_global_variables()
    {
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

            $pixel_outline_width                = intval( $pixel_outline_width )                . 'px';
            $pixel_soundtrack_separator_width   = intval( $pixel_soundtrack_separator_width )   . 'px';
            $pixel_soundtrack_vertical_padding  = intval( $pixel_soundtrack_vertical_padding )  . 'px';
            $pixel_outer_box_corner_rounding    = intval( $pixel_outer_box_corner_rounding )    . 'px';
            $pixel_inner_box_corner_rounding    = intval( $pixel_inner_box_corner_rounding )    . 'px';
            $pixel_outer_box_padding            = intval( $pixel_outer_box_padding )            . 'px';
            $pixel_inner_box_margin             = intval( $pixel_inner_box_margin )             . 'px';
        }

        if( $playlist_css_use_only == 'no' ): ?>
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
        <?php else: ?>
            var sdy_pl_css_use_only = true;
        <?php endif;
    }

    public function import_soundtracks()
    {
        $this->readThroughMediaLibrary( $this->media_library_path );
        die();
    }

    public function readThroughMediaLibrary( $path )
    {
        $file_names = scandir( $path );
        foreach( $file_names as $file_name )
        {
            $file_path = $path . '/' . $file_name;
            $finfo = finfo_file( finfo_open( FILEINFO_MIME_TYPE ), $file_path );
            error_log( "\n$file_path\n", 3, ABSPATH . 'war_debug.log' );
            error_log( "\n$finfo\n", 3, ABSPATH . 'war_debug.log' );
            if( $finfo == 'directory' && $file_name != '.' && $file_name != '..' )
            {
                $this->readThroughMediaLibrary( $file_path );
            }
            // else if( strpos( $finfo, 'audio' ) === 0 )
            else if( $finfo == 'audio/mpeg' || $finfo == 'audio/ogg' || $finfo == 'application/ogg' || $finfo == 'audio/wav' || $finfo == 'audio/x-wav' )
            {
                switch( $finfo )
                {
                    case 'application/ogg':
                        $type = 'audio/ogg';
                        break;
                    case 'audio/x-wav':
                        $type = 'audio/wav';
                        break;
                    default:
                        $type = $finfo;
                }
                $pos  = strrpos( $file_name, '.' );
                $title = ( $pos === false ) ? $file_name : substr( $file_name, 0, $pos );
                $title = preg_replace( '/[-_ ]+/', ' ', $title );
                $title = preg_replace( '/ +/', ' ', $title );
                $words = explode( ' ', $title );
                $title = '';
                foreach( $words as $word )
                {
                    $title .= ucfirst( $word ) . ' ';
                }
                $file_url = $this->site_url . substr( $file_path, strrpos( $this->plugin_path, '/wp-content/' ) );
                echo    '<li>' .
                            '<div class="war_back_end_soundtrack_index">'     . 00        . '</div>' .
                            '<div class="war_back_end_soundtrack_url">'       . $file_url . '</div>' .
                            '<div class="war_back_end_soundtrack_title">'     . $title    . '</div>' .
                            '<div class="war_back_end_soundtrack_artist">'    . ''        . '</div>' .
                            '<div class="war_back_end_soundtrack_composer">'  . ''        . '</div>' .
                            '<div class="war_back_end_soundtrack_volume">'    . 80        . '</div>' .
                            '<div class="war_back_end_soundtrack_time">'      . ''        . '</div>' .
                            '<div class="war_back_end_soundtrack_id">'        . ''        . '</div>' .
                            '<div class="war_back_end_soundtrack_type">'      . $type     . '</div>' .
                        '</li>';
            }
        }
    }
}

$war_sdy_pl = new WarSoundyAudioPlaylist();
$war_sdy_pl_front_end = $war_sdy_pl->front_end;
$war_sdy_pl_playlist  = $war_sdy_pl->playlist;

include( sprintf( "%s/templates/template-tags.php", dirname( __FILE__ ) ) );

?>