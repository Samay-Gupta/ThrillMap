import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ListDataElement {
  href: string;
  imageURL: string;
  name: string;
  description: string;
}

interface ListFilter {
  filter: string;
  sort: string;
}

const listElement = (data: ListDataElement) => {
  return html`
    <a href="${data.href}" class="list-info">
      <img src="../..${data.imageURL}" class="list-image" />
      <div class="list-container">
        <h3>${data.name}</h3>
        <p>${data.description}</p>
      </div>
    </a>
  `;
};

const listFilter = (updateFilter: any) => {
  return html`
    <div class="list-filter">
      <input
        type="text"
        placeholder="Filter"
        name="filter"
        @input=${updateFilter}
        class="input-filter"
      />
      <select name="sort" @change=${updateFilter} class="select-filter">
        <option value="lexicographical">Auto</option>
        <option value="alphabetical">A-Z</option>
        <option value="alphabetical-reverse">Z-A</option>
      </select>
    </div>
  `;
};

const filterResponse = (filter: ListFilter, listData: ListDataElement[]) => {
  let filteredList: ListDataElement[] = [];
  if (filter.filter) {
    filteredList = listData.filter(data =>
      data.name.toLowerCase().includes(filter.filter.toLowerCase())
    );
    listData.map(data => {
      if (
        !data.name.toLowerCase().includes(filter.filter.toLowerCase()) &&
        data.description.toLowerCase().includes(filter.filter.toLowerCase())
      ) {
        filteredList.push(data);
      }
    });
  } else {
    filteredList = listData.slice();
  }
  if (filter.sort) {
    if (filter.sort.startsWith('alphabetical')) {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (filter.sort.endsWith('reverse')) {
      filteredList.reverse();
    }
  }
  return filteredList;
};

const listTemplate = (
  listTitle: string,
  listData: ListDataElement[],
  filter: ListFilter,
  updateFilter: any
) => {
  let listTitlehtml = listTitle
    ? html`<div class="list-title">${listTitle}</div>`
    : '';
  let filteredList = filterResponse(filter, listData);
  return html`
    <div class="list">
      ${listTitlehtml} ${listFilter(updateFilter)}
      ${filteredList.map(data => listElement(data))}
    </div>
  `;
};

const listStyles = css`
  .list-title {
    font-size: 2em;
    color: var(--color-gray2);
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }

  .list {
    width: 80vw;
    margin: auto;
    padding: 15px;
  }

  .list-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid var(color-gray1);
    border-radius: 8px;
    background-color: var(--color-background-secondary);
    text-decoration: none;
    color: var(--color-gray2);
    box-shadow: 0 2px 4px var(--color-shadow1);
    transition:
      box-shadow 0.3s ease,
      transform 0.2s ease;
  }

  .list-image {
    width: 150px;
    height: auto;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 5px;
  }

  .list-container {
    display: flex;
    flex-direction: column;
  }

  .list-info h3 {
    margin-bottom: 10px;
  }

  .list-info p {
    color: #666;
  }

  .list-info:hover {
    box-shadow: var(--box-shadow2);
    transform: var(--transition-hover);
  }

  .list-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: var(--color-background-secondary);
    box-shadow: 0 2px 4px var(--color-shadow1);
  }

  .input-filter {
    font-size: 1.2em;
    min-width: 30vw;
    padding: 5px 10px;
    border: 1px solid var(--color-gray1);
    border-radius: 10px;
    outline: none;
    background-color: var(--color-background-primary);
  }

  .input-filter:focus {
    border-color: var(--color-primary);
  }

  .select-filter {
    padding: 8px 24px 8px 12px;
    border: 1px solid var(--color-gray1);
    border-radius: 10px;
    outline: none;
    min-width: 5vw;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: color(--color-secondary);
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-gray2);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="%23333" d="M6.5,7.5l3.5,3.5l3.5,-3.5l2.5,2.5l-6,6l-6,-6l2.5,-2.5Z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px 12px;
    background-color: var(--color-background-primary);
  }

  .select-filter:focus {
    border-color: var(--color-primary);
  }
`;

@customElement('app-list')
class List extends LitElement {
  @property({ type: String })
  listTitle = '';

  @property({ type: Array })
  listData: ListDataElement[];

  @property({ type: Object, reflect: true })
  filter: ListFilter = {
    filter: '',
    sort: 'lexicographical',
  };

  constructor() {
    super();
    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const value =
      target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;
    this.filter = { ...this.filter, [name]: value };
    this.requestUpdate();
  }

  render() {
    return listTemplate(
      this.listTitle,
      this.listData ?? [],
      this.filter,
      this.updateFilter
    );
  }

  static styles = listStyles;
}
