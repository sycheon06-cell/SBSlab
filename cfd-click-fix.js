(function () {
    'use strict';

    var videoSrcPromise = null;
    var cfdCopy = {
        en: {
            card: 'CFD workflow for visualizing indoor airflow distribution, temperature non-uniformity, and HVAC post-processing.',
            text: 'This example shows a dynamic mixed-plane CFD visualization for building HVAC analysis. The workflow helps review indoor airflow distribution, temperature deviation, and ventilation behavior across occupied zones.',
            status: '<i class="fas fa-wind"></i> Local Research Tool',
            action: '<span class="software-action disabled"><i class="fas fa-desktop"></i> Local Example</span>'
        },
        ko: {
            card: '건물 HVAC 해석에서 실내 기류 분포, 온도 편차, 환기 거동을 시각화하는 CFD 워크플로우입니다.',
            text: '건물 HVAC 해석을 위한 동적 mixed-plane CFD 시각화 예시입니다. 실내 기류 분포, 온도 편차, 환기 거동을 구역별로 확인하고 결과 후처리까지 검토할 수 있도록 구성하고 있습니다.',
            status: '<i class="fas fa-wind"></i> 로컬 연구 도구',
            action: '<span class="software-action disabled"><i class="fas fa-desktop"></i> 로컬 예시</span>'
        }
    };

    function currentLang() {
        return document.documentElement.lang === 'ko' ? 'ko' : 'en';
    }

    function ensureStyle() {
        if (document.getElementById('cfd-click-fix-style')) return;
        var style = document.createElement('style');
        style.id = 'cfd-click-fix-style';
        style.textContent = '.tool-detail-video{width:100%;height:100%;display:block;object-fit:cover;background:#0f172a;border-radius:8px}.tool-detail-image.has-cfd-video img{display:none}.tool-detail-video[hidden]{display:none!important}';
        document.head.appendChild(style);
    }

    function getVideoSrc() {
        if (window.SBES_CFD_VIDEO_SRC) return Promise.resolve(window.SBES_CFD_VIDEO_SRC);
        if (!videoSrcPromise) {
            videoSrcPromise = fetch('cfd-video-patch.js?v=20260612a', { cache: 'force-cache' })
                .then(function (response) { return response.text(); })
                .then(function (text) {
                    var match = text.match(/var\s+CFD_VIDEO_SRC\s*=\s*'([^']+)'/);
                    window.SBES_CFD_VIDEO_SRC = match ? match[1] : '';
                    return window.SBES_CFD_VIDEO_SRC;
                })
                .catch(function () { return ''; });
        }
        return videoSrcPromise;
    }

    function ensureVideoElement(src) {
        var media = document.querySelector('#tool-detail .tool-detail-image');
        if (!media || !src) return null;

        var video = document.getElementById('tool-detail-video');
        if (!video) {
            video = document.createElement('video');
            video.id = 'tool-detail-video';
            video.className = 'tool-detail-video';
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.poster = 'images/software/cfd-workbench.png';
            media.appendChild(video);
        }

        if (video.src !== src) {
            video.src = src;
            video.load();
        }
        return video;
    }

    function updateCfdCardText() {
        var paragraph = document.querySelector('[data-tool-card="cfd"] .software-body p');
        if (paragraph) paragraph.textContent = cfdCopy[currentLang()].card;
    }

    function renderCfdDetail() {
        ensureStyle();
        updateCfdCardText();

        return getVideoSrc().then(function (src) {
            var langCopy = cfdCopy[currentLang()];
            var media = document.querySelector('#tool-detail .tool-detail-image');
            var img = document.getElementById('tool-detail-img');
            var title = document.getElementById('tool-detail-title');
            var text = document.getElementById('tool-detail-text');
            var status = document.getElementById('tool-detail-status');
            var actions = document.getElementById('tool-detail-actions');
            var detail = document.getElementById('tool-detail');
            var video = ensureVideoElement(src);

            if (title) title.textContent = 'CFD Simulation Workbench';
            if (text) text.textContent = langCopy.text;
            if (status) {
                status.className = 'software-status research';
                status.innerHTML = langCopy.status;
            }
            if (actions) actions.innerHTML = langCopy.action;
            if (img) img.hidden = true;
            if (media) media.classList.add('has-cfd-video');
            if (video) {
                video.hidden = false;
                video.play().catch(function () {});
            }
            if (detail && !detail.dataset.cfdScrolled) {
                detail.dataset.cfdScrolled = 'true';
                detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.setTimeout(function () { delete detail.dataset.cfdScrolled; }, 1200);
            }
        });
    }

    function scheduleCfdRender() {
        [0, 80, 250, 650].forEach(function (delay) {
            window.setTimeout(renderCfdDetail, delay);
        });
    }

    document.addEventListener('click', function (event) {
        var cfdTarget = event.target.closest('[data-tool-button="cfd"], [data-tool-card="cfd"]');
        if (!cfdTarget) return;
        scheduleCfdRender();
    }, true);

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var cfdTarget = event.target.closest('[data-tool-button="cfd"], [data-tool-card="cfd"]');
        if (!cfdTarget) return;
        scheduleCfdRender();
    }, true);

    document.addEventListener('DOMContentLoaded', updateCfdCardText);
    updateCfdCardText();
})();
