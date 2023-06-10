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

}
