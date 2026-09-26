<?php
defined('ABSPATH') || exit;
?>
<section class="hero-photo hero-photo--home">
    <div class="hero-photo__overlay" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-photo__content fade-in">
        <h1 data-i18n="home.heroTitle">Soluciones integrales de movilidad estudiantil en España</h1>
        <p data-i18n="home.heroText">Tierra D'Acogida® ofrece servicios de Destination Management Center especializados en movilidad estudiantil, intercambio académico y programas culturales, lingüísticos y deportivos en formación vitivinícola y turismo académico.</p>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="home.heroCta">Contáctenos</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split fade-in">
        <div class="split__content">
          <h2><span class="text-orange" data-i18n="home.introHighlight">Programas de movilidad</span> <span data-i18n="home.introTitleEnd">estudiantil en España</span></h2>
          <p data-i18n="home.introText">Los programas de movilidad estudiantil ofrecen a los jóvenes la oportunidad de aprender, formarse y crecer a través de una experiencia internacional.</p>
          <p data-i18n="home.introText2">Nuestro objetivo es garantizar que cada experiencia de movilidad esté bien organizada, sea educativa y enriquecedora.</p>
          <a href="<?php echo esc_url(tda_page_url('nosotros')); ?>" class="btn btn--outline" data-i18n="common.seeMore">Ver más</a>
        </div>
        <div class="split__media">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0285.jpeg')); ?>" data-i18n-alt="home.introImgAlt" alt="Estudiantes en programa de movilidad" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <h2><span class="text-orange" data-i18n="home.impactHighlight">Nuestro impacto</span> <span data-i18n="home.impactTitleEnd">en movilidad estudiantil</span></h2>
      </div>
      <div class="stats-row fade-in">
        <div class="stat-card">
          <div class="stat-card__number" data-i18n="home.stat1val">500+</div>
          <div class="stat-card__label" data-i18n="home.stat1">Participantes</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__number" data-i18n="home.stat2val">20+</div>
          <div class="stat-card__label" data-i18n="home.stat2">Nacionalidades</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__number" data-i18n="home.stat3val">50+</div>
          <div class="stat-card__label" data-i18n="home.stat3">Instituciones socias</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header fade-in">
        <h2><span class="text-orange" data-i18n="home.servicesHighlight">Nuestros</span> <span data-i18n="home.servicesTitleEnd">servicios</span></h2>
        <p data-i18n="home.servIntro">Trabajamos con universidades y centros de formación para ofrecer gestión integral de programas de movilidad en España.</p>
      </div>
      <div class="programme-list fade-in">
        <article class="programme-card">
          <div class="programme-card__img">
            <img src="<?php echo esc_url(tda_asset('img/IMG_0951.jpeg')); ?>" data-i18n-alt="home.docImgAlt" alt="Programas de movilidad" loading="lazy">
          </div>
          <div class="programme-card__body">
            <h3 data-i18n="home.docTitle">Programas de Movilidad</h3>
            <p data-i18n="home.docText">Gestión integral de programas de movilidad estudiantil para universidades y centros de formación.</p>
            <div class="programme-card__meta" data-i18n="home.docMeta">Para universidades, centros de FP y coordinadores Erasmus+.</div>
            <a href="<?php echo esc_url(tda_page_url('programas')); ?>" class="btn btn--orange" style="margin-top:1.25rem;" data-i18n="common.moreInfo">Más información</a>
          </div>
        </article>
        <article class="programme-card">
          <div class="programme-card__img">
            <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="home.accomImgAlt" alt="Alojamiento estudiantil" loading="lazy">
          </div>
          <div class="programme-card__body">
            <h3 data-i18n="home.accomTitle">Gestión de Alojamiento</h3>
            <p data-i18n="home.accomText">Solo alojamiento, media pensión o pensión completa para sus estudiantes.</p>
            <div class="programme-card__meta" data-i18n="home.accomMeta">Residencias, apartamentos compartidos y familias de acogida.</div>
            <a href="<?php echo esc_url(tda_page_url('alojamiento')); ?>" class="btn btn--orange" style="margin-top:1.25rem;" data-i18n="common.moreInfo">Más información</a>
          </div>
        </article>
        <article class="programme-card">
          <div class="programme-card__img">
            <img src="<?php echo esc_url(tda_asset('img/IMG_0926.jpeg')); ?>" data-i18n-alt="home.actImgAlt" alt="Actividades culturales" loading="lazy">
          </div>
          <div class="programme-card__body">
            <h3 data-i18n="home.actTitle">Gestión de Actividades</h3>
            <p data-i18n="home.actText">Programación completa de actividades culturales, lingüísticas y enológicas.</p>
            <div class="programme-card__meta" data-i18n="home.actMeta">Actividades culturales, enológicas, lingüísticas y deportivas.</div>
            <a href="<?php echo esc_url(tda_page_url('actividades')); ?>" class="btn btn--orange" style="margin-top:1.25rem;" data-i18n="common.moreInfo">Más información</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <h2><span class="text-orange" data-i18n="home.supportHighlight">¿Cómo apoyamos</span> <span data-i18n="home.supportTitleEnd">a tu institución?</span></h2>
        <p data-i18n="home.supportSub">Un proceso claro y transparente para garantizar el éxito de cada programa de movilidad.</p>
      </div>
      <div class="support-grid fade-in">
        <div class="support-card">
          <div class="support-card__icon" aria-hidden="true">1</div>
          <h4 data-i18n="home.proc1t">Diseño del programa</h4>
          <p data-i18n="home.proc1d">Adaptamos la movilidad a los objetivos de su proyecto y al perfil de los participantes.</p>
        </div>
        <div class="support-card">
          <div class="support-card__icon" aria-hidden="true">2</div>
          <h4 data-i18n="home.proc2t">Coordinación local</h4>
          <p data-i18n="home.proc2d">Organizamos alojamiento, actividades y servicios locales con proveedores de confianza.</p>
        </div>
        <div class="support-card">
          <div class="support-card__icon" aria-hidden="true">3</div>
          <h4 data-i18n="home.proc3t">Apoyo a participantes</h4>
          <p data-i18n="home.proc3d">Ofrecemos orientación y asistencia antes y durante toda la estancia.</p>
        </div>
        <div class="support-card">
          <div class="support-card__icon" aria-hidden="true">4</div>
          <h4 data-i18n="home.proc4t">Seguimiento y documentación</h4>
          <p data-i18n="home.proc4d">Apoyo en informes, certificados y documentación de movilidad completa.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container fade-in">
      <div class="feature-band">
        <div class="feature-band__img">
          <img src="<?php echo esc_url(tda_asset('img/IMG_4436.jpeg')); ?>" data-i18n-alt="home.wineImgAlt" alt="Viñedos y enología" loading="lazy">
        </div>
        <div class="feature-band__content">
          <h3 data-i18n="home.wineTitle">Turismo enológico y formación vitivinícola</h3>
          <p data-i18n="home.wineText">Programas a medida que integran la movilidad estudiantil con la industria vitivinícola española.</p>
          <a href="<?php echo esc_url(tda_page_url('nosotros')); ?>" class="btn btn--white" style="margin-top:1.5rem;align-self:flex-start;" data-i18n="common.explore">Explorar más</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <h2 data-i18n="home.galTitle">Momentos de nuestros programas</h2>
      </div>
      <div class="gallery-grid fade-in">
        <img src="<?php echo esc_url(tda_asset('img/IMG_0285.jpeg')); ?>" data-i18n-alt="home.gal1" alt="Estudiantes internacionales" loading="lazy">
        <img src="<?php echo esc_url(tda_asset('img/IMG_4436.jpeg')); ?>" data-i18n-alt="home.gal2" alt="Turismo enológico" loading="lazy">
        <img src="<?php echo esc_url(tda_asset('img/IMG_0926.jpeg')); ?>" data-i18n-alt="home.gal3" alt="Actividades culturales" loading="lazy">
        <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="home.gal4" alt="Alojamiento" loading="lazy">
      </div>
      <p style="text-align:center;margin-top:2rem;" class="fade-in">
        <a href="<?php echo esc_url(tda_page_url('galeria')); ?>" class="btn btn--orange" data-i18n="common.viewGallery">Ver galería</a>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header section-header--center fade-in">
        <h2 data-i18n="home.reviewsTitle">Reseñas</h2>
      </div>
      <div class="reviews-row fade-in">
        <div class="review-card">
          <span class="review-card__label" data-i18n="home.reviewLabel">Testimonio de participante</span>
          <p data-i18n="home.review1">Mi experiencia con Tierra D'Acogida fue inolvidable: la organización fue impecable y las actividades culturales enriquecedoras.</p>
        </div>
        <div class="review-card">
          <span class="review-card__label" data-i18n="home.reviewLabel">Testimonio de participante</span>
          <p data-i18n="home.review2">Un equipo profesional que cuida cada detalle del programa de movilidad. Totalmente recomendable para universidades.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="cta-banner fade-in">
        <span class="pill" data-i18n="home.contactBadge">Destination Management Center</span>
        <h2 data-i18n="home.contactTitle">¿Planificando un proyecto de movilidad en España?</h2>
        <p data-i18n="home.contactSub">Estamos siempre dispuestos a ayudarte y responder a tus preguntas sobre tu proyecto de movilidad.</p>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="common.contactUs">Contactar con Nosotros</a>
      </div>
    </div>
  </section>