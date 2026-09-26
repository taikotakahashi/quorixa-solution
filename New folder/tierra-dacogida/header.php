<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  <link rel="icon" type="image/png" href="<?php echo esc_url(tda_media_url('logo.png')); ?>">
</head>
<body <?php body_class(); ?> data-page="<?php echo esc_attr(tda_body_page_slug()); ?>">
<?php wp_body_open(); ?>

<header class="header">
  <div class="container header__inner">
    <?php if (has_custom_logo()) : ?>
      <div class="header__logo">
        <?php the_custom_logo(); ?>
      </div>
    <?php else : ?>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo">
        <?php echo tda_img('logo.png', "Tierra D'Acogida"); ?>
      </a>
    <?php endif; ?>
    <nav class="nav" aria-label="<?php esc_attr_e('Primary', 'tierra-dacogida'); ?>">
      <?php
      if (has_nav_menu('primary')) {
          wp_nav_menu([
              'theme_location' => 'primary',
              'container'      => false,
              'menu_class'     => 'nav__list',
              'fallback_cb'    => false,
              'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
              'link_before'    => '',
              'link_after'     => '',
          ]);
      } else {
          tda_nav_fallback();
      }
      ?>
    </nav>
    <div class="header__tools">
      <button type="button" class="theme-toggle" data-theme-toggle aria-pressed="true" data-i18n-aria="theme.switchToLight" aria-label="Cambiar a tema claro">
        <svg class="theme-toggle__icon theme-toggle__icon--light" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="theme-toggle__icon theme-toggle__icon--dark" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <?php tda_lang_switcher(); ?>
      <button class="nav__toggle" data-i18n-aria="nav.menu" aria-label="Abrir menú"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
