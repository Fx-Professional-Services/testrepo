import { LitElement, html, css } from 'lit';
import './kanban-card.js';

export class KanbanColumn extends LitElement {
  static get properties() {
    return {
      columnId: { type: String },
      title: { type: String },
      cards: { type: Array }
    };
  }

  constructor() {
    super();
    this.cards = [];
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        background-color: var(--fx-column-bg, #f4f5f7);
        border-radius: 6px;
        width: 300px;
        padding: 10px;
        margin: 0 10px;
        font-family: var(--fx-font-family, sans-serif);
      }

      h3 {
        margin-top: 0;
        color: var(--fx-primary-color, #0052cc);
        font-size: 1.1rem;
      }

      .card-container {
        flex-grow: 1;
        min-height: 50px;
      }
    `;
  }

  render() {
    return html`
      <h3>${this.title}</h3>
      <div class="card-container">
        ${this.cards.map(card => html`
          <fx-kanban-card .cardId="${card.id}" .title="${card.title}"></fx-kanban-card>
        `)}
        <slot></slot>
      </div>
    `;
  }
}
customElements.define('fx-kanban-column', KanbanColumn);