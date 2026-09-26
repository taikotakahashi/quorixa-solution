document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.form[data-validate]');
  forms.forEach(form => form.addEventListener('submit', handleSubmit));
});

function handleSubmit(e) {
  const form = e.target;
  let valid = true;

  form.querySelectorAll('.form__group').forEach(group => {
    group.classList.remove('error');
  });

  form.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form__group');
    if (!field.value.trim()) {
      group.classList.add('error');
      valid = false;
    }

    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        group.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    e.preventDefault();
    return;
  }

  // WordPress contact form — allow native POST to admin-post.php
  if (form.querySelector('input[name="action"][value="tda_contact"]')) {
    return;
  }

  e.preventDefault();
  const success = form.querySelector('.form__success');
  if (success) {
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }
}
