(function () {
    'use strict';

    var CFD_VIDEO_SRC = 'data:video/mp4;base64,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';
    var activeTool = null;

    var copy = {
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

    function injectStyle() {
        if (document.getElementById('cfd-video-patch-style')) return;
        var style = document.createElement('style');
        style.id = 'cfd-video-patch-style';
        style.textContent = '.tool-detail-video{width:100%;height:100%;display:block;object-fit:cover;background:#0f172a;border-radius:8px}.tool-detail-image.has-cfd-video img{display:none}.tool-detail-video[hidden]{display:none!important}';
        document.head.appendChild(style);
    }

    function updateCardText() {
        var paragraph = document.querySelector('[data-tool-card="cfd"] .software-body p');
        if (paragraph) paragraph.textContent = copy[currentLang()].card;
    }

    function ensureVideo() {
        var media = document.querySelector('#tool-detail .tool-detail-image');
        if (!media) return null;
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
        if (video.src !== CFD_VIDEO_SRC) {
            video.src = CFD_VIDEO_SRC;
            video.load();
        }
        return video;
    }

    function hideVideo() {
        var media = document.querySelector('#tool-detail .tool-detail-image');
        var img = document.getElementById('tool-detail-img');
        var video = document.getElementById('tool-detail-video');
        activeTool = null;
        if (video) {
            video.pause();
            video.hidden = true;
        }
        if (img) img.hidden = false;
        if (media) media.classList.remove('has-cfd-video');
    }

    function renderCfdDetail() {
        var media = document.querySelector('#tool-detail .tool-detail-image');
        var img = document.getElementById('tool-detail-img');
        var title = document.getElementById('tool-detail-title');
        var text = document.getElementById('tool-detail-text');
        var status = document.getElementById('tool-detail-status');
        var actions = document.getElementById('tool-detail-actions');
        var video = ensureVideo();
        var langCopy = copy[currentLang()];

        activeTool = 'cfd';
        updateCardText();
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
    }

    function wireCfdPatch() {
        injectStyle();
        updateCardText();

        document.querySelectorAll('[data-tool-card="cfd"], [data-tool-button="cfd"]').forEach(function (el) {
            el.addEventListener('click', function () {
                setTimeout(renderCfdDetail, 80);
            });
        });

        document.querySelectorAll('[data-tool-card]:not([data-tool-card="cfd"]), [data-tool-button]:not([data-tool-button="cfd"])').forEach(function (el) {
            el.addEventListener('click', function () {
                setTimeout(hideVideo, 80);
            });
        });

        document.querySelectorAll('.lang-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                setTimeout(function () {
                    updateCardText();
                    if (activeTool === 'cfd') renderCfdDetail();
                }, 120);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireCfdPatch);
    } else {
        wireCfdPatch();
    }
})();
