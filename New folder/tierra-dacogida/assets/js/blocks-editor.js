/**
 * Tierra D'Acogida section blocks — rich text, image effects, drag reorder, column swap.
 * Attributes come from PHP registration (do not redeclare array schemas here).
 */
(function (wp) {
  if (!wp || !wp.blocks || !wp.element || !wp.blockEditor) {
    return;
  }

  var el = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var useState = wp.element.useState;
  var registerBlockType = wp.blocks.registerBlockType;
  var unregisterBlockType = wp.blocks.unregisterBlockType;
  var getBlockType = wp.blocks.getBlockType;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
  var MediaReplaceFlow = wp.blockEditor.MediaReplaceFlow;
  var BlockControls = wp.blockEditor.BlockControls;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var ToggleControl = wp.components.ToggleControl;
  var Button = wp.components.Button;
  var ToolbarGroup = wp.components.ToolbarGroup;
  var ToolbarButton = wp.components.ToolbarButton;
  var SelectControl = wp.components.SelectControl;
  var ColorPalette = wp.components.ColorPalette;
  var FontSizePicker = wp.components.FontSizePicker;
  var registerFormatType = wp.richText && wp.richText.registerFormatType;
  var applyFormat = wp.richText && wp.richText.applyFormat;
  var removeFormat = wp.richText && wp.richText.removeFormat;
  var getActiveFormat = wp.richText && wp.richText.getActiveFormat;
  var RichTextToolbarButton = wp.blockEditor.RichTextToolbarButton;

  var RICH_FORMATS = [
    'core/bold',
    'core/italic',
    'core/link',
    'core/strikethrough',
    'core/text-color',
    'tda/font-size',
    'tda/highlight',
  ];

  var THEME_COLORS = [
    { name: 'Orange', color: '#F39200' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Muted', color: '#9A9AA8' },
    { name: 'Text', color: '#F0F0F2' },
    { name: 'Teal', color: '#3DB8CC' },
    { name: 'Dark', color: '#121214' },
  ];

  var FONT_SIZES = [
    { name: 'Small', slug: 'small', size: '0.875rem' },
    { name: 'Normal', slug: 'normal', size: '1rem' },
    { name: 'Medium', slug: 'medium', size: '1.25rem' },
    { name: 'Large', slug: 'large', size: '1.75rem' },
    { name: 'Huge', slug: 'huge', size: '2.5rem' },
  ];

  var FILTER_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Grayscale', value: 'grayscale' },
    { label: 'Sepia', value: 'sepia' },
    { label: 'Brighten', value: 'bright' },
    { label: 'Darken', value: 'darken' },
    { label: 'High contrast', value: 'contrast' },
    { label: 'Soft blur', value: 'blur' },
    { label: 'Medium blur', value: 'blur-md' },
    { label: 'Strong blur', value: 'blur-lg' },
    { label: 'Saturate', value: 'saturate' },
  ];

  var OVERLAY_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Dark veil', value: 'dark' },
    { label: 'Light veil', value: 'light' },
    { label: 'Orange wash', value: 'orange' },
  ];

  var RADIUS_OPTIONS = [
    { label: 'None (square)', value: 'none' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra large', value: 'xl' },
  ];

  var BLUR_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Soft', value: 'soft' },
    { label: 'Medium', value: 'medium' },
    { label: 'Strong', value: 'strong' },
  ];

  /* ---------- custom rich-text formats ---------- */
  if (registerFormatType && RichTextToolbarButton) {
    registerFormatType('tda/font-size', {
      title: 'Font size',
      tagName: 'span',
      className: 'tda-font-size',
      attributes: { style: 'style' },
      edit: function (props) {
        var active = getActiveFormat(props.value, 'tda/font-size');
        var openState = useState(false);
        var isOpen = openState[0];
        var setOpen = openState[1];
        return el(Fragment, {},
          el(RichTextToolbarButton, {
            icon: 'editor-textcolor',
            title: 'Font size',
            onClick: function () { setOpen(!isOpen); },
            isActive: !!active,
          }),
          isOpen
            ? el('div', { className: 'tda-format-popover' },
                FONT_SIZES.map(function (fs) {
                  return el(Button, {
                    key: fs.slug,
                    variant: 'tertiary',
                    onClick: function () {
                      props.onChange(
                        applyFormat(props.value, {
                          type: 'tda/font-size',
                          attributes: { style: 'font-size:' + fs.size },
                        })
                      );
                      setOpen(false);
                    },
                  }, fs.name + ' (' + fs.size + ')');
                }),
                el(Button, {
                  variant: 'link',
                  isDestructive: true,
                  onClick: function () {
                    props.onChange(removeFormat(props.value, 'tda/font-size'));
                    setOpen(false);
                  },
                }, 'Clear size')
              )
            : null
        );
      },
    });

    registerFormatType('tda/highlight', {
      title: 'Highlight / shape',
      tagName: 'span',
      className: 'tda-highlight',
      edit: function (props) {
        var active = getActiveFormat(props.value, 'tda/highlight');
        return el(RichTextToolbarButton, {
          icon: 'admin-customizer',
          title: 'Orange highlight',
          isActive: !!active,
          onClick: function () {
            if (active) {
              props.onChange(removeFormat(props.value, 'tda/highlight'));
            } else {
              props.onChange(applyFormat(props.value, { type: 'tda/highlight' }));
            }
          },
        });
      },
    });
  }

  var useEffect = wp.element.useEffect;
  var useRef = wp.element.useRef;

  function setAttr(props, key, value) {
    var next = {};
    next[key] = value;
    props.setAttributes(next);
  }

  function columnsPerRowControl(props, defaultCols) {
    var cols = props.attributes.columnsPerRow || defaultCols;
    return el(SelectControl, {
      label: 'Items per row',
      value: String(cols),
      options: [
        { label: '1 per row', value: '1' },
        { label: '2 per row', value: '2' },
        { label: '3 per row', value: '3' },
        { label: '4 per row', value: '4' },
        { label: '5 per row', value: '5' },
        { label: '6 per row', value: '6' },
      ],
      onChange: function (v) {
        setAttr(props, 'columnsPerRow', parseInt(v, 10) || defaultCols);
      },
      help: 'Desktop layout. Narrower screens may wrap earlier.',
    });
  }

  function colsStyle(cols, defaultCols) {
    return { ['--tda-cols']: String(cols || defaultCols) };
  }

  /**
   * When a block was saved empty, pull theme defaults into the editor once.
   */
  function useHealDefaults(props, blockName) {
    useEffect(function () {
      var defaults = (typeof tdaBlockDefaults !== 'undefined' && tdaBlockDefaults)
        ? tdaBlockDefaults[blockName]
        : null;
      if (!defaults) {
        return;
      }
      var a = props.attributes || {};
      var patch = {};
      var listKeys = ['programmes', 'cards', 'steps', 'stats', 'items', 'images', 'reviews', 'paragraphs', 'listItems', 'formFields'];
      listKeys.forEach(function (key) {
        if (defaults[key] && defaults[key].length && (!a[key] || !a[key].length)) {
          patch[key] = defaults[key];
        }
      });
      var stringKeys = [
        'title', 'titleHtml', 'subtitle', 'text', 'label', 'buttonText', 'buttonUrl',
        'imageUrl', 'imageAlt', 'intro', 'pill', 'phone', 'email', 'whatsapp', 'whatsappText',
        'phoneLabel', 'emailLabel', 'whatsappLabel', 'socialLabel', 'formSubmitText'
      ];
      // page-hero defaults are page-specific; only heal contact-info-style fields from catalog.
      if (blockName === 'tierra-dacogida/page-hero') {
        stringKeys = [];
      }
      stringKeys.forEach(function (key) {
        if (defaults[key] && !a[key]) {
          patch[key] = defaults[key];
        }
      });
      // Programme / service cards missing images
      if (a.programmes && a.programmes.length && defaults.programmes) {
        var fixed = false;
        var nextProg = a.programmes.map(function (p, i) {
          var d = defaults.programmes[i];
          if (p && d && !p.imageUrl && d.imageUrl) {
            fixed = true;
            return Object.assign({}, p, { imageUrl: d.imageUrl, imageAlt: p.imageAlt || d.imageAlt || '' });
          }
          return p;
        });
        if (fixed) {
          patch.programmes = nextProg;
        }
      }
      if (Object.keys(patch).length) {
        props.setAttributes(patch);
      }
    }, []);
  }

  function registerTda(name, editFn) {
    var existing = getBlockType(name);
    var wrappedEdit = function (props) {
      useHealDefaults(props, name);
      return editFn(props);
    };
    var settings = {
      edit: wrappedEdit,
      save: function () { return null; },
    };
    if (existing) {
      try { unregisterBlockType(name); } catch (e) { /* ignore */ }
      registerBlockType(name, Object.assign({}, existing, settings, {
        attributes: existing.attributes,
        supports: existing.supports,
      }));
      return;
    }
    registerBlockType(name, Object.assign({
      apiVersion: 3,
      category: 'tierra-dacogida',
      title: name,
    }, settings));
  }

  function previewWrap(className, children) {
    return el('section', useBlockProps({ className: 'tda-block-preview ' + className }), children);
  }

  function richText(tag, value, onChange, placeholder, className, style) {
    return el(RichText, {
      tagName: tag,
      className: className || undefined,
      style: style || undefined,
      value: value || '',
      allowedFormats: RICH_FORMATS,
      onChange: onChange,
      placeholder: placeholder || '',
    });
  }

  function typographyStyle(attrs, prefix) {
    var style = {};
    if (attrs[prefix + 'Color']) {
      style.color = attrs[prefix + 'Color'];
    }
    if (attrs[prefix + 'FontSize']) {
      style.fontSize = attrs[prefix + 'FontSize'];
    }
    if (attrs[prefix + 'Transform'] && attrs[prefix + 'Transform'] !== 'none') {
      style.textTransform = attrs[prefix + 'Transform'];
    }
    return style;
  }

  function typographyPanel(props, prefix, label) {
    var a = props.attributes;
    return el(PanelBody, { title: (label || 'Typography') + ' style', initialOpen: false },
      el('p', {}, 'Color'),
      el(ColorPalette, {
        colors: THEME_COLORS,
        value: a[prefix + 'Color'] || '',
        onChange: function (v) { setAttr(props, prefix + 'Color', v || ''); },
      }),
      el(FontSizePicker, {
        fontSizes: FONT_SIZES,
        value: a[prefix + 'FontSize'] || undefined,
        onChange: function (v) { setAttr(props, prefix + 'FontSize', v || ''); },
        withSlider: true,
      }),
      el(SelectControl, {
        label: 'Text shape (transform)',
        value: a[prefix + 'Transform'] || 'none',
        options: [
          { label: 'Normal', value: 'none' },
          { label: 'UPPERCASE', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' },
          { label: 'Capitalize', value: 'capitalize' },
        ],
        onChange: function (v) { setAttr(props, prefix + 'Transform', v); },
      })
    );
  }

  function imageEffectsPanel(props, prefix) {
    var a = props.attributes;
    if (prefix) {
      return null;
    }
    return el(PanelBody, { title: 'Image effects', initialOpen: false },
      el(SelectControl, {
        label: 'Filter',
        value: a.imageFilter || 'none',
        options: FILTER_OPTIONS,
        onChange: function (v) { setAttr(props, 'imageFilter', v); },
      }),
      el(SelectControl, {
        label: 'Blur',
        value: a.imageBlur || 'none',
        options: BLUR_OPTIONS,
        onChange: function (v) { setAttr(props, 'imageBlur', v); },
      }),
      el(SelectControl, {
        label: 'Border radius',
        value: a.imageRadius || 'none',
        options: RADIUS_OPTIONS,
        onChange: function (v) { setAttr(props, 'imageRadius', v); },
      }),
      el(SelectControl, {
        label: 'Overlay',
        value: a.imageOverlay || 'none',
        options: OVERLAY_OPTIONS,
        onChange: function (v) { setAttr(props, 'imageOverlay', v); },
      }),
      el(SelectControl, {
        label: 'Fit',
        value: a.imageFit || 'cover',
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Contain', value: 'contain' },
        ],
        onChange: function (v) { setAttr(props, 'imageFit', v); },
      })
    );
  }

  function mediaClass(filter, overlay, fit, radius, blur) {
    var c = 'tda-media';
    if (filter && filter !== 'none') {
      c += ' tda-media--filter-' + filter;
    }
    if (overlay && overlay !== 'none') {
      c += ' tda-media--overlay-' + overlay;
    }
    if (fit && fit !== 'cover') {
      c += ' tda-media--fit-' + fit;
    }
    if (radius && radius !== 'none') {
      c += ' tda-media--radius-' + radius;
    }
    if (blur && blur !== 'none') {
      c += ' tda-media--blur-' + blur;
    }
    return c;
  }

  function normalizeMediaList(media) {
    var list = Array.isArray(media) ? media : (media ? [media] : []);
    return list.filter(function (m) { return m && m.url; }).map(function (m) {
      return { url: m.url, alt: m.alt || '' };
    });
  }

  function MediaAreaEdit(props) {
    var a = props.attributes;
    var wrapClass = props.wrapClass || '';
    var isHero = !!props.isHero;
    var active = props.active !== false;
    var mode = a.imageMode || 'single';
    var images = (a.images && a.images.length)
      ? a.images
      : (a.imageUrl ? [{ url: a.imageUrl, alt: a.imageAlt || '' }] : []);
    var effectsOpen = useState(false);
    var showEffects = effectsOpen[0];
    var setShowEffects = effectsOpen[1];
    var slideState = useState(0);
    var slideIdx = slideState[0];
    var setSlideIdx = slideState[1];
    var current = images[slideIdx] || images[0];
    var filter = a.imageFilter || 'none';
    var overlay = a.imageOverlay || 'none';
    var fit = a.imageFit || 'cover';
    var radius = a.imageRadius || 'none';
    var blur = a.imageBlur || 'none';

    function commitImages(next, nextMode) {
      var patch = {
        images: next,
        imageUrl: next[0] ? next[0].url : '',
        imageAlt: next[0] ? (next[0].alt || '') : (a.imageAlt || ''),
      };
      if (nextMode) {
        patch.imageMode = nextMode;
      }
      props.setAttributes(patch);
      if (slideIdx >= next.length) {
        setSlideIdx(Math.max(0, next.length - 1));
      }
    }

    var mediaBody;
    if (isHero) {
      mediaBody = el('div', { className: 'hero-photo__media' },
        images.length
          ? images.map(function (img, i) {
              return el('div', {
                key: i,
                className: 'hero-photo__slide' + (i === slideIdx ? ' is-active' : ''),
                style: { backgroundImage: 'url(' + img.url + ')' },
              });
            })
          : el('div', { className: 'hero-photo__slide is-active tda-media-placeholder' }, 'Add hero image')
      );
    } else {
      mediaBody = el('div', { className: mediaClass(filter, overlay, fit, radius, blur) },
        current
          ? el('img', { src: current.url, alt: current.alt || '', draggable: false })
          : el('div', { className: 'tda-media-placeholder' }, 'No image yet')
      );
    }

    return el('div', {
      className: 'tda-editable-image tda-media-area ' + wrapClass
        + (isHero ? ' tda-media-area--hero' : '')
        + ' ' + mediaClass(filter, overlay, fit, radius, blur),
    },
      mediaBody,
      images.length > 1
        ? el('div', { className: 'tda-media-area__slides-ui' },
            el('button', {
              type: 'button',
              className: 'tda-slider__prev',
              onClick: function (e) {
                e.preventDefault();
                e.stopPropagation();
                setSlideIdx((slideIdx - 1 + images.length) % images.length);
              },
            }, '‹'),
            el('span', { className: 'tda-media-area__count' }, (slideIdx + 1) + ' / ' + images.length),
            el('button', {
              type: 'button',
              className: 'tda-slider__next',
              onClick: function (e) {
                e.preventDefault();
                e.stopPropagation();
                setSlideIdx((slideIdx + 1) % images.length);
              },
            }, '›')
          )
        : null,
      active
        ? el('div', {
            className: 'tda-editable-image__controls' + (showEffects ? ' is-expanded' : ''),
            onPointerDown: function (e) { e.stopPropagation(); },
            onMouseDown: function (e) { e.stopPropagation(); },
          },
            el('div', { className: 'tda-editable-image__toolbar' },
              el(MediaUploadCheck, {},
                el(MediaUpload, {
                  onSelect: function (media) {
                    var next = normalizeMediaList(media);
                    if (!next.length) {
                      return;
                    }
                    if (mode === 'slider') {
                      commitImages(images.concat(next), 'slider');
                    } else {
                      commitImages(next.slice(0, 1), 'single');
                    }
                    setSlideIdx(mode === 'slider' ? Math.max(0, images.length) : 0);
                  },
                  allowedTypes: ['image'],
                  multiple: mode === 'slider',
                  gallery: mode === 'slider',
                  value: mode === 'slider' ? undefined : undefined,
                  render: function (obj) {
                    return el(Button, {
                      variant: 'primary',
                      size: 'small',
                      onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        obj.open();
                      },
                    }, mode === 'slider' ? (images.length ? 'Add images' : 'Add images') : (images.length ? 'Replace' : 'Add'));
                  },
                })
              ),
              mode === 'slider' && images.length
                ? el(MediaUploadCheck, {},
                    el(MediaUpload, {
                      onSelect: function (media) {
                        var next = normalizeMediaList(media);
                        if (next.length) {
                          commitImages(next, 'slider');
                          setSlideIdx(0);
                        }
                      },
                      allowedTypes: ['image'],
                      multiple: true,
                      gallery: true,
                      render: function (obj) {
                        return el(Button, {
                          variant: 'secondary',
                          size: 'small',
                          onClick: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            obj.open();
                          },
                        }, 'Replace all');
                      },
                    })
                  )
                : null,
              el(Button, {
                variant: mode === 'slider' ? 'primary' : 'secondary',
                size: 'small',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  var nextMode = mode === 'slider' ? 'single' : 'slider';
                  if (nextMode === 'single' && images.length > 1) {
                    commitImages([images[slideIdx] || images[0]], 'single');
                    setSlideIdx(0);
                  } else {
                    setAttr(props, 'imageMode', nextMode);
                  }
                },
              }, mode === 'slider' ? 'Slider' : 'Single'),
              el(Button, {
                variant: showEffects ? 'primary' : 'secondary',
                size: 'small',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowEffects(!showEffects);
                },
              }, showEffects ? 'Hide' : 'Effects')
            ),
            showEffects
              ? el('div', { className: 'tda-effect-row' },
                  el('label', { className: 'tda-effect-field' },
                    el('span', {}, 'Filter'),
                    el('select', {
                      value: filter,
                      onChange: function (e) { setAttr(props, 'imageFilter', e.target.value); },
                    }, FILTER_OPTIONS.map(function (o) {
                      return el('option', { key: o.value, value: o.value }, o.label);
                    }))
                  ),
                  el('label', { className: 'tda-effect-field' },
                    el('span', {}, 'Blur'),
                    el('select', {
                      value: blur,
                      onChange: function (e) { setAttr(props, 'imageBlur', e.target.value); },
                    }, BLUR_OPTIONS.map(function (o) {
                      return el('option', { key: o.value, value: o.value }, o.label);
                    }))
                  ),
                  el('label', { className: 'tda-effect-field' },
                    el('span', {}, 'Radius'),
                    el('select', {
                      value: radius,
                      onChange: function (e) { setAttr(props, 'imageRadius', e.target.value); },
                    }, RADIUS_OPTIONS.map(function (o) {
                      return el('option', { key: o.value, value: o.value }, o.label);
                    }))
                  ),
                  el('label', { className: 'tda-effect-field' },
                    el('span', {}, 'Overlay'),
                    el('select', {
                      value: overlay,
                      onChange: function (e) { setAttr(props, 'imageOverlay', e.target.value); },
                    }, OVERLAY_OPTIONS.map(function (o) {
                      return el('option', { key: o.value, value: o.value }, o.label);
                    }))
                  )
                )
              : null,
            mode === 'slider' && images.length > 1
              ? el('div', { className: 'tda-media-thumbs' },
                  images.map(function (img, i) {
                    return el('button', {
                      key: i,
                      type: 'button',
                      className: 'tda-media-thumb' + (i === slideIdx ? ' is-active' : ''),
                      onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        setSlideIdx(i);
                      },
                    },
                      el('img', { src: img.url, alt: '' }),
                      el('span', {
                        className: 'tda-media-thumb__remove',
                        onClick: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          var next = images.slice();
                          next.splice(i, 1);
                          commitImages(next, next.length > 1 ? 'slider' : 'single');
                        },
                      }, '×')
                    );
                  })
                )
              : null
          )
        : el('span', { className: 'tda-editable-image__badge' }, 'Select block to edit')
    );
  }

  function ImageFieldEdit(props) {
    var url = props.url;
    var alt = props.alt;
    var onSelect = props.onSelect;
    var wrapClass = props.wrapClass || '';
    var options = props.options || {};
    var active = options.active !== false;
    var filter = options.filter || 'none';
    var overlay = options.overlay || 'none';
    var fit = options.fit || 'cover';
    var onEffects = options.onEffects;
    var withSlider = !!options.withSlider;
    var mode = options.imageMode || 'single';
    var images = (options.images && options.images.length)
      ? options.images
      : (url ? [{ url: url, alt: alt || '' }] : []);
    var onMediaChange = options.onMediaChange;
    var effectsOpen = useState(false);
    var showEffects = effectsOpen[0];
    var setShowEffects = effectsOpen[1];
    var slideState = useState(0);
    var slideIdx = slideState[0];
    var setSlideIdx = slideState[1];
    var current = images[slideIdx] || images[0];
    var displayUrl = current ? current.url : url;
    var displayAlt = current ? (current.alt || '') : (alt || '');

    function commitImages(next, nextMode) {
      if (!onMediaChange) {
        return;
      }
      onMediaChange({
        images: next,
        imageUrl: next[0] ? next[0].url : '',
        imageAlt: next[0] ? (next[0].alt || '') : '',
        imageMode: nextMode || mode,
      });
      if (slideIdx >= next.length) {
        setSlideIdx(Math.max(0, next.length - 1));
      }
    }

    function handleSingleSelect(media) {
      if (!media || !media.url) {
        return;
      }
      if (withSlider && mode === 'slider' && onMediaChange) {
        var added = normalizeMediaList(media);
        if (!added.length) {
          return;
        }
        commitImages(images.concat(added), 'slider');
        setSlideIdx(Math.max(0, images.length));
        return;
      }
      if (onSelect) {
        onSelect(media);
      }
    }

    return el(Fragment, {},
      options.showToolbar && active && MediaReplaceFlow
        ? el(BlockControls, { group: 'inline' },
            el(ToolbarGroup, {},
              el(MediaReplaceFlow, {
                mediaURL: displayUrl || '',
                allowedTypes: ['image'],
                accept: 'image/*',
                onSelect: handleSingleSelect,
                name: displayUrl ? 'Replace' : 'Add image',
              })
            )
          )
        : null,
      el('div', { className: 'tda-editable-image ' + wrapClass },
        el('div', { className: mediaClass(filter, overlay, fit) },
          displayUrl
            ? el('img', { src: displayUrl, alt: displayAlt, draggable: false })
            : el('div', { className: 'tda-media-placeholder' }, 'No image yet')
        ),
        withSlider && images.length > 1
          ? el('div', { className: 'tda-media-area__slides-ui' },
              el('button', {
                type: 'button',
                className: 'tda-slider__prev',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlideIdx((slideIdx - 1 + images.length) % images.length);
                },
              }, '‹'),
              el('span', { className: 'tda-media-area__count' }, (slideIdx + 1) + ' / ' + images.length),
              el('button', {
                type: 'button',
                className: 'tda-slider__next',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlideIdx((slideIdx + 1) % images.length);
                },
              }, '›')
            )
          : null,
        active
          ? el('div', {
              className: 'tda-editable-image__controls' + (showEffects && onEffects ? ' is-expanded' : ''),
              onPointerDown: function (e) { e.stopPropagation(); },
              onMouseDown: function (e) { e.stopPropagation(); },
            },
              el('div', { className: 'tda-editable-image__toolbar' },
                el(MediaUploadCheck, {},
                  el(MediaUpload, {
                    onSelect: function (media) {
                      if (withSlider && mode === 'slider' && onMediaChange) {
                        var next = normalizeMediaList(media);
                        if (!next.length) {
                          return;
                        }
                        commitImages(images.concat(next), 'slider');
                        setSlideIdx(Math.max(0, images.length));
                        return;
                      }
                      var single = Array.isArray(media) ? media[0] : media;
                      handleSingleSelect(single);
                    },
                    allowedTypes: ['image'],
                    multiple: withSlider && mode === 'slider',
                    gallery: withSlider && mode === 'slider',
                    render: function (obj) {
                      return el(Button, {
                        variant: 'primary',
                        size: 'small',
                        onClick: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          obj.open();
                        },
                      }, withSlider && mode === 'slider'
                        ? 'Add images'
                        : (displayUrl ? 'Replace' : 'Add'));
                    },
                  })
                ),
                withSlider && mode === 'slider' && images.length && onMediaChange
                  ? el(MediaUploadCheck, {},
                      el(MediaUpload, {
                        onSelect: function (media) {
                          var next = normalizeMediaList(media);
                          if (next.length) {
                            commitImages(next, 'slider');
                            setSlideIdx(0);
                          }
                        },
                        allowedTypes: ['image'],
                        multiple: true,
                        gallery: true,
                        render: function (obj) {
                          return el(Button, {
                            variant: 'secondary',
                            size: 'small',
                            onClick: function (e) {
                              e.preventDefault();
                              e.stopPropagation();
                              obj.open();
                            },
                          }, 'Replace all');
                        },
                      })
                    )
                  : null,
                withSlider && onMediaChange
                  ? el(Button, {
                      variant: mode === 'slider' ? 'primary' : 'secondary',
                      size: 'small',
                      onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var nextMode = mode === 'slider' ? 'single' : 'slider';
                        if (nextMode === 'single' && images.length > 1) {
                          var keep = [images[slideIdx] || images[0]];
                          commitImages(keep, 'single');
                          setSlideIdx(0);
                        } else {
                          onMediaChange({
                            images: images,
                            imageUrl: images[0] ? images[0].url : (url || ''),
                            imageAlt: images[0] ? (images[0].alt || '') : (alt || ''),
                            imageMode: nextMode,
                          });
                        }
                      },
                    }, mode === 'slider' ? 'Slider' : 'Single')
                  : null,
                onEffects
                  ? el(Button, {
                      variant: showEffects ? 'primary' : 'secondary',
                      size: 'small',
                      onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowEffects(!showEffects);
                      },
                    }, showEffects ? 'Hide' : 'Effects')
                  : null
              ),
              onEffects && showEffects
                ? el('div', { className: 'tda-effect-row' },
                    el('label', { className: 'tda-effect-field' },
                      el('span', {}, 'Effect'),
                      el('select', {
                        value: filter,
                        onChange: function (e) { onEffects({ filter: e.target.value }); },
                      }, FILTER_OPTIONS.map(function (o) {
                        return el('option', { key: o.value, value: o.value }, o.label);
                      }))
                    ),
                    el('label', { className: 'tda-effect-field' },
                      el('span', {}, 'Overlay'),
                      el('select', {
                        value: overlay,
                        onChange: function (e) { onEffects({ overlay: e.target.value }); },
                      }, OVERLAY_OPTIONS.map(function (o) {
                        return el('option', { key: o.value, value: o.value }, o.label);
                      }))
                    ),
                    el('label', { className: 'tda-effect-field' },
                      el('span', {}, 'Fit'),
                      el('select', {
                        value: fit,
                        onChange: function (e) { onEffects({ fit: e.target.value }); },
                      },
                        el('option', { value: 'cover' }, 'Cover'),
                        el('option', { value: 'contain' }, 'Contain')
                      )
                    )
                  )
                : null,
              withSlider && mode === 'slider' && images.length > 1
                ? el('div', { className: 'tda-media-thumbs' },
                    images.map(function (img, i) {
                      return el('button', {
                        key: i,
                        type: 'button',
                        className: 'tda-media-thumb' + (i === slideIdx ? ' is-active' : ''),
                        onClick: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          setSlideIdx(i);
                        },
                      },
                        el('img', { src: img.url, alt: '' }),
                        el('span', {
                          className: 'tda-media-thumb__remove',
                          onClick: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var next = images.slice();
                            next.splice(i, 1);
                            commitImages(next, next.length > 1 ? 'slider' : 'single');
                          },
                        }, '×')
                      );
                    })
                  )
                : null
            )
          : el('span', { className: 'tda-editable-image__badge' }, 'Select block to edit')
      )
    );
  }

  function imageField(url, alt, onSelect, wrapClass, options) {
    return el(ImageFieldEdit, {
      url: url,
      alt: alt,
      onSelect: onSelect,
      wrapClass: wrapClass,
      options: options || {},
    });
  }

  function editableList(props, attr) {
    var items = props.attributes[attr] || [];
    return el(Fragment, {},
      el('ul', { className: 'feature-list tda-editable-list' },
        items.map(function (item, i) {
          return el(RichText, {
            key: i,
            tagName: 'li',
            value: item,
            allowedFormats: RICH_FORMATS,
            placeholder: 'List item…',
            onChange: function (v) {
              var next = items.slice();
              next[i] = v;
              setAttr(props, attr, next);
            },
          });
        })
      ),
      el('div', { className: 'tda-list-actions' },
        el(Button, {
          variant: 'secondary',
          onClick: function () { setAttr(props, attr, items.concat([''])); },
        }, 'Add list item'),
        items.length
          ? el(Button, {
              variant: 'link',
              isDestructive: true,
              onClick: function () {
                var next = items.slice();
                next.pop();
                setAttr(props, attr, next);
              },
            }, 'Remove last')
          : null
      )
    );
  }

  function reorder(list, from, to) {
    if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
      return list;
    }
    var next = list.slice();
    var item = next.splice(from, 1)[0];
    next.splice(to, 0, item);
    return next;
  }

  /**
   * Pointer-based reorder (HTML5 DnD is unreliable inside the block editor).
   * Drag from the ⋮⋮ handle to swap with neighbors.
   * Optional onAdd / allowRemove for add & delete.
   */
  function SortableList(props) {
    var items = props.items || [];
    var setItems = props.setItems;
    var dragState = useState(null);
    var dragIndex = dragState[0];
    var setDragIndex = dragState[1];
    var listRef = useRef(null);
    var dragIndexRef = useRef(null);
    var itemsRef = useRef(items);
    itemsRef.current = items;
    var Tag = props.tagName || 'div';
    var minItems = props.minItems != null ? props.minItems : 1;
    var allowRemove = props.allowRemove !== false;

    useEffect(function () {
      if (dragIndex === null) {
        return undefined;
      }

      var root = listRef.current;
      var doc = root && root.ownerDocument ? root.ownerDocument : document;
      var win = doc.defaultView || window;

      function itemIndexFromPoint(clientX, clientY) {
        if (!root) {
          return -1;
        }
        var el = doc.elementFromPoint(clientX, clientY);
        if (!el || !el.closest) {
          return -1;
        }
        var item = el.closest('.tda-sortable-item');
        if (!item || !root.contains(item)) {
          return -1;
        }
        var nodes = root.querySelectorAll(':scope > .tda-sortable-item');
        for (var n = 0; n < nodes.length; n++) {
          if (nodes[n] === item) {
            return n;
          }
        }
        return -1;
      }

      function onMove(e) {
        var from = dragIndexRef.current;
        if (from === null || from === undefined) {
          return;
        }
        var to = itemIndexFromPoint(e.clientX, e.clientY);
        if (to < 0 || to === from) {
          return;
        }
        var next = reorder(itemsRef.current, from, to);
        itemsRef.current = next;
        dragIndexRef.current = to;
        setItems(next);
        setDragIndex(to);
      }

      function onUp() {
        dragIndexRef.current = null;
        setDragIndex(null);
        win.removeEventListener('pointermove', onMove);
        win.removeEventListener('pointerup', onUp);
        win.removeEventListener('pointercancel', onUp);
      }

      win.addEventListener('pointermove', onMove);
      win.addEventListener('pointerup', onUp);
      win.addEventListener('pointercancel', onUp);
      return function () {
        win.removeEventListener('pointermove', onMove);
        win.removeEventListener('pointerup', onUp);
        win.removeEventListener('pointercancel', onUp);
      };
    }, [dragIndex, setItems]);

    function removeAt(i) {
      if (!allowRemove || items.length <= minItems) {
        return;
      }
      var next = items.slice();
      next.splice(i, 1);
      setItems(next);
      if (props.onAfterChange) {
        props.onAfterChange(next, i);
      }
    }

    return el(Fragment, {},
      el('div', {
        className: (props.className || '') + ' tda-sortable-list',
        style: props.style || undefined,
        ref: listRef,
      },
        items.map(function (item, i) {
          var itemClass = props.itemClass;
          if (typeof itemClass === 'function') {
            itemClass = itemClass(item, i);
          }
          return el(Tag, {
            key: i,
            className: 'tda-sortable-item tda-sortable-item--card ' + (itemClass || '')
              + (dragIndex === i ? ' is-dragging' : ''),
            onClick: props.onItemClick ? function () { props.onItemClick(i); } : undefined,
          },
            el('button', {
              type: 'button',
              className: 'tda-drag-handle',
              title: 'Drag to reorder',
              'aria-label': 'Drag to reorder',
              onPointerDown: function (e) {
                e.preventDefault();
                e.stopPropagation();
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                dragIndexRef.current = i;
                setDragIndex(i);
              },
            }, '⋮⋮'),
            allowRemove
              ? el('button', {
                  type: 'button',
                  className: 'tda-item-remove',
                  title: 'Delete item',
                  'aria-label': 'Delete item',
                  disabled: items.length <= minItems,
                  onClick: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    removeAt(i);
                  },
                }, '×')
              : null,
            props.renderItem(item, i)
          );
        })
      ),
      props.onAdd
        ? el('div', { className: 'tda-list-manage' },
            el(Button, {
              variant: 'primary',
              onClick: function (e) {
                e.preventDefault();
                e.stopPropagation();
                props.onAdd();
              },
            }, props.addLabel || '+ Add item')
          )
        : null
    );
  }

  function DraggableGallery(props) {
    var images = props.images || [];
    var setImages = props.setImages;
    var isSelected = props.isSelected;
    var dragState = useState(null);
    var dragIndex = dragState[0];
    var setDragIndex = dragState[1];
    var listRef = useRef(null);
    var dragIndexRef = useRef(null);
    var imagesRef = useRef(images);
    imagesRef.current = images;
    var minItems = props.minItems != null ? props.minItems : 0;
    var allowRemove = props.allowRemove !== false;

    useEffect(function () {
      if (dragIndex === null) {
        return undefined;
      }

      var root = listRef.current;
      var doc = root && root.ownerDocument ? root.ownerDocument : document;
      var win = doc.defaultView || window;

      function itemIndexFromPoint(clientX, clientY) {
        if (!root) {
          return -1;
        }
        var el = doc.elementFromPoint(clientX, clientY);
        if (!el || !el.closest) {
          return -1;
        }
        var item = el.closest('.tda-sortable-item');
        if (!item || !root.contains(item)) {
          return -1;
        }
        var nodes = root.querySelectorAll(':scope > .tda-sortable-item');
        for (var n = 0; n < nodes.length; n++) {
          if (nodes[n] === item) {
            return n;
          }
        }
        return -1;
      }

      function onMove(e) {
        var from = dragIndexRef.current;
        if (from === null || from === undefined) {
          return;
        }
        var to = itemIndexFromPoint(e.clientX, e.clientY);
        if (to < 0 || to === from) {
          return;
        }
        var next = reorder(imagesRef.current, from, to);
        imagesRef.current = next;
        dragIndexRef.current = to;
        setImages(next);
        setDragIndex(to);
      }

      function onUp() {
        dragIndexRef.current = null;
        setDragIndex(null);
        win.removeEventListener('pointermove', onMove);
        win.removeEventListener('pointerup', onUp);
        win.removeEventListener('pointercancel', onUp);
      }

      win.addEventListener('pointermove', onMove);
      win.addEventListener('pointerup', onUp);
      win.addEventListener('pointercancel', onUp);
      return function () {
        win.removeEventListener('pointermove', onMove);
        win.removeEventListener('pointerup', onUp);
        win.removeEventListener('pointercancel', onUp);
      };
    }, [dragIndex, setImages]);

    function removeAt(i) {
      if (!allowRemove || images.length <= minItems) {
        return;
      }
      var next = images.slice();
      next.splice(i, 1);
      setImages(next);
    }

    function addMedia(media) {
      if (!media) {
        return;
      }
      var list = Array.isArray(media) ? media : [media];
      var next = images.slice();
      list.forEach(function (m) {
        if (m && m.url) {
          next.push({ url: m.url, alt: m.alt || '', filter: 'none', overlay: 'none', fit: 'cover' });
        }
      });
      setImages(next);
    }

    return el(Fragment, {},
      el('div', {
        className: (props.gridClass || 'gallery-page-grid') + ' fade-in tda-sortable-gallery',
        style: props.style || undefined,
        ref: listRef,
      },
        images.map(function (img, i) {
          return el('div', {
            key: i,
            className: 'tda-sortable-item' + (dragIndex === i ? ' is-dragging' : ''),
          },
            el('button', {
              type: 'button',
              className: 'tda-drag-handle',
              title: 'Drag to reorder',
              'aria-label': 'Drag to reorder',
              onPointerDown: function (e) {
                e.preventDefault();
                e.stopPropagation();
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                dragIndexRef.current = i;
                setDragIndex(i);
              },
            }, '⋮⋮'),
            allowRemove
              ? el('button', {
                  type: 'button',
                  className: 'tda-item-remove',
                  title: 'Delete image',
                  'aria-label': 'Delete image',
                  disabled: images.length <= minItems,
                  onClick: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    removeAt(i);
                  },
                }, '×')
              : null,
            imageField(
              img.url,
              img.alt,
              function (media) {
                if (!media || !media.url) {
                  return;
                }
                var next = images.slice();
                next[i] = Object.assign({}, img, {
                  url: media.url,
                  alt: media.alt || img.alt || '',
                });
                setImages(next);
              },
              'tda-gallery-thumb',
              {
                active: !!isSelected,
                filter: img.filter || 'none',
                overlay: img.overlay || 'none',
                fit: img.fit || 'cover',
                onEffects: function (fx) {
                  var next = images.slice();
                  next[i] = Object.assign({}, img, fx);
                  setImages(next);
                },
              }
            )
          );
        })
      ),
      el('div', { className: 'tda-list-manage' },
        el(MediaUploadCheck, {},
          el(MediaUpload, {
            onSelect: addMedia,
            allowedTypes: ['image'],
            multiple: true,
            gallery: true,
            render: function (obj) {
              return el(Button, {
                variant: 'primary',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  obj.open();
                },
              }, props.addLabel || '+ Add image(s)');
            },
          })
        )
      )
    );
  }

  /* ---------- page-hero ---------- */
  registerTda('tierra-dacogida/page-hero', function (props) {
    var a = props.attributes;
    return previewWrap('page-hero',
      el(Fragment, {},
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Title'),
          typographyPanel(props, 'subtitle', 'Subtitle')
        ),
        el('div', { className: 'container' },
          el('nav', { className: 'breadcrumb' },
            el('span', {}, a.breadcrumbHome || 'Inicio'),
            el('span', { className: 'sep' }, '/'),
            richText('span', a.breadcrumbCurrent, function (v) { setAttr(props, 'breadcrumbCurrent', v); }, 'Page name')
          ),
          richText('h1', a.title, function (v) { setAttr(props, 'title', v); }, 'Page title', null, typographyStyle(a, 'title')),
          richText('p', a.subtitle, function (v) { setAttr(props, 'subtitle', v); }, 'Introduction', null, typographyStyle(a, 'subtitle'))
        )
      )
    );
  });

  /* ---------- hero-photo ---------- */
  registerTda('tierra-dacogida/hero-photo', function (props) {
    var a = props.attributes;
    var radius = a.imageRadius || 'none';
    var blur = a.imageBlur || 'none';
    var filter = a.imageFilter || 'none';
    var heroClass = 'hero-photo hero-photo--' + (a.variant || 'home')
      + ' ' + mediaClass(filter, a.imageOverlay || 'none', a.imageFit || 'cover', radius, blur);

    return previewWrap(heroClass,
      el(Fragment, {},
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Title'),
          el(PanelBody, { title: 'Button link' },
            el(TextControl, { label: 'Button URL', value: a.buttonUrl || '', onChange: function (v) { setAttr(props, 'buttonUrl', v); } })
          ),
          el(PanelBody, { title: 'Hero images', initialOpen: true },
            el(ToggleControl, {
              label: 'Use image slider (multiple images)',
              checked: (a.imageMode || 'single') === 'slider',
              onChange: function (v) {
                setAttr(props, 'imageMode', v ? 'slider' : 'single');
              },
            }),
            el('p', { style: { fontSize: '12px', opacity: 0.85 } },
              'Use Replace / Add images on the hero canvas. Toggle Single ↔ Slider in the image toolbar.')
          ),
          imageEffectsPanel(props)
        ),
        el(MediaAreaEdit, {
          attributes: a,
          setAttributes: props.setAttributes,
          isHero: true,
          active: props.isSelected,
          wrapClass: '',
        }),
        el('div', { className: 'hero-photo__overlay', 'aria-hidden': 'true' }),
        el('div', { className: 'container' },
          el('div', { className: 'hero-photo__content fade-in' },
            richText('h1', a.title, function (v) { setAttr(props, 'title', v); }, 'Hero title', null, typographyStyle(a, 'title')),
            richText('p', a.text, function (v) { setAttr(props, 'text', v); }, 'Hero text'),
            richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'Button text', 'btn btn--orange')
          )
        )
      )
    );
  });

  /* ---------- split-section ---------- */
  registerTda('tierra-dacogida/split-section', function (props) {
    var a = props.attributes;
    var splitClass = 'split fade-in' + (a.reverse ? ' split--reverse' : '');
    var headingValue = a.titleHtml || a.title || '';

    return previewWrap(a.sectionClass || 'section',
      el(Fragment, {},
        el(BlockControls, {},
          el(ToolbarGroup, {},
            el(ToolbarButton, {
              icon: 'image-flip-horizontal',
              label: 'Swap text and image positions',
              isPressed: !!a.reverse,
              onClick: function () { setAttr(props, 'reverse', !a.reverse); },
            }),
            el(ToolbarButton, {
              icon: 'align-pull-left',
              label: 'Text left / image right',
              isPressed: !a.reverse,
              onClick: function () { setAttr(props, 'reverse', false); },
            }),
            el(ToolbarButton, {
              icon: 'align-pull-right',
              label: 'Image left / text right',
              isPressed: !!a.reverse,
              onClick: function () { setAttr(props, 'reverse', true); },
            })
          )
        ),
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Heading'),
          imageEffectsPanel(props),
          el(PanelBody, { title: 'Layout' },
            el(ToggleControl, {
              label: 'Swap columns (image ↔ text)',
              checked: !!a.reverse,
              onChange: function (v) { setAttr(props, 'reverse', v); },
            }),
            el(ToggleControl, {
              label: 'Use image slider (multiple images)',
              checked: (a.imageMode || 'single') === 'slider',
              onChange: function (v) { setAttr(props, 'imageMode', v ? 'slider' : 'single'); },
            }),
            el(TextControl, { label: 'Image alt text', value: a.imageAlt || '', onChange: function (v) { setAttr(props, 'imageAlt', v); } }),
            el(TextControl, { label: 'Button URL', value: a.buttonUrl || '', onChange: function (v) { setAttr(props, 'buttonUrl', v); } })
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: splitClass },
            el('div', { className: 'split__content' },
              richText('span', a.label, function (v) { setAttr(props, 'label', v); }, 'Label', 'section__label'),
              el(RichText, {
                tagName: 'h2',
                value: headingValue,
                style: typographyStyle(a, 'title'),
                allowedFormats: RICH_FORMATS,
                onChange: function (v) {
                  if (a.titleHtml) {
                    props.setAttributes({ titleHtml: v, title: '' });
                  } else {
                    props.setAttributes({ title: v, titleHtml: '' });
                  }
                },
                placeholder: 'Heading',
              }),
              (a.paragraphs || []).map(function (p, i) {
                return el(RichText, {
                  key: i,
                  tagName: 'p',
                  value: p,
                  allowedFormats: RICH_FORMATS,
                  onChange: function (v) {
                    var next = (a.paragraphs || []).slice();
                    next[i] = v;
                    setAttr(props, 'paragraphs', next);
                  },
                });
              }),
              el(Button, {
                variant: 'link',
                onClick: function () { setAttr(props, 'paragraphs', (a.paragraphs || []).concat([''])); },
              }, 'Add paragraph'),
              editableList(props, 'listItems'),
              richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'Button text', 'btn btn--outline')
            ),
            el(MediaAreaEdit, {
              attributes: a,
              setAttributes: props.setAttributes,
              wrapClass: 'split__media',
              active: props.isSelected,
              isHero: false,
            })
          ),
          el('p', { className: 'tda-swap-hint' },
            a.reverse
              ? 'Layout: image on the left, text on the right. Use the toolbar flip icon to swap.'
              : 'Layout: text on the left, image on the right. Use the toolbar flip icon to swap.'
          )
        )
      )
    );
  });

  /* ---------- cards-section ---------- */
  registerTda('tierra-dacogida/cards-section', function (props) {
    var a = props.attributes;
    var cards = a.cards || [];
    var activeState = useState(0);
    var activeIdx = activeState[0];
    var setActiveIdx = activeState[1];
    var active = cards[activeIdx] || cards[0] || { title: '', text: '' };

    return previewWrap(a.sectionClass || 'section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Cards', initialOpen: true },
            columnsPerRowControl(props, 3),
            el('p', {}, 'Click a card to select it. Edit title and text on the card or below. Drag ⋮⋮ to reorder.'),
            el(Button, {
              variant: 'secondary',
              onClick: function () {
                var next = cards.concat([{ title: 'New card', text: 'Add your text here.' }]);
                setAttr(props, 'cards', next);
                setActiveIdx(next.length - 1);
              },
            }, 'Add card'),
            cards.length
              ? el(Button, {
                  variant: 'link',
                  isDestructive: true,
                  onClick: function () {
                    if (cards.length < 2) return;
                    var next = cards.slice();
                    next.splice(activeIdx, 1);
                    setAttr(props, 'cards', next);
                    setActiveIdx(Math.max(0, activeIdx - 1));
                  },
                }, 'Remove selected card')
              : null
          ),
          cards.length
            ? el(PanelBody, { title: 'Selected card (' + (activeIdx + 1) + ')', initialOpen: true },
                el(TextControl, {
                  label: 'Title',
                  value: active.title || '',
                  onChange: function (v) {
                    var next = cards.slice();
                    next[activeIdx] = Object.assign({}, active, { title: v });
                    setAttr(props, 'cards', next);
                  },
                }),
                el(TextControl, {
                  label: 'Text',
                  value: active.text || '',
                  onChange: function (v) {
                    var next = cards.slice();
                    next[activeIdx] = Object.assign({}, active, { text: v });
                    setAttr(props, 'cards', next);
                  },
                })
              )
            : null
        ),
        el('div', { className: 'container' },
          el('div', { className: a.headerClass || 'section__header fade-in' },
            richText('span', a.label, function (v) { setAttr(props, 'label', v); }, 'Label', 'section__label'),
            richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', 'section__title'),
            richText('p', a.subtitle, function (v) { setAttr(props, 'subtitle', v); }, 'Subtitle', 'section__subtitle')
          ),
          el(SortableList, {
            className: a.gridClass || 'services-grid',
            style: colsStyle(a.columnsPerRow, 3),
            items: cards,
            setItems: function (next) { setAttr(props, 'cards', next); },
            itemClass: function (card, i) {
              return (a.cardClass || 'activity-card fade-in') + (activeIdx === i ? ' is-active-card' : '');
            },
            onItemClick: function (i) { setActiveIdx(i); },
            onAfterChange: function (next) { setActiveIdx(Math.min(activeIdx, Math.max(0, next.length - 1))); },
            addLabel: '+ Add card',
            onAdd: function () {
              var next = cards.concat([{ title: 'New card', text: 'Add your text here.' }]);
              setAttr(props, 'cards', next);
              setActiveIdx(next.length - 1);
            },
            renderItem: function (card, i) {
              return el('div', { className: 'tda-card-edit' },
                el('div', { className: 'tda-card-edit__badge' }, 'Card ' + (i + 1)),
                richText('h4', card.title, function (v) {
                  var next = cards.slice();
                  next[i] = Object.assign({}, card, { title: v });
                  setAttr(props, 'cards', next);
                }, 'Card title'),
                richText('p', card.text, function (v) {
                  var next = cards.slice();
                  next[i] = Object.assign({}, card, { text: v });
                  setAttr(props, 'cards', next);
                }, 'Card text')
              );
            },
          })
        )
      )
    );
  });

  /* ---------- steps / stats / support (compact) ---------- */
  registerTda('tierra-dacogida/steps-section', function (props) {
    var a = props.attributes;
    var steps = a.steps || [];
    var activeState = useState(0);
    var activeIdx = activeState[0];
    var setActiveIdx = activeState[1];
    var active = steps[activeIdx] || { title: '', text: '' };

    return previewWrap(a.sectionClass || 'section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Steps', initialOpen: true },
            columnsPerRowControl(props, 2),
            el('p', {}, 'Click a step to select it. Edit on the card or in this panel. Drag ⋮⋮ to reorder.'),
            el(Button, {
              variant: 'secondary',
              onClick: function () {
                var next = steps.concat([{ title: 'New step', text: 'Describe this step.' }]);
                setAttr(props, 'steps', next);
                setActiveIdx(next.length - 1);
              },
            }, 'Add step'),
            steps.length > 1
              ? el(Button, {
                  variant: 'link',
                  isDestructive: true,
                  onClick: function () {
                    var next = steps.slice();
                    next.splice(activeIdx, 1);
                    setAttr(props, 'steps', next);
                    setActiveIdx(Math.max(0, activeIdx - 1));
                  },
                }, 'Remove selected step')
              : null
          ),
          steps.length
            ? el(PanelBody, { title: 'Selected step (' + (activeIdx + 1) + ')', initialOpen: true },
                el(TextControl, {
                  label: 'Title',
                  value: active.title || '',
                  onChange: function (v) {
                    var next = steps.slice();
                    next[activeIdx] = Object.assign({}, active, { title: v });
                    setAttr(props, 'steps', next);
                  },
                }),
                el(TextControl, {
                  label: 'Text',
                  value: active.text || '',
                  onChange: function (v) {
                    var next = steps.slice();
                    next[activeIdx] = Object.assign({}, active, { text: v });
                    setAttr(props, 'steps', next);
                  },
                })
              )
            : null
        ),
        el('div', { className: 'container' },
          el('div', { className: 'section__header fade-in' },
            richText('span', a.label, function (v) { setAttr(props, 'label', v); }, 'Label', 'section__label'),
            richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', 'section__title')
          ),
          el(SortableList, {
            className: a.gridClass || 'process-grid',
            style: colsStyle(a.columnsPerRow, 2),
            items: steps,
            setItems: function (next) { setAttr(props, 'steps', next); },
            itemClass: function (step, i) {
              return 'process-step fade-in' + (activeIdx === i ? ' is-active-card' : '');
            },
            onItemClick: function (i) { setActiveIdx(i); },
            onAfterChange: function (next) { setActiveIdx(Math.min(activeIdx, Math.max(0, next.length - 1))); },
            addLabel: '+ Add step',
            onAdd: function () {
              var next = steps.concat([{ title: 'New step', text: 'Describe this step.' }]);
              setAttr(props, 'steps', next);
              setActiveIdx(next.length - 1);
            },
            renderItem: function (step, i) {
              return el('div', { className: 'tda-card-edit' },
                el('div', { className: 'process-step__number' }, String(i + 1)),
                richText('h4', step.title, function (v) {
                  var next = steps.slice(); next[i] = Object.assign({}, step, { title: v }); setAttr(props, 'steps', next);
                }, 'Step title'),
                richText('p', step.text, function (v) {
                  var next = steps.slice(); next[i] = Object.assign({}, step, { text: v }); setAttr(props, 'steps', next);
                }, 'Step text')
              );
            },
          })
        )
      )
    );
  });

  registerTda('tierra-dacogida/stats-section', function (props) {
    var a = props.attributes;
    var stats = a.stats || [];
    return previewWrap('section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Stats', initialOpen: true },
            columnsPerRowControl(props, 3),
            el('p', {}, 'Use + Add stat below the row, or × on a card to delete. Drag ⋮⋮ to reorder.')
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: 'section-header section-header--center fade-in' },
            richText('h2', a.titleHtml, function (v) { setAttr(props, 'titleHtml', v); }, 'Section title')
          ),
          el(SortableList, {
            className: 'stats-row fade-in',
            style: colsStyle(a.columnsPerRow, 3),
            items: stats,
            setItems: function (next) { setAttr(props, 'stats', next); },
            itemClass: 'stat-card',
            addLabel: '+ Add stat',
            onAdd: function () {
              setAttr(props, 'stats', stats.concat([{ value: '0+', label: 'New label' }]));
            },
            renderItem: function (s, i) {
              return el(Fragment, {},
                richText('div', s.value, function (v) {
                  var next = stats.slice(); next[i] = Object.assign({}, s, { value: v }); setAttr(props, 'stats', next);
                }, '500+', 'stat-card__number'),
                richText('div', s.label, function (v) {
                  var next = stats.slice(); next[i] = Object.assign({}, s, { label: v }); setAttr(props, 'stats', next);
                }, 'Label', 'stat-card__label')
              );
            },
          })
        )
      )
    );
  });

  registerTda('tierra-dacogida/support-section', function (props) {
    var a = props.attributes;
    var items = a.items || [];
    var activeState = useState(0);
    var activeIdx = activeState[0];
    var setActiveIdx = activeState[1];
    var active = items[activeIdx] || { title: '', text: '' };

    return previewWrap('section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Support cards', initialOpen: true },
            columnsPerRowControl(props, 4),
            el('p', {}, 'Click a card to select it. Edit on the card or in this panel.'),
            el(Button, {
              variant: 'secondary',
              onClick: function () {
                var next = items.concat([{ title: 'New item', text: 'Describe this item.' }]);
                setAttr(props, 'items', next);
                setActiveIdx(next.length - 1);
              },
            }, 'Add card'),
            items.length > 1
              ? el(Button, {
                  variant: 'link',
                  isDestructive: true,
                  onClick: function () {
                    var next = items.slice();
                    next.splice(activeIdx, 1);
                    setAttr(props, 'items', next);
                    setActiveIdx(Math.max(0, activeIdx - 1));
                  },
                }, 'Remove selected card')
              : null
          ),
          items.length
            ? el(PanelBody, { title: 'Selected card (' + (activeIdx + 1) + ')', initialOpen: true },
                el(TextControl, {
                  label: 'Title',
                  value: active.title || '',
                  onChange: function (v) {
                    var next = items.slice();
                    next[activeIdx] = Object.assign({}, active, { title: v });
                    setAttr(props, 'items', next);
                  },
                }),
                el(TextControl, {
                  label: 'Text',
                  value: active.text || '',
                  onChange: function (v) {
                    var next = items.slice();
                    next[activeIdx] = Object.assign({}, active, { text: v });
                    setAttr(props, 'items', next);
                  },
                })
              )
            : null
        ),
        el('div', { className: 'container' },
          el('div', { className: 'section-header section-header--center fade-in' },
            richText('h2', a.titleHtml, function (v) { setAttr(props, 'titleHtml', v); }, 'Title'),
            richText('p', a.subtitle, function (v) { setAttr(props, 'subtitle', v); }, 'Subtitle')
          ),
          el(SortableList, {
            className: 'support-grid fade-in',
            style: colsStyle(a.columnsPerRow, 4),
            items: items,
            setItems: function (next) { setAttr(props, 'items', next); },
            itemClass: function (item, i) {
              return 'support-card' + (activeIdx === i ? ' is-active-card' : '');
            },
            onItemClick: function (i) { setActiveIdx(i); },
            onAfterChange: function (next) { setActiveIdx(Math.min(activeIdx, Math.max(0, next.length - 1))); },
            addLabel: '+ Add card',
            onAdd: function () {
              var next = items.concat([{ title: 'New item', text: 'Describe this item.' }]);
              setAttr(props, 'items', next);
              setActiveIdx(next.length - 1);
            },
            renderItem: function (item, i) {
              return el('div', { className: 'tda-card-edit' },
                el('div', { className: 'support-card__icon', 'aria-hidden': 'true' }, String(i + 1)),
                richText('h4', item.title, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { title: v }); setAttr(props, 'items', next);
                }, 'Title'),
                richText('p', item.text, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { text: v }); setAttr(props, 'items', next);
                }, 'Text')
              );
            },
          })
        )
      )
    );
  });

  /* ---------- programme-cards ---------- */
  registerTda('tierra-dacogida/programme-cards', function (props) {
    var a = props.attributes;
    var programmes = a.programmes || [];
    var activeImage = useState(0);
    var activeIdx = activeImage[0];
    var setActiveIdx = activeImage[1];

    return previewWrap('section',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Programme cards', initialOpen: true },
            el('p', {}, 'Drag ⋮⋮ to reorder. Use “Swap image / text” on each card to flip columns.'),
            el(Button, {
              variant: 'secondary',
              onClick: function () {
                var next = programmes.concat([{
                  title: 'New programme',
                  text: 'Describe this programme.',
                  meta: '',
                  imageUrl: '',
                  imageAlt: '',
                  images: [],
                  imageMode: 'single',
                  buttonText: 'Más información',
                  buttonUrl: '',
                  reverse: false,
                }]);
                setAttr(props, 'programmes', next);
                setActiveIdx(next.length - 1);
              },
            }, 'Add programme card'),
            programmes.length > 1
              ? el(Button, {
                  variant: 'link',
                  isDestructive: true,
                  onClick: function () {
                    var next = programmes.slice();
                    next.splice(activeIdx, 1);
                    setAttr(props, 'programmes', next);
                    setActiveIdx(Math.max(0, activeIdx - 1));
                  },
                }, 'Remove selected card')
              : null
          ),
          el(PanelBody, { title: 'Button links' },
            programmes.map(function (p, i) {
              return el(TextControl, {
                key: i,
                label: 'URL — ' + (p.title || ('Card ' + (i + 1))),
                value: p.buttonUrl || '',
                onChange: function (v) {
                  var next = programmes.slice();
                  next[i] = Object.assign({}, p, { buttonUrl: v });
                  setAttr(props, 'programmes', next);
                },
              });
            })
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: 'section-header fade-in' },
            richText('h2', a.titleHtml, function (v) { setAttr(props, 'titleHtml', v); }, 'Title'),
            richText('p', a.subtitle, function (v) { setAttr(props, 'subtitle', v); }, 'Subtitle')
          ),
          el(SortableList, {
            className: 'programme-list fade-in',
            tagName: 'div',
            items: programmes,
            setItems: function (next) { setAttr(props, 'programmes', next); },
            itemClass: function (p, i) {
              return 'programme-card'
                + (p.reverse ? ' programme-card--reverse' : '')
                + (activeIdx === i ? ' is-active-card' : '');
            },
            onItemClick: function (i) { setActiveIdx(i); },
            onAfterChange: function (next) { setActiveIdx(Math.min(activeIdx, Math.max(0, next.length - 1))); },
            addLabel: '+ Add programme card',
            onAdd: function () {
              var next = programmes.concat([{
                title: 'New programme',
                text: 'Describe this programme.',
                meta: '',
                imageUrl: '',
                imageAlt: '',
                images: [],
                imageMode: 'single',
                buttonText: 'Más información',
                buttonUrl: '',
                reverse: false,
              }]);
              setAttr(props, 'programmes', next);
              setActiveIdx(next.length - 1);
            },
            renderItem: function (p, i) {
              return el(Fragment, {},
                imageField(
                  p.imageUrl,
                  p.imageAlt,
                  function (media) {
                    if (!media || !media.url) return;
                    var next = programmes.slice();
                    next[i] = Object.assign({}, p, {
                      imageUrl: media.url,
                      imageAlt: media.alt || p.imageAlt || '',
                      images: [{ url: media.url, alt: media.alt || p.imageAlt || '' }],
                      imageMode: 'single',
                    });
                    setAttr(props, 'programmes', next);
                  },
                  'programme-card__img',
                  {
                    active: !!props.isSelected,
                    filter: p.filter || 'none',
                    overlay: p.overlay || 'none',
                    fit: p.fit || 'cover',
                    withSlider: true,
                    imageMode: p.imageMode || 'single',
                    images: (p.images && p.images.length)
                      ? p.images
                      : (p.imageUrl ? [{ url: p.imageUrl, alt: p.imageAlt || '' }] : []),
                    onMediaChange: function (patch) {
                      var next = programmes.slice();
                      next[i] = Object.assign({}, p, {
                        imageUrl: patch.imageUrl,
                        imageAlt: patch.imageAlt,
                        images: patch.images || [],
                        imageMode: patch.imageMode || 'single',
                      });
                      setAttr(props, 'programmes', next);
                    },
                    onEffects: function (fx) {
                      var next = programmes.slice();
                      next[i] = Object.assign({}, p, fx);
                      setAttr(props, 'programmes', next);
                    },
                  }
                ),
                el('div', { className: 'programme-card__body' },
                  el('div', { className: 'tda-card-layout-bar' },
                    el(Button, {
                      variant: 'secondary',
                      size: 'small',
                      icon: 'image-flip-horizontal',
                      onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var next = programmes.slice();
                        next[i] = Object.assign({}, p, { reverse: !p.reverse });
                        setAttr(props, 'programmes', next);
                        setActiveIdx(i);
                      },
                    }, p.reverse ? 'Text left / image right' : 'Swap image / text')
                  ),
                  richText('h3', p.title, function (v) {
                    var next = programmes.slice(); next[i] = Object.assign({}, p, { title: v }); setAttr(props, 'programmes', next);
                  }, 'Title'),
                  richText('p', p.text, function (v) {
                    var next = programmes.slice(); next[i] = Object.assign({}, p, { text: v }); setAttr(props, 'programmes', next);
                  }, 'Text'),
                  richText('div', p.meta, function (v) {
                    var next = programmes.slice(); next[i] = Object.assign({}, p, { meta: v }); setAttr(props, 'programmes', next);
                  }, 'Meta', 'programme-card__meta'),
                  richText('span', p.buttonText, function (v) {
                    var next = programmes.slice(); next[i] = Object.assign({}, p, { buttonText: v }); setAttr(props, 'programmes', next);
                  }, 'Button', 'btn btn--orange')
                )
              );
            },
          })
        )
      )
    );
  });

  /* ---------- feature-band ---------- */
  registerTda('tierra-dacogida/feature-band', function (props) {
    var a = props.attributes;
    return previewWrap('section',
      el(Fragment, {},
        el(BlockControls, {},
          el(ToolbarGroup, {},
            el(ToolbarButton, {
              icon: 'image-flip-horizontal',
              label: 'Swap image and text positions',
              isPressed: !!a.reverse,
              onClick: function () { setAttr(props, 'reverse', !a.reverse); },
            })
          )
        ),
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Title'),
          imageEffectsPanel(props),
          el(PanelBody, { title: 'Layout' },
            el(ToggleControl, {
              label: 'Swap columns (image ↔ text)',
              checked: !!a.reverse,
              onChange: function (v) { setAttr(props, 'reverse', v); },
            }),
            el(ToggleControl, {
              label: 'Use image slider (multiple images)',
              checked: (a.imageMode || 'single') === 'slider',
              onChange: function (v) { setAttr(props, 'imageMode', v ? 'slider' : 'single'); },
            })
          ),
          el(PanelBody, { title: 'Button' },
            el(TextControl, { label: 'Button URL', value: a.buttonUrl || '', onChange: function (v) { setAttr(props, 'buttonUrl', v); } })
          )
        ),
        el('div', { className: 'container fade-in' },
          el('div', { className: 'feature-band' + (a.reverse ? ' feature-band--reverse' : '') },
            el(MediaAreaEdit, {
              attributes: a,
              setAttributes: props.setAttributes,
              wrapClass: 'feature-band__img',
              active: props.isSelected,
              isHero: false,
            }),
            el('div', { className: 'feature-band__content' },
              el('p', { className: 'tda-swap-hint' },
                a.reverse
                  ? 'Layout: text on the left, image on the right.'
                  : 'Layout: image on the left, text on the right. Use the toolbar flip icon to swap.'
              ),
              richText('h3', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', null, typographyStyle(a, 'title')),
              richText('p', a.text, function (v) { setAttr(props, 'text', v); }, 'Text'),
              richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'Button', 'btn btn--white')
            )
          )
        )
      )
    );
  });

  /* ---------- service-cards ---------- */
  registerTda('tierra-dacogida/service-cards', function (props) {
    var a = props.attributes;
    var cards = a.cards || [];
    var activeImage = useState(0);
    var activeIdx = activeImage[0];
    var setActiveIdx = activeImage[1];

    return previewWrap(a.sectionClass || 'section',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Service cards', initialOpen: true },
            columnsPerRowControl(props, 3),
            el('p', {}, 'Use + Add card below, or × on a card to delete. Drag ⋮⋮ to reorder.')
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: 'section__header fade-in' },
            richText('span', a.label, function (v) { setAttr(props, 'label', v); }, 'Label', 'section__label'),
            richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', 'section__title')
          ),
          el(SortableList, {
            className: a.gridClass || 'services-grid',
            style: colsStyle(a.columnsPerRow, 3),
            items: cards,
            setItems: function (next) { setAttr(props, 'cards', next); },
            itemClass: function (card, i) {
              return 'service-card fade-in' + (activeIdx === i ? ' is-active-card' : '');
            },
            onItemClick: function (i) { setActiveIdx(i); },
            onAfterChange: function (next) { setActiveIdx(Math.min(activeIdx, Math.max(0, next.length - 1))); },
            addLabel: '+ Add service card',
            onAdd: function () {
              var next = cards.concat([{
                title: 'New service',
                text: 'Describe this service.',
                imageUrl: '',
                imageAlt: '',
                images: [],
                imageMode: 'single',
                items: [],
              }]);
              setAttr(props, 'cards', next);
              setActiveIdx(next.length - 1);
            },
            renderItem: function (card, i) {
              return el(Fragment, {},
                imageField(
                  card.imageUrl,
                  card.imageAlt,
                  function (media) {
                    if (!media || !media.url) return;
                    var next = cards.slice();
                    next[i] = Object.assign({}, card, {
                      imageUrl: media.url,
                      imageAlt: media.alt || card.imageAlt || '',
                      images: [{ url: media.url, alt: media.alt || card.imageAlt || '' }],
                      imageMode: 'single',
                    });
                    setAttr(props, 'cards', next);
                  },
                  'service-card__image',
                  {
                    active: !!props.isSelected,
                    filter: card.filter || 'none',
                    overlay: card.overlay || 'none',
                    fit: card.fit || 'cover',
                    withSlider: true,
                    imageMode: card.imageMode || 'single',
                    images: (card.images && card.images.length)
                      ? card.images
                      : (card.imageUrl ? [{ url: card.imageUrl, alt: card.imageAlt || '' }] : []),
                    onMediaChange: function (patch) {
                      var next = cards.slice();
                      next[i] = Object.assign({}, card, {
                        imageUrl: patch.imageUrl,
                        imageAlt: patch.imageAlt,
                        images: patch.images || [],
                        imageMode: patch.imageMode || 'single',
                      });
                      setAttr(props, 'cards', next);
                    },
                    onEffects: function (fx) {
                      var next = cards.slice();
                      next[i] = Object.assign({}, card, fx);
                      setAttr(props, 'cards', next);
                    },
                  }
                ),
                el('div', { className: 'service-card__body' },
                  richText('h3', card.title, function (v) {
                    var next = cards.slice(); next[i] = Object.assign({}, card, { title: v }); setAttr(props, 'cards', next);
                  }, 'Title'),
                  richText('p', card.text, function (v) {
                    var next = cards.slice(); next[i] = Object.assign({}, card, { text: v }); setAttr(props, 'cards', next);
                  }, 'Text')
                )
              );
            },
          })
        )
      )
    );
  });

  /* ---------- gallery-section (drag reorder) ---------- */
  registerTda('tierra-dacogida/gallery-section', function (props) {
    var a = props.attributes;
    return previewWrap(a.sectionClass || 'section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Gallery', initialOpen: true },
            el('div', { className: 'tda-media-area__mode', style: { marginBottom: '12px' } },
              el(Button, {
                variant: (a.imageMode || 'single') === 'single' ? 'primary' : 'secondary',
                onClick: function () { setAttr(props, 'imageMode', 'single'); },
              }, 'Single'),
              el(Button, {
                variant: (a.imageMode || 'single') === 'slider' ? 'primary' : 'secondary',
                onClick: function () { setAttr(props, 'imageMode', 'slider'); },
                style: { marginLeft: '8px' },
              }, 'Slider')
            ),
            el('p', { style: { fontSize: '12px', opacity: 0.75, marginTop: 0 } },
              (a.imageMode || 'single') === 'slider'
                ? 'Slider mode: front-end shows a carousel with prev/next controls.'
                : 'Single mode: grid layout. First batch loads immediately; Ver más loads more.'
            ),
            columnsPerRowControl(props, 4),
            (a.imageMode || 'single') === 'single'
              ? el(Fragment, {},
                  el(TextControl, {
                    label: 'Initially visible',
                    type: 'number',
                    value: a.initialVisible != null ? String(a.initialVisible) : '8',
                    onChange: function (v) {
                      var n = parseInt(v, 10);
                      setAttr(props, 'initialVisible', isNaN(n) || n < 1 ? 8 : n);
                    },
                  }),
                  el(TextControl, {
                    label: 'Load more step',
                    type: 'number',
                    value: a.loadMoreStep != null ? String(a.loadMoreStep) : '8',
                    onChange: function (v) {
                      var n = parseInt(v, 10);
                      setAttr(props, 'loadMoreStep', isNaN(n) || n < 1 ? 8 : n);
                    },
                  }),
                  el(TextControl, {
                    label: 'Load more label',
                    value: a.loadMoreText || 'Ver más',
                    onChange: function (v) { setAttr(props, 'loadMoreText', v); },
                  }),
                  el(TextControl, {
                    label: 'Load less label',
                    value: a.loadLessText || 'Ver menos',
                    onChange: function (v) { setAttr(props, 'loadLessText', v); },
                  })
                )
              : null,
            el('p', {}, 'Use + Add image(s) below the grid, or × on a tile to delete. Drag ⋮⋮ to reorder.')
          ),
          el(PanelBody, { title: 'Button' },
            el(TextControl, { label: 'Button URL', value: a.buttonUrl || '', onChange: function (v) { setAttr(props, 'buttonUrl', v); } })
          )
        ),
        el('div', { className: 'container' },
          richText('p', a.intro, function (v) { setAttr(props, 'intro', v); }, 'Intro'),
          richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title'),
          el(DraggableGallery, {
            images: a.images || [],
            gridClass: a.gridClass || 'gallery-page-grid',
            style: colsStyle(a.columnsPerRow, 4),
            isSelected: props.isSelected,
            setImages: function (next) { setAttr(props, 'images', next); },
            addLabel: '+ Add image(s)',
          }),
          richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'Button', 'btn btn--orange')
        )
      )
    );
  });

  /* ---------- gallery-strip ---------- */
  registerTda('tierra-dacogida/gallery-strip', function (props) {
    var a = props.attributes;
    return previewWrap(a.sectionClass || 'section',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Gallery strip', initialOpen: true },
            columnsPerRowControl(props, 4),
            el('p', {}, 'Add or delete images below. Drag ⋮⋮ to reorder.')
          )
        ),
        el('div', { className: 'container' },
          el(DraggableGallery, {
            images: a.images || [],
            gridClass: a.gridClass || 'gallery-grid',
            style: colsStyle(a.columnsPerRow, 4),
            isSelected: props.isSelected,
            setImages: function (next) { setAttr(props, 'images', next); },
            addLabel: '+ Add image(s)',
          })
        )
      )
    );
  });

  /* ---------- reviews / timeline / faq ---------- */
  registerTda('tierra-dacogida/reviews-section', function (props) {
    var a = props.attributes;
    var reviews = a.reviews || [];
    var label = a.label || 'Testimonio de participante';
    return previewWrap('section',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Reviews', initialOpen: true },
            el(TextControl, {
              label: 'Card label (shared)',
              value: label,
              onChange: function (v) { setAttr(props, 'label', v); },
            }),
            el('p', {}, 'Use + Add review below, or × on a card to delete.')
          )
        ),
        el('div', { className: 'container' },
          richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title'),
          el(SortableList, {
            className: 'reviews-row fade-in',
            items: reviews,
            setItems: function (next) { setAttr(props, 'reviews', next); },
            itemClass: 'review-card',
            addLabel: '+ Add review',
            onAdd: function () {
              setAttr(props, 'reviews', reviews.concat([{ text: 'Write a new testimonial…' }]));
            },
            renderItem: function (r, i) {
              return el(Fragment, {},
                el('span', { className: 'review-card__label' }, label),
                richText('p', r.text, function (v) {
                  var next = reviews.slice(); next[i] = Object.assign({}, r, { text: v }); setAttr(props, 'reviews', next);
                }, 'Review text')
              );
            },
          })
        )
      )
    );
  });

  registerTda('tierra-dacogida/timeline-section', function (props) {
    var a = props.attributes;
    var items = a.items || [];
    return previewWrap('section',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Timeline steps', initialOpen: true },
            el('p', {}, 'Use + Add step below, or × on a step to delete. Drag ⋮⋮ to reorder.')
          )
        ),
        el('div', { className: 'container' },
          richText('span', a.label, function (v) { setAttr(props, 'label', v); }, 'Label', 'section__label'),
          richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', 'section__title'),
          el(SortableList, {
            className: 'timeline fade-in',
            items: items,
            setItems: function (next) { setAttr(props, 'items', next); },
            itemClass: 'timeline-item',
            addLabel: '+ Add step',
            onAdd: function () {
              setAttr(props, 'items', items.concat([{ title: 'New step', text: 'Describe this step.' }]));
            },
            renderItem: function (item, i) {
              return el(Fragment, {},
                richText('h4', item.title, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { title: v }); setAttr(props, 'items', next);
                }, 'Title'),
                richText('p', item.text, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { text: v }); setAttr(props, 'items', next);
                }, 'Text')
              );
            },
          })
        )
      )
    );
  });

  registerTda('tierra-dacogida/faq-section', function (props) {
    var a = props.attributes;
    var items = a.items || [];
    return previewWrap(a.sectionClass || 'section section--soft',
      el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'FAQ items', initialOpen: true },
            el('p', {}, 'Use + Add question below, or × on an item to delete.')
          )
        ),
        el('div', { className: 'container' },
          richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', 'section__title'),
          el(SortableList, {
            className: 'faq-list fade-in',
            items: items,
            setItems: function (next) { setAttr(props, 'items', next); },
            itemClass: 'faq-item',
            addLabel: '+ Add question',
            onAdd: function () {
              setAttr(props, 'items', items.concat([{ question: 'New question?', answer: 'Answer…' }]));
            },
            renderItem: function (item, i) {
              return el(Fragment, {},
                richText('p', item.question, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { question: v }); setAttr(props, 'items', next);
                }, 'Question', 'faq-item__question'),
                richText('p', item.answer, function (v) {
                  var next = items.slice(); next[i] = Object.assign({}, item, { answer: v }); setAttr(props, 'items', next);
                }, 'Answer')
              );
            },
          })
        )
      )
    );
  });

  /* ---------- cta-banner ---------- */
  registerTda('tierra-dacogida/cta-banner', function (props) {
    var a = props.attributes;
    return previewWrap(a.sectionClass || 'section',
      el(Fragment, {},
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Title'),
          el(PanelBody, { title: 'Button link' },
            el(TextControl, { label: 'Button URL', value: a.buttonUrl || '', onChange: function (v) { setAttr(props, 'buttonUrl', v); } })
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: 'cta-banner fade-in' },
            (a.pill || props.isSelected)
              ? richText('span', a.pill, function (v) { setAttr(props, 'pill', v); }, 'Badge text (optional)', 'pill')
              : null,
            richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', null, typographyStyle(a, 'title')),
            richText('p', a.text, function (v) { setAttr(props, 'text', v); }, 'Text'),
            richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'Button text', a.buttonClass || 'btn btn--orange')
          )
        )
      )
    );
  });

  /* ---------- contact-info ---------- */
  function defaultContactFormFields() {
    var fromPhp = (typeof tdaBlockDefaults !== 'undefined' && tdaBlockDefaults
      && tdaBlockDefaults['tierra-dacogida/contact-info']
      && tdaBlockDefaults['tierra-dacogida/contact-info'].formFields);
    if (fromPhp && fromPhp.length) {
      return fromPhp.map(function (f) { return Object.assign({}, f); });
    }
    return [
      { id: 'nombre', type: 'text', label: 'Nombre', placeholder: 'Su nombre', width: 'half', required: true },
      { id: 'apellido', type: 'text', label: 'Apellido', placeholder: 'Su apellido', width: 'half', required: true },
      { id: 'organizacion', type: 'text', label: 'Nombre de la Organización', placeholder: 'Universidad...', width: 'full', required: false },
      { id: 'email', type: 'email', label: 'Correo Electrónico', placeholder: 'correo@ejemplo.com', width: 'full', required: true },
      { id: 'servicio', type: 'select', label: 'Servicio de interés', placeholder: 'Seleccione', width: 'full', required: false, options: [
        { value: 'programas', label: 'Programas de Movilidad' },
        { value: 'alojamiento', label: 'Alojamiento' },
        { value: 'actividades', label: 'Actividades' },
        { value: 'integral', label: 'Programa Integral' },
      ]},
      { id: 'asunto', type: 'text', label: 'Asunto', placeholder: 'Asunto', width: 'full', required: false },
      { id: 'mensaje', type: 'textarea', label: 'Su Mensaje', placeholder: 'Su mensaje...', width: 'full', required: true },
    ];
  }

  function getContactFormFields(attrs) {
    if (attrs.formFields && attrs.formFields.length) {
      return attrs.formFields;
    }
    return defaultContactFormFields();
  }

  function updateFormField(props, fields, index, patch) {
    var next = fields.map(function (f, i) {
      return i === index ? Object.assign({}, f, patch) : f;
    });
    setAttr(props, 'formFields', next);
  }

  function contactFormEditor(props) {
    var a = props.attributes;
    var fields = getContactFormFields(a);

    return el('div', { className: 'form tda-form-preview' },
      el(SortableList, {
        className: 'tda-form-fields',
        items: fields,
        setItems: function (next) { setAttr(props, 'formFields', next); },
        minItems: 1,
        addLabel: '+ Add field',
        onAdd: function () {
          setAttr(props, 'formFields', fields.concat([{
            id: 'campo_' + Date.now(),
            type: 'text',
            label: 'Nuevo campo',
            placeholder: '',
            width: 'full',
            required: false,
          }]));
        },
        itemClass: function (field) {
          return 'form__group form__group--' + (field.width === 'half' ? 'half' : 'full');
        },
        renderItem: function (field, i) {
          var type = field.type || 'text';
          return el(Fragment, {},
            el('div', { className: 'tda-form-field-meta' },
              el('button', {
                type: 'button',
                className: 'tda-form-width-toggle' + (field.width === 'half' ? ' is-half' : ''),
                title: field.width === 'half' ? 'Half width — click for full' : 'Full width — click for half',
                onClick: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  updateFormField(props, fields, i, {
                    width: field.width === 'half' ? 'full' : 'half',
                  });
                },
              }, field.width === 'half' ? '½' : '▭'),
              el('select', {
                className: 'tda-form-type-select',
                value: type,
                title: 'Field type',
                onChange: function (e) {
                  var nextType = e.target.value;
                  var patch = { type: nextType };
                  if (nextType === 'select' && (!field.options || !field.options.length)) {
                    patch.options = [
                      { value: 'programas', label: 'Programas de Movilidad' },
                      { value: 'alojamiento', label: 'Alojamiento' },
                      { value: 'actividades', label: 'Actividades' },
                      { value: 'integral', label: 'Programa Integral' },
                    ];
                    patch.placeholder = field.placeholder || 'Seleccione';
                  }
                  updateFormField(props, fields, i, patch);
                },
                onClick: function (e) { e.stopPropagation(); },
              },
                el('option', { value: 'text' }, 'Text'),
                el('option', { value: 'email' }, 'Email'),
                el('option', { value: 'select' }, 'Select'),
                el('option', { value: 'textarea' }, 'Textarea')
              )
            ),
            richText('label', field.label || '', function (v) {
              updateFormField(props, fields, i, { label: v });
            }, 'Label'),
            type === 'textarea'
              ? el('textarea', {
                  rows: 4,
                  value: '',
                  placeholder: field.placeholder || '',
                  readOnly: true,
                  tabIndex: -1,
                })
              : type === 'select'
                ? el('select', { disabled: true, tabIndex: -1 },
                    el('option', { value: '' }, field.placeholder || 'Seleccione')
                  )
                : el('input', {
                    type: type === 'email' ? 'email' : 'text',
                    value: '',
                    placeholder: field.placeholder || '',
                    readOnly: true,
                    tabIndex: -1,
                  }),
            el(TextControl, {
              label: 'Placeholder',
              value: field.placeholder || '',
              className: 'tda-form-placeholder-control',
              onChange: function (v) {
                updateFormField(props, fields, i, { placeholder: v });
              },
            })
          );
        },
      }),
      richText('span', a.formSubmitText || 'Enviar Formulario', function (v) {
        setAttr(props, 'formSubmitText', v);
      }, 'Submit', 'btn btn--peach'),
      el('p', { className: 'tda-form-preview-note' },
        'Drag ⋮⋮ to reorder. Toggle ½/▭ for half or full width. Edit labels and placeholders below each field.')
    );
  }

  registerTda('tierra-dacogida/contact-info', function (props) {
    var a = props.attributes;
    return previewWrap('section',
      el(Fragment, {},
        el(InspectorControls, {},
          typographyPanel(props, 'title', 'Title'),
          el(PanelBody, { title: 'Contact details', initialOpen: true },
            el(TextControl, { label: 'Phone', value: a.phone || '', onChange: function (v) { setAttr(props, 'phone', v); } }),
            el(TextControl, { label: 'Email', value: a.email || '', onChange: function (v) { setAttr(props, 'email', v); } }),
            el(TextControl, { label: 'WhatsApp number', value: a.whatsapp || '', onChange: function (v) { setAttr(props, 'whatsapp', v); } }),
            el(TextControl, { label: 'WhatsApp link text', value: a.whatsappText || '', onChange: function (v) { setAttr(props, 'whatsappText', v); } }),
            el(TextControl, { label: 'WhatsApp button text', value: a.buttonText || '', onChange: function (v) { setAttr(props, 'buttonText', v); } })
          ),
          el(PanelBody, { title: 'Social links', initialOpen: false },
            el(TextControl, { label: 'LinkedIn URL', value: a.linkedinUrl || '', onChange: function (v) { setAttr(props, 'linkedinUrl', v); } }),
            el(TextControl, { label: 'Facebook URL', value: a.facebookUrl || '', onChange: function (v) { setAttr(props, 'facebookUrl', v); } }),
            el(TextControl, { label: 'Instagram URL', value: a.instagramUrl || '', onChange: function (v) { setAttr(props, 'instagramUrl', v); } })
          ),
          el(PanelBody, { title: 'Form fields', initialOpen: false },
            el(TextControl, {
              label: 'Submit button text',
              value: a.formSubmitText || '',
              onChange: function (v) { setAttr(props, 'formSubmitText', v); },
            }),
            el('p', { style: { fontSize: '12px', opacity: 0.8 } },
              'Reorder fields, edit placeholders, and set half/full width on the form canvas.')
          )
        ),
        el('div', { className: 'container' },
          el('div', { className: 'contact-block fade-in' },
            el('div', { className: 'contact-block__info' },
              richText('span', a.pill, function (v) { setAttr(props, 'pill', v); }, 'Badge', 'pill'),
              richText('h2', a.title, function (v) { setAttr(props, 'title', v); }, 'Title', null, typographyStyle(a, 'title')),
              richText('p', a.intro, function (v) { setAttr(props, 'intro', v); }, 'Intro'),
              el('div', { className: 'contact-details' },
                el('div', { className: 'contact-details__item' },
                  richText('h4', a.phoneLabel || 'Teléfono', function (v) { setAttr(props, 'phoneLabel', v); }, 'Teléfono'),
                  richText('p', a.phone, function (v) { setAttr(props, 'phone', v); }, '+34 …')
                ),
                el('div', { className: 'contact-details__item' },
                  richText('h4', a.emailLabel || 'Correo Electrónico', function (v) { setAttr(props, 'emailLabel', v); }, 'Email'),
                  richText('p', a.email, function (v) { setAttr(props, 'email', v); }, 'info@…')
                ),
                el('div', { className: 'contact-details__item' },
                  richText('h4', a.whatsappLabel || 'WhatsApp', function (v) { setAttr(props, 'whatsappLabel', v); }, 'WhatsApp'),
                  richText('p', a.whatsappText || 'Enviar mensaje', function (v) { setAttr(props, 'whatsappText', v); }, 'Enviar mensaje')
                ),
                el('div', { className: 'contact-details__item' },
                  richText('h4', a.socialLabel || 'Redes Sociales', function (v) { setAttr(props, 'socialLabel', v); }, 'Social'),
                  el('div', { className: 'social-row' },
                    el('span', { 'aria-label': 'LinkedIn' }, 'in'),
                    el('span', { 'aria-label': 'Facebook' }, 'f'),
                    el('span', { 'aria-label': 'Instagram' }, 'ig')
                  )
                )
              ),
              el('div', { style: { marginTop: '1.5rem' } },
                richText('span', a.buttonText, function (v) { setAttr(props, 'buttonText', v); }, 'WhatsApp button', 'btn btn--outline')
              )
            ),
            el('div', { className: 'form-box' },
              contactFormEditor(props)
            )
          )
        )
      )
    );
  });
})(window.wp);
