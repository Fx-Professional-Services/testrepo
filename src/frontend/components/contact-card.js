// File: src/frontend/components/contact-card.js
import { LitElement, html, css } from 'lit';

export class ContactCard extends LitElement {
  static properties = {
    contact: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--fx-bg-primary, #ffffff);
      border-radius: 0.75rem;
      border: 1px solid var(--fx-border-color, #e2e8f0);
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .card:hover {
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      transform: translateY(-2px);
    }

    .card-header {
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--fx-primary-light, #dbeafe);
      color: var(--fx-primary-color, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .avatar.fallback {
      background: var(--fx-bg-tertiary, #f1f5f9);
      color: var(--fx-text-muted, #94a3b8);
      font-size: 1.5rem;
    }

    .contact-info {
      flex: 1;
      min-width: 0;
    }

    .contact-name {
      font-size: 1rem;
      font-weight: 600;
      color: var(--fx-text-primary, #0f172a);
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .contact-company {
      font-size: 0.875rem;
      color: var(--fx-text-secondary, #475569);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-body {
      padding: 0 1.25rem 1.25rem;
    }

    .contact-detail {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      font-size: 0.875rem;
      color: var(--fx-text-secondary, #475569);
    }

    .contact-detail:not(:last-child) {
      border-bottom: 1px solid var(--fx-border-color, #e2e8f0);
    }

    .contact-detail svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--fx-text-muted, #94a3b8);
    }

    .detail-value {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-footer {
      padding: 0.75rem 1.25rem;
      background: var(--fx-bg-secondary, #f8fafc);
      border-top: 1px solid var(--fx-border-color, #e2e8f0);
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .action-btn svg {
      width: 14px;
      height: 14px;
    }

    .btn-edit {
      background: var(--fx-primary-light, #dbeafe);
      color: var(--fx-primary-color, #3b82f6);
    }

    .btn-edit:hover {
      background: var(--fx-primary-color, #3b82f6);
      color: white;
    }

    .btn-delete {
      background: #fee2e2;
      color: var(--fx-error, #ef4444);
    }

    .btn-delete:hover {
      background: var(--fx-error, #ef4444);
      color: white;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-top: 0.5rem;
    }

    .tag {
      display: inline-block;
      padding: 0.125rem 0.5rem;
      background: var(--fx-bg-tertiary, #f1f5f9);
      border-radius: 9999px;
      font-size: 0.6875rem;
      color: var(--fx-text-secondary, #475569);
    }
  `;

  constructor() {
    super();
    this.contact = {};
  }

  getInitials(name) {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  render() {
    const { name, email, phone, company, category } = this.contact;
    
    return html`
      <div class="card">
        <div class="card-header">
          <div class="avatar">${this.getInitials(name)}</div>
          <div class="contact-info">
            <div class="contact-name">${name || 'No name'}</div>
            ${company ? html`<div class="contact-company">${company}</div>` : ''}
          </div>
        </div>

        <div class="card-body">
          ${email ? html`
            <div class="contact-detail">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="detail-value">${email}</span>
            </div>
          ` : ''}
          
          ${phone ? html`
            <div class="contact-detail">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="detail-value">${phone}</span>
            </div>
          ` : ''}

          ${category ? html`
            <div class="tags">
              <span class="tag">${category}</span>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <button class="action-btn btn-edit" @click=${this._handleEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button class="action-btn btn-delete" @click=${this._handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    `;
  }

  _handleEdit() {
    this.dispatchEvent(new CustomEvent('edit', { 
      detail: { contact: this.contact } 
    }));
  }

  _handleDelete() {
    this.dispatchEvent(new CustomEvent('delete', { 
      detail: { id: this.contact.id } 
    }));
  }
}

customElements.define('contact-card', ContactCard);