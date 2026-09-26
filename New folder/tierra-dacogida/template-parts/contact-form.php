<?php
/**
 * Contact form markup (used via shortcode and contact-info block).
 *
 * Optional `$args` / query var `tda_contact_form_labels` for editable labels.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

$labels = [];
if (isset($args) && is_array($args)) {
    $labels = $args;
} elseif (get_query_var('tda_contact_form_labels')) {
    $qv = get_query_var('tda_contact_form_labels');
    $labels = is_array($qv) ? $qv : [];
}

echo tda_render_contact_form_html($labels); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
