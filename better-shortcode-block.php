<?php
/**
 * Plugin Name: Better Shortcode Block
 * Plugin URI: https://github.com/mauteri/better-shortcode-block
 * Description: A better version of the Shortcode Block
 * Requires at least: 5.8
 * Requires PHP: 5.6
 * Version: 0.1
 * Author: Mike Auteri
 * Text Domain: better-shortcode-block
 *
 * @package better-shortcode-block
 */

define( 'BETTER_SHORTCODE_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'BETTER_SHORTCODE_BLOCK_PATH', __DIR__ );

require_once 'includes/classes/class-assets.php';
require_once 'includes/classes/class-rest-api.php';
require_once 'includes/classes/class-setup.php';

new BetterShortcodeBlock\Setup();
