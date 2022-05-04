import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import ShortcodeEdit from './edit';
import ShortcodeSave from './save';

wp.domReady(() => {
	wp.blocks.unregisterBlockType( 'core/shortcode' );

	registerBlockType( 'core/shortcode', {
		title: __( 'Shortcode' ),
		category: 'widgets',
		icon: 'shortcode',
		attributes: {
			text: {
				type: 'string'
			},
			preview: {
				type: 'boolean',
				default: false
			}
		},
		edit: ShortcodeEdit,
		save: ShortcodeSave
	});
});
