import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface CardProps {
  href: string;
  title: string;
  content: string;
  image: string;
  textColor: string;
  backgroundColor: string;
  height: string;
}

const cardTemplate = (props: CardProps) => {
  const cardImageHTML =
    props.image === ''
      ? ''
      : html`<img
          src="${props.image}"
          class="card-image"
          alt="${props.title}"
        />`;
  return html`
    <a
      href="${props.href}"
      class="card"
      style="background-color: ${props.backgroundColor}; color: ${props.textColor}; height: ${props.height}"
    >
      ${cardImageHTML}
      <h2 class="card-title">${props.title}</h2>
      <p class="card-body">${props.content}</p>
    </a>
  `;
};

const cardStyles = css`
  .card {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 10px 24px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px var(--color-shadow1);
    transition: var(--transition-focus);
    text-decoration: none;
    border: 1px solid var(--color-gray1);
  }

  .card:hover {
    transform: var(--transition-hover);
    box-shadow: var(--box-shadow2);
  }

  .card > .card-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .card > .card-body {
    font-size: 1rem;
  }

  .card > .card-image {
    width: 100%;
    height: 60vh;
    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
  }

  :host {
    display: inline-block;
    width: auto;
  }
`;

@customElement('app-card')
class Card extends LitElement {
  @property({ type: String })
  href: string = '';

  @property({ type: String })
  cardTextColor: string = '';

  @property({ type: String })
  cardBackground: string = '';

  @property({ type: String })
  cardTitle: string = '';

  @property({ type: String })
  cardContent: string = '';

  @property({ type: String })
  cardImage: string = '';

  @property({ type: String })
  cardHeight: string = '';

  render() {
    const cardProps = {
      href: this.href,
      title: this.cardTitle,
      content: this.cardContent,
      image: this.cardImage,
      textColor: this.cardTextColor,
      backgroundColor: this.cardBackground,
      height: this.cardHeight,
    };
    return cardTemplate(cardProps);
  }

  static styles = cardStyles;
}
