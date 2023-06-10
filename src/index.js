/**
 * WordPress dependencies
 */
import { shortcode as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import transforms from './transforms';
import metadata from '../block.json';

function replaceShortcodeBlock( currentSettings, currentName ) {
	if ('core/shortcode' === currentName) {
		return {
			...metadata,
			icon,
			transforms,
			edit,
			save,
		};
	}

	return currentSettings;
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'better-shortcode-block/replace-block',
	replaceShortcodeBlock
);
// wp.domReady(() => {
// 	wp.blocks.unregisterBlockType( 'core/shortcode' );
//
// 	registerBlockType(
// 		name,
// 		settings
// 	)
//
// });
