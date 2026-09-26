<?php
/**
 * Default page template — content is editable in the block editor.
 *
 * @package Tierra_Dacogida
 */

get_header();
if (function_exists('tda_render_page_content')) {
    tda_render_page_content();
} else {
    echo '<main class="site-main">';
    while (have_posts()) {
        the_post();
        the_content();
    }
    echo '</main>';
}
get_footer();
