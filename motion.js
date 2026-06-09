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

        function shouldUseDesktopMotion() {
            return desktopQuery.matches;
        }

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
            window.setTimeout(() => target.classList.remove('is-targeted'), 1700);
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
                }, 520);
                return;
            }

            const target = targetId ? document.getElementById(targetId) : detailedResearch;
            if (targetId) emphasizeResearchTarget(target);

            window.setTimeout(() => {
                (target || detailedResearch).scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                        researchSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
