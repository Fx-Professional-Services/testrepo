# FX Contact Manager

A modern contact management application built with **Lit** web components and **Node.js/Express** backend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Lit 3.x (Web Components) |
| Backend | Express.js |
| Styling | CSS Variables + Shadow DOM |
| Data Storage | JSON File |

## Features

- ✅ **Create** new contacts with validation
- ✅ **Read** contacts with search & filtering
- ✅ **Update** existing contact details
- ✅ **Delete** contacts with confirmation
- ✅ **Search** by name, email, phone, or company
- ✅ **Category** tagging (Work, Personal, Family, etc.)
- ✅ **Responsive** design for all screen sizes
- ✅ **Audit logging** for all operations

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone and install dependencies
npm install

# Start both frontend and backend
npm run dev
```

This will start:
- Frontend dev server: http://localhost:3000
- Backend API: http://localhost:4000

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers concurrently |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Project Structure

```
├── src/
│   ├── frontend/
│   │   ├── components/
│   │   │   ├── app-root.js      # Main application shell
│   │   │   ├── contact-list.js # Grid display of contacts
│   │   │   ├── contact-card.js # Individual contact display
│   │   │   ├── contact-form.js # Add/edit form
│   │   │   └── search-bar.js   # Search input
│   │   ├── styles/
│   │   │   └── theme.css       # Global theme variables
│   │   └── index.html
│   └── backend/
│       ├── server.js           # Express entry point
│       ├── routes/
│       │   └── contacts.js     # REST API routes
│       ├── middleware/
│       │   └── errorHandler.js # Error handling
│       └── data/
│           └── contacts.json   # Data storage
├── package.json
└── vite.config.js
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | List all contacts |
| GET | `/api/contacts/:id` | Get single contact |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |

### Request Body (POST/PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Inc",
  "category": "Work"
}
```

## Architecture

- **Frontend**: Lit components with Shadow DOM for encapsulation
- **Backend**: RESTful API with Express.js middleware
- **Validation**: Server-side validation with try-catch blocks
- **Logging**: Audit trail with timestamps for all CRUD operations
- **Error Handling**: Centralized error middleware (401, 429, 500)

---

Built with **FX Framework** standards: reusable Lit components + Express.js middleware.