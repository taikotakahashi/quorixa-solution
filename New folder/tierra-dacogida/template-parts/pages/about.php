<?php
defined('ABSPATH') || exit;
?>
<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.about">Nosotros</span>
      </nav>
      <h1 data-i18n="about.heroTitle">Sobre Nosotros</h1>
      <p data-i18n="about.heroSub">Conozca la historia, misión y valores que definen a Tierra D'Acogida® como referente en movilidad estudiantil.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split fade-in">
        <div class="split__content">
          <span class="section__label" data-i18n="about.s1Label">Nuestra Historia</span>
          <h2 data-i18n="about.s1Title">Tierra D'Acogida® — Un hogar para la movilidad internacional</h2>
          <p data-i18n="about.s1P1">Tierra D'Acogida® es una marca registrada dedicada a ofrecer servicios integrales de Destination Management Center, especializados en movilidad estudiantil, intercambio académico y programas de inmersión cultural, lingüística y deportiva.</p>
          <p data-i18n="about.s1P2">Nacimos con la convicción de que la movilidad internacional transforma vidas. Nuestro nombre refleja nuestra misión: ser esa tierra de acogida que hace sentir a cada estudiante como en casa.</p>
        </div>
        <div class="split__media">
          <img src="<?php echo esc_url(tda_asset('img/IMG_0285.jpeg')); ?>" data-i18n-alt="about.s1ImgAlt" alt="Equipo Tierra D'Acogida" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="about.s2Label">Misión y Valores</span>
        <h2 class="section__title" data-i18n="about.s2Title">Lo que nos define</h2>
      </div>
      <div class="services-grid">
        <div class="activity-card fade-in">
          <h4 data-i18n="about.v1t">Misión</h4>
          <p data-i18n="about.v1d">Facilitar experiencias de movilidad internacional de excelencia, integrando formación académica, inmersión cultural y conocimiento de la industria vitivinícola.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="about.v2t">Visión</h4>
          <p data-i18n="about.v2d">Ser el referente en Destination Management para programas de movilidad estudiantil en España, reconocidos por la calidad, innovación y compromiso.</p>
        </div>
        <div class="activity-card fade-in">
          <h4 data-i18n="about.v3t">Valores</h4>
          <p data-i18n="about.v3d">Excelencia, confianza, innovación, respeto intercultural y compromiso con el desarrollo personal y profesional de cada participante.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split split--reverse fade-in">
        <div class="split__content">
          <span class="section__label" data-i18n="about.s3Label">Vitivinicultura & Turismo</span>
          <h2 data-i18n="about.s3Title">Especialización única en la industria vitivinícola</h2>
          <p data-i18n="about.s3P1">Lo que nos diferencia es nuestra profunda conexión con la industria vitivinícola española. Ofrecemos programas que combinan la movilidad estudiantil con la formación, gestión y comercialización en entornos reales.</p>
          <p data-i18n="about.s3P2">Nuestros participantes no solo estudian: viven la cultura del vino, conocen los procesos de producción y visitan bodegas emblemáticas.</p>
          <ul class="feature-list">
            <li data-i18n="about.s3F1">Programas de formación en gestión vitivinícola</li>
            <li data-i18n="about.s3F2">Turismo académico y enológico</li>
            <li data-i18n="about.s3F3">Visitas a bodegas y rutas del vino</li>
            <li data-i18n="about.s3F4">Comercialización y marketing del sector</li>
          </ul>
        </div>
        <div class="split__media">
          <img src="<?php echo esc_url(tda_asset('img/IMG_4436.jpeg')); ?>" data-i18n-alt="about.s3ImgAlt" alt="Industria vitivinícola" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="about.s4Label">Para Quién Trabajamos</span>
        <h2 class="section__title" data-i18n="about.s4Title">Nuestros clientes y colaboradores</h2>
      </div>
      <div class="process-grid">
        <div class="process-step fade-in">
          <div class="process-step__number">1</div>
          <h4 data-i18n="about.a1t">Universidades</h4>
          <p data-i18n="about.a1d">Programas de intercambio, Erasmus+ y movilidad internacional para estudiantes universitarios.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">2</div>
          <h4 data-i18n="about.a2t">Centros de Formación</h4>
          <p data-i18n="about.a2d">Centros de formación profesional y escuelas de negocios con programas de movilidad.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">3</div>
          <h4 data-i18n="about.a3t">Empresas</h4>
          <p data-i18n="about.a3d">Empresas del sector vitivinícola y turístico que acogen prácticas y visitas formativas.</p>
        </div>
        <div class="process-step fade-in">
          <div class="process-step__number">4</div>
          <h4 data-i18n="about.a4t">Organizaciones</h4>
          <p data-i18n="about.a4d">Organizaciones internacionales y agencias de movilidad educativa.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner fade-in">
        <h2 data-i18n="about.ctaTitle">¿Quiere conocer más sobre nuestros programas?</h2>
        <p data-i18n="about.ctaText">Estaremos encantados de presentarle nuestra propuesta y diseñar un programa adaptado a sus necesidades.</p>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="common.contactUs">Contactar con Nosotros</a>
      </div>
    </div>
  </section>