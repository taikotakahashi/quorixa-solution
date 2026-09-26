<?php
/**
 * Theme setup.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('after_setup_theme', function () {
    load_theme_textdomain('tierra-dacogida', TDA_THEME_DIR . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo', [
        'height'      => 96,
        'width'       => 96,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
    add_editor_style([
        'assets/css/main.css',
        'assets/css/components.css',
        'assets/css/layout.css',
        'assets/css/responsive.css',
        'assets/css/editor.css',
    ]);

    register_nav_menus([
        'primary' => __('Primary Menu', 'tierra-dacogida'),
        'footer_programs' => __('Footer — Programs', 'tierra-dacogida'),
        'footer_company'  => __('Footer — Company', 'tierra-dacogida'),
    ]);
});

// Prefer direct Media Library URLs over Jetpack Photon CDN.
add_filter('jetpack_photon_skip_image', '__return_true');
add_filter('jetpack_photon_development_mode', '__return_true');

add_filter('wp_get_attachment_url', function ($url) {
    return tda_strip_photon_url((string) $url);
});

add_filter('wp_get_attachment_image_src', function ($image) {
    if (is_array($image) && !empty($image[0])) {
        $image[0] = tda_strip_photon_url((string) $image[0]);
    }
    return $image;
});

add_filter('wp_get_attachment_image_attributes', function ($attr) {
    if (!empty($attr['src'])) {
        $attr['src'] = tda_strip_photon_url((string) $attr['src']);
    }
    if (!empty($attr['srcset'])) {
        $attr['srcset'] = preg_replace_callback(
            '#https?://i[0-9]+\.wp\.com/[^\s?]+#',
            static function ($m) {
                return tda_strip_photon_url($m[0]);
            },
            (string) $attr['srcset']
        );
    }
    return $attr;
});

add_filter('get_custom_logo', function ($html) {
    return preg_replace_callback(
        '#https?://i[0-9]+\.wp\.com/[^"\s?]+(?:\?[^"]*)?#',
        static function ($m) {
            return esc_url(tda_strip_photon_url($m[0]));
        },
        (string) $html
    );
});

add_filter('nav_menu_link_attributes', function ($atts, $item, $args) {
    if (!isset($args->theme_location) || $args->theme_location !== 'primary') {
        return $atts;
    }
    $class = trim(($atts['class'] ?? '') . ' nav__link');
    if (in_array('current-menu-item', (array) $item->classes, true) || in_array('current-page-ancestor', (array) $item->classes, true)) {
        $class .= ' active';
    }
    $atts['class'] = $class;

    $url = (string) ($item->url ?? '');
    $i18n_map = [
        'nav.home'          => '#/(inicio|home)?/?$#',
        'nav.about'         => '#/(nosotros|about)/#',
        'nav.programs'      => '#/(programas|programs)/#',
        'nav.accommodation' => '#/(alojamiento|accommodation)/#',
        'nav.activities'    => '#/(actividades|activities)/#',
        'nav.gallery'       => '#/(galeria|gallery)/#',
        'nav.contact'       => '#/(contacto|contact)/#',
    ];
    foreach ($i18n_map as $key => $pattern) {
        if ($key === 'nav.home') {
            $path = wp_parse_url($url, PHP_URL_PATH);
            $path = is_string($path) ? untrailingslashit($path) : '';
            if ($path === '' || $path === '/inicio' || $path === '/home' || $url === home_url('/') || $url === home_url('')) {
                $atts['data-i18n'] = 'nav.home';
                break;
            }
            continue;
        }
        if (preg_match($pattern, $url)) {
            $atts['data-i18n'] = $key;
            break;
        }
    }

    return $atts;
}, 10, 3);
