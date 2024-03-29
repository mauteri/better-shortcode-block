/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	PlainText,
	transformStyles,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { ToolbarButton, SandBox, ToolbarGroup } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { Icon, shortcode } from '@wordpress/icons';
import { View } from '@wordpress/primitives';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies.
 */
import ShortcodeControls from './controls';

/**
 * Edit for Shortcode block.
 *
 * @param {Object}   attributes
 * @param {Object}   attributes.attributes
 * @param {Function} attributes.setAttributes
 * @return {JSX.Element} - Edit shortcode block.
 * @class
 */
export default function ShortcodeEdit( { attributes, setAttributes } ) {
	const instanceId = useInstanceId( ShortcodeEdit );
	const inputId = `blocks-shortcode-input-${ instanceId }`;
	const [ shortcodeMarkup, setShortcodeMarkup ] = useState( '' );
	const [ registeredShortcodes, setRegisteredShortcodes ] = useState( [] );

	/**
	 * Default styles used to unset some of the styles
	 * hat might be inherited from the editor style.
	 */
	const styles = useSelect( ( select ) => {
		const defaultStyles = `
			html,body,:root {
				margin: 0 !important;
				padding: 0 !important;
				overflow: visible !important;
				min-height: auto !important;
			}
		`;

		return [
			defaultStyles,
			...transformStyles(
				select( blockEditorStore ).getSettings().styles
			),
		];
	}, [] );

	/**
	 * Switches to preview mode.
	 */
	function switchToPreview() {
		setAttributes( { preview: true } );
	}

	/**
	 * Switches to shortcode mode.
	 */
	function switchToShortcode() {
		setAttributes( { preview: false } );
	}

	/**
	 * Makes API call to get an updated render of shortcode on shortcode update.
	 */
	useEffect( () => {
		apiFetch( {
			path: `/better-shortcode-block/shortcode?shortcode=${ encodeURIComponent(
				attributes.text
			) }`,
		} ).then( ( res ) => {
			if ( res.success ) {
				setRegisteredShortcodes( res.registered );
				setShortcodeMarkup( res.rendered );
			}
		} );
	}, [ attributes.text ] );

	return (
		<>
			<View
				{ ...useBlockProps( {
					className: 'block-library-shortcode__edit',
				} ) }
			>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							className="components-tab-button"
							isPressed={ ! attributes.preview }
							onClick={ switchToShortcode }
						>
							{ __( 'Raw' ) }
						</ToolbarButton>
						<ToolbarButton
							className="components-tab-button"
							isPressed={ attributes.preview }
							onClick={ switchToPreview }
						>
							{ __( 'Preview' ) }
						</ToolbarButton>
					</ToolbarGroup>
				</BlockControls>
				{ attributes.preview ? (
					<>
						<SandBox html={ shortcodeMarkup } styles={ styles } />
						<div
							style={ {
								position: 'absolute',
								top: '0',
								right: '0',
								bottom: '0',
								left: '0',
							} }
						></div>
					</>
				) : (
					<div
						className="components-placeholder"
						style={ { minHeight: 'auto' } }
					>
						<label
							htmlFor={ inputId }
							className="components-placeholder__label"
						>
							<Icon icon={ shortcode } />
							{ __(
								'Better Shortcode',
								'better-shortcode-block'
							) }
						</label>
						<PlainText
							className="blocks-shortcode__textarea"
							id={ inputId }
							value={ attributes.text }
							aria-label={ __(
								'Shortcode text',
								'better-shortcode-block'
							) }
							placeholder={ __(
								'Write shortcode here…',
								'better-shortcode-block'
							) }
							onChange={ ( text ) => setAttributes( { text } ) }
						/>
					</div>
				) }
			</View>
			<ShortcodeControls
				setAttributes={ setAttributes }
				attributes={ attributes }
				registeredShortcodes={ registeredShortcodes }
			/>
		</>
	);
}
