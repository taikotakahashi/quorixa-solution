# Tierra D'Acogida — WordPress Theme

Custom WordPress theme migrated from the static HTML prototype. Designed for Hostinger deployment with bilingual support (ES/EN), dark/light mode, and ACF-ready editable content.

## Theme location

```
wp-content/themes/tierra-dacogida/
```

## Requirements

- WordPress 6.0+
- PHP 7.4+
- **Recommended plugins:**
  - [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) — hero, stats, gallery
  - [Polylang](https://wordpress.org/plugins/polylang/) — proper ES/EN URLs (optional; falls back to client `i18n.js`)

## Installation on Hostinger

1. Install WordPress via Hostinger hPanel.
2. Upload the `tierra-dacogida` folder to `public_html/wp-content/themes/`.
3. In **Appearance → Themes**, activate **Tierra D'Acogida**.
4. On activation, default pages are created automatically:
   - Inicio (front page)
   - Nosotros, Programas, Alojamiento, Actividades, Galería, Contacto
5. Go to **Settings → Reading** and confirm **A static page** → **Inicio** is set as homepage.
6. Install ACF and Polylang if desired.

## Page structure

| WordPress page | Slug       | Template partial              |
|----------------|------------|-------------------------------|
| Inicio         | `inicio`   | `template-parts/pages/home.php` |
| Nosotros       | `nosotros` | `about.php`                   |
| Programas      | `programas`| `programs.php`                |
| Alojamiento    | `alojamiento` | `accommodation.php`        |
| Actividades    | `actividades` | `activities.php`           |
| Galería        | `galeria`  | `gallery.php`                 |
| Contacto       | `contacto` | `contact.php`                 |

## Editable content

Page content is stored in the **WordPress block editor**. Click **Edit Page** on any page to change text, images, and layout.

On theme activation (or after updating to v1.2+), default content is imported automatically into empty pages. After updating to **v1.2.1**, existing page text with broken accents is auto-corrected on the next admin visit.

Go to **Appearance → Themes** to **Re-import all page content** if you need to reset pages from theme defaults (this overwrites edits).

The contact form is inserted as a `[tda_contact_form]` shortcode block so submissions keep working. Edit the surrounding contact text freely; leave the shortcode block in place on the Contact page.

### ACF (optional extras)

When ACF is active:

- **Home page:** hero title, text, background image, stats
- **Gallery page:** gallery images (replaces hardcoded defaults)
- **Tierra D'Acogida (options):** phone, email, WhatsApp

## Languages

### With Polylang (recommended for production)

1. Install Polylang.
2. Add languages: Español (default), English.
3. Create translated page pairs for each page.
4. The header shows Polylang flag links instead of the JS switcher.

### Without Polylang

The original `assets/js/i18n.js` client-side translator still works for all `data-i18n` elements.

## Contact form

The contact form posts to WordPress (`admin-post.php`) and sends email via `wp_mail()` to the address in **Tierra D'Acogida** options or the site admin email.

## Static prototype

The original static HTML files remain in the project root for reference. Once WordPress is live, point the domain to WordPress and retire the static files.

## Development

To test locally:

1. Install [Local WP](https://localwp.com/) or use Docker.
2. Copy this repo into `wp-content/themes/tierra-dacogida`.
3. Activate the theme.

## File map

```
tierra-dacogida/
├── style.css              Theme metadata
├── functions.php
├── header.php / footer.php
├── front-page.php
├── page.php
├── inc/                   Setup, enqueue, ACF, contact, Polylang
├── page-templates/        Contact, Gallery
├── template-parts/pages/  Page content (from static HTML)
└── assets/                CSS, JS, images (unchanged design system)
```
