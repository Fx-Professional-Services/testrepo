// File: src/frontend/components/app-root.js
import { LitElement, html, css } from 'lit';
import './contact-list.js';
import './contact-form.js';
import './search-bar.js';

export class AppRoot extends LitElement {
  static properties = {
    contacts: { type: Array },
    searchQuery: { type: String },
    showForm: { type: Boolean },
    editingContact: { type: Object },
    loading: { type: Boolean },
    error: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .header {
      background: var(--fx-bg-primary, #ffffff);
      border-bottom: 1px solid var(--fx-border-color, #e2e8f0);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--fx-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--fx-text-primary, #0f172a);
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: var(--fx-primary-color, #3b82f6);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .stats {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--fx-primary-color, #3b82f6);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--fx-text-muted, #94a3b8);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .error-toast {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      background: var(--fx-error, #ef4444);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--fx-border-color, #e2e8f0);
      border-top-color: var(--fx-primary-color, #3b82f6);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 500;
      padding: 1rem;
    }

    .modal-content {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--fx-text-muted, #94a3b8);
      padding: 0.25rem;
      line-height: 1;
    }

    .close-btn:hover {
      color: var(--fx-text-primary, #0f172a);
    }
  `;

  constructor() {
    super();
    this.contacts = [];
    this.searchQuery = '';
    this.showForm = false;
    this.editingContact = null;
    this.loading = false;
    this.error = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadContacts();
  }

  async loadContacts() {
    this.loading = true;
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to load contacts');
      this.contacts = await response.json();
    } catch (err) {
      this.showError(err.message);
    } finally {
      this.loading = false;
    }
  }

  async handleSearch(e) {
    this.searchQuery = e.detail.query;
  }

  handleAddNew() {
    this.editingContact = null;
    this.showForm = true;
  }

  handleEdit(e) {
    this.editingContact = e.detail.contact;
    this.showForm = true;
  }

  handleFormClose() {
    this.showForm = false;
    this.editingContact = null;
  }

  async handleFormSubmit(e) {
    const contactData = e.detail;
    this.loading = true;
    
    try {
      const url = this.editingContact 
        ? `/api/contacts/${this.editingContact.id}` 
        : '/api/contacts';
      const method = this.editingContact ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save contact');
      }

      await this.loadContacts();
      this.handleFormClose();
    } catch (err) {
      this.showError(err.message);
    } finally {
      this.loading = false;
    }
  }

  async handleDelete(e) {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    this.loading = true;
    try {
      const response = await fetch(`/api/contacts/${e.detail.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete contact');
      await this.loadContacts();
    } catch (err) {
      this.showError(err.message);
    } finally {
      this.loading = false;
    }
  }

  showError(message) {
    this.error = message;
    setTimeout(() => { this.error = null; }, 3000);
  }

  get filteredContacts() {
    if (!this.searchQuery) return this.contacts;
    const query = this.searchQuery.toLowerCase();
    return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.phone?.includes(query) ||
      contact.company?.toLowerCase().includes(query)
    );
  }

  render() {
    return html`
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <div class="logo-icon">FX</div>
            <h1>Contact Manager</h1>
          </div>
          <button class="btn btn-primary" @click=${this.handleAddNew}>
            <span>+</span> Add Contact
          </button>
        </div>
      </header>

      <main class="main-content">
        <div class="toolbar">
          <search-bar 
            @search=${this.handleSearch}
            placeholder="Search contacts..."
          ></search-bar>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${this.contacts.length}</div>
              <div class="stat-label">Total</div>
            </div>
            <div class="stat">
              <div class="stat-value">${this.filteredContacts.length}</div>
              <div class="stat-label">Showing</div>
            </div>
          </div>
        </div>

        <contact-list
          .contacts=${this.filteredContacts}
          @edit=${this.handleEdit}
          @delete=${this.handleDelete}
        ></contact-list>
      </main>

      ${this.loading ? html`
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      ` : ''}

      ${this.error ? html`
        <div class="error-toast">${this.error}</div>
      ` : ''}

      ${this.showForm ? html`
        <div class="modal-backdrop" @click=${(e) => e.target === e.currentTarget && this.handleFormClose()}>
          <div class="modal-content">
            <div class="modal-header">
              <h2>${this.editingContact ? 'Edit Contact' : 'New Contact'}</h2>
              <button class="close-btn" @click=${this.handleFormClose}>&times;</button>
            </div>
            <contact-form
              .contact=${this.editingContact}
              @submit=${this.handleFormSubmit}
              @cancel=${this.handleFormClose}
            ></contact-form>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('app-root', AppRoot);