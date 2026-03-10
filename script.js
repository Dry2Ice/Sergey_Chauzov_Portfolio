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

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const cinematicHero = document.querySelector('.cinematic-hero');
  if (cinematicHero) {
    cinematicHero.addEventListener('mousemove', (event) => {
      const rect = cinematicHero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cinematicHero.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
    });

    cinematicHero.addEventListener('mouseleave', () => {
      cinematicHero.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }
})();
