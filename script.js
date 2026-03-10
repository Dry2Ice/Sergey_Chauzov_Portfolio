(() => {
  const key = 'portfolio-theme';
  const saved = localStorage.getItem(key);
  if (saved === 'dark') document.body.classList.add('dark');

  const button = document.getElementById('themeToggle');
  if (!button) return;

  button.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(key, mode);
  });
})();
