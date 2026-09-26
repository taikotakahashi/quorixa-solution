<?php
defined('ABSPATH') || exit;
?>
<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.activities">Actividades</span>
      </nav>
      <h1 data-i18n="act.heroTitle">Gestión de Actividades</h1>
      <p data-i18n="act.heroSub">Programación completa de actividades culturales, lingüísticas, deportivas y enológicas adaptadas a cada programa de movilidad.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split fade-in">
        <div class="split__content">
          <span class="section__label" data-i18n="act.s1Label">Experiencias Únicas</span>
          <h2 data-i18n="act.s1Title">Actividades que enriquecen cada programa</h2>
          <p data-i18n="act.s1P1">Las actividades son el corazón de la experiencia de movilidad. En Tierra D'Acogida® diseñamos y gestionamos programas de actividades completos que complementan la formación académica.</p>
          <p data-i18n="act.s1P2">Desde visitas a bodegas y catas de vino hasta talleres culturales y actividades deportivas, cada experiencia está diseñada para maximizar el aprendizaje intercultural.</p>
        </div>
        <div class="split__media">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0926.jpeg')); ?>" data-i18n-alt="act.s1ImgAlt" alt="Actividades culturales en grupo" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="act.s2Label">Categorías</span>
        <h2 class="section__title" data-i18n="act.s2Title">Tipos de actividades que gestionamos</h2>
      </div>
      <div class="activity-grid">
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c1t">Enológicas y Vitivinícolas</h4>
          <p data-i18n="act.c1d">Visitas a bodegas, catas de vino, rutas del vino y formación en la industria vitivinícola.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c2t">Culturales</h4>
          <p data-i18n="act.c2d">Visitas guiadas, museos, monumentos, festivales y eventos culturales locales.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c3t">Lingüísticas</h4>
          <p data-i18n="act.c3d">Talleres de idioma, intercambios con hablantes nativos y actividades de inmersión lingüística.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c4t">Deportivas</h4>
          <p data-i18n="act.c4d">Actividades deportivas, torneos interculturales y experiencias de deportes locales.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c5t">Visitas Empresariales</h4>
          <p data-i18n="act.c5d">Visitas a empresas del sector vitivinícola, turístico y formación profesional.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="act.c6t">Talleres y Formación</h4>
          <p data-i18n="act.c6d">Talleres prácticos de cocina, artesanía, enología y habilidades profesionales.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="act.s3Label">Itinerarios</span>
        <h2 class="section__title" data-i18n="act.s3Title">Ejemplos de programas de actividades</h2>
      </div>
      <div class="services-grid">
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_0926.jpeg')); ?>" data-i18n-alt="act.p1ImgAlt" alt="Programa de 3 días" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="act.p1t">Programa Express — 3 Días</h3>
            <p data-i18n="act.p1d">Ideal para movilidades cortas: visita cultural, actividad enológica y taller de inmersión lingüística.</p>
            <ul class="feature-list">
              <li data-i18n="act.p1i1">Día 1: Tour cultural por la ciudad</li>
              <li data-i18n="act.p1i2">Día 2: Visita a bodega y cata</li>
              <li data-i18n="act.p1i3">Día 3: Taller y actividad de cierre</li>
            </ul>
          </div>
        </article>
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_4436.jpeg')); ?>" data-i18n-alt="act.p2ImgAlt" alt="Programa de 1 semana" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="act.p2t">Programa Semanal — 7 Días</h3>
            <p data-i18n="act.p2d">Experiencia completa con actividades diarias que combinan cultura, enología y formación.</p>
            <ul class="feature-list">
              <li data-i18n="act.p2i1">Actividades culturales diarias</li>
              <li data-i18n="act.p2i2">2 visitas enológicas</li>
              <li data-i18n="act.p2i3">Talleres de formación profesional</li>
            </ul>
          </div>
        </article>
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_0285.jpeg')); ?>" data-i18n-alt="act.p3ImgAlt" alt="Programa personalizado" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="act.p3t">Programa Personalizado</h3>
            <p data-i18n="act.p3d">Diseñamos un itinerario a medida según los objetivos, duración y perfil de su grupo.</p>
            <ul class="feature-list">
              <li data-i18n="act.p3i1">Evaluación de necesidades</li>
              <li data-i18n="act.p3i2">Diseño de itinerario exclusivo</li>
              <li data-i18n="act.p3i3">Coordinación y seguimiento total</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="act.s4Label">Metodología</span>
        <h2 class="section__title" data-i18n="act.s4Title">Cómo planificamos las actividades</h2>
      </div>
      <div class="process-grid">
        <div class="process-step fade-in">
          <div class="process-step__number">1</div>
          <h4 data-i18n="act.m1t">Evaluación</h4>
          <p data-i18n="act.m1d">Analizamos objetivos, perfil del grupo y duración del programa.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">2</div>
          <h4 data-i18n="act.m2t">Diseño</h4>
          <p data-i18n="act.m2d">Creamos un itinerario de actividades equilibrado y coherente.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">3</div>
          <h4 data-i18n="act.m3t">Ejecución</h4>
          <p data-i18n="act.m3d">Coordinamos proveedores, transporte y guías durante las actividades.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">4</div>
          <h4 data-i18n="act.m4t">Evaluación</h4>
          <p data-i18n="act.m4d">Recogemos feedback y entregamos informe de actividades realizadas.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="gallery-grid fade-in">
        <div class="gallery-item gallery-item--wide">
          <img src="<?php echo esc_url(tda_asset('img/IMG_4436.jpeg')); ?>" data-i18n-alt="act.gal1" alt="Cata de vinos" loading="lazy">
        </div>
        <div class="gallery-item">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0926.jpeg')); ?>" data-i18n-alt="act.gal2" alt="Actividad grupal" loading="lazy">
        </div>
        <div class="gallery-item">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0285.jpeg')); ?>" data-i18n-alt="act.gal3" alt="Estudiantes" loading="lazy">
        </div>
        <div class="gallery-item">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0951.jpeg')); ?>" data-i18n-alt="act.gal4" alt="Viñedos" loading="lazy">
        </div>
        <div class="gallery-item">
          <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="act.gal5" alt="Grupo internacional" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="cta-banner fade-in">
        <h2 data-i18n="act.ctaTitle">¿Quiere diseñar un programa de actividades a medida?</h2>
        <p data-i18n="act.ctaText">Cuéntenos sus objetivos y crearemos una propuesta de actividades adaptada a su grupo.</p>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="act.ctaBtn">Diseñar Mi Programa</a>
      </div>
    </div>
  </section>