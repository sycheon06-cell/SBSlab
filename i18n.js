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
            '.hero-content h1': { html: '<span class="highlight">지속가능한 건물 에너지 시스템</span>을 연구합니다' },
            '.hero-content p': { text: '한양대학교 SBES Lab은 건물 에너지, HVAC 시스템, 습도 제어 기술을 중심으로 저에너지·쾌적 실내환경 구현을 연구합니다.' },
            '.hero-btns .btn-primary': { text: '연구 분야' },
            '.hero-btns .btn-secondary': { text: '논문 보기' },
            '#about .section-title': { text: '연구실 소개' },
            '#about .about-text p': { text: 'SBES Lab은 건물의 에너지 사용을 줄이면서도 쾌적하고 건강한 실내환경을 유지하는 방법을 연구합니다. 비냉매 HVAC, 멤브레인 기반 습도 제어, 기후 대응형 건물 운영 전략을 결합해 저탄소 건축환경에 기여하고자 합니다.' },
            '#research .section-title': { text: '연구 분야' },
            '[data-research-target="liquid-desiccant-detail"] h3': { text: 'HVAC 시스템' },
            '[data-research-target="liquid-desiccant-detail"] p': { text: '고급 HVAC 설계와 대체모델 기반 최적화를 결합해 더 쾌적하고 지능적인 실내환경 제어 기술을 개발합니다.' },
            '[data-research-target="thermoelectric-detail"] h3': { text: '건물 에너지' },
            '[data-research-target="thermoelectric-detail"] p': { text: '시뮬레이션과 최적화를 바탕으로 건물 에너지 성능을 높이고 저탄소 운영 전략을 제안합니다.' },
            '[data-research-target="membrane-detail"] h3': { text: '제습 및 습도 제어' },
            '[data-research-target="membrane-detail"] p': { text: '멤브레인과 액체식 제습 기술을 활용해 냉매 사용과 에너지 소비를 줄이는 습도 제어 시스템을 연구합니다.' },
            '#membrane-detail .detailed-text h3': { text: '멤브레인 기반 제습 시스템' },
            '#membrane-detail .detailed-text p': { text: '멤브레인 기반 제습은 SBES Lab의 핵심 연구 주제입니다. 기존 냉각식 제습은 잠열 부하가 커질수록 과냉각, 재열, 높은 에너지 소비가 뒤따릅니다. 본 연구는 공기와 액체 물은 차단하고 수증기만 선택적으로 이동시키는 멤브레인을 활용해 비냉매·고효율 습도 제어 방식을 개발합니다. 진공 멤브레인 제습, cyclic membrane humidity pump, 멤브레인 결합 DOAS 등 다양한 시스템을 모델링, 실험, 시스템 분석으로 검토합니다.' },
            '#liquid-desiccant-detail .detailed-text h3': { text: '액체식 제습 공조 시스템' },
            '#liquid-desiccant-detail .detailed-text p': { text: '액체식 제습은 흡습성 용액으로 잠열 부하를 처리하는 공조 기술입니다. SBES Lab은 이상 사이클 분석, 접촉기 설계, 열회수 기반 재생 전략을 함께 검토하며 액체식 제습 시스템의 열·물질전달 특성을 정량화합니다. 이를 통해 차세대 HVAC 시스템에 적용할 수 있는 안정적이고 효율적인 제습 방식을 찾고 있습니다.' },
            '#thermoelectric-detail .detailed-text h3': { text: '열전 에너지 하베스팅 시스템' },
            '#thermoelectric-detail .detailed-text p': { text: '건물의 덕트, 배관, 외피, 실내외 표면에는 활용되지 못한 저온 폐열이 남아 있습니다. 본 연구는 열전소자를 이용해 작은 온도 차이를 전기 에너지로 바꾸고, 이를 센서와 모니터링 장치의 자가발전에 활용할 수 있는지 분석합니다.' },
            '#ieq-detail .detailed-text h3': { text: '실내환경 품질: 열쾌적과 공기질' },
            '#ieq-detail .detailed-text p': { text: '건물의 에너지 절감은 쾌적하고 건강한 실내환경과 함께 검토되어야 합니다. SBES Lab은 열쾌적, 실내공기질, 오염물질 노출, HVAC 운전 전략을 함께 분석해 실내환경 품질을 평가합니다. 특히 가습·제습 시스템에서 발생할 수 있는 위생 문제와 공기-물 접촉 위험을 정량적으로 검토합니다.' },
            '#publications .section-title': { text: '논문' },
            '.pub-category:nth-of-type(1) h3': { html: '<i class="fas fa-book-open"></i> 저널 논문' },
            '.pub-category:nth-of-type(2) h3': { html: '<i class="fas fa-users"></i> 학술대회 발표' },
            '#team .section-title': { text: '연구자' },
            '.team-member > p': { text: '한양대학교 연구조교수' },
            '.researcher-card:nth-child(1) h3': { text: '학력 및 경력' },
            '.researcher-card:nth-child(2) h3': { text: '주요 연구 분야' },
            '.timeline-list li:nth-child(1) .timeline-text': { text: '건축공학 학사, 광운대학교' },
            '.timeline-list li:nth-child(2) .timeline-text': { text: '전자공학 복수전공, 광운대학교' },
            '.timeline-list li:nth-child(3) .timeline-text': { text: '건축공학 박사, 한양대학교' },
            '.timeline-list li:nth-child(4) .timeline-text': { text: '박사후연구원, 한양대학교' },
            '.timeline-list li:nth-child(5) .timeline-text': { text: 'Postdoctoral Research Associate, Purdue University' },
            '.timeline-list li:nth-child(6) .timeline-text': { text: '연구조교수, 한양대학교' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(1)': { text: 'HVAC 시스템을 위한 멤브레인 기반 습도 제어' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(2)': { text: '비냉매·저에너지 HVAC 시스템' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(3)': { text: '건물 에너지 시뮬레이션 및 시스템 최적화' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(4)': { text: '에너지 회수, 폐열 활용 및 에너지 하베스팅' },
            '.researcher-card:nth-child(2) .researcher-list li:nth-child(5)': { text: '실내 열쾌적과 공기질' },
            '#software .section-title': { text: '소프트웨어 및 도구' },
            '.software-heading p': { text: '건물 에너지 시뮬레이션부터 CFD, 멤브레인 가습, 습공기 선도, 데이터 모델링, 최적화까지 연구 과정에서 활용하는 소프트웨어와 웹 도구를 정리했습니다.' },
            '[data-tool-card="building"] .software-body p': { text: 'EnergyPlus 기반으로 모델 설정, 시뮬레이션 실행, 에너지 성능 검토를 지원하는 도구입니다.' },
            '[data-tool-card="cfd"] .software-body p': { text: 'OpenFOAM 기반으로 실내 기류와 열쾌적을 해석하고 결과 후처리를 자동화합니다.' },
            '[data-tool-card="membrane"] .software-body p': { text: '중공사막 멤브레인 가습기의 용량과 성능을 빠르게 검토하는 웹 설계 도구입니다.' },
            '[data-tool-card="psychrometric"] .software-body p': { text: '상태점, 습공기 물성, HVAC 공정 변화를 대화형 선도에서 계산합니다.' },
            '[data-tool-card="modeling"] .software-body p': { text: '실험·시뮬레이션 데이터를 바탕으로 DOE/RSM과 surrogate model을 구성하는 도구입니다.' },
            '[data-tool-card="optimization"] .software-body p': { text: '파라미터 연구와 trade-off 분석을 위한 범용 설계 최적화 도구입니다.' },
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
                text: '웹에서 건물 모델을 설정하고 EnergyPlus 시뮬레이션 결과를 비교·공유할 수 있도록 준비 중인 도구입니다. 반복 계산과 성능 검토에 들어가는 시간을 줄이는 것을 목표로 합니다.',
                action: 'disabled'
            },
            'CFD Simulation Workbench': {
                status: 'local',
                text: 'OpenFOAM 기반 로컬 워크플로우로 실내 기류, 열 분포, 환기 특성, HVAC 유동장을 분석합니다. 케이스 설정부터 후처리와 시각화까지 자동화하고 있으며, 추후 웹 인터페이스 연계도 고려하고 있습니다.',
                action: 'example'
            },
            'Membrane Designer': {
                status: 'live',
                text: '중공사막 멤브레인 가습기 설계를 웹에서 빠르게 검토하는 도구입니다. 운전 조건을 입력하면 주요 사양과 성능을 계산해 멤브레인 가습 시스템의 적용 가능성을 확인할 수 있습니다.',
                action: 'launch',
                href: 'https://webmembranehumidifier.vercel.app/?verify=ux12'
            },
            'Psychrometric Chart': {
                status: 'liveChart',
                text: '습공기 물성, 상태점, HVAC 공정 변화를 대화형 선도에서 계산하는 웹 도구입니다. 냉각, 가열, 가습, 제습 과정의 상태 변화를 빠르게 확인할 수 있습니다.',
                action: 'launch',
                href: 'https://psychrometric-chart-web.vercel.app/'
            },
            'Data Modeling Studio': {
                status: 'liveModel',
                text: 'DOE, RSM, 검증, AI-assisted surrogate modeling을 지원하는 웹 기반 데이터 모델링 도구입니다. 실험·시뮬레이션 데이터를 예측 모델로 정리해 설계 검토와 민감도 분석에 활용할 수 있습니다.',
                action: 'launch',
                href: 'https://doe-modeler-ai-demo.vercel.app/'
            },
            'Optimization Studio': {
                status: 'soon',
                text: '설계 변수, 제약조건, 목적함수, trade-off를 함께 다루는 범용 최적화 도구입니다. 변수 설정부터 결과 비교까지 한 흐름에서 확인할 수 있도록 준비 중입니다.',
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

    document.querySelectorAll('[data-tool-button]').forEach((button) => {
        button.addEventListener('click', () => setTimeout(applyStatic, 0));
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-research-target], [data-tool-card], [data-tool-button], #show-more-research-btn, [data-copy-email]')) {
            setTimeout(applyStatic, 0);
        }
    });

    applyLanguage(currentLang);
});
