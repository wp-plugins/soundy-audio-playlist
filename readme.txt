=== Soundy Audio Playlist ===
Contributors: bducouedic
Tags: audio, sound, music, playlist, background, soundtrack, background sound, background audio, background music, posts, pages
Requires at least: 3.6
Tested up to: 3.9
Stable tag: 1.0
License: GPL2
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: http://webartisan.ch/en/products/soundy-audio-playlist/free-wordpress-plugin/#war_donate

Soundy Audio Playlist allows any page or post to play and display an audio playlist.

== Description ==

The **Soundy Audio Playlist** plugin allows any page or post to play and display an audio playlist.

This Soundy plugin can be used like its Soundy brother, Soundy Background Music, to have pages or post playing an audio playlist in the background instead of a single soundtrack. However, this plugin can do much more than this: by means of the [sdy_pl playlist] short code, the playlist can be displayed anywhere in the page content. The page visitors can then interact with this playlist and control their audio playback experience with the following user interface features:

= Front-End Features =

* Play/Pause button
* Audio volume control with slider
* Soundtrack time positioning with slider
* Next and Previous buttons
* Arrow key soundtrack selection
* Mouse click soundtrack selection
* Mouse double-click Play/Pause
* Display of title, artist and composer of current playing soundtrack

* In the free version of the plugin, the administrator can set up and maintain an audio playlist which can then be played and displayed by any page or post.
* In the PRO version of the plugin, each page or post can have its own playlist set up and maintained by its author.

The soundtracks are played by means of the HTML 5 audio tag. This way, the plugin is compatible with all modern user devices (smartphones, tablets, laptops and desktops of all vendors).

An author can have the playlist played by his page without displaying the playlist. He can have the Play/Pause button inserted or not. Or he can have the playlist with its full user interface displayed.

Defaults can be set by the administrator in the settings page of the plugin.

Specific post and page plugin settings can be configured by the authors in the Edit Page and Edit Post pages.

In the plugin settings page, an audio playlist can be set per default.

The audio tracks can be anywhere on the web as they are specified with their URLs. They can also be uploaded in the media library of the WP site.

A play and pause button image can be uploaded by the administrator to replace the default one and can be positioned anywhere.

This Play/Pause button can be positioned in a corner of the document or in a corner of the window. It can also be positioned with a template tag typically in the document header or with a short code in the content.

= Back-End Features =

* Web module to maintain the playlist soundtracks (add, delete, modify, import, clear, change order, undo ).
* Playlist Designer: web module in the plugin settings page to help the administrator design the playlist display and have it fit his website design.
* Playlist appearance can also be controlled with CSS additionally to playlist designer.
* Playlist Column Customization: order, show/hide, width in percent or pixels can be conveniently set by the administrator and the authors.
* Play/Pause Button Designer: web module in the plugin settings page to help the administrator design the Play/Pause button and have it fit his website design.
* Administrator can choose to upload his own Play/Pause button images instead of using the Play/Pause button designer.
* Play/Pause button can be positioned in any corner of the browser window or the page. Scrolling of the button with the content can be controlled.
* Play/Pause button can also be inserted with short code or template tag.
* Playing Options can be set by authors like random or sequential playing, autoplay, audio repeat loop, etc.
* Short Codes can be used by authors to insert User Interface elements like Volume Slider Control, Time Slider Control, Previous/Next button, etc.
* Last but not least, the [sdy_pl playlist] short code can be used by authors to embed and display the playlist with full audio user interface in the middle of the page content.
* The playlist can also be played by a page with different playing options without being inserted with the playlist short code.

= Docs & Support =

You can find [Tutorial](http://www.webartisan.ch/en/products/sdy_pl/#war_tutorial), [FAQ](http://www.webartisan.ch/en/products/sdy_pl/#war_FAQ), [Examples](http://www.webartisan.ch/en/products/sdy_pl/#war_examples) and more detailed information about **Soundy Audio Playlist** plugin on [WebArtisan.ch](http://www.webartisan.ch/en/products/sdy_pl/). If you were unable to find the answer to your question on the FAQ or in any of the documentation, you should check [Soundy's Support Forum](http://wordpress.org/support/plugin/soundy-audio-playlist) on WordPress.org. If you can't locate any topics that pertain to your particular issue, post a new topic for it.
**Soundy Audio Playlist** Plugin Home Page: [www.webartisan.ch/en/products/sdy_pl](http://www.webartisan.ch/en/products/sdy_pl/)

== Installation ==

* In the Admin area (the back-end) of your WordPress Web Site, go to Plugins > Add New.
* Enter **Soundy** in the search field.
* **Soundy Audio Playlist** appears.
* Click on "Install Now".
* Click on "Activate Plugin".
* To let a page or post play a soundtrack:

1. Go into the *Edit Page* or *Edit Post* tool of any page in the Admin area.
1. Set the option *Enable Soundy* to *Yes* in the Soundy Audio Playlist meta box and update the page.
1. The page will then play the default playlist when displayed.
1. To have he playlist displayed in the content, insert the [sdy_pl playlist] short code anywhere in the content of this page.

* To set up plugin defaults, go to Settings > **Soundy Audio Playlist** in the admin area and fill out the input fields.
* For help, here is a [tutorial](http://www.webartisan.ch/en/products/sdy_pl/#wa_tutorial).
* Happy Soundy Music !

= Updates =

* After an update of **Soundy Audio Playlist** plugin you must clear the cache of your browser for the Settings > Soundy Audio Playlist page as well as the Edit Post and Edit Page pages. This is because cached Javascript and CSS files are modified at each Soundy update.

== Frequently Asked Questions ==

= General Questions =

1. **Is it possible to have different playlists for different posts and pages ?**
Yes, the PRO version of the plugin allows authors to set up and maintain playlists on a per post or per page basis.

1. **What kind of audio files can be used with Soundy Plugin ?**  
The audio files must be in the format MP3, OGG or WAV.

1. **Is Soundy Plugin compatible with iphone, ipad and smartphones in general ?**  
Yes it is, as the plugin uses the HTML5 audio tag. There is just one issue with ipod, iphone and ipad (IOS Operating System): Autoplay option is deactivated by Apple on this operating system.

1. **Is it possible to position the Play/Pause button anywhere in the page or post header ?**  
Yes, this can be done with the sdy_pl_button_play_pause() template tag.

1. **Is it possible to position the Play/Pause button anywhere in the content of a page or post ?**  
Yes, this can be done with the [sdy_pl button_play_pause] shortcode.

1. **Is it possible to adapt the Playlist look & feel to my website ?**
Yes, you can use Soundy's Playlist Designer as well as CSS to customize the appearance of the playlists.

1. **Is it possible to modify the Play/Pause button look & feel ?**  
Yes, you can upload and set up your own button images or you can use Soundy's Play/Pause Button Designer.

1. **Can I really put my audio files anywhere on the web ?**  
Yes, you can put your audio files anywhere on any cloud or website, except one place: you should not put your audio files in the soundy-audio-playlist plugin directory (or below). If you do, you will loose your files the next time you will install a new version of Soundy. The update process deletes this folder and replaces it with a new one. If you want to store the audio files on your WordPress site, the best place to do so is the media library (/wp-content/uploads/...).

= Support Questions =

1. **After an update of Soundy, my soundtracks are not played anymore and my custom Play/Pause button images are broken. What happened ?**
As mentioned in the previous paragraph, the reason might be that you had uploaded your audio files and button images under the soundy-audio-playlist plugin directory. This directory is erased and replaced at each update. Do not add any file in it. Again, the prefered location for such files is the WordPress media library.

1. **Is it advised to put my audio files on a separate storage cloud ?**
Yes it is, especially if you have a lot of traffic on your website. Putting your audio files on a separate storage cloud will release the load on your website and improve page load response time in your visitor's browsers. There is a lot of Cloud Storage Providers out there. Here is a list of such providers: [Audio Hostings - free audio hosting sites](http://www.audiohostings.com/). Your hosting provider might also offer cloud storage.

1. **On WP front-end, Soundy's Play/Pause button does not respond correctly. What's the problem ?**
Soundy needs jQuery 1.10.2 which is the default jQuery library of the last versions of WordPress. However some themes load their own jQuery library. If this library is not up-to-date, Soundy's Play/Pause button gets into troubles.
Using WordPress Default jQuery library is actually what Soundy does and this is what your theme also should do instead of loading its own old jQuery version. In Soundy Version 2.0 and later, you can now set the variable $use_own_jquery_lib_on_front_end to true in the main Soundy PHP file: soundy.php. To make this modification, go to the plugins page, click on the Edit link of the Soundy plugin, look for the variable and set it to true. This should fix the problem.

1. **I get a PHP parsing error when activating the plugin. What's the problem ?**
Soundy needs PHP 5.3 or a higher version. If your PHP parser is not up-to-date, Soundy gets into troubles.
PHP 5.3.0 has been released in June 2009. Today’s version is 5.5.12. (sources: [PHP Releases](http://php.net/releases/)).

== Screenshots ==

1. **Default Audio Track Settings**
1. **Play/Pause Button Settings**
1. **Play/Pause Button Corner Settings**
1. **Play/Pause Button Static Settings**
1. **Page or Post Soundy Metabox**

== Changelog ==

= 1.0 =
* First Version

== Upgrade Notice ==