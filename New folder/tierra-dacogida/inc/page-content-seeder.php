<?php
/**
 * Seed page content into the block editor from theme templates.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

/**
 * Map WordPress page slugs to template partial filenames.
 */
function tda_page_slug_map(): array {
    return [
        'inicio'      => 'home',
        'home'        => 'home',
        'nosotros'    => 'about',
        'programas'   => 'programs',
        'alojamiento' => 'accommodation',
        'actividades' => 'activities',
        'galeria'     => 'gallery',
        'contacto'    => 'contact',
    ];
}

/**
 * Whether stored page content is effectively empty for seeding purposes.
 */
function tda_page_content_is_empty(string $content): bool {
    $content = trim($content);
    if ($content === '') {
        return true;
    }

    $stripped = trim(wp_strip_all_tags($content));
    if ($stripped === '') {
        return true;
    }

    return (bool) preg_match(
        '/^(?:<!-- wp:paragraph -->\s*<p>(?:\s|&nbsp;)*<\/p>\s*<!-- \/wp:paragraph -->\s*)+$/s',
        $content
    );
}

/**
 * Map a page post ID to its theme partial filename.
 */
function tda_partial_for_post_id(int $post_id): string {
    $slug = (string) get_post_field('post_name', $post_id);
    $map  = tda_page_slug_map();

    if (isset($map[$slug])) {
        return $map[$slug];
    }

    foreach ($map as $canonical => $partial) {
        if ($canonical === 'home') {
            continue;
        }
        $aliases = tda_page_slug_aliases()[$canonical] ?? [$canonical];
        if (in_array($slug, $aliases, true)) {
            return $partial;
        }
    }

    if ((int) get_option('page_on_front') === $post_id) {
        return 'home';
    }

    return '';
}

/**
 * Canonical theme pages to seed (one partial per logical page).
 */
function tda_seedable_pages(): array {
    return [
        'inicio'      => 'home',
        'nosotros'    => 'about',
        'programas'   => 'programs',
        'alojamiento' => 'accommodation',
        'actividades' => 'activities',
        'galeria'     => 'gallery',
        'contacto'    => 'contact',
    ];
}

/**
 * Capture rendered output from a page partial.
 */
function tda_capture_page_partial(string $partial): string {
    $file = TDA_THEME_DIR . '/template-parts/pages/' . $partial . '.php';
    if (!is_readable($file)) {
        return '';
    }

    $seeding = true;
    if (!defined('TDA_SEEDING')) {
        define('TDA_SEEDING', true);
    }
    ob_start();
    include $file;
    $html = ob_get_clean();
    $seeding = false;

    return trim((string) $html);
}

/**
 * Apply mojibake fixes to captured/seeder HTML.
 */
function tda_normalize_page_html(string $html): string {
    return tda_fix_mojibake($html);
}

/**
 * Wrap HTML as a Gutenberg Custom HTML block.
 */
function tda_wrap_html_block(string $html): string {
    $html = trim($html);
    if ($html === '') {
        return '';
    }
    return "<!-- wp:html -->\n" . $html . "\n<!-- /wp:html -->";
}

/**
 * Wrap a shortcode as a Gutenberg Shortcode block.
 */
function tda_wrap_shortcode_block(string $shortcode): string {
    return "<!-- wp:shortcode -->\n" . $shortcode . "\n<!-- /wp:shortcode -->";
}

/**
 * Whether page content should be (re)seeded with theme section blocks.
 */
function tda_page_uses_theme_blocks(string $content): bool {
    return strpos($content, 'tierra-dacogida/') !== false;
}

/**
 * Theme blocks present but key item arrays emptied (corrupt/partial save).
 */
function tda_page_theme_blocks_are_hollow(string $content): bool {
    if (!tda_page_uses_theme_blocks($content)) {
        return false;
    }

    $blocks = parse_blocks($content);
    $saw_theme_block = false;

    foreach ($blocks as $block) {
        $name = (string) ($block['blockName'] ?? '');
        if ($name === '' || strpos($name, 'tierra-dacogida/') !== 0) {
            continue;
        }
        $saw_theme_block = true;
        $attrs = is_array($block['attrs'] ?? null) ? $block['attrs'] : [];

        // Empty placeholder sections (HOME editor showing LABEL / Heading / No image).
        if ($name === 'tierra-dacogida/split-section') {
            $title = trim(wp_strip_all_tags((string) ($attrs['title'] ?? '') . (string) ($attrs['titleHtml'] ?? '')));
            $paras = is_array($attrs['paragraphs'] ?? null) ? array_filter($attrs['paragraphs']) : [];
            if ($title === '' || empty($attrs['imageUrl']) || !$paras) {
                return true;
            }
        }
        if ($name === 'tierra-dacogida/stats-section') {
            $title = trim(wp_strip_all_tags((string) ($attrs['titleHtml'] ?? '')));
            if ($title === '' || empty($attrs['stats']) || !is_array($attrs['stats'])) {
                return true;
            }
        }
        if ($name === 'tierra-dacogida/hero-photo') {
            if (trim((string) ($attrs['title'] ?? '')) === '') {
                return true;
            }
        }
        if ($name === 'tierra-dacogida/feature-band') {
            if (trim((string) ($attrs['title'] ?? '')) === '' || empty($attrs['imageUrl'])) {
                return true;
            }
        }
        if ($name === 'tierra-dacogida/contact-info') {
            if (trim((string) ($attrs['title'] ?? '')) === ''
                || trim((string) ($attrs['phone'] ?? '')) === ''
                || trim((string) ($attrs['email'] ?? '')) === ''
            ) {
                return true;
            }
        }
        if ($name === 'tierra-dacogida/page-hero') {
            if (trim((string) ($attrs['title'] ?? '')) === '') {
                return true;
            }
        }

        $map = [
            'tierra-dacogida/programme-cards' => 'programmes',
            'tierra-dacogida/support-section' => 'items',
            'tierra-dacogida/stats-section'   => 'stats',
            'tierra-dacogida/cards-section'   => 'cards',
            'tierra-dacogida/steps-section'   => 'steps',
            'tierra-dacogida/service-cards'   => 'cards',
            'tierra-dacogida/gallery-section' => 'images',
            'tierra-dacogida/gallery-strip'   => 'images',
            'tierra-dacogida/reviews-section' => 'reviews',
        ];

        if (!isset($map[$name])) {
            continue;
        }
        $key = $map[$name];
        $list = $attrs[$key] ?? null;
        if (!is_array($list) || count($list) === 0) {
            return true;
        }
    }

    // Expected homepage sections missing entirely.
    if ($saw_theme_block
        && strpos($content, 'tierra-dacogida/hero-photo') !== false
        && (
            strpos($content, 'tierra-dacogida/programme-cards') === false
            || strpos($content, 'tierra-dacogida/stats-section') === false
            || strpos($content, 'tierra-dacogida/support-section') === false
            || strpos($content, 'tierra-dacogida/split-section') === false
        )
    ) {
        return true;
    }

    return false;
}

function tda_page_needs_block_seed(string $content, bool $force): bool {
    if ($force) {
        return true;
    }
    if (tda_page_content_is_empty($content)) {
        return true;
    }
    if (tda_page_theme_blocks_are_hollow($content)) {
        return true;
    }
    // Contact (or other) sections still stored as Custom HTML → convert to theme blocks.
    if (tda_page_has_legacy_section_html($content)) {
        return true;
    }
    return !tda_page_uses_theme_blocks($content);
}

/**
 * True when a known theme section is still a Custom HTML block instead of a theme block.
 */
function tda_page_has_legacy_section_html(string $content): bool {
    if (strpos($content, '<!-- wp:html') === false) {
        return false;
    }

    $checks = [
        'contact-block'   => 'tierra-dacogida/contact-info',
        'page-hero'       => 'tierra-dacogida/page-hero',
        'hero-photo'      => 'tierra-dacogida/hero-photo',
        'programme-list'  => 'tierra-dacogida/programme-cards',
        'contact-details' => 'tierra-dacogida/contact-info',
    ];

    foreach ($checks as $html_marker => $block_name) {
        if (strpos($content, $html_marker) !== false && strpos($content, $block_name) === false) {
            return true;
        }
    }

    return false;
}

/**
 * Seed block-editor content for all theme pages that are still empty.
 *
 * @param bool $force Overwrite existing page content.
 * @return int Number of pages updated.
 */
function tda_seed_page_content(bool $force = false): int {
    $updated    = 0;
    $seeded_ids = [];

    foreach (tda_seedable_pages() as $slug => $partial) {
        $page = tda_resolve_theme_page($slug);
        if (!$page || in_array($page->ID, $seeded_ids, true)) {
            continue;
        }

        $existing = (string) $page->post_content;
        if (!tda_page_needs_block_seed($existing, $force)) {
            continue;
        }

        $content = tda_build_page_block_content($partial);
        if ($content === '') {
            continue;
        }

        wp_update_post([
            'ID'           => $page->ID,
            'post_content' => $content,
        ]);
        $seeded_ids[] = $page->ID;
        $updated++;
    }

    if ($updated > 0) {
        update_option('tda_pages_seeded', TDA_THEME_VERSION);
    }

    return $updated;
}

/**
 * Fix mojibake in stored page content without overwriting layout.
 */
function tda_fix_stored_page_encoding(): int {
    $fixed = 0;

    foreach (array_keys(tda_seedable_pages()) as $slug) {
        $page = tda_resolve_theme_page($slug);
        if (!$page) {
            continue;
        }

        $content = (string) $page->post_content;
        if ($content === '' || (
            strpos($content, 'Ã') === false
            && strpos($content, 'Â') === false
            && strpos($content, 'â€') === false
        )) {
            continue;
        }

        $normalized = tda_fix_mojibake($content);
        if ($normalized === $content) {
            continue;
        }

        wp_update_post([
            'ID'           => $page->ID,
            'post_content' => $normalized,
        ]);
        $fixed++;
    }

    return $fixed;
}

/**
 * Render page content from the editor, with template fallback when empty.
 */
function tda_render_page_content(): void {
    echo '<main class="site-main">';
    while (have_posts()) {
        the_post();

        $raw     = (string) get_post_field('post_content', get_the_ID());
        $partial = tda_partial_for_post_id((int) get_the_ID());

        // Hollow/corrupt theme blocks → fall back to the full page template.
        if ($partial && tda_page_theme_blocks_are_hollow($raw)
            && locate_template('template-parts/pages/' . $partial . '.php')) {
            get_template_part('template-parts/pages/' . $partial);
            continue;
        }

        // Prefer saved editor content whenever theme blocks (or any blocks) exist.
        if (!tda_page_content_is_empty($raw) || has_blocks($raw)) {
            the_content();
            continue;
        }

        if ($partial && locate_template('template-parts/pages/' . $partial . '.php')) {
            get_template_part('template-parts/pages/' . $partial);
        } else {
            the_content();
        }
    }
    echo '</main>';
}

add_action('after_switch_theme', 'tda_seed_page_content', 20);

add_action('admin_init', function () {
    if (!current_user_can('edit_pages')) {
        return;
    }

    $encoding_fixed = get_option('tda_encoding_fixed', '');
    if ($encoding_fixed !== TDA_THEME_VERSION) {
        tda_fix_stored_page_encoding();
        update_option('tda_encoding_fixed', TDA_THEME_VERSION);
    }

    $seeded_version = get_option('tda_pages_seeded', '');
    $needs_seed     = $seeded_version !== TDA_THEME_VERSION;

    if (!$needs_seed) {
        foreach (array_keys(tda_seedable_pages()) as $slug) {
            $page = tda_resolve_theme_page($slug);
            if (!$page) {
                continue;
            }
            $content = (string) $page->post_content;
            if (tda_page_needs_block_seed($content, false)) {
                $needs_seed = true;
                break;
            }
        }
    }

    if ($needs_seed) {
        tda_seed_page_content();
    }

    // One-shot: restore HOME with latest Spanish defaults (for i18n lexicon match).
    if (get_option('tda_home_content_repair') !== TDA_THEME_VERSION) {
        $home = tda_resolve_theme_page('inicio');
        if ($home) {
            $content = tda_build_page_block_content('home');
            if ($content !== '') {
                wp_update_post([
                    'ID'           => $home->ID,
                    'post_content' => $content,
                ]);
            }
        }
        update_option('tda_home_content_repair', TDA_THEME_VERSION);
    }

    if (get_option('tda_contact_content_repair') !== TDA_THEME_VERSION) {
        $contact = tda_resolve_theme_page('contacto');
        if ($contact) {
            $raw = (string) $contact->post_content;
            $needs = tda_page_theme_blocks_are_hollow($raw)
                || tda_page_has_legacy_section_html($raw)
                || strpos($raw, 'tierra-dacogida/contact-info') === false;
            if ($needs) {
                $content = tda_build_page_block_content('contact');
                if ($content !== '') {
                    wp_update_post([
                        'ID'           => $contact->ID,
                        'post_content' => $content,
                    ]);
                }
            }
        }
        update_option('tda_contact_content_repair', TDA_THEME_VERSION);
    }

    // One-shot: refresh Programas with Bierzo training-track content.
    if (get_option('tda_programs_content_repair') !== TDA_THEME_VERSION) {
        $programs = tda_resolve_theme_page('programas');
        if ($programs) {
            $content = tda_build_page_block_content('programs');
            if ($content !== '') {
                wp_update_post([
                    'ID'           => $programs->ID,
                    'post_content' => $content,
                ]);
            }
        }
        update_option('tda_programs_content_repair', TDA_THEME_VERSION);
    }

    // One-shot: refresh Alojamiento with La Rosa Azul content.
    if (get_option('tda_accommodation_content_repair') !== TDA_THEME_VERSION) {
        $accommodation = tda_resolve_theme_page('alojamiento');
        if ($accommodation) {
            $content = tda_build_page_block_content('accommodation');
            if ($content !== '') {
                wp_update_post([
                    'ID'           => $accommodation->ID,
                    'post_content' => $content,
                ]);
            }
        }
        update_option('tda_accommodation_content_repair', TDA_THEME_VERSION);
    }

    // One-shot: refresh Nosotros with latest About defaults.
    if (get_option('tda_about_content_repair') !== TDA_THEME_VERSION) {
        $about = tda_resolve_theme_page('nosotros');
        if ($about) {
            $content = tda_build_page_block_content('about');
            if ($content !== '') {
                wp_update_post([
                    'ID'           => $about->ID,
                    'post_content' => $content,
                ]);
            }
        }
        update_option('tda_about_content_repair', TDA_THEME_VERSION);
    }
});

add_action('admin_notices', function () {
    if (!current_user_can('edit_pages')) {
        return;
    }

    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || !in_array($screen->id, ['dashboard', 'themes'], true)) {
        return;
    }

    $import_url = wp_nonce_url(admin_url('themes.php?tda_seed_pages=1'), 'tda_seed_pages');
    $force_url  = wp_nonce_url(admin_url('themes.php?tda_seed_pages=1&tda_force=1'), 'tda_seed_pages');

    $empty = 0;
    foreach (array_keys(tda_seedable_pages()) as $slug) {
        $page = tda_resolve_theme_page($slug);
        if ($page && tda_page_needs_block_seed((string) $page->post_content, false)) {
            $empty++;
        }
    }

    if ($empty > 0) {
        echo '<div class="notice notice-warning"><p>';
        echo esc_html__('Tierra D\'Acogida: some pages have empty or incomplete section content (missing cards/images).', 'tierra-dacogida');
        echo ' <a href="' . esc_url($import_url) . '">';
        echo esc_html__('Restore default page content', 'tierra-dacogida');
        echo '</a></p></div>';
        return;
    }

    if ($screen->id !== 'themes') {
        return;
    }

    echo '<div class="notice notice-info is-dismissible"><p>';
    echo esc_html__('Tierra D\'Acogida: page content can be re-imported from the theme defaults if needed.', 'tierra-dacogida');
    echo ' <a href="' . esc_url($force_url) . '" onclick="return confirm(\'' . esc_js(__('This will overwrite all theme page content. Continue?', 'tierra-dacogida')) . '\');">';
    echo esc_html__('Re-import all page content', 'tierra-dacogida');
    echo '</a></p></div>';
});

add_action('admin_init', function () {
    if (!isset($_GET['tda_seed_pages']) || !current_user_can('edit_pages')) {
        return;
    }

    check_admin_referer('tda_seed_pages');

    $force = isset($_GET['tda_force']) && $_GET['tda_force'] === '1';
    $count = tda_seed_page_content($force);
    wp_safe_redirect(add_query_arg(
        [
            'tda_seeded' => (string) $count,
            'tda_force'  => $force ? '1' : '0',
        ],
        admin_url('themes.php')
    ));
    exit;
});

add_action('admin_notices', function () {
    if (!current_user_can('edit_pages')) {
        return;
    }

    if (get_option('tda_layout_notice_dismissed') === TDA_THEME_VERSION) {
        return;
    }

    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || $screen->id !== 'themes') {
        return;
    }

    $force_url = wp_nonce_url(admin_url('themes.php?tda_seed_pages=1&tda_force=1'), 'tda_seed_pages');
    echo '<div class="notice notice-warning"><p>';
    echo esc_html__('Tierra D\'Acogida: pages use custom section blocks for easy editing with original layout. Re-import if you still see Custom HTML blocks.', 'tierra-dacogida');
    echo ' <a href="' . esc_url($force_url) . '" onclick="return confirm(\'' . esc_js(__('Overwrite all theme page content with the latest layout?', 'tierra-dacogida')) . '\');">';
    echo esc_html__('Re-import all page content', 'tierra-dacogida');
    echo '</a></p></div>';
});

add_action('admin_notices', function () {
    if (!isset($_GET['tda_seeded']) || !current_user_can('edit_pages')) {
        return;
    }

    $count = (int) $_GET['tda_seeded'];
    $forced = isset($_GET['tda_force']) && $_GET['tda_force'] === '1';
    echo '<div class="notice notice-success is-dismissible"><p>';
    if ($forced) {
        printf(
            esc_html(
                _n(
                    '%d page re-imported from theme defaults.',
                    '%d pages re-imported from theme defaults.',
                    $count,
                    'tierra-dacogida'
                )
            ),
            $count
        );
    } else {
        printf(
            esc_html(
                _n(
                    '%d page updated with editable content.',
                    '%d pages updated with editable content.',
                    $count,
                    'tierra-dacogida'
                )
            ),
            $count
        );
    }
    echo '</p></div>';
});
