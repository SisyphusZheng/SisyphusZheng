type SearchRecord = {
  title: string;
  body: string;
  href: string;
  type: string;
  tags: string[];
};

export const tagName = 'site-search';

export default class SiteSearch extends HTMLElement {
  #records: SearchRecord[] = [];
  #input: HTMLInputElement | null = null;
  #results: HTMLElement | null = null;

  connectedCallback() {
    this.#records = JSON.parse(this.dataset.records ?? '[]') as SearchRecord[];
    this.#input = this.querySelector('input');
    this.#results = this.querySelector('[data-results]');
    this.#input?.addEventListener('input', () => this.#render());
    this.#render();
  }

  #render() {
    if (!this.#results) return;
    const query = this.#input?.value.trim().toLowerCase() ?? '';
    const matches = query
      ? this.#records.filter((record) =>
        [record.title, record.body, record.type, ...record.tags].join(' ').toLowerCase().includes(
          query,
        )
      )
      : this.#records;

    this.#results.innerHTML = matches.slice(0, 12).map((record) => (
      `<a class="result" href="${record.href}">
        <span>${record.type}</span>
        <strong>${record.title}</strong>
        <small>${record.body}</small>
      </a>`
    )).join('');
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, SiteSearch);
}
