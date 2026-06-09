document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

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

    function setDetailedResearch(open, targetId) {
        if (!showMoreResearchBtn || !detailedResearch) return;

        detailedResearch.style.display = open ? 'block' : 'none';
        showMoreResearchBtn.innerHTML = open
            ? 'Show Less Research <i class="fas fa-chevron-up"></i>'
            : 'Show More Research <i class="fas fa-chevron-down"></i>';

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

            button.innerHTML = '<i class="fas fa-check"></i> Copied';
            setTimeout(() => {
                button.innerHTML = originalText;
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
            status: '<i class="fas fa-clock"></i> Coming Soon',
            statusClass: 'software-status soon',
            text: 'A planned web-based EnergyPlus workspace for building model setup, simulation execution, and energy performance review. The goal is to make simulation workflows easier to repeat, compare, and share from a browser.',
            actions: '<span class="software-action disabled"><i class="fas fa-hourglass-half"></i> Coming Soon</span>'
        },
        cfd: {
            title: 'CFD Simulation Workbench',
            image: 'images/software/cfd-workbench.png',
            status: '<i class="fas fa-wind"></i> Local Research Tool',
            statusClass: 'software-status research',
            text: 'A local OpenFOAM-based workflow for indoor airflow, thermal distribution, ventilation behavior, and HVAC-related flow fields. It focuses on automated case setup, post-processing, and visual outputs that can later be connected to a web interface.',
            actions: '<span class="software-action primary">View Example</span>'
        },
        membrane: {
            title: 'Membrane Designer',
            image: 'images/software/membrane-designer.png',
            status: '<i class="fas fa-droplet"></i> Live Web App',
            statusClass: 'software-status',
            text: 'A live web configurator for hollow fiber membrane humidifier systems. It supports specification review and performance calculation from user-defined operating conditions, helping visitors test membrane-based humidification concepts directly.',
            actions: '<a class="software-action primary" href="https://webmembranehumidifier.vercel.app/?verify=ux12" rel="noopener" target="_blank">Launch App</a>'
        },
        psychrometric: {
            title: 'Psychrometric Chart',
            image: 'images/software/psychrometric-chart.jpg',
            status: '<i class="fas fa-chart-line"></i> Live Web App',
            statusClass: 'software-status',
            text: 'A live psychrometric chart tool for moist-air properties, state-point calculation, and HVAC process visualization. It is useful for checking cooling, heating, humidification, and dehumidification paths on an interactive chart.',
            actions: '<a class="software-action primary" href="https://psychrometric-chart-web.vercel.app/" rel="noopener" target="_blank">Launch App</a>'
        },
        modeling: {
            title: 'Data Modeling Studio',
            image: 'images/software/data-modeling-studio.jpg',
            status: '<i class="fas fa-diagram-project"></i> Live Web App',
            statusClass: 'software-status',
            text: 'A live data modeling workspace for DOE, RSM, validation, and AI-assisted surrogate modeling. It helps turn experimental or simulation datasets into interpretable predictive models for design and sensitivity studies.',
            actions: '<a class="software-action primary" href="https://doe-modeler-ai-demo.vercel.app/" rel="noopener" target="_blank">Launch App</a>'
        },
        optimization: {
            title: 'Optimization Studio',
            image: 'images/software/optimization-studio.png',
            status: '<i class="fas fa-clock"></i> Coming Soon',
            statusClass: 'software-status soon',
            text: 'A planned general optimization workspace for design variables, constraints, objective functions, and trade-off analysis. It is positioned as a broad optimization tool rather than an HVAC-only application.',
            actions: '<span class="software-action disabled"><i class="fas fa-hourglass-half"></i> Coming Soon</span>'
        }
    };

    function showToolDetail(key) {
        const detail = toolDetails[key];
        const detailSection = document.getElementById('tool-detail');
        const detailImg = document.getElementById('tool-detail-img');
        const detailStatus = document.getElementById('tool-detail-status');
        const detailTitle = document.getElementById('tool-detail-title');
        const detailText = document.getElementById('tool-detail-text');
        const detailActions = document.getElementById('tool-detail-actions');
        if (!detail || !detailSection || !detailImg || !detailStatus || !detailTitle || !detailText || !detailActions) return;

        detailImg.src = detail.image;
        detailImg.alt = `${detail.title} preview`;
        detailStatus.className = detail.statusClass;
        detailStatus.innerHTML = detail.status;
        detailTitle.textContent = detail.title;
        detailText.textContent = detail.text;
        detailActions.innerHTML = detail.actions;
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.querySelectorAll('[data-tool-card]').forEach((card) => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a, button')) return;
            showToolDetail(card.dataset.toolCard);
        });
    });

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
