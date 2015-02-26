<?php
	
function sdy_pl_get_playlist( $context = 'front_end', $tab = 'preview' )
{
	global $war_sdy_pl_playlist;

	return $war_sdy_pl_playlist->get_playlist_code( $context, $tab );
}

function sdy_pl_playlist( $context = 'front_end', $tab = 'preview' )
{
	echo sdy_pl_get_playlist( $context, $tab );
}

function sdy_pl_get_playlist_title( $context = 'front_end' )
{
    if( $context == 'settings' )
    {
        $title = get_option( 'war_sdy_pl_playlist_title' );
    }
    else
    {
        $title = get_post_meta( get_the_ID(), 'war_sdy_pl_playlist_title', true );
        if( $title == 'default' || ! $title )
        {
            $title = get_option( 'war_sdy_pl_playlist_title' );
        }
    }
	return $title;
}

function sdy_pl_playlist_title( $context = 'front_end' )
{
	echo sdy_pl_get_playlist_title( $context );
}

function sdy_pl_get_playlist_status()
{
	return '<span class="war_sdy_pl_placeholder_playlist_current_status"></span>';
}

function sdy_pl_playlist_status()
{
	echo sdy_pl_get_playlist_status();
}

function sdy_pl_get_time_slider()
{
	return '<div class="war_sdy_pl_playlist_time_slider"></div>';
}

function sdy_pl_time_slider()
{
	echo sdy_pl_get_time_slider();
}

function sdy_pl_get_volume_slider()
{
    return '<div class="war_sdy_pl_playlist_volume_slider"></div>';
}

function sdy_pl_volume_slider()
{
    echo sdy_pl_get_volume_slider();
}

function sdy_pl_get_button_play_pause( $context = 'no_player' )
{
    if( $context == 'no_player' )
    {
        return '<img class="war_sdy_pl_audio_control war_sdy_pl_no_player">';
    }
    else
    {
        return '<img class="war_sdy_pl_audio_control">';
    }
}

function sdy_pl_button_play_pause( $context = 'no_player' )
{
    echo sdy_pl_get_button_play_pause( $context );
}

function sdy_pl_get_button_previous()
{
    return '<svg    width="36"
                    height="21"
                    class="war_sdy_pl_button_previous">
                <g  class="war_sdy_pl_icon_previous_next_graphic" transform="translate( 5, 5 )">
                   <polygon points="0,7 14,0 14,14" />
                   <polygon points="15,7 29,0 29,14" />
                </g>
             </svg>';
}

function sdy_pl_button_previous()
{
    echo sdy_pl_get_button_previous();
}

function sdy_pl_get_button_next()
{
    return  '<svg    width="36"
                    height="21"
                    class="war_sdy_pl_button_next">
                <g  class="war_sdy_pl_icon_previous_next_graphic" transform="translate( 3, 5 )">
                    <polygon points="0,0 14,7 0,14" />
                    <polygon points="15,0 29,7 15,14" />
                </g>
            </svg>';
}

function sdy_pl_button_next()
{
    echo sdy_pl_get_button_next();
}

function sdy_pl_get_number_of_tracks( $context = 'front_end' )
{
    if( $context == 'settings' )
    {
        $soundtracks = html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
    }
    else
    {
        $soundtracks = html_entity_decode( get_post_meta( get_the_ID(), 'war_sdy_pl_soundtracks', true ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
        if( $soundtracks == 'default' )
        {
            $soundtracks = html_entity_decode( get_option( 'war_sdy_pl_soundtracks' ), ENT_COMPAT | ENT_HTML5, 'UTF-8' );
        }
    }

    return substr_count( $soundtracks, '<li' );
}

function sdy_pl_number_of_tracks( $context = 'front_end' )
{
	echo sdy_pl_get_number_of_tracks( $context );
}

function sdy_pl_get_id()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_id"></span>';
}

function sdy_pl_id()
{
	echo sdy_pl_get_id();
}

function sdy_pl_get_index()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_index"></span>';
}

function sdy_pl_index()
{
	echo sdy_pl_get_index();
}

function sdy_pl_get_type()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_type"></span>';
}

function sdy_pl_type()
{
	echo sdy_pl_get_type();
}
			
function sdy_pl_get_volume()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_volume"></span>%';
}

function sdy_pl_volume()
{
	echo sdy_pl_get_volume();
}

function sdy_pl_get_time()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_time"></span>';
}

function sdy_pl_time()
{
	echo sdy_pl_get_time();
}

function sdy_pl_get_duration()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_duration"></span>';
}

function sdy_pl_duration()
{
	echo sdy_pl_get_duration();
}

function sdy_pl_get_url()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_url"></span>';
}

function sdy_pl_url()
{
	echo sdy_pl_get_url();
}

function sdy_pl_get_title()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_title"></span>';
}

function sdy_pl_title()
{
	echo sdy_pl_get_title();
}

function sdy_pl_get_artist()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_artist"></span>';
}

function sdy_pl_artist()
{
	echo sdy_pl_get_artist();
}

function sdy_pl_get_composer()
{
	return '<span class="war_sdy_pl_placeholder_soundtrack_current_composer"></span>';
}

function sdy_pl_composer()
{
	echo sdy_pl_get_composer();
}

function sdy_pl_get_speaker_icon()
{
    return '<svg    width="24"
                    height="24"
                    class="war_sdy_pl_playlist_volume_icon">
                <g
                    id="my_group"
                    transform="translate( 0, 8 )">
                    <path
                        id="rect3180-0"
                        d="m8.0134-2.3842e-8c-0.30522 0-0.56653 0.12796-0.75 0.34375l-2.25 2.6562h-2c-0.552 0-1 0.448-1 1-0.00627 0.99607 0.00222 2.0145 0 3 0 0.552 0.448 1 1 1h2l2.1562 2.4688c0.1714 0.305 0.4693 0.531 0.8438 0.531 0.552 0 1-0.448 1-1v-9c0-0.552-0.448-1-1-1z"
                        style="opacity:.3;fill-rule:evenodd;fill:#fff" />
                    <path
                        id="path3209-4"
                        d="m17.868-2.15s2.6135 2.4227 2.6135 7.6349c0 5.1866-2.618 7.6651-2.618 7.6651m-2.971-13.055s1.8454 1.7448 1.7797 5.4045c-0.0662 3.6901-1.8093 5.4045-1.8093 5.4045m-3-8.6827s0.98347 0.79498 1.0085 3.2306c0.02476 2.4053-1.0085 3.3256-1.0085 3.3256"
                        style="opacity:.3;stroke-width:1.7;stroke:#fff;stroke-linecap:round;fill:none" />
                    <path
                        class="war_sdy_pl_icon_speaker_graphic_2"
                        d="m17.868-3.15s2.6135 2.4227 2.6135 7.6349c0 5.1866-2.618 7.6651-2.618 7.6651m-2.971-13.055s1.8454 1.7448 1.7797 5.4045c-0.0662 3.6901-1.8093 5.4045-1.8093 5.4045m-3-8.6827s0.98347 0.79498 1.0085 3.2306c0.02476 2.4053-1.0085 3.3256-1.0085 3.3256"
                        style="stroke-width:1.7;stroke-linecap:round;fill:none" />
                    <path
                        class="war_sdy_pl_icon_speaker_graphic_1"
                        d="m8.0134-1c-0.30522 0-0.56653 0.12796-0.75 0.34375l-2.25 2.6562h-2c-0.552 0-1 0.448-1 1-0.00627 0.99607 0.00222 2.0145 0 3 0 0.552 0.448 1 1 1h2l2.1562 2.4688c0.1714 0.3049 0.4693 0.5312 0.8438 0.5312 0.552 0 1-0.448 1-1v-9c0-0.552-0.448-1-1-1z"
                        style="fill-rule:evenodd" />
                </g>
            </svg>';
}

function sdy_pl_speaker_icon()
{
    echo sdy_pl_get_speaker_icon();
}
?>