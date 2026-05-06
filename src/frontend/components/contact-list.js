// File: src/frontend/components/contact-list.js
import { LitElement, html, css } from 'lit';
import './contact-card.js';

export class ContactList extends LitElement {
  static properties = {
    contacts: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
    }

    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--fx-bg-primary, #ffffff);
      border-radius: 0.75rem;
      border: 2px dashed var(--fx-border-color, #e2e8f0);
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
      background: var(--fx-bg-tertiary, #f1f5f9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-icon svg {
      width: 40px;
      height: 40px;
      color: var(--fx-text-muted, #94a3b8);
    }

    .empty-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--fx-text-primary, #0f172a);
      margin-bottom: 0.5rem;
    }

    .empty-description {
      color: var(--fx-text-muted, #94a3b8);
      font-size: 0.875rem;
    }
  `;

  constructor() {
    super();
    this.contacts = [];
  }

  render() {
    if (this.contacts.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="empty-title">No contacts found</h3>
          <p class="empty-description">Click "Add Contact" to create your first contact.</p>
        </div>
      `;
    }

    return html`
      <div class="contacts-grid">
        ${this.contacts.map(contact => html`
          <contact-card
            .contact=${contact}
            @edit=${this._handleEdit}
            @delete=${this._handleDelete}
          ></contact-card>
        `)}
      </div>
    `;
  }

  _handleEdit(e) {
    this.dispatchEvent(new CustomEvent('edit', { detail: e.detail }));
  }

  _handleDelete(e) {
    this.dispatchEvent(new CustomEvent('delete', { detail: e.detail }));
  }
}

customElements.define('contact-list', ContactList);