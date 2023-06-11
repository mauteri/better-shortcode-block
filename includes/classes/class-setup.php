<?php
/**
 * Class is responsible for executing plugin setups.
 *
 * @package BetterShortcodeBlock
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
