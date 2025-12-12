// publications.js
// Renders Journal Papers and Conference Proceedings from data/publications.json
// Sorting: year DESC, then within_year_order ASC (newest-first within a year)
// No PDF/DOI/Google Scholar links are generated.

document.addEventListener('DOMContentLoaded', async () => {
  const JOURNAL_LIST_ID = 'journal-list';
  const CONF_LIST_ID = 'conf-list';

  const BTN_JOURNAL_ID = 'show-more-journals-btn';
  const BTN_CONF_ID = 'show-more-conf-btn';

  const INITIAL_SHOW_JOURNALS = 3;
  const INITIAL_SHOW_PROCEEDINGS = 3;

  function safeText(s) {
    return (s ?? '').toString();
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

    contentDiv.appendChild(h4);
    contentDiv.appendChild(authors);
    contentDiv.appendChild(venue);

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
    });

    const canToggle = items.length > initialShow;

    if (!buttonEl) return;

    if (!canToggle) {
      buttonEl.style.display = 'none';
      return;
    }

    let expanded = false;

    function apply() {
      nodes.forEach((n, idx) => {
        if (expanded) {
          n.style.display = '';
        } else {
          n.style.display = idx < initialShow ? '' : 'none';
        }
      });
      buttonEl.innerHTML = expanded ? lessLabel : moreLabel;
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
  }

  async function loadData() {
    const res = await fetch('data/publications.json', { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Failed to load data/publications.json (HTTP ${res.status})`);
    }
    return await res.json();
  }

  try {
    const data = await loadData();

    const journalPapers = Array.isArray(data.journal_papers) ? data.journal_papers.slice() : [];
    const proceedings = Array.isArray(data.proceedings) ? data.proceedings.slice() : [];

    journalPapers.sort(sortPubs);
    proceedings.sort(sortPubs);

    const journalContainer = document.getElementById(JOURNAL_LIST_ID);
    const confContainer = document.getElementById(CONF_LIST_ID);

    const btnJournal = document.getElementById(BTN_JOURNAL_ID);
    const btnConf = document.getElementById(BTN_CONF_ID);

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
    // Fail silently in UI, but log for debugging
    console.error(err);
  }
});
