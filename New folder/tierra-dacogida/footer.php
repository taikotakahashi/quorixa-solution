<?php
/**
 * Footer template.
 *
 * @package Tierra_Dacogida
 */

$phone    = tda_get_field('contact_phone', tda_option('contact_phone', '+34 640 565177'));
$email    = tda_get_field('contact_email', tda_option('contact_email', 'info@tierradacogida.com'));
$whatsapp = tda_get_field('whatsapp_number', tda_option('whatsapp_number', '+34 640 565177'));
?>
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <?php echo tda_img('logo.png', "Tierra D'Acogida"); ?>
      <p data-i18n="footer.brand">Tierra D'Acogida® — Destination Management Center especializado en movilidad estudiantil, intercambio académico y programas de inmersión cultural en la industria vitivinícola.</p>
      <div class="footer__social">
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="Instagram">ig</a>
      </div>
    </div>
    <div>
      <h4 data-i18n="footer.programs">Programas</h4>
      <nav class="footer__links">
        <a href="<?php echo esc_url(tda_page_url('programas')); ?>" data-i18n="nav.programs">Programas</a>
        <a href="<?php echo esc_url(tda_page_url('alojamiento')); ?>" data-i18n="nav.accommodation">Alojamiento</a>
        <a href="<?php echo esc_url(tda_page_url('actividades')); ?>" data-i18n="nav.activities">Actividades</a>
      </nav>
    </div>
    <div>
      <h4 data-i18n="footer.company">Empresa</h4>
      <nav class="footer__links">
        <a href="<?php echo esc_url(tda_page_url('nosotros')); ?>" data-i18n="nav.about">Nosotros</a>
        <a href="<?php echo esc_url(tda_page_url('galeria')); ?>" data-i18n="nav.gallery">Galería</a>
      </nav>
    </div>
    <div>
      <h4 data-i18n="footer.contact">Contacto</h4>
      <nav class="footer__links">
        <a href="tel:<?php echo esc_attr(preg_replace('/\s+/', '', $phone)); ?>"><?php echo esc_html($phone); ?></a>
        <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
        <a href="<?php echo esc_url(tda_page_url('contacto')); ?>" data-i18n="common.contactUs">Contactar con Nosotros</a>
      </nav>
    </div>
  </div>
  <div class="container footer__bottom">
    <p data-i18n="footer.rights">&copy; <?php echo esc_html(gmdate('Y')); ?> Tierra D'Acogida®. Todos los derechos reservados.</p>
    <div>
      <a href="#" data-i18n="footer.privacy">Política de Privacidad</a>
      <span> · </span>
      <a href="#" data-i18n="footer.cookies">Política de Cookies</a>
    </div>
  </div>
</footer>

<a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>" class="whatsapp-float" target="_blank" rel="noopener noreferrer" data-i18n-aria="footer.whatsappAria" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<div class="cookie-bar">
  <div class="container">
    <p><span data-i18n="cookie.text">Valoramos tu privacidad.</span> <a href="#" data-i18n="cookie.link">política de cookies</a>.</p>
    <button class="btn btn--orange cookie-bar__accept" data-i18n="cookie.accept">Cerrar y aceptar</button>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
