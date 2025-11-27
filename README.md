# Project Structure

This project is now split into two deployable parts:

- `frontend/` – Vite + React application (moved from the root `src`, `public`, etc.).
- `backend/` – Existing Express API (`server.js`, `orderModel.js`, etc.).

```
my-project-app/
├── backend/
│   ├── server.js
│   ├── orderModel.js
│   ├── package.json
│   └── ...
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## Running locally

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run start
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Run both servers simultaneously for a full-stack experience.
