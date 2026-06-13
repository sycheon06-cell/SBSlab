document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    let activeToolKey = null;

    const I18N = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.research': 'Research',
            'nav.publications': 'Publications',
            'nav.researcher': 'Researcher',
            'nav.software': 'Software',
            'nav.contact': 'Contact',
            'hero.title': 'Innovating for <span class="highlight">Sustainable Building Energy</span>',
            'hero.copy': 'Welcome to the Sustainable Building Energy System Lab (SBES Lab) at Hanyang University. We specialize in advanced HVAC systems, building energy optimization, and next-generation dehumidification technologies.',
            'hero.research': 'Our Research',
            'hero.publications': 'Publications',
            'about.title': 'About the Lab',
            'about.copy': 'We address emerging global challenges at the intersection of energy consumption, humidity control, and indoor air quality. Our lab develops non-refrigerant HVAC technologies, high-efficiency membrane systems, and climate-adaptive building strategies that reduce energy demand and enhance environmental health. Through system-level innovation, we aim to contribute to the transition toward sustainable, low-carbon built environments.',
            'research.title': 'Research Areas',
            'research.hvac.title': 'HVAC Systems',
            'research.hvac.copy': 'We create smarter, more comfortable indoor environments through advanced HVAC design and surrogate-model-driven innovation.',
            'research.energy.title': 'Building Energy',
            'research.energy.copy': 'We develop forward-looking strategies that elevate building efficiency and shape the future of sustainable living.',
            'research.humidity.title': 'Dehumidification & Humidity Control',
            'research.humidity.copy': 'We pioneer next-generation humidity-control technologies powered by membrane and liquid-desiccant systems for superior efficiency.',
            'research.showMore': 'Show More Research <i class="fas fa-chevron-down"></i>',
            'research.showLess': 'Show Less Research <i class="fas fa-chevron-up"></i>',
            'detail.membrane.title': 'Membrane-Based Dehumidification Systems',
            'detail.membrane.copy': 'Membrane-based dehumidification technologies represent one of our lab&#8217;s core research directions, aiming to establish high-efficiency and non-refrigerant moisture control solutions for future HVAC systems. As global humidity levels rise and latent loads become increasingly dominant in buildings, traditional cooling-based dehumidification approaches suffer from excessive energy use, deep overcooling, and reheat penalties. To overcome these limitations, our research focuses on selective vapor transport across engineered membranes that allow water vapor to permeate while blocking air and liquid water. We develop and analyze several membrane-driven platforms, including vacuum membrane dehumidification (VMD), cyclic membrane humidity pump systems, and membrane-enhanced DOAS configurations. These systems leverage pressure or concentration gradients as driving forces, minimizing exergy loss and eliminating the need for refrigerants. Beyond energy efficiency, membrane dehumidifiers inherently improve hygienic performance by preventing air&ndash;water contact, thereby reducing microbial transfer risks. Through experiments, theoretical modeling, and system-level integration studies, we work toward scalable membrane-based humidity control technologies that align with the demands of climate-adaptive and low-carbon buildings.',
            'detail.ld.title': 'Liquid Desiccant Air-Conditioning Systems',
            'detail.ld.copy': 'Liquid desiccant (LD) technologies offer an alternative pathway for latent load management using hygroscopic solutions that can absorb moisture efficiently at relatively low temperatures. However, their practical implementation is challenged by solution heating, thermodynamic inefficiencies, and sensitivity to operating conditions. Our lab conducts comprehensive investigations into the heat and mass transfer characteristics of LD systems, including ideal cycle analysis, packed-bed and membrane-type contactor design, and regeneration strategies coupled with heat recovery. We develop experimental platforms that allow for precise measurement of water vapor absorption, solution concentration changes, and thermal performance. By clarifying the mechanisms that limit LD performance and by optimizing flow configurations, heat exchange structures, and operating parameters, our research aims to unlock the potential of LD systems as stable and high-performance components of next-generation HVAC architectures. These advancements also provide strong foundations for hybrid membrane&ndash;LD systems, further enhancing overall system flexibility and energy efficiency.',
            'detail.te.title': 'Thermoelectric Energy Harvesting Systems',
            'detail.te.copy': 'Building environments contain significant amounts of low-grade waste heat&mdash;distributed across HVAC ducts, piping networks, facades, and indoor&ndash;outdoor surfaces&mdash;yet this energy is rarely utilized. Our research on thermoelectric energy harvesting explores the conversion of small temperature gradients into usable electrical power through solid-state thermoelectric generators (TEGs). We design compact and durable TEG modules tailored to building applications, incorporating airflow-assisted cooling, heat spreading structures, and optimized thermal interfaces to enhance power output. These systems enable self-powered operation of distributed sensors, environmental monitoring devices, and micro-scale controllers, supporting the development of energy-autonomous building systems. By characterizing the thermodynamic behavior of TEG devices in realistic HVAC and building conditions, we aim to transform unused thermal losses into functional energy sources, improving resilience, reducing wiring needs, and contributing to integrated smart-building ecosystems.',
            'detail.ieq.title': 'Indoor Environmental Quality: Thermal Comfort and Air Quality',
            'detail.ieq.copy': 'Ensuring healthy and comfortable indoor environments is essential as buildings pursue deeper energy savings and adapt to fluctuating climate conditions. Our lab evaluates indoor environmental quality (IEQ) by integrating thermal comfort assessment, indoor air quality (IAQ) measurement, and exposure-based risk evaluation for emerging HVAC technologies. We analyze how temperature, humidity, airflow, contaminants, and building operation strategies influence human comfort and well-being. In particular, we investigate the hygienic performance of humidification and dehumidification systems by studying microbial transfer, aerosol pathways, and air&ndash;water interaction risks. Membrane-based humidifiers and dehumidifiers, which prevent direct contact between water and air streams, are examined for their potential to eliminate cross-contamination issues and maintain safer indoor conditions. Through quantitative comfort modeling, IAQ monitoring, and coupled HVAC&ndash;occupant interaction studies, our research contributes evidence-based insights into how innovative environmental control technologies can deliver both energy efficiency and enhanced indoor health.',
            'publications.title': 'Publications',
            'publications.journal': '<i class="fas fa-book-open"></i> Journal Papers',
            'publications.conference': '<i class="fas fa-users"></i> Conference Proceedings',
            'publications.moreJournals': 'Show More Journals <i class="fas fa-chevron-down"></i>',
            'publications.lessJournals': 'Show Less Journals <i class="fas fa-chevron-up"></i>',
            'publications.moreProceedings': 'Show More Proceedings <i class="fas fa-chevron-down"></i>',
            'publications.lessProceedings': 'Show Less Proceedings <i class="fas fa-chevron-up"></i>',
            'researcher.title': 'Researcher',
            'researcher.role': 'Research Assistant Professor',
            'researcher.timeline': 'Education & Career Timeline',
            'researcher.expertise': 'Research Expertise',
            'timeline.bs.arch': 'B.S. in Architectural Engineering, Kwangwoon University',
            'timeline.bs.elec': 'Double Major in Electronic Engineering, Kwangwoon University',
            'timeline.phd': 'Ph.D. in Architectural Engineering, Hanyang University',
            'timeline.postdoc.hy': 'Postdoctoral Researcher, Hanyang University',
            'timeline.postdoc.purdue': 'Postdoctoral Research Associate, Purdue University',
            'timeline.rap': 'Research Assistant Professor, Hanyang University',
            'expertise.1': 'Membrane-based humidity control for HVAC applications',
            'expertise.2': 'Refrigerant-free and low-energy HVAC systems',
            'expertise.3': 'Building energy simulation and system optimization',
            'expertise.4': 'Energy recovery, waste heat utilization, and energy harvesting',
            'expertise.5': 'Indoor thermal comfort and air quality',
            'software.title': 'Software & Tools',
            'software.intro': 'A collection of research prototypes and web tools for building simulation, CFD, membrane systems, psychrometrics, data modeling, and optimization.',
            'software.status.soon': '<i class="fas fa-clock"></i> Coming Soon',
            'software.status.beta': '<i class="fas fa-flask"></i> Beta Web App',
            'software.status.local': '<i class="fas fa-wind"></i> Research Prototype',
            'software.status.live': '<i class="fas fa-droplet"></i> Live Web App',
            'software.status.liveChart': '<i class="fas fa-chart-line"></i> Live Web App',
            'software.status.liveModel': '<i class="fas fa-diagram-project"></i> Live Web App',
            'software.building.copy': 'Beta web app for EnergyPlus-based model setup, simulation runs, and energy performance review.',
            'software.cfd.copy': 'A CFD visualization preview for airflow, temperature, humidity, and CO2 distributions.',
            'software.membrane.copy': 'Web configurator for hollow fiber membrane humidifier sizing and performance review.',
            'software.psych.copy': 'Interactive moist-air calculator for state points, properties, and HVAC process paths.',
            'software.modeling.copy': 'DOE/RSM and surrogate modeling workspace for experiment and simulation datasets.',
            'software.optimization.copy': 'Beta web app for general design optimization, parameter studies, and trade-off analysis.',
            'software.details': 'Details',
            'software.viewExample': 'Video Preview',
            'software.launch': 'Launch App',
            'tool.building.text': 'A beta web-based EnergyPlus workspace for building model setup, simulation execution, and energy performance review. It is intended for early testing of browser-based building energy analysis workflows.',
            'tool.cfd.text': 'This 10-second CFD preview visualizes airflow, temperature, humidity, and CO2 distributions from a building HVAC simulation. It helps assess spatial gradients, local non-uniformity, and ventilation behavior.',
            'tool.membrane.text': 'A live web configurator for hollow fiber membrane humidifier systems. It supports specification review and performance calculation from user-defined operating conditions, helping visitors test membrane-based humidification concepts directly.',
            'tool.psych.text': 'A live psychrometric chart tool for moist-air properties, state-point calculation, and HVAC process visualization. It is useful for checking cooling, heating, humidification, and dehumidification paths on an interactive chart.',
            'tool.modeling.text': 'A live data modeling workspace for DOE, RSM, validation, and AI-assisted surrogate modeling. It helps turn experimental or simulation datasets into interpretable predictive models for design and sensitivity studies.',
            'tool.optimization.text': 'A beta general optimization workspace for design variables, constraints, objective functions, and trade-off analysis. It is positioned as a broad optimization tool rather than an HVAC-only application.',
            'contact.title': 'Contact',
            'contact.location': 'Hanyang University, Seoul, South Korea',
            'contact.copy': '<i class="fas fa-copy"></i> Copy Email',
            'contact.copied': '<i class="fas fa-check"></i> Copied',
            'contact.map': '<i class="fas fa-map-location-dot"></i> Open Map',
            'footer.copy': '&copy; 2024 SBES Lab. All rights reserved.',
            'aria.toggleNav': 'Toggle navigation',
            'aria.backTop': 'Back to top',
            'aria.profile': 'Open Seong-Yong Cheon\'s Google Scholar profile'
        },
        ko: {
            'nav.home': '홈',
            'nav.about': '소개',
            'nav.research': '연구',
            'nav.publications': '논문',
            'nav.researcher': '연구자',
            'nav.software': '도구',
            'nav.contact': '연락처',
            'hero.title': '<span class="highlight">지속가능한 건물 에너지 시스템</span>을 연구합니다',
            'hero.copy': '한양대학교 SBES Lab은 건물 에너지, HVAC 시스템, 습도 제어 기술을 중심으로 저에너지·쾌적 실내환경 구현을 연구합니다.',
            'hero.research': '연구 분야',
            'hero.publications': '논문 보기',
            'about.title': '연구실 소개',
            'about.copy': 'SBES Lab은 건물의 에너지 사용을 줄이면서도 쾌적하고 건강한 실내환경을 유지하는 방법을 연구합니다. 비냉매 HVAC, 멤브레인 기반 습도 제어, 기후 대응형 건물 운영 전략을 결합해 저탄소 건축환경에 기여하고자 합니다.',
            'research.title': '연구 분야',
            'research.hvac.title': 'HVAC 시스템',
            'research.hvac.copy': '고급 HVAC 설계와 대체모델 기반 최적화를 결합해 더 쾌적하고 지능적인 실내환경 제어 기술을 개발합니다.',
            'research.energy.title': '건물 에너지',
            'research.energy.copy': '시뮬레이션과 최적화를 바탕으로 건물 에너지 성능을 높이고 저탄소 운영 전략을 제안합니다.',
            'research.humidity.title': '제습 및 습도 제어',
            'research.humidity.copy': '멤브레인과 액체식 제습 기술을 활용해 냉매 사용과 에너지 소비를 줄이는 습도 제어 시스템을 연구합니다.',
            'research.showMore': '연구 자세히 보기 <i class="fas fa-chevron-down"></i>',
            'research.showLess': '연구 접기 <i class="fas fa-chevron-up"></i>',
            'detail.membrane.title': '멤브레인 기반 제습 시스템',
            'detail.membrane.copy': '멤브레인 기반 제습은 SBES Lab의 핵심 연구 주제입니다. 기존 냉각식 제습은 잠열 부하가 커질수록 과냉각, 재열, 높은 에너지 소비가 뒤따릅니다. 본 연구는 공기와 액체 물은 차단하고 수증기만 선택적으로 이동시키는 멤브레인을 활용해 비냉매·고효율 습도 제어 방식을 개발합니다. 진공 멤브레인 제습, cyclic membrane humidity pump, 멤브레인 결합 DOAS 등 다양한 시스템을 모델링, 실험, 시스템 분석으로 검토합니다.',
            'detail.ld.title': '액체식 제습 공조 시스템',
            'detail.ld.copy': '액체식 제습은 흡습성 용액으로 잠열 부하를 처리하는 공조 기술입니다. SBES Lab은 이상 사이클 분석, 접촉기 설계, 열회수 기반 재생 전략을 함께 검토하며 액체식 제습 시스템의 열·물질전달 특성을 정량화합니다. 이를 통해 차세대 HVAC 시스템에 적용할 수 있는 안정적이고 효율적인 제습 방식을 찾고 있습니다.',
            'detail.te.title': '열전 에너지 하베스팅 시스템',
            'detail.te.copy': '건물의 덕트, 배관, 외피, 실내외 표면에는 활용되지 못한 저온 폐열이 남아 있습니다. 본 연구는 열전소자를 이용해 작은 온도 차이를 전기 에너지로 바꾸고, 이를 센서와 모니터링 장치의 자가발전에 활용할 수 있는지 분석합니다.',
            'detail.ieq.title': '실내환경 품질: 열쾌적과 공기질',
            'detail.ieq.copy': '건물의 에너지 절감은 쾌적하고 건강한 실내환경과 함께 검토되어야 합니다. SBES Lab은 열쾌적, 실내공기질, 오염물질 노출, HVAC 운전 전략을 함께 분석해 실내환경 품질을 평가합니다. 특히 가습·제습 시스템에서 발생할 수 있는 위생 문제와 공기-물 접촉 위험을 정량적으로 검토합니다.',
            'publications.title': '논문',
            'publications.journal': '<i class="fas fa-book-open"></i> 저널 논문',
            'publications.conference': '<i class="fas fa-users"></i> 학술대회 발표',
            'publications.moreJournals': '저널 논문 더 보기 <i class="fas fa-chevron-down"></i>',
            'publications.lessJournals': '저널 논문 접기 <i class="fas fa-chevron-up"></i>',
            'publications.moreProceedings': '학술대회 발표 더 보기 <i class="fas fa-chevron-down"></i>',
            'publications.lessProceedings': '학술대회 발표 접기 <i class="fas fa-chevron-up"></i>',
            'researcher.title': '연구자',
            'researcher.role': '한양대학교 연구조교수',
            'researcher.timeline': '학력 및 경력',
            'researcher.expertise': '주요 연구 분야',
            'timeline.bs.arch': '건축공학 학사, 광운대학교',
            'timeline.bs.elec': '전자공학 복수전공, 광운대학교',
            'timeline.phd': '건축공학 박사, 한양대학교',
            'timeline.postdoc.hy': '박사후연구원, 한양대학교',
            'timeline.postdoc.purdue': 'Postdoctoral Research Associate, Purdue University',
            'timeline.rap': '연구조교수, 한양대학교',
            'expertise.1': 'HVAC 시스템을 위한 멤브레인 기반 습도 제어',
            'expertise.2': '비냉매·저에너지 HVAC 시스템',
            'expertise.3': '건물 에너지 시뮬레이션 및 시스템 최적화',
            'expertise.4': '에너지 회수, 폐열 활용 및 에너지 하베스팅',
            'expertise.5': '실내 열쾌적과 공기질',
            'software.title': '소프트웨어 및 도구',
            'software.intro': '건물 시뮬레이션, CFD, 멤브레인 시스템, 습공기 선도, 데이터 모델링, 최적화를 위한 연구용 프로토타입과 웹 도구를 소개합니다.',
            'software.status.soon': '<i class="fas fa-clock"></i> 준비 중',
            'software.status.beta': '<i class="fas fa-flask"></i> 베타 웹 앱',
            'software.status.local': '<i class="fas fa-wind"></i> 로컬 연구 도구',
            'software.status.live': '<i class="fas fa-droplet"></i> 웹 앱',
            'software.status.liveChart': '<i class="fas fa-chart-line"></i> 웹 앱',
            'software.status.liveModel': '<i class="fas fa-diagram-project"></i> 웹 앱',
            'software.building.copy': 'EnergyPlus 기반 모델 설정, 시뮬레이션 실행, 에너지 성능 검토를 지원하는 베타 웹 앱입니다.',
            'software.cfd.copy': '실내 기류, 온도, 습도, CO2 분포를 4분할 영상으로 보여주는 CFD 해석 예시입니다.',
            'software.membrane.copy': '중공사막 멤브레인 가습기의 용량과 성능을 빠르게 검토하는 웹 설계 도구입니다.',
            'software.psych.copy': '상태점, 습공기 물성, HVAC 공정 변화를 대화형 선도에서 계산합니다.',
            'software.modeling.copy': '실험·시뮬레이션 데이터를 바탕으로 DOE/RSM과 surrogate model을 구성하는 도구입니다.',
            'software.optimization.copy': '범용 설계 최적화, 파라미터 연구, trade-off 분석을 지원하는 베타 웹 앱입니다.',
            'software.details': '자세히',
            'software.viewExample': '영상 예시',
            'software.launch': '앱 열기',
            'tool.building.text': '웹에서 건물 모델을 설정하고 EnergyPlus 시뮬레이션 결과를 검토할 수 있는 베타 웹 앱입니다. 브라우저 기반 건물 에너지 해석 워크플로우를 초기 테스트하는 단계입니다.',
            'tool.cfd.text': '건물 HVAC 해석 결과를 10초 길이의 4분할 CFD 영상으로 시각화한 예시입니다. 실내 기류, 온도, 습도, CO2 분포를 함께 보며 공간별 분포, 국부적 불균일성, 환기 거동을 확인할 수 있습니다.',
            'tool.membrane.text': '중공사막 멤브레인 가습기 설계를 웹에서 빠르게 검토하는 도구입니다. 운전 조건을 입력하면 주요 사양과 성능을 계산해 멤브레인 가습 시스템의 적용 가능성을 확인할 수 있습니다.',
            'tool.psych.text': '습공기 물성, 상태점, HVAC 공정 변화를 대화형 선도에서 계산하는 웹 도구입니다. 냉각, 가열, 가습, 제습 과정의 상태 변화를 빠르게 확인할 수 있습니다.',
            'tool.modeling.text': 'DOE, RSM, 검증, AI-assisted surrogate modeling을 지원하는 웹 기반 데이터 모델링 도구입니다. 실험·시뮬레이션 데이터를 예측 모델로 정리해 설계 검토와 민감도 분석에 활용할 수 있습니다.',
            'tool.optimization.text': '설계 변수, 제약조건, 목적함수, trade-off를 함께 다루는 범용 최적화 베타 웹 앱입니다. HVAC에 한정하지 않고 다양한 설계 최적화 문제를 다룰 수 있도록 테스트 중입니다.',
            'contact.title': '연락처',
            'contact.location': '한양대학교, 서울, 대한민국',
            'contact.copy': '<i class="fas fa-copy"></i> 이메일 복사',
            'contact.copied': '<i class="fas fa-check"></i> 복사됨',
            'contact.map': '<i class="fas fa-map-location-dot"></i> 지도 열기',
            'footer.copy': '&copy; 2024 SBES Lab. All rights reserved.',
            'aria.toggleNav': '메뉴 열기',
            'aria.backTop': '맨 위로 이동',
            'aria.profile': 'Seong-Yong Cheon Google Scholar 프로필 열기'
        }
    };

    const localizedTargets = [
        { selector: '.nav-links a[href="#home"]', key: 'nav.home' },
        { selector: '.nav-links a[href="#about"]', key: 'nav.about' },
        { selector: '.nav-links a[href="#research"]', key: 'nav.research' },
        { selector: '.nav-links a[href="#publications"]', key: 'nav.publications' },
        { selector: '.nav-links a[href="#team"]', key: 'nav.researcher' },
        { selector: '.nav-links a[href="#software"]', key: 'nav.software' },
        { selector: '.nav-links a[href="#contact"]', key: 'nav.contact' },
        { selector: '.hero-content h1', key: 'hero.title', html: true },
        { selector: '.hero-content p', key: 'hero.copy' },
        { selector: '.hero-btns .btn-primary', key: 'hero.research' },
        { selector: '.hero-btns .btn-secondary', key: 'hero.publications' },
        { selector: '#about .section-title', key: 'about.title' },
        { selector: '#about .about-text p', key: 'about.copy' },
        { selector: '#research .section-title', key: 'research.title' },
        { selector: '[data-research-target="liquid-desiccant-detail"] h3', key: 'research.hvac.title' },
        { selector: '[data-research-target="liquid-desiccant-detail"] p', key: 'research.hvac.copy' },
        { selector: '[data-research-target="thermoelectric-detail"] h3', key: 'research.energy.title' },
        { selector: '[data-research-target="thermoelectric-detail"] p', key: 'research.energy.copy' },
        { selector: '[data-research-target="membrane-detail"] h3', key: 'research.humidity.title' },
        { selector: '[data-research-target="membrane-detail"] p', key: 'research.humidity.copy' },
        { selector: '#membrane-detail .detailed-text h3', key: 'detail.membrane.title' },
        { selector: '#membrane-detail .detailed-text p', key: 'detail.membrane.copy', html: true },
        { selector: '#liquid-desiccant-detail .detailed-text h3', key: 'detail.ld.title' },
        { selector: '#liquid-desiccant-detail .detailed-text p', key: 'detail.ld.copy', html: true },
        { selector: '#thermoelectric-detail .detailed-text h3', key: 'detail.te.title' },
        { selector: '#thermoelectric-detail .detailed-text p', key: 'detail.te.copy', html: true },
        { selector: '#ieq-detail .detailed-text h3', key: 'detail.ieq.title' },
        { selector: '#ieq-detail .detailed-text p', key: 'detail.ieq.copy', html: true },
        { selector: '#publications .section-title', key: 'publications.title' },
        { selector: '.pub-category:nth-of-type(1) h3', key: 'publications.journal', html: true },
        { selector: '.pub-category:nth-of-type(2) h3', key: 'publications.conference', html: true },
        { selector: '#team .section-title', key: 'researcher.title' },
        { selector: '.team-member > p', key: 'researcher.role' },
        { selector: '.researcher-card:nth-child(1) h3', key: 'researcher.timeline' },
        { selector: '.researcher-card:nth-child(2) h3', key: 'researcher.expertise' },
        { selector: '.timeline-list li:nth-child(1) .timeline-text', key: 'timeline.bs.arch' },
        { selector: '.timeline-list li:nth-child(2) .timeline-text', key: 'timeline.bs.elec' },
        { selector: '.timeline-list li:nth-child(3) .timeline-text', key: 'timeline.phd' },
        { selector: '.timeline-list li:nth-child(4) .timeline-text', key: 'timeline.postdoc.hy' },
        { selector: '.timeline-list li:nth-child(5) .timeline-text', key: 'timeline.postdoc.purdue' },
        { selector: '.timeline-list li:nth-child(6) .timeline-text', key: 'timeline.rap' },
        { selector: '.researcher-card:nth-child(2) .researcher-list li:nth-child(1)', key: 'expertise.1' },
        { selector: '.researcher-card:nth-child(2) .researcher-list li:nth-child(2)', key: 'expertise.2' },
        { selector: '.researcher-card:nth-child(2) .researcher-list li:nth-child(3)', key: 'expertise.3' },
        { selector: '.researcher-card:nth-child(2) .researcher-list li:nth-child(4)', key: 'expertise.4' },
        { selector: '.researcher-card:nth-child(2) .researcher-list li:nth-child(5)', key: 'expertise.5' },
        { selector: '#software .section-title', key: 'software.title' },
        { selector: '.software-heading p', key: 'software.intro' },
        { selector: '[data-tool-card="building"] .software-status', key: 'software.status.beta', html: true },
        { selector: '[data-tool-card="cfd"] .software-status', key: 'software.status.local', html: true },
        { selector: '[data-tool-card="membrane"] .software-status', key: 'software.status.live', html: true },
        { selector: '[data-tool-card="psychrometric"] .software-status', key: 'software.status.liveChart', html: true },
        { selector: '[data-tool-card="modeling"] .software-status', key: 'software.status.liveModel', html: true },
        { selector: '[data-tool-card="optimization"] .software-status', key: 'software.status.beta', html: true },
        { selector: '[data-tool-card="building"] .software-body p', key: 'software.building.copy' },
        { selector: '[data-tool-card="cfd"] .software-body p', key: 'software.cfd.copy' },
        { selector: '[data-tool-card="membrane"] .software-body p', key: 'software.membrane.copy' },
        { selector: '[data-tool-card="psychrometric"] .software-body p', key: 'software.psych.copy' },
        { selector: '[data-tool-card="modeling"] .software-body p', key: 'software.modeling.copy' },
        { selector: '[data-tool-card="optimization"] .software-body p', key: 'software.optimization.copy' },
        { selector: '[data-tool-card="building"] .software-action.primary', key: 'software.launch' },
        { selector: '[data-tool-card="optimization"] .software-action.primary', key: 'software.launch' },
        { selector: '[data-tool-card="cfd"] .software-action.primary', key: 'software.viewExample' },
        { selector: 'button[data-tool-button="building"]', key: 'software.details' },
        { selector: '[data-tool-card="cfd"] button.software-action:not(.primary)', key: 'software.details' },
        { selector: 'button[data-tool-button="membrane"]', key: 'software.details' },
        { selector: 'button[data-tool-button="psychrometric"]', key: 'software.details' },
        { selector: 'button[data-tool-button="modeling"]', key: 'software.details' },
        { selector: 'button[data-tool-button="optimization"]', key: 'software.details' },
        { selector: '[data-tool-card="membrane"] .software-action.primary', key: 'software.launch' },
        { selector: '[data-tool-card="psychrometric"] .software-action.primary', key: 'software.launch' },
        { selector: '[data-tool-card="modeling"] .software-action.primary', key: 'software.launch' },
        { selector: '#contact .section-title', key: 'contact.title' },
        { selector: '.info-item:first-child a', key: 'contact.location' },
        { selector: '[data-copy-email]', key: 'contact.copy', html: true },
        { selector: '.contact-actions a', key: 'contact.map', html: true },
        { selector: 'footer p', key: 'footer.copy', html: true }
    ];

    const localizedAttributes = [
        { selector: '.hamburger', attr: 'aria-label', key: 'aria.toggleNav' },
        { selector: '#back-to-top', attr: 'aria-label', key: 'aria.backTop' },
        { selector: '.profile-link', attr: 'aria-label', key: 'aria.profile' }
    ];

    let currentLang = localStorage.getItem('sbes-lang') === 'ko' ? 'ko' : 'en';

    function i18nValue(key) {
        return I18N[currentLang]?.[key] ?? I18N.en[key] ?? '';
    }

    function setLocalizedElements() {
        localizedTargets.forEach(({ selector, key, html }) => {
            document.querySelectorAll(selector).forEach((element) => {
                if (html) {
                    element.innerHTML = i18nValue(key);
                } else {
                    element.textContent = i18nValue(key);
                }
            });
        });

        localizedAttributes.forEach(({ selector, attr, key }) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.setAttribute(attr, i18nValue(key));
            });
        });
    }

    function setLanguageButtons() {
        document.querySelectorAll('[data-lang]').forEach((button) => {
            const active = button.dataset.lang === currentLang;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function applyLanguage(lang) {
        currentLang = lang === 'ko' ? 'ko' : 'en';
        localStorage.setItem('sbes-lang', currentLang);
        document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
        setLocalizedElements();
        setLanguageButtons();
        updateResearchToggleButton(detailedResearch?.style.display !== 'none');
        if (activeToolKey) {
            renderToolDetail(activeToolKey, false);
        }
        document.dispatchEvent(new CustomEvent('sbes:languagechange', { detail: { lang: currentLang } }));
    }

    window.SBES_I18N = {
        getLang: () => currentLang,
        html: (key) => i18nValue(key),
        applyLanguage
    };

    function setMobileMenu(open) {
        if (!hamburger || !navLinks) return;

        navLinks.classList.toggle('active', open);
        hamburger.classList.toggle('toggle', open);
        hamburger.setAttribute('aria-expanded', String(open));

        navItems.forEach((link, index) => {
            link.style.animation = open ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` : '';
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            setMobileMenu(!navLinks.classList.contains('active'));
        });

        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMobileMenu(!navLinks.classList.contains('active'));
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setMobileMenu(false);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            setMobileMenu(false);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const sections = Array.from(navAnchors)
        .map((anchor) => document.querySelector(anchor.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navAnchors.forEach((anchor) => {
                    const isActive = anchor.getAttribute('href') === `#${entry.target.id}`;
                    anchor.classList.toggle('active', isActive);
                    if (isActive) {
                        anchor.setAttribute('aria-current', 'page');
                    } else {
                        anchor.removeAttribute('aria-current');
                    }
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

        sections.forEach((section) => navObserver.observe(section));
    }

    const showMoreResearchBtn = document.getElementById('show-more-research-btn');
    const detailedResearch = document.getElementById('detailed-research');

    function updateResearchToggleButton(open) {
        if (!showMoreResearchBtn) return;
        showMoreResearchBtn.innerHTML = open ? i18nValue('research.showLess') : i18nValue('research.showMore');
    }

    function setDetailedResearch(open, targetId) {
        if (!showMoreResearchBtn || !detailedResearch) return;

        detailedResearch.style.display = open ? 'block' : 'none';
        updateResearchToggleButton(open);

        if (!open) return;

        const target = targetId ? document.getElementById(targetId) : detailedResearch;
        if (!target) return;

        document.querySelectorAll('.detailed-item.is-targeted').forEach((item) => {
            item.classList.remove('is-targeted');
        });

        target.classList.add('is-targeted');
        setTimeout(() => target.classList.remove('is-targeted'), 1600);
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }

    if (showMoreResearchBtn && detailedResearch) {
        showMoreResearchBtn.addEventListener('click', () => {
            const isClosed = detailedResearch.style.display === 'none';
            setDetailedResearch(isClosed);
            if (!isClosed) {
                document.getElementById('research')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    document.querySelectorAll('[data-research-target]').forEach((card) => {
        const openCardTarget = () => setDetailedResearch(true, card.dataset.researchTarget);

        card.addEventListener('click', openCardTarget);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCardTarget();
            }
        });
    });

    document.querySelectorAll('[data-copy-email]').forEach((button) => {
        const originalText = button.innerHTML;

        button.addEventListener('click', async () => {
            const email = button.dataset.copyEmail;
            if (!email) return;

            try {
                await navigator.clipboard.writeText(email);
            } catch {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }

            button.innerHTML = i18nValue('contact.copied');
            setTimeout(() => {
                button.innerHTML = i18nValue('contact.copy') || originalText;
            }, 1600);
        });
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        const updateBackToTop = () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 500);
        };

        window.addEventListener('scroll', updateBackToTop, { passive: true });
        updateBackToTop();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const toolDetails = {
        building: {
            title: 'Building Simulation Studio',
            image: 'images/software/building-simulation.png',
            statusKey: 'software.status.beta',
            statusClass: 'software-status beta',
            textKey: 'tool.building.text',
            actionType: 'launch',
            href: 'https://bs06012-building-energy-analysis-beta.hf.space/'
        },
        cfd: {
            title: 'CFD Simulation Workbench',
            image: 'images/software/cfd-workbench.png',
            video: 'videos/hvac_cfd_clean_timelapse_4panel_10s.mp4',
            videoResolver: 'SBES_GET_CFD_4PANEL_VIDEO_URL',
            poster: 'images/software/cfd-workbench.png',
            statusKey: 'software.status.local',
            statusClass: 'software-status research',
            textKey: 'tool.cfd.text',
            actionType: 'example'
        },
        membrane: {
            title: 'Membrane Designer',
            image: 'images/software/membrane-designer.png',
            statusKey: 'software.status.live',
            statusClass: 'software-status',
            textKey: 'tool.membrane.text',
            actionType: 'launch',
            href: 'https://webmembranehumidifier.vercel.app/?verify=ux12'
        },
        psychrometric: {
            title: 'Psychrometric Chart',
            image: 'images/software/psychrometric-chart.jpg',
            statusKey: 'software.status.liveChart',
            statusClass: 'software-status',
            textKey: 'tool.psych.text',
            actionType: 'launch',
            href: 'https://psychrometric-chart-web.vercel.app/'
        },
        modeling: {
            title: 'Data Modeling Studio',
            image: 'images/software/data-modeling-studio.jpg',
            statusKey: 'software.status.liveModel',
            statusClass: 'software-status',
            textKey: 'tool.modeling.text',
            actionType: 'launch',
            href: 'https://doe-modeler-ai-demo.vercel.app/'
        },
        optimization: {
            title: 'Optimization Studio',
            image: 'images/software/optimization-studio.png',
            statusKey: 'software.status.beta',
            statusClass: 'software-status beta',
            textKey: 'tool.optimization.text',
            actionType: 'launch',
            href: 'https://data-modeling-studio-optimization-s.vercel.app/'
        }
    };

    function getToolAction(detail) {
        if (detail.actionType === 'launch') {
            return `<a class="software-action primary" href="${detail.href}" rel="noopener" target="_blank">${i18nValue('software.launch')}</a>`;
        }

        if (detail.actionType === 'example') {
            return `<span class="software-action primary"><i class="fas fa-play-circle"></i> ${i18nValue('software.viewExample')}</span>`;
        }

        return `<span class="software-action disabled">${i18nValue('software.status.soon')}</span>`;
    }

    function renderToolDetail(key, shouldScroll = true) {
        const detail = toolDetails[key];
        const detailSection = document.getElementById('tool-detail');
        const detailImg = document.getElementById('tool-detail-img');
        const detailVideo = document.getElementById('tool-detail-video');
        const detailVideoSource = document.getElementById('tool-detail-video-source');
        const detailStatus = document.getElementById('tool-detail-status');
        const detailTitle = document.getElementById('tool-detail-title');
        const detailText = document.getElementById('tool-detail-text');
        const detailActions = document.getElementById('tool-detail-actions');
        if (!detail || !detailSection || !detailImg || !detailStatus || !detailTitle || !detailText || !detailActions) return;

        activeToolKey = key;
        detailSection.hidden = false;
        detailSection.classList.add('is-visible');
        const resolvedVideo = detail.videoResolver && typeof window[detail.videoResolver] === 'function'
            ? window[detail.videoResolver]()
            : detail.video;

        if (resolvedVideo && detailVideo && detailVideoSource) {
            detailImg.hidden = true;
            detailVideo.hidden = false;
            detailVideo.poster = detail.poster || detail.image;
            if (detailVideoSource.getAttribute('src') !== resolvedVideo) {
                detailVideoSource.setAttribute('src', resolvedVideo);
                detailVideo.load();
            }
            detailVideo.play().catch(() => {});
        } else {
            if (detailVideo) {
                detailVideo.pause();
                detailVideo.hidden = true;
            }
            if (detailVideoSource) {
                detailVideoSource.setAttribute('src', '');
            }
            detailImg.hidden = false;
            detailImg.src = detail.image;
            detailImg.alt = `${detail.title} preview`;
        }
        detailStatus.className = detail.statusClass;
        detailStatus.innerHTML = i18nValue(detail.statusKey);
        detailTitle.textContent = detail.title;
        detailText.textContent = i18nValue(detail.textKey);
        detailActions.innerHTML = getToolAction(detail);

        if (shouldScroll) {
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function showToolDetail(key) {
        renderToolDetail(key, true);
    }

    document.querySelectorAll('[data-lang]').forEach((button) => {
        button.addEventListener('click', () => applyLanguage(button.dataset.lang));
    });

    applyLanguage(currentLang);

    document.querySelectorAll('[data-tool-button]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            showToolDetail(button.dataset.toolButton);
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealObserver = !prefersReducedMotion && 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
        : null;

    window.observeReveal = (element) => {
        if (!element) return;
        element.classList.add('reveal');

        if (prefersReducedMotion || !revealObserver) {
            element.classList.add('is-visible');
            return;
        }

        revealObserver.observe(element);
    };

    document.querySelectorAll('.section-title, .about-text, .card, .detailed-item, .team-member, .software-card, .tool-detail, .contact-wrapper')
        .forEach((element) => window.observeReveal(element));
});
