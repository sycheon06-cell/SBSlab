(function () {
    if (window.SBES_MOTION_INIT) return;

    function initMotion() {
        if (window.SBES_MOTION_INIT) return;
        window.SBES_MOTION_INIT = true;

        const desktopQuery = window.matchMedia('(min-width: 769px)');
        const detailedResearch = document.getElementById('detailed-research');
        const showMoreResearchBtn = document.getElementById('show-more-research-btn');
        const researchSection = document.getElementById('research');
        const toolDetail = document.getElementById('tool-detail');
        const nativeScrollIntoView = Element.prototype.scrollIntoView;
        const nativeScrollTo = window.scrollTo.bind(window);
        let activeScrollFrame = 0;

        function shouldUseDesktopMotion() {
            return desktopQuery.matches;
        }

        function easeScroll(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function maxScrollTop() {
            const doc = document.documentElement;
            return Math.max(0, doc.scrollHeight - window.innerHeight);
        }

        function scrollOffset() {
            return window.innerWidth >= 769 ? 98 : 0;
        }

        function animateScrollTo(targetY, duration = 1240) {
            if (!shouldUseDesktopMotion()) {
                nativeScrollTo(0, targetY);
                return;
            }

            if (activeScrollFrame) {
                window.cancelAnimationFrame(activeScrollFrame);
                activeScrollFrame = 0;
            }

            const startY = window.scrollY || window.pageYOffset || 0;
            const endY = Math.max(0, Math.min(targetY, maxScrollTop()));
            const distance = endY - startY;
            const startTime = window.performance?.now ? window.performance.now() : Date.now();

            if (Math.abs(distance) < 2) return;

            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(1, elapsed / duration);
                const eased = easeScroll(progress);
                nativeScrollTo(0, startY + distance * eased);

                if (progress < 1) {
                    activeScrollFrame = window.requestAnimationFrame(step);
                } else {
                    activeScrollFrame = 0;
                }
            }

            activeScrollFrame = window.requestAnimationFrame(step);
        }

        function scrollToElement(element, options = {}) {
            if (!element) return;

            const block = options.block || 'start';
            const duration = options.duration || (block === 'center' ? 1160 : 1240);
            const rect = element.getBoundingClientRect();
            const currentY = window.scrollY || window.pageYOffset || 0;
            let targetY = rect.top + currentY - scrollOffset();

            if (block === 'center') {
                targetY = rect.top + currentY - (window.innerHeight - rect.height) / 2;
            }

            animateScrollTo(targetY, duration);
        }

        Element.prototype.scrollIntoView = function patchedScrollIntoView(options) {
            if (!shouldUseDesktopMotion()) {
                nativeScrollIntoView.apply(this, arguments);
                return;
            }

            const block = typeof options === 'object' && options ? options.block : 'start';
            scrollToElement(this, { block });
        };

        window.scrollTo = function patchedScrollTo(x, y) {
            if (
                shouldUseDesktopMotion()
                && typeof x === 'object'
                && x
                && x.behavior === 'smooth'
                && typeof x.top === 'number'
            ) {
                animateScrollTo(x.top, 1180);
                return;
            }

            if (typeof x === 'object') {
                nativeScrollTo(x);
                return;
            }

            nativeScrollTo(x, y);
        };

        function currentLanguage() {
            if (window.SBES_I18N?.getLang) return window.SBES_I18N.getLang();
            return document.documentElement.lang === 'ko' ? 'ko' : 'en';
        }

        function researchLabel(open) {
            const isKo = currentLanguage() === 'ko';
            if (isKo) {
                return open
                    ? '연구 상세 접기 <i class="fas fa-chevron-up"></i>'
                    : '연구 상세 보기 <i class="fas fa-chevron-down"></i>';
            }

            return open
                ? 'Show Less Research <i class="fas fa-chevron-up"></i>'
                : 'Show More Research <i class="fas fa-chevron-down"></i>';
        }

        function updateResearchButton(open) {
            if (!showMoreResearchBtn) return;
            showMoreResearchBtn.innerHTML = researchLabel(open);
        }

        function clearResearchTarget() {
            document.querySelectorAll('.detailed-item.is-targeted').forEach((item) => {
                item.classList.remove('is-targeted');
            });
        }

        function emphasizeResearchTarget(target) {
            if (!target) return;
            clearResearchTarget();
            target.classList.add('is-targeted');
            window.setTimeout(() => target.classList.remove('is-targeted'), 2400);
        }

        function setResearchOpen(open, targetId) {
            if (!detailedResearch || !showMoreResearchBtn) return;
            if (!shouldUseDesktopMotion()) return;

            detailedResearch.dataset.motionOpen = String(open);
            detailedResearch.classList.add('desktop-collapsible');
            detailedResearch.style.display = 'block';
            detailedResearch.setAttribute('aria-hidden', String(!open));
            updateResearchButton(open);

            window.requestAnimationFrame(() => {
                detailedResearch.classList.toggle('is-open', open);
            });

            if (!open) {
                clearResearchTarget();
                window.setTimeout(() => {
                    if (detailedResearch.dataset.motionOpen !== 'true') {
                        detailedResearch.style.display = 'none';
                    }
                }, 1000);
                return;
            }

            const target = targetId ? document.getElementById(targetId) : detailedResearch;
            if (targetId) emphasizeResearchTarget(target);

            window.setTimeout(() => {
                scrollToElement(target || detailedResearch, { block: 'start', duration: targetId ? 1320 : 1240 });
            }, 180);
        }

        function syncResearchMotionState() {
            if (!detailedResearch) return;

            if (!shouldUseDesktopMotion()) {
                detailedResearch.classList.remove('desktop-collapsible', 'is-open');
                detailedResearch.removeAttribute('aria-hidden');
                return;
            }

            const isOpen = detailedResearch.style.display !== 'none';
            detailedResearch.dataset.motionOpen = String(isOpen);
            detailedResearch.classList.add('desktop-collapsible');
            detailedResearch.classList.toggle('is-open', isOpen);
            detailedResearch.setAttribute('aria-hidden', String(!isOpen));
            updateResearchButton(isOpen);
        }

        if (showMoreResearchBtn && detailedResearch) {
            showMoreResearchBtn.addEventListener('click', (event) => {
                if (!shouldUseDesktopMotion()) return;

                event.preventDefault();
                event.stopImmediatePropagation();

                const nextOpen = detailedResearch.dataset.motionOpen !== 'true';
                setResearchOpen(nextOpen);

                if (!nextOpen) {
                    window.setTimeout(() => {
                        scrollToElement(researchSection, { block: 'start', duration: 1120 });
                    }, 90);
                }
            }, true);
        }

        document.querySelectorAll('[data-research-target]').forEach((card) => {
            card.addEventListener('click', (event) => {
                if (!shouldUseDesktopMotion()) return;
                if (event.target.closest('a, button')) return;

                event.preventDefault();
                event.stopImmediatePropagation();
                setResearchOpen(true, card.dataset.researchTarget);
            }, true);

            card.addEventListener('keydown', (event) => {
                if (!shouldUseDesktopMotion()) return;
                if (event.key !== 'Enter' && event.key !== ' ') return;

                event.preventDefault();
                event.stopImmediatePropagation();
                setResearchOpen(true, card.dataset.researchTarget);
            }, true);
        });

        function animateToolDetail() {
            if (!shouldUseDesktopMotion() || !toolDetail) return;

            toolDetail.classList.remove('is-ready');
            toolDetail.classList.add('is-updating');
            void toolDetail.offsetWidth;

            window.requestAnimationFrame(() => {
                toolDetail.classList.remove('is-updating');
                toolDetail.classList.add('is-ready');
            });
        }

        document.querySelectorAll('[data-tool-card], [data-tool-button]').forEach((element) => {
            element.addEventListener('click', () => {
                window.setTimeout(animateToolDetail, 0);
            });
        });

        document.addEventListener('sbes:languagechange', () => {
            if (detailedResearch?.dataset.motionOpen === 'true') updateResearchButton(true);
            window.setTimeout(animateToolDetail, 0);
        });

        desktopQuery.addEventListener?.('change', syncResearchMotionState);
        syncResearchMotionState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMotion);
    } else {
        initMotion();
    }
}());
