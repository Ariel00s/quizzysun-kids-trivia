# Agent Reference Guide: QuizzySun - Kids Trivia

Welcome! This document provides an overview of the QuizzySun Kids Trivia application, its architecture, integration details, local development setup, deployment workflow, and guidelines for AI agents working on this codebase.

---

## 1. Project Overview

**QuizzySun - Kids Trivia** is an interactive, educational trivia application designed for kids. It features bilingual (Hebrew and English) narration and gameplay, customizable profiles with camera capture, responsive 3D mascots (using Three.js), a progress-tracking badge system, and multiple gameplay modes (Single Player, Versus Mode).

### Tech Stack
* **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Motion (framer-motion), Three.js
* **Backend**: Express (Node.js) acting as a proxy for the Gemini APIs
* **Language**: TypeScript
* **Package Manager**: Bun (lockfile `bun.lock` exists) / NPM fallback

---

## 2. Architecture & File Structure

The project follows a standard client-server architecture. In development, Vite runs as a middleware inside the Express server (`server.ts`). In production, the static files are compiled into `dist/`, and Express serves them while exposing the API endpoints.

### Key Directory Layout
```text
├── assets/                 # Static visual assets
├── dist/                   # Compiled production build (frontend + server)
├── src/                    # Frontend source code
│   ├── components/         # React Components
│   │   ├── AICreativityHub.tsx   # Custom avatar/music generator hub
│   │   ├── BadgeBook.tsx         # User badges view
│   │   ├── CameraCapture.tsx     # Captures profile pictures
│   │   ├── Leaderboard.tsx       # Players score board
│   │   ├── MainMenu.tsx          # Initial entry screen
│   │   ├── QuestionVisual.tsx    # Graphic render for trivia questions
│   │   ├── QuizView.tsx          # Single-player trivia screen
│   │   ├── ThreeMascot.tsx       # 3D character renderer (Three.js)
│   │   ├── VersusQuizView.tsx    # Competitive split/turns trivia screen
│   │   └── VictoryView.tsx       # End-of-game overview
│   ├── gk_5_7.ts           # Trivia questions for ages 5-7
│   ├── gk_8_13.ts          # Trivia questions for ages 8-13
│   ├── gk_13_plus.ts       # Trivia questions for ages 13+
│   ├── types.ts            # Type definitions (Player, Question, etc.)
│   ├── main.tsx            # React application entrypoint
│   └── index.css           # Tailwind CSS imports & global styles
├── server.ts               # Express backend proxy for Google Gemini APIs
├── package.json            # Node dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 3. Gemini API Integrations (Backend Proxy)

The Express server (`server.ts`) handles API calls to Google GenAI. All requests require `GEMINI_API_KEY` to be set.

### Endpoints

#### 1. Explain Topic (`POST /api/gemini/explain`)
Provides educational, child-friendly explanations for questions using search-grounded answers.
* **Model**: `gemini-3.5-flash`
* **Features**: Google Search Grounding (`tools: [{ googleSearch: {} }]`).
* **Request Payload**:
  ```json
  {
    "questionText": "Why is the sky blue?",
    "context": "General Science question for ages 8-13",
    "language": "en" // or "he"
  }
  ```
* **Response**: Returns simple kid-friendly markdown text along with reference grounding sources (`sources` array).

#### 2. Generate Avatar Image (`POST /api/gemini/generate-image`)
Generates profile images and customized avatars.
* **Model**: `gemini-3.1-flash-image`
* **Request Payload**:
  ```json
  {
    "prompt": "A cute cartoon baby sun smiling, vibrant, child style",
    "imageSize": "1K",
    "aspectRatio": "1:1"
  }
  ```
* **Response**: Returns a Base64-encoded PNG image URI: `data:image/png;base64,...`.

#### 3. Generate Background Music (`POST /api/gemini/generate-music`)
Generates simple background synthesizer loops for gameplay.
* **Model**: `lyria-3-clip-preview` or `lyria-3-pro-preview`
* **Request Payload**:
  ```json
  {
    "prompt": "Upbeat children game toy synthesizer background music track, 30 seconds",
    "trackType": "short" // or "long"
  }
  ```
* **Response**: Returns Base64-encoded audio data, mimeType, and optionally generated lyrics.

---

## 4. Local Development

### 1. Installation
Install dependencies using `npm` with legacy peer dependency resolution due to React 19 peer constraints:
```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables
Copy `.env.example` to `.env` (or `.env.local`) and add your Gemini API Key:
```env
GEMINI_API_KEY=your-gemini-api-key-here
```

### 3. Run Development Server
Spins up both the Vite middleware and the Express routes on port `3000`:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Run Production Locally
```bash
npm run build
npm start
```

---

## 5. Deployment Guide (Free Hosting: Render)

To deploy the app to **Render** for free testing:

1. **Connect GitHub**: Connect your repository `Ariel00s/quizzysun-kids-trivia` to Render as a **Web Service**.
2. **Configure Settings**:
   * **Runtime**: `Node`
   * **Build Command**: `npm install --legacy-peer-deps && npm run build`
   * **Start Command**: `npm start`
3. **Environment Variables**:
   * Add `GEMINI_API_KEY` under the **Environment** tab in Render dashboard.
   * Add `NODE_ENV` = `production`
4. **Deploy**: Render will automatically build the React assets, bundle the Express server, and serve it. Note that Render's free tier spins down after 15 minutes of inactivity.

---

## 6. Guidelines for AI Agents

When modifying this repository, adhere to the following rules:

1. **Bilingual Support (English & Hebrew)**:
   * Maintain text rendering for RTL (Right-to-Left) languages when language is Hebrew (`he`).
   * Translate system instructions passed to Gemini APIs (`server.ts` checks `language === "he"`).
2. **Tailwind CSS v4**:
   * Do not use older v3 config styles. Tailwind CSS v4 relies on CSS variables and inline directive integration.
3. **Keep APIs Synchronized**:
   * If you modify API contracts in `server.ts`, ensure you update the fetch handlers in [QuizView.tsx](file:///Users/arielmoyal/Downloads/quizzysun---kids-trivia/src/components/QuizView.tsx) and [AICreativityHub.tsx](file:///Users/arielmoyal/Downloads/quizzysun---kids-trivia/src/components/AICreativityHub.tsx).
4. **Preserve Legacy Peer Deps**:
   * Always guide the user to install packages with `--legacy-peer-deps` due to the `@dotlottie/react-player` package conflict with React 19.
