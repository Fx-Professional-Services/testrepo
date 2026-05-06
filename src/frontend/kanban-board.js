import { LitElement, html, css } from 'lit';
import './kanban-column.js';

export class KanbanBoard extends LitElement {
  static get properties() {
    return {
      columns: { type: Array },
      apiUrl: { type: String }
    };
  }

  constructor() {
    super();
    this.columns = [];
    this.apiUrl = '/api/kanban';
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchBoardData();
  }

  async fetchBoardData() {
    try {
      const response = await fetch(this.apiUrl, {
        headers: { 'Authorization': 'Bearer fx-token' }
      });
      
      if (response.status === 401) throw new Error('401 Unauthorized');
      if (response.status === 429) throw new Error('429 Rate Limit Exceeded');
      if (!response.ok) throw new Error('Failed to fetch board data');
      
      const data = await response.json();
      this.columns = data.columns || [];
    } catch (error) {
      console.error(`[${new Date().toISOString()}] | Fetch Board Data | ERROR: ${error.message}`);
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 20px;
        background-color: var(--fx-board-bg, #ffffff);
        overflow-x: auto;
        min-height: 100vh;
      }
    `;
  }

  render() {
    return html`
      ${this.columns.map(col => html`
        <fx-kanban-column 
          .columnId="${col.id}" 
          .title="${col.title}" 
          .cards="${col.cards}">
        </fx-kanban-column>
      `)}
      <slot></slot>
    `;
  }
}
customElements.define('fx-kanban-board', KanbanBoard);