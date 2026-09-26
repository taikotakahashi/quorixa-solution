<?php
/**
 * Default theme block content for each page.
 *
 * @package Tierra_Dacogida
 */

defined('ABSPATH') || exit;

function tda_block_img(string $file): string {
    return tda_asset('img/' . $file);
}

function tda_blocks_from_list(array $blocks): string {
    $parts = [];
    foreach ($blocks as $block) {
        if (!is_array($block) || count($block) < 2) {
            continue;
        }
        $parts[] = tda_theme_block((string) $block[0], (array) $block[1]);
    }
    return tda_blocks_join($parts);
}

function tda_gallery_image_defaults(): array {
    $images = [];
    foreach (tda_gallery_images() as $file) {
        $images[] = ['url' => tda_media_url($file), 'alt' => ''];
    }
    return $images;
}

function tda_build_page_block_content(string $partial): string {
    $map = [
        'home'          => 'tda_default_blocks_home',
        'about'         => 'tda_default_blocks_about',
        'programs'      => 'tda_default_blocks_programs',
        'accommodation' => 'tda_default_blocks_accommodation',
        'activities'    => 'tda_default_blocks_activities',
        'gallery'       => 'tda_default_blocks_gallery',
        'contact'       => 'tda_default_blocks_contact',
    ];

    $fn = $map[$partial] ?? '';
    if ($fn === '' || !function_exists($fn)) {
        return '';
    }

    return $fn();
}

function tda_default_blocks_about(): string {
    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Nosotros',
            'title'             => 'Sobre Nosotros',
            'subtitle'          => "Conoce la historia, misión y valores que definen a Tierra D'Acogida® como referente en movilidad estudiantil.",
        ]],
        ['split-section', [
            'label'      => 'Nuestra Historia',
            'title'      => "Tierra D'Acogida® — Un hogar para la movilidad internacional",
            'paragraphs' => [
                "Tierra D'Acogida® es una marca registrada dedicada a ofrecer servicios integrales de Destination Management Center, especializados en movilidad estudiantil, intercambio académico y programas de inmersión cultural, lingüística y deportiva.",
                'Nacimos con la convicción de que la movilidad internacional transforma vidas. Nuestro nombre refleja nuestra misión: ser esa tierra de acogida que hace sentir a cada estudiante como en casa.',
            ],
            'listItems' => [
                'Programas de formación en gestión vitivinícola',
                'Turismo académico y enológico',
                'Visitas a bodegas y rutas del vino',
                'Comercialización y marketing del sector',
            ],
            'imageUrl'   => tda_block_img('IMG_0285.jpeg'),
            'imageAlt'   => "Equipo Tierra D'Acogida",
            'buttonText' => 'Contactar con Nosotros',
            'buttonUrl'  => tda_page_url('contacto'),
        ]],
        ['cards-section', [
            'label'         => 'Misión y Valores',
            'title'         => 'Lo que nos define',
            'columnsPerRow' => 3,
            'cards'         => [
                ['title' => 'Misión', 'text' => 'Facilitar experiencias de movilidad internacional de excelencia, integrando formación académica, inmersión cultural y conocimiento de la industria vitivinícola.'],
                ['title' => 'Visión', 'text' => 'Ser el referente en Destination Management para programas de movilidad estudiantil en España, reconocidos por la calidad, innovación y compromiso.'],
                ['title' => 'Valores', 'text' => 'Excelencia, confianza, innovación, respeto intercultural y compromiso con el desarrollo personal y profesional de cada participante.'],
            ],
        ]],
        ['split-section', [
            'label'      => 'Vitivinicultura & Turismo',
            'title'      => 'Especialización única en la industria vitivinícola',
            'paragraphs' => [
                'Lo que nos diferencia es nuestra profunda conexión con la industria vitivinícola española. Ofrecemos programas que combinan la movilidad estudiantil con la formación, gestión y comercialización en entornos reales.',
                'Nuestros participantes no solo estudian: viven la cultura del vino, conocen los procesos de producción y visitan bodegas emblemáticas.',
            ],
            'listItems' => [
                'Programas de formación en gestión vitivinícola',
                'Turismo académico y enológico',
                'Visitas a bodegas y rutas del vino',
                'Comercialización y marketing del sector',
            ],
            'imageUrl'   => tda_block_img('IMG_4436.jpeg'),
            'imageAlt'   => 'Industria vitivinícola',
            'reverse'    => true,
            'buttonText' => 'Ver más',
            'buttonUrl'  => tda_page_url('programas'),
        ]],
        ['steps-section', [
            'label'         => 'Para Quién Trabajamos',
            'title'         => 'Nuestros clientes y colaboradores',
            'columnsPerRow' => 2,
            'steps'         => [
                ['title' => 'Universidades', 'text' => 'Programas de intercambio, Erasmus+ y movilidad internacional para estudiantes universitarios.'],
                ['title' => 'Centros de Formación', 'text' => 'Centros de formación profesional y escuelas de negocios con programas de movilidad.'],
                ['title' => 'Empresas', 'text' => 'Empresas del sector vitivinícola y turístico que acogen prácticas y visitas formativas.'],
                ['title' => 'Organizaciones', 'text' => 'Organizaciones internacionales y agencias de movilidad educativa.'],
            ],
        ]],
        ['cta-banner', [
            'pill'       => 'Destination Management Center',
            'title'      => '¿Quiere conocer más sobre nuestros programas?',
            'text'       => 'Estaremos encantados de presentarle nuestra propuesta y diseñar un programa adaptado a sus necesidades.',
            'buttonText' => 'Contactar con Nosotros',
            'buttonUrl'  => tda_page_url('contacto'),
        ]],
    ]);
}

function tda_default_blocks_home(): string {
    return tda_blocks_from_list([
        ['hero-photo', [
            'title'      => "Tierra D'Acogida® — Movilidad estudiantil y formación especializada en la Comarca del Bierzo",
            'text'       => "En Tierra D'Acogida trabajamos por dinamizar el tejido socio-económico del entorno rural mediante el fomento de la formación y movilidad europea internacional.",
            'buttonText' => 'Saber más',
            'buttonUrl'  => tda_page_url('nosotros'),
            'imageUrl'   => tda_media_url('hero-back.jpeg'),
            'imageAlt'   => 'Tierra D\'Acogida',
            'imageMode'  => 'single',
            'images'     => [
                ['url' => tda_media_url('hero-back.jpeg'), 'alt' => 'Tierra D\'Acogida'],
            ],
        ]],
        ['split-section', [
            'titleHtml'  => '<span class="text-orange">Programas de movilidad estudiantil</span> <span>en España</span>',
            'paragraphs' => [
                'Diseñamos programas de movilidad internacional personalizados que integran experiencias prácticas, formación y convivencia.',
                'Los programas de movilidad estudiantil ofrecen a los jóvenes la oportunidad de aprender, formarse y crecer a través de una experiencia internacional.',
            ],
            'listItems' => [
                'Prácticas en empresas reales.',
                'Inmersión cultural y lingüística.',
                'Gestión de alojamiento y dietas.',
                'Soporte 24/7 y tutorización.',
            ],
            'imageUrl'   => tda_block_img('IMG_0285.jpeg'),
            'imageAlt'   => 'Estudiantes en programa de movilidad',
            'imageMode'  => 'single',
            'images'     => [
                ['url' => tda_block_img('IMG_0285.jpeg'), 'alt' => 'Estudiantes en programa de movilidad'],
            ],
            'buttonText' => 'Explorar más',
            'buttonUrl'  => tda_page_url('programas'),
        ]],
        ['stats-section', [
            'titleHtml' => '<span class="text-orange">Nuestro impacto</span> <span>en movilidad estudiantil</span>',
            'stats'     => [
                ['value' => '500+', 'label' => 'Participantes'],
                ['value' => '20+', 'label' => 'Colaboradores'],
                ['value' => '50+', 'label' => 'Destinos europeos'],
                ['value' => '4+', 'label' => 'Programas'],
            ],
        ]],
        ['programme-cards', [
            'titleHtml' => '<span class="text-orange">Nuestros</span> <span>servicios</span>',
            'subtitle'  => 'Ofrecemos soluciones integrales para cubrir todas las necesidades de un programa de movilidad internacional.',
            'programmes' => [
                [
                    'title' => 'Programas de movilidad estudiantil', 'text' => 'Diseño y ejecución de programas a medida según las necesidades de la institución.',
                    'meta' => 'Para universidades, centros de FP y coordinadores Erasmus+.', 'imageUrl' => tda_block_img('IMG_0951.jpeg'),
                    'imageAlt' => 'Programas de movilidad', 'buttonText' => 'Solicitar información', 'buttonUrl' => tda_page_url('programas'),
                ],
                [
                    'title' => 'Gestión de alojamientos', 'text' => 'Contamos con instalaciones propias y gestionadas para garantizar el bienestar.',
                    'meta' => 'Residencias, apartamentos compartidos y familias de acogida.', 'imageUrl' => tda_block_img('IMG_5506.jpeg'),
                    'imageAlt' => 'Alojamiento estudiantil', 'buttonText' => 'Ver alojamientos', 'buttonUrl' => tda_page_url('alojamiento'),
                ],
                [
                    'title' => 'Gestión de alimentación', 'text' => 'Dietas saludables y variadas adaptadas a todas las necesidades.',
                    'meta' => 'Menús equilibrados para estancias formativas.', 'imageUrl' => tda_block_img('IMG_0926.jpeg'),
                    'imageAlt' => 'Alimentación y comedor', 'buttonText' => 'Saber más', 'buttonUrl' => tda_page_url('actividades'),
                ],
            ],
        ]],
        ['support-section', [
            'titleHtml' => '<span class="text-orange">¿Cómo apoyamos</span> <span>a tu institución?</span>',
            'subtitle'  => 'Un proceso claro y transparente para garantizar el éxito de cada programa de movilidad.',
            'items'     => [
                ['title' => 'Diseño del programa', 'text' => 'Adaptamos la movilidad a los objetivos de su proyecto y al perfil de los participantes.'],
                ['title' => 'Coordinación local', 'text' => 'Organizamos alojamiento, actividades y servicios locales con proveedores de confianza.'],
                ['title' => 'Apoyo logístico', 'text' => 'Gestión de transporte, vivienda y acompañamiento durante la estancia.'],
                ['title' => 'Seguimiento y documentación', 'text' => 'Apoyo en informes, certificados y documentación de movilidad completa.'],
            ],
        ]],
        ['feature-band', [
            'title' => 'Turismo ecológico y formación profesional',
            'text'  => 'Conoce nuestra propuesta de proyectos de formación en el ámbito de la sostenibilidad.',
            'imageUrl' => tda_block_img('IMG_4436.jpeg'), 'imageAlt' => 'Formación sostenible en el Bierzo',
            'buttonText' => 'Ver programa', 'buttonUrl' => tda_page_url('programas'),
        ]],
        ['gallery-section', [
            'title'      => 'Momentos de nuestros programas',
            'gridClass'  => 'gallery-grid',
            'images'     => [
                ['url' => tda_block_img('IMG_0285.jpeg'), 'alt' => 'Estudiantes internacionales'],
                ['url' => tda_block_img('IMG_4436.jpeg'), 'alt' => 'Turismo enológico'],
                ['url' => tda_block_img('IMG_0926.jpeg'), 'alt' => 'Actividades culturales'],
                ['url' => tda_block_img('IMG_5506.jpeg'), 'alt' => 'Alojamiento'],
            ],
            'buttonText' => 'Ver galería', 'buttonUrl' => tda_page_url('galeria'),
        ]],
        ['reviews-section', [
            'title' => 'Reseñas',
            'reviews' => [
                ['text' => "Mi experiencia con Tierra D'Acogida fue inolvidable: la organización fue impecable y las actividades culturales enriquecedoras."],
                ['text' => 'Un equipo profesional que cuida cada detalle del programa de movilidad. Totalmente recomendable para universidades.'],
            ],
        ]],
        ['cta-banner', [
            'sectionClass' => 'section section--soft',
            'pill'         => 'Destination Management Center',
            'title'        => '¿Planificando un proyecto de movilidad en España?',
            'text'         => 'Contáctanos y te ayudamos a diseñar una propuesta a medida.',
            'buttonText'   => 'Contactar con Nosotros',
            'buttonUrl'    => tda_page_url('contacto'),
        ]],
    ]);
}

function tda_default_blocks_programs(): string {
    $contact = tda_page_url('contacto');

    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Programas',
            'title'             => 'Programas de movilidad en la Comarca del Bierzo',
            'subtitle'          => "Formación especializada conectada con el territorio: industria vitivinícola, agroturismo, turismo religioso y gastronomía berciana.",
        ]],
        ['split-section', [
            'label'      => "Tierra D'Acogida®",
            'title'      => 'Programas de movilidad estudiantil en España',
            'paragraphs' => [
                "Tierra D'Acogida® es un punto de encuentro, aprendizaje y proyección profesional. Aquí, los estudiantes viven una experiencia educativa conectada con los sectores estratégicos del territorio: la industria vitivinícola, el agroturismo, el turismo religioso y el turismo gastronómico.",
            ],
            'listItems' => [
                'Apoyo personalizado antes y durante su estancia.',
                'Enfoque práctico y orientado al empleo.',
                'Gestión de documentación y logística integral.',
                'Alojamiento y manutención de alta calidad.',
            ],
            'imageUrl' => tda_block_img('IMG_0285.jpeg'),
            'imageAlt' => "Estudiantes en Tierra D'Acogida",
            'buttonText' => '¿Quieres saber más?',
            'buttonUrl'  => $contact,
        ]],
        ['cards-section', [
            'label'     => 'Nuestra oferta formativa',
            'title'     => 'Nuestros programas de formación',
            'subtitle'  => 'Conoce las diferentes áreas formativas que ofrecemos en la Comarca del Bierzo.',
            'gridClass' => 'accommodation-grid',
            'cardClass' => 'accommodation-card fade-in',
            'cards'     => [
                [
                    'title' => 'Formación en la Industria Vitivinícola',
                    'text'  => 'El Bierzo es tierra de viñedos, tradición y excelencia. Tierra D\'Acogida® impulsa la movilidad estudiantil para que los jóvenes se formen directamente en el corazón de la producción vitivinícola.',
                    'items' => [
                        'Gestión vitivinícola — Conocimiento de procesos, organización y control de bodegas.',
                        'Comercialización del vino — Estrategias de venta, marketing territorial y posicionamiento de marca.',
                        'Enoturismo profesional — Diseño de experiencias turísticas vinculadas al vino.',
                        'Prácticas en bodegas — Aprendizaje real en empresas vitivinícolas de referencia.',
                    ],
                ],
                [
                    'title' => 'Formación en Agroturismo',
                    'text'  => 'Tierra D\'Acogida® conecta a los estudiantes con el entorno rural del Bierzo, un territorio donde la agricultura, la sostenibilidad y la innovación conviven.',
                    'items' => [
                        'Experiencias en explotaciones agrícolas — Conocimiento directo de cultivos locales y técnicas de producción.',
                        'Turismo rural — Gestión de alojamientos, rutas y actividades en el medio rural.',
                        'Productos de calidad del Bierzo — Castaña, pimiento, manzana reineta, botillo y más.',
                        'Diseño de experiencias agroturísticas — Creación de propuestas atractivas para visitantes.',
                    ],
                ],
                [
                    'title' => 'Formación en Turismo Religioso',
                    'text'  => 'El Bierzo es un territorio clave del Camino de Santiago, con un patrimonio espiritual y cultural único. Tierra D\'Acogida® ofrece formación especializada en este ámbito.',
                    'items' => [
                        'Interpretación del patrimonio religioso — Iglesias, monasterios y enclaves históricos.',
                        'Gestión de rutas religiosas — Organización, promoción y atención al peregrino.',
                        'Impacto turístico del Camino de Santiago — Análisis de flujos, servicios y oportunidades.',
                        'Proyectos de dinamización cultural — Actividades que conectan tradición y desarrollo local.',
                    ],
                ],
                [
                    'title' => 'Formación en Gastronomía Berciana',
                    'text'  => 'La gastronomía del Bierzo es identidad, cultura y atractivo turístico. La movilidad permite formarse en la cocina local y en la cadena de valor agroalimentaria.',
                    'items' => [
                        'Cocina tradicional del Bierzo — Recetas, técnicas y productos locales.',
                        'Turismo gastronómico — Creación de experiencias culinarias para visitantes.',
                        'Eventos y ferias gastronómicas — Participación en actividades de promoción del territorio.',
                        'Cadena de valor agroalimentaria — Desde la producción hasta la comercialización.',
                        'Talleres culinarios con chefs locales y visita a mercados y ferias.',
                    ],
                ],
            ],
        ]],
        ['timeline-section', [
            'label' => 'Participación',
            'title' => "¿Cómo participar en Tierra D'Acogida®?",
            'items' => [
                ['title' => '1. Explora los programas', 'text' => 'Conoce los itinerarios formativos según tu área de interés.'],
                ['title' => '2. Solicita orientación', 'text' => 'Pide orientación en la residencia y resuelve tus dudas sobre el programa.'],
                ['title' => '3. Inscríbete en actividades', 'text' => 'Apúntate a visitas, talleres y experiencias del territorio.'],
                ['title' => '4. Realiza prácticas', 'text' => 'Forma parte de prácticas en empresas del Bierzo.'],
                ['title' => '5. Construye tu futuro', 'text' => 'Avanza con una formación aplicada, territorial y profesional.'],
            ],
        ]],
        ['feature-band', [
            'title'      => "Tierra D'Acogida®: un proyecto que transforma",
            'text'       => 'Este programa convierte la movilidad estudiantil en una experiencia integral: vivir en la residencia, aprender del territorio y proyectarse hacia el futuro. Tierra D\'Acogida® es más que formación; es identidad, oportunidad y comunidad.',
            'buttonText' => 'Descubre nuestro proyecto',
            'buttonUrl'  => $contact,
            'imageUrl'   => tda_block_img('IMG_6716.jpeg'),
            'imageAlt'   => 'Experiencias formativas en el Bierzo',
            'imageMode'  => 'single',
            'images'     => [
                ['url' => tda_block_img('IMG_6716.jpeg'), 'alt' => 'Experiencias formativas en el Bierzo'],
            ],
        ]],
        ['cta-banner', [
            'pill'       => 'Estamos para ayudarte',
            'title'      => '¿Quieres saber más?',
            'text'       => '¿Tienes dudas sobre nuestros programas? Ponte en contacto con nosotros.',
            'buttonText' => 'Contáctanos ahora',
            'buttonUrl'  => $contact,
        ]],
    ]);
}

function tda_default_blocks_accommodation(): string {
    $contact  = tda_page_url('contacto');
    $nosotros = tda_page_url('nosotros');

    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Alojamiento',
            'title'             => 'Residencia de Estudiantes La Rosa Azul',
            'subtitle'          => "El corazón logístico y humano de Tierra D'Acogida® en la Comarca del Bierzo: vive, fórmate y proyecta tu futuro.",
        ]],
        ['split-section', [
            'label'      => 'La Rosa Azul',
            'title'      => "Parte esencial de Tierra D'Acogida®",
            'paragraphs' => [
                "La Rosa Azul y sus alojamientos anexos son el corazón logístico y humano del proyecto Tierra D'Acogida®. Aquí se alojan los estudiantes mientras participan en las formaciones especializadas del territorio.",
                'Ubicación estratégica — Conexión directa con centros formativos y empresas del Bierzo.',
            ],
            'listItems' => [
                'Habitaciones individuales o compartidas con espacios de estudio.',
                'Zonas comunes pensadas para la convivencia y el descanso.',
                'Modalidades de pensión adaptadas a cada estancia formativa.',
                'Punto de partida de visitas, prácticas y actividades del programa.',
            ],
            'imageUrl'   => tda_block_img('IMG_5506.jpeg'),
            'imageAlt'   => 'Residencia La Rosa Azul',
            'buttonText' => "Más información sobre Tierra D'Acogida®",
            'buttonUrl'  => $nosotros,
        ]],
        ['cards-section', [
            'label'     => 'Modalidades',
            'title'     => 'Opciones de pensión en La Rosa Azul',
            'subtitle'  => 'Elige la modalidad que mejor se adapte a tu estancia formativa.',
            'gridClass' => 'accommodation-grid',
            'cardClass' => 'accommodation-card fade-in',
            'cards'     => [
                [
                    'title' => 'Solo Alojamiento',
                    'text'  => 'Habitación en la residencia sin servicio de comidas incluido, con acceso a espacios comunes y zonas de estudio.',
                    'items' => [
                        'Habitación individual o compartida',
                        'Acceso a cocina y zonas comunes',
                        'Servicios básicos incluidos',
                        'WiFi y suministros',
                        'Entorno pensado para la formación',
                    ],
                ],
                [
                    'title' => 'Media Pensión',
                    'text'  => 'Alojamiento con desayuno y una comida principal (almuerzo o cena) incluidos diariamente.',
                    'items' => [
                        'Desayuno completo',
                        'Almuerzo o cena',
                        'Menús equilibrados y variados',
                        'Opciones dietéticas disponibles',
                        'Ideal para estancias formativas',
                    ],
                ],
                [
                    'title' => 'Pensión Completa',
                    'text'  => 'Alojamiento con todas las comidas incluidas: desayuno, almuerzo y cena para máxima comodidad.',
                    'items' => [
                        'Tres comidas diarias',
                        'Menús adaptados culturalmente',
                        'Sin preocupaciones logísticas',
                        'Perfecto para grupos',
                        'Experiencia integral en la residencia',
                    ],
                ],
            ],
        ]],
        ['split-section', [
            'label'      => 'Alojamientos anexos',
            'title'      => 'Espacios complementarios para una experiencia completa',
            'paragraphs' => [
                "Además de la residencia principal, La Rosa Azul cuenta con alojamientos anexos destinados a estudiantes que participan en actividades específicas del programa Tierra D'Acogida®.",
            ],
            'listItems' => [
                'Capacidad ampliada para grupos y estancias temporales.',
                'Ambientes adaptados a prácticas y movilidad.',
                'Privacidad y comodidad para estudiantes en desplazamientos formativos.',
            ],
            'imageUrl'  => tda_block_img('IMG_5507.jpeg'),
            'imageAlt'  => 'Alojamientos anexos La Rosa Azul',
            'reverse'   => true,
            'buttonText'=> 'Solicitar plaza en La Rosa Azul',
            'buttonUrl' => $contact,
        ]],
        ['cards-section', [
            'label'     => 'Ventajas',
            'title'     => '¿Por qué elegir La Rosa Azul?',
            'subtitle'  => 'Más que un alojamiento: el punto de partida de cada actividad, visita y práctica.',
            'gridClass' => 'services-grid',
            'cardClass' => 'activity-card fade-in',
            'cards'     => [
                [
                    'title' => 'Comodidad y bienestar',
                    'text'  => 'Un entorno pensado para que te concentres en tu formación con todas las comodidades necesarias.',
                ],
                [
                    'title' => 'Convivencia enriquecedora',
                    'text'  => 'Comparte experiencias con estudiantes de distintas áreas y procedencias.',
                ],
                [
                    'title' => 'Acceso directo al programa',
                    'text'  => 'La residencia es el punto de partida de cada actividad, visita, práctica y experiencia.',
                ],
                [
                    'title' => 'Entorno único',
                    'text'  => 'Un entorno natural y cultural del Bierzo que potencia el aprendizaje territorial.',
                ],
            ],
        ]],
        ['feature-band', [
            'title'      => "Únete a Tierra D'Acogida® desde La Rosa Azul",
            'text'       => 'La Residencia de Estudiantes La Rosa Azul es más que un alojamiento: es el lugar donde comienza tu camino profesional en el Bierzo. Aquí vivirás una experiencia formativa integral, conectada con el territorio, sus empresas y su identidad.',
            'buttonText' => 'Solicitar plaza en La Rosa Azul',
            'buttonUrl'  => $contact,
            'imageUrl'   => tda_block_img('IMG_5720.jpeg'),
            'imageAlt'   => 'Estudiantes en La Rosa Azul',
            'imageMode'  => 'single',
            'images'     => [
                ['url' => tda_block_img('IMG_5720.jpeg'), 'alt' => 'Estudiantes en La Rosa Azul'],
            ],
        ]],
        ['cta-banner', [
            'title'      => '¿Listo para reservar tu plaza?',
            'text'       => 'Solicita plaza en La Rosa Azul o pide más información sobre Tierra D\'Acogida® y los programas del Bierzo.',
            'buttonText' => 'Quiero más información',
            'buttonUrl'  => $contact,
        ]],
    ]);
}

function tda_default_blocks_activities(): string {
    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Actividades',
            'title' => 'Gestión de Actividades',
            'subtitle' => 'Programación completa de actividades culturales, lingüísticas, deportivas y enológicas adaptadas a cada programa de movilidad.',
        ]],
        ['split-section', [
            'label' => 'Experiencias Únicas', 'title' => 'Actividades que enriquecen cada programa',
            'paragraphs' => [
                "Las actividades son el corazón de la experiencia de movilidad. En Tierra D'Acogida® diseñamos y gestionamos programas de actividades completos que complementan la formación académica.",
                'Desde visitas a bodegas y catas de vino hasta talleres culturales y actividades deportivas, cada experiencia está diseñada para maximizar el aprendizaje intercultural.',
            ],
            'imageUrl' => tda_block_img('IMG_0926.jpeg'), 'imageAlt' => 'Actividades culturales en grupo',
        ]],
        ['cards-section', [
            'label' => 'Categorías', 'title' => 'Tipos de actividades que gestionamos',
            'gridClass' => 'activity-grid', 'cards' => [
                ['title' => 'Enológicas y Vitivinícolas', 'text' => 'Visitas a bodegas, catas de vino, rutas del vino y formación en la industria vitivinícola.'],
                ['title' => 'Culturales', 'text' => 'Visitas guiadas, museos, monumentos, festivales y eventos culturales locales.'],
                ['title' => 'Lingüísticas', 'text' => 'Talleres de idioma, intercambios con hablantes nativos y actividades de inmersión lingüística.'],
                ['title' => 'Deportivas', 'text' => 'Actividades deportivas, torneos interculturales y experiencias de deportes locales.'],
                ['title' => 'Visitas Empresariales', 'text' => 'Visitas a empresas del sector vitivinícola, turístico y formación profesional.'],
                ['title' => 'Talleres y Formación', 'text' => 'Talleres prácticos de cocina, artesanía, enología y habilidades profesionales.'],
            ],
        ]],
        ['service-cards', [
            'label' => 'Itinerarios', 'title' => 'Ejemplos de programas de actividades',
            'cards' => [
                ['title' => 'Programa Express — 3 Días', 'text' => 'Ideal para movilidades cortas: visita cultural, actividad enológica y taller de inmersión lingüística.', 'imageUrl' => tda_block_img('IMG_0926.jpeg'), 'imageAlt' => 'Programa de 3 días', 'items' => ['Día 1: Tour cultural por la ciudad', 'Día 2: Visita a bodega y cata', 'Día 3: Taller y actividad de cierre']],
                ['title' => 'Programa Semanal — 7 Días', 'text' => 'Experiencia completa con actividades diarias que combinan cultura, enología y formación.', 'imageUrl' => tda_block_img('IMG_4436.jpeg'), 'imageAlt' => 'Programa de 1 semana', 'items' => ['Actividades culturales diarias', '2 visitas enológicas', 'Talleres de formación profesional']],
                ['title' => 'Programa Personalizado', 'text' => 'Diseñamos un itinerario a medida según los objetivos, duración y perfil de su grupo.', 'imageUrl' => tda_block_img('IMG_0285.jpeg'), 'imageAlt' => 'Programa personalizado', 'items' => ['Evaluación de necesidades', 'Diseño de itinerario exclusivo', 'Coordinación y seguimiento total']],
            ],
        ]],
        ['steps-section', [
            'sectionClass' => 'section',
            'label' => 'Metodología', 'title' => 'Cómo planificamos las actividades',
            'steps' => [
                ['title' => 'Evaluación', 'text' => 'Analizamos objetivos, perfil del grupo y duración del programa.'],
                ['title' => 'Diseño', 'text' => 'Creamos un itinerario de actividades equilibrado y coherente.'],
                ['title' => 'Ejecución', 'text' => 'Coordinamos proveedores, transporte y guías durante las actividades.'],
                ['title' => 'Evaluación', 'text' => 'Recogemos feedback y entregamos informe de actividades realizadas.'],
            ],
        ]],
        ['gallery-strip', [
            'sectionClass' => 'section section--soft',
            'images' => [
                ['url' => tda_block_img('IMG_4436.jpeg'), 'alt' => 'Cata de vinos', 'wide' => true],
                ['url' => tda_block_img('IMG_0926.jpeg'), 'alt' => 'Actividad grupal'],
                ['url' => tda_block_img('IMG_0285.jpeg'), 'alt' => 'Estudiantes'],
                ['url' => tda_block_img('IMG_0951.jpeg'), 'alt' => 'Viñedos'],
                ['url' => tda_block_img('IMG_5506.jpeg'), 'alt' => 'Grupo internacional'],
            ],
        ]],
        ['cta-banner', [
            'sectionClass' => 'section section--soft',
            'title' => '¿Quiere diseñar un programa de actividades a medida?',
            'text'  => 'Cuéntenos sus objetivos y crearemos una propuesta de actividades adaptada a su grupo.',
            'buttonText' => 'Diseñar Mi Programa', 'buttonUrl' => tda_page_url('contacto'),
        ]],
    ]);
}

function tda_default_blocks_gallery(): string {
    $images = [];
    foreach (tda_gallery_image_defaults() as $img) {
        $images[] = $img;
    }

    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Galería',
            'title' => 'Galería',
            'subtitle' => 'Descubra los momentos más destacados de nuestros programas de movilidad estudiantil en España.',
        ]],
        ['gallery-section', [
            'sectionClass' => 'section',
            'intro' => 'Una selección de imágenes de actividades culturales, alojamiento, turismo enológico y la vida diaria de nuestros participantes internacionales.',
            'images' => $images,
            'buttonText' => 'Contactar con Nosotros', 'buttonUrl' => tda_page_url('contacto'),
        ]],
    ]);
}

function tda_default_blocks_contact(): string {
    $phone = tda_get_field('contact_phone', tda_option('contact_phone', '+34 000 000 000'));
    $email = tda_get_field('contact_email', tda_option('contact_email', 'info@tierradacogida.com'));
    $wa    = tda_get_field('whatsapp_number', tda_option('whatsapp_number', '34000000000'));

    return tda_blocks_from_list([
        ['page-hero', [
            'breadcrumbCurrent' => 'Contacto',
            'title' => 'Contacto',
            'subtitle' => 'Estamos aquí para ayudarle a planificar su programa de movilidad.',
        ]],
        ['contact-info', [
            'pill' => 'Hablemos',
            'title' => '¿Tiene un proyecto en mente?',
            'intro' => 'Cuéntenos sus necesidades y le prepararemos una propuesta personalizada.',
            'phoneLabel' => 'Teléfono',
            'phone' => (string) $phone,
            'emailLabel' => 'Correo Electrónico',
            'email' => (string) $email,
            'whatsappLabel' => 'WhatsApp',
            'whatsapp' => (string) $wa,
            'whatsappText' => 'Enviar mensaje',
            'socialLabel' => 'Redes Sociales',
            'linkedinUrl' => '#',
            'facebookUrl' => '#',
            'instagramUrl' => '#',
            'buttonText' => 'Contactar por WhatsApp',
            'formFields' => tda_default_contact_form_fields(),
            'formSubmitText' => 'Enviar Formulario',
        ]],
    ]);
}
