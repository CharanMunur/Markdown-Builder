# Markdown Builder

A learning project for editing Markdown with a live preview and basic document actions.

## Features
- Monaco editor with Markdown syntax.
- Live preview with GitHub-style Markdown rendering.
- Top bar actions: Reset, Copy, Export to PDF (via Print.js), Sync Scroll toggle, Theme toggle.
- Default editor content loaded from `src/assets/markdown.md`.

## Getting Started
1. Install dependencies.
2. Run the dev server.

```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` Start the dev server.
- `npm run build` Build for production.
- `npm run preview` Preview the production build locally.

## Project Structure
- `src/App.jsx` App shell and state.
- `src/components/editor/EditorPane.jsx` Monaco editor pane.
- `src/components/preview/PreviewPane.jsx` Markdown preview pane.
- `src/components/header/TopBar.jsx` Toolbar actions and toggles.
- `src/components/export/HandleExport.jsx` PDF export using Print.js.
- `src/providers/theme/theme-provider.jsx` Theme handling.
- `src/assets/markdown.md` Default Markdown content.
