<?php
/**
 * Page hero partial.
 *
 * @package Tierra_Dacogida
 *
 * @var string $title_i18n
 * @var string $sub_i18n
 * @var string $breadcrumb_i18n
 */

$title_i18n     = $args['title_i18n'] ?? '';
$sub_i18n       = $args['sub_i18n'] ?? '';
$breadcrumb_i18n = $args['breadcrumb_i18n'] ?? '';
?>
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
      <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a>
      <span class="sep">/</span>
      <span data-i18n="<?php echo esc_attr($breadcrumb_i18n); ?>"></span>
    </nav>
    <h1 data-i18n="<?php echo esc_attr($title_i18n); ?>"></h1>
    <?php if ($sub_i18n) : ?>
      <p data-i18n="<?php echo esc_attr($sub_i18n); ?>"></p>
    <?php endif; ?>
  </div>
</section>
