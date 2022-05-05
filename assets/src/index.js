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
import metadata from '../../block.json';

const { name } = metadata;

const settings = {
	icon,
	transforms,
	edit,
	save,
}

wp.domReady(() => {
	wp.blocks.unregisterBlockType( 'core/shortcode' );

	registerBlockType(
		name,
		settings
	)
});
