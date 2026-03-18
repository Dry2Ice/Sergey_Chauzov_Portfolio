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
        heroBadge: 'Fullstack-разработка сайтов • Улучшение • Исправление ошибок',
        heroTitle: 'Я — Сергей Чаузов, fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие и исправляю ошибки',
        heroLead: 'Я разрабатываю сайты под ключ: собираю интерфейсы и серверную логику, ускоряю работу проекта, исправляю ошибки, усиливаю SEO и довожу сайт до стабильного результата. Вы получаете одного технического исполнителя без посредников.',
        ctaMain: 'Рассчитать бюджет проекта', ctaProcess: 'Посмотреть 6-фазный процесс',
        heroPanelTitle: 'Что вы получаете',
        heroCheck1: 'Первая рабочая версия или точечные правки за 24–72 часа.', heroCheck2: 'Доработку интерфейса, логики, интеграций и исправление ошибок в одном цикле.', heroCheck3: 'Понятные KPI: скорость, конверсия, заявки и техническая стабильность.',
        kpi1v: '24–72 часа', kpi1t: 'до первой рабочей итерации', kpi2v: '90+ Lighthouse', kpi2t: 'при корректной контент-стратегии',
        kpi3v: '1 окно связи', kpi3t: 'без менеджерской прослойки', kpi4v: '6 фаз', kpi4t: 'от задачи до запуска и улучшений',
        workTitle: 'Основные задачи, с которыми ко мне приходят',
        workCard1Tag: 'Создание', workCard1Title: 'Новые сайты с нуля', workCard1Text: 'Лендинги, корпоративные сайты и спецпроекты с продуманной структурой и чистой fullstack-разработкой.',
        workCard2Tag: 'Улучшение', workCard2Title: 'Доработка текущих сайтов', workCard2Text: 'Ускорение, переработка интерфейсов, усиление SEO-структуры и рост конверсии без хаоса.',
        workCard3Tag: 'Исправление', workCard3Title: 'Исправление ошибок и сбоев', workCard3Text: 'Верстка, скрипты, формы, интеграции и нестабильные части сайта приводятся в рабочее состояние.',
        caseTitle: 'Флагманский кейс', caseLead: 'Формат кейса: задача → стратегия → внедрение → цифры. Это помогает быстро понять подход к разработке и уровень ответственности.', caseLinkLabel: 'Aplus Charisma — коммерческий сайт услуг', caseLinkCta: 'Открыть ↗',
        resultTitle: 'Что вы получаете в результате',
        resultLi1: 'Одного fullstack-исполнителя для интерфейса, серверной логики, интеграций и исправления ошибок.', resultLi2: 'Семантически корректный HTML, технически чистый код и SEO-базу с подготовкой к schema.org.',
        resultLi3: 'Оптимизацию скорости и устранение узких мест, чтобы сайт работал стабильно и без сбоев.', resultLi4: 'Структуру, удобную для дальнейших доработок, масштабирования и новых разделов.',
        marqueeTitle: 'Профессиональный стек', marqueeLead: 'Подход строится на сильной разработке, чистой архитектуре и работе с бизнес-метриками.',
        finalTitle: 'Нужно создать сайт, доработать текущий или исправить ошибки?', finalLead: 'Опишите задачу — я предложу понятный план работ, сроки и приоритеты по запуску или доработке.',
        finalCta1: 'Запустить проект', finalCta2: 'Связаться напрямую', footerLead: 'Fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие сайты и исправляю ошибки с фокусом на скорость, SEO и конверсию.'
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
        pricingBadge: 'Прозрачная модель стоимости', pricingTitle: 'Три формата работы + продвинутый калькулятор бюджета',
        pricingLead: 'Выберите формат: новый сайт, доработка или исправление ошибок. Настройте параметры и получите ориентир по стоимости, сроку и сложности.',
        priceStart1: 'Лендинг / минимальный запуск', priceStart2: 'Базовая SEO-структура', priceStart3: 'Запуск за 2–4 недели',
        priceGrowth1: 'Сайт услуг / корпоративный сайт', priceGrowth2: 'Аналитика и события', priceGrowth3: 'Рост по этапам',
        priceScale1: 'Сложные сценарии и интеграции', priceScale2: 'Кастомные модули', priceScale3: 'Поддержка и SLA',
        calcTitle: 'Продвинутый калькулятор бюджета', calcLead: 'Настройте проект как на реальном предварительном расчете: объём, скорость, уровень дизайна, SEO и интеграции.',
        calcPagesLabel: 'Количество страниц', calcDeadlineLabel: 'Желаемый дедлайн', calcDesignLabel: 'Уровень визуального продакшена', calcSeoLabel: 'Пакет SEO', pricingCta: 'Обсудить проект',
        optTitle: 'Как оптимизировать бюджет без потери качества',
        optLi1: 'Запустить минимальную рабочую версию на ключевые сценарии и масштабировать проект по этапам.', optLi2: 'Сначала внедрить основные страницы и лидогенерацию, затем расширять контент.',
        optLi3: 'Использовать единую дизайн-систему вместо хаотичных правок по блокам.', optLi4: 'Согласовывать контент заранее — это заметно ускоряет релиз.',
        footerLead: 'Fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие сайты и исправляю ошибки с фокусом на скорость, SEO и конверсию.'
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
        servicesBadge: 'Чем я могу помочь', servicesTitle: 'Fullstack-подход: создание сайтов, доработка, исправление ошибок и развитие',
        servicesLead: 'Каждая услуга ориентирована на бизнес-результат: больше заявок, выше доверие, сильнее позиционирование и прозрачная управляемость проекта.',
        srv1Li1: 'Позиционирование и ценностное сообщение.', srv1Li2: 'Архитектура страниц и контент-каркас.', srv1Li3: 'KPI и карта клиентского пути.',
        srv2Li1: 'Понятный интерфейс с адаптивной системой.', srv2Li2: 'Семантическая разработка и интеграции.', srv2Li3: 'Формы, квизы, калькуляторы и сценарии действия.',
        srv3Li1: 'Метаданные, Open Graph и schema.org.', srv3Li2: 'Core Web Vitals и скорость рендеринга.', srv3Li3: 'Аналитика, воронка и доработки после запуска.',
        fitTitle: 'Кому подойдёт такой формат', fitLi1: 'Экспертам и компаниям, которым нужен сильный сайт и надёжная fullstack-разработка.', fitLi2: 'B2B-командам, которым важны структура, масштабируемость и SEO-фундамент.', fitLi3: 'Брендам, которые хотят продавать дороже за счёт уровня подачи и доверия.',
        notFitTitle: 'Когда лучше выбрать другой путь', notFitLi1: 'Если нужен быстрый шаблонный сайт без стратегии и аналитики.', notFitLi2: 'Если приоритет — минимальная цена, а не качество, скорость и масштаб.', notFitLi3: 'Если команда не готова к регулярным согласованиям и работе по KPI.',
        footerLead: 'Fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие сайты и исправляю ошибки с фокусом на скорость, SEO и конверсию.'
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
        devBadge: 'Система работы', devTitle: 'Прозрачный процесс разработки, доработки и исправления ошибок с жёсткой связкой к KPI',
        devLead: 'Каждая фаза завершается конкретным результатом: вы видите прогресс, понимаете следующий шаг и контролируете качество без хаоса.',
        devP1Title: '1. Погружение', devP1Text: 'Анализ ниши, аудитории, конкурентов, контент-рисков и KPI. На выходе — стратегический бриф.',
        devP2Title: '2. Структура и UX', devP2Text: 'Сценарии пользователя, структура страниц, карта контента и точки доверия.',
        devP3Title: '3. Визуальное направление', devP3Text: 'Премиальная визуальная система, UI-компоненты, типографика и моушн-принципы.',
        devP4Title: '4. Разработка', devP4Text: 'Семантическая сборка, формы, интеграции, анимации, скорость и адаптивность.',
        devP5Title: '5. SEO и запуск', devP5Text: 'Метаданные, schema.org, проверка качества, аналитика, релиз и 90-дневный список гипотез роста.',
        devQualityTitle: 'Контроль качества на каждом этапе',
        devQualityLi1: 'Каждая фаза включает демонстрацию, фиксацию решений и короткий протокол.',
        devQualityLi2: 'Все ключевые страницы проходят техническую и UX-проверку до релиза.',
        devQualityLi3: 'После запуска формируется список гипотез роста на основе данных.',
        footerLead: 'Fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие сайты и исправляю ошибки с фокусом на скорость, SEO и конверсию.'
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
        infoBadge: 'Доверие и коммуникация', infoTitle: 'Прямая коммуникация с fullstack-разработчиком и прозрачные условия работы',
        infoLegal: 'Статус: самозанятый. По запросу предоставляются договор, чек и закрывающие документы.',
        infoModelTitle: 'Модель сотрудничества', infoModelLi1: 'Фиксация объёма работ, сроков и KPI перед стартом.', infoModelLi2: 'Этапная приёмка и понятные результаты каждого этапа.', infoModelLi3: 'Поддержка и итерационное улучшение после релиза.',
        infoNeedTitle: 'Что потребуется от вас', infoNeedLi1: 'Краткий бриф по продукту и аудитории.', infoNeedLi2: 'Приоритеты: заявки, имидж, SEO и автоматизация.', infoNeedLi3: 'Доступность для 1–2 согласований в неделю.',
        infoNextTitle: 'Следующий шаг', infoNextText: 'Напишите в Telegram или на эл. почту. В ответ вы получите структуру запуска проекта, список исходных материалов и ориентир по срокам в течение 24 часов.',
        footerLead: 'Fullstack-разработчик сайтов: создаю новые проекты, улучшаю текущие сайты и исправляю ошибки с фокусом на скорость, SEO и конверсию.'
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
    const deadlineBufferWeeks = deadline ? Number(deadline.value) : 2;
    const designCost = Number(designLevel?.value || 0);
    const seoCost = Number(seoPack?.value || 0);
    const pageExtra = Math.max(0, pages - 5) * 1500;
    const addonsTotal = Array.from(addOns).filter((a) => a.checked).reduce((sum, item) => sum + Number(item.value), 0);
    const minTimeline = Math.max(2, Math.round(pages / 4) + (designCost > 0 ? 1 : 0));
    const maxTimeline = Math.max(minTimeline + 1, Math.round(pages / 2) + (addonsTotal > 15000 ? 2 : 1));
    const deadlineMin = minTimeline + deadlineBufferWeeks;
    const deadlineMax = maxTimeline + deadlineBufferWeeks;
    const urgency = deadlineBufferWeeks <= 0 ? 1.35 : deadlineBufferWeeks <= 1 ? 1.18 : deadlineBufferWeeks <= 2 ? 1.08 : 1;
    const subtotal = base + pageExtra + designCost + seoCost + addonsTotal;
    const total = Math.round(subtotal * urgency / 1000) * 1000;

    const prev = Number((estimateValue.dataset.value || '0'));
    estimateValue.dataset.value = String(total);
    animateEstimateValue(estimateValue, prev, total, lang);
    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = formatWeeks(deadlineMin, deadlineMax);
    if (estimateTimeline) estimateTimeline.textContent = formatWeeks(minTimeline, maxTimeline);

    const complexity = Math.min(100, Math.round(base / 1800 + pages * 1.8 + addonsTotal / 1600 + designCost / 1200 + seoCost / 1600));
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
        : `<li>Базовый пакет: ${formatCurrency(base, lang)}</li><li>Масштаб страниц: ${formatCurrency(pageExtra, lang)}</li><li>Дизайн-уровень: ${formatCurrency(designCost, lang)}</li><li>SEO пакет: ${formatCurrency(seoCost, lang)}</li><li>Опции: ${formatCurrency(addonsTotal, lang)}</li><li>Коэффициент срочности: x${urgency.toFixed(2)}</li>`;
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
