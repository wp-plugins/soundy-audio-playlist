<?php

class WarSoundyAudioPlaylistDesignerPlayPause
{
	private $zoom_user                     = 50;
	private $outline_width                 = 11;
	private $round_button                  = 20;
	private $round_shape                   = 50;
	private $scale_shape                   = 50;
	private $button_size                   = 64;
	private $transparency_button           = 0;
	private $transparency_shape            = 0;
	private $bind_shape_and_outline_colors = 'yes';
	private $color_button_normal_fill      = '#00b3ff';
	private $color_shape_normal_fill       = '#0000bf';
	private $color_button_hover_fill       = '#cc00cc';
	private $color_shape_hover_fill        = '#0000bf';
	private $color_outline_normal_stroke   = '#cc00cc';
	private $color_outline_hover_stroke    = '#00b3ff';
	private $page_preview_url              = '';
	private $sdy_pl; // WarSoundyAudioPlaylist Object

	public function __construct( $sdy_pl_object )
	{
		$this->sdy_pl = $sdy_pl_object;
		
	    if( ( isset( $_GET['page'] ) && ( $_GET['page'] == 'sdy_pl' ) ) )
        {
		    add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
	    }
	}
	
	public function admin_scripts()
	{
		wp_register_script( 'sdy_pl-designer-play-pause', $this->sdy_pl->plugin_url . '/js/designer-play-pause.js' );
		wp_enqueue_script( 'sdy_pl-designer-play-pause' );

		wp_register_style( 'sdy_pl-designer-play-pause', $this->sdy_pl->plugin_url . '/css/style-designer-play-pause.css' );
		wp_enqueue_style( 'sdy_pl-designer-play-pause' );
	}
		
	public function activate()
	{
		add_option( 'war_sdy_pl_design_pp_color_button_normal_fill',      $this->color_button_normal_fill );
		add_option( 'war_sdy_pl_design_pp_color_button_hover_fill',       $this->color_button_hover_fill );
		add_option( 'war_sdy_pl_design_pp_color_shape_normal_fill',       $this->color_shape_normal_fill );
		add_option( 'war_sdy_pl_design_pp_color_shape_hover_fill',        $this->color_shape_hover_fill );
		add_option( 'war_sdy_pl_design_pp_color_outline_normal_stroke',   $this->color_outline_normal_stroke );
		add_option( 'war_sdy_pl_design_pp_color_outline_hover_stroke',    $this->color_outline_hover_stroke );
		add_option( 'war_sdy_pl_design_pp_percent_transparency_button',   $this->transparency_button );
		add_option( 'war_sdy_pl_design_pp_percent_transparency_shape',    $this->transparency_shape );
		add_option( 'war_sdy_pl_design_pp_percent_outline_width',         $this->outline_width );
		add_option( 'war_sdy_pl_design_pp_percent_round_button',          $this->round_button );
		add_option( 'war_sdy_pl_design_pp_percent_round_shape',           $this->round_shape );
		add_option( 'war_sdy_pl_design_pp_percent_scale_shape',           $this->scale_shape );
		add_option( 'war_sdy_pl_design_pp_pixel_button_size',             $this->button_size );
		add_option( 'war_sdy_pl_design_pp_page_preview_url', 			  $this->page_preview_url );
		add_option( 'war_sdy_pl_design_pp_bind_shape_and_outline_colors', $this->bind_shape_and_outline_colors );
	}
		
	public function add_settings_section()
	{
		add_settings_section(
    	    'war_sdy_pl_settings_section_designer_play_pause',
            'Play/Pause Button Designer<span id="war_sdy_pl_design_pp_canvas_marker_top"></span>',
            array( $this, 'display_settings_header' ),
            'sdy_pl'
        );

        $this->add_setting( 'Background Normal Color', 'button_normal_fill',    'color' );
        $this->add_setting( 'Shape Normal Color',      'shape_normal_fill',     'color' );
        $this->add_setting( 'Background Hover Color',  'button_hover_fill',     'color' );
        $this->add_setting( 'Shape Hover Color',       'shape_hover_fill',      'color'  );
        $this->add_bind_shape_and_outline_colors();
        $this->add_setting( 'Outline Normal Color',    'outline_normal_stroke', 'color' );
        $this->add_setting( 'Outline Hover Color',     'outline_hover_stroke',  'color'  );
        $this->add_setting( 'Outline Width',           'outline_width',         'percent' );
        $this->add_setting( 'Round Button',            'round_button',          'percent' );
        $this->add_setting( 'Round Shape',             'round_shape',           'percent' );
        $this->add_setting( 'Scale Shape',             'scale_shape',           'percent' );
        $this->add_setting( 'Button Transparency',     'transparency_button',   'percent' );
        $this->add_setting( 'Zoom',                    'zoom_user',             'percent', 'no', $this->zoom_user );
        $this->add_setting( 'Button Size',             'button_size',           'pixel' );
        $this->add_preview_here();
        $this->add_preview_in_context();
        $this->add_use_designer_button();

        register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_img_data_play_normal' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_img_data_play_hover' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_img_data_pause_normal' );
        register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_img_data_pause_hover' );
	}

	public function add_setting( $label, $name, $type, $is_option = 'yes', $value = '' )
	{
		if( $is_option == 'yes' )
		{
			register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_' . $type . '_' . $name );
		}
		add_settings_field(
		'war_sdy_pl_design_pp_' . $type . '_' . $name,
		$label,
		array( $this, 'add_setting_' . $type ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_play_pause',
		array( $name, $value )
		);
	}

	public function add_preview_in_context()
	{
		register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_page_preview_url' );
		add_settings_field(
		'war_sdy_pl_design_pp_page_preview_url',
		'Preview in Context',
		array( $this, 'display_preview_in_context' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_play_pause'
		);
	}
	
	public function display_preview_in_context()
	{
		?>
		<span id="war_sdy_pl_design_pp_page_preview_label">Page:</span>
		<select id="war_sdy_pl_design_pp_page_preview_url"
		        name="war_sdy_pl_design_pp_page_preview_url">
 			<option value="/">Select Page</option> 
		 	<?php
		 	$page_preview_url = get_option( 'war_sdy_pl_design_pp_page_preview_url' );
		  $pages = get_pages(); 
		  foreach ( $pages as $page ) 
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
		  ?>
		</select>
		<br>
		<button id="war_sdy_pl_design_pp_button_preview_in_context"
			      type="button"
		        class="war_sdy_pl_design_pp">Preview</button>
		<?php    
	}

	public function add_preview_here()
	{
		add_settings_field(
		'war_sdy_pl_design_pp_preview_here',
		'Button Preview',
		array( $this, 'display_preview_here' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_play_pause'
		);
	}
	

	public function display_preview_here()
	{
		?>
		<button id="war_sdy_pl_design_pp_button_preview_here"
			      type="button"
			      style="vertical-align: top;"
		        class="war_sdy_pl_design_pp">Refresh</button>
		<img id="war_sdy_pl_design_pp_img_preview_here">
		<?php    
	}		

	public function add_use_designer_button()
	{
		add_settings_field(
		'war_sdy_pl_design_pp_use_designer_button',
		'Use Designer Button',
		array( $this, 'display_use_designer_button' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_play_pause'
		);
	}
	

	public function display_use_designer_button()
	{
		?>
		<input type="checkbox" 
		       value="yes"
		       id="war_sdy_pl_design_pp_use_designer_button" />
		Use button images defined in this P/P Designer
		<div id="war_sdy_pl_design_pp_canvas_marker_left" style="display: inline; width: 1; height: 1;"></div>
		<?php    
	}


	public function add_bind_shape_and_outline_colors()
	{
		register_setting( 'war_sdy_pl', 'war_sdy_pl_design_pp_bind_shape_and_outline_colors' );
		add_settings_field(
		'war_sdy_pl_design_pp_bind_shape_and_outline_colors',
		'Outline Color = <br>Shape Color',
		array( $this, 'display_bind_shape_and_outline_colors' ),
		'sdy_pl',
		'war_sdy_pl_settings_section_designer_play_pause'
		);
	}
	

	public function display_bind_shape_and_outline_colors()
	{
		?>
		<input type="checkbox" 
		       value="yes"
		       id="war_sdy_pl_design_pp_bind_shape_and_outline_colors"
		       name="war_sdy_pl_design_pp_bind_shape_and_outline_colors"
		       <?php echo get_option( 'war_sdy_pl_design_pp_bind_shape_and_outline_colors' ) == 'yes' ? 'checked' : ''; ?> />
		Bind outline color to shape color
		<?php    
	}
	
	public function display_settings_header() 
	{
		?>
        In this tab you can design your own Play/Pause button so that it precisely fits
        <br>
        your website design.

		<canvas id="war_canvas" width="100px" height="100px"></canvas>
		<canvas id="war_canvas_save" width="100px" height="100px"></canvas>
		<canvas id="war_canvas_final" width="100px" height="100px"></canvas>
		<?php     
	}
	
	public function add_setting_color( $args )
	{
		$name = $args[ 0 ];
		?>
		<div class="war_sdy_pl_design_pp_color_rgb_label">Hex:</div>
		<input type="text"
					 class="war_sdy_pl_design_pp_color"
		       value="<?php echo get_option( 'war_sdy_pl_design_pp_color_' . $name ); ?>"
		       name="war_sdy_pl_design_pp_color_<?php echo $name; ?>"
		       id="war_sdy_pl_design_pp_color_<?php echo $name; ?>" />
		<span id="war_sdy_pl_design_pp_color_<?php echo $name; ?>_validation_error"
			    class="war_sdy_pl_design_pp_validation_error"></span>
		<br>
		<div class="war_sdy_pl_design_pp_color_rgb_label war_sdy_pl_design_pp_color_red">Red:</div>
		<div id="war_sdy_pl_design_pp_slider_color_<?php echo $name; ?>_red"
			   class="war_sdy_pl_design_pp_slider_red"></div>
		<input type="text"
					 class="war_sdy_pl_design_pp_rgb_255 war_sdy_pl_design_pp_color_red war_sdy_pl_design_pp_color_border_red"
		       id="war_sdy_pl_design_pp_color_<?php echo $name; ?>_red" /> <span class="war_sdy_pl_design_pp_comment">/ 255</span>
		<br>
		<div class="war_sdy_pl_design_pp_color_rgb_label war_sdy_pl_design_pp_color_green">Green:</div>
		<div id="war_sdy_pl_design_pp_slider_color_<?php echo $name; ?>_green"
			   class="war_sdy_pl_design_pp_slider_green"></div>
		<input type="text"
					 class="war_sdy_pl_design_pp_rgb_255 war_sdy_pl_design_pp_color_green war_sdy_pl_design_pp_color_border_green"
		       id="war_sdy_pl_design_pp_color_<?php echo $name; ?>_green" /> <span class="war_sdy_pl_design_pp_comment">/ 255</span>
		<br>
		<div class="war_sdy_pl_design_pp_color_rgb_label war_sdy_pl_design_pp_color_blue">Blue:</div>
		<div id="war_sdy_pl_design_pp_slider_color_<?php echo $name; ?>_blue"
			   class="war_sdy_pl_design_pp_slider_blue"></div>
		<input type="text"
					 class="war_sdy_pl_design_pp_rgb_255 war_sdy_pl_design_pp_color_blue war_sdy_pl_design_pp_color_border_blue"
		       id="war_sdy_pl_design_pp_color_<?php echo $name; ?>_blue" /> <span class="war_sdy_pl_design_pp_comment">/ 255</span>
		<?php     
	}
	
	public function add_setting_percent( $args )
	{
		$name  = $args[ 0 ];
		$value = $args[ 1 ];
		if( $value == '' )
		{
			$value = ( int )get_option( 'war_sdy_pl_design_pp_percent_' . $name );
		}
		if( $value <  10 ) $value = '0' . $value;
		if( $value < 100 ) $value = '0' . $value;
		?>
		<div id="war_sdy_pl_design_pp_slider_percent_<?php echo $name; ?>"
			   class="war_sdy_pl_design_pp_slider"></div>
		<input type="text"
					 class="war_sdy_pl_design_pp_percent"
		       value="<?php echo $value; ?>"
		       name="war_sdy_pl_design_pp_percent_<?php echo $name; ?>"
		       id="war_sdy_pl_design_pp_percent_<?php echo $name; ?>" /> <span class="war_sdy_pl_design_pp_comment">%</span>
		<span id="war_sdy_pl_design_pp_percent_<?php echo $name; ?>_validation_error"
			    class="war_sdy_pl_design_pp_validation_error"></span>
		<?php     
	}

	public function add_setting_pixel( $args )
	{
		$name = $args[ 0 ];
		$value = ( int )get_option( 'war_sdy_pl_design_pp_pixel_' . $name );
		if( $value <  10 ) $value = '0' . $value;
		if( $value < 100 ) $value = '0' . $value;
		?>
		<div id="war_sdy_pl_design_pp_slider_pixel_<?php echo $name; ?>"
			   class="war_sdy_pl_design_pp_slider"></div>
		<br>
		<input type="text"
					 class="war_sdy_pl_design_pp_pixel"
		       value="<?php echo $value; ?>"
		       name="war_sdy_pl_design_pp_pixel_<?php echo $name; ?>"
		       id="war_sdy_pl_design_pp_pixel_<?php echo $name; ?>" />
		x
		<input type="text"
					 class="war_sdy_pl_design_pp_pixel"
		       value="<?php echo $value; ?>"
		       id="war_sdy_pl_design_pp_pixel_<?php echo $name; ?>_2" />
		/ 400 x 400 pixels
		<span id="war_sdy_pl_design_pp_pixel_<?php echo $name; ?>_validation_error"
			    class="war_sdy_pl_design_pp_validation_error"></span>
		<br>
		<input type="checkbox" 
		       id="war_sdy_pl_design_pp_view_real_size" />
		<label for="war_sdy_pl_design_pp_view_real_size">View buttons in real size</label>
  	
		<input type="hidden"
		       id="war_sdy_pl_design_pp_img_data_play_normal"
		       name="war_sdy_pl_design_pp_img_data_play_normal" />
		       
		<input type="hidden"
		       id="war_sdy_pl_design_pp_img_data_play_hover"
		       name="war_sdy_pl_design_pp_img_data_play_hover" />
		
		<input type="hidden"
		       id="war_sdy_pl_design_pp_img_data_pause_normal"
		       name="war_sdy_pl_design_pp_img_data_pause_normal" />
		
		<input type="hidden"
		       id="war_sdy_pl_design_pp_img_data_pause_hover"
		       name="war_sdy_pl_design_pp_img_data_pause_hover" />
		<?php
	}
}
?>