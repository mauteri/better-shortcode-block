<?php
/**
 * Class is responsible for executing plugin setups.
 *
 * @package Better_Shortcode_Block
 */

namespace Better_Shortcode_Block;

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
