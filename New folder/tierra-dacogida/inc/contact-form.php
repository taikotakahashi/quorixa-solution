<?php
/**
 * Contact form handler + dynamic field renderer.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

add_action('admin_post_tda_contact', 'tda_handle_contact_form');
add_action('admin_post_nopriv_tda_contact', 'tda_handle_contact_form');

add_shortcode('tda_contact_form', function (): string {
    return tda_render_contact_form_html();
});

/**
 * Default contact form fields (order, labels, placeholders, width).
 *
 * @return list<array<string,mixed>>
 */
function tda_default_contact_form_fields(): array {
    return [
        [
            'id'          => 'nombre',
            'type'        => 'text',
            'label'       => 'Nombre',
            'placeholder' => 'Su nombre',
            'width'       => 'half',
            'required'    => true,
        ],
        [
            'id'          => 'apellido',
            'type'        => 'text',
            'label'       => 'Apellido',
            'placeholder' => 'Su apellido',
            'width'       => 'half',
            'required'    => true,
        ],
        [
            'id'          => 'organizacion',
            'type'        => 'text',
            'label'       => 'Nombre de la Organización',
            'placeholder' => 'Universidad...',
            'width'       => 'full',
            'required'    => false,
        ],
        [
            'id'          => 'email',
            'type'        => 'email',
            'label'       => 'Correo Electrónico',
            'placeholder' => 'correo@ejemplo.com',
            'width'       => 'full',
            'required'    => true,
        ],
        [
            'id'          => 'servicio',
            'type'        => 'select',
            'label'       => 'Servicio de interés',
            'placeholder' => 'Seleccione',
            'width'       => 'full',
            'required'    => false,
            'options'     => [
                ['value' => 'programas', 'label' => 'Programas de Movilidad'],
                ['value' => 'alojamiento', 'label' => 'Alojamiento'],
                ['value' => 'actividades', 'label' => 'Actividades'],
                ['value' => 'integral', 'label' => 'Programa Integral'],
            ],
        ],
        [
            'id'          => 'asunto',
            'type'        => 'text',
            'label'       => 'Asunto',
            'placeholder' => 'Asunto',
            'width'       => 'full',
            'required'    => false,
        ],
        [
            'id'          => 'mensaje',
            'type'        => 'textarea',
            'label'       => 'Su Mensaje',
            'placeholder' => 'Su mensaje...',
            'width'       => 'full',
            'required'    => true,
        ],
    ];
}

/**
 * Build form fields from block attrs (new formFields or legacy label attrs).
 *
 * @param array<string,mixed> $attrs
 * @return list<array<string,mixed>>
 */
function tda_contact_form_fields_from_attrs(array $attrs): array {
    $fields = $attrs['formFields'] ?? null;
    if (is_array($fields) && $fields !== []) {
        return array_values(array_filter($fields, 'is_array'));
    }

    // Migrate legacy per-label attributes into the default field list.
    $fields = tda_default_contact_form_fields();
    $map = [
        'nombre'       => 'formLabelNombre',
        'apellido'     => 'formLabelApellido',
        'organizacion' => 'formLabelOrg',
        'email'        => 'formLabelEmail',
        'servicio'     => 'formLabelService',
        'asunto'       => 'formLabelSubject',
        'mensaje'      => 'formLabelMessage',
    ];
    foreach ($fields as $i => $field) {
        $id = (string) ($field['id'] ?? '');
        if ($id !== '' && !empty($attrs[$map[$id] ?? ''])) {
            $fields[$i]['label'] = (string) $attrs[$map[$id]];
        }
    }
    return $fields;
}

/**
 * Render the contact form HTML.
 *
 * @param array<string,mixed> $config Optional: fields, submit, or legacy label map.
 */
function tda_render_contact_form_html(array $config = []): string {
    $fields = [];
    $submit = 'Enviar Formulario';

    if (isset($config['fields']) && is_array($config['fields']) && $config['fields'] !== []) {
        $fields = array_values(array_filter($config['fields'], 'is_array'));
        $submit = (string) ($config['submit'] ?? $submit);
    } elseif (isset($config[0]) && is_array($config[0])) {
        // Passed a raw fields list.
        $fields = array_values(array_filter($config, 'is_array'));
    } elseif ($config !== []) {
        // Legacy label map from older block render.
        $fields = tda_contact_form_fields_from_attrs([
            'formLabelNombre'   => $config['nombre'] ?? '',
            'formLabelApellido' => $config['apellido'] ?? '',
            'formLabelOrg'      => $config['org'] ?? '',
            'formLabelEmail'    => $config['email'] ?? '',
            'formLabelService'  => $config['service'] ?? '',
            'formLabelSubject'  => $config['subject'] ?? '',
            'formLabelMessage'  => $config['message'] ?? '',
        ]);
        $submit = (string) ($config['submit'] ?? $submit);
    } else {
        $fields = tda_default_contact_form_fields();
    }

    if ($fields === []) {
        $fields = tda_default_contact_form_fields();
    }

    ob_start();
    ?>
<form class="form" data-validate method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
  <input type="hidden" name="action" value="tda_contact">
  <?php wp_nonce_field('tda_contact', 'tda_contact_nonce'); ?>
  <div class="form__success<?php echo (isset($_GET['contact']) && $_GET['contact'] === 'sent') ? ' show' : ''; ?>" data-i18n="contact.formSuccess">¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.</div>
  <?php foreach ($fields as $field) :
        $id          = sanitize_key((string) ($field['id'] ?? 'field'));
        $type        = (string) ($field['type'] ?? 'text');
        $label       = (string) ($field['label'] ?? '');
        $placeholder = (string) ($field['placeholder'] ?? '');
        $width       = ((string) ($field['width'] ?? 'full')) === 'half' ? 'half' : 'full';
        $required    = !empty($field['required']);
        $options     = is_array($field['options'] ?? null) ? $field['options'] : [];
        $input_id    = 'tda_' . $id;
        $group_class = 'form__group form__group--' . $width;
        ?>
    <div class="<?php echo esc_attr($group_class); ?>">
      <?php if ($label !== '') : ?>
        <label for="<?php echo esc_attr($input_id); ?>"><?php echo esc_html($label); ?></label>
      <?php endif; ?>
      <?php if ($type === 'textarea') : ?>
        <textarea id="<?php echo esc_attr($input_id); ?>" name="<?php echo esc_attr($id); ?>"
          placeholder="<?php echo esc_attr($placeholder); ?>"
          <?php echo $required ? 'required' : ''; ?>></textarea>
      <?php elseif ($type === 'select') : ?>
        <select id="<?php echo esc_attr($input_id); ?>" name="<?php echo esc_attr($id); ?>"
          <?php echo $required ? 'required' : ''; ?>>
          <option value=""><?php echo esc_html($placeholder !== '' ? $placeholder : 'Seleccione'); ?></option>
          <?php foreach ($options as $opt) :
                if (!is_array($opt)) {
                    continue;
                }
                $ov = (string) ($opt['value'] ?? '');
                $ol = (string) ($opt['label'] ?? $ov);
                ?>
            <option value="<?php echo esc_attr($ov); ?>"><?php echo esc_html($ol); ?></option>
          <?php endforeach; ?>
        </select>
      <?php else : ?>
        <input type="<?php echo esc_attr(in_array($type, ['email', 'tel', 'text'], true) ? $type : 'text'); ?>"
          id="<?php echo esc_attr($input_id); ?>" name="<?php echo esc_attr($id); ?>"
          placeholder="<?php echo esc_attr($placeholder); ?>"
          <?php echo $required ? 'required' : ''; ?>>
      <?php endif; ?>
      <?php if ($required) : ?>
        <span class="form__error" data-i18n="contact.errRequired">Campo obligatorio</span>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn--peach"><?php echo esc_html($submit); ?></button>
</form>
    <?php
    return (string) ob_get_clean();
}

function tda_page_has_contact_form(): bool {
    if (is_page(['contacto', 'contact'])) {
        return true;
    }
    if (!is_singular('page')) {
        return false;
    }
    $post = get_post();
    return $post instanceof WP_Post && (
        has_shortcode($post->post_content, 'tda_contact_form')
        || has_block('tierra-dacogida/contact-info', $post)
    );
}

function tda_handle_contact_form(): void {
    if (!isset($_POST['tda_contact_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['tda_contact_nonce'])), 'tda_contact')) {
        wp_die(esc_html__('Security check failed.', 'tierra-dacogida'));
    }

    $fields = [
        'nombre'       => sanitize_text_field(wp_unslash($_POST['nombre'] ?? '')),
        'apellido'     => sanitize_text_field(wp_unslash($_POST['apellido'] ?? '')),
        'organizacion' => sanitize_text_field(wp_unslash($_POST['organizacion'] ?? '')),
        'email'        => sanitize_email(wp_unslash($_POST['email'] ?? '')),
        'servicio'     => sanitize_text_field(wp_unslash($_POST['servicio'] ?? '')),
        'asunto'       => sanitize_text_field(wp_unslash($_POST['asunto'] ?? '')),
        'mensaje'      => sanitize_textarea_field(wp_unslash($_POST['mensaje'] ?? '')),
    ];

    // Capture any extra custom fields from a reordered/custom form.
    foreach ($_POST as $key => $value) {
        $key = sanitize_key((string) $key);
        if ($key === '' || isset($fields[$key]) || in_array($key, ['action', 'tda_contact_nonce', '_wp_http_referer'], true)) {
            continue;
        }
        if (is_array($value)) {
            continue;
        }
        $fields[$key] = sanitize_text_field(wp_unslash($value));
    }

    if ($fields['nombre'] === '' || $fields['apellido'] === '' || $fields['email'] === '' || $fields['mensaje'] === '') {
        wp_safe_redirect(wp_get_referer() ?: home_url('/'));
        exit;
    }

    $to = tda_option('contact_email', get_option('admin_email'));
    $subject = sprintf('[Tierra D\'Acogida] %s %s', $fields['nombre'], $fields['apellido']);
    if ($fields['asunto'] !== '') {
        $subject .= ' — ' . $fields['asunto'];
    }

    $body_lines = [];
    foreach ($fields as $key => $value) {
        if ($value === '' || $key === 'mensaje') {
            continue;
        }
        $body_lines[] = ucfirst($key) . ': ' . $value;
    }
    $body_lines[] = '';
    $body_lines[] = $fields['mensaje'];
    $body = implode("\n", $body_lines);

    $headers = ['Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $fields['email']];
    wp_mail($to, $subject, $body, $headers);

    $redirect = add_query_arg('contact', 'sent', wp_get_referer() ?: tda_page_url('contacto'));
    wp_safe_redirect($redirect);
    exit;
}
