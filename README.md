# SketchFlow Spec — Real Time Architecture Parsing Assistant

SketchFlow Spec is a developer-focused web app that analyzes system diagrams, whiteboard sketches, and flowcharts to produce structured architecture, security findings, specification markdown, and next-step recommendations. It includes a React + Vite frontend and an Express TypeScript backend that integrates with the Gemini Vision API (when configured).

**Live demo link:** https://sketchflow-ai-570104455079.asia-southeast1.run.app


**Built with:** Node.js, TypeScript, Express, Vite, React, Tailwind-compatible tooling, and Google Gemini GenAI integration.

**Key features**
- **Diagram ingestion**: upload images or use preset SVGs to analyze architectural sketches.
- **Structured output**: returns machine-friendly JSON for architecture, security, specification, and next steps.
- **Simulator fallback**: runs high-fidelity local presets when `GEMINI_API_KEY` is not provided or upstream is overloaded.

**Preview:** The backend is implemented in [server.ts](server.ts#L1) and serves both the API and the Vite dev middleware.

**Table of Contents**
- **Overview**
- **Quick Start**
- **Environment & Configuration**
- **Available Scripts**
- **Project Structure**
- **Notes & Security**
- **Contributing**

**Overview**
This repository contains a full-stack demo: a Vite-powered React frontend (in `src/`) and an Express TypeScript backend (`server.ts`) which proxies analysis requests to the Gemini GenAI client or falls back to built-in presets.

**Quick Start**
- **Prerequisites**: Node.js (recommended >= 18) and npm.
- Install dependencies:

```
npm install
```

- Create an environment file (optional) to set your Gemini key:

```
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

- Run in development (starts backend with Vite middleware):

```
npm run dev
```

- Build for production:

```
npm run build

# then run the bundled server
npm run start
```

**Environment & Configuration**
- **GEMINI_API_KEY**: When present, the backend will attempt to call the Gemini Vision models. If omitted, the app uses simulated/preset analyses.
- **PORT**: The server listens on port `3000` by default (see [server.ts](server.ts#L1)).
- **NODE_ENV**: `development` enables Vite middleware; `production` serves the built `dist` folder.

**Available Scripts**
- **`npm run dev`**: start the app in development (uses `tsx server.ts` + Vite middleware).
- **`npm run build`**: build the frontend (`vite build`) and bundle the server (`esbuild server.ts` → `dist/server.cjs`).
- **`npm run start`**: run the production server from `dist/server.cjs`.
- **`npm run clean`**: remove `dist` and server bundles.
- **`npm run lint`**: run TypeScript type-checking (`tsc --noEmit`).

The root scripts are defined in [package.json](package.json#L1).

**Project Structure (high level)**
- **`server.ts`**: Express + Vite dev middleware; analysis API at `/api/analyze` and health at `/api/health`.
- **`src/`**: React frontend source (main entry in `src/main.tsx`, UI in `src/App.tsx`).
- **`sketchflow-ai/`**: a nested demo Vite app with its own `package.json` and scripts.

Example important files:
- [server.ts](server.ts#L1)
- [src/App.tsx](src/App.tsx#L1)
- [sketchflow-ai/package.json](sketchflow-ai/package.json#L1)

**Notes & Security**
- The app accepts base64 image payloads; the backend sets express body limits to `50mb` to support large uploads (see [server.ts](server.ts#L1)).
- Treat `GEMINI_API_KEY` as a secret. Do not commit real API keys to the repository. Use environment files or secret stores for deployments.
- The simulator fallback provides deterministic outputs for demos and local development when the upstream API is unavailable.

**Contributing**
- Fork and open a PR. Follow existing TypeScript and React patterns in `src/`.
- Run `npm run lint` and ensure TypeScript checks pass before opening PRs.

---

If you'd like, I can also:
- add a minimal `.env.example` file,
- wire up a GitHub Actions workflow for builds,
- or generate a short developer quickstart script. Want me to add any of those?
