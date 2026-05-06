// File: src/frontend/components/search-bar.js
import { LitElement, html, css } from 'lit';

export class SearchBar extends LitElement {
  static properties = {
    value: { type: String },
    placeholder: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .search-wrapper {
      position: relative;
      flex: 1;
      max-width: 400px;
    }

    .search-icon {
      position: absolute;
      left: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: var(--fx-text-muted, #94a3b8);
      pointer-events: none;
    }

    input {
      width: 100%;
      padding: 0.625rem 0.75rem 0.625rem 2.75rem;
      border: 1px solid var(--fx-border-color, #e2e8f0);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background: var(--fx-bg-primary, #ffffff);
      transition: all 0.15s ease;
    }

    input:focus {
      outline: none;
      border-color: var(--fx-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--fx-primary-light, #dbeafe);
    }

    input::placeholder {
      color: var(--fx-text-muted, #94a3b8);
    }

    .clear-btn {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: var(--fx-text-muted, #94a3b8);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.15s ease;
    }

    .clear-btn:hover {
      background: var(--fx-bg-tertiary, #f1f5f9);
      color: var(--fx-text-primary, #0f172a);
    }

    .clear-btn svg {
      width: 16px;
      height: 16px;
    }

    .clear-btn[hidden] {
      display: none;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.placeholder = 'Search...';
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('search', {
      detail: { query: this.value }
    }));
  }

  _handleClear() {
    this.value = '';
    this.dispatchEvent(new CustomEvent('search', {
      detail: { query: '' }
    }));
    this.shadowRoot.querySelector('input').focus();
  }

  render() {
    return html`
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._handleInput}
        />
        <button 
          class="clear-btn" 
          ?hidden=${!this.value}
          @click=${this._handleClear}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);