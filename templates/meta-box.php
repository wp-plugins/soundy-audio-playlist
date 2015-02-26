
<script>

    var war_sdy_pl_admin = new WarSoundyAudioPlaylistAdmin(
    'meta_box',
    {
        color_blue_start:                   '<?php echo $this->sdy_pl->color_blue_start; ?>',
        color_blue_end:                     '<?php echo $this->sdy_pl->color_blue_end; ?>',
        color_yellow_start:                 '<?php echo $this->sdy_pl->color_yellow_start; ?>',
        color_yellow_end:                   '<?php echo $this->sdy_pl->color_yellow_end; ?>',
        plugin_url:                         '<?php echo $this->sdy_pl->plugin_url; ?>',
        sdy_pl_pro_home_url:                '<?php echo $this->sdy_pl->sdy_pl_pro_home_url; ?>',
        time_to_get_soundtrack_duration:    '<?php echo $this->sdy_pl->time_to_get_soundtrack_duration; ?>'
    } );

    var sdy_pl_button_url_play_normal  = new Image();
    var sdy_pl_button_url_play_hover   = new Image();
    var sdy_pl_button_url_pause_normal = new Image();
    var sdy_pl_button_url_pause_hover  = new Image();
    sdy_pl_button_url_play_normal.src  = '<?php echo $button_url_play; ?>';
    sdy_pl_button_url_play_hover.src   = '<?php echo $hover_url_play; ?>';
    sdy_pl_button_url_pause_normal.src = '<?php echo $button_url_pause; ?>';
    sdy_pl_button_url_pause_hover.src  = '<?php echo $hover_url_pause; ?>';

    var war_sdy_pl_admin_columns = new WarSoundyAudioPlaylistAdminColumns( 'meta_box' );

    <?php $this->sdy_pl->insert_playlist_css_js_global_variables(); ?>

</script>

<div id="war_sdy_pl_tabs">
  <ul>
      <li><a id="war_sdy_pl_tab_label_general"        href="#war_sdy_pl_tab_panel_general">General</a></li>
      <li><a id="war_sdy_pl_tab_label_content"        href="#war_sdy_pl_tab_panel_content">Playlist</a></li>
      <li><a id="war_sdy_pl_tab_label_play"           href="#war_sdy_pl_tab_panel_play">Play Options</a></li>
      <li><a id="war_sdy_pl_tab_label_columns"        href="#war_sdy_pl_tab_panel_columns">Display</a></li>
      <li><a id="war_sdy_pl_tab_label_shortcodes"     href="#war_sdy_pl_tab_panel_shortcodes">Short Codes</a></li>
  </ul>


  <div id="war_sdy_pl_tab_panel_general">
      <p class="war_bold war_bigger">General Options</p>
      <table class="form-table war_sdy_pl_general war_sdy_pl_form_table">
          <tr>
              <th>
                  <label for="war_sdy_pl_enable">Enable Soundy Audio Playlist</label>
              </th>
              <td>
                  <input type="radio"
                         id="war_sdy_pl_enable_yes"
                         name="war_sdy_pl_enable"
                         value="yes" <?php echo ( $sdy_pl_enable == 'yes' ? 'checked' : '' ); ?>/>
                  <label for="war_sdy_pl_enable_yes" style="margin-right: 1em;">Yes</label>

                  <input type="radio"
                         id="war_sdy_pl_enable_no"
                         name="war_sdy_pl_enable"
                         value="no" <?php echo ( $sdy_pl_enable == 'no' ? 'checked' : '' ); ?>/>
                  <label for="war_sdy_pl_enable_no" style="margin-right: 1em;">No</label>
              </td>
          </tr>
          <tr>
              <th>
                  <label for="war_sdy_pl_pp_corner_enable">Enable Play/Pause Button in Corner</label>
              </th>
              <td>
                  <input type="radio"
                         id="war_sdy_pl_pp_corner_enable_default"
                         name="war_sdy_pl_pp_corner_enable"
                         value="default" <?php echo ( $enable_pp_corner == 'default' ? 'checked' : '' ); ?>/>
                  <label for="war_sdy_pl_pp_corner_enable_default" style="margin-right: 1em;">Default</label>

                  <input type="radio"
                         id="war_sdy_pl_pp_corner_enable_yes"
                         name="war_sdy_pl_pp_corner_enable"
                         value="yes" <?php echo ( $enable_pp_corner == 'yes' ? 'checked' : '' ); ?>/>
                  <label for="war_sdy_pl_pp_corner_enable_yes" style="margin-right: 1em;">Yes</label>

                  <input type="radio"
                         id="war_sdy_pl_pp_corner_enable_no"
                         name="war_sdy_pl_pp_corner_enable"
                         value="no" <?php echo ( $enable_pp_corner == 'no' ? 'checked' : '' ); ?>/>
                  <label for="war_sdy_pl_pp_corner_enable_no" style="margin-right: 1em;">No</label>
              </td>
          </tr>
      </table>
  </div>

  <div id="war_sdy_pl_tab_panel_play">
        <p class="war_bold war_bigger">Playing Options</p>
        <p>These playing options are valid no matter if the playlist is displayed with the <span class="war_bold">[sdy_pl playlist]</span> short code or not.</p>
		<table class="form-table war_sdy_pl war_sdy_pl_form_table">
		<tr>
			<th class="war_sdy_pl">
				<label for="war_sdy_pl_autoplay">Autoplay</label>
			</th>
			<td>
				<input type="radio"
							 id="war_sdy_pl_autoplay_yes"
							 name="war_sdy_pl_autoplay"
							 value="yes" <?php echo ( $autoplay == 'yes' ? 'checked' : '' ); ?>/>
				<label for="war_sdy_pl_autoplay_yes" style="margin-right: 1em;">Yes</label>

				<input type="radio"
							 id="war_sdy_pl_autoplay_no"
							 name="war_sdy_pl_autoplay"
							 value="no" <?php echo ( $autoplay == 'no' ? 'checked' : '' ); ?>/>
				<label for="war_sdy_pl_autoplay_no" style="margin-right: 1em;">No</label>
			</td>
		</tr>
		<tr>
			<th class="war_sdy_pl">
				<label for="war_sdy_pl_play">Play Mode</label>
			</th>
			<td>
                <table class="war_table_no_space">
                    <tr>
                        <td>
                            <input type="radio"
                                   id="war_sdy_pl_play_mode_seq_from_first"
                                   name="war_sdy_pl_play_mode"
                                   value="seq_from_first" <?php echo ( $play_mode == 'seq_from_first' ? 'checked' : '' ); ?>/>
                        </td>
                        <td>
                            <label for="war_sdy_pl_play_mode_seq_from_first" style="margin-right: 1em;">All soundtracks sequentially played from first soundtrack up</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio"
                                         id="war_sdy_pl_play_mode_seq_from_selected"
                                         name="war_sdy_pl_play_mode"
                                         value="seq_from_selected" <?php echo ( $play_mode == 'seq_from_selected' ? 'checked' : '' ); ?>/>
                        </td>
                        <td>
                            <label for="war_sdy_pl_play_mode_seq_from_selected" style="margin-right: 1em;">All soundtracks sequentially played from yellow selected soundtrack up</label>
                            <span id="war_sdy_pl_play_mode_seq_from_selected_comment"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio"
                                         id="war_sdy_pl_play_mode_random_all"
                                         name="war_sdy_pl_play_mode"
                                         value="random_all" <?php echo ( $play_mode == 'random_all' ? 'checked' : '' ); ?>/>
                        </td>
                        <td>
                            <label for="war_sdy_pl_play_mode_random_all" style="margin-right: 1em;">All soundtracks randomly played</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio"
                                         id="war_sdy_pl_play_mode_random_one"
                                         name="war_sdy_pl_play_mode"
                                         value="random_one" <?php echo ( $play_mode == 'random_one' ? 'checked' : '' ); ?>/>
                        </td>
                        <td>
                            <label for="war_sdy_pl_play_mode_random_one" style="margin-right: 1em;">One soundtrack randomly choosen and played</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio"
                                         id="war_sdy_pl_play_mode_selected"
                                         name="war_sdy_pl_play_mode"
                                         value="selected" <?php echo ( $play_mode == 'selected' ? 'checked' : '' ); ?>/>
                        </td>
                        <td>
                            <label for="war_sdy_pl_play_mode_selected" style="margin-right: 1em;">Yellow selected soundtrack only</label>
                            <span id="war_sdy_pl_play_mode_selected_comment"></span>
                        </td>
                    </tr>
                </table>
            </td>
		</tr>
		<tr>
			<th class="war_sdy_pl">
				<label for="war_sdy_pl_loop">Loop</label>
			</th>
			<td>
				<input type="radio"
							 id="war_sdy_pl_loop_yes"
							 name="war_sdy_pl_loop"
							 value="yes" <?php echo ( $audio_loop == 'yes' ? 'checked' : '' ); ?>/>
				<label for="war_sdy_pl_loop_yes" style="margin-right: 1em;">Yes</label>

				<input type="radio"
							 id="war_sdy_pl_loop_no"
							 name="war_sdy_pl_loop"
							 value="no" <?php echo ( $audio_loop == 'no' ? 'checked' : '' ); ?>/>
				<label for="war_sdy_pl_loop_no" style="margin-right: 1em;">No</label>
			</td>
		</tr>
	</table>
  </div>

  <div id="war_sdy_pl_tab_panel_content">
      <p class="war_bold war_bigger">Playlist Soundtracks</p>
      <p>To display the playlist on the front-end use the short code: <span class="war_bold">[sdy_pl playlist]</span></p>
		<table class="form-table war_sdy_pl war_sdy_pl_form_table">
		<tr>
			<th class="war_sdy_pl">
				<label>Playlist</label>
			</th>
			<td>
				<div style="margin: 5px 5px 5px 0px">
					<input type="radio"
								 id="war_sdy_pl_radio_soundtracks_default"
								 name="war_sdy_pl_soundtracks_def"
								 value="default" checked/>
					<label for="war_sdy_pl_radio_soundtracks_default" style="margin-right: 1em;">Default</label>
                    <span class="war_comment">Need a page/post specific playlist? Upgrade to:
                    <button id="war_sdy_pl_pro_buy" type="button" class="war_sdy_pl" style="margin-left: 5px;">Soundy Audio Playlist PRO</button></span>
				</div>
			</td>
		</tr>
		<tr>
			<th class="war_sdy_pl">
				<label>Playlist Title</label>
			</th>
			<td>
				<input id="war_sdy_pl_playlist_title"
				       name="war_sdy_pl_playlist_title"
				       type="text"
				       value="<?php echo ( $soundtracks == 'default' ? $playlist_title_default : $playlist_title ); ?>"
				       class="war_sdy_pl_txt_input" />
				<span id="war_sdy_pl_playlist_title_default" style="display: none;"><?php echo $playlist_title_default; ?></span>
				<span id="war_sdy_pl_playlist_title_custom"  style="display: none;"><?php echo $playlist_title; ?></span>
				</td>
		</tr>
		<tr>
			<th class="war_sdy_pl">
				<label>Soundtracks</label>
			</th>
			<td>
				<?php
					$this->sdy_pl->add_field_soundtracks( true, $soundtracks, $soundtracks_default );
					$this->sdy_pl->add_field_soundtrack_buttons( true, $yellow_select_id );
				?>
			</td>
		</tr>
		<tr>
			<th>
				<label>Blue Selected Soundtrack Data</label>
			</th>
			<td>
				<?php $this->sdy_pl->add_field_audio_file_URL( true ); ?>
			</td>
		</tr>
		</table>
  </div>

  <div id="war_sdy_pl_tab_panel_columns">
      <p class="war_bold war_bigger">Display</p>
      <p>To display the playlist on the front-end use the short code: <span class="war_bold">[sdy_pl playlist]</span></p>
      <table class="form-table war_sdy_pl war_sdy_pl_form_table">
          <tr>
              <th class="war_sdy_pl">
                  <label for="war_sdy_pl_scrolling_enable">Scrolling</label>
              </th>
              <td>
                  <div style="margin-bottom: 10px; margin-top: 5px;">
                      <input type="radio"
                             id="war_sdy_pl_scrolling_enable_yes"
                             name="war_sdy_pl_scrolling_enable"
                             value="yes" <?php echo ( $scrolling_enable == 'yes' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_scrolling_enable_yes" style="margin-right: 1em;">Yes</label>

                      <input type="radio"
                             id="war_sdy_pl_scrolling_enable_no"
                             name="war_sdy_pl_scrolling_enable"
                             value="no" <?php echo ( $scrolling_enable == 'no' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_scrolling_enable_no" style="margin-right: 1em;">No</label>
                  </div>

                  <?php $this->sdy_pl->add_field_scrolling( 'meta_box' ); ?>
              </td>
          </tr>
          <tr>
              <th class="war_sdy_pl">
                  <label for="war_sdy_pl_outer_box_width">Outer Box Width</label>
              </th>
              <td>
                  <div style="margin-bottom: 10px; margin-top: 5px;">
                      <input type="radio"
                             id="war_sdy_pl_outer_box_width_default"
                             name="war_sdy_pl_outer_box_width"
                             value="default" <?php echo ( $outer_box_width == 'default' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_outer_box_width_default" style="margin-right: 1em;">Default</label>

                      <input type="radio"
                             id="war_sdy_pl_outer_box_width_custom"
                             name="war_sdy_pl_outer_box_width"
                             value="custom" <?php echo ( $outer_box_width == 'custom' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_outer_box_width_custom" style="margin-right: 1em;">Custom</label>
                  </div>

                  <?php $this->sdy_pl->add_field_outer_box_width( 'meta_box' ); ?>
              </td>
          </tr>
          <tr>
              <th class="war_sdy_pl">
                  <label for="war_sdy_pl_font_size">Font Size</label>
              </th>
              <td>
                  <div style="margin-bottom: 10px; margin-top: 5px;">
                      <input type="radio"
                             id="war_sdy_pl_font_size_default"
                             name="war_sdy_pl_font_size"
                             value="default" <?php echo ( $font_size == 'default' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_font_size_default" style="margin-right: 1em;">Default</label>

                      <input type="radio"
                             id="war_sdy_pl_font_size_custom"
                             name="war_sdy_pl_font_size"
                             value="custom" <?php echo ( $font_size == 'custom' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_font_size_custom" style="margin-right: 1em;">Custom</label>
                  </div>

                  <?php $this->sdy_pl->add_field_font_size( 'meta_box' ); ?>
              </td>
          </tr>
          <tr>
              <th class="war_sdy_pl">
                  <label for="war_sdy_pl_column_order">Column Order</label>
              </th>
              <td>
                  <div style="margin-bottom: 10px; margin-top: 5px;">
                      <input type="radio"
                             id="war_sdy_pl_column_order_default"
                             name="war_sdy_pl_column_order"
                             value="default" <?php echo ( $column_order == 'default' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_column_order_default" style="margin-right: 1em;">Default</label>

                      <input type="radio"
                             id="war_sdy_pl_column_order_custom"
                             name="war_sdy_pl_column_order"
                             value="custom" <?php echo ( $column_order == 'custom' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_column_order_custom" style="margin-right: 1em;">Custom</label>
                  </div>

                  <?php $this->sdy_pl->add_field_columns_order( $column_order, 'meta_box' ); ?>
              </td>
          </tr>
          <tr>
              <th class="war_sdy_pl">
                  <label for="war_sdy_pl_enable">Column Layout</label>
              </th>
              <td>
                  <div style="margin-bottom: 10px; margin-top: 5px;">
                      <input type="radio"
                             id="war_sdy_pl_column_layout_default"
                             name="war_sdy_pl_column_layout"
                             value="default" <?php echo ( $column_layout == 'default' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_column_layout_default" style="margin-right: 1em;">Default</label>

                      <input type="radio"
                             id="war_sdy_pl_column_layout_custom"
                             name="war_sdy_pl_column_layout"
                             value="custom" <?php echo ( $column_layout == 'custom' ? 'checked' : '' ); ?>/>
                      <label for="war_sdy_pl_column_layout_custom" style="margin-right: 1em;">Custom</label>
                  </div>

                  <?php $this->sdy_pl->add_field_columns_layout( $column_layout, 'meta_box' ); ?>
              </td>
          </tr>
          <tr>
              <td style="padding: 0;" colspan="2">
                  <div class="war_bold" style="margin-bottom: 6px;">Preview</div>
                  <?php sdy_pl_playlist( 'meta_box', 'columns' ); ?>
              </td>
          </tr>
      </table>
  </div>

  <div id="war_sdy_pl_tab_panel_shortcodes">
      <p class="war_bold war_bigger">Short Codes</p>
      <table class="war_sdy_pl_shortcodes">
          <tr>
              <th>
                  Shortcode
              </th>
              <td class="war_bold">
                  Description
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl playlist]
              </th>
              <td>
                  Inserts the playlist associated with this page or post.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl playlist_title]
              </th>
              <td>
                  Inserts the title of the playlist associated with this page or post.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl number_of_tracks]
              </th>
              <td>
                  Inserts the number of soundtracks of the playlist associated with this page or post.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl playlist_status]
              </th>
              <td>
                  Inserts the status of the playlist associated with this page or post. The status can be "Playing" or "Paused".
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl button_play_pause]
              </th>
              <td>
                  Inserts the Play/Pause button.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl button_previous]
              </th>
              <td>
                  Inserts the Previous button.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl button_next]
              </th>
              <td>
                  Inserts the Next button.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl title]
              </th>
              <td>
                  Inserts the title of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl artist]
              </th>
              <td>
                  Inserts the name of the artist of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl composer]
              </th>
              <td>
                  Inserts the name of the composer of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl volume]
              </th>
              <td>
                  Inserts the volume of the playing soundtrack in percentage format. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl volume_slider]
              </th>
              <td>
                  Inserts the volume of the playing soundtrack in percentage format. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl duration]
              </th>
              <td>
                  Inserts the duration of the playing soundtrack in hh:mm:ss format. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl time]
              </th>
              <td>
                  Inserts the current elapsed playing time of the playing soundtrack in hh:mm:ss format. Updated every second.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl time_slider]
              </th>
              <td>
                  Inserts a slider indicating the progression od the playing soundtrack.
                  The slider can also be used to position the playback at any time point. Updated every second.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl id]
              </th>
              <td>
                  Inserts the ID of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl index]
              </th>
              <td>
                  Inserts the index of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl url]
              </th>
              <td>
                  Inserts the url of the playing soundtrack. Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl type]
              </th>
              <td>
                  Inserts the type of the playing soundtrack. The value inserted can be "audio/mpeg", "audio/ogg" or "audio/wav". Updated when soundtrack changes.
              </td>
          </tr>
          <tr>
              <th>
                  [sdy_pl speaker_icon]
              </th>
              <td>
                  Inserts the speaker icon.
              </td>
          </tr>
      </table>
  </div>
</div>

<!--
	<script>
		function war_show()
		{
			var src = jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'src' );
			var type = jQuery( '#war_sdy_pl_audio_player_source' ).attr( 'type' );
			
			alert( 'src = ' + src + ' \ntype = ' + type );
		}
	</script>
	<h1 onclick="war_show();">CLICK</h1>
-->
