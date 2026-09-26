/**
 * Tierra D'Acogida — light / dark theme
 */
const Theme = {
  storageKey: 'tda-theme',
  defaultTheme: 'dark',

  get() {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'light' || stored === 'dark' ? stored : this.defaultTheme;
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    this.updateAria();
  },

  toggle() {
    this.apply(this.get() === 'dark' ? 'light' : 'dark');
  },

  updateAria() {
    const isDark = this.get() === 'dark';
    const ariaKey = isDark ? 'theme.switchToLight' : 'theme.switchToDark';

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      if (typeof I18N !== 'undefined') {
        const label = I18N.t(ariaKey);
        if (label) btn.setAttribute('aria-label', label);
      }
    });
  },

  init() {
    this.apply(this.get());
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Theme.init());
