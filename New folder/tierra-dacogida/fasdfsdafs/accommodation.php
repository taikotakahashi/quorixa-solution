<?php
defined('ABSPATH') || exit;
?>
<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.accommodation">Alojamiento</span>
      </nav>
      <h1 data-i18n="accom.heroTitle">Gestión de Alojamiento</h1>
      <p data-i18n="accom.heroSub">Soluciones de alojamiento adaptadas a cada programa: solo alojamiento, media pensión o pensión completa para sus estudiantes.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split fade-in">
        <div class="split__content">
          <span class="section__label" data-i18n="accom.s1Label">Alojamiento Estudiantil</span>
          <h2 data-i18n="accom.s1Title">Un hogar lejos de casa</h2>
          <p data-i18n="accom.s1P1">El alojamiento es uno de los aspectos más importantes de cualquier programa de movilidad. En Tierra D'Acogida® seleccionamos cuidadosamente cada alojamiento para garantizar la seguridad, comodidad y bienestar de los participantes.</p>
          <p data-i18n="accom.s1P2">Ofrecemos tres modalidades de alojamiento adaptadas a las necesidades y presupuesto de cada programa.</p>
          <ul class="feature-list">
            <li data-i18n="accom.s1F1">Alojamientos verificados y seguros</li>
            <li data-i18n="accom.s1F2">Proximidad a universidades y centros de formación</li>
            <li data-i18n="accom.s1F3">Opciones para grupos e individuales</li>
            <li data-i18n="accom.s1F4">Soporte 24/7 durante la estancia</li>
          </ul>
        </div>
        <div class="split__media">
          <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="accom.s1ImgAlt" alt="Alojamiento moderno para estudiantes" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="accom.s2Label">Modalidades</span>
        <h2 class="section__title" data-i18n="accom.s2Title">Opciones de alojamiento disponibles</h2>
        <p class="section__subtitle" data-i18n="accom.s2Sub">Elija la modalidad que mejor se adapte a las necesidades de su programa.</p>
      </div>
      <div class="accommodation-grid">
        <div class="accommodation-card fade-in">
          <h3 data-i18n="accom.m1t">Solo Alojamiento</h3>
          <p data-i18n="accom.m1d">Alojamiento en residencia, apartamento compartido o familia de acogida, sin servicio de comidas incluido.</p>
          <ul>
            <li data-i18n="accom.m1i1">Habitación individual o compartida</li>
            <li data-i18n="accom.m1i2">Acceso a cocina equipada</li>
            <li data-i18n="accom.m1i3">Servicios básicos incluidos</li>
            <li data-i18n="accom.m1i4">WiFi y suministros</li>
            <li data-i18n="accom.m1i5">Limpieza semanal</li>
          </ul>
        </div>
        <div class="accommodation-card fade-in">
          <h3 data-i18n="accom.m2t">Media Pensión</h3>
          <p data-i18n="accom.m2d">Alojamiento con desayuno y una comida principal (almuerzo o cena) incluidos diariamente.</p>
          <ul>
            <li data-i18n="accom.m2i1">Desayuno completo</li>
            <li data-i18n="accom.m2i2">Almuerzo o cena</li>
            <li data-i18n="accom.m2i3">Menús equilibrados y variados</li>
            <li data-i18n="accom.m2i4">Opciones dietéticas disponibles</li>
            <li data-i18n="accom.m2i5">Ideal para estancias medias</li>
          </ul>
        </div>
        <div class="accommodation-card fade-in">
          <h3 data-i18n="accom.m3t">Pensión Completa</h3>
          <p data-i18n="accom.m3d">Alojamiento con todas las comidas incluidas: desayuno, almuerzo y cena para máxima comodidad.</p>
          <ul>
            <li data-i18n="accom.m3i1">Tres comidas diarias</li>
            <li data-i18n="accom.m3i2">Menús adaptados culturalmente</li>
            <li data-i18n="accom.m3i3">Sin preocupaciones logísticas</li>
            <li data-i18n="accom.m3i4">Perfecto para grupos</li>
            <li data-i18n="accom.m3i5">Experiencia integral</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__header fade-in">
        <span class="section__label" data-i18n="accom.s3Label">Tipos de Alojamiento</span>
        <h2 class="section__title" data-i18n="accom.s3Title">Dónde alojamos a sus estudiantes</h2>
      </div>
      <div class="services-grid">
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_5506.jpeg')); ?>" data-i18n-alt="accom.r1ImgAlt" alt="Residencia universitaria" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="accom.r1t">Residencias Universitarias</h3>
            <p data-i18n="accom.r1d">Alojamiento en residencias con todas las comodidades, ideal para grupos grandes y estancias largas.</p>
          </div>
        </article>
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_5507.jpeg')); ?>" data-i18n-alt="accom.r2ImgAlt" alt="Apartamentos compartidos" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="accom.r2t">Apartamentos Compartidos</h3>
            <p data-i18n="accom.r2d">Pisos compartidos en zonas céntricas, perfectos para fomentar la convivencia internacional.</p>
          </div>
        </article>
        <article class="service-card fade-in">
          <div class="service-card__image">
            <img src="<?php echo esc_url(tda_asset('img/IMG_5720.jpeg')); ?>" data-i18n-alt="accom.r3ImgAlt" alt="Familia de acogida" loading="lazy">
          </div>
          <div class="service-card__body">
            <h3 data-i18n="accom.r3t">Familias de Acogida</h3>
            <p data-i18n="accom.r3d">Experiencia de inmersión cultural total viviendo con familias locales seleccionadas.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__header fade-in">
        <h2 class="section__title" data-i18n="accom.faqTitle">Preguntas frecuentes</h2>
      </div>
      <div class="faq-list fade-in">
        <div class="faq-item">
          <button class="faq-item__question" data-i18n="accom.faq1q">¿Con cuánta antelación debo reservar el alojamiento?</button>
          <div class="faq-item__answer">
            <p data-i18n="accom.faq1a">Recomendamos contactar con al menos 2-3 meses de antelación, especialmente para grupos grandes o en temporada alta.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-item__question" data-i18n="accom.faq2q">¿Pueden adaptarse a necesidades dietéticas especiales?</button>
          <div class="faq-item__answer">
            <p data-i18n="accom.faq2a">Sí, en las modalidades de media pensión y pensión completa podemos adaptar los menús a alergias, intolerancias y preferencias dietéticas.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-item__question" data-i18n="accom.faq3q">¿Qué incluye el servicio de gestión de alojamiento?</button>
          <div class="faq-item__answer">
            <p data-i18n="accom.faq3a">Incluye búsqueda y selección de alojamiento, negociación de tarifas, gestión de reservas, check-in/check-out y soporte durante la estancia.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner fade-in">
        <h2 data-i18n="accom.ctaTitle">¿Necesita alojamiento para su programa?</h2>
        <p data-i18n="accom.ctaText">Solicite un presupuesto personalizado indicando fechas, número de participantes y modalidad preferida.</p>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" class="btn btn--orange" data-i18n="common.requestQuote">Solicitar Presupuesto</a>
      </div>
    </div>
  </section>