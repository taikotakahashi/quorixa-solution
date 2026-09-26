document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.form[data-validate]');
  forms.forEach(form => form.addEventListener('submit', handleSubmit));
});

function handleSubmit(e) {
  e.preventDefault();
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

  if (!valid) return;

  const success = form.querySelector('.form__success');
  if (success) {
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }
}
