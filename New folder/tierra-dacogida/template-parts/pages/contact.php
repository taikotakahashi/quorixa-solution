<?php
defined('ABSPATH') || exit;

$phone    = tda_get_field('contact_phone', tda_option('contact_phone', '+34 000 000 000'));
$email    = tda_get_field('contact_email', tda_option('contact_email', 'info@tierradacogida.com'));
$whatsapp = tda_get_field('whatsapp_number', tda_option('whatsapp_number', '34000000000'));
$wa_link  = 'https://wa.me/' . preg_replace('/\D+/', '', $whatsapp);
$tel_href = 'tel:' . preg_replace('/[^\d+]/', '', $phone);
?>
<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" data-i18n-aria="common.breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>" data-i18n="common.home">Inicio</a><span class="sep">/</span><span data-i18n="nav.contact">Contacto</span>
      </nav>
      <h1 data-i18n="contact.heroTitle">Contacto</h1>
      <p data-i18n="contact.heroSub">Estamos aquí para ayudarle a planificar su programa de movilidad.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="contact-block fade-in">
        <div class="contact-block__info">
          <span class="pill" data-i18n="contact.label">Hablemos</span>
          <h2 data-i18n="contact.title">¿Tiene un proyecto en mente?</h2>
          <p data-i18n="contact.intro">Cuéntenos sus necesidades y le prepararemos una propuesta personalizada.</p>
          <div class="contact-details">
            <div class="contact-details__item">
              <h4 data-i18n="contact.phone">Teléfono</h4>
              <p><a href="<?php echo esc_url($tel_href); ?>"><?php echo esc_html($phone); ?></a></p>
            </div>
            <div class="contact-details__item">
              <h4 data-i18n="contact.email">Correo Electrónico</h4>
              <p><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></p>
            </div>
            <div class="contact-details__item">
              <h4 data-i18n="contact.whatsapp">WhatsApp</h4>
              <p><a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noopener noreferrer" data-i18n="contact.whatsappLink">Enviar mensaje</a></p>
            </div>
            <div class="contact-details__item">
              <h4 data-i18n="contact.social">Redes Sociales</h4>
              <div class="social-row">
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="Instagram">ig</a>
              </div>
            </div>
          </div>
          <a href="<?php echo esc_url($wa_link); ?>" class="btn btn--outline" target="_blank" rel="noopener noreferrer" data-i18n="contact.whatsappBtn" style="margin-top:1.5rem;">Contactar por WhatsApp</a>
        </div>
        <div class="form-box">
          <?php if (!defined('TDA_SEEDING') || !TDA_SEEDING) : ?>
            <?php echo do_shortcode('[tda_contact_form]'); ?>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>
