(function () {
    const platform = document.getElementById('lab-platform-vision');
    const toggle = document.getElementById('lab-platform-toggle');
    if (!platform || !toggle) return;

    const hotspots = Array.from(document.querySelectorAll('.lab-platform-piece'));
    const mobileModules = document.getElementById('lab-platform-mobile-list');
    const detail = document.getElementById('lab-platform-detail');
    const detailStep = document.getElementById('lab-platform-detail-step');
    const detailTitle = document.getElementById('lab-platform-detail-title');
    const detailText = document.getElementById('lab-platform-detail-text');
    const detailNext = document.getElementById('lab-platform-detail-next');
    const detailTool = document.getElementById('lab-platform-detail-tool');

    const copy = {
        en: {
            aboutTitle: 'About the Lab',
            aboutText: 'SBES Lab studies sustainable building HVAC and energy systems for lower energy use, better humidity control, and healthier indoor environments.',
            showMore: 'Show More Lab',
            kicker: '<i class="fas fa-diagram-project"></i> Energy &middot; Humidity &middot; Indoor Air Quality',
            platformTitle: 'Research Vision',
            platformVision: 'SBES Lab connects selective HVAC components, integrated energy systems, building-scale performance evaluation, and data-driven operation into one research platform.',
            detailPrefix: 'Step',
            toolPrefix: 'Related web tool',
            modules: [
                {
                    id: 'develop',
                    step: '01',
                    verb: 'Develop',
                    title: 'Selective HVAC Component Technologies',
                    shortText: 'Components that control moisture with less cooling energy.',
                    detail: 'This area focuses on membrane and humidity-control components. The purpose is to handle moisture more directly, instead of relying only on conventional cooling and reheating.',
                    next: 'SBES Lab starts with component technologies that can reduce unnecessary cooling energy.',
                    tool: 'Membrane Designer',
                    color: '#2e7d32'
                },
                {
                    id: 'integrate',
                    step: '02',
                    verb: 'Integrate',
                    title: 'Integrated HVAC & Energy Systems',
                    shortText: 'Ventilation, heat recovery, cooling, and humidity control as one system.',
                    detail: 'This area connects individual technologies into practical HVAC system layouts. Ventilation, heat recovery, evaporative cooling, and energy recovery are considered together.',
                    next: 'The lab studies complete HVAC and energy systems, not only isolated devices.',
                    tool: 'Psychrometric Chart',
                    color: '#e65a1e'
                },
                {
                    id: 'evaluate',
                    step: '03',
                    verb: 'Evaluate',
                    title: 'Building-Scale Performance Evaluation',
                    shortText: 'Testing comfort and energy impact at the whole-building scale.',
                    detail: 'This area evaluates how a strategy performs in a real building context. Energy simulation, airflow visualization, climate data, load analysis, and comfort metrics are used together.',
                    next: 'Building-scale evaluation shows whether a technology can make a practical difference.',
                    tool: 'Building Simulation Studio',
                    color: '#1f5fae'
                },
                {
                    id: 'operate',
                    step: '04',
                    verb: 'Operate',
                    title: 'Control-Oriented Operation & Automation',
                    shortText: 'Sensors, models, and optimization for smarter building operation.',
                    detail: 'This area uses BEMS data, sensors, predictive models, and optimization to improve building operation after installation.',
                    next: 'Research continues after design, because operation determines long-term energy performance.',
                    tool: 'Data Modeling & Optimization Studio',
                    color: '#14a6a3'
                }
            ]
        },
        ko: {
            aboutTitle: '연구실 소개',
            aboutText: 'SBES Lab은 건물 에너지 사용을 줄이고, 습도 제어와 실내공기질을 함께 개선하기 위한 지속가능 건물 공조 및 에너지 시스템을 연구합니다.',
            showMore: '연구 비전 보기',
            kicker: '<i class="fas fa-diagram-project"></i> 에너지 &middot; 습도 &middot; 실내공기질',
            platformTitle: '연구 비전',
            platformVision: 'SBES Lab은 선택적 공조 요소기술, 통합 에너지 시스템, 건물 단위 성능 평가, 데이터 기반 운영을 하나의 연구 플랫폼으로 연결하는 것을 목표로 합니다.',
            detailPrefix: '단계',
            toolPrefix: '관련 웹 도구',
            modules: [
                {
                    id: 'develop',
                    step: '01',
                    verb: '개발',
                    title: '선택적 HVAC 요소기술',
                    shortText: '적은 냉방 에너지로 습도를 제어하는 요소기술입니다.',
                    detail: '멤브레인과 습도 제어 요소기술을 다룹니다. 기존 냉방과 재열에만 의존하지 않고, 수분을 더 직접적으로 제어하는 방식을 연구합니다.',
                    next: 'SBES Lab은 불필요한 냉방 에너지를 줄일 수 있는 요소기술에서 출발합니다.',
                    tool: 'Membrane Designer',
                    color: '#2e7d32'
                },
                {
                    id: 'integrate',
                    step: '02',
                    verb: '통합',
                    title: '통합 HVAC 및 에너지 시스템',
                    shortText: '환기, 열회수, 냉방, 습도 제어를 하나의 시스템으로 연결합니다.',
                    detail: '개별 기술을 실제 공조 시스템 안에서 함께 작동하도록 연결합니다. 환기, 열회수, 증발냉각, 에너지 회수 전략을 함께 검토합니다.',
                    next: '하나의 장치가 아니라 실제 건물에서 작동하는 공조 및 에너지 시스템을 연구합니다.',
                    tool: 'Psychrometric Chart',
                    color: '#e65a1e'
                },
                {
                    id: 'evaluate',
                    step: '03',
                    verb: '평가',
                    title: '건물 단위 성능 평가',
                    shortText: '건물 전체에서 쾌적성과 에너지 절감 효과를 확인합니다.',
                    detail: '기술이 실제 건물 조건에서 어떻게 작동하는지 평가합니다. 에너지 시뮬레이션, 기류 시각화, 기후 데이터, 부하 분석, 쾌적성 지표를 함께 활용합니다.',
                    next: '건물 단위 평가를 통해 기술이 실제로 의미 있는 차이를 만드는지 확인합니다.',
                    tool: 'Building Simulation Studio',
                    color: '#1f5fae'
                },
                {
                    id: 'operate',
                    step: '04',
                    verb: '운영',
                    title: '제어 중심 운영 및 자동화',
                    shortText: '센서, 모델, 최적화를 이용해 건물 운영을 개선합니다.',
                    detail: 'BEMS 데이터, 센서, 예측 모델, 최적화를 활용해 설치 이후의 건물 운영 성능을 개선합니다.',
                    next: '설계 이후의 운영 성능이 장기적인 에너지 성능을 결정합니다.',
                    tool: 'Data Modeling & Optimization Studio',
                    color: '#14a6a3'
                }
            ]
        }
    };

    let currentLang = document.documentElement.lang === 'ko' || localStorage.getItem('sbes-lang') === 'ko' ? 'ko' : 'en';
    let activeId = '';

    function currentCopy() {
        return copy[currentLang] || copy.en;
    }

    function modules() {
        return currentCopy().modules;
    }

    function applyText() {
        const text = currentCopy();
        const textTargets = {
            '#about .section-title': text.aboutTitle,
            '#about .about-text p': text.aboutText,
            '#lab-platform-toggle': text.showMore,
            '[data-lab-platform-copy="kicker"]': text.kicker,
            '[data-lab-platform-copy="platformTitle"]': text.platformTitle,
            '[data-lab-platform-copy="platformVision"]': text.platformVision
        };

        Object.entries(textTargets).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (!element) return;
            if (selector.includes('kicker')) element.innerHTML = value;
            else element.textContent = value;
        });
    }

    function renderMobileButtons() {
        if (!mobileModules) return;
        const buttons = modules().map((module) => {
            const button = document.createElement('button');
            button.className = 'lab-platform-mobile-button';
            button.type = 'button';
            button.dataset.module = module.id;
            button.style.setProperty('--module-color', module.color);
            button.innerHTML = `<strong>${module.step}. ${module.title}</strong><span>${module.shortText}</span>`;
            button.addEventListener('click', () => setActiveModule(module.id));
            return button;
        });
        mobileModules.replaceChildren(...buttons);
    }

    function setActiveModule(id) {
        const text = currentCopy();
        const active = modules().find((module) => module.id === id);
        if (!active || !detail) return;
        activeId = active.id;
        platform.dataset.active = active.id;
        detail.hidden = false;
        platform.classList.add('is-click-settling');
        window.setTimeout(() => platform.classList.remove('is-click-settling'), 360);

        hotspots.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.module === active.id));
        });
        mobileModules?.querySelectorAll('button').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.module === active.id));
        });

        detailStep.innerHTML = `<i class="fas fa-circle-dot"></i> ${text.detailPrefix} ${active.step} &middot; ${active.verb}`;
        detailTitle.textContent = active.title;
        detailText.textContent = active.detail;
        detailNext.textContent = active.next;
        detailTool.innerHTML = `<i class="fas fa-screwdriver-wrench"></i>&nbsp; ${text.toolPrefix}: ${active.tool}`;

        hotspots.forEach((button) => button.classList.remove('is-hovered'));
        document.activeElement?.blur?.();

        window.setTimeout(() => {
            detail.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }, 80);
    }

    function syncLanguage(lang) {
        currentLang = lang === 'ko' ? 'ko' : 'en';
        applyText();
        renderMobileButtons();
        if (activeId) setActiveModule(activeId);
    }

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        platform.hidden = expanded;
        if (!expanded) {
            platform.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });

    hotspots.forEach((button) => {
        button.addEventListener('click', () => setActiveModule(button.dataset.module));
        button.addEventListener('mouseenter', () => button.classList.add('is-hovered'));
        button.addEventListener('mouseleave', () => button.classList.remove('is-hovered'));
        button.addEventListener('focus', () => button.classList.add('is-hovered'));
        button.addEventListener('blur', () => button.classList.remove('is-hovered'));
    });

    document.addEventListener('sbes:languagechange', (event) => {
        syncLanguage(event.detail?.lang);
    });

    document.addEventListener('DOMContentLoaded', () => {
        syncLanguage(document.documentElement.lang === 'ko' ? 'ko' : currentLang);
    });

    syncLanguage(currentLang);
})();
