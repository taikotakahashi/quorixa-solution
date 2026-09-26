<?php
/**
 * Custom Tierra D'Acogida section blocks — fixed markup, editable content.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_filter('block_categories_all', function (array $categories): array {
    $categories[] = [
        'slug'  => 'tierra-dacogida',
        'title' => "Tierra D'Acogida",
    ];
    return $categories;
});

add_action('init', 'tda_register_theme_blocks');

/**
 * Default attribute catalog built from seeded page content (for repair on render).
 */
function tda_default_block_attrs_catalog(): array {
    static $catalog = null;
    if ($catalog !== null) {
        return $catalog;
    }

    $catalog = [];
    if (!function_exists('tda_build_page_block_content')) {
        return $catalog;
    }

    foreach (['home', 'about', 'programs', 'accommodation', 'activities', 'gallery', 'contact'] as $partial) {
        $content = tda_build_page_block_content($partial);
        if ($content === '') {
            continue;
        }
        foreach (parse_blocks($content) as $block) {
            $name = (string) ($block['blockName'] ?? '');
            if ($name === '' || strpos($name, 'tierra-dacogida/') !== 0) {
                continue;
            }
            $attrs = is_array($block['attrs'] ?? null) ? $block['attrs'] : [];
            if (!isset($catalog[$name])) {
                $catalog[$name] = $attrs;
                continue;
            }
            foreach ($attrs as $key => $value) {
                if (is_array($value) && $value && empty($catalog[$name][$key])) {
                    $catalog[$name][$key] = $value;
                }
            }
        }
    }

    return $catalog;
}

/**
 * Restore empty/missing list attrs (and programme images) from theme defaults.
 */
function tda_fill_block_attrs_from_defaults(string $block_name, array $attrs): array {
    $catalog = tda_default_block_attrs_catalog();
    $defaults = $catalog[$block_name] ?? null;
    if (!$defaults) {
        return $attrs;
    }

    $list_keys = ['programmes', 'cards', 'steps', 'stats', 'items', 'images', 'reviews', 'formFields'];
    foreach ($list_keys as $key) {
        if (!isset($defaults[$key]) || !is_array($defaults[$key]) || !$defaults[$key]) {
            continue;
        }
        if (empty($attrs[$key]) || !is_array($attrs[$key])) {
            $attrs[$key] = $defaults[$key];
        }
    }

    if ($block_name === 'tierra-dacogida/programme-cards'
        && !empty($attrs['programmes'])
        && is_array($attrs['programmes'])
        && !empty($defaults['programmes'])
    ) {
        foreach ($attrs['programmes'] as $i => $programme) {
            if (!is_array($programme)) {
                continue;
            }
            $fallback = $defaults['programmes'][$i] ?? null;
            if (!$fallback || !is_array($fallback)) {
                continue;
            }
            if (empty($programme['imageUrl']) && !empty($fallback['imageUrl'])) {
                $attrs['programmes'][$i]['imageUrl'] = $fallback['imageUrl'];
                if (empty($programme['imageAlt']) && !empty($fallback['imageAlt'])) {
                    $attrs['programmes'][$i]['imageAlt'] = $fallback['imageAlt'];
                }
            }
        }
    }

    if ($block_name === 'tierra-dacogida/feature-band'
        && empty($attrs['imageUrl'])
        && !empty($defaults['imageUrl'])
    ) {
        $attrs['imageUrl'] = $defaults['imageUrl'];
        if (empty($attrs['imageAlt']) && !empty($defaults['imageAlt'])) {
            $attrs['imageAlt'] = $defaults['imageAlt'];
        }
    }

    if ($block_name === 'tierra-dacogida/hero-photo') {
        foreach (['title', 'text', 'buttonText', 'buttonUrl', 'imageUrl'] as $key) {
            if (empty($attrs[$key]) && !empty($defaults[$key])) {
                $attrs[$key] = $defaults[$key];
            }
        }
        if (empty($attrs['imageUrl'])) {
            $attrs['imageUrl'] = tda_media_url('hero-back.jpeg');
        }
        if ((empty($attrs['images']) || !is_array($attrs['images'])) && !empty($attrs['imageUrl'])) {
            $attrs['images'] = [['url' => $attrs['imageUrl'], 'alt' => (string) ($attrs['imageAlt'] ?? '')]];
        }
    }

    if (in_array($block_name, ['tierra-dacogida/split-section', 'tierra-dacogida/feature-band'], true)) {
        if ((empty($attrs['images']) || !is_array($attrs['images'])) && !empty($attrs['imageUrl'])) {
            $attrs['images'] = [['url' => (string) $attrs['imageUrl'], 'alt' => (string) ($attrs['imageAlt'] ?? '')]];
        }
    }

    if ($block_name === 'tierra-dacogida/contact-info') {
        foreach ([
            'pill', 'title', 'intro', 'phone', 'email', 'whatsapp', 'whatsappText', 'buttonText',
            'phoneLabel', 'emailLabel', 'whatsappLabel', 'socialLabel',
            'linkedinUrl', 'facebookUrl', 'instagramUrl', 'formSubmitText',
        ] as $key) {
            if (empty($attrs[$key]) && !empty($defaults[$key])) {
                $attrs[$key] = $defaults[$key];
            }
        }
        if (empty($attrs['formFields']) || !is_array($attrs['formFields'])) {
            $attrs['formFields'] = function_exists('tda_default_contact_form_fields')
                ? tda_default_contact_form_fields()
                : ($defaults['formFields'] ?? []);
        }
    }

    return $attrs;
}

add_filter('render_block_data', function (array $block): array {
    $name = (string) ($block['blockName'] ?? '');
    if ($name === '' || strpos($name, 'tierra-dacogida/') !== 0) {
        return $block;
    }
    $attrs = is_array($block['attrs'] ?? null) ? $block['attrs'] : [];
    $block['attrs'] = tda_fill_block_attrs_from_defaults($name, $attrs);
    return $block;
}, 5);

function tda_register_block_editor_script(): void {
    wp_register_script(
        'tda-blocks-editor',
        TDA_THEME_URI . '/assets/js/blocks-editor.js',
        [
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data',
            'wp-rich-text',
            'wp-format-library',
            'wp-media-utils',
        ],
        TDA_THEME_VERSION,
        true
    );
}

add_action('enqueue_block_editor_assets', function (): void {
    if (!wp_script_is('tda-blocks-editor', 'registered')) {
        return;
    }
    wp_localize_script(
        'tda-blocks-editor',
        'tdaBlockDefaults',
        tda_default_block_attrs_catalog()
    );
});

/**
 * Array attribute schema that keeps objects (cards, images, etc.) on save.
 */
function tda_block_object_array_attr(): array {
    return [
        'type'    => 'array',
        'default' => [],
        'items'   => [
            'type' => 'object',
        ],
    ];
}

/**
 * String-list array attribute schema.
 */
function tda_block_string_array_attr(): array {
    return [
        'type'    => 'array',
        'default' => [],
        'items'   => [
            'type' => 'string',
        ],
    ];
}

/**
 * Shared image-effect attributes for media-bearing blocks.
 */
function tda_block_image_effect_attrs(): array {
    return [
        'imageFilter'  => ['type' => 'string', 'default' => 'none'],
        'imageOverlay' => ['type' => 'string', 'default' => 'none'],
        'imageFit'     => ['type' => 'string', 'default' => 'cover'],
        'imageRadius'  => ['type' => 'string', 'default' => 'none'],
        'imageBlur'    => ['type' => 'string', 'default' => 'none'],
        'imageMode'    => ['type' => 'string', 'default' => 'single'],
        'images'       => tda_block_object_array_attr(),
    ];
}

/**
 * Resolve image list from block attrs (single URL or multi slider).
 *
 * @param array<string,mixed> $attrs
 * @return list<array{url:string,alt:string}>
 */
function tda_block_images_list(array $attrs): array {
    $images = [];
    $mode   = (string) ($attrs['imageMode'] ?? 'single');
    $list   = is_array($attrs['images'] ?? null) ? $attrs['images'] : [];

    if ($mode === 'slider' || count($list) > 1) {
        foreach ($list as $img) {
            if (!is_array($img) || empty($img['url'])) {
                continue;
            }
            $images[] = [
                'url' => (string) $img['url'],
                'alt' => (string) ($img['alt'] ?? ''),
            ];
        }
    }

    if ($images === [] && !empty($attrs['imageUrl'])) {
        $images[] = [
            'url' => (string) $attrs['imageUrl'],
            'alt' => (string) ($attrs['imageAlt'] ?? ''),
        ];
    }

    // Prefer first slider image as primary when mode is single but images exist.
    if ($images === [] && $list) {
        foreach ($list as $img) {
            if (!is_array($img) || empty($img['url'])) {
                continue;
            }
            $images[] = [
                'url' => (string) $img['url'],
                'alt' => (string) ($img['alt'] ?? ''),
            ];
            break;
        }
    }

    return $images;
}

/**
 * CSS classes for image effects.
 */
function tda_media_effect_class(array $source): string {
    $filter  = sanitize_html_class((string) ($source['imageFilter'] ?? $source['filter'] ?? 'none'));
    $overlay = sanitize_html_class((string) ($source['imageOverlay'] ?? $source['overlay'] ?? 'none'));
    $fit     = sanitize_html_class((string) ($source['imageFit'] ?? $source['fit'] ?? 'cover'));
    $radius  = sanitize_html_class((string) ($source['imageRadius'] ?? $source['radius'] ?? 'none'));
    $blur    = sanitize_html_class((string) ($source['imageBlur'] ?? $source['blur'] ?? 'none'));
    $class   = 'tda-media';

    if ($filter !== '' && $filter !== 'none') {
        $class .= ' tda-media--filter-' . $filter;
    }
    if ($overlay !== '' && $overlay !== 'none') {
        $class .= ' tda-media--overlay-' . $overlay;
    }
    if ($fit !== '' && $fit !== 'cover') {
        $class .= ' tda-media--fit-' . $fit;
    }
    if ($radius !== '' && $radius !== 'none') {
        $class .= ' tda-media--radius-' . $radius;
    }
    if ($blur !== '' && $blur !== 'none') {
        $class .= ' tda-media--blur-' . $blur;
    }

    return $class;
}

/**
 * Inline style extras for media (custom radius px).
 */
function tda_media_effect_style(array $source): string {
    $radius = trim((string) ($source['imageRadius'] ?? ''));
    // Custom pixel values like "20px".
    if ($radius !== '' && preg_match('/^\d+(\.\d+)?px$/', $radius)) {
        return ' style="border-radius:' . esc_attr($radius) . ';overflow:hidden"';
    }
    return '';
}

/**
 * Render an image with optional effects wrapper.
 */
function tda_render_media_image(string $url, string $alt, array $effects = []): string {
    if ($url === '') {
        return '';
    }
    $class = esc_attr(tda_media_effect_class($effects));
    $style = tda_media_effect_style($effects);
    return '<div class="' . $class . '"' . $style . '><img src="' . esc_url($url) . '" alt="' . esc_attr($alt) . '" loading="lazy"></div>';
}

/**
 * Render single image or slider from block image attrs.
 *
 * @param array<string,mixed> $attrs
 * @param string              $wrap_class Extra wrapper class (e.g. split__media inner).
 */
function tda_render_media_area(array $attrs, string $wrap_class = ''): string {
    $images = tda_block_images_list($attrs);
    if ($images === []) {
        return '';
    }

    $mode    = (string) ($attrs['imageMode'] ?? 'single');
    $effects = tda_media_effect_class($attrs);
    $style   = tda_media_effect_style($attrs);
    $use_slider = ($mode === 'slider' && count($images) > 1);

    if (!$use_slider) {
        $first = $images[0];
        $html  = tda_render_media_image($first['url'], $first['alt'], $attrs);
        return $wrap_class !== ''
            ? '<div class="' . esc_attr($wrap_class) . '">' . $html . '</div>'
            : $html;
    }

    ob_start();
    ?>
    <div class="<?php echo esc_attr(trim($wrap_class . ' tda-slider ' . $effects)); ?>" data-tda-slider<?php echo $style; ?>>
      <div class="tda-slider__track">
        <?php foreach ($images as $i => $img) : ?>
          <div class="tda-slider__slide<?php echo $i === 0 ? ' is-active' : ''; ?>">
            <img src="<?php echo esc_url($img['url']); ?>" alt="<?php echo esc_attr($img['alt']); ?>" loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>">
          </div>
        <?php endforeach; ?>
      </div>
      <div class="tda-slider__dots" aria-hidden="true">
        <?php foreach ($images as $i => $_img) : ?>
          <button type="button" class="tda-slider__dot<?php echo $i === 0 ? ' is-active' : ''; ?>" data-tda-slide="<?php echo (int) $i; ?>" aria-label="<?php echo esc_attr(sprintf('Diapositiva %d', $i + 1)); ?>"></button>
        <?php endforeach; ?>
      </div>
      <button type="button" class="tda-slider__prev" aria-label="Anterior" data-tda-slider-prev>‹</button>
      <button type="button" class="tda-slider__next" aria-label="Siguiente" data-tda-slider-next>›</button>
    </div>
    <?php
    return (string) ob_get_clean();
}

/**
 * Shared heading typography attributes.
 */
function tda_block_typography_attrs(string $prefix = 'title'): array {
    return [
        $prefix . 'Color'     => ['type' => 'string', 'default' => ''],
        $prefix . 'FontSize'  => ['type' => 'string', 'default' => ''],
        $prefix . 'Transform' => ['type' => 'string', 'default' => 'none'],
    ];
}

/**
 * Allow limited rich HTML from the editor (color/size spans, bold, links).
 */
function tda_kses_rich(string $html): string {
    return wp_kses($html, [
        'span'   => ['class' => true, 'style' => true],
        'strong' => [],
        'b'      => [],
        'em'     => [],
        'i'      => [],
        'a'      => [
            'href'   => true,
            'title'  => true,
            'target' => true,
            'rel'    => true,
        ],
        'br'     => [],
    ]);
}

/**
 * Inline style string for typography attributes.
 */
function tda_typography_style(array $attrs, string $prefix = 'title'): string {
    $styles = [];
    $color  = trim((string) ($attrs[$prefix . 'Color'] ?? ''));
    $size   = trim((string) ($attrs[$prefix . 'FontSize'] ?? ''));
    $transform = trim((string) ($attrs[$prefix . 'Transform'] ?? 'none'));

    if ($color !== '' && preg_match('/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $color)) {
        $styles[] = 'color:' . $color;
    }
    if ($size !== '' && preg_match('/^\d+(\.\d+)?(px|rem|em|%)$/', $size)) {
        $styles[] = 'font-size:' . $size;
    }
    if (in_array($transform, ['uppercase', 'lowercase', 'capitalize'], true)) {
        $styles[] = 'text-transform:' . $transform;
    }

    return $styles ? ' style="' . esc_attr(implode(';', $styles)) . '"' : '';
}

function tda_register_theme_blocks(): void {
    tda_register_block_editor_script();

    $blocks = [
        'page-hero' => [
            'title'      => __('Page Hero', 'tierra-dacogida'),
            'attributes' => array_merge([
                'breadcrumbHome'    => ['type' => 'string', 'default' => 'Inicio'],
                'breadcrumbCurrent' => ['type' => 'string', 'default' => ''],
                'title'             => ['type' => 'string', 'default' => ''],
                'subtitle'          => ['type' => 'string', 'default' => ''],
            ], tda_block_typography_attrs('title'), tda_block_typography_attrs('subtitle')),
            'render' => 'tda_render_block_page_hero',
        ],
        'hero-photo' => [
            'title'      => __('Photo Hero', 'tierra-dacogida'),
            'attributes' => array_merge([
                'variant'    => ['type' => 'string', 'default' => 'home'],
                'title'      => ['type' => 'string', 'default' => ''],
                'text'       => ['type' => 'string', 'default' => ''],
                'buttonText' => ['type' => 'string', 'default' => ''],
                'buttonUrl'  => ['type' => 'string', 'default' => ''],
                'imageUrl'   => ['type' => 'string', 'default' => ''],
                'imageAlt'   => ['type' => 'string', 'default' => ''],
            ], tda_block_image_effect_attrs(), tda_block_typography_attrs('title')),
            'render' => 'tda_render_block_hero_photo',
        ],
        'split-section' => [
            'title'      => __('Split Section', 'tierra-dacogida'),
            'attributes' => array_merge([
                'sectionClass' => ['type' => 'string', 'default' => 'section'],
                'label'        => ['type' => 'string', 'default' => ''],
                'title'        => ['type' => 'string', 'default' => ''],
                'titleHtml'    => ['type' => 'string', 'default' => ''],
                'paragraphs'   => tda_block_string_array_attr(),
                'listItems'    => tda_block_string_array_attr(),
                'imageUrl'     => ['type' => 'string', 'default' => ''],
                'imageAlt'     => ['type' => 'string', 'default' => ''],
                'reverse'      => ['type' => 'boolean', 'default' => false],
                'buttonText'   => ['type' => 'string', 'default' => ''],
                'buttonUrl'    => ['type' => 'string', 'default' => ''],
            ], tda_block_image_effect_attrs(), tda_block_typography_attrs('title')),
            'render' => 'tda_render_block_split_section',
        ],
        'cards-section' => [
            'title'      => __('Cards Section', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass'   => ['type' => 'string', 'default' => 'section section--soft'],
                'headerClass'    => ['type' => 'string', 'default' => 'section__header fade-in'],
                'label'          => ['type' => 'string', 'default' => ''],
                'title'          => ['type' => 'string', 'default' => ''],
                'subtitle'       => ['type' => 'string', 'default' => ''],
                'gridClass'      => ['type' => 'string', 'default' => 'services-grid'],
                'cardClass'      => ['type' => 'string', 'default' => 'activity-card fade-in'],
                'columnsPerRow'  => tda_columns_per_row_attr(3),
                'cards'          => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_cards_section',
        ],
        'steps-section' => [
            'title'      => __('Steps Section', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass'  => ['type' => 'string', 'default' => 'section section--soft'],
                'label'         => ['type' => 'string', 'default' => ''],
                'title'         => ['type' => 'string', 'default' => ''],
                'gridClass'     => ['type' => 'string', 'default' => 'process-grid'],
                'columnsPerRow' => tda_columns_per_row_attr(2),
                'steps'         => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_steps_section',
        ],
        'stats-section' => [
            'title'      => __('Stats Section', 'tierra-dacogida'),
            'attributes' => [
                'titleHtml'     => ['type' => 'string', 'default' => ''],
                'columnsPerRow' => tda_columns_per_row_attr(3),
                'stats'         => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_stats_section',
        ],
        'programme-cards' => [
            'title'      => __('Programme Cards', 'tierra-dacogida'),
            'attributes' => [
                'label'       => ['type' => 'string', 'default' => ''],
                'titleHtml'   => ['type' => 'string', 'default' => ''],
                'subtitle'    => ['type' => 'string', 'default' => ''],
                'programmes'  => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_programme_cards',
        ],
        'feature-band' => [
            'title'      => __('Feature Band', 'tierra-dacogida'),
            'attributes' => array_merge([
                'title'      => ['type' => 'string', 'default' => ''],
                'text'       => ['type' => 'string', 'default' => ''],
                'imageUrl'   => ['type' => 'string', 'default' => ''],
                'imageAlt'   => ['type' => 'string', 'default' => ''],
                'buttonText' => ['type' => 'string', 'default' => ''],
                'buttonUrl'  => ['type' => 'string', 'default' => ''],
                'reverse'    => ['type' => 'boolean', 'default' => false],
            ], tda_block_image_effect_attrs(), tda_block_typography_attrs('title')),
            'render' => 'tda_render_block_feature_band',
        ],
        'support-section' => [
            'title'      => __('Support Section', 'tierra-dacogida'),
            'attributes' => [
                'titleHtml'     => ['type' => 'string', 'default' => ''],
                'subtitle'      => ['type' => 'string', 'default' => ''],
                'columnsPerRow' => tda_columns_per_row_attr(4),
                'items'         => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_support_section',
        ],
        'service-cards' => [
            'title'      => __('Service Cards', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass'  => ['type' => 'string', 'default' => 'section'],
                'label'         => ['type' => 'string', 'default' => ''],
                'title'         => ['type' => 'string', 'default' => ''],
                'gridClass'     => ['type' => 'string', 'default' => 'services-grid'],
                'columnsPerRow' => tda_columns_per_row_attr(3),
                'cards'         => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_service_cards',
        ],
        'gallery-section' => [
            'title'      => __('Gallery Section', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass'    => ['type' => 'string', 'default' => 'section section--soft'],
                'intro'           => ['type' => 'string', 'default' => ''],
                'title'           => ['type' => 'string', 'default' => ''],
                'gridClass'       => ['type' => 'string', 'default' => 'gallery-page-grid'],
                'columnsPerRow'   => tda_columns_per_row_attr(4),
                'images'          => tda_block_object_array_attr(),
                'imageMode'       => ['type' => 'string', 'default' => 'single'],
                'initialVisible'  => ['type' => 'number', 'default' => 8],
                'loadMoreStep'    => ['type' => 'number', 'default' => 8],
                'loadMoreText'    => ['type' => 'string', 'default' => 'Ver más'],
                'loadLessText'    => ['type' => 'string', 'default' => 'Ver menos'],
                'buttonText'      => ['type' => 'string', 'default' => ''],
                'buttonUrl'       => ['type' => 'string', 'default' => ''],
            ],
            'render' => 'tda_render_block_gallery_section',
        ],
        'reviews-section' => [
            'title'      => __('Reviews Section', 'tierra-dacogida'),
            'attributes' => [
                'title'   => ['type' => 'string', 'default' => ''],
                'label'   => ['type' => 'string', 'default' => ''],
                'reviews' => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_reviews_section',
        ],
        'timeline-section' => [
            'title'      => __('Timeline Section', 'tierra-dacogida'),
            'attributes' => [
                'label'    => ['type' => 'string', 'default' => ''],
                'title'    => ['type' => 'string', 'default' => ''],
                'items'    => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_timeline_section',
        ],
        'faq-section' => [
            'title'      => __('FAQ Section', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass' => ['type' => 'string', 'default' => 'section section--soft'],
                'title'        => ['type' => 'string', 'default' => ''],
                'items'        => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_faq_section',
        ],
        'cta-banner' => [
            'title'      => __('CTA Banner', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass' => ['type' => 'string', 'default' => 'section'],
                'pill'         => ['type' => 'string', 'default' => ''],
                'title'        => ['type' => 'string', 'default' => ''],
                'text'         => ['type' => 'string', 'default' => ''],
                'buttonText'   => ['type' => 'string', 'default' => ''],
                'buttonUrl'    => ['type' => 'string', 'default' => ''],
                'buttonClass'  => ['type' => 'string', 'default' => 'btn btn--orange'],
            ],
            'render' => 'tda_render_block_cta_banner',
        ],
        'contact-info' => [
            'title'      => __('Contact Info', 'tierra-dacogida'),
            'attributes' => [
                'pill'              => ['type' => 'string', 'default' => ''],
                'title'             => ['type' => 'string', 'default' => ''],
                'intro'             => ['type' => 'string', 'default' => ''],
                'phoneLabel'        => ['type' => 'string', 'default' => 'Teléfono'],
                'phone'             => ['type' => 'string', 'default' => ''],
                'emailLabel'        => ['type' => 'string', 'default' => 'Correo Electrónico'],
                'email'             => ['type' => 'string', 'default' => ''],
                'whatsappLabel'     => ['type' => 'string', 'default' => 'WhatsApp'],
                'whatsapp'          => ['type' => 'string', 'default' => ''],
                'whatsappText'      => ['type' => 'string', 'default' => 'Enviar mensaje'],
                'socialLabel'       => ['type' => 'string', 'default' => 'Redes Sociales'],
                'linkedinUrl'       => ['type' => 'string', 'default' => '#'],
                'facebookUrl'       => ['type' => 'string', 'default' => '#'],
                'instagramUrl'      => ['type' => 'string', 'default' => '#'],
                'buttonText'        => ['type' => 'string', 'default' => ''],
                'formFields'        => tda_block_object_array_attr(),
                'formSubmitText'    => ['type' => 'string', 'default' => 'Enviar Formulario'],
                // Legacy label attrs (migrated into formFields when empty).
                'formLabelNombre'   => ['type' => 'string', 'default' => ''],
                'formLabelApellido' => ['type' => 'string', 'default' => ''],
                'formLabelOrg'      => ['type' => 'string', 'default' => ''],
                'formLabelEmail'    => ['type' => 'string', 'default' => ''],
                'formLabelService'  => ['type' => 'string', 'default' => ''],
                'formLabelSubject'  => ['type' => 'string', 'default' => ''],
                'formLabelMessage'  => ['type' => 'string', 'default' => ''],
            ],
            'render' => 'tda_render_block_contact_info',
        ],
        'gallery-strip' => [
            'title'      => __('Gallery Strip', 'tierra-dacogida'),
            'attributes' => [
                'sectionClass'  => ['type' => 'string', 'default' => 'section'],
                'gridClass'     => ['type' => 'string', 'default' => 'gallery-grid'],
                'columnsPerRow' => tda_columns_per_row_attr(4),
                'images'        => tda_block_object_array_attr(),
            ],
            'render' => 'tda_render_block_gallery_strip',
        ],
    ];

    foreach ($blocks as $slug => $config) {
        register_block_type('tierra-dacogida/' . $slug, [
            'api_version'     => 3,
            'title'           => $config['title'],
            'category'        => 'tierra-dacogida',
            'attributes'      => $config['attributes'],
            'render_callback' => $config['render'],
            'editor_script'   => 'tda-blocks-editor',
            'supports'        => ['html' => false, 'multiple' => true],
        ]);
    }
}

/**
 * Serialize a theme block for storage / seeding.
 */
function tda_theme_block(string $slug, array $attrs): string {
    return tda_serialize_block('tierra-dacogida/' . $slug, $attrs);
}

function tda_esc_text(string $text): string {
    return esc_html(tda_fix_mojibake($text));
}

/**
 * Columns-per-row attribute (1–6) for multi-item grids.
 */
function tda_columns_per_row_attr(int $default = 3): array {
    return ['type' => 'number', 'default' => $default];
}

/**
 * Sanitize desktop columns; clamp to 1–6.
 */
function tda_sanitize_columns_per_row($value, int $default = 3): int {
    $cols = (int) $value;
    if ($cols < 1 || $cols > 6) {
        return $default;
    }
    return $cols;
}

/**
 * Inline style attribute so CSS can use --tda-cols.
 */
function tda_grid_cols_style(array $attrs, int $default = 3): string {
    $cols = tda_sanitize_columns_per_row($attrs['columnsPerRow'] ?? $default, $default);
    return ' style="--tda-cols:' . $cols . '"';
}

function tda_render_block_page_hero(array $attrs): string {
    $home    = tda_esc_text((string) ($attrs['breadcrumbHome'] ?? 'Inicio'));
    $current = tda_esc_text((string) ($attrs['breadcrumbCurrent'] ?? ''));
    $title   = tda_kses_rich((string) ($attrs['title'] ?? ''));
    $sub     = tda_kses_rich((string) ($attrs['subtitle'] ?? ''));
    $title_style = tda_typography_style($attrs, 'title');
    $sub_style   = tda_typography_style($attrs, 'subtitle');

    ob_start();
    ?>
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Navegación">
          <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo $home; ?></a><span class="sep">/</span><span><?php echo $current; ?></span>
        </nav>
        <h1<?php echo $title_style; ?>><?php echo $title; ?></h1>
        <?php if ($sub !== '') : ?><p<?php echo $sub_style; ?>><?php echo $sub; ?></p><?php endif; ?>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_hero_photo(array $attrs): string {
    $variant = sanitize_html_class((string) ($attrs['variant'] ?? 'home'));
    $title   = tda_kses_rich((string) ($attrs['title'] ?? ''));
    $text    = tda_kses_rich((string) ($attrs['text'] ?? ''));
    $btn     = tda_kses_rich((string) ($attrs['buttonText'] ?? ''));
    $url     = esc_url((string) ($attrs['buttonUrl'] ?? ''));
    $title_style = tda_typography_style($attrs, 'title');

    if (empty($attrs['imageUrl']) && empty($attrs['images'])) {
        $attrs['imageUrl'] = tda_media_url('hero-back.jpeg');
    }

    $images     = tda_block_images_list($attrs);
    $mode       = (string) ($attrs['imageMode'] ?? 'single');
    $use_slider = ($mode === 'slider' && count($images) > 1);
    $effects    = tda_media_effect_class($attrs);
    $radius_style = tda_media_effect_style($attrs);

    ob_start();
    ?>
    <section class="hero-photo hero-photo--<?php echo esc_attr($variant); ?> <?php echo esc_attr($effects); ?>"<?php echo $radius_style; ?>>
      <?php if ($images) : ?>
        <div class="hero-photo__media<?php echo $use_slider ? ' tda-slider' : ''; ?>"<?php echo $use_slider ? ' data-tda-slider' : ''; ?>>
          <?php if ($use_slider) : ?>
            <div class="tda-slider__track hero-photo__slides">
              <?php foreach ($images as $i => $img) : ?>
                <div class="tda-slider__slide hero-photo__slide<?php echo $i === 0 ? ' is-active' : ''; ?>"
                  style="background-image:url('<?php echo esc_url($img['url']); ?>')"
                  role="img"
                  aria-label="<?php echo esc_attr($img['alt'] !== '' ? $img['alt'] : sprintf('Hero image %d', $i + 1)); ?>"></div>
              <?php endforeach; ?>
            </div>
            <div class="tda-slider__dots hero-photo__dots" aria-hidden="true">
              <?php foreach ($images as $i => $_img) : ?>
                <button type="button" class="tda-slider__dot<?php echo $i === 0 ? ' is-active' : ''; ?>" data-tda-slide="<?php echo (int) $i; ?>"></button>
              <?php endforeach; ?>
            </div>
            <button type="button" class="tda-slider__prev" aria-label="Anterior" data-tda-slider-prev>‹</button>
            <button type="button" class="tda-slider__next" aria-label="Siguiente" data-tda-slider-next>›</button>
          <?php else : ?>
            <div class="hero-photo__slide is-active" style="background-image:url('<?php echo esc_url($images[0]['url']); ?>')" role="img" aria-label="<?php echo esc_attr($images[0]['alt']); ?>"></div>
          <?php endif; ?>
        </div>
      <?php endif; ?>
      <div class="hero-photo__overlay" aria-hidden="true"></div>
      <div class="container">
        <div class="hero-photo__content fade-in">
          <?php if (trim(wp_strip_all_tags($title)) !== '') : ?><h1<?php echo $title_style; ?>><?php echo $title; ?></h1><?php endif; ?>
          <?php if (trim(wp_strip_all_tags($text)) !== '') : ?><p><?php echo $text; ?></p><?php endif; ?>
          <?php if (trim(wp_strip_all_tags($btn)) !== '' && $url !== '') : ?>
            <a href="<?php echo $url; ?>" class="btn btn--orange"><?php echo $btn; ?></a>
          <?php endif; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_split_section(array $attrs): string {
    $section   = esc_attr((string) ($attrs['sectionClass'] ?? 'section'));
    $label     = tda_esc_text((string) ($attrs['label'] ?? ''));
    $title     = tda_kses_rich((string) ($attrs['title'] ?? ''));
    $titleHtml = (string) ($attrs['titleHtml'] ?? '');
    $paras     = is_array($attrs['paragraphs'] ?? null) ? $attrs['paragraphs'] : [];
    $items     = is_array($attrs['listItems'] ?? null) ? $attrs['listItems'] : [];
    $reverse   = !empty($attrs['reverse']);
    $btn       = tda_esc_text((string) ($attrs['buttonText'] ?? ''));
    $url       = esc_url((string) ($attrs['buttonUrl'] ?? ''));
    $split     = 'split fade-in' . ($reverse ? ' split--reverse' : '');
    $title_style = tda_typography_style($attrs, 'title');
    $media     = tda_render_media_area($attrs);

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <div class="<?php echo esc_attr($split); ?>">
          <div class="split__content">
            <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
            <?php if ($titleHtml !== '') : ?>
              <h2<?php echo $title_style; ?>><?php echo tda_kses_rich($titleHtml); ?></h2>
            <?php elseif ($title !== '') : ?>
              <h2<?php echo $title_style; ?>><?php echo $title; ?></h2>
            <?php endif; ?>
            <?php foreach ($paras as $p) : ?>
              <?php if (trim((string) $p) !== '') : ?><p><?php echo tda_kses_rich((string) $p); ?></p><?php endif; ?>
            <?php endforeach; ?>
            <?php if ($items) : ?>
              <ul class="feature-list">
                <?php foreach ($items as $item) : ?>
                  <li><?php echo tda_kses_rich((string) $item); ?></li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
            <?php if ($btn !== '' && $url !== '') : ?>
              <a href="<?php echo $url; ?>" class="btn btn--outline"><?php echo $btn; ?></a>
            <?php endif; ?>
          </div>
          <?php if ($media !== '') : ?>
            <div class="split__media">
              <?php echo $media; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_cards_section(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section section--soft'));
    $header  = esc_attr((string) ($attrs['headerClass'] ?? 'section__header fade-in'));
    $label   = tda_esc_text((string) ($attrs['label'] ?? ''));
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $sub     = tda_esc_text((string) ($attrs['subtitle'] ?? ''));
    $grid    = esc_attr((string) ($attrs['gridClass'] ?? 'services-grid'));
    $card    = esc_attr((string) ($attrs['cardClass'] ?? 'activity-card fade-in'));
    $cards   = is_array($attrs['cards'] ?? null) ? $attrs['cards'] : [];

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <?php if ($label !== '' || $title !== '' || $sub !== '') : ?>
          <div class="<?php echo $header; ?>">
            <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
            <?php if ($title !== '') : ?><h2 class="section__title"><?php echo $title; ?></h2><?php endif; ?>
            <?php if ($sub !== '') : ?><p class="section__subtitle"><?php echo $sub; ?></p><?php endif; ?>
          </div>
        <?php endif; ?>
        <div class="<?php echo $grid; ?>"<?php echo tda_grid_cols_style($attrs, 3); ?>>
          <?php foreach ($cards as $c) : ?>
            <div class="<?php echo $card; ?>">
              <?php if (!empty($c['title'])) : ?><h4><?php echo tda_esc_text((string) $c['title']); ?></h4><?php endif; ?>
              <?php if (!empty($c['text'])) : ?><p><?php echo tda_esc_text((string) $c['text']); ?></p><?php endif; ?>
              <?php if (!empty($c['items']) && is_array($c['items'])) : ?>
                <ul>
                  <?php foreach ($c['items'] as $item) : ?>
                    <li><?php echo tda_esc_text((string) $item); ?></li>
                  <?php endforeach; ?>
                </ul>
              <?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_steps_section(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section section--soft'));
    $label   = tda_esc_text((string) ($attrs['label'] ?? ''));
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $grid    = esc_attr((string) ($attrs['gridClass'] ?? 'process-grid'));
    $steps   = is_array($attrs['steps'] ?? null) ? $attrs['steps'] : [];

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <?php if ($label !== '' || $title !== '') : ?>
          <div class="section__header fade-in">
            <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
            <?php if ($title !== '') : ?><h2 class="section__title"><?php echo $title; ?></h2><?php endif; ?>
          </div>
        <?php endif; ?>
        <div class="<?php echo $grid; ?>"<?php echo tda_grid_cols_style($attrs, 2); ?>>
          <?php foreach ($steps as $i => $step) : ?>
            <div class="process-step fade-in">
              <div class="process-step__number"><?php echo (int) ($i + 1); ?></div>
              <?php if (!empty($step['title'])) : ?><h4><?php echo tda_esc_text((string) $step['title']); ?></h4><?php endif; ?>
              <?php if (!empty($step['text'])) : ?><p><?php echo tda_esc_text((string) $step['text']); ?></p><?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_stats_section(array $attrs): string {
    $titleHtml = (string) ($attrs['titleHtml'] ?? '');
    $stats     = is_array($attrs['stats'] ?? null) ? $attrs['stats'] : [];

    ob_start();
    ?>
    <section class="section section--soft">
      <div class="container">
        <?php if ($titleHtml !== '') : ?>
          <div class="section-header section-header--center fade-in">
            <h2><?php echo wp_kses_post($titleHtml); ?></h2>
          </div>
        <?php endif; ?>
        <div class="stats-row fade-in"<?php echo tda_grid_cols_style($attrs, 3); ?>>
          <?php foreach ($stats as $stat) : ?>
            <div class="stat-card">
              <div class="stat-card__number"><?php echo tda_esc_text((string) ($stat['value'] ?? '')); ?></div>
              <div class="stat-card__label"><?php echo tda_esc_text((string) ($stat['label'] ?? '')); ?></div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_programme_cards(array $attrs): string {
    $label      = tda_esc_text((string) ($attrs['label'] ?? ''));
    $titleHtml  = (string) ($attrs['titleHtml'] ?? '');
    $subtitle   = tda_esc_text((string) ($attrs['subtitle'] ?? ''));
    $programmes = is_array($attrs['programmes'] ?? null) ? $attrs['programmes'] : [];

    ob_start();
    ?>
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
          <?php if ($titleHtml !== '') : ?><h2><?php echo wp_kses_post($titleHtml); ?></h2><?php endif; ?>
          <?php if ($subtitle !== '') : ?><p><?php echo $subtitle; ?></p><?php endif; ?>
        </div>
        <div class="programme-list fade-in">
          <?php foreach ($programmes as $p) : ?>
            <?php
            $card_class = 'programme-card';
            if (!empty($p['reverse'])) {
                $card_class .= ' programme-card--reverse';
            }
            ?>
            <article class="<?php echo esc_attr($card_class); ?>">
              <?php
              $has_media = !empty($p['imageUrl']) || !empty($p['images']);
              if ($has_media) :
                $media_attrs = [
                    'imageUrl'    => (string) ($p['imageUrl'] ?? ''),
                    'imageAlt'    => (string) ($p['imageAlt'] ?? ''),
                    'imageMode'   => (string) ($p['imageMode'] ?? 'single'),
                    'images'      => is_array($p['images'] ?? null) ? $p['images'] : [],
                    'imageFilter' => (string) ($p['filter'] ?? 'none'),
                    'imageOverlay'=> (string) ($p['overlay'] ?? 'none'),
                    'imageFit'    => (string) ($p['fit'] ?? 'cover'),
                ];
                $media_html = tda_render_media_area($media_attrs);
                ?>
                <?php if ($media_html !== '') : ?>
                  <div class="programme-card__img">
                    <?php echo $media_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                  </div>
                <?php endif; ?>
              <?php endif; ?>
              <div class="programme-card__body">
                <?php if (!empty($p['title'])) : ?><h3><?php echo tda_esc_text((string) $p['title']); ?></h3><?php endif; ?>
                <?php if (!empty($p['text'])) : ?><p><?php echo tda_esc_text((string) $p['text']); ?></p><?php endif; ?>
                <?php if (!empty($p['meta'])) : ?><div class="programme-card__meta"><?php echo tda_esc_text((string) $p['meta']); ?></div><?php endif; ?>
                <?php if (!empty($p['buttonText']) && !empty($p['buttonUrl'])) : ?>
                  <a href="<?php echo esc_url((string) $p['buttonUrl']); ?>" class="btn btn--orange" style="margin-top:1.25rem;"><?php echo tda_esc_text((string) $p['buttonText']); ?></a>
                <?php endif; ?>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_feature_band(array $attrs): string {
    $title = tda_kses_rich((string) ($attrs['title'] ?? ''));
    $text  = tda_kses_rich((string) ($attrs['text'] ?? ''));
    $btn   = tda_esc_text((string) ($attrs['buttonText'] ?? ''));
    $url   = esc_url((string) ($attrs['buttonUrl'] ?? ''));
    $title_style = tda_typography_style($attrs, 'title');
    $band_class = 'feature-band' . (!empty($attrs['reverse']) ? ' feature-band--reverse' : '');
    $media = tda_render_media_area($attrs);

    ob_start();
    ?>
    <section class="section">
      <div class="container fade-in">
        <div class="<?php echo esc_attr($band_class); ?>">
          <?php if ($media !== '') : ?>
            <div class="feature-band__img">
              <?php echo $media; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </div>
          <?php endif; ?>
          <div class="feature-band__content">
            <?php if ($title !== '') : ?><h3<?php echo $title_style; ?>><?php echo $title; ?></h3><?php endif; ?>
            <?php if ($text !== '') : ?><p><?php echo $text; ?></p><?php endif; ?>
            <?php if ($btn !== '' && $url !== '') : ?>
              <a href="<?php echo $url; ?>" class="btn btn--white" style="margin-top:1.5rem;align-self:flex-start;"><?php echo $btn; ?></a>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_support_section(array $attrs): string {
    $titleHtml = (string) ($attrs['titleHtml'] ?? '');
    $subtitle  = tda_esc_text((string) ($attrs['subtitle'] ?? ''));
    $items     = is_array($attrs['items'] ?? null) ? $attrs['items'] : [];

    ob_start();
    ?>
    <section class="section section--soft">
      <div class="container">
        <div class="section-header section-header--center fade-in">
          <?php if ($titleHtml !== '') : ?><h2><?php echo wp_kses_post($titleHtml); ?></h2><?php endif; ?>
          <?php if ($subtitle !== '') : ?><p><?php echo $subtitle; ?></p><?php endif; ?>
        </div>
        <div class="support-grid fade-in"<?php echo tda_grid_cols_style($attrs, 4); ?>>
          <?php foreach ($items as $i => $item) : ?>
            <div class="support-card">
              <div class="support-card__icon" aria-hidden="true"><?php echo (int) ($i + 1); ?></div>
              <?php if (!empty($item['title'])) : ?><h4><?php echo tda_esc_text((string) $item['title']); ?></h4><?php endif; ?>
              <?php if (!empty($item['text'])) : ?><p><?php echo tda_esc_text((string) $item['text']); ?></p><?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_service_cards(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section'));
    $label   = tda_esc_text((string) ($attrs['label'] ?? ''));
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $grid    = esc_attr((string) ($attrs['gridClass'] ?? 'services-grid'));
    $cards   = is_array($attrs['cards'] ?? null) ? $attrs['cards'] : [];

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <?php if ($label !== '' || $title !== '') : ?>
          <div class="section__header fade-in">
            <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
            <?php if ($title !== '') : ?><h2 class="section__title"><?php echo $title; ?></h2><?php endif; ?>
          </div>
        <?php endif; ?>
        <div class="<?php echo $grid; ?>"<?php echo tda_grid_cols_style($attrs, 3); ?>>
          <?php foreach ($cards as $card) : ?>
            <article class="service-card fade-in">
              <?php
              $has_media = !empty($card['imageUrl']) || !empty($card['images']);
              if ($has_media) :
                $media_attrs = [
                    'imageUrl'     => (string) ($card['imageUrl'] ?? ''),
                    'imageAlt'     => (string) ($card['imageAlt'] ?? ''),
                    'imageMode'    => (string) ($card['imageMode'] ?? 'single'),
                    'images'       => is_array($card['images'] ?? null) ? $card['images'] : [],
                    'imageFilter'  => (string) ($card['filter'] ?? 'none'),
                    'imageOverlay' => (string) ($card['overlay'] ?? 'none'),
                    'imageFit'     => (string) ($card['fit'] ?? 'cover'),
                ];
                $media_html = tda_render_media_area($media_attrs);
                ?>
                <?php if ($media_html !== '') : ?>
                  <div class="service-card__image">
                    <?php echo $media_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                  </div>
                <?php endif; ?>
              <?php endif; ?>
              <div class="service-card__body">
                <?php if (!empty($card['title'])) : ?><h3><?php echo tda_esc_text((string) $card['title']); ?></h3><?php endif; ?>
                <?php if (!empty($card['text'])) : ?><p><?php echo tda_esc_text((string) $card['text']); ?></p><?php endif; ?>
                <?php if (!empty($card['items']) && is_array($card['items'])) : ?>
                  <ul class="feature-list">
                    <?php foreach ($card['items'] as $item) : ?>
                      <li><?php echo tda_esc_text((string) $item); ?></li>
                    <?php endforeach; ?>
                  </ul>
                <?php endif; ?>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_gallery_section(array $attrs): string {
    $section  = esc_attr((string) ($attrs['sectionClass'] ?? 'section section--soft'));
    $intro    = tda_esc_text((string) ($attrs['intro'] ?? ''));
    $title    = tda_esc_text((string) ($attrs['title'] ?? ''));
    $grid     = esc_attr((string) ($attrs['gridClass'] ?? 'gallery-page-grid'));
    $images   = is_array($attrs['images'] ?? null) ? $attrs['images'] : [];
    $btn      = tda_esc_text((string) ($attrs['buttonText'] ?? ''));
    $url      = esc_url((string) ($attrs['buttonUrl'] ?? ''));
    $mode     = ((string) ($attrs['imageMode'] ?? 'single')) === 'slider' ? 'slider' : 'single';
    $initial  = max(1, (int) ($attrs['initialVisible'] ?? 8));
    $step     = max(1, (int) ($attrs['loadMoreStep'] ?? 8));
    $moreText = tda_esc_text((string) ($attrs['loadMoreText'] ?? 'Ver más'));
    $lessText = tda_esc_text((string) ($attrs['loadLessText'] ?? 'Ver menos'));

    // Normalize image list (skip empty URLs).
    $list = [];
    foreach ($images as $image) {
        if (!is_array($image)) {
            continue;
        }
        $img_url = (string) ($image['url'] ?? '');
        if ($img_url === '') {
            continue;
        }
        $list[] = $image;
    }
    $total   = count($list);
    $hasMore = $mode === 'single' && $total > $initial;

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <?php if ($intro !== '' || $title !== '') : ?>
          <div class="section-header section-header--center fade-in">
            <?php if ($intro !== '') : ?><p><?php echo $intro; ?></p><?php endif; ?>
            <?php if ($title !== '') : ?><h2><?php echo $title; ?></h2><?php endif; ?>
          </div>
        <?php endif; ?>

        <?php if ($mode === 'slider' && $total > 0) : ?>
          <div class="gallery-section-slider tda-slider fade-in" data-tda-slider data-tda-gallery-slider>
            <div class="tda-slider__track">
              <?php foreach ($list as $i => $image) : ?>
                <?php
                $img_url = (string) ($image['url'] ?? '');
                $img_alt = (string) ($image['alt'] ?? '');
                $label   = $img_alt !== '' ? $img_alt : sprintf(__('Ver imagen %d', 'tierra-dacogida'), $i + 1);
                ?>
                <div class="tda-slider__slide<?php echo $i === 0 ? ' is-active' : ''; ?>">
                  <button
                    type="button"
                    class="gallery-page-item gallery-page-item--slide"
                    data-tda-gallery-item
                    data-index="<?php echo (int) $i; ?>"
                    data-src="<?php echo esc_url($img_url); ?>"
                    data-alt="<?php echo esc_attr($img_alt); ?>"
                    aria-label="<?php echo esc_attr($label); ?>"
                  >
                    <img
                      src="<?php echo esc_url($img_url); ?>"
                      alt="<?php echo esc_attr($img_alt); ?>"
                      loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>"
                      decoding="async"
                    >
                  </button>
                </div>
              <?php endforeach; ?>
            </div>
            <?php if ($total > 1) : ?>
              <div class="tda-slider__dots" aria-hidden="true">
                <?php for ($i = 0; $i < $total; $i++) : ?>
                  <button type="button" class="tda-slider__dot<?php echo $i === 0 ? ' is-active' : ''; ?>" data-tda-slide="<?php echo (int) $i; ?>" aria-label="<?php echo esc_attr(sprintf('Diapositiva %d', $i + 1)); ?>"></button>
                <?php endfor; ?>
              </div>
              <button type="button" class="tda-slider__prev" aria-label="Anterior" data-tda-slider-prev>‹</button>
              <button type="button" class="tda-slider__next" aria-label="Siguiente" data-tda-slider-next>›</button>
            <?php endif; ?>
          </div>
        <?php else : ?>
          <div
            class="<?php echo $grid; ?> fade-in"
            data-tda-gallery
            data-initial="<?php echo (int) $initial; ?>"
            data-step="<?php echo (int) $step; ?>"
            data-visible="<?php echo (int) $initial; ?>"
            <?php echo tda_grid_cols_style($attrs, 4); ?>
          >
            <?php foreach ($list as $i => $image) : ?>
              <?php
              $img_url = (string) ($image['url'] ?? '');
              $img_alt = (string) ($image['alt'] ?? '');
              $visible = $i < $initial;
              $effects = [
                  'filter'  => $image['filter'] ?? 'none',
                  'overlay' => $image['overlay'] ?? 'none',
                  'fit'     => $image['fit'] ?? 'cover',
              ];
              $effect_class = esc_attr(tda_media_effect_class($effects));
              $effect_style = tda_media_effect_style($effects);
              $label = $img_alt !== '' ? $img_alt : sprintf(__('Ver imagen %d', 'tierra-dacogida'), $i + 1);
              ?>
              <button
                type="button"
                class="gallery-page-item <?php echo $effect_class; ?><?php echo $visible ? '' : ' is-deferred'; ?>"
                data-tda-gallery-item
                data-index="<?php echo (int) $i; ?>"
                data-src="<?php echo esc_url($img_url); ?>"
                data-alt="<?php echo esc_attr($img_alt); ?>"
                aria-label="<?php echo esc_attr($label); ?>"
                aria-hidden="<?php echo $visible ? 'false' : 'true'; ?>"
                <?php echo $effect_style; ?>
              >
                <?php if ($visible) : ?>
                  <img
                    src="<?php echo esc_url($img_url); ?>"
                    alt="<?php echo esc_attr($img_alt); ?>"
                    loading="<?php echo $i < 4 ? 'eager' : 'lazy'; ?>"
                    decoding="async"
                  >
                <?php endif; ?>
              </button>
            <?php endforeach; ?>
          </div>
          <?php if ($hasMore) : ?>
            <div class="gallery-load-more fade-in" data-tda-gallery-controls>
              <button
                type="button"
                class="btn btn--outline"
                data-tda-gallery-more
                data-i18n="gallery.viewMore"
              ><?php echo $moreText !== '' ? $moreText : esc_html__('Ver más', 'tierra-dacogida'); ?></button>
              <button
                type="button"
                class="btn btn--outline"
                data-tda-gallery-less
                data-i18n="gallery.viewLess"
                hidden
                aria-hidden="true"
              ><?php echo $lessText !== '' ? $lessText : esc_html__('Ver menos', 'tierra-dacogida'); ?></button>
            </div>
          <?php endif; ?>
        <?php endif; ?>

        <?php if ($btn !== '' && $url !== '') : ?>
          <p class="gallery-section-cta fade-in">
            <a href="<?php echo $url; ?>" class="btn btn--orange"><?php echo $btn; ?></a>
          </p>
        <?php endif; ?>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_gallery_strip(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section'));
    $grid    = esc_attr((string) ($attrs['gridClass'] ?? 'gallery-grid'));
    $images  = is_array($attrs['images'] ?? null) ? $attrs['images'] : [];

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <div class="<?php echo $grid; ?> fade-in"<?php echo tda_grid_cols_style($attrs, 4); ?>>
          <?php foreach ($images as $image) : ?>
            <?php
            $effects = [
                'filter'  => $image['filter'] ?? 'none',
                'overlay' => $image['overlay'] ?? 'none',
                'fit'     => $image['fit'] ?? 'cover',
            ];
            $wrap = !empty($image['wide']) ? 'gallery-item gallery-item--wide' : 'gallery-item';
            ?>
            <div class="<?php echo esc_attr($wrap); ?>">
              <?php echo tda_render_media_image((string) ($image['url'] ?? ''), (string) ($image['alt'] ?? ''), $effects); ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_reviews_section(array $attrs): string {
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $label   = tda_esc_text((string) ($attrs['label'] ?? 'Testimonio de participante'));
    $reviews = is_array($attrs['reviews'] ?? null) ? $attrs['reviews'] : [];

    ob_start();
    ?>
    <section class="section">
      <div class="container">
        <?php if ($title !== '') : ?>
          <div class="section-header section-header--center fade-in">
            <h2><?php echo $title; ?></h2>
          </div>
        <?php endif; ?>
        <div class="reviews-row fade-in">
          <?php foreach ($reviews as $review) : ?>
            <div class="review-card">
              <span class="review-card__label"><?php echo $label; ?></span>
              <p><?php echo tda_esc_text((string) ($review['text'] ?? '')); ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_timeline_section(array $attrs): string {
    $label = tda_esc_text((string) ($attrs['label'] ?? ''));
    $title = tda_esc_text((string) ($attrs['title'] ?? ''));
    $items = is_array($attrs['items'] ?? null) ? $attrs['items'] : [];

    ob_start();
    ?>
    <section class="section">
      <div class="container">
        <div class="section__header fade-in">
          <?php if ($label !== '') : ?><span class="section__label"><?php echo $label; ?></span><?php endif; ?>
          <?php if ($title !== '') : ?><h2 class="section__title"><?php echo $title; ?></h2><?php endif; ?>
        </div>
        <div class="timeline fade-in">
          <?php foreach ($items as $item) : ?>
            <div class="timeline-item">
              <?php if (!empty($item['title'])) : ?><h4><?php echo tda_esc_text((string) $item['title']); ?></h4><?php endif; ?>
              <?php if (!empty($item['text'])) : ?><p><?php echo tda_esc_text((string) $item['text']); ?></p><?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_faq_section(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section section--soft'));
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $items   = is_array($attrs['items'] ?? null) ? $attrs['items'] : [];

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <?php if ($title !== '') : ?>
          <div class="section__header fade-in">
            <h2 class="section__title"><?php echo $title; ?></h2>
          </div>
        <?php endif; ?>
        <div class="faq-list fade-in">
          <?php foreach ($items as $item) : ?>
            <div class="faq-item">
              <button class="faq-item__question" type="button"><?php echo tda_esc_text((string) ($item['question'] ?? '')); ?></button>
              <div class="faq-item__answer">
                <p><?php echo tda_esc_text((string) ($item['answer'] ?? '')); ?></p>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_cta_banner(array $attrs): string {
    $section = esc_attr((string) ($attrs['sectionClass'] ?? 'section'));
    $pill    = tda_esc_text((string) ($attrs['pill'] ?? ''));
    $title   = tda_esc_text((string) ($attrs['title'] ?? ''));
    $text    = tda_esc_text((string) ($attrs['text'] ?? ''));
    $btn     = tda_esc_text((string) ($attrs['buttonText'] ?? ''));
    $url     = esc_url((string) ($attrs['buttonUrl'] ?? ''));
    $class   = esc_attr((string) ($attrs['buttonClass'] ?? 'btn btn--orange'));

    ob_start();
    ?>
    <section class="<?php echo $section; ?>">
      <div class="container">
        <div class="cta-banner fade-in">
          <?php if ($pill !== '') : ?><span class="pill"><?php echo $pill; ?></span><?php endif; ?>
          <?php if ($title !== '') : ?><h2><?php echo $title; ?></h2><?php endif; ?>
          <?php if ($text !== '') : ?><p><?php echo $text; ?></p><?php endif; ?>
          <?php if ($btn !== '' && $url !== '') : ?><a href="<?php echo $url; ?>" class="<?php echo $class; ?>"><?php echo $btn; ?></a><?php endif; ?>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}

function tda_render_block_contact_info(array $attrs): string {
    $pill    = tda_kses_rich((string) ($attrs['pill'] ?? ''));
    $title   = tda_kses_rich((string) ($attrs['title'] ?? ''));
    $intro   = tda_kses_rich((string) ($attrs['intro'] ?? ''));
    $phone   = tda_esc_text((string) ($attrs['phone'] ?? ''));
    $email   = sanitize_email((string) ($attrs['email'] ?? ''));
    $wa      = preg_replace('/\D+/', '', (string) ($attrs['whatsapp'] ?? ''));
    $waText  = tda_kses_rich((string) ($attrs['whatsappText'] ?? 'Enviar mensaje'));
    $btnText = tda_kses_rich((string) ($attrs['buttonText'] ?? ''));
    $phone_label = tda_esc_text((string) ($attrs['phoneLabel'] ?? 'Teléfono'));
    $email_label = tda_esc_text((string) ($attrs['emailLabel'] ?? 'Correo Electrónico'));
    $wa_label    = tda_esc_text((string) ($attrs['whatsappLabel'] ?? 'WhatsApp'));
    $social_label = tda_esc_text((string) ($attrs['socialLabel'] ?? 'Redes Sociales'));
    $li = esc_url((string) ($attrs['linkedinUrl'] ?? '#'));
    $fb = esc_url((string) ($attrs['facebookUrl'] ?? '#'));
    $ig = esc_url((string) ($attrs['instagramUrl'] ?? '#'));
    $tel     = 'tel:' . preg_replace('/[^\d+]/', '', $phone);
    $waLink  = $wa !== '' ? 'https://wa.me/' . $wa : '#';

    $form_fields = tda_contact_form_fields_from_attrs($attrs);
    $form_submit = (string) ($attrs['formSubmitText'] ?? 'Enviar Formulario');

    ob_start();
    ?>
    <section class="section">
      <div class="container">
        <div class="contact-block fade-in">
          <div class="contact-block__info">
            <?php if (trim(wp_strip_all_tags($pill)) !== '') : ?><span class="pill"><?php echo $pill; ?></span><?php endif; ?>
            <?php if (trim(wp_strip_all_tags($title)) !== '') : ?><h2><?php echo $title; ?></h2><?php endif; ?>
            <?php if (trim(wp_strip_all_tags($intro)) !== '') : ?><p><?php echo $intro; ?></p><?php endif; ?>
            <div class="contact-details">
              <?php if ($phone !== '') : ?>
                <div class="contact-details__item">
                  <h4><?php echo $phone_label; ?></h4>
                  <p><a href="<?php echo esc_attr($tel); ?>"><?php echo $phone; ?></a></p>
                </div>
              <?php endif; ?>
              <?php if ($email !== '') : ?>
                <div class="contact-details__item">
                  <h4><?php echo $email_label; ?></h4>
                  <p><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></p>
                </div>
              <?php endif; ?>
              <?php if ($wa !== '') : ?>
                <div class="contact-details__item">
                  <h4><?php echo $wa_label; ?></h4>
                  <p><a href="<?php echo esc_url($waLink); ?>" target="_blank" rel="noopener noreferrer"><?php echo $waText; ?></a></p>
                </div>
              <?php endif; ?>
              <div class="contact-details__item">
                <h4><?php echo $social_label; ?></h4>
                <div class="social-row">
                  <a href="<?php echo $li; ?>" aria-label="LinkedIn"<?php echo $li !== '#' ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>in</a>
                  <a href="<?php echo $fb; ?>" aria-label="Facebook"<?php echo $fb !== '#' ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>f</a>
                  <a href="<?php echo $ig; ?>" aria-label="Instagram"<?php echo $ig !== '#' ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>ig</a>
                </div>
              </div>
            </div>
            <?php if (trim(wp_strip_all_tags($btnText)) !== '' && $wa !== '') : ?>
              <a href="<?php echo esc_url($waLink); ?>" class="btn btn--outline" target="_blank" rel="noopener noreferrer" style="margin-top:1.5rem;"><?php echo $btnText; ?></a>
            <?php endif; ?>
          </div>
          <div class="form-box">
            <?php
            echo tda_render_contact_form_html([ // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                'fields' => $form_fields,
                'submit' => $form_submit,
            ]);
            ?>
          </div>
        </div>
      </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
