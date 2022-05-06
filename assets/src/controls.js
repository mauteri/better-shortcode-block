/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { __experimentalText as Text, Panel, PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import { next as shortcodeNext, string as shortcodeString } from '@wordpress/shortcode';

/**
 * Controls for Shortcode block.
 *
 * @param setAttributes
 * @param attributes
 * @returns {JSX.Element}
 * @constructor
 */
export default function ShortcodeControls( { setAttributes, attributes } ) {

	function parseShortcodes( shortcode = '' ) {
		const parsedShortCode = [];
		// Regex: https://regex101.com/r/UbDoWO/1
		const tagRegex = /\[([a-z][a-z\d_-]*)[^\]|\[]*]/g;

		[ ...shortcode.matchAll( tagRegex ) ].map( ( tag ) => {
			parsedShortCode.push(
				newShortcodeObject( tag[1], shortcode, tag.index )
			)
		});

		return parsedShortCode;
	}

	/**
	 * Creates a new shortcode object. Uses some custom code because wp.shortcode
	 * is a bit buggy when dealing with attrs.
	 *
	 * @param tag
	 * @param shortcode
	 * @param index
	 * @returns {?WPShortcodeMatch}
	 */
	function newShortcodeObject( tag, shortcode, index ) {
		const shortcodeObject = shortcodeNext( tag, shortcode, index );
		const attrRegex = new RegExp( `\\[${tag}([^\\]]+)?`, 'gi' );
		const updatedAttrs = [ ...shortcodeObject.content.matchAll( attrRegex ) ].map( ( attrs ) => attrs[1] )[0];

		if ( 'undefined' !== typeof updatedAttrs ) {
			shortcodeObject.shortcode.attrs = parseStringAttrs(updatedAttrs);
		}

		return shortcodeObject;
	}

	/**
	 * Copy of wp.shortcode attrs.
	 *
	 * Cannot use wp.shortcode.attrs as it utilizes _.memoize which caches results.
	 *
	 * @param text
	 * @returns {{named: {}, numeric: *[]}}
	 */
	function parseStringAttrs( text ) {
		let named = {};
		let numeric = [];
		let match;

		/**
		 * This regular expression is reused from `shortcode_parse_atts()`
		 * in `wp-includes/shortcodes.php`.
		 *
		 * Capture groups:
		 * 1. An attribute name, that corresponds to...
		 * 2. a value in double quotes.
		 * 3. An attribute name, that corresponds to...
		 * 4. a value in single quotes.
		 * 5. An attribute name, that corresponds to...
		 * 6. an unquoted value.
		 * 7. A numeric attribute in double quotes.
		 * 8. An unquoted numeric attribute.
		 * @type {RegExp}
		 */
		const pattern = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/g;

		// Map zero-width spaces to actual spaces.
		text = text.replace( /[\u00a0\u200b]/g, ' ' );

		// Match and normalize attributes.
		while ( ( match = pattern.exec( text ) ) ) {
			if ( match[1] ) {
				named[ match[1].toLowerCase() ] = match[2];
			} else if ( match[3] ) {
				named[ match[3].toLowerCase() ] = match[4];
			} else if ( match[5] ) {
				named[ match[5].toLowerCase() ] = match[6];
			} else if ( match[7] ) {
				numeric.push( match[7] );
			} else if ( match[8] ) {
				numeric.push( match[8] );
			}
		}

		return {
			named:   named,
			numeric: numeric
		};
	}

	/**
	 * Replaces a piece of a string between two indexes.
	 *
	 * @param origin
	 * @param startIndex
	 * @param endIndex
	 * @param insertion
	 * @returns {string}
	 */
	function replaceBetween( origin, startIndex, endIndex, insertion ) {
		return origin.substring( 0, startIndex ) + insertion + origin.substring( endIndex );
	}

	/**
	 * Changes states of attributes.text after a change to the shortcode.
	 *
	 * @param item
	 */
	function updateAttributesText( item ) {
		const text = replaceBetween(
			attributes.text,
			item.index,
			item.index + item.content.length,
			shortcodeString( item.shortcode )
		);

		setAttributes( { text } );
	}

	/**
	 * Updates the content of a shortcode.
	 *
	 * @param value
	 * @param item
	 */
	function updateShortcodeContent( value, item ) {
		item.shortcode.content = value;

		updateAttributesText( item );
	}

	/**
	 * Updates an attribute (named or numeric) of a shortcode.
	 *
	 * @param value
	 * @param item
	 * @param name
	 */
	function updateShortcodeAtts( value, item, name ) {
		item.shortcode.set( name, value );

		updateAttributesText( item );
	}

	/**
	 * Renders the block panel for Shortcode block.
	 *
	 * @param item
	 * @param index
	 * @returns {JSX.Element}
	 */
	function renderPanelBody( item, index ) {
		return(
			<PanelBody key={ 'panel_' + index } title={ item.shortcode.tag.toUpperCase() } initialOpen={ false }>
				<>
					{ JSON.stringify( item.shortcode.attrs.named ) === '{}' &&
						<Text adjustLineHeightForInnerControls>{  __( 'Shortcode has no attributes.' ) }</Text>
					}

					{ Object.keys( item.shortcode.attrs.named ).map( ( name, i ) => (
						<TextControl
							label={ name }
							key={ index + '_' + name + '_' + i }
							value={ item.shortcode.attrs.named[ name ] }
							onChange={ ( value ) => updateShortcodeAtts( value, item, name ) }
						/>
					) ) }

					{ item.shortcode.attrs.numeric.map( ( property, i ) => (
						<TextControl
							label={ __( 'property' ) + ' ' + i }
							key={ index + '_property_' + i }
							value={ property }
							onChange={ ( value ) => updateShortcodeAtts( value, item, i ) }
						/>
					) ) }

					{ item.shortcode.content  &&
						<TextareaControl
							label={ __( 'content' ) }
							value={ item.shortcode.content }
							onChange={ ( value ) => updateShortcodeContent( value, item ) }
						/>
					}
				</>
			</PanelBody>
		);
	}

	return (
		<InspectorControls>
			<Panel>
				{ parseShortcodes( attributes.text ).map( ( item, index ) => (
					renderPanelBody( item, index )
				) ) }
			</Panel>
		</InspectorControls>
	);
}
