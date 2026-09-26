<?php
defined('ABSPATH') || exit;

$gallery_items = [];
$gallery = tda_get_field('gallery_images');
if (is_array($gallery) && !empty($gallery) && isset($gallery[0]['url'])) {
    foreach ($gallery as $image) {
        $url = tda_strip_photon_url((string) ($image['url'] ?? ''));
        if ($url === '') {
            continue;
        }
        $gallery_items[] = [
            'url' => $url,
            'alt' => (string) ($image['alt'] ?? ''),
        ];
    }
} else {
    foreach (tda_gallery_images() as $file) {
        $gallery_items[] = [
            'url' => tda_media_url($file),
            'alt' => '',
        ];
    }
}

$initial = 8;
$step    = 8;
$total   = count($gallery_items);
$has_more = $total > $initial;
?>
<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.gallery">Galería</span>
      </nav>
      <h1 data-i18n="gallery.heroTitle">Galería</h1>
      <p data-i18n="gallery.heroSub">Descubra los momentos más destacados de nuestros programas de movilidad estudiantil en España.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <p data-i18n="gallery.intro">Una selección de imágenes de actividades culturales, alojamiento, turismo enológico y la vida diaria de nuestros participantes internacionales.</p>
      </div>
      <div
        class="gallery-page-grid fade-in"
        data-tda-gallery
        data-initial="<?php echo (int) $initial; ?>"
        data-step="<?php echo (int) $step; ?>"
        data-visible="<?php echo (int) $initial; ?>"
      >
        <?php foreach ($gallery_items as $i => $image) : ?>
          <?php
          $visible = $i < $initial;
          $label = $image['alt'] !== '' ? $image['alt'] : sprintf(__('Ver imagen %d', 'tierra-dacogida'), $i + 1);
          ?>
          <button
            type="button"
            class="gallery-page-item<?php echo $visible ? '' : ' is-deferred'; ?>"
            data-tda-gallery-item
            data-index="<?php echo (int) $i; ?>"
            data-src="<?php echo esc_url($image['url']); ?>"
            data-alt="<?php echo esc_attr($image['alt']); ?>"
            aria-label="<?php echo esc_attr($label); ?>"
            aria-hidden="<?php echo $visible ? 'false' : 'true'; ?>"
          >
            <?php if ($visible) : ?>
              <img
                src="<?php echo esc_url($image['url']); ?>"
                alt="<?php echo esc_attr($image['alt']); ?>"
                loading="<?php echo $i < 4 ? 'eager' : 'lazy'; ?>"
                decoding="async"
              >
            <?php endif; ?>
          </button>
        <?php endforeach; ?>
      </div>
      <?php if ($has_more) : ?>
        <div class="gallery-load-more fade-in" data-tda-gallery-controls>
          <button type="button" class="btn btn--outline" data-tda-gallery-more data-i18n="gallery.viewMore">Ver más</button>
          <button type="button" class="btn btn--outline" data-tda-gallery-less data-i18n="gallery.viewLess" hidden aria-hidden="true">Ver menos</button>
        </div>
      <?php endif; ?>
      <p class="gallery-section-cta fade-in">
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="common.contactUs">Contactar con Nosotros</a>
      </p>
    </div>
  </section>
