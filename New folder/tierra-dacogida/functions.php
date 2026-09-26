<?php
/**
 * Tierra D'Acogida theme bootstrap.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

define('TDA_THEME_VERSION', '1.9.9');
define('TDA_THEME_DIR', get_template_directory());
define('TDA_THEME_URI', get_template_directory_uri());

require_once TDA_THEME_DIR . '/inc/helpers.php';
require_once TDA_THEME_DIR . '/inc/setup.php';
require_once TDA_THEME_DIR . '/inc/enqueue.php';
require_once TDA_THEME_DIR . '/inc/acf-fields.php';
require_once TDA_THEME_DIR . '/inc/contact-form.php';
require_once TDA_THEME_DIR . '/inc/polylang.php';
require_once TDA_THEME_DIR . '/inc/theme-activation.php';
require_once TDA_THEME_DIR . '/inc/block-builder.php';
require_once TDA_THEME_DIR . '/inc/blocks.php';
require_once TDA_THEME_DIR . '/inc/page-block-defaults.php';
require_once TDA_THEME_DIR . '/inc/page-content-seeder.php';
require_once TDA_THEME_DIR . '/inc/editor.php';
