<?php
/**
 * Theme helpers.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

/** Media Library folder where theme content images are stored. */
define('TDA_MEDIA_UPLOAD_SUBDIR', '2026/07');

/**
 * Absolute URL for a file in the Media Library uploads folder.
 * Filenames are lowercased to match WordPress.com upload sanitization.
 */
function tda_media_url(string $filename): string {
    $filename = ltrim(str_replace('\\', '/', $filename), '/');
    $parts    = explode('/', $filename);
    $parts    = array_map('strtolower', $parts);
    return esc_url(content_url('uploads/' . TDA_MEDIA_UPLOAD_SUBDIR . '/' . implode('/', $parts)));
}

/**
 * Theme asset URL. Content images under img/ resolve to the Media Library;
 * UI assets (e.g. img/flags/) stay in the theme.
 */
function tda_asset(string $path): string {
    $path = ltrim($path, '/');
    if (strpos($path, 'img/') === 0 && strpos($path, 'img/flags/') !== 0) {
        return tda_media_url(substr($path, 4));
    }
    return esc_url(TDA_THEME_URI . '/assets/' . $path);
}

function tda_img(string $filename, string $alt = '', array $attrs = []): string {
    $src = tda_media_url($filename);
    $alt = esc_attr($alt);
    $extra = '';
    foreach ($attrs as $k => $v) {
        $extra .= ' ' . esc_attr($k) . '="' . esc_attr((string) $v) . '"';
    }
    return '<img src="' . $src . '" alt="' . $alt . '"' . $extra . '>';
}

/**
 * Fix UTF-8 mojibake from Latin-1 misinterpretation in template files.
 */
function tda_fix_mojibake(string $text): string {
    static $map = null;

    if ($map === null) {
        $map = [
            'lingÃ¼Ã­sticas' => 'lingüísticas',
            'vitivinÃ­cola' => 'vitivinícola',
            'enolÃ³gico' => 'enológico',
            'enolÃ³gicas' => 'enológicas',
            'Tierra D\'AcogidaÂ®' => "Tierra D'Acogida®",
            'Tierra D\'AcogidarÂ®' => "Tierra D'Acogida®",
            'â€"' => '—',
            'â€”' => '—',
            'â€“' => '–',
            'Â¿' => '¿',
            'Â®' => '®',
            'Ã¡' => 'á',
            'Ã©' => 'é',
            'Ã­' => 'í',
            'Ã³' => 'ó',
            'Ãº' => 'ú',
            'Ã±' => 'ñ',
            'Ã¼' => 'ü',
            'Ãš' => 'Ú',
            'Ã‰' => 'É',
            'Ã"' => 'Ó',
        ];
    }

    return str_replace(array_keys($map), array_values($map), $text);
}

/**
 * Convert Jetpack/Photon CDN URLs back to direct Media Library URLs.
 */
function tda_strip_photon_url(string $url): string {
    if (preg_match('#^https?://i[0-9]+\.wp\.com/([^?]+)#', $url, $m)) {
        return esc_url_raw((is_ssl() ? 'https://' : 'http://') . $m[1]);
    }
    return $url;
}

/**
 * Slug aliases for multilingual / alternate page paths.
 */
function tda_page_slug_aliases(): array {
    return [
        'inicio'      => ['inicio', 'home'],
        'nosotros'    => ['nosotros', 'about'],
        'programas'   => ['programas', 'programs'],
        'alojamiento' => ['alojamiento', 'accommodation'],
        'actividades' => ['actividades', 'activities'],
        'galeria'     => ['galeria', 'gallery'],
        'contacto'    => ['contact', 'contacto'],
    ];
}

/**
 * Resolve a theme page by canonical slug, aliases, or static front page.
 */
function tda_resolve_theme_page(string $canonical_slug): ?WP_Post {
    $aliases = tda_page_slug_aliases()[$canonical_slug] ?? [$canonical_slug];

    foreach ($aliases as $path) {
        $page = get_page_by_path($path);
        if ($page instanceof WP_Post) {
            return $page;
        }
    }

    if ($canonical_slug === 'inicio' && get_option('show_on_front') === 'page') {
        $front_id = (int) get_option('page_on_front');
        if ($front_id > 0) {
            $page = get_post($front_id);
            if ($page instanceof WP_Post && $page->post_type === 'page' && $page->post_status !== 'trash') {
                return $page;
            }
        }
    }

    return null;
}

function tda_page_url(string $slug): string {
    $slugs = array_unique([$slug]);
    foreach (tda_page_slug_aliases() as $canonical => $variants) {
        if (in_array($slug, $variants, true)) {
            $slugs = $variants;
            $page = tda_resolve_theme_page($canonical);
            if ($page instanceof WP_Post) {
                return get_permalink($page);
            }
            break;
        }
    }
    foreach ($slugs as $s) {
        $page = get_page_by_path($s);
        if ($page) {
            return get_permalink($page);
        }
    }
    return esc_url(home_url('/' . $slug . '/'));
}

function tda_get_field(string $key, $default = '') {
    if (function_exists('get_field')) {
        $val = get_field($key);
        if ($val !== null && $val !== false && $val !== '') {
            return $val;
        }
    }
    return $default;
}

function tda_body_page_slug(): string {
    if (is_front_page()) {
        return 'home';
    }
    $post = get_queried_object();
    if ($post instanceof WP_Post) {
        $map = [
            'inicio'        => 'home',
            'nosotros'      => 'about',
            'about'         => 'about',
            'programas'     => 'programs',
            'programs'      => 'programs',
            'alojamiento'   => 'accommodation',
            'accommodation' => 'accommodation',
            'actividades'   => 'activities',
            'activities'    => 'activities',
            'galeria'       => 'gallery',
            'gallery'       => 'gallery',
            'contacto'      => 'contact',
            'contact'       => 'contact',
        ];
        return $map[$post->post_name] ?? $post->post_name;
    }
    return '';
}

function tda_nav_fallback(): void {
    $home = home_url('/');
    $items = [
        ['home', 'nav.home', $home],
        ['about', 'nav.about', tda_page_url('nosotros')],
        ['programs', 'nav.programs', tda_page_url('programas')],
        ['accommodation', 'nav.accommodation', tda_page_url('alojamiento')],
        ['activities', 'nav.activities', tda_page_url('actividades')],
        ['gallery', 'nav.gallery', tda_page_url('galeria')],
        ['contact', 'nav.contact', tda_page_url('contacto')],
    ];
    $current = tda_body_page_slug();
    echo '<ul class="nav__list">';
    foreach ($items as [$slug, $i18n, $url]) {
        $active = ($current === $slug) ? ' active' : '';
        echo '<li><a href="' . esc_url($url) . '" class="nav__link' . $active . '" data-i18n="' . esc_attr($i18n) . '"></a></li>';
    }
    echo '</ul>';
}

function tda_option(string $key, string $default = ''): string {
    $opts = get_option('tda_site_options', []);
    return isset($opts[$key]) && $opts[$key] !== '' ? (string) $opts[$key] : $default;
}

function tda_gallery_images(): array {
    $gallery = tda_get_field('gallery_images');
    if (is_array($gallery) && !empty($gallery)) {
        return $gallery;
    }
    return [
        'img_0285.jpeg', 'img_0926.jpeg', 'img_0951.jpeg', 'img_4436.jpeg',
        'img_5506.jpeg', 'img_5507.jpeg', 'img_5720.jpeg', 'img_5746.jpeg',
        'img_6716.jpeg', 'img_7305.jpeg', 'img_7362.jpeg', 'img_7375.jpeg',
        'img_9153.jpeg', 'img_9828.jpeg', 'img_9837.jpeg', 'img_0063.jpeg',
    ];
}
