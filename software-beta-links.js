document.addEventListener('DOMContentLoaded', () => {
    const betaTools = {
        building: {
            title: 'Building Simulation Studio',
            image: 'images/software/building-simulation.jpg',
            href: 'https://bs06012-building-energy-analysis-beta.hf.space/',
            en: {
                status: '<i class="fas fa-flask"></i> Beta Web App',
                cardText: 'Beta web app for EnergyPlus-based model setup, simulation runs, and energy performance review.',
                detailText: 'A beta web-based EnergyPlus workspace for building model setup, simulation execution, and energy performance review. It is intended for early testing of browser-based building energy analysis workflows.',
                launch: 'Launch App'
            },
            ko: {
                status: '<i class="fas fa-flask"></i> 베타 웹 앱',
                cardText: 'EnergyPlus 기반 모델 설정, 시뮬레이션 실행, 에너지 성능 검토를 지원하는 베타 웹 앱입니다.',
                detailText: '웹에서 건물 모델을 설정하고 EnergyPlus 시뮬레이션 결과를 검토할 수 있는 베타 웹 앱입니다. 브라우저에서 건물 에너지 해석 과정을 테스트하는 단계입니다.',
                launch: '앱 열기'
            }
        },
        optimization: {
            title: 'Optimization Studio',
            image: 'images/software/optimization-studio.jpg',
            href: 'https://data-modeling-studio-optimization-s.vercel.app/',
            en: {
                status: '<i class="fas fa-flask"></i> Beta Web App',
                cardText: 'Beta web app for general design optimization, parameter studies, and trade-off analysis.',
                detailText: 'A beta general optimization workspace for design variables, constraints, objective functions, and trade-off analysis.',
                launch: 'Launch App'
            },
            ko: {
                status: '<i class="fas fa-flask"></i> 베타 웹 앱',
                cardText: '범용 설계 최적화, 파라미터 연구, 상충관계 분석을 지원하는 베타 웹 앱입니다.',
                detailText: '설계 변수, 제약조건, 목적함수, 상충관계를 함께 다루는 범용 최적화 베타 웹 앱입니다.',
                launch: '앱 열기'
            }
        }
    };

    function currentLang() {
        return window.SBES_I18N?.getLang?.() === 'ko' || document.documentElement.lang === 'ko' ? 'ko' : 'en';
    }

    function renderLaunch(tool, label) {
        return `<a class="software-action primary" href="${tool.href}" rel="noopener" target="_blank">${label}</a>`;
    }

    function patchCard(key) {
        const tool = betaTools[key];
        const lang = currentLang();
        const copy = tool[lang];
        const card = document.querySelector(`[data-tool-card="${key}"]`);
        if (!card) return;

        const status = card.querySelector('.software-status');
        if (status) {
            status.className = 'software-status beta';
            status.innerHTML = copy.status;
        }

        const bodyText = card.querySelector('.software-body p');
        if (bodyText) bodyText.textContent = copy.cardText;

        const primaryAction = card.querySelector('.software-action.primary');
        const disabledAction = card.querySelector('.software-action.disabled');
        const targetAction = primaryAction || disabledAction;
        if (targetAction) {
            const launch = document.createElement('a');
            launch.className = 'software-action primary';
            launch.href = tool.href;
            launch.rel = 'noopener';
            launch.target = '_blank';
            launch.textContent = copy.launch;
            targetAction.replaceWith(launch);
        }
    }

    function patchDetail(key) {
        const tool = betaTools[key];
        const lang = currentLang();
        const copy = tool[lang];
        const detailSection = document.getElementById('tool-detail');
        const detailImg = document.getElementById('tool-detail-img');
        const detailStatus = document.getElementById('tool-detail-status');
        const detailTitle = document.getElementById('tool-detail-title');
        const detailText = document.getElementById('tool-detail-text');
        const detailActions = document.getElementById('tool-detail-actions');
        if (!tool || !detailSection || !detailImg || !detailStatus || !detailTitle || !detailText || !detailActions) return;

        detailImg.src = tool.image;
        detailImg.alt = `${tool.title} preview`;
        detailStatus.className = 'software-status beta';
        detailStatus.innerHTML = copy.status;
        detailTitle.textContent = tool.title;
        detailText.textContent = copy.detailText;
        detailActions.innerHTML = renderLaunch(tool, copy.launch);
    }

    function patchAll() {
        Object.keys(betaTools).forEach(patchCard);

        const currentTitle = document.getElementById('tool-detail-title')?.textContent.trim();
        const activeKey = Object.entries(betaTools).find(([, tool]) => tool.title === currentTitle)?.[0];
        if (activeKey) patchDetail(activeKey);
    }

    document.querySelectorAll('[data-tool-card], [data-tool-button]').forEach((element) => {
        element.addEventListener('click', () => {
            const key = element.dataset.toolCard || element.dataset.toolButton;
            if (!betaTools[key]) return;
            setTimeout(() => patchDetail(key), 0);
        });
    });

    document.addEventListener('sbes:languagechange', () => setTimeout(patchAll, 0));
    patchAll();
});
