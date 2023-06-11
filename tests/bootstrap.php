<?php
/**
 * PHPUnit bootstrap file.
 *
 * @package Better_Shortcode_Block
 * @subpackage Tests
 */

// phpcs:disable Squiz.Commenting.FileComment.Missing

require_once __DIR__ . '/../vendor/autoload.php';

$better_shortcode_block_bootstrap_instance = PMC\Unit_Test\Bootstrap::get_instance();

tests_add_filter(
	'plugins_loaded',
	function() {
		// Manually load our plugin without having to setup the development folder in the correct plugin folder.
		require_once __DIR__ . '/../better-shortcode-block.php';
	}
);

$better_shortcode_block_bootstrap_instance->start();
