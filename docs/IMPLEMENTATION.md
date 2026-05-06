# Kanban Board Implementation Documentation

## Overview
This repository contains a full-stack Kanban board module. It embraces a decoupled architecture:
1. **Frontend:** Built with native Web Components using Lit (`lit.dev`).
2. **Backend:** Powered by Node.js and Express, heavily relying on middleware for structural integrity.

## Architecture & Logic Flow

### 1. Backend (Express.js)
The backend acts strictly as an API service.
*   **File:** `src/backend/server.js`
*   **Middleware (`apiMiddleware`):** Every API request must pass through this layer. It enforces:
    *   **Audit Logging:** Logs timestamp, method, URL, and status.
    *   **Auth (401):** Rejects requests missing the `Bearer fx-token`.
    *   **Rate Limiting (429):** Rejects requests where `x-rate-limit: exceeded`.
*   **Wrapper Logic:** Route handlers are wrapped in `try-catch` to guarantee that unexpected errors trigger a safe `500` JSON response rather than crashing the node process.

### 2. Frontend (Lit Components)
The UI is composed of three hierarchical, atomic Web Components. All data is passed downwards using Lit's `@property`.

*   **`<fx-kanban-board>`**: The parent container. Orchestrates the `fetch` call to the backend. Injects data downward.
*   **`<fx-kanban-column>`**: Receives a `cards` array and dynamically maps over it to render individual card elements. Uses `<slot>` to allow external DOM injection if needed.
*   **`<fx-kanban-card>`**: The lowest-level atomic element. Receives a pure string for rendering text.

### 3. Theming (CSS Variables)
All components utilize standard CSS variables to allow external host-level theming without breaking Shadow DOM encapsulation.

**Available Custom Properties:**
*   `--fx-primary-color`: Primary accent color (default: `#0052cc`)
*   `--fx-font-family`: System font stack (default: `sans-serif`)
*   `--fx-board-bg`: Main background (default: `#ffffff`)
*   `--fx-column-bg`: Column background (default: `#f4f5f7`)
*   `--fx-card-bg`: Card background (default: `#ffffff`)
*   `--fx-text-primary`: Standard text color (default: `#333333`)
*   `--fx-border-color`: Structural borders (default: `#e0e0e0`)

## Quick Start Setup
1.  **Install Dependencies:** `npm install express lit @open-wc/testing supertest`
2.  **Start API:** `node src/backend/server.js`
3.  **Run Tests:** Utilize `@web/test-runner` for frontend and `jest` for backend.