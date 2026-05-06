// File: src/frontend/components/contact-form.js
import { LitElement, html, css } from 'lit';

export class ContactForm extends LitElement {
  static properties = {
    contact: { type: Object },
    errors: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--fx-text-primary, #0f172a);
      margin-bottom: 0.375rem;
    }

    .required {
      color: var(--fx-error, #ef4444);
    }

    input, select, textarea {
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: 1px solid var(--fx-border-color, #e2e8f0);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-family: inherit;
      transition: all 0.15s ease;
      background: white;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--fx-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--fx-primary-light, #dbeafe);
    }

    input.error, select.error, textarea.error {
      border-color: var(--fx-error, #ef4444);
    }

    input.error:focus, select.error:focus, textarea.error:focus {
      box-shadow: 0 0 0 3px #fee2e2;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    .error-message {
      font-size: 0.75rem;
      color: var(--fx-error, #ef4444);
      margin-top: 0.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 480px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--fx-border-color, #e2e8f0);
    }

    .btn {
      padding: 0.625rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
    }

    .btn-secondary {
      background: var(--fx-bg-tertiary, #f1f5f9);
      color: var(--fx-text-primary, #0f172a);
    }

    .btn-secondary:hover {
      background: var(--fx-border-color, #e2e8f0);
    }

    .btn-primary {
      background: var(--fx-primary-color, #3b82f6);
      color: white;
    }

    .btn-primary:hover {
      background: var(--fx-primary-hover, #2563eb);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .hint {
      font-size: 0.75rem;
      color: var(--fx-text-muted, #94a3b8);
      margin-top: 0.25rem;
    }
  `;

  constructor() {
    super();
    this.contact = null;
    this.errors = {};
    this._formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      category: ''
    };
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('contact') && this.contact) {
      this._formData = { ...this.contact };
    } else if (changedProperties.has('contact') && !this.contact) {
      this._formData = {
        name: '',
        email: '',
        phone: '',
        company: '',
        category: ''
      };
    }
  }

  validate() {
    const errors = {};
    const data = this._formData;

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (data.email && !this._isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (data.phone && !this._isValidPhone(data.phone)) {
      errors.phone = 'Invalid phone format';
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  _isValidPhone(phone) {
    return /^[\d\s\-+()]{7,20}$/.test(phone);
  }

  _handleInput(e) {
    const { name, value } = e.target;
    this._formData = { ...this._formData, [name]: value };
    if (this.errors[name]) {
      this.errors = { ...this.errors, [name]: null };
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;

    this.dispatchEvent(new CustomEvent('submit', {
      detail: this._formData,
      bubbles: true,
      composed: true
    }));
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  render() {
    const { name, email, phone, company, category } = this._formData;
    const categories = ['Work', 'Personal', 'Family', 'Friend', 'Client', 'Other'];

    return html`
      <form @submit=${this._handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label>Name <span class="required">*</span></label>
            <input
              type="text"
              name="name"
              .value=${name || ''}
              class=${this.errors.name ? 'error' : ''}
              placeholder="John Doe"
              @input=${this._handleInput}
            />
            ${this.errors.name ? html`
              <div class="error-message">${this.errors.name}</div>
            ` : ''}
          </div>

          <div class="form-group">
            <label>Category</label>
            <select
              name="category"
              .value=${category || ''}
              @change=${this._handleInput}
            >
              <option value="">Select category...</option>
              ${categories.map(cat => html`
                <option value=${cat} ?selected=${category === cat}>${cat}</option>
              `)}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            .value=${email || ''}
            class=${this.errors.email ? 'error' : ''}
            placeholder="john@example.com"
            @input=${this._handleInput}
          />
          ${this.errors.email ? html`
            <div class="error-message">${this.errors.email}</div>
          ` : ''}
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              .value=${phone || ''}
              class=${this.errors.phone ? 'error' : ''}
              placeholder="+1 (555) 123-4567"
              @input=${this._handleInput}
            />
            ${this.errors.phone ? html`
              <div class="error-message">${this.errors.phone}</div>
            ` : ''}
          </div>

          <div class="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              .value=${company || ''}
              placeholder="Acme Inc."
              @input=${this._handleInput}
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click=${this._handleCancel}>
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            ${this.contact?.id ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('contact-form', ContactForm);