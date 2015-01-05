<?php

class WarSoundyAudioPlaylistPlaylist
{
	private $sdy_pl; // WarSoundyAudioPlaylist Object

	public function __construct( $sdy_pl_object )
	{
		$this->sdy_pl = $sdy_pl_object;
	}

	public function get_playlist_code( $context = 'front_end', $tab = 'preview' )
	{
        if( $context == 'front_end' && ! $this->sdy_pl->enable )
            return '<span style="color: red;"> Soundy Audio Playlist is disabled. You can enable it in General tab of plugin meta box. </span>';

        if( $context == 'front_end' || $context == 'meta_box')
        {
            $soundtracks  = html_entity_decode( get_post_meta( get_the_ID(), 'war_sdy_pl_soundtracks', true ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
            if( $soundtracks == 'default' || ! $soundtracks )
            {
                $soundtracks = html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
            }
            if( ! $soundtracks ) return '<span style="color: red;"> Audio playlist is empty. </span>';
        }
        else //if( $context == 'settings'
        {
            $soundtracks = html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
        }

        $scrolling_enable = get_post_meta( get_the_ID(), 'war_sdy_pl_scrolling_enable', true );
        $scrolling_enable = $scrolling_enable ? $scrolling_enable : 'no';
        if( $scrolling_enable == 'yes' )
        {
            $scrolling_comment = '<span style="margin-left: 1%;">•</span><span style="margin-left: 1%;">List is scrollable</span>';
        }
        else
        {
            $scrolling_comment = '';
        }

		$playlist_code =
            '<div class="war_sdy_pl_playlist_outer_box">' .
                (
                    $tab == 'columns' ? '' :
                    '<ul class="war_sdy_pl_playlist">' .
                        '<li class="war_sdy_pl_playlist_row_header">' .
                            '<div class="war_sdy_pl_playlist_header_container">' .
                                '<div class="war_sdy_pl_playlist_header_left_hand_container">' .
                                    '<div class="war_sdy_pl_playlist_header_left_hand">' .
                                        '<div class="war_sdy_pl_playlist_pp_button">' .
                                            sdy_pl_get_button_play_pause( 'player' ) .
                                        '</div>' .
                                        '<div class="war_sdy_pl_playlist_title_global">' .
                                            '<div class="war_sdy_pl_playlist_title">' .
                                                sdy_pl_get_playlist_title( $context ) .
                                            '</div>' .
                                            '<div class="war_sdy_pl_playlist_volume_container_row">' .
                                                '<div class="war_sdy_pl_playlist_volume_container_cell">' .
                                                    sdy_pl_get_speaker_icon() .
                                                    sdy_pl_get_volume_slider() .
                                                '</div>' .
                                            '</div>' .
                                        '</div>' .
                                    '</div>' .
                                '</div>' .
                                '<div class="war_sdy_pl_playlist_header_right_hand_container">' .
                                    '<div class="war_sdy_pl_playlist_header_right_hand">' .
                                        '<div class="war_sdy_pl_playlist_time_slider_global">' .
                                            '<div class="war_sdy_pl_playlist_soundtrack_time_local">' .
                                                sdy_pl_get_time() .
                                            '</div>' .
                                            '<div class="war_sdy_pl_playlist_time_slider_local">' .
                                                sdy_pl_get_time_slider() .
                                            '</div>' .
                                            '<div class="war_sdy_pl_playlist_soundtrack_duration_local">' .
                                                sdy_pl_get_duration() .
                                            '</div>' .
                                        '</div>' .
                                        '<div class="war_sdy_pl_playlist_soundtrack_title_global">' .
                                            '<div class="war_sdy_pl_playlist_previous_local">' .
                                                sdy_pl_get_button_previous() .
                                            '</div>' .
                                            '<div class="war_sdy_pl_playlist_header_soundtrack_title_and_artist">' .
                                                '<div class="war_sdy_pl_playlist_header_soundtrack_title_and_artist_table">' .
                                                    '<div class="war_sdy_pl_playlist_header_soundtrack_title_row">' .
                                                        '<div class="war_sdy_pl_playlist_header_soundtrack_title">' .
                                                            sdy_pl_get_title() .
                                                        '</div>' .
                                                    '</div>' .
                                                    '<div class="war_sdy_pl_playlist_header_soundtrack_artist_row">' .
                                                        '<div class="war_sdy_pl_playlist_header_soundtrack_artist">' .
                                                            sdy_pl_get_artist() .
                                                        '</div>' .
                                                    '</div>' .
                                                '</div>' .
                                            '</div>' .
                                            '<div class="war_sdy_pl_playlist_next_local">' .
                                                sdy_pl_get_button_next() .
                                            '</div>' .
                                        '</div>' .
                                    '</div>' .
                                '</div>' .
                            '</div>' .
                            '<div style="clear: both;"></div>' .
                        '</li>' .
                    '</ul>'
                ) .
                '<ul class="war_sdy_pl_playlist">' .
                    '<li class="war_sdy_pl_playlist_columns_caption_row">' .
                        '<div class="war_soundtrack_index">#</div>' .
                        '<div class="war_soundtrack_title">Title</div>' .
                        '<div class="war_soundtrack_artist">Artist</div>' .
                        '<div class="war_soundtrack_composer">Composer</div>' .
                        '<div class="war_soundtrack_time">Time</div>' .
                        '<div class="war_soundtrack_id">ID</div>' .
                    '</li>' .
                '</ul>' .
                '<ul id="war_sdy_pl_playlist" class="war_sdy_pl_playlist">' .
                    $soundtracks .
                '</ul>' .
                '<ul class="war_sdy_pl_playlist">' .
                    '<li class="war_sdy_pl_playlist_row_footer">' .
                        '<div class="war_sdy_pl_playlist_row_footer_div">' .
                            '<span style="margin-right: 1%;">' . sdy_pl_get_number_of_tracks( $context ) . ' tracks</span>' .
                            '•' .
                            '<span id="war_sdy_pl_playlist_comment" style="margin-left: 1%; margin-right: 1%;">Click or use ↑ ↓ ← → to select</span>' .
                            '•' .
                            '<span style="margin-left: 1%;">Double-click to play or pause</span>' .
                            $scrolling_comment .
                        '</div>' .
                    '</li>' .
                '</ul>' .
            '</div>';
		return $playlist_code;
	}
}

?>