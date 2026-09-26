<?php
/**
 * Client-side language switcher.
 * Preference is stored in localStorage + cookie so it persists across pages.
 *
 * @package Tierra_Dacogida
 */

$tda_lang = function_exists('tda_current_lang') ? tda_current_lang() : 'es';
?>
<div class="lang-switcher" role="group" data-i18n-aria="nav.lang" aria-label="Idioma">
  <button type="button" class="lang-switcher__btn<?php echo $tda_lang === 'es' ? ' active' : ''; ?>" data-lang="es" aria-pressed="<?php echo $tda_lang === 'es' ? 'true' : 'false'; ?>" data-i18n-aria="lang.es" aria-label="Español">
    <img src="<?php echo esc_url(tda_asset('img/flags/es.svg')); ?>" alt="" class="lang-switcher__flag" width="28" height="19">
  </button>
  <button type="button" class="lang-switcher__btn<?php echo $tda_lang === 'en' ? ' active' : ''; ?>" data-lang="en" aria-pressed="<?php echo $tda_lang === 'en' ? 'true' : 'false'; ?>" data-i18n-aria="lang.en" aria-label="English">
    <img src="<?php echo esc_url(tda_asset('img/flags/us.svg')); ?>" alt="" class="lang-switcher__flag" width="28" height="19">
  </button>
</div>
