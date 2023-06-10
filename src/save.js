/**
 * WordPress dependencies.
 */
import { RawHTML } from '@wordpress/element';

/**
 * Save for Shortcode block.
 *
 * @param attributes
 * @returns {JSX.Element}
 * @constructor
 */
export default function ShortcodeSave( { attributes } ) {
	return <RawHTML>{ attributes.text }</RawHTML>;
}
