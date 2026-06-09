// publications.js
// Renders Journal Papers and Conference Proceedings from data/publications.json
// Sorting: year DESC, then within_year_order ASC (newest-first within a year)
// Google Scholar links are generated from each title.
// DOI/PDF buttons are shown when doi, url, pdf, or pdf_url fields are provided.

(function loadDesktopMotionScript() {
  if (document.querySelector('script[src*="motion.js"]')) return;

  const script = document.createElement('script');
  script.src = 'motion.js?v=20260609c';
  script.defer = true;
  document.head.appendChild(script);
}());

document.addEventListener('DOMContentLoaded', async () => {
  const JOURNAL_LIST_ID = 'journal-list';
  const CONF_LIST_ID = 'conf-list';

  const BTN_JOURNAL_ID = 'show-more-journals-btn';
  const BTN_CONF_ID = 'show-more-conf-btn';

  const INITIAL_SHOW_JOURNALS = 5;
  const INITIAL_SHOW_PROCEEDINGS = 3;

  const FALLBACK_PUBLICATIONS = {
    journal_papers: [
      {
        year: 2026,
        title: 'Cyclic sweep gas membrane humidity pump for high-efficiency dehumidification with imperfect membranes',
        authors: 'SY Cheon, HJ Cho, MA Rahman, A Fix, DM Warsinger',
        venue: 'Energy Conversion and Management 358, 121471 (IF 10.9, Top 2.34%)',
        within_year_order: 0,
      },
      {
        year: 2026,
        title: 'Membrane-based quasi-isothermal humidifier: Performance characteristics and energy-exergy analysis for HVAC applications',
        authors: 'SY Cheon, HJ Cho, JW Jeong',
        venue: 'Journal of Building Engineering 125, 116139 (IF 7.4, Top 5.46%)',
        within_year_order: 1,
      },
      {
        year: 2026,
        title: 'Energy saving potential of run-around heat recovery coil-assisted air-conditioning system for retrofitted buildings',
        authors: 'HJ Cho, SY Cheon, H Lim',
        venue: 'Applied Thermal Engineering 289, 129785 (IF 6.9, Top 4.95%)',
        within_year_order: 2,
      },
      {
        year: 2026,
        title: 'Performance and sizing of vacuum membrane dehumidification in varied building types and climate zones',
        authors: 'MA Rahman, AJ Fix, J Oh, SY Cheon, HJ Cho, DM Warsinger',
        venue: 'Energy and Buildings 353, 116904',
        within_year_order: 3,
      },
      {
        year: 2026,
        title: 'Experimental performance evaluation of isothermal dehumidification and indirect evaporative cooling-assisted dedicated outdoor air system',
        authors: 'HJ Cho, SY Cheon, K Jang, B Kim, JW Jeong',
        venue: 'Energy Conversion and Management 348, 120715 (IF 10.9, Top 2.34%)',
        within_year_order: 4,
      },
    ],
    proceedings: [
      {
        year: 2025,
        title: 'The Feasibility Study on the Hollow Fiber Membrane Dehumidification System Coupling with Conventional Air Conditioning System',
        authors: 'K Tsuji, G Yoon, HJ Cho, SY Cheon, JW Jeong',
        venue: 'REHVA HVAC World Congress 792-800',
        within_year_order: 0,
      },
      {
        year: 2025,
        title: 'Experimental Investigation of Vacuum-Based Membrane Dehumidification and Evaporative Cooling-Assisted Dedicated Outdoor Air System',
        authors: 'HJ Cho, SY Cheon, JW Jeong',
        venue: 'ASHRAE Transactions 131 (Pt 2), 411-418',
        within_year_order: 1,
      },
    ],
  };

  function safeText(s) {
    return (s ?? '').toString();
  }

  function normalizeDoi(doi) {
    const raw = safeText(doi).trim();
    if (!raw) return '';
    return raw.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  }

  function makeScholarUrl(pub) {
    const query = [pub.title, pub.authors].filter(Boolean).join(' ');
    return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
  }

  function createActionLink({ href, label, iconClass }) {
    const link = document.createElement('a');
    link.className = 'pub-action';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = `<i class="${iconClass}"></i> ${label}`;
    return link;
  }

  function sortPubs(a, b) {
    const ya = Number(a.year ?? 0);
    const yb = Number(b.year ?? 0);
    if (ya !== yb) return yb - ya; // year DESC

    const oa = Number(a.within_year_order ?? 0);
    const ob = Number(b.within_year_order ?? 0);
    if (oa !== ob) return oa - ob; // newest-first within year

    // tie-breaker: title ASC for stability
    return safeText(a.title).localeCompare(safeText(b.title));
  }

  function createPubItem(pub) {
    const item = document.createElement('div');
    item.className = 'pub-item';

    const yearDiv = document.createElement('div');
    yearDiv.className = 'pub-year';
    yearDiv.textContent = pub.year ? String(pub.year) : '';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'pub-content';

    const h4 = document.createElement('h4');
    h4.textContent = safeText(pub.title);

    const authors = document.createElement('p');
    authors.className = 'authors';
    authors.textContent = safeText(pub.authors);

    const venue = document.createElement('p');
    venue.className = 'venue';
    venue.textContent = safeText(pub.venue);

    const actions = document.createElement('div');
    actions.className = 'pub-actions';

    const doi = normalizeDoi(pub.doi);
    const directUrl = safeText(pub.url || pub.link).trim();
    const pdfUrl = safeText(pub.pdf || pub.pdf_url).trim();

    if (directUrl || doi) {
      actions.appendChild(createActionLink({
        href: directUrl || `https://doi.org/${doi}`,
        label: 'Paper',
        iconClass: 'fas fa-arrow-up-right-from-square',
      }));
    }

    actions.appendChild(createActionLink({
      href: makeScholarUrl(pub),
      label: 'Scholar',
      iconClass: 'fas fa-graduation-cap',
    }));

    if (doi) {
      actions.appendChild(createActionLink({
        href: `https://doi.org/${doi}`,
        label: 'DOI',
        iconClass: 'fas fa-link',
      }));
    }

    if (pdfUrl) {
      actions.appendChild(createActionLink({
        href: pdfUrl,
        label: 'PDF',
        iconClass: 'fas fa-file-pdf',
      }));
    }

    contentDiv.appendChild(h4);
    contentDiv.appendChild(authors);
    contentDiv.appendChild(venue);
    contentDiv.appendChild(actions);

    item.appendChild(yearDiv);
    item.appendChild(contentDiv);

    return item;
  }

  function renderWithShowMore({
    containerEl,
    buttonEl,
    items,
    initialShow,
    moreLabel,
    lessLabel,
  }) {
    if (!containerEl) return;

    // Clean container
    containerEl.innerHTML = '';

    // Render all items (we will hide beyond initialShow)
    const nodes = items.map(createPubItem);
    nodes.forEach((n, idx) => {
      if (idx >= initialShow) n.style.display = 'none';
      containerEl.appendChild(n);
      if (window.observeReveal) window.observeReveal(n);
    });

    const canToggle = items.length > initialShow;

    if (!buttonEl) return;

    if (!canToggle) {
      buttonEl.style.display = 'none';
      return;
    }

    let expanded = false;

    function getLabel(key, fallback) {
      return window.SBES_I18N?.html(key) || fallback;
    }

    function apply() {
      nodes.forEach((n, idx) => {
        if (expanded) {
          n.style.display = '';
        } else {
          n.style.display = idx < initialShow ? '' : 'none';
        }
      });
      buttonEl.innerHTML = expanded
        ? getLabel(buttonEl.dataset.lessLabelKey, lessLabel)
        : getLabel(buttonEl.dataset.moreLabelKey, moreLabel);
    }

    // Reset button state
    buttonEl.style.display = '';
    expanded = false;
    apply();

    // Avoid duplicate listeners if script is reloaded
    buttonEl.onclick = () => {
      expanded = !expanded;
      apply();

      // Optional: when expanding, bring the first newly revealed element into view
      if (expanded && nodes[initialShow]) {
        nodes[initialShow].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('sbes:languagechange', apply);
  }

  async function loadData() {
    const res = await fetch('data/publications.json', { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Failed to load data/publications.json (HTTP ${res.status})`);
    }
    return await res.json();
  }

  try {
    const data = await loadData().catch(() => FALLBACK_PUBLICATIONS);

    const journalPapers = Array.isArray(data.journal_papers) ? data.journal_papers.slice() : [];
    const proceedings = Array.isArray(data.proceedings) ? data.proceedings.slice() : [];

    journalPapers.sort(sortPubs);
    proceedings.sort(sortPubs);

    const journalContainer = document.getElementById(JOURNAL_LIST_ID);
    const confContainer = document.getElementById(CONF_LIST_ID);

    const btnJournal = document.getElementById(BTN_JOURNAL_ID);
    const btnConf = document.getElementById(BTN_CONF_ID);

    if (btnJournal) {
      btnJournal.dataset.moreLabelKey = 'publications.moreJournals';
      btnJournal.dataset.lessLabelKey = 'publications.lessJournals';
    }

    if (btnConf) {
      btnConf.dataset.moreLabelKey = 'publications.moreProceedings';
      btnConf.dataset.lessLabelKey = 'publications.lessProceedings';
    }

    renderWithShowMore({
      containerEl: journalContainer,
      buttonEl: btnJournal,
      items: journalPapers,
      initialShow: INITIAL_SHOW_JOURNALS,
      moreLabel: 'Show More Journals <i class="fas fa-chevron-down"></i>',
      lessLabel: 'Show Less Journals <i class="fas fa-chevron-up"></i>',
    });

    renderWithShowMore({
      containerEl: confContainer,
      buttonEl: btnConf,
      items: proceedings,
      initialShow: INITIAL_SHOW_PROCEEDINGS,
      moreLabel: 'Show More Proceedings <i class="fas fa-chevron-down"></i>',
      lessLabel: 'Show Less Proceedings <i class="fas fa-chevron-up"></i>',
    });
  } catch (err) {
    console.error(err);
  }
});
