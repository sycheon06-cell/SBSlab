(function () {
    'use strict';

    var videoUrlPromise = null;
    var videoBlobUrl = '';

    var cfdCopy = {
        en: {
            card: 'CFD workflow for visualizing indoor airflow distribution, temperature non-uniformity, and HVAC post-processing.',
            text: 'This example shows a dynamic mixed-plane CFD visualization for building HVAC analysis. The workflow helps review indoor airflow distribution, temperature deviation, and ventilation behavior across occupied zones.',
            status: '<i class="fas fa-wind"></i> Local Research Tool',
            action: '<span class="software-action disabled"><i class="fas fa-desktop"></i> Local Example</span>',
            play: 'Play CFD video'
        },
        ko: {
            card: '건물 HVAC 해석에서 실내 기류 분포, 온도 편차, 환기 거동을 시각화하는 CFD 워크플로우입니다.',
            text: '건물 HVAC 해석을 위한 동적 mixed-plane CFD 시각화 예시입니다. 실내 기류 분포, 온도 편차, 환기 거동을 구역별로 확인하고 결과 후처리까지 검토할 수 있도록 구성하고 있습니다.',
            status: '<i class="fas fa-wind"></i> 로컬 연구 도구',
            action: '<span class="software-action disabled"><i class="fas fa-desktop"></i> 로컬 예시</span>',
            play: 'CFD 영상 재생'
        }
    };

    function currentLang() {
        return document.documentElement.lang === 'ko' ? 'ko' : 'en';
    }

    function requestText(url) {
        if (window.fetch) {
            return fetch(url, { cache: 'reload' }).then(function (response) {
                return response.text();
            });
        }

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () { resolve(xhr.responseText || ''); };
            xhr.onerror = reject;
            xhr.send();
        });
    }

    function extractVideoData(text) {
        var match = text.match(/var\s+CFD_VIDEO_SRC\s*=\s*'(data:video\/mp4;base64,([^']+))'/);
        return {
            dataUri: match ? match[1] : '',
            base64: match ? match[2] : ''
        };
    }

    function base64ToBlobUrl(base64) {
        if (!base64 || !window.atob || !window.Blob || !window.URL || !URL.createObjectURL) return '';

        var binary = window.atob(base64);
        var chunks = [];
        var chunkSize = 8192;

        for (var offset = 0; offset < binary.length; offset += chunkSize) {
            var slice = binary.slice(offset, offset + chunkSize);
            var bytes = new Uint8Array(slice.length);
            for (var i = 0; i < slice.length; i += 1) {
                bytes[i] = slice.charCodeAt(i);
            }
            chunks.push(bytes);
        }

        return URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
    }

    function getVideoSrc() {
        if (videoBlobUrl) return Promise.resolve(videoBlobUrl);
        if (window.SBES_CFD_BLOB_VIDEO_SRC) return Promise.resolve(window.SBES_CFD_BLOB_VIDEO_SRC);
        if (videoUrlPromise) return videoUrlPromise;

        videoUrlPromise = requestText('cfd-video-patch.js?v=20260612a')
            .then(function (text) {
                var parsed = extractVideoData(text);
                var blobSrc = base64ToBlobUrl(parsed.base64);
                window.SBES_CFD_BLOB_VIDEO_SRC = blobSrc || parsed.dataUri || '';
                videoBlobUrl = window.SBES_CFD_BLOB_VIDEO_SRC;
                return videoBlobUrl;
            })
            .catch(function () { return ''; });

        return videoUrlPromise;
    }

    function ensureStyle() {
        if (document.getElementById('cfd-click-fix-style')) return;
        var style = document.createElement('style');
        style.id = 'cfd-click-fix-style';
        style.textContent = [
            '.tool-detail-image{position:relative}',
            '.tool-detail-video{width:100%;height:100%;display:block;object-fit:cover;background:#0f172a;border-radius:8px}',
            '.tool-detail-image.has-cfd-video img{display:none}',
            '.tool-detail-video[hidden]{display:none!important}',
            '.cfd-play-hint{position:absolute;left:16px;bottom:16px;z-index:2;display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.58);background:rgba(15,23,42,.72);color:#fff;font-size:13px;font-weight:700;backdrop-filter:blur(6px);cursor:pointer}',
            '.cfd-play-hint[hidden]{display:none!important}',
            '@media (max-width:768px){.cfd-play-hint{left:12px;bottom:12px;font-size:12px;padding:8px 10px}}'
        ].join('');
        document.head.appendChild(style);
    }

    function updateCfdCardText() {
        var paragraph = document.querySelector('[data-tool-card="cfd"] .software-body p');
        if (paragraph) paragraph.textContent = cfdCopy[currentLang()].card;
    }

    function ensurePlayHint(media, video) {
        var hint = document.getElementById('cfd-play-hint');
        if (!hint) {
            hint = document.createElement('button');
            hint.id = 'cfd-play-hint';
            hint.type = 'button';
            hint.className = 'cfd-play-hint';
            media.appendChild(hint);
            hint.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                video.play().then(function () {
                    hint.hidden = true;
                }).catch(function () {
                    hint.hidden = false;
                });
            });
        }
        hint.innerHTML = '<i class="fas fa-play"></i><span>' + cfdCopy[currentLang()].play + '</span>';
        return hint;
    }

    function ensureVideoElement(src) {
        var media = document.querySelector('#tool-detail .tool-detail-image');
        if (!media || !src) return null;

        var video = document.getElementById('tool-detail-video');
        if (!video) {
            video = document.createElement('video');
            video.id = 'tool-detail-video';
            video.className = 'tool-detail-video';
            media.appendChild(video);
        }

        video.controls = true;
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.preload = 'auto';
        video.poster = 'images/software/cfd-workbench.png';

        if (video.src !== src) {
            video.src = src;
            video.load();
        }

        return video;
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

            if (video && media) {
                var hint = ensurePlayHint(media, video);
                video.hidden = false;
                hint.hidden = true;

                video.play().then(function () {
                    hint.hidden = true;
                }).catch(function () {
                    hint.hidden = false;
                });
            }

            if (detail && !detail.dataset.cfdScrolled) {
                detail.dataset.cfdScrolled = 'true';
                detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.setTimeout(function () { delete detail.dataset.cfdScrolled; }, 1200);
            }
        });
    }

    function scheduleCfdRender() {
        [0, 100, 350, 850, 1600].forEach(function (delay) {
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

    window.SBES_RENDER_CFD_DETAIL = renderCfdDetail;
})();
