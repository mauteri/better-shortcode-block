/**
 * WordPress dependencies.
 */
import { RawHTML } from '@wordpress/element';

/**
 * Save block.
 *
 * @param {Object} attributes
 * @param {Object} attributes.attributes
 * @return {JSX.Element} - Raw shortcode.
 */
export default function save( { attributes } ) {
	return <RawHTML>{ attributes.text }</RawHTML>;
}
