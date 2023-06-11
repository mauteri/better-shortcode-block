/**
 * WordPress dependencies.
 */
import { RawHTML } from '@wordpress/element';

/**
 * Save for Shortcode block.
 *
 * @param  attributes.attributes
 * @param  attributes
 * @return {JSX.Element}
 * @class
 */
export default function ShortcodeSave( { attributes } ) {
	return <RawHTML>{ attributes.text }</RawHTML>;
}
