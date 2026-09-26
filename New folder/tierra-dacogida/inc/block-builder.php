<?php
/**
 * Convert theme page HTML into native Gutenberg blocks.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

/**
 * Join serialized block strings.
 */
function tda_blocks_join(array $blocks): string {
    $blocks = array_filter(array_map('trim', $blocks));
    return implode("\n\n", $blocks);
}

/**
 * Serialize a Gutenberg block comment.
 */
function tda_serialize_block(string $name, array $attrs, string $content = ''): string {
    $json = wp_json_encode($attrs, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $json = $json ?: '{}';
    $content = trim($content);

    if ($content === '') {
        return "<!-- wp:{$name} {$json} /-->";
    }

    return "<!-- wp:{$name} {$json} -->\n{$content}\n<!-- /wp:{$name} -->";
}

/**
 * Whether page content still uses legacy Custom HTML blocks only.
 */
function tda_page_uses_legacy_html_blocks(string $content): bool {
    $content = trim($content);
    if ($content === '' || strpos($content, '<!-- wp:html -->') === false) {
        return false;
    }

    return strpos($content, '<!-- wp:heading') === false
        && strpos($content, '<!-- wp:group') === false
        && strpos($content, '<!-- wp:paragraph') === false;
}

/**
 * Convert captured theme HTML into native blocks.
 */
function tda_html_to_blocks(string $html): string {
    $html = trim(tda_normalize_page_html($html));
    if ($html === '') {
        return '';
    }

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $loaded = $dom->loadHTML(
        '<?xml encoding="utf-8"?><div id="tda-root">' . $html . '</div>',
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );
    libxml_clear_errors();

    if (!$loaded) {
        return tda_wrap_html_block($html);
    }

    $root = $dom->getElementById('tda-root');
    if (!$root) {
        return tda_wrap_html_block($html);
    }

    return tda_blocks_join(tda_dom_children_to_blocks($root));
}

/**
 * @return list<string>
 */
function tda_dom_children_to_blocks(DOMNode $parent): array {
    $blocks = [];

    foreach ($parent->childNodes as $child) {
        $block = tda_dom_node_to_block($child);
        if ($block !== '') {
            $blocks[] = $block;
        }
    }

    return $blocks;
}

function tda_dom_node_to_block(DOMNode $node): string {
    if ($node instanceof DOMText) {
        $text = trim($node->textContent ?? '');
        if ($text === '') {
            return '';
        }
        return tda_block_paragraph($text);
    }

    if (!$node instanceof DOMElement) {
        return '';
    }

    $tag   = strtolower($node->tagName);
    $class = tda_dom_class($node);

    if ($tag === 'section' || ($tag === 'div' && $class !== '')) {
        return tda_dom_container_to_block($node);
    }

    return tda_dom_leaf_to_block($node);
}

function tda_dom_container_to_block(DOMElement $node): string {
    $tag   = strtolower($node->tagName);
    $class = tda_dom_class($node);

    if ($tag === 'section') {
        return tda_block_group(
            $class,
            tda_blocks_join(tda_dom_children_to_blocks($node)),
            ['layout' => ['type' => 'constrained']]
        );
    }

    if ($class === 'container' || str_contains($class, 'container')) {
        return tda_block_group($class, tda_blocks_join(tda_dom_children_to_blocks($node)));
    }

    if (tda_dom_is_grid_container($class)) {
        return tda_block_group($class, tda_blocks_join(tda_dom_children_to_blocks($node)));
    }

    if (in_array($class, ['split__content', 'split__media', 'programme-card__body', 'programme-card__img', 'service-card__body', 'service-card__image', 'feature-band__content', 'feature-band__img', 'contact-block__info', 'form-box', 'hero-photo__content', 'section__header', 'section-header', 'section-header--center', 'cta-banner', 'contact-details', 'contact-details__item', 'timeline-item', 'faq-item__answer', 'programme-card__meta', 'review-card', 'stat-card', 'support-card', 'process-step', 'accommodation-card', 'activity-card', 'service-card', 'gallery-item', 'gallery-item--wide'], true)
        || str_contains($class, 'split__')
        || str_contains($class, '__body')
        || str_contains($class, '__content')
        || str_contains($class, '__info')
        || str_contains($class, '__img')
        || str_contains($class, '__media')
        || str_contains($class, 'card')
        || str_contains($class, 'step')
        || str_contains($class, 'banner')
        || str_contains($class, 'header')
    ) {
        return tda_block_group($class, tda_blocks_join(tda_dom_children_to_blocks($node)));
    }

    if ($class === 'hero-photo__overlay') {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    if ($class === 'process-step__number' || $class === 'support-card__icon' || $class === 'stat-card__number' || $class === 'stat-card__label' || $class === 'review-card__label' || $class === 'social-row') {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    if ($class === 'faq-item') {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    if ($tag === 'article') {
        return tda_block_group($class, tda_blocks_join(tda_dom_children_to_blocks($node)));
    }

    if ($tag === 'nav' && str_contains($class, 'breadcrumb')) {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    $inner = tda_blocks_join(tda_dom_children_to_blocks($node));
    if ($inner === '') {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    return tda_block_group($class, $inner);
}

function tda_dom_leaf_to_block(DOMElement $node): string {
    $tag = strtolower($node->tagName);

    switch ($tag) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return tda_block_heading_from_element($node);
        case 'p':
            return tda_block_paragraph_from_element($node);
        case 'img':
            return tda_block_image_from_element($node);
        case 'a':
            return tda_block_link_from_element($node);
        case 'ul':
            return tda_block_list_from_element($node);
        case 'span':
            return tda_block_paragraph_from_element($node, 'span');
        case 'button':
            return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
        default:
            $inner = tda_blocks_join(tda_dom_children_to_blocks($node));
            if ($inner !== '') {
                return tda_block_group(tda_dom_class($node), $inner);
            }
            return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }
}

function tda_dom_is_grid_container(string $class): bool {
    static $containers = [
        'split', 'split fade-in', 'split split--reverse fade-in', 'services-grid', 'activity-grid',
        'process-grid', 'support-grid', 'stats-row', 'accommodation-grid', 'gallery-grid',
        'gallery-page-grid', 'programme-list', 'reviews-row', 'timeline', 'faq-list',
        'contact-block', 'feature-band', 'programme-card', 'hero-photo', 'hero-photo hero-photo--home',
    ];

    if (in_array($class, $containers, true)) {
        return true;
    }

    foreach ($containers as $needle) {
        if ($class !== '' && (str_contains($class, $needle) || str_contains($needle, $class))) {
            return true;
        }
    }

    return str_contains($class, 'grid')
        || str_contains($class, 'split')
        || str_contains($class, 'row')
        || str_contains($class, 'list')
        || str_contains($class, 'band')
        || str_contains($class, 'hero-photo');
}

function tda_dom_class(DOMElement $node): string {
    return trim($node->getAttribute('class') ?? '');
}

function tda_dom_attrs(DOMElement $node, array $allowed): string {
    $parts = [];
    foreach ($allowed as $attr) {
        if (!$node->hasAttribute($attr)) {
            continue;
        }
        $parts[] = $attr . '="' . esc_attr($node->getAttribute($attr)) . '"';
    }
    return $parts ? ' ' . implode(' ', $parts) : '';
}

function tda_dom_inner_html(DOMElement $node): string {
    $html = '';
    foreach ($node->childNodes as $child) {
        $html .= $node->ownerDocument->saveHTML($child);
    }
    return trim($html);
}

function tda_block_group(string $className, string $inner, array $extra_attrs = []): string {
    $attrs = array_merge(['layout' => ['type' => 'default']], $extra_attrs);
    if ($className !== '') {
        $attrs['className'] = $className;
    }
    return tda_serialize_block('group', $attrs, $inner);
}

function tda_block_heading_from_element(DOMElement $node): string {
    $level = (int) substr(strtolower($node->tagName), 1);
    $class = tda_dom_class($node);
    $attrs = ['level' => max(1, min(6, $level))];
    if ($class !== '') {
        $attrs['className'] = $class;
    }

    $tag   = 'h' . $attrs['level'];
    $extra = tda_dom_attrs($node, ['data-i18n', 'class']);
    $inner = tda_dom_inner_html($node);
    $html  = '<' . $tag . ' class="wp-block-heading' . ($class !== '' ? ' ' . esc_attr($class) : '') . '"' . $extra . '>' . $inner . '</' . $tag . '>';

    return tda_serialize_block('heading', $attrs, $html);
}

function tda_block_paragraph_from_element(DOMElement $node, string $tag = 'p'): string {
    $class = tda_dom_class($node);
    $attrs = [];
    if ($class !== '') {
        $attrs['className'] = $class;
    }

    $extra = tda_dom_attrs($node, ['data-i18n', 'class', 'style']);
    $inner = tda_dom_inner_html($node);
    if ($inner === '') {
        $inner = esc_html($node->textContent ?? '');
    }

    $html = '<' . $tag . ' class="wp-block-paragraph' . ($class !== '' ? ' ' . esc_attr($class) : '') . '"' . $extra . '>' . $inner . '</' . $tag . '>';
    return tda_serialize_block('paragraph', $attrs, $html);
}

function tda_block_paragraph(string $text, string $className = ''): string {
    $attrs = $className !== '' ? ['className' => $className] : [];
    $class = $className !== '' ? ' class="wp-block-paragraph ' . esc_attr($className) . '"' : ' class="wp-block-paragraph"';
    return tda_serialize_block('paragraph', $attrs, '<p' . $class . '>' . esc_html($text) . '</p>');
}

function tda_block_image_from_element(DOMElement $node): string {
    $src = $node->getAttribute('src');
    $alt = $node->getAttribute('alt');
    $attrs = [
        'sizeSlug' => 'large',
        'linkDestination' => 'none',
    ];

    $extra = tda_dom_attrs($node, ['data-i18n-alt', 'loading', 'class']);
    $html  = '<figure class="wp-block-image size-large"><img src="' . esc_url($src) . '" alt="' . esc_attr($alt) . '"' . $extra . '/></figure>';

    return tda_serialize_block('image', $attrs, $html);
}

function tda_block_link_from_element(DOMElement $node): string {
    $class = tda_dom_class($node);
    if (str_contains($class, 'btn')) {
        return tda_wrap_html_block($node->ownerDocument->saveHTML($node));
    }

    $href  = $node->getAttribute('href');
    $extra = tda_dom_attrs($node, ['data-i18n', 'class', 'target', 'rel']);
    $text  = trim($node->textContent ?? '');
    $html  = '<p class="wp-block-paragraph"><a href="' . esc_url($href) . '"' . $extra . '>' . esc_html($text) . '</a></p>';

    return tda_serialize_block('paragraph', [], $html);
}

function tda_block_list_from_element(DOMElement $node): string {
    $class = tda_dom_class($node);
    $attrs = [];
    if ($class !== '') {
        $attrs['className'] = $class;
    }

    $items = '';
    foreach ($node->getElementsByTagName('li') as $li) {
        if ($li->parentNode !== $node) {
            continue;
        }
        $extra = tda_dom_attrs($li, ['data-i18n']);
        $text  = trim($li->textContent ?? '');
        $items .= '<li' . $extra . '>' . esc_html($text) . '</li>';
    }

    $html = '<ul class="wp-block-list' . ($class !== '' ? ' ' . esc_attr($class) : '') . '">' . $items . '</ul>';
    return tda_serialize_block('list', $attrs, $html);
}

/**
 * Build native blocks for contact page with shortcode form block.
 */
function tda_build_contact_native_blocks(): string {
    $html = tda_capture_page_partial('contact');

    if (!preg_match('#^(.*?<div class="form-box">)\s*</div>(.*)$#s', $html, $matches)) {
        return tda_html_to_blocks($html);
    }

    $before_form = $matches[1];
    $after_form  = '</div>' . $matches[2];

    return tda_blocks_join([
        tda_html_to_blocks($before_form),
        tda_wrap_shortcode_block('[tda_contact_form]'),
        tda_html_to_blocks($after_form),
    ]);
}
