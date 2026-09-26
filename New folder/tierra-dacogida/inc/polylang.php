<?php
/**
 * Language switcher + locale helpers.
 *
 * The theme uses client-side i18n (assets/js/i18n.js) so language applies to
 * every page and persists across navigation via localStorage + cookie.
 * Polylang, when present, is not used for switching — its URL-based switch
 * only translated menus/chrome and left block content in Spanish.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

/**
 * Current front-end language slug (es|en).
 */
function tda_current_lang(): string {
    if (!empty($_COOKIE['tda_lang'])) {
        $lang = sanitize_key((string) $_COOKIE['tda_lang']);
        if ($lang === 'en' || $lang === 'es') {
            return $lang;
        }
    }
    return 'es';
}

add_filter('locale', function ($locale) {
    if (is_admin()) {
        return $locale;
    }
    // Prefer theme language cookie so PHP locale matches the UI language.
    if (tda_current_lang() === 'en') {
        return 'en_US';
    }
    return $locale;
}, 20);

/**
 * Render the language switcher (always client-side so content translates too).
 */
function tda_lang_switcher(): void {
    get_template_part('template-parts/lang-switcher-fallback');
}

add_action('init', function () {
    if (function_exists('pll_register_string')) {
        pll_register_string('footer-brand', "Tierra D'Acogida® — Destination Management Center", 'tierra-dacogida');
    }
});
