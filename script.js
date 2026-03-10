(() => {
  const themeKey = 'portfolio-theme';
  const langKey = 'portfolio-lang';

  const applyTheme = (mode) => {
    document.body.classList.toggle('dark', mode === 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = mode === 'dark' ? '🌙' : '☀️';
  };

  const applyLang = (lang) => {
    document.documentElement.lang = lang;
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang.toUpperCase();
  };

  applyTheme(localStorage.getItem(themeKey) || 'light');
  applyLang(localStorage.getItem(langKey) || 'ru');

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const mode = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem(themeKey, mode);
    applyTheme(mode);
  });

  document.getElementById('langToggle')?.addEventListener('click', () => {
    const current = (localStorage.getItem(langKey) || 'ru') === 'ru' ? 'en' : 'ru';
    localStorage.setItem(langKey, current);
    applyLang(current);
  });

  const projectTypeOptions = document.querySelectorAll('input[name="projectType"]');
  const typeCards = document.querySelectorAll('.type-card');
  const addOns = document.querySelectorAll('.calc-addon');
  const estimateValue = document.getElementById('estimateValue');
  const estimateTimeline = document.getElementById('estimateTimeline');
  const complexityValue = document.getElementById('complexityValue');
  const complexityMeter = document.getElementById('complexityMeter');
  const estimateBreakdown = document.getElementById('estimateBreakdown');
  const pageCount = document.getElementById('pageCount');
  const pageCountOutput = document.getElementById('pageCountOutput');
  const deadline = document.getElementById('deadline');
  const deadlineOutput = document.getElementById('deadlineOutput');

  const formatRub = (value) => `${Number(value).toLocaleString('ru-RU')} ₽`;
  const getBaseValue = () => Number(Array.from(projectTypeOptions).find((item) => item.checked)?.value || 0);

  const updateEstimate = () => {
    if (!estimateValue) return;
    const base = getBaseValue();
    const pages = pageCount ? Number(pageCount.value) : 6;
    const deadlineWeeks = deadline ? Number(deadline.value) : 5;
    const pageExtra = Math.max(0, pages - 5) * 1200;
    const addonsTotal = Array.from(addOns).filter((a) => a.checked).reduce((sum, item) => sum + Number(item.value), 0);
    const urgentMultiplier = deadlineWeeks <= 3 ? 1.25 : deadlineWeeks <= 5 ? 1.1 : 1;
    const total = Math.round((base + pageExtra + addonsTotal) * urgentMultiplier / 1000) * 1000;

    estimateValue.textContent = formatRub(total);
    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = `${deadlineWeeks} недель`;
    if (estimateTimeline) estimateTimeline.textContent = `${Math.max(2, Math.round(pages / 3))}–${Math.max(4, Math.round(pages / 2))} недель`;

    const complexity = Math.min(100, Math.round(base / 1500 + pages * 2 + addonsTotal / 1800));
    if (complexityValue) complexityValue.textContent = complexity < 40 ? 'Базовый' : complexity < 70 ? 'Средний' : 'Высокий';
    if (complexityMeter) complexityMeter.style.width = `${complexity}%`;
    if (estimateBreakdown) estimateBreakdown.innerHTML = `<li>База: ${formatRub(base)}</li><li>Масштаб: ${formatRub(pageExtra)}</li><li>Опции: ${formatRub(addonsTotal)}</li>`;
  };

  projectTypeOptions.forEach((option) => option.addEventListener('change', () => {
    typeCards.forEach((card) => card.classList.toggle('active', Boolean(card.querySelector('input')?.checked)));
    updateEstimate();
  }));
  addOns.forEach((addon) => addon.addEventListener('change', updateEstimate));
  pageCount?.addEventListener('input', updateEstimate);
  deadline?.addEventListener('input', updateEstimate);
  updateEstimate();

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
})();
