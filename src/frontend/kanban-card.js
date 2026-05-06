import { LitElement, html, css } from 'lit';

export class KanbanCard extends LitElement {
  static get properties() {
    return {
      cardId: { type: String },
      title: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--fx-card-bg, #ffffff);
        border: 1px solid var(--fx-border-color, #e0e0e0);
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 8px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: box-shadow 0.2s ease;
      }
      
      :host(:hover) {
        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
      }

      h4 {
        margin: 0 0 8px 0;
        color: var(--fx-text-primary, #333333);
        font-family: var(--fx-font-family, sans-serif);
      }
    `;
  }

  render() {
    return html`
      <h4>${this.title}</h4>
      <slot></slot>
    `;
  }
}
customElements.define('fx-kanban-card', KanbanCard);