import { fixture, expect, html } from '@open-wc/testing';
import '../src/frontend/kanban-card.js';
import '../src/frontend/kanban-column.js';
import '../src/frontend/kanban-board.js';

describe('Frontend: Lit Kanban Components', () => {
  
  describe('fx-kanban-card', () => {
    it('renders the title property via shadow DOM', async () => {
      const el = await fixture(html`<fx-kanban-card title="Test Task"></fx-kanban-card>`);
      const h4 = el.shadowRoot.querySelector('h4');
      expect(h4.textContent).to.equal('Test Task');
    });
  });

  describe('fx-kanban-column', () => {
    it('renders the column title and nested cards accurately', async () => {
      const mockCards = [
        { id: '1', title: 'Task 1' }, 
        { id: '2', title: 'Task 2' }
      ];
      
      const el = await fixture(html`
        <fx-kanban-column title="To Do" .cards="${mockCards}"></fx-kanban-column>
      `);
      
      const titleEl = el.shadowRoot.querySelector('h3');
      expect(titleEl.textContent).to.equal('To Do');
      
      const cardElements = el.shadowRoot.querySelectorAll('fx-kanban-card');
      expect(cardElements.length).to.equal(2);
      expect(cardElements[0].title).to.equal('Task 1');
    });
  });

});