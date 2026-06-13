(function () {
    'use strict';

    document.documentElement.dataset.cfdClickFix = 'ready';
    let cfdFrameTimer = null;

    function stopCfdFrameAnimation() {
        if (!cfdFrameTimer) return;
        window.clearInterval(cfdFrameTimer);
        cfdFrameTimer = null;
    }

    function startCfdFrameAnimation(image) {
        const frames = window.SBES_CFD_PREVIEW_FRAMES;
        if (!Array.isArray(frames) || frames.length === 0 || !image) return false;

        stopCfdFrameAnimation();
        let frameIndex = 0;
        image.src = frames[frameIndex];
        cfdFrameTimer = window.setInterval(() => {
            const section = document.getElementById('tool-detail');
            if (!section?.classList.contains('sbes-cfd-active')) {
                stopCfdFrameAnimation();
                return;
            }

            frameIndex = (frameIndex + 1) % frames.length;
            image.src = frames[frameIndex];
        }, 500);

        return true;
    }

    function ensureCfdMediaStyle() {
        if (document.getElementById('sbes-cfd-detail-style')) return;

        const style = document.createElement('style');
        style.id = 'sbes-cfd-detail-style';
        style.textContent = [
            '#tool-detail.sbes-cfd-video-active .tool-detail-image { position: relative; aspect-ratio: 16 / 9; }',
            '#tool-detail.sbes-cfd-video-active #tool-detail-img { display: block !important; opacity: 1 !important; width: 100%; max-width: 100%; aspect-ratio: 16 / 9; object-fit: contain; border-radius: 8px; }',
            '#tool-detail.sbes-cfd-video-active #tool-detail-video { display: block !important; position: absolute; inset: 0; width: 100%; height: 100%; max-width: 100%; aspect-ratio: 16 / 9; object-fit: contain; border-radius: 8px; background: #fff; }',
            '#tool-detail.sbes-cfd-image-active #tool-detail-img { display: block !important; opacity: 1 !important; width: 100%; max-width: 100%; aspect-ratio: 16 / 9; object-fit: contain; border-radius: 8px; }',
            '#tool-detail.sbes-cfd-image-active #tool-detail-video { display: none !important; }'
        ].join('\n');
        document.head.appendChild(style);
    }

    const COPY = {
        en: {
            intro: 'A collection of research prototypes and web tools for building simulation, CFD, membrane systems, psychrometrics, data modeling, and optimization.',
            card: 'A CFD visualization preview for airflow, temperature, humidity, and CO2 distributions.',
            status: '<i class="fas fa-wind"></i> Research Prototype',
            action: '<i class="fas fa-play-circle"></i> Video Preview',
            detailText: 'This 10-second CFD preview visualizes airflow, temperature, humidity, and CO2 distributions from a building HVAC simulation. It helps assess spatial gradients, local non-uniformity, and ventilation behavior.'
        },
        ko: {
            intro: '건물 시뮬레이션, CFD, 멤브레인 시스템, 습공기 선도, 데이터 모델링, 최적화를 위한 연구용 프로토타입과 웹 도구를 소개합니다.',
            card: '실내 기류, 온도, 습도, CO2 분포를 4분할 영상으로 보여주는 CFD 해석 예시입니다.',
            status: '<i class="fas fa-wind"></i> 연구용 프로토타입',
            action: '<i class="fas fa-play-circle"></i> 영상 예시',
            detailText: '건물 HVAC 해석 결과를 10초 길이의 4분할 CFD 영상으로 시각화한 예시입니다. 실내 기류, 온도, 습도, CO2 분포를 함께 보며 공간별 분포, 국부적 불균일성, 환기 거동을 확인할 수 있습니다.'
        }
    };

    function currentLang() {
        const activeButton = document.querySelector('[data-lang].active');
        return activeButton && activeButton.dataset.lang === 'ko' ? 'ko' : 'en';
    }

    function getVideoUrl() {
        const directVideo = 'videos/hvac_cfd_clean_timelapse_4panel_10s_embed_480.mp4?v=20260613a';

        if (window.SBES_CFD_VIDEO_SRC) {
            if (window.SBES_CFD_VIDEO_SRC.startsWith('data:video/mp4;base64,')) {
                if (window.SBES_CFD_VIDEO_BLOB_URL) return window.SBES_CFD_VIDEO_BLOB_URL;

                const encoded = window.SBES_CFD_VIDEO_SRC.split(',')[1];
                const binary = atob(encoded);
                const bytes = new Uint8Array(binary.length);
                for (let index = 0; index < binary.length; index += 1) {
                    bytes[index] = binary.charCodeAt(index);
                }
                window.SBES_CFD_VIDEO_BLOB_URL = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
                return window.SBES_CFD_VIDEO_BLOB_URL;
            }

            return window.SBES_CFD_VIDEO_SRC;
        }

        if (typeof window.SBES_GET_CFD_4PANEL_VIDEO_URL === 'function') {
            return window.SBES_GET_CFD_4PANEL_VIDEO_URL();
        }

        if (!window.SBES_DISABLE_DIRECT_CFD_VIDEO) {
            return directVideo;
        }

        return directVideo;
    }

    function replaceCfdVideoNode(video, source, videoUrl) {
        if (!video || !source) return { video, source };

        const currentKey = video.dataset.sbesCfdVideoKey;
        const nextKey = `${videoUrl.length}:${videoUrl.slice(0, 24)}:${videoUrl.slice(-24)}`;
        if (currentKey === nextKey && source.getAttribute('src') === videoUrl) {
            return { video, source };
        }

        const freshVideo = document.createElement('video');
        freshVideo.id = 'tool-detail-video';
        freshVideo.className = 'tool-detail-video';
        freshVideo.controls = true;
        freshVideo.muted = true;
        freshVideo.loop = true;
        freshVideo.playsInline = true;
        freshVideo.preload = 'auto';
        freshVideo.hidden = true;
        freshVideo.dataset.sbesCfdVideoKey = nextKey;

        const freshSource = document.createElement('source');
        freshSource.id = 'tool-detail-video-source';
        freshSource.type = 'video/mp4';
        freshSource.setAttribute('src', videoUrl);
        freshVideo.appendChild(freshSource);

        video.replaceWith(freshVideo);
        return { video: freshVideo, source: freshSource };
    }

    function ensureVideoNodes() {
        let video = document.getElementById('tool-detail-video');
        let source = document.getElementById('tool-detail-video-source');
        const image = document.getElementById('tool-detail-img');

        if (!video && image?.parentElement) {
            video = document.createElement('video');
            video.id = 'tool-detail-video';
            video.className = 'tool-detail-video';
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.hidden = true;

            source = document.createElement('source');
            source.id = 'tool-detail-video-source';
            source.type = 'video/mp4';
            video.appendChild(source);
            image.insertAdjacentElement('afterend', video);
        } else if (video && !source) {
            source = document.createElement('source');
            source.id = 'tool-detail-video-source';
            source.type = 'video/mp4';
            video.appendChild(source);
        }

        return { video, source };
    }

    function updateCfdCardCopy() {
        const copy = COPY[currentLang()];
        const intro = document.querySelector('.software-heading p');
        const card = document.querySelector('[data-tool-card="cfd"]');
        const cardText = card && card.querySelector('.software-body p');
        const status = card && card.querySelector('.software-status');
        const primaryAction = card && card.querySelector('.software-action.primary');

        if (intro) intro.textContent = copy.intro;
        if (cardText) cardText.textContent = copy.card;
        if (status) status.innerHTML = copy.status;
        if (primaryAction) primaryAction.innerHTML = copy.action;
    }

    function renderCfdDetail(shouldScroll) {
        const copy = COPY[currentLang()];
        const section = document.getElementById('tool-detail');
        const image = document.getElementById('tool-detail-img');
        let { video, source } = ensureVideoNodes();
        const status = document.getElementById('tool-detail-status');
        const title = document.getElementById('tool-detail-title');
        const text = document.getElementById('tool-detail-text');
        const actions = document.getElementById('tool-detail-actions');

        if (!section || !video || !source || !status || !title || !text || !actions) return;

        ensureCfdMediaStyle();
        section.classList.add('sbes-cfd-active');
        section.classList.remove('sbes-cfd-video-active', 'sbes-cfd-image-active');

        if (Array.isArray(window.SBES_CFD_PREVIEW_FRAMES) && image) {
            section.classList.add('sbes-cfd-image-active');
            image.alt = 'Animated CFD preview showing airflow, temperature, CO2, and humidity fields';
            image.hidden = false;
            startCfdFrameAnimation(image);

            video.pause();
            video.hidden = true;
            source.removeAttribute('src');
            video.removeAttribute('src');
            video.load();
        } else if (window.SBES_CFD_ANIMATED_PREVIEW_SRC && image) {
            section.classList.add('sbes-cfd-image-active');
            image.src = window.SBES_CFD_ANIMATED_PREVIEW_SRC;
            image.alt = 'Animated CFD preview showing airflow, temperature, CO2, and humidity fields';
            image.hidden = false;

            video.pause();
            video.hidden = true;
            source.removeAttribute('src');
            video.removeAttribute('src');
            video.load();
        } else {
            section.classList.add('sbes-cfd-video-active');
            const videoUrl = getVideoUrl();
            ({ video, source } = replaceCfdVideoNode(video, source, videoUrl));
            if (image) {
                image.hidden = false;
                image.src = window.SBES_CFD_POSTER_SRC || 'images/software/cfd-workbench.png';
                image.alt = 'CFD preview poster showing airflow, temperature, CO2, and humidity fields';
            }

            video.hidden = false;
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.poster = window.SBES_CFD_POSTER_SRC || '';

            if (source.getAttribute('src') !== videoUrl) {
                source.setAttribute('src', videoUrl);
                video.load();
            }

            video.play().catch(() => {});
        }

        status.className = 'software-status research';
        status.innerHTML = copy.status;
        title.textContent = 'CFD Simulation Workbench';
        text.textContent = copy.detailText;
        actions.innerHTML = `<span class="software-action primary">${copy.action}</span>`;

        if (shouldScroll) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function scheduleStaticUpdates() {
        [0, 40, 160, 500].forEach((delay) => {
            window.setTimeout(updateCfdCardCopy, delay);
        });
    }

    function scheduleDetailRender(shouldScroll) {
        [0, 40, 160, 500].forEach((delay) => {
            window.setTimeout(() => renderCfdDetail(shouldScroll), delay);
        });
    }

    document.addEventListener('click', (event) => {
        document.documentElement.dataset.cfdLastClick = event.target?.tagName || 'unknown';
        const cfdButton = event.target.closest('[data-tool-button="cfd"]');
        const cfdCard = event.target.closest('[data-tool-card="cfd"]');
        const otherTool = event.target.closest('[data-tool-button], [data-tool-card]');

        if (otherTool && !cfdButton && !cfdCard) {
            document.getElementById('tool-detail')?.classList.remove('sbes-cfd-active');
            stopCfdFrameAnimation();
        }

        if (!cfdButton && !cfdCard) return;
        document.documentElement.dataset.cfdClickMatched = 'yes';
        if (event.target.closest('a')) return;

        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();

        updateCfdCardCopy();
        renderCfdDetail(true);
        scheduleDetailRender(true);
    }, true);

    document.querySelectorAll('[data-lang]').forEach((button) => {
        button.addEventListener('click', () => {
            scheduleStaticUpdates();
            if (document.getElementById('tool-detail-title')?.textContent.trim() === 'CFD Simulation Workbench') {
                scheduleDetailRender(false);
            }
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleStaticUpdates);
    } else {
        scheduleStaticUpdates();
    }
})();
