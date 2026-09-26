<?php
defined('ABSPATH') || exit;
$contact = tda_page_url('contacto');

$rosa_gallery = [
    ['url' => tda_asset('img/IMG_5506.jpeg'), 'alt' => 'La Rosa Azul — habitación'],
    ['url' => tda_asset('img/IMG_5720.jpeg'), 'alt' => 'La Rosa Azul — zonas comunes'],
    ['url' => tda_asset('img/IMG_5746.jpeg'), 'alt' => 'La Rosa Azul — residencia'],
    ['url' => tda_asset('img/IMG_0063.jpeg'), 'alt' => 'La Rosa Azul — espacios de estudio'],
];
$encina_gallery = [
    ['url' => tda_asset('img/IMG_5507.jpeg'), 'alt' => 'La Encina Azul — alojamiento'],
    ['url' => tda_asset('img/IMG_0285.jpeg'), 'alt' => 'La Encina Azul — convivencia'],
    ['url' => tda_asset('img/IMG_0926.jpeg'), 'alt' => 'La Encina Azul — estancia'],
    ['url' => tda_asset('img/IMG_0951.jpeg'), 'alt' => 'La Encina Azul — entorno'],
];
$way_gallery = [
    ['url' => tda_asset('img/IMG_6716.jpeg'), 'alt' => 'The Way Molinaseca — alojamiento'],
    ['url' => tda_asset('img/IMG_7305.jpeg'), 'alt' => 'The Way Molinaseca — habitación'],
    ['url' => tda_asset('img/IMG_7362.jpeg'), 'alt' => 'The Way Molinaseca — espacios'],
    ['url' => tda_asset('img/IMG_7375.jpeg'), 'alt' => 'The Way Molinaseca — Molinaseca'],
];

/**
 * Render a labeled property gallery (fallback template).
 *
 * @param array<int, array{url:string,alt:string}> $images
 */
$tda_accom_gallery = static function (string $id, string $title_key, string $intro_key, string $title, string $intro, array $images): void {
    $total    = count($images);
    $initial  = min(4, $total);
    $has_more = $total > $initial;
    ?>
  <section class="section section--soft" id="<?php echo esc_attr($id); ?>">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <p data-i18n="<?php echo esc_attr($intro_key); ?>"><?php echo esc_html($intro); ?></p>
        <h2 data-i18n="<?php echo esc_attr($title_key); ?>"><?php echo esc_html($title); ?></h2>
      </div>
      <div
        class="gallery-page-grid fade-in"
        data-tda-gallery
        data-initial="<?php echo (int) $initial; ?>"
        data-step="4"
        data-visible="<?php echo (int) $initial; ?>"
        style="--tda-cols:4"
      >
        <?php foreach ($images as $i => $image) : ?>
          <?php
          $visible = $i < $initial;
          $label   = $image['alt'] !== '' ? $image['alt'] : sprintf(__('Ver imagen %d', 'tierra-dacogida'), $i + 1);
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
    </div>
  </section>
    <?php
};
?>
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
      <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.accommodation">Alojamiento</span>
    </nav>
    <h1 data-i18n="accom.heroTitle">Nuestros alojamientos</h1>
    <p data-i18n="accom.heroSub">Tres residencias distintas en la Comarca del Bierzo: La Rosa Azul, La Encina Azul y The Way Molinaseca. Cada una con su propio espacio, fotos y condiciones.</p>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section__header fade-in">
      <span class="section__label" data-i18n="accom.chooserLabel">Elige tu estancia</span>
      <h2 class="section__title" data-i18n="accom.chooserTitle">Tres alojamientos, una misma acogida</h2>
      <p class="section__subtitle" data-i18n="accom.chooserSub">Compara las tres propiedades. Las fotos y la descripción de cada una están separadas — sin mezclar imágenes.</p>
    </div>
    <div class="services-grid fade-in" style="--tda-cols:3">
      <div class="activity-card">
        <h4 data-i18n="accom.c1t">La Rosa Azul</h4>
        <p data-i18n="accom.c1d">Residencia principal: habitaciones, zonas comunes y opciones de pensión (solo alojamiento, media o completa).</p>
        <a href="#la-rosa-azul" class="btn btn--outline" data-i18n="accom.c1Btn">Ver La Rosa Azul</a>
      </div>
      <div class="activity-card">
        <h4 data-i18n="accom.c2t">La Encina Azul</h4>
        <p data-i18n="accom.c2d">Alojamiento independiente para grupos y estancias formativas que necesitan un espacio propio.</p>
        <a href="#la-encina-azul" class="btn btn--outline" data-i18n="accom.c2Btn">Ver La Encina Azul</a>
      </div>
      <div class="activity-card">
        <h4 data-i18n="accom.c3t">The Way Molinaseca</h4>
        <p data-i18n="accom.c3d">Alojamiento en Molinaseca, junto al Camino de Santiago y al entorno berciano.</p>
        <a href="#the-way-molinaseca" class="btn btn--outline" data-i18n="accom.c3Btn">Ver The Way Molinaseca</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="la-rosa-azul">
  <div class="container">
    <div class="split fade-in">
      <div class="split__content">
        <span class="section__label" data-i18n="accom.rosaLabel">01 · Residencia principal</span>
        <h2 data-i18n="accom.rosaTitle">Residencia La Rosa Azul</h2>
        <p data-i18n="accom.rosaP1">La Rosa Azul es la residencia de estudiantes de Tierra D'Acogida®: habitaciones y zonas comunes en el corazón del proyecto, en la Comarca del Bierzo.</p>
        <p data-i18n="accom.rosaP2">Pensada para quien necesita un hogar estable durante la formación: descanso, estudio y convivencia con el resto del grupo.</p>
        <ul class="feature-list">
          <li data-i18n="accom.rosaF1">Habitaciones individuales o compartidas, con espacio para estudiar.</li>
          <li data-i18n="accom.rosaF2">Salas comunes, cocina y zonas de descanso.</li>
          <li data-i18n="accom.rosaF3">Opciones de pensión: solo alojamiento, media pensión o pensión completa.</li>
          <li data-i18n="accom.rosaF4">Coordinación diaria con el equipo Tierra D'Acogida®.</li>
        </ul>
        <a href="<?php echo esc_url($contact); ?>" class="btn btn--outline" data-i18n="accom.rosaBtn">Solicitar plaza en La Rosa Azul</a>
      </div>
      <div class="split__media">
        <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="accom.rosaImgAlt" alt="Residencia La Rosa Azul" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section__header fade-in">
      <span class="section__label" data-i18n="accom.boardLabel">Modalidades · La Rosa Azul</span>
      <h2 class="section__title" data-i18n="accom.boardTitle">Opciones de pensión</h2>
      <p class="section__subtitle" data-i18n="accom.boardSub">Solo en la residencia La Rosa Azul. Elige cómo quieres organizar comidas y estancia.</p>
    </div>
    <div class="accommodation-grid fade-in">
      <div class="accommodation-card">
        <h3 data-i18n="accom.m1t">Solo Alojamiento</h3>
        <p data-i18n="accom.m1d">Habitación sin comidas incluidas, con acceso a cocina y zonas comunes.</p>
        <ul>
          <li data-i18n="accom.m1i1">Habitación individual o compartida</li>
          <li data-i18n="accom.m1i2">Acceso a cocina y zonas comunes</li>
          <li data-i18n="accom.m1i3">Servicios básicos incluidos</li>
          <li data-i18n="accom.m1i4">WiFi y suministros</li>
        </ul>
      </div>
      <div class="accommodation-card">
        <h3 data-i18n="accom.m2t">Media Pensión</h3>
        <p data-i18n="accom.m2d">Alojamiento con desayuno y una comida principal (almuerzo o cena) cada día.</p>
        <ul>
          <li data-i18n="accom.m2i1">Desayuno completo</li>
          <li data-i18n="accom.m2i2">Almuerzo o cena</li>
          <li data-i18n="accom.m2i3">Menús equilibrados y variados</li>
          <li data-i18n="accom.m2i4">Opciones dietéticas disponibles</li>
        </ul>
      </div>
      <div class="accommodation-card">
        <h3 data-i18n="accom.m3t">Pensión Completa</h3>
        <p data-i18n="accom.m3d">Alojamiento con desayuno, almuerzo y cena incluidos.</p>
        <ul>
          <li data-i18n="accom.m3i1">Tres comidas diarias</li>
          <li data-i18n="accom.m3i2">Menús adaptados culturalmente</li>
          <li data-i18n="accom.m3i3">Sin preocupaciones logísticas</li>
          <li data-i18n="accom.m3i4">Ideal para grupos</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<?php
$tda_accom_gallery(
    'galeria-rosa-azul',
    'accom.rosaGalTitle',
    'accom.rosaGalIntro',
    'Galería · La Rosa Azul',
    'Fotos de la residencia La Rosa Azul únicamente.',
    $rosa_gallery
);
?>

<section class="section" id="la-encina-azul">
  <div class="container">
    <div class="split split--reverse fade-in">
      <div class="split__content">
        <span class="section__label" data-i18n="accom.encinaLabel">02 · Alojamiento para grupos</span>
        <h2 data-i18n="accom.encinaTitle">Alojamiento La Encina Azul</h2>
        <p data-i18n="accom.encinaP1">La Encina Azul es un alojamiento independiente de la red Tierra D'Acogida®, distinto de La Rosa Azul: pensado para grupos que necesitan su propio espacio.</p>
        <p data-i18n="accom.encinaP2">Ambiente cercano y práctico para estancias formativas temporales en el Bierzo.</p>
        <ul class="feature-list">
          <li data-i18n="accom.encinaF1">Capacidad orientada a grupos y estancias temporales.</li>
          <li data-i18n="accom.encinaF2">Habitaciones y zonas de convivencia propias.</li>
          <li data-i18n="accom.encinaF3">Ubicación práctica para desplazamientos a centros y actividades.</li>
          <li data-i18n="accom.encinaF4">Gestión y reserva coordinadas con Tierra D'Acogida®.</li>
        </ul>
        <a href="<?php echo esc_url($contact); ?>" class="btn btn--outline" data-i18n="accom.encinaBtn">Consultar disponibilidad · Encina Azul</a>
      </div>
      <div class="split__media">
        <img src="<?php echo esc_url(tda_asset('img/IMG_5507.jpeg')); ?>" data-i18n-alt="accom.encinaImgAlt" alt="La Encina Azul" loading="lazy">
      </div>
    </div>
  </div>
</section>

<?php
$tda_accom_gallery(
    'galeria-encina-azul',
    'accom.encinaGalTitle',
    'accom.encinaGalIntro',
    'Galería · La Encina Azul',
    'Fotos de La Encina Azul únicamente — no mezcladas con otras residencias.',
    $encina_gallery
);
?>

<section class="section" id="the-way-molinaseca">
  <div class="container">
    <div class="split fade-in">
      <div class="split__content">
        <span class="section__label" data-i18n="accom.wayLabel">03 · Molinaseca</span>
        <h2 data-i18n="accom.wayTitle">The Way Molinaseca</h2>
        <p data-i18n="accom.wayP1">The Way Molinaseca es nuestro alojamiento en Molinaseca: un espacio propio, separado de La Rosa Azul y La Encina Azul.</p>
        <p data-i18n="accom.wayP2">Ideal si buscas dormir cerca del Camino de Santiago y del patrimonio berciano, con la misma coordinación Tierra D'Acogida®.</p>
        <ul class="feature-list">
          <li data-i18n="accom.wayF1">Ubicación en Molinaseca, Comarca del Bierzo.</li>
          <li data-i18n="accom.wayF2">Entorno próximo al Camino y al patrimonio local.</li>
          <li data-i18n="accom.wayF3">Habitaciones y espacios adaptados a estancias de grupo.</li>
          <li data-i18n="accom.wayF4">Reserva y seguimiento con el mismo equipo Tierra D'Acogida®.</li>
        </ul>
        <a href="<?php echo esc_url($contact); ?>" class="btn btn--outline" data-i18n="accom.wayBtn">Consultar disponibilidad · The Way</a>
      </div>
      <div class="split__media">
        <img src="<?php echo esc_url(tda_asset('img/IMG_6716.jpeg')); ?>" data-i18n-alt="accom.wayImgAlt" alt="The Way Molinaseca" loading="lazy">
      </div>
    </div>
  </div>
</section>

<?php
$tda_accom_gallery(
    'galeria-the-way',
    'accom.wayGalTitle',
    'accom.wayGalIntro',
    'Galería · The Way Molinaseca',
    'Fotos de The Way Molinaseca únicamente.',
    $way_gallery
);
?>

<section class="section section--soft">
  <div class="container">
    <div class="cta-banner fade-in">
      <span class="section__label" data-i18n="accom.ctaPill">Alojamiento Tierra D'Acogida®</span>
      <h2 data-i18n="accom.ctaTitle">¿Listo para reservar tu plaza?</h2>
      <p data-i18n="accom.ctaText">Indica qué residencia te interesa — La Rosa Azul, La Encina Azul o The Way Molinaseca — y te orientamos sobre plazas y pensión.</p>
      <a href="<?php echo esc_url($contact); ?>" class="btn btn--orange" data-i18n="accom.ctaBtn">Contactar ahora</a>
    </div>
  </div>
</section>
