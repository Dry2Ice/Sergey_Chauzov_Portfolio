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
  const designSegments = document.querySelectorAll('#designLevel .segment');
  let designMultiplier = 1;
  let designLabel = 'Стандарт';

  const formatRub = (value) => `${Number(value).toLocaleString('ru-RU')} ₽`;

  const getBaseValue = () => {
    if (projectType) return Number(projectType.value);
    const selected = Array.from(projectTypeOptions).find((item) => item.checked);
    return Number(selected?.value || 0);
  };

  const getProjectLabel = () => {
    if (projectType) return projectType.options[projectType.selectedIndex]?.textContent || 'Проект';
    const selected = Array.from(projectTypeOptions).find((item) => item.checked);
    return selected?.dataset.label || 'Проект';
  };

  const updateEstimate = () => {
    if (!estimateValue) return;

    const base = getBaseValue();
    const pages = pageCount ? Number(pageCount.value) : 6;
    const deadlineWeeks = deadline ? Number(deadline.value) : 5;
    const pageExtra = Math.max(0, pages - 5) * 1200;

    let addonsTotal = 0;
    const addonItems = [];
    addOns.forEach((addon) => {
      if (addon.checked) {
        const addonValue = Number(addon.value);
        addonsTotal += addonValue;
        addonItems.push(`${addon.dataset.label}: ${formatRub(addonValue)}`);
      }
    });

    const urgentMultiplier = deadlineWeeks <= 3 ? 1.25 : deadlineWeeks <= 5 ? 1.1 : 1;
    const subtotal = (base + pageExtra + addonsTotal) * designMultiplier;
    const total = Math.round(subtotal * urgentMultiplier / 1000) * 1000;

    estimateValue.textContent = formatRub(total);

    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = `${deadlineWeeks} ${deadlineWeeks < 5 ? 'недели' : 'недель'}`;

    const timelineMin = Math.max(2, Math.round((pages / 3) + addonItems.length / 2));
    const timelineMax = Math.max(timelineMin + 1, timelineMin + (deadlineWeeks <= 4 ? 0 : 2));
    if (estimateTimeline) estimateTimeline.textContent = `${timelineMin}–${timelineMax} недель`;

    const complexityScore = Math.min(100, Math.round((base / 1300) + pages * 1.8 + addonsTotal / 1800 + (designMultiplier - 1) * 32 + (urgentMultiplier - 1) * 40));
    const complexityText = complexityScore < 38 ? 'Базовый' : complexityScore < 68 ? 'Средний' : 'Высокий';

    if (complexityValue) complexityValue.textContent = `${complexityText} (${complexityScore}/100)`;
    if (complexityMeter) complexityMeter.style.width = `${complexityScore}%`;

    if (estimateBreakdown) {
      const breakdown = [
        `Тип проекта «${getProjectLabel()}»: ${formatRub(base)}`,
        `Масштаб (${pages} стр.): ${formatRub(pageExtra)}`,
        `Уровень дизайна (${designLabel}): ×${designMultiplier}`,
        `Надбавка за срок: ×${urgentMultiplier}`,
      ];
      estimateBreakdown.innerHTML = '';
      [...breakdown, ...addonItems].forEach((line) => {
        const li = document.createElement('li');
        li.textContent = line;
        estimateBreakdown.appendChild(li);
      });
      if (!addonItems.length) {
        const li = document.createElement('li');
        li.textContent = 'Доп. опции пока не выбраны';
        estimateBreakdown.appendChild(li);
      }
    }
  };

  if ((projectType || projectTypeOptions.length) && estimateValue) {
    projectType?.addEventListener('change', updateEstimate);
    projectTypeOptions.forEach((option) => {
      option.addEventListener('change', () => {
        typeCards.forEach((card) => {
          const input = card.querySelector('input');
          card.classList.toggle('active', Boolean(input?.checked));
        });
        updateEstimate();
      });
    });
    addOns.forEach((addon) => addon.addEventListener('change', updateEstimate));
    pageCount?.addEventListener('input', updateEstimate);
    deadline?.addEventListener('input', updateEstimate);

    designSegments.forEach((segment) => {
      segment.addEventListener('click', () => {
        designSegments.forEach((item) => item.classList.remove('active'));
        segment.classList.add('active');
        designMultiplier = Number(segment.dataset.multiplier || '1');
        designLabel = segment.dataset.label || 'Стандарт';
        updateEstimate();
      });
    });

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
