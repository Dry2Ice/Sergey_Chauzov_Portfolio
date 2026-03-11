(() => {
  const themeKey = 'portfolio-theme';
  const langKey = 'portfolio-lang';
  const pageKey = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let currentLang = 'ru';

  const safeGet = (key, fallback) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // noop
    }
  };

  const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  };

  const translations = {
    common: {
      ru: {
        navProcess: 'Процесс',
        navServices: 'Услуги',
        navPricing: 'Пакеты',
        navContact: 'Контакты',
        skip: 'Перейти к контенту',
        langBtn: 'RU',
        langAria: 'Переключить язык',
        themeAria: 'Сменить тему'
      },
      en: {
        navProcess: 'Process',
        navServices: 'Services',
        navPricing: 'Pricing',
        navContact: 'Contact',
        skip: 'Skip to content',
        langBtn: 'EN',
        langAria: 'Switch language',
        themeAria: 'Switch theme'
      }
    },
    index: {
      ru: {
        heroBadge: 'Web Product Design • Development • SEO Engineering',
        heroTitle: 'Сайты, которые выглядят как премиальный бренд и работают как точная машина продаж',
        heroLead: 'Я создаю не просто «красивые страницы», а цифровые продукты с сильной визуальной драматургией, технической дисциплиной и продуманной SEO-архитектурой. Вы получаете прямую коммуникацию со мной, прозрачные этапы и измеримый бизнес-результат.',
        kpi1v: '24–72 часа',
        kpi1t: 'до первой рабочей итерации',
        kpi2v: '90+ Lighthouse',
        kpi2t: 'при корректной контент-стратегии',
        kpi3v: '1 окно связи',
        kpi3t: 'без менеджерской прослойки',
        ctaMain: 'Рассчитать бюджет проекта',
        ctaProcess: 'Посмотреть 6-фазный процесс',
        caseTitle: 'Флагманский кейс',
        caseLead: 'Кейс-формат: задача → стратегия → внедрение → цифры. Именно так строится доверие и обосновывается стоимость.',
        caseLinkLabel: 'Aplus Charisma — коммерческий сайт услуг',
        caseLinkCta: 'Открыть ↗',
        resultTitle: 'Что вы получаете в результате',
        phaseTitle: '6 фаз реализации',
        faqTitle: 'Ответы на главные вопросы',
        finalTitle: 'Готовы усилить ваш бренд и продажи через сайт?',
        finalLead: 'Следующий шаг — короткий бриф, определение целей и создание первой рабочей итерации в ближайшие дни.',
        finalCta1: 'Запустить проект',
        finalCta2: 'Связаться напрямую',
        footerLead: 'Independent Web Product Designer & Developer. Премиальные сайты с прозрачным процессом и упором на результат.'
      },
      en: {
        heroBadge: 'Cinematic Product Design • Engineering • SEO',
        heroTitle: 'Websites that look like premium brands and perform like precision sales machines',
        heroLead: 'I build not just beautiful pages, but digital products with cinematic visual direction, engineering discipline, and SEO-ready architecture. You get direct communication, transparent milestones, and measurable business outcomes.',
        kpi1v: '24–72 hours',
        kpi1t: 'to first working iteration',
        kpi2v: '90+ Lighthouse',
        kpi2t: 'with proper content strategy',
        kpi3v: '1 decision maker',
        kpi3t: 'no management layer in between',
        ctaMain: 'Calculate project budget',
        ctaProcess: 'View the 6-phase process',
        caseTitle: 'Flagship Case Study',
        caseLead: 'Structure: challenge → strategy → execution → measurable impact. This is how trust and pricing are justified.',
        caseLinkLabel: 'Aplus Charisma — commercial services website',
        caseLinkCta: 'Open ↗',
        resultTitle: 'What You Get',
        phaseTitle: '6 Delivery Phases',
        faqTitle: 'Key Questions Answered',
        finalTitle: 'Ready to elevate your brand and sales with a better website?',
        finalLead: 'Next step: a focused brief, clear priorities, and the first working iteration in days—not months.',
        finalCta1: 'Start project',
        finalCta2: 'Contact directly',
        footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    pageTitles: {
      'development.html': {
        ru: { id: 'devTitle', text: 'Прозрачный production-процесс: каждое решение привязано к KPI и бизнес-цели' },
        en: { id: 'devTitle', text: 'Transparent production workflow: every decision is tied to KPI and business goals' }
      },
      'services.html': {
        ru: { id: 'servicesTitle', text: 'Сервисная модель полного цикла: от позиционирования до стабильного потока лидов' },
        en: { id: 'servicesTitle', text: 'Full-cycle service model: from positioning to consistent lead generation' }
      },
      'pricing.html': {
        ru: { id: 'pricingTitle', text: 'Прозрачная стоимость: выбирайте формат проекта и получайте прогноз по срокам' },
        en: { id: 'pricingTitle', text: 'Transparent pricing: choose project format and get a realistic timeline estimate' }
      },
      'info.html': {
        ru: { id: 'infoTitle', text: 'Прямая коммуникация, прозрачные условия и поддержка после запуска' },
        en: { id: 'infoTitle', text: 'Direct communication, transparent terms, and support after launch' }
      }
    }
  };

  const applyTheme = (mode) => {
    document.body.classList.toggle('dark', mode === 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = mode === 'dark' ? '🌙' : '☀️';
  };

  const applyCommonLang = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);

    const dict = translations.common[lang] || translations.common.ru;
    const navProcess = document.querySelectorAll('a[href="development.html"]');
    const navServices = document.querySelectorAll('a[href="services.html"]');
    const navPricing = document.querySelectorAll('a[href="pricing.html"]');
    const navContact = document.querySelectorAll('a[href="info.html"]');

    navProcess.forEach((n) => { n.textContent = dict.navProcess; });
    navServices.forEach((n) => { n.textContent = dict.navServices; });
    navPricing.forEach((n) => { n.textContent = dict.navPricing; });
    navContact.forEach((n) => { n.textContent = dict.navContact; });

    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = dict.skip;

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.textContent = dict.langBtn;
      langBtn.setAttribute('aria-label', dict.langAria);
    }

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.setAttribute('aria-label', dict.themeAria);
  };

  const applyPageLang = (lang) => {
    if (pageKey === 'index.html') {
      const dict = translations.index[lang] || translations.index.ru;
      Object.entries(dict).forEach(([id, text]) => setText(id, text));
    }

    const pageTitle = translations.pageTitles[pageKey]?.[lang];
    if (pageTitle) setText(pageTitle.id, pageTitle.text);

    if (pageKey === 'pricing.html') {
      updateEstimate();
    }
  };

  const applyLang = (lang) => {
    applyCommonLang(lang);
    applyPageLang(lang);
  };

  const projectTypeOptions = document.querySelectorAll('input[name="projectType"]');
  const typeCards = document.querySelectorAll('.type-card');
  const addOns = document.querySelectorAll('.calc-addon');
  const estimateBreakdown = document.getElementById('estimateBreakdown');
  const pageCount = document.getElementById('pageCount');
  const pageCountOutput = document.getElementById('pageCountOutput');
  const deadline = document.getElementById('deadline');
  const deadlineOutput = document.getElementById('deadlineOutput');

  const formatCurrency = (value) => (currentLang === 'en'
    ? `$${Math.round(value / 95).toLocaleString('en-US')}`
    : `${Number(value).toLocaleString('ru-RU')} ₽`);

  const getBaseValue = () => Number(Array.from(projectTypeOptions).find((item) => item.checked)?.value || 0);

  function updateEstimate() {
    const estimateValue = document.getElementById('estimateValue');
    const estimateTimeline = document.getElementById('estimateTimeline');
    const complexityValue = document.getElementById('complexityValue');
    const complexityMeter = document.getElementById('complexityMeter');
    const estimateLabel = document.getElementById('estimateLabel');
    const timelineLabel = document.getElementById('timelineLabel');
    const complexityLabel = document.getElementById('complexityLabel');
    if (!estimateValue) return;

    const base = getBaseValue();
    const pages = pageCount ? Number(pageCount.value) : 6;
    const deadlineWeeks = deadline ? Number(deadline.value) : 5;
    const pageExtra = Math.max(0, pages - 5) * 1200;
    const addonsTotal = Array.from(addOns).filter((a) => a.checked).reduce((sum, item) => sum + Number(item.value), 0);
    const urgentMultiplier = deadlineWeeks <= 3 ? 1.25 : deadlineWeeks <= 5 ? 1.1 : 1;
    const total = Math.round((base + pageExtra + addonsTotal) * urgentMultiplier / 1000) * 1000;

    estimateValue.textContent = formatCurrency(total);
    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = `${deadlineWeeks} ${currentLang === 'en' ? 'weeks' : 'недель'}`;
    if (estimateTimeline) estimateTimeline.textContent = `${Math.max(2, Math.round(pages / 3))}–${Math.max(4, Math.round(pages / 2))} ${currentLang === 'en' ? 'weeks' : 'недель'}`;

    const complexity = Math.min(100, Math.round(base / 1500 + pages * 2 + addonsTotal / 1800));
    if (complexityValue) {
      if (currentLang === 'en') {
        complexityValue.textContent = complexity < 40 ? 'Basic' : complexity < 70 ? 'Medium' : 'High';
      } else {
        complexityValue.textContent = complexity < 40 ? 'Базовый' : complexity < 70 ? 'Средний' : 'Высокий';
      }
    }
    if (complexityMeter) complexityMeter.style.width = `${complexity}%`;

    if (estimateLabel && timelineLabel && complexityLabel) {
      estimateLabel.childNodes[0].textContent = currentLang === 'en' ? 'Total: ' : 'Итого: ';
      timelineLabel.childNodes[0].textContent = currentLang === 'en' ? 'Timeline: ' : 'Срок: ';
      complexityLabel.childNodes[0].textContent = currentLang === 'en' ? 'Complexity: ' : 'Сложность: ';
    }

    if (estimateBreakdown) {
      if (currentLang === 'en') {
        estimateBreakdown.innerHTML = `<li>Base: ${formatCurrency(base)}</li><li>Scale: ${formatCurrency(pageExtra)}</li><li>Add-ons: ${formatCurrency(addonsTotal)}</li>`;
      } else {
        estimateBreakdown.innerHTML = `<li>База: ${formatCurrency(base)}</li><li>Масштаб: ${formatCurrency(pageExtra)}</li><li>Опции: ${formatCurrency(addonsTotal)}</li>`;
      }
    }
  }

  applyTheme(safeGet(themeKey, 'light'));
  applyLang(safeGet(langKey, 'ru'));

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const mode = document.body.classList.contains('dark') ? 'light' : 'dark';
    safeSet(themeKey, mode);
    applyTheme(mode);
  });

  document.getElementById('langToggle')?.addEventListener('click', () => {
    const next = safeGet(langKey, 'ru') === 'ru' ? 'en' : 'ru';
    safeSet(langKey, next);
    applyLang(next);
  });

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
