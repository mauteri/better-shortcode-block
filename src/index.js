/**
 * WordPress dependencies
 */
import { shortcode as icon } from '@wordpress/icons';
import { addFilter } from '@wordpress/hooks';

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

addFilter(
	'blocks.registerBlockType',
	'better-shortcode-block/replace-block',
	replaceShortcodeBlock
);
