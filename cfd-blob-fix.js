(function () {
    'use strict';

    var blobUrlPromise = null;
    var blobUrl = '';

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

    function extractVideoBase64(text) {
        var match = text.match(/var\s+CFD_VIDEO_SRC\s*=\s*'data:video\/mp4;base64,([^']+)'/);
        return match ? match[1] : '';
    }

    function base64ToBlobUrl(base64) {
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

    function getBlobVideoUrl() {
        if (blobUrl) return Promise.resolve(blobUrl);
        if (blobUrlPromise) return blobUrlPromise;

        blobUrlPromise = requestText('cfd-video-patch.js?v=20260612a')
            .then(function (text) {
                var base64 = extractVideoBase64(text);
                if (!base64) return '';
                blobUrl = base64ToBlobUrl(base64);
                return blobUrl;
            })
            .catch(function () { return ''; });

        return blobUrlPromise;
    }

    function ensureStyle() {
        if (document.getElementById('cfd-blob-fix-style')) return;
        var style = document.createElement('style');
        style.id = 'cfd-blob-fix-style';
        style.textContent = [
            '.tool-detail-image{position:relative}',
            '.tool-detail-video{width:100%;height:100%;display:block;object-fit:cover;background:#0f172a;border-radius:8px}',
            '.tool-detail-image.has-cfd-video img{display:none}',
            '.tool-detail-video[hidden]{display:none!important}',
            '.cfd-play-hint{position:absolute;left:16px;bottom:16px;z-index:2;display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.55);background:rgba(15,23,42,.7);color:#fff;font-size:13px;font-weight:700;backdrop-filter:blur(6px);cursor:pointer}',
            '.cfd-play-hint[hidden]{display:none!important}',
            '@media (max-width:768px){.cfd-play-hint{left:12px;bottom:12px;font-size:12px;padding:8px 10px}}'
        ].join('');
        document.head.appendChild(style);
    }

    function ensurePlayHint(media, video) {
        var hint = document.getElementById('cfd-play-hint');
        if (!hint) {
            hint = document.createElement('button');
            hint.id = 'cfd-play-hint';
            hint.type = 'button';
            hint.className = 'cfd-play-hint';
            hint.innerHTML = '<i class="fas fa-play"></i><span>Play CFD video</span>';
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
        return hint;
    }

    function patchVideoElement() {
        ensureStyle();

        return getBlobVideoUrl().then(function (src) {
            var media = document.querySelector('#tool-detail .tool-detail-image');
            if (!media || !src) return false;

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

            var img = document.getElementById('tool-detail-img');
            if (img) img.hidden = true;
            media.classList.add('has-cfd-video');
            video.hidden = false;

            var hint = ensurePlayHint(media, video);
            hint.hidden = true;

            video.play().then(function () {
                hint.hidden = true;
            }).catch(function () {
                hint.hidden = false;
            });

            return true;
        });
    }

    function isCfdDetailVisible() {
        var title = document.getElementById('tool-detail-title');
        return title && title.textContent.trim() === 'CFD Simulation Workbench';
    }

    function schedulePatch() {
        [0, 120, 400, 900, 1600].forEach(function (delay) {
            window.setTimeout(function () {
                if (isCfdDetailVisible()) patchVideoElement();
            }, delay);
        });
    }

    document.addEventListener('click', function (event) {
        if (event.target.closest('[data-tool-button="cfd"], [data-tool-card="cfd"]')) {
            schedulePatch();
        }
    }, true);

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (event.target.closest('[data-tool-button="cfd"], [data-tool-card="cfd"]')) {
            schedulePatch();
        }
    }, true);

    document.addEventListener('DOMContentLoaded', function () {
        if (isCfdDetailVisible()) schedulePatch();
    });

    window.SBES_PATCH_CFD_BLOB_VIDEO = patchVideoElement;
})();
