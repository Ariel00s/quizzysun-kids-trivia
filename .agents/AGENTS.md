# Workspace Rules: QuizzySun Kids Trivia

These rules are specific to the `quizzysun-kids-trivia` workspace. All agents working on this codebase must follow these rules without exception.

## Code Style & Implementation Guidelines

* **Bilingual Support (English & Hebrew)**:
  - Support Right-to-Left (RTL) text rendering layout properly when the Hebrew language (`he`) is active.
  - Keep translations in sync across translations files.
  - When calling Gemini APIs, pass bilingual system instructions based on the active user language.

* **Tailwind CSS v4**:
  - Always utilize Tailwind CSS v4 directives inside CSS files. Do not create or edit old Tailwind v3 configuration files.

* **Express & Vite Integration**:
  - The development server runs Vite as middleware within Express. Do not separate them in local runs or dev builds.
  - When making API endpoint modifications in `server.ts`, verify client fetches in React components (`src/components/`) are kept in sync.

* **React 19 Compatibility**:
  - This project uses React 19. Ensure any new npm dependencies are compatible with React 19.
  - If peer dependency conflicts arise (e.g. from `@dotlottie/react-player`), always run or advise running package installations with the `--legacy-peer-deps` flag.
