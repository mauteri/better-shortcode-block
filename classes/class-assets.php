<?php
namespace BetterShortcodeBlock;

class Assets {

	public function __construct() {
		$this->setup_hooks();
	}

	protected function setup_hooks(): void {
		add_action( 'enqueue_block_editor_assets', [ $this, 'block_editor_assets' ] );
	}

	public function block_editor_assets(): void {
		$path  = BETTER_SHORTCODE_BLOCK_PATH . '/assets/build/';
		$build = BETTER_SHORTCODE_BLOCK_URL . 'assets/build/';
		$asset = require_once $path . 'index.asset.php';

		wp_enqueue_script( 'better-shortcode-block', $build . 'index.js', $asset['dependencies'], $asset['version'], true );
	}

}
