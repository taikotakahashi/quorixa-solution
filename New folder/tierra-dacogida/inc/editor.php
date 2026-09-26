<?php
/**
 * Block editor enhancements.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('enqueue_block_editor_assets', function () {
    $v = TDA_THEME_VERSION;

    wp_enqueue_script(
        'tda-editor',
        TDA_THEME_URI . '/assets/js/editor.js',
        ['wp-dom-ready'],
        $v,
        true
    );

    $hero = tda_media_url('hero-back.jpeg');
    wp_add_inline_style(
        'wp-edit-blocks',
        '.fade-in,.fade-in.visible,.editor-styles-wrapper .fade-in,.editor-styles-wrapper .wp-block-html .fade-in{opacity:1!important;transform:none!important;visibility:visible!important}'
        . '.editor-styles-wrapper .hero-photo--home:not(:has(.hero-photo__slide)){background-image:url(' . esc_url($hero) . ');}'
    );
});

add_action('admin_head', function () {
    if (!function_exists('get_current_screen')) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || $screen->base !== 'post' || $screen->post_type !== 'page') {
        return;
    }

    echo '<style>
      .editor-post-title__input {
        font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
      }
      .edit-post-visual-editor .editor-post-title {
        max-width: var(--container-max, 1180px);
        margin: 0 auto;
        padding: 1.5rem 1.5rem 0;
      }
      .tda-editor-hide-title .edit-post-visual-editor__post-title-wrapper {
        display: none !important;
      }
    </style>';
});
