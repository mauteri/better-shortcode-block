<?php
/**
 * @package better-shortcode-block
 */

namespace BetterShortcodeBlock;

/**
 * Class Setup.
 */
class Setup {

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->instantiate();
		$this->setup_hooks();
	}

	/**
	 * Instantiate classes.
	 *
	 * @return void
	 */
	protected function instantiate() {
		new Assets();
		new Rest_API();
	}

	/**
	 * Setup actions and filters.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	public function register_block() {
		register_block_type(
			BETTER_SHORTCODE_BLOCK_PATH,
			array(
				'render_callback' => array( $this, 'render_shortcode' ),
			)
		);
	}

	public function render_shortcode( $attributes, $content ) {
		return wpautop( $content );
	}

}
