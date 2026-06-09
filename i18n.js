document.addEventListener('DOMContentLoaded', () => {
    if (window.SBES_I18N?.applyLanguage) return;

    const KO = {
        nav: {
            home: '홈',
            about: '소개',
            research: '연구',
            publications: '논문',
            researcher: '연구자',
            software: '도구',
            contact: '연락처'
        },
        static: {
            '.hero-content h1': { html: '<span class="highlight">지속가능한 건물 에너지</span>를 위한 혁신' },
            '.hero-content p': { text: '한양대학교 Sustainable Building Energy System Lab(SBES Lab)은 고효율 HVAC 시스템, 건물 에너지 최적화, 차세대 제습 및 가습 기술을 연구합니다.' },
            '.hero-btns .btn-primary': { text: '연구 분야' },
            '.hero-btns .btn-secondary': { text: '논문 보기' },
            '#about .section-title': { text: '연구실 소개' },
            '#about .about-text p': { text: 'SBES Lab은 에너지 소비, 습도 제어, 실내 공기질이 만나는 지점의 문제를 다룹니다. 비냉매 기반 HVAC 기술, 고효율 멤브레인 시스템, 기후 적응형 건물 전략을 개발하여 건물 에너지 수요를 줄이고 더 건강한 실내환경을 만드는 것을 목표로 합니다.' },
            '#research .section-title': { text: '연구 분야' },
            '[data-research-target="liquid-desiccant-detail"] h3': { text: 'HVAC 시스템' },
            '[data-research-target="liquid-desiccant-detail"] p': { text: '고급 HVAC 설계와 surrogate model 기반 접근을 통해 더 쾌적하고 지능적인 실내환경 제어 기술을 개발합니다.' },
            '[data-research-target="thermoelectric-detail"] h3': { text: '건물 에너지' },
            '[data-research-target="thermoelectric-detail"] p': { text: '건물 에너지 성능을 높이고 지속가능한 생활환경을 구현하기 위한 시뮬레이션, 최적화, 시스템 전략을 연구합니다.' },
            '[data-research-target="membrane-detail"] h3': { text: '제습 및 습도 제어' },
            '[data-research-target="membrane-detail"] p': { text: '멤브레인 및 액체식 제습 기술을 기반으로 차세대 고효율 습도 제어 시스템을 개발합니다.' },
            '#membrane-detail .detailed-text h3': { text: '멤브레인 기반 제습 시스템' },
            '#membrane-detail .detailed-text p': { text: '멤브레인 기반 제습 기술은 SBES Lab의 핵심 연구 분야입니다. 기존 냉각식 제습은 잠열 부하가 커질수록 과냉각, 재열, 높은 에너지 소비 문제가 발생합니다. 본 연구는 공기와 액체 물은 차단하면서 수증기만 선택적으로 이동시키는 멤브레인을 활용하여 비냉매 기반의 고효율 습도 제어 방식을 개발합니다. 진공 멤브레인 제습, cyclic membrane humidity pump, 멤브레인 결합 DOAS 등 다양한 시스템을 모델링, 실험, 시스템 수준에서 분석합니다.' },
            '#liquid-desiccant-detail .detailed-text h3': { text: '액체식 제습 공조 시스템' },
            '#liquid-desiccant-detail .detailed-text p': { text: '액체식 제습 기술은 흡습성 용액을 이용해 잠열 부하를 처리하는 대안적인 공조 기술입니다. SBES Lab은 이상 사이클 분석, 접촉기 설계, 열회수 연계 재생 전략을 포함하여 액체식 제습 시스템의 열 및 물질전달 특성을 정량적으로 분석하고, 차세대 HVAC 구성 요소로서의 활용 가능성을 높이고자 합니다.' },
            '#thermoelectric-detail .detailed-text h3': { text: '열전 에너지 하베스팅 시스템' },
            '#thermoelectric-detail .detailed-text p': { text: '건물에는 덕트, 배관, 외피, 실내외 표면 등에서 발생하는 저온 폐열이 존재하지만 대부분 활용되지 않습니다. 본 연구는 열전소자를 이용해 작은 온도 차이를 전기에너지로 전환하는 기술을 건물 환경에 적용하고, 센서와 모니터링 장치의 자가발전 가능성을 분석합니다.' },
            '#ieq-detail .detailed-text h3': { text: '실내환경 품질: 열쾌적 및 공기질' },
            '#ieq-detail .detailed-text p': { text: '에너지 절감과 건강한 실내환경은 동시에 고려되어야 합니다. SBES Lab은 열쾌적, 실내공기질, 오염물질 노출, HVAC 운전 전략을 통합적으로 분석하여 실내환경 품질을 평가합니다. 특히 가습 및 제습 시스템에서 발생할 수 있는 위생성과 공기-물 접촉 위험을 정량적으로 검토합니다.' },
            '#publications .section-title': { text: '논문' },
            '.pub-category:nth-of-type(1) h3': { html: '<i class="fas fa-book-open"></i> 저널 논문' },
            '.pub-category:nth-of-type(2) h3': { html: '<i class="fas fa-users"></i> 학술대회 발표' },
            '#team .section-title': { text: '연구자' },
            '.team-member > p': { text: '한양대학교 연구조교수' },
            '.researcher-card:nth-child(1) h3': { text: '학력 및 경력' },
            '.researcher-card:nth-child(2) h3': { text: '주요 연구 전문 분야' },
            '.timeline-list li:nth-child(1) .timeline-text': { text: '건축공학 학사, 광운대학교' },
            '.timeline-list li:nth-child(2) .timeline-text': { text: '전자공학 복수전공, 광운대학교' },
            '.timeline-list li:nth-child(3) .timeline-text': { text: '건축공학 박사, 한양대학교' },
            '.timeline-list li:nth-child(4) .timeline-text': { text: '박사후연구원, 한양대학교' },
            '.timeline-list li:nth-child(5) .timeline-text': { text: 'Postdoctoral Research Associate, Purdue University' },
            '.timeline-list li:nth-child(6) .timeline-text': { text: '연구조교수, 한양대학교' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(1)': { text: 'HVAC 적용을 위한 멤브레인 기반 습도 제어' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(2)': { text: '비냉매 및 저에너지 HVAC 시스템' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(3)': { text: '건물 에너지 시뮬레이션 및 시스템 최적화' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(4)': { text: '에너지 회수, 폐열 활용, 에너지 하베스팅' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(5)': { text: '실내 열쾌적 및 공기질' },
            '#software .section-title': { text: '소프트웨어 및 도구' },
            '.software-heading p': { text: '건물 에너지 시뮬레이션, CFD 해석, 멤브레인 가습, 습공기 선도, 데이터 모델링, 최적화 워크플로우를 위한 연구용 소프트웨어와 웹 도구입니다.' },
            '[data-tool-card="building"] .software-body p': { text: 'EnergyPlus 기반 모델 설정, 시뮬레이션 실행, 에너지 성능 검토 워크플로우입니다.' },
            '[data-tool-card="cfd"] .software-body p': { text: 'OpenFOAM 기반 실내 기류, 열쾌적, 자동 후처리 워크플로우입니다.' },
            '[data-tool-card="membrane"] .software-body p': { text: '중공사막 멤브레인 가습기 용량 산정과 성능 검토를 위한 웹 configurator입니다.' },
            '[data-tool-card="psychrometric"] .software-body p': { text: '상태점, 습공기 물성, HVAC 공정 경로를 계산하는 대화형 습공기 선도 도구입니다.' },
            '[data-tool-card="modeling"] .software-body p': { text: '실험 및 시뮬레이션 데이터 기반 DOE/RSM 및 surrogate modeling 작업 공간입니다.' },
            '[data-tool-card="optimization"] .software-body p': { text: '파라미터 연구와 trade-off 분석을 위한 범용 설계 최적화 작업 공간입니다.' },
            '#contact .section-title': { text: '연락처' },
            '.info-item:first-child a': { text: '한양대학교, 서울, 대한민국' },
            'footer p': { html: '&copy; 2024 SBES Lab. All rights reserved.' }
        },
        labels: {
            soon: '<i class="fas fa-clock"></i> 준비 중',
            local: '<i class="fas fa-wind"></i> 로컬 연구 도구',
            live: '<i class="fas fa-droplet"></i> 웹 앱',
            liveChart: '<i class="fas fa-chart-line"></i> 웹 앱',
            liveModel: '<i class="fas fa-diagram-project"></i> 웹 앱',
            details: '자세히',
            viewExample: '예시 보기',
            launch: '앱 열기',
            copy: '<i class="fas fa-copy"></i> 이메일 복사',
            copied: '<i class="fas fa-check"></i> 복사됨',
            map: '<i class="fas fa-map-location-dot"></i> 지도 열기',
            showResearch: '연구 자세히 보기 <i class="fas fa-chevron-down"></i>',
            hideResearch: '연구 접기 <i class="fas fa-chevron-up"></i>',
            moreJournals: '저널 논문 더 보기 <i class="fas fa-chevron-down"></i>',
            lessJournals: '저널 논문 접기 <i class="fas fa-chevron-up"></i>',
            moreProceedings: '학술대회 발표 더 보기 <i class="fas fa-chevron-down"></i>',
            lessProceedings: '학술대회 발표 접기 <i class="fas fa-chevron-up"></i>'
        },
        tools: {
            'Building Simulation Studio': {
                status: 'soon',
                text: '웹에서 건물 모델 설정, EnergyPlus 시뮬레이션 실행, 에너지 성능 검토를 반복적으로 수행할 수 있도록 준비 중인 도구입니다. 시뮬레이션 절차를 더 쉽게 비교하고 공유할 수 있게 만드는 것이 목표입니다.',
                action: 'disabled'
            },
            'CFD Simulation Workbench': {
                status: 'local',
                text: '실내 기류, 열 분포, 환기 거동, HVAC 관련 유동장을 분석하기 위한 OpenFOAM 기반 로컬 워크플로우입니다. 케이스 설정, 후처리, 시각화 결과 생성을 자동화하고, 향후 웹 인터페이스와 연계할 수 있도록 구성하고 있습니다.',
                action: 'example'
            },
            'Membrane Designer': {
                status: 'live',
                text: '중공사막 멤브레인 가습기 시스템을 위한 웹 configurator입니다. 사용자가 입력한 운전 조건을 기반으로 사양 검토와 성능 계산을 수행하여 멤브레인 기반 가습 개념을 직접 확인할 수 있습니다.',
                action: 'launch',
                href: 'https://webmembranehumidifier.vercel.app/?verify=ux12'
            },
            'Psychrometric Chart': {
                status: 'liveChart',
                text: '습공기 물성, 상태점 계산, HVAC 공정 경로를 대화형 선도 위에서 확인하는 웹 도구입니다. 냉각, 가열, 가습, 제습 과정의 상태 변화를 빠르게 검토할 수 있습니다.',
                action: 'launch',
                href: 'https://psychrometric-chart-web.vercel.app/'
            },
            'Data Modeling Studio': {
                status: 'liveModel',
                text: 'DOE, RSM, 검증, AI-assisted surrogate modeling을 지원하는 웹 기반 데이터 모델링 작업 공간입니다. 실험 또는 시뮬레이션 데이터를 해석 가능한 예측 모델로 전환하여 설계와 민감도 분석에 활용할 수 있습니다.',
                action: 'launch',
                href: 'https://doe-modeler-ai-demo.vercel.app/'
            },
            'Optimization Studio': {
                status: 'soon',
                text: '설계 변수, 제약조건, 목적함수, trade-off 분석을 다루기 위한 범용 최적화 작업 공간입니다. HVAC에 한정하지 않고 다양한 시스템 설계 문제에 적용할 수 있는 방향으로 준비 중입니다.',
                action: 'disabled'
            }
        }
    };

    const EN = {
        'publications.moreJournals': 'Show More Journals <i class="fas fa-chevron-down"></i>',
        'publications.lessJournals': 'Show Less Journals <i class="fas fa-chevron-up"></i>',
        'publications.moreProceedings': 'Show More Proceedings <i class="fas fa-chevron-down"></i>',
        'publications.lessProceedings': 'Show Less Proceedings <i class="fas fa-chevron-up"></i>'
    };

    const originals = new WeakMap();
    let currentLang = localStorage.getItem('sbes-lang') === 'ko' ? 'ko' : 'en';

    function remember(element) {
        if (!originals.has(element)) {
            originals.set(element, {
                html: element.innerHTML,
                text: element.textContent,
                attrs: {
                    ariaLabel: element.getAttribute('aria-label')
                }
            });
        }
        return originals.get(element);
    }

    function setElement(element, value, useHtml) {
        if (useHtml) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    }

    function applyStatic() {
        document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';

        const navMap = {
            '#home': 'home',
            '#about': 'about',
            '#research': 'research',
            '#publications': 'publications',
            '#team': 'researcher',
            '#software': 'software',
            '#contact': 'contact'
        };

        Object.entries(navMap).forEach(([href, key]) => {
            document.querySelectorAll(`.nav-links a[href="${href}"]`).forEach((element) => {
                const original = remember(element);
                element.textContent = currentLang === 'ko' ? KO.nav[key] : original.text;
            });
        });

        Object.entries(KO.static).forEach(([selector, entry]) => {
            document.querySelectorAll(selector).forEach((element) => {
                const original = remember(element);
                const useHtml = Boolean(entry.html);
                const value = currentLang === 'ko'
                    ? (entry.html || entry.text)
                    : (useHtml ? original.html : original.text);
                setElement(element, value, useHtml);
            });
        });

        setLabels();
        setToolDetail();
        setLanguageButtons();
    }

    function setLabels() {
        const isKo = currentLang === 'ko';
        const label = KO.labels;

        const pairs = [
            ['[data-tool-card="building"] .software-status', label.soon],
            ['[data-tool-card="optimization"] .software-status', label.soon],
            ['[data-tool-card="building"] .software-action.disabled', label.soon],
            ['[data-tool-card="optimization"] .software-action.disabled', label.soon],
            ['[data-tool-card="cfd"] .software-status', label.local],
            ['[data-tool-card="membrane"] .software-status', label.live],
            ['[data-tool-card="psychrometric"] .software-status', label.liveChart],
            ['[data-tool-card="modeling"] .software-status', label.liveModel],
            ['[data-tool-card="cfd"] .software-action.primary', label.viewExample],
            ['[data-tool-card="membrane"] .software-action.primary', label.launch],
            ['[data-tool-card="psychrometric"] .software-action.primary', label.launch],
            ['[data-tool-card="modeling"] .software-action.primary', label.launch],
            ['button[data-tool-button="building"]', label.details],
            ['[data-tool-card="cfd"] button.software-action:not(.primary)', label.details],
            ['button[data-tool-button="membrane"]', label.details],
            ['button[data-tool-button="psychrometric"]', label.details],
            ['button[data-tool-button="modeling"]', label.details],
            ['button[data-tool-button="optimization"]', label.details],
            ['[data-copy-email]', label.copy],
            ['.contact-actions a', label.map]
        ];

        pairs.forEach(([selector, koValue]) => {
            document.querySelectorAll(selector).forEach((element) => {
                const original = remember(element);
                element.innerHTML = isKo ? koValue : original.html;
            });
        });

        const researchButton = document.getElementById('show-more-research-btn');
        if (researchButton) {
            const isOpen = document.getElementById('detailed-research')?.style.display !== 'none';
            const original = remember(researchButton);
            researchButton.innerHTML = isKo
                ? (isOpen ? label.hideResearch : label.showResearch)
                : original.html;
        }
    }

    function setToolDetail() {
        const titleElement = document.getElementById('tool-detail-title');
        const statusElement = document.getElementById('tool-detail-status');
        const textElement = document.getElementById('tool-detail-text');
        const actionsElement = document.getElementById('tool-detail-actions');
        if (!titleElement || !statusElement || !textElement || !actionsElement) return;

        const tool = KO.tools[titleElement.textContent.trim()];
        [statusElement, textElement, actionsElement].forEach(remember);

        if (currentLang !== 'ko' || !tool) {
            statusElement.innerHTML = originals.get(statusElement).html;
            textElement.textContent = originals.get(textElement).text;
            actionsElement.innerHTML = originals.get(actionsElement).html;
            return;
        }

        statusElement.innerHTML = KO.labels[tool.status];
        textElement.textContent = tool.text;

        if (tool.action === 'launch') {
            actionsElement.innerHTML = `<a class="software-action primary" href="${tool.href}" rel="noopener" target="_blank">${KO.labels.launch}</a>`;
        } else if (tool.action === 'example') {
            actionsElement.innerHTML = `<span class="software-action primary">${KO.labels.viewExample}</span>`;
        } else {
            actionsElement.innerHTML = `<span class="software-action disabled">${KO.labels.soon}</span>`;
        }
    }

    function setLanguageButtons() {
        document.querySelectorAll('[data-lang]').forEach((button) => {
            const active = button.dataset.lang === currentLang;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function translatePublicationLabel(key) {
        if (currentLang === 'ko') {
            const map = {
                'publications.moreJournals': KO.labels.moreJournals,
                'publications.lessJournals': KO.labels.lessJournals,
                'publications.moreProceedings': KO.labels.moreProceedings,
                'publications.lessProceedings': KO.labels.lessProceedings
            };
            return map[key] || '';
        }
        return EN[key] || '';
    }

    function applyLanguage(lang) {
        currentLang = lang === 'ko' ? 'ko' : 'en';
        localStorage.setItem('sbes-lang', currentLang);
        applyStatic();
        document.dispatchEvent(new CustomEvent('sbes:languagechange', { detail: { lang: currentLang } }));
    }

    window.SBES_I18N = {
        getLang: () => currentLang,
        html: translatePublicationLabel,
        applyLanguage
    };

    document.querySelectorAll('[data-lang]').forEach((button) => {
        button.addEventListener('click', () => applyLanguage(button.dataset.lang));
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-research-target], [data-tool-card], [data-tool-button], #show-more-research-btn, [data-copy-email]')) {
            setTimeout(applyStatic, 0);
        }
    });

    applyLanguage(currentLang);
});
