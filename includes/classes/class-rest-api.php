<?php
/**
 * @package better-shortcode-block
 */

namespace BetterShortcodeBlock;

/**
 * Class Rest_API
 */
class Rest_API {

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Setup actions and filters.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
	}

	/**
	 * Register API endpoints.
	 *
	 * @return void
	 */
	public function register_endpoints() {
		$routes = $this->get_routes();

		foreach ( $routes as $route ) {
			register_rest_route(
				'better-shortcode-block',
				sprintf( '/%s', $route['route'] ),
				$route['args']
			);
		}
	}

	/**
	 * Create routes.
	 *
	 * @return array[]
	 */
	protected function get_routes() {
		return array(
			array(
				'route' => 'shortcode',
				'args'  => array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'shortcode' ),
					'permission_callback' => '__return_true',
					'args'                => array(
						'_wpnonce'   => array(
							/**
							 * WordPress will verify the nonce cookie, we just want to ensure nonce was passed as param.
							 *
							 * @see https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
							 */
							'required' => false,
						),
						'shortcode' => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate' )
						),
					),
				),
			),
		);
	}

	/**
	 * Validate shortcode.
	 *
	 * @param $shortcode
	 *
	 * @return bool
	 */
	public function validate( $shortcode ) {
		return ! empty( $shortcode );
	}

	/**
	 * Endpoint to return shortcodes.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response
	 */
	public function shortcode( \WP_REST_Request $request ) {
		$params     = $request->get_params();
		$shortcode  = $params['shortcode'];
		$registered = [];

		preg_match_all( '/\[([a-z][a-z\d_-]*)[^]|\[]*]/', $shortcode, $matches );

		if ( ! empty( $matches[1] ) ) {
			foreach ( $matches[1] as $tag ) {
				if ( shortcode_exists( $tag ) ) {
					$registered[] = $tag;
				}
			}
		}

		$registered = array_values( array_unique( $registered ) );
		$response   = array(
			'success'    => true,
			'raw'        => $shortcode,
			'registered' => $registered,
			'rendered'   => do_shortcode( $shortcode ),
		);

		return new \WP_REST_Response( $response );
	}

}
