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
        heroBadge: 'Cinematic Product Design • Engineering • SEO',
        heroTitle: 'Сайты, которые выглядят как искусство и работают как системный канал продаж',
        heroLead: 'Я проектирую цифровые продукты с кинематографичной подачей, инженерной дисциплиной и сильной SEO-архитектурой. Вы получаете визуальный вау-эффект, измеримые бизнес-метрики и прямую связь без посредников.',
        ctaMain: 'Рассчитать бюджет проекта', ctaProcess: 'Посмотреть 6-фазный процесс',
        heroPanelTitle: 'Система исполнения',
        heroCheck1: 'Первая рабочая версия за 24–72 часа.', heroCheck2: 'Чёткая архитектура под масштаб и новые языки.', heroCheck3: 'KPI-фреймворк: скорость, конверсия, заявки.',
        kpi1v: '24–72 часа', kpi1t: 'до первой рабочей итерации', kpi2v: '90+ Lighthouse', kpi2t: 'при корректной контент-стратегии',
        kpi3v: '1 окно связи', kpi3t: 'без менеджерской прослойки', kpi4v: '6 фаз', kpi4t: 'от стратегии до запуска и роста',
        workTitle: 'Избранные направления, где сайт даёт бизнес-результат',
        workCard1Tag: 'Услуги', workCard1Title: 'Коммерческие сайты услуг', workCard1Text: 'Структура под лидогенерацию: оффер, доказательства, CTA, автоворонка и аналитика.',
        workCard2Tag: 'Бренд', workCard2Title: 'Имиджевые бренд-платформы', workCard2Text: 'Эстетика премиум-сегмента с высокой скоростью и технологической чистотой.',
        workCard3Tag: 'Масштаб', workCard3Title: 'Масштабируемые продуктовые сайты', workCard3Text: 'Модульная система страниц, готовая к SEO-кластеру, кейсам и новым рынкам.',
        caseTitle: 'Флагманский кейс', caseLead: 'Кейс-формат: задача → стратегия → внедрение → цифры. Это основа доверия и аргументации стоимости.', caseLinkLabel: 'Aplus Charisma — коммерческий сайт услуг', caseLinkCta: 'Открыть ↗',
        resultTitle: 'Что вы получаете в результате',
        resultLi1: 'Премиальный визуальный уровень с понятной иерархией и сильным CTA-потоком.', resultLi2: 'Семантически корректный HTML и SEO-базу с подготовкой к schema.org.',
        resultLi3: 'Оптимизацию скорости, чтобы дизайн не ломал конверсию и индексацию.', resultLi4: 'Структуру, удобную для масштабирования: кейсы, контент, новые языковые версии.',
        finalTitle: 'Готовы сделать сайт центром роста вашего бизнеса?', finalLead: 'Следующий шаг — короткий бриф, согласование KPI и запуск первой рабочей версии в ближайшие дни.',
        finalCta1: 'Запустить проект', finalCta2: 'Связаться напрямую', footerLead: 'Независимый веб-дизайнер и разработчик. Премиальные сайты с прозрачным процессом и фокусом на измеримый результат.'
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
        finalTitle: 'Ready to make your website a growth engine?', finalLead: 'Next step: a focused brief, KPI alignment, and the first working version within days.',
        finalCta1: 'Start project', finalCta2: 'Contact directly', footerLead: 'Independent Web Product Designer & Developer. Premium websites with transparent process and measurable outcomes.'
      }
    },
    pricing: {
      ru: {
        pricingBadge: 'Прозрачная модель стоимости', pricingTitle: 'Три масштаба проекта + продвинутый смарт-калькулятор',
        pricingLead: 'Выберите уровень проекта и настройте параметры пресейла: дизайн, SEO, интеграции и дедлайн. Система покажет стоимость, срок и сложность.',
        priceStart1: 'Лендинг / MVP', priceStart2: 'Базовая SEO-структура', priceStart3: 'Запуск за 2–4 недели',
        priceGrowth1: 'Сайт услуг / корпоративный', priceGrowth2: 'Аналитика + события', priceGrowth3: 'Рост по этапам',
        priceScale1: 'Сложные сценарии и интеграции', priceScale2: 'Кастомные модули', priceScale3: 'Техподдержка и SLA',
        calcTitle: 'Продвинутый калькулятор бюджета', calcLead: 'Настройте параметры проекта как в реальном пресейле: объём, скорость, уровень дизайна, SEO и интеграции.',
        calcPagesLabel: 'Количество страниц', calcDeadlineLabel: 'Желаемый дедлайн', calcDesignLabel: 'Уровень визуального продакшена', calcSeoLabel: 'SEO пакет', pricingCta: 'Обсудить проект',
        optTitle: 'Как оптимизировать бюджет без потери качества',
        optLi1: 'Запустить MVP на ключевые сценарии и масштабировать в спринтах.', optLi2: 'Сначала внедрить core-страницы и лидогенерацию, затем расширять контент.',
        optLi3: 'Использовать единую дизайн-систему вместо хаотичных правок по блокам.', optLi4: 'Согласовывать контент заранее — это заметно ускоряет релиз.',
        footerLead: 'Независимый веб-дизайнер и разработчик. Премиальные сайты с прозрачным процессом и фокусом на измеримый результат.'
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
        servicesBadge: 'Стек компетенций', servicesTitle: 'Полный цикл: стратегия, дизайн, разработка, SEO и рост после релиза',
        servicesLead: 'Каждая услуга ориентирована на бизнес-результат: больше заявок, выше доверие, сильнее позиционирование и прозрачная управляемость проекта.',
        srv1Li1: 'Позиционирование и ценностное сообщение.', srv1Li2: 'Архитектура страниц и контент-фрейм.', srv1Li3: 'KPI и карта клиентского пути.',
        srv2Li1: 'Премиальный UI с адаптивной системой.', srv2Li2: 'Семантическая разработка и интеграции.', srv2Li3: 'Формы, квизы, калькуляторы, CTA-механики.',
        srv3Li1: 'Metadata, Open Graph и schema.org.', srv3Li2: 'Core Web Vitals и скорость рендера.', srv3Li3: 'Аналитика, воронка и post-launch итерации.',
        fitTitle: 'Кому подойдёт такой формат', fitLi1: 'Экспертам и студиям, которым нужен визуально сильный и конверсионный сайт.', fitLi2: 'B2B-командам, которым важны структура, масштабируемость и SEO-фундамент.', fitLi3: 'Брендам, которые хотят продавать дороже за счёт уровня подачи и доверия.',
        notFitTitle: 'Когда лучше выбрать другой путь', notFitLi1: 'Если нужен «быстрый сайт на шаблоне» без стратегии и аналитики.', notFitLi2: 'Если приоритет — минимальная цена, а не качество, скорость и масштаб.', notFitLi3: 'Если команда не готова к регулярным согласованиям и работе по KPI.',
        footerLead: 'Независимый веб-дизайнер и разработчик. Премиальные сайты с прозрачным процессом и фокусом на измеримый результат.'
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
        devBadge: 'Система реализации', devTitle: 'Прозрачный production-процесс с жёсткой связкой к KPI',
        devLead: 'Каждая фаза завершается конкретным артефактом: вы видите результат, понимаете следующий шаг и контролируете качество без хаоса.',
        devP1Title: '1. Discovery', devP1Text: 'Анализ ниши, ЦА, конкурентов, контент-рисков и KPI. На выходе — стратегический бриф.',
        devP2Title: '2. IA & UX', devP2Text: 'Сценарии пользователя, структура страниц, карта контента и точки доверия.',
        devP3Title: '3. Visual Direction', devP3Text: 'Премиальная визуальная система, UI-компоненты, типографика и motion-принципы.',
        devP4Title: '4. Development', devP4Text: 'Семантическая сборка, формы, интеграции, анимации, скорость и адаптивность.',
        devP5Title: '5. SEO & Launch', devP5Text: 'Metadata, schema, QA, аналитика, релиз и 90-дневный backlog роста.',
        devQualityTitle: 'Контроль качества на каждом этапе',
        devQualityLi1: 'Каждая фаза включает демонстрацию, фиксацию решений и короткий протокол.',
        devQualityLi2: 'Все ключевые страницы проходят техническую и UX-проверку до релиза.',
        devQualityLi3: 'После запуска формируется список growth-гипотез на основе данных.',
        footerLead: 'Независимый веб-дизайнер и разработчик. Премиальные сайты с прозрачным процессом и фокусом на измеримый результат.'
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
        infoBadge: 'Доверие и коммуникация', infoTitle: 'Прямая коммуникация, прозрачные условия и поддержка после запуска',
        infoLegal: 'Статус: самозанятый. По запросу предоставляются договор, чек и закрывающие документы.',
        infoModelTitle: 'Модель сотрудничества', infoModelLi1: 'Фиксация scope, сроков и KPI перед стартом.', infoModelLi2: 'Этапная приёмка и понятные deliverables.', infoModelLi3: 'Поддержка и итерационное улучшение после релиза.',
        infoNeedTitle: 'Что потребуется от вас', infoNeedLi1: 'Краткий бриф по продукту и аудитории.', infoNeedLi2: 'Приоритеты: лиды, имидж, SEO и автоматизация.', infoNeedLi3: 'Доступность для 1–2 согласований в неделю.',
        infoNextTitle: 'Следующий шаг', infoNextText: 'Напишите в Telegram или на email. В ответ вы получите структуру запуска проекта, список исходных материалов и ориентир по срокам в течение 24 часов.',
        footerLead: 'Независимый веб-дизайнер и разработчик. Премиальные сайты с прозрачным процессом и фокусом на измеримый результат.'
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

  function updateEstimate(lang = safeGet(langKey, 'ru')) {
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
    const deadlineWeeks = deadline ? Number(deadline.value) : 6;
    const designCost = Number(designLevel?.value || 0);
    const seoCost = Number(seoPack?.value || 0);
    const pageExtra = Math.max(0, pages - 5) * 1500;
    const addonsTotal = Array.from(addOns).filter((a) => a.checked).reduce((sum, item) => sum + Number(item.value), 0);
    const urgency = deadlineWeeks <= 3 ? 1.35 : deadlineWeeks <= 5 ? 1.18 : deadlineWeeks <= 7 ? 1.08 : 1;
    const subtotal = base + pageExtra + designCost + seoCost + addonsTotal;
    const total = Math.round(subtotal * urgency / 1000) * 1000;

    estimateValue.textContent = formatCurrency(total, lang);
    if (pageCountOutput) pageCountOutput.value = String(pages);
    if (deadlineOutput) deadlineOutput.value = `${deadlineWeeks} ${lang === 'en' ? 'weeks' : 'недель'}`;
    const minTimeline = Math.max(2, Math.round(pages / 4) + (designCost > 0 ? 1 : 0));
    const maxTimeline = Math.max(minTimeline + 1, Math.round(pages / 2) + (addonsTotal > 15000 ? 2 : 1));
    if (estimateTimeline) estimateTimeline.textContent = `${minTimeline}–${maxTimeline} ${lang === 'en' ? 'weeks' : 'недель'}`;

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
})();
