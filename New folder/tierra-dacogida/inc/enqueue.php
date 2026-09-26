<?php
/**
 * Enqueue scripts and styles.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('wp_enqueue_scripts', function () {
    $v = TDA_THEME_VERSION;

    wp_enqueue_style('tda-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap', [], null);
    wp_enqueue_style('tda-main', TDA_THEME_URI . '/assets/css/main.css', ['tda-fonts'], $v);
    wp_enqueue_style('tda-components', TDA_THEME_URI . '/assets/css/components.css', ['tda-main'], $v);
    wp_enqueue_style('tda-responsive', TDA_THEME_URI . '/assets/css/responsive.css', ['tda-components'], $v);
    wp_enqueue_style('tda-layout', TDA_THEME_URI . '/assets/css/layout.css', ['tda-responsive'], $v);

    wp_enqueue_script('tda-i18n', TDA_THEME_URI . '/assets/js/i18n.js', [], $v, true);
    wp_enqueue_script('tda-theme', TDA_THEME_URI . '/assets/js/theme.js', [], $v, true);
    wp_enqueue_script('tda-main', TDA_THEME_URI . '/assets/js/main.js', ['tda-i18n', 'tda-theme'], $v, true);

    if (is_page_template('page-templates/template-contact.php') || tda_page_has_contact_form()) {
        wp_enqueue_script('tda-form', TDA_THEME_URI . '/assets/js/form.js', ['tda-main'], $v, true);
    }

    wp_localize_script('tda-main', 'tdaData', [
        'homeUrl'     => home_url('/'),
        'ajaxUrl'     => admin_url('admin-ajax.php'),
        'themeUri'    => TDA_THEME_URI,
        'hasPolylang' => function_exists('pll_current_language'),
        'lang'        => tda_current_lang(),
    ]);

    // Keep ACF hero as fallback only when the block has no image attrs yet.
    if (is_front_page()) {
        $hero = tda_get_field('hero_image', tda_media_url('hero-back.jpeg'));
        if (is_array($hero) && !empty($hero['url'])) {
            $hero = $hero['url'];
        }
        $hero = tda_strip_photon_url((string) $hero);
        wp_add_inline_style(
            'tda-components',
            '.hero-photo--home:not(:has(.hero-photo__slide)){background-image:url(' . esc_url($hero) . ');}'
        );
    }
});

add_action('wp_head', function () {
    echo "<script>(function(){var t=localStorage.getItem('tda-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');var l=localStorage.getItem('tda-lang');if(l!=='en'&&l!=='es'){var m=document.cookie.match(/(?:^|;\\s*)tda_lang=(en|es)/);l=m?m[1]:'es';}document.documentElement.lang=l;document.documentElement.setAttribute('data-lang',l);document.cookie='tda_lang='+l+';path=/;max-age=31536000;SameSite=Lax';})();</script>\n";
}, 1);
