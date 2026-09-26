<?php
/**
 * Auto-create pages on theme activation.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('after_switch_theme', 'tda_create_default_pages');

function tda_create_default_pages(): void {
    $pages = [
        ['title' => 'Inicio', 'slug' => 'inicio', 'template' => ''],
        ['title' => 'Nosotros', 'slug' => 'nosotros', 'template' => ''],
        ['title' => 'Programas', 'slug' => 'programas', 'template' => ''],
        ['title' => 'Alojamiento', 'slug' => 'alojamiento', 'template' => ''],
        ['title' => 'Actividades', 'slug' => 'actividades', 'template' => ''],
        ['title' => 'Galería', 'slug' => 'galeria', 'template' => 'page-templates/template-gallery.php'],
        ['title' => 'Contacto', 'slug' => 'contacto', 'template' => 'page-templates/template-contact.php'],
    ];

    $front_id = 0;

    foreach ($pages as $p) {
        $existing = get_page_by_path($p['slug']);
        if ($existing) {
            if ($p['slug'] === 'inicio') {
                $front_id = $existing->ID;
            }
            continue;
        }
        $id = wp_insert_post([
            'post_title'   => $p['title'],
            'post_name'    => $p['slug'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_content' => '',
        ]);
        if ($id && !is_wp_error($id)) {
            if ($p['template']) {
                update_post_meta($id, '_wp_page_template', $p['template']);
            }
            if ($p['slug'] === 'inicio') {
                $front_id = $id;
            }
        }
    }

    if ($front_id) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $front_id);
    }

    flush_rewrite_rules();
}
