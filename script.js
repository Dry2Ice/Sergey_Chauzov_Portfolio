(() => {
  const themeKey = 'portfolio-theme';
  const langKey = 'portfolio-lang';
  const pageKey = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

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
  const initLogoTransition = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const logos = Array.from(document.querySelectorAll('.site-logo-transition'));
    logos.forEach((logo, index) => {
      if (!(logo instanceof HTMLElement)) return;
      logo.style.viewTransitionName = !reduced && index === 0 ? 'site-logo' : 'none';
    });
  };


  const dictionaries = {
    common: {
      ru: {
        navProcess: 'Процесс', navServices: 'Услуги', navPricing: 'Пакеты', navContact: 'Контакты',
        skip: 'Перейти к контенту', langBtn: 'RU', langAria: 'Переключить язык', themeAria: 'Сменить тему',
        footerSectionsTitle: 'Разделы', footerContactTitle: 'Контакты'
      },
      en: {
        navProcess: 'Process', navServices: 'Services', navPricing: 'Pricing', navContact: 'Contact',
        skip: 'Skip to content', langBtn: 'EN', langAria: 'Switch language', themeAria: 'Switch theme',
        footerSectionsTitle: 'Sections', footerContactTitle: 'Contact'
      }
    },
    index: {
      ru: {
        heroBadge: 'Разработка сайтов • Доработка • Исправление ошибок',
        heroTitle: 'Создаю сайты с нуля, усиливаю действующие проекты и быстро исправляю критичные ошибки',
        heroLead: 'Помогаю бизнесу запускать и развивать сайты без лишней бюрократии: продумываю структуру, собираю интерфейс и логику, подключаю интеграции, ускоряю загрузку и довожу проект до стабильной работы. Вы общаетесь напрямую с исполнителем и на каждом этапе понимаете, что делается и зачем.',
        ctaMain: 'Рассчитать стоимость', ctaProcess: 'Как проходит работа',
        heroPanelTitle: 'Что получите на практике',
        heroCheck1: 'Первый рабочий результат или точечные правки — обычно в пределах 24–72 часов.', heroCheck2: 'Один исполнитель на весь цикл: интерфейс, логика, интеграции и устранение проблем.', heroCheck3: 'Понятные ориентиры по срокам, приоритетам, скорости сайта и заявкам.',
        kpi1v: '24–72 часа', kpi1t: 'до первой рабочей итерации', kpi2v: '90+ Lighthouse', kpi2t: 'при корректной контент-стратегии',
        kpi3v: 'Прямой контакт', kpi3t: 'без менеджеров и потерь в коммуникации', kpi4v: '6 этапов', kpi4t: 'от задачи до запуска и дальнейшего развития',
        workTitle: 'С какими задачами обращаются чаще всего',
        workCard1Tag: 'Новый проект', workCard1Title: 'Запуск сайта с нуля', workCard1Text: 'Лендинги, сайты услуг и корпоративные проекты с понятной структурой, сильной подачей и аккуратной технической основой.',
        workCard2Tag: 'Развитие', workCard2Title: 'Доработка действующего сайта', workCard2Text: 'Навожу порядок в интерфейсе, ускоряю загрузку, усиливаю SEO-структуру и помогаю сайту работать на заявки, а не просто существовать.',
        workCard3Tag: 'Срочные задачи', workCard3Title: 'Исправление ошибок и поломок', workCard3Text: 'Восстанавливаю вёрстку, формы, скрипты, интеграции и другие нестабильные участки, чтобы сайт снова работал предсказуемо.',
        caseTitle: 'Показательный кейс', caseLead: 'Здесь не абстрактная картинка, а реальный проект: задача, решение, внедрение и итоговый результат. Так проще оценить мой подход и уровень ответственности.', caseLinkLabel: 'Aplus Charisma — сайт услуг с коммерческим фокусом', caseLinkCta: 'Посмотреть ↗',
        resultTitle: 'Что будет в итоге',
        resultLi1: 'Одного исполнителя, который отвечает за интерфейс, логику, интеграции и техническую стабильность сайта.', resultLi2: 'Чистую техническую базу: семантическую вёрстку, аккуратный код и подготовку под SEO и schema.org.',
        resultLi3: 'Оптимизацию скорости и устранение узких мест, чтобы сайт загружался быстрее и не ломался в критичных местах.', resultLi4: 'Структуру, которую удобно развивать дальше: добавлять разделы, контент, функции и новые сценарии.',
        marqueeTitle: 'Стек и подход', marqueeLead: 'В работе объединяю дизайн, инженерную точность и здравый взгляд на бизнес-задачу — без лишнего шума и модных слов ради слов.',
        finalTitle: 'Нужно запустить сайт, доработать текущий или быстро закрыть проблемы?', finalLead: 'Опишите задачу в двух-трёх сообщениях — в ответ вы получите понятный план работ, ориентир по срокам и следующий шаг без лишней воды.',
        finalCta1: 'Обсудить проект', finalCta2: 'Написать напрямую', footerLead: 'Разрабатываю сайты под ключ, улучшаю действующие проекты и исправляю ошибки — с вниманием к скорости, SEO и заявкам.'
      },
      en: {
        heroBadge: 'Cinematic Product Design • Engineering • SEO',
        heroTitle: 'Websites that feel like art and perform like systematic sales engines',
        heroLead: 'I craft digital products with cinematic direction, engineering discipline, and robust SEO architecture. You get emotional impact, measurable business metrics, and direct communication without intermediaries.',
        ctaMain: 'Calculate project budget', ctaProcess: 'View the 6-phase process',
        heroPanelTitle: 'Execution Intelligence',
        heroCheck1: 'First working version in 24–72 hours.', heroCheck2: 'Scalable architecture for growth and multilingual expansion.', heroCheck3: 'KPI framework: speed, conversion, and lead quality.',
        kpi1v: '24–72 hours', kpi1t: 'to first working iteration', kpi2v: '90+ Lighthouse', kpi2t: 'with proper content strategy',
        kpi3v: '1 communication window', kpi3t: 'no management layer', kpi4v: '6 phases', kpi4t: 'from strategy to launch and growth',
        workTitle: 'Core directions where a website drives business impact',
        workCard1Tag: 'Services', workCard1Title: 'Commercial service websites', workCard1Text: 'Lead-focused structure: offer, proof, CTA flow, funnel logic, and analytics.',
        workCard2Tag: 'Brand', workCard2Title: 'Premium brand platforms', workCard2Text: 'High-end aesthetics with fast performance and technical clarity.',
        workCard3Tag: 'Scale', workCard3Title: 'Scalable product websites', workCard3Text: 'Modular page system ready for SEO clusters, case studies, and new markets.',
        caseTitle: 'Flagship Case Study', caseLead: 'Format: challenge → strategy → execution → metrics. This is the foundation of trust and pricing logic.', caseLinkLabel: 'Aplus Charisma — commercial services website', caseLinkCta: 'Open ↗',
        resultTitle: 'What You Get',
        resultLi1: 'Premium visual quality with clear hierarchy and conversion-oriented CTA flow.', resultLi2: 'Semantic HTML foundation with SEO readiness and schema.org preparation.',
        resultLi3: 'Performance optimization so design never harms conversion or indexing.', resultLi4: 'Scalable structure for case studies, content, and multilingual growth.',
        marqueeTitle: 'Stack & standards', marqueeLead: 'The approach is inspired by digital execution patterns of market-leading brands.',
        finalTitle: 'Ready to make your website a growth engine?', finalLead: 'Next step: a focused brief, KPI alignment, and the first working version within days.',
        finalCta1: 'Start project', finalCta2: 'Contact directly', footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    pricing: {
      ru: {
        pricingBadge: 'Понятная стоимость без тумана', pricingTitle: 'Форматы работы и калькулятор стоимости',
        pricingLead: 'Здесь можно быстро понять порядок бюджета: выберите тип проекта, задайте объём и получите ориентир по стоимости, сроку и сложности.',
        priceStart1: 'Лендинг или аккуратный старт', priceStart2: 'Основа структуры и SEO', priceStart3: 'Релиз обычно за 2–4 недели',
        priceGrowth1: 'Сайт услуг или корпоративный сайт', priceGrowth2: 'Подключение аналитики и событий', priceGrowth3: 'Развитие проекта по этапам',
        priceScale1: 'Сложная логика и интеграции', priceScale2: 'Кастомные модули и сценарии', priceScale3: 'Поддержка и SLA-подход',
        calcTitle: 'Продвинутый калькулятор бюджета', calcLead: 'Настройте параметры так, как это происходит на первом брифе: объём работ, желаемый срок, уровень дизайна, SEO и дополнительные задачи. Калькулятор покажет ориентир по стоимости, сроку, сложности и составу сметы.',
        calcPagesLabel: 'Количество страниц', calcDeadlineLabel: 'Желаемый дедлайн', calcDesignLabel: 'Уровень дизайна', calcSeoLabel: 'SEO-пакет', pricingCta: 'Запросить расчёт',
        optTitle: 'Как сократить бюджет без потери результата',
        optLi1: 'Сначала запустить рабочую версию на ключевые сценарии, а расширение заложить отдельным этапом.', optLi2: 'В первую очередь собрать страницы, которые влияют на заявки и продажи, а затем наращивать контент.',
        optLi3: 'Собирать интерфейс на единой системе компонентов, а не править каждый блок вручную.', optLi4: 'Подготовить тексты и материалы заранее — это заметно сокращает сроки и число переделок.',
        footerLead: 'Разрабатываю сайты под ключ, улучшаю действующие проекты и исправляю ошибки — с вниманием к скорости, SEO и заявкам.'
      },
      en: {
        pricingBadge: 'Transparent Pricing Model', pricingTitle: 'Three project scales + advanced smart estimator',
        pricingLead: 'Choose project scale and configure pre-sale parameters: design depth, SEO package, integrations, and deadline.',
        priceStart1: 'Landing page / MVP', priceStart2: 'Basic SEO structure', priceStart3: 'Launch in 2–4 weeks',
        priceGrowth1: 'Services / corporate website', priceGrowth2: 'Analytics + events', priceGrowth3: 'Phased growth',
        priceScale1: 'Complex scenarios and integrations', priceScale2: 'Custom modules', priceScale3: 'Support and SLA',
        calcTitle: 'Advanced Budget Estimator', calcLead: 'Configure your project like a real pre-sale call: scope, speed, design depth, SEO, and integrations.',
        calcPagesLabel: 'Number of pages', calcDeadlineLabel: 'Desired deadline', calcDesignLabel: 'Visual production level', calcSeoLabel: 'SEO package', pricingCta: 'Discuss project',
        optTitle: 'How to optimize budget without sacrificing quality',
        optLi1: 'Launch MVP for key scenarios and scale through sprints.', optLi2: 'Implement core pages and lead generation first, then expand content.',
        optLi3: 'Use one design system instead of chaotic block-by-block edits.', optLi4: 'Approve content early to accelerate release significantly.',
        footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    services: {
      ru: {
        servicesBadge: 'Чем могу помочь', servicesTitle: 'Услуги по сайту: от структуры и дизайна до запуска и развития',
        servicesLead: 'Каждое направление работы связано с практическим результатом: сайт должен быть понятным, быстрым, убедительным и удобным в развитии после запуска.',
        srv1Li1: 'Позиционирование, оффер и логика подачи.', srv1Li2: 'Структура страниц и понятный контент-каркас.', srv1Li3: 'Приоритеты по KPI и сценариям пользователя.',
        srv2Li1: 'Интерфейс, который выглядит цельно и удобно работает на любом устройстве.', srv2Li2: 'Семантическая разработка, формы и нужные интеграции.', srv2Li3: 'Квизы, калькуляторы, формы и другие сценарии захвата заявки.',
        srv3Li1: 'Метаданные, Open Graph и базовая SEO-разметка.', srv3Li2: 'Скорость загрузки, Core Web Vitals и техническая чистота.', srv3Li3: 'Аналитика, воронка и развитие сайта после релиза.',
        fitTitle: 'Кому подойдёт такой формат', fitLi1: 'Экспертам и компаниям, которым нужен не просто сайт, а рабочий инструмент для заявок и доверия.', fitLi2: 'B2B-командам, которым важны структура, масштабируемость и сильная техническая база.', fitLi3: 'Брендам, которые хотят выглядеть убедительно и продавать дороже за счёт качества подачи.',
        notFitTitle: 'Когда лучше выбрать другой путь', notFitLi1: 'Если нужен максимально быстрый шаблонный сайт без погружения в задачу.', notFitLi2: 'Если главный критерий — самая низкая цена, а не результат, качество и потенциал роста.', notFitLi3: 'Если у команды нет возможности участвовать в согласованиях и принимать решения по ходу проекта.',
        footerLead: 'Разрабатываю сайты под ключ, улучшаю действующие проекты и исправляю ошибки — с вниманием к скорости, SEO и заявкам.'
      },
      en: {
        servicesBadge: 'Capability Stack', servicesTitle: 'Full cycle: strategy, design, development, SEO, and post-launch growth',
        servicesLead: 'Every service is outcome-driven: more leads, stronger trust, sharper positioning, and transparent project control.',
        srv1Li1: 'Positioning and value messaging.', srv1Li2: 'Page architecture and content framework.', srv1Li3: 'KPI map and customer journey model.',
        srv2Li1: 'Premium UI with responsive design system.', srv2Li2: 'Semantic development and integrations.', srv2Li3: 'Forms, quizzes, estimators, and CTA mechanics.',
        srv3Li1: 'Metadata, Open Graph, and schema.org.', srv3Li2: 'Core Web Vitals and render performance.', srv3Li3: 'Analytics, funnel insights, and post-launch iterations.',
        fitTitle: 'Who this format is perfect for', fitLi1: 'Experts and studios who need a visually strong and conversion-ready website.', fitLi2: 'B2B teams that need structure, scalability, and a solid SEO foundation.', fitLi3: 'Brands that want to sell at a higher value through premium presentation and trust.',
        notFitTitle: 'When to choose a different path', notFitLi1: 'If you need a quick template website without strategy or analytics.', notFitLi2: 'If lowest price matters more than quality, speed, and scalability.', notFitLi3: 'If your team is not ready for regular approvals and KPI-based process.',
        footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    development: {
      ru: {
        devBadge: 'Как строится работа', devTitle: 'Понятный процесс работы над сайтом: от погружения до запуска',
        devLead: 'Работа разбита на понятные этапы: на каждом из них видно, что сделано, что согласовано и что идёт дальше. Без хаоса и постоянного ощущения неопределённости.',
        devP1Title: '1. Погружение', devP1Text: 'Разбираюсь в продукте, аудитории, конкурентах и целях проекта. На выходе — ясная отправная точка и список приоритетов.',
        devP2Title: '2. Структура и UX', devP2Text: 'Собираю логику страниц, маршрут пользователя, блоки доверия и будущий каркас контента.',
        devP3Title: '3. Визуальное направление', devP3Text: 'Определяю визуальный язык проекта: композицию, типографику, компоненты и правила поведения интерфейса.',
        devP4Title: '4. Разработка', devP4Text: 'Собираю сайт, подключаю формы и интеграции, настраиваю адаптивность, производительность и нужные сценарии.',
        devP5Title: '5. SEO и запуск', devP5Text: 'Готовлю метаданные и техническое SEO, провожу проверку качества, подключаю аналитику и вывожу проект в релиз.',
        devQualityTitle: 'Как контролируется качество',
        devQualityLi1: 'После каждого этапа фиксируем решения, чтобы проект не расползался и не терял фокус.',
        devQualityLi2: 'Ключевые страницы проверяются и по технике, и по удобству использования ещё до релиза.',
        devQualityLi3: 'После запуска собираем наблюдения и гипотезы, чтобы сайт можно было развивать осмысленно, а не наугад.',
        footerLead: 'Разрабатываю сайты под ключ, улучшаю действующие проекты и исправляю ошибки — с вниманием к скорости, SEO и заявкам.'
      },
      en: {
        devBadge: 'Execution System', devTitle: 'Transparent production workflow with KPI-level discipline',
        devLead: 'Each phase ends with a concrete artifact: clear result, clear next step, and quality control without chaos.',
        devP1Title: '1. Discovery', devP1Text: 'Market, audience, competitors, content risks, and KPI audit. Output: strategic brief.',
        devP2Title: '2. IA & UX', devP2Text: 'User scenarios, page structure, content map, and trust points.',
        devP3Title: '3. Visual Direction', devP3Text: 'Premium visual system, UI components, typography, and motion principles.',
        devP4Title: '4. Development', devP4Text: 'Semantic build, forms, integrations, animation, performance, and responsiveness.',
        devP5Title: '5. SEO & Launch', devP5Text: 'Metadata, schema, QA, analytics setup, launch, and a 90-day growth backlog.',
        devQualityTitle: 'Quality control in every phase',
        devQualityLi1: 'Every phase includes demo, decision log, and short protocol.',
        devQualityLi2: 'All key pages pass technical and UX validation before release.',
        devQualityLi3: 'Post-launch growth hypotheses are built on real data.',
        footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    info: {
      ru: {
        infoBadge: 'Связь и условия', infoTitle: 'Прямая связь, понятные условия и спокойный рабочий процесс',
        infoLegal: 'Работаю как самозанятый. При необходимости предоставляю договор, чек и закрывающие документы.',
        infoModelTitle: 'Как строится сотрудничество', infoModelLi1: 'До старта фиксируем объём работ, приоритеты и ориентир по срокам.', infoModelLi2: 'Двигаемся по этапам, чтобы у вас всегда было понимание результата и следующего шага.', infoModelLi3: 'После релиза можно продолжить развитие проекта без потери контекста.',
        infoNeedTitle: 'Что понадобится от вас', infoNeedLi1: 'Коротко описать продукт, аудиторию и текущую задачу.', infoNeedLi2: 'Подсветить, что важнее всего: заявки, имидж, SEO, скорость или автоматизация.', infoNeedLi3: 'Быть на связи для 1–2 коротких согласований в неделю.',
        infoNextTitle: 'Что дальше', infoNextText: 'Напишите в Telegram или на почту. В течение 24 часов я отвечу, задам уточняющие вопросы и предложу понятный следующий шаг по проекту.',
        footerLead: 'Разрабатываю сайты под ключ, улучшаю действующие проекты и исправляю ошибки — с вниманием к скорости, SEO и заявкам.'
      },
      en: {
        infoBadge: 'Trust & Communication', infoTitle: 'Direct communication, transparent terms, and support after launch',
        infoLegal: 'Status: self-employed. Contract, receipt, and closing documents are available on request.',
        infoModelTitle: 'Collaboration Model', infoModelLi1: 'Scope, timeline, and KPI are fixed before project start.', infoModelLi2: 'Phase-based acceptance with clear deliverables.', infoModelLi3: 'Support and iterative improvements after release.',
        infoNeedTitle: 'What I need from you', infoNeedLi1: 'A brief on your product and audience.', infoNeedLi2: 'Priorities: leads, brand image, SEO, and automation.', infoNeedLi3: 'Availability for 1–2 approval sessions per week.',
        infoNextTitle: 'Next step', infoNextText: 'Message me on Telegram or email. You will receive the launch structure, required source materials, and timeline estimate within 24 hours.',
        footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    }
  };

  const applyTheme = (mode) => {
    document.body.classList.toggle('dark', mode === 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = mode === 'dark' ? '🌙' : '☀️';
  };

  const applyCommonLang = (lang) => {
    const dict = dictionaries.common[lang] || dictionaries.common.ru;
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);

    document.querySelectorAll('a[href="development.html"]').forEach((n) => { n.textContent = dict.navProcess; });
    document.querySelectorAll('a[href="services.html"]').forEach((n) => { n.textContent = dict.navServices; });
    document.querySelectorAll('a[href="pricing.html"]').forEach((n) => { n.textContent = dict.navPricing; });
    document.querySelectorAll('a[href="info.html"]').forEach((n) => { n.textContent = dict.navContact; });

    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = dict.skip;

    setText('footerSectionsTitle', dict.footerSectionsTitle);
    setText('footerContactTitle', dict.footerContactTitle);

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.textContent = dict.langBtn;
      langBtn.setAttribute('aria-label', dict.langAria);
    }

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.setAttribute('aria-label', dict.themeAria);
  };

  const applyPageLang = (lang) => {
    const pageName = pageKey.replace('.html', '');
    const pageDict = dictionaries[pageName]?.[lang] || dictionaries[pageName]?.ru;
    if (!pageDict) return;
    Object.entries(pageDict).forEach(([id, text]) => setText(id, text));
    if (pageKey === 'pricing.html') updateEstimate(lang);
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
  const designLevel = document.getElementById('designLevel');
  const seoPack = document.getElementById('seoPack');

  const formatCurrency = (value, lang) => (lang === 'en'
    ? `$${Math.round(value / 95).toLocaleString('en-US')}`
    : `${Number(value).toLocaleString('ru-RU')} ₽`);

  const getBaseValue = () => Number(Array.from(projectTypeOptions).find((item) => item.checked)?.value || 0);

  function animateEstimateValue(node, from, to, lang) {
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || Math.abs(to - from) < 1000) {
      node.textContent = formatCurrency(to, lang);
      return;
    }
    const start = performance.now();
    const duration = 420;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - ((1 - p) ** 3);
      const val = Math.round(from + (to - from) * eased);
      node.textContent = formatCurrency(val, lang);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function updateEstimate(lang = safeGet(langKey, 'ru')) {
    const estimateValue = document.getElementById('estimateValue');
    const estimateTimeline = document.getElementById('estimateTimeline');
    const complexityValue = document.getElementById('complexityValue');
    const complexityMeter = document.getElementById('complexityMeter');
    const estimateLabel = document.getElementById('estimateLabel');
    const timelineLabel = document.getElementById('timelineLabel');
    const complexityLabel = document.getElementById('complexityLabel');
    if (!estimateValue) return;

    const formatWeeks = (min, max) => (min === max
      ? `${max} ${lang === 'en' ? 'weeks' : 'недель'}`
      : `${min}–${max} ${lang === 'en' ? 'weeks' : 'недель'}`);

    const base = getBaseValue();
    const pages = pageCount ? Number(pageCount.value) : 6;
    const deadlinePreference = deadline ? Number(deadline.value) : 2;
    const designCost = Number(designLevel?.value || 0);
    const seoCost = Number(seoPack?.value || 0);
    const pageExtra = Math.max(0, pages - 5) * 1500;
    const addonsTotal = Array.from(addOns).filter((a) => a.checked).reduce((sum, item) => sum + Number(item.value), 0);
    const baseMinTimeline = Math.max(2, Math.round(pages / 4) + (designCost > 0 ? 1 : 0));
    const baseMaxTimeline = Math.max(baseMinTimeline + 1, Math.round(pages / 2) + (addonsTotal > 15000 ? 2 : 1));
    const deadlineExtension = Math.round(deadlinePreference * 0.8);
    const minTimeline = baseMinTimeline + deadlineExtension;
    const maxTimeline = baseMaxTimeline + deadlineExtension;
    const urgency = deadlinePreference <= 0 ? 1.35 : deadlinePreference <= 1 ? 1.18 : deadlinePreference <= 2 ? 1.08 : Math.max(0.88, 1 - ((deadlinePreference - 2) * 0.025));
    const subtotal = base + pageExtra + designCost + seoCost + addonsTotal;
    const total = Math.round(subtotal * urgency / 1000) * 1000;

    const prev = Number((estimateValue.dataset.value || '0'));
    estimateValue.dataset.value = String(total);
    animateEstimateValue(estimateValue, prev, total, lang);
    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = formatWeeks(minTimeline, maxTimeline);
    if (estimateTimeline) estimateTimeline.textContent = formatWeeks(minTimeline, maxTimeline);

    const complexity = Math.min(100, Math.max(10, Math.round(base / 1800 + pages * 1.8 + addonsTotal / 1600 + designCost / 1200 + seoCost / 1600 - deadlinePreference * 3.2)));
    if (complexityValue) complexityValue.textContent = lang === 'en'
      ? (complexity < 40 ? 'Basic' : complexity < 70 ? 'Medium' : 'High')
      : (complexity < 40 ? 'Базовый' : complexity < 70 ? 'Средний' : 'Высокий');
    if (complexityMeter) complexityMeter.style.width = `${complexity}%`;

    if (estimateLabel && timelineLabel && complexityLabel) {
      estimateLabel.childNodes[0].textContent = lang === 'en' ? 'Total: ' : 'Итого: ';
      timelineLabel.childNodes[0].textContent = lang === 'en' ? 'Timeline: ' : 'Срок: ';
      complexityLabel.childNodes[0].textContent = lang === 'en' ? 'Complexity: ' : 'Сложность: ';
    }

    if (estimateBreakdown) {
      estimateBreakdown.innerHTML = lang === 'en'
        ? `<li>Base package: ${formatCurrency(base, lang)}</li><li>Page scaling: ${formatCurrency(pageExtra, lang)}</li><li>Design level: ${formatCurrency(designCost, lang)}</li><li>SEO package: ${formatCurrency(seoCost, lang)}</li><li>Add-ons: ${formatCurrency(addonsTotal, lang)}</li><li>Urgency factor: x${urgency.toFixed(2)}</li>`
        : `<li>База проекта: ${formatCurrency(base, lang)}</li><li>Доплата за объём: ${formatCurrency(pageExtra, lang)}</li><li>Выбранный уровень дизайна: ${formatCurrency(designCost, lang)}</li><li>SEO-пакет: ${formatCurrency(seoCost, lang)}</li><li>Дополнительные опции: ${formatCurrency(addonsTotal, lang)}</li><li>Коэффициент срочности: x${urgency.toFixed(2)}</li>`;
    }
  }

  initLogoTransition();
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
  addOns.forEach((addon) => addon.addEventListener('change', () => updateEstimate()));
  pageCount?.addEventListener('input', () => updateEstimate());
  deadline?.addEventListener('input', () => updateEstimate());
  designLevel?.addEventListener('change', () => updateEstimate());
  seoPack?.addEventListener('change', () => updateEstimate());
  updateEstimate();

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

  const initMotionSystem = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, ratio))}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    if (reduced || window.matchMedia('(max-width: 980px)').matches) return;

    document.querySelectorAll('.card, .kpi').forEach((item) => {
      item.addEventListener('mousemove', (e) => {
        const r = item.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        item.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });

    const heroBrand = document.querySelector('.hero-brandmark');
    if (heroBrand) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        heroBrand.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }, { passive: true });
    }
  };

  initMotionSystem();
})();

// ===== BURGER MENU =====
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (burgerBtn && mobileNav) {
  const focusableSelector = 'a[href], button:not([disabled])';
  const getFocusableItems = () => Array.from(mobileNav.querySelectorAll(focusableSelector));
  let lastFocusedElement = null;

  const syncMenuState = (isOpen) => {
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  };

  const openMenu = () => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : burgerBtn;
    syncMenuState(true);
    requestAnimationFrame(() => {
      mobileNavClose?.focus();
    });
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    syncMenuState(false);
    if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu({ restoreFocus: false });
      burgerBtn.focus();
      return;
    }
    openMenu();
  });

  mobileNavClose?.addEventListener('click', () => closeMenu());

  mobileNav.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('[data-menu-close]') || target.closest('a')) {
      closeMenu({ restoreFocus: false });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (burgerBtn.getAttribute('aria-expanded') !== 'true') return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key !== 'Tab') return;

    const items = getFocusableItems();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: false });
    }
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
    if (link.closest('.mobile-nav')) {
      link.setAttribute('aria-current', 'page');
    }
  }
});

// ===== COPYRIGHT YEAR =====
const yearEl = document.getElementById('copyrightYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
