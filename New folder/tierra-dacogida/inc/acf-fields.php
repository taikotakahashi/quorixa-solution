<?php
/**
 * ACF field groups (optional — theme works without ACF using defaults).
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_tda_home',
        'title' => 'Home Page',
        'fields' => [
            ['key' => 'field_tda_hero_title', 'label' => 'Hero Title', 'name' => 'hero_title', 'type' => 'text'],
            ['key' => 'field_tda_hero_text', 'label' => 'Hero Text', 'name' => 'hero_text', 'type' => 'textarea'],
            ['key' => 'field_tda_hero_image', 'label' => 'Hero Background', 'name' => 'hero_image', 'type' => 'image', 'return_format' => 'url'],
            ['key' => 'field_tda_stat1_val', 'label' => 'Stat 1 Value', 'name' => 'stat1_val', 'type' => 'text'],
            ['key' => 'field_tda_stat2_val', 'label' => 'Stat 2 Value', 'name' => 'stat2_val', 'type' => 'text'],
            ['key' => 'field_tda_stat3_val', 'label' => 'Stat 3 Value', 'name' => 'stat3_val', 'type' => 'text'],
        ],
        'location' => [[['param' => 'page_type', 'operator' => '==', 'value' => 'front_page']]],
    ]);

    acf_add_local_field_group([
        'key' => 'group_tda_gallery',
        'title' => 'Gallery',
        'fields' => [
            [
                'key' => 'field_tda_gallery_images',
                'label' => 'Gallery Images',
                'name' => 'gallery_images',
                'type' => 'gallery',
                'return_format' => 'array',
                'preview_size' => 'medium',
            ],
        ],
        'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-templates/template-gallery.php']]],
    ]);

    acf_add_local_field_group([
        'key' => 'group_tda_site',
        'title' => 'Site Options',
        'fields' => [
            ['key' => 'field_tda_phone', 'label' => 'Phone', 'name' => 'contact_phone', 'type' => 'text', 'default_value' => '+34 000 000 000'],
            ['key' => 'field_tda_email', 'label' => 'Email', 'name' => 'contact_email', 'type' => 'email', 'default_value' => 'info@tierradacogida.com'],
            ['key' => 'field_tda_whatsapp', 'label' => 'WhatsApp Number', 'name' => 'whatsapp_number', 'type' => 'text', 'default_value' => '34000000000'],
        ],
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tda-site-options']]],
    ]);
});

add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Site Options',
            'menu_title' => 'Tierra D\'Acogida',
            'menu_slug'  => 'tda-site-options',
            'capability' => 'edit_posts',
            'redirect'   => false,
        ]);
    }
});
