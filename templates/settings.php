<div class="wrap">
	<?php 
		$is_pro = 'true';
		$is_trial = 'false';
		$buy = '<button id="war_sdy_pl_pro_buy" type="button" class="war_sdy_pl" style="margin-left: 20px; position: relative; top: -2px;">Soundy Audio Playlist PRO</button>';
	?>
	<h2>Soundy Audio Playlist Plugin Settings
        <span class="war_comment" style="margin-left: 80px; font-size: 80%;">Need more than one playlist ? &nbsp;&nbsp;&nbsp; Upgrade to: <?php echo $buy; ?></span></h2>
	
	<p>All these settings are default settings for all pages and posts.<?php echo $tip; ?></p>
	
	<form method="post" action="options.php">
	<?php 
	  settings_fields( 'war_sdy_pl' );
	?>
	<script>
		var war_sdy_pl_admin = new WarSoundyAudioPlaylistAdmin(
			'settings',
			{
				default_button_dimensions: 				'<?php echo $this->button_dimensions; ?>',
				default_play_button_url:   				'<?php echo $this->play_button_url; ?>',
				default_play_hover_url:    				'<?php echo $this->play_hover_url; ?>',
				default_pause_button_url:  				'<?php echo $this->pause_button_url; ?>',
				default_pause_hover_url:	 			'<?php echo $this->pause_hover_url; ?>',
				is_pro:                     			<?php echo $is_pro; ?>,
				is_trial:                   			<?php echo $is_trial; ?>,
				color_blue_start:          				'<?php echo $this->color_blue_start; ?>',
				color_blue_end:            				'<?php echo $this->color_blue_end; ?>',
				color_yellow_start:        				'<?php echo $this->color_yellow_start; ?>',
				color_yellow_end:          				'<?php echo $this->color_yellow_end; ?>',
				plugin_url:                				'<?php echo $this->plugin_url; ?>',
				sdy_pl_pro_home_url:       				'<?php echo $this->sdy_pl_pro_home_url; ?>',
				time_to_get_soundtrack_duration:        '<?php echo $this->time_to_get_soundtrack_duration; ?>'
			} );

        var war_design_pl = new war_AudioPlaylistDesignerPlaylist();

        var war_design_pp = new war_AudioPlaylistDesignerPlayPause();

        var war_sdy_pl_admin_columns = new WarSoundyAudioPlaylistAdminColumns( 'settings' );

        <?php $this->insert_playlist_css_js_global_variables(); ?>

        var sdy_pl_button_url_play_normal  = new Image();
        var sdy_pl_button_url_play_hover   = new Image();
        var sdy_pl_button_url_pause_normal = new Image();
        var sdy_pl_button_url_pause_hover  = new Image();
        sdy_pl_button_url_play_normal.src  = '<?php echo $button_url_play; ?>';
        sdy_pl_button_url_play_hover.src   = '<?php echo $hover_url_play; ?>';
        sdy_pl_button_url_pause_normal.src = '<?php echo $button_url_pause; ?>';
        sdy_pl_button_url_pause_hover.src  = '<?php echo $hover_url_pause; ?>';

	</script>
	
	<div id="war_sdy_pl_tabs">
	    <ul>
            <li><a id="war_sdy_pl_tab_label_playlist"       href="#war_sdy_pl_tab_panel_playlist">Playlist</a></li>
            <li><a id="war_sdy_pl_tab_label_columns"        href="#war_sdy_pl_tab_panel_columns">Columns</a></li>
            <li><a id="war_sdy_pl_tab_label_designer_pl"    href="#war_sdy_pl_tab_panel_designer_pl">Playlist Designer</a></li>
            <li><a id="war_sdy_pl_tab_label_playlist_css"   href="#war_sdy_pl_tab_panel_playlist_css">Playlist CSS</a></li>
            <li><a id="war_sdy_pl_tab_label_play_buttons"   href="#war_sdy_pl_tab_panel_buttons">Buttons</a></li>
            <li><a id="war_sdy_pl_tab_label_designer_pp"    href="#war_sdy_pl_tab_panel_designer_pp">Button Designer</a></li>
            <li><a id="war_sdy_pl_tab_label_position"       href="#war_sdy_pl_tab_panel_position">Corner Position</a></li>
            <li><a id="war_sdy_pl_tab_label_responsive"     href="#war_sdy_pl_tab_panel_responsive">Button Responsiveness</a></li>
            <li><a id="war_sdy_pl_tab_label_tags"           href="#war_sdy_pl_tab_panel_tags">Tags</a></li>
	    </ul>
        <div id="war_sdy_pl_tab_panel_playlist">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_playlist' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_columns">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_columns' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_designer_pl">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_designer_playlist' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_playlist_css">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_playlist_css' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_buttons">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_play_pause_button' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_designer_pp">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_designer_play_pause' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_position">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_play_pause_position_corner' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_responsive">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_play_pause_responsive' ); ?>
        </div>
        <div id="war_sdy_pl_tab_panel_tags">
            <?php $this->do_settings_section( 'sdy_pl', 'war_sdy_pl_settings_section_play_pause_position_static' ); ?>
        </div>
    </div>
		  
	<?php submit_button(); ?>
	</form>
</div>
