(() => {
  const key = 'portfolio-theme';
  const saved = localStorage.getItem(key);
  if (saved === 'dark') document.body.classList.add('dark');

  const button = document.getElementById('themeToggle');
  if (button) {
    button.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem(key, mode);
    });
  }

  const roleButtons = document.querySelectorAll('.role-btn');
  const rolePanels = document.querySelectorAll('.role-panel');
  roleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      roleButtons.forEach((item) => {
        const active = item.dataset.role === role;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });

      rolePanels.forEach((panel) => {
        const active = panel.dataset.panel === role;
        panel.classList.toggle('active', active);
        panel.hidden = !active;
      });
    });
  });

  const faqQuestions = document.querySelectorAll('.faq-q');
  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      if (!answer) return;
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });

  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  const scenarioPanels = document.querySelectorAll('.scenario-panel');
  scenarioButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;
      scenarioButtons.forEach((item) => {
        item.classList.toggle('active', item.dataset.scenario === scenario);
      });
      scenarioPanels.forEach((panel) => {
        const isCurrent = panel.dataset.scenarioPanel === scenario;
        panel.classList.toggle('active', isCurrent);
        panel.hidden = !isCurrent;
      });
    });
  });

  const projectType = document.getElementById('projectType');
  const addOns = document.querySelectorAll('.calc-addon');
  const estimateValue = document.getElementById('estimateValue');
  const formatRub = (value) => `${Number(value).toLocaleString('ru-RU')} ₽`;

  const updateEstimate = () => {
    if (!projectType || !estimateValue) return;
    let total = Number(projectType.value);
    addOns.forEach((addon) => {
      if (addon.checked) total += Number(addon.value);
    });
    estimateValue.textContent = formatRub(total);
  };

  if (projectType && estimateValue) {
    projectType.addEventListener('change', updateEstimate);
    addOns.forEach((addon) => addon.addEventListener('change', updateEstimate));
    updateEstimate();
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.counter);
        const duration = 900;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const value = target * progress;
          const hasDecimal = String(target).includes('.');
          const suffix = el.textContent.includes('%') ? '%' : el.textContent.includes('x') ? 'x' : el.textContent.includes('+') ? '+' : el.textContent.includes('ч') ? ' ч' : '';
          el.textContent = `${hasDecimal ? value.toFixed(1) : Math.round(value)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }
})();
