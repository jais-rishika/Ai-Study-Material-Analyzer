# AI Study Material Analyzer

An AI-powered study assistant that turns PDF study material into structured revision resources. Upload your notes, choose the pages you want to analyze, and generate a summary, key concepts, and a quiz with the help of Google's Gemini API.

> **Project status:** Portfolio / learning project. The current implementation stores the active PDF and generated study material in local files. It is designed around a single active study session, not concurrent multi-user storage.

## Features

- **PDF upload:** Upload PDF notes for analysis.
- **Page selection:** Analyze the complete document or choose a page range.
- **AI-generated summaries:** Generate structured revision material from the selected PDF pages.
- **Concept exploration:** Review concepts extracted from the source material.
- **Quiz generation:** Create multiple-choice questions with answers and explanations.
- **Personal notes:** Select text from the study material and add it to a notes area.
- **Download notes:** Export saved notes as a text file.
- **Session management:** Continue the previous study session or start a new one.
- **Structured AI output:** Validate generated study material against a schema before saving it.

## Tech stack

- **Framework:** Next.js (App Router)
- **UI:** React, TypeScript, Tailwind CSS, HeroUI
- **AI:** Google Gemini API via `@google/genai`
- **PDF processing:** `pdf-lib`
- **Validation:** Zod
- **Persistence:** Local filesystem for the active PDF and generated JSON; `sessionStorage` for browser-side notes

## How it works

1. Upload a PDF and choose either all pages or a page range.
2. The server validates the upload and extracts the selected pages from the PDF.
3. The selected PDF is sent to the Gemini API with instructions to produce structured study material.
4. The response is parsed and validated before it is saved.
5. The planner displays the generated summary, concepts, and quiz.
6. You can select useful text and save it to your notes.

## Getting started

### Prerequisites

- Node.js (use a current LTS release)
- npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/jais-rishika/Ai-Study-Material-Analyzer.git
cd Ai-Study-Material-Analyzer/Projects/ai-study-material-analyzer
```

### 2. Install dependencies

```bash
npm install
npm install zod
```

`schema.ts` imports Zod directly, so ensure `zod` is listed as a direct dependency in `package.json` (the repository manifest should include it).

### 3. Configure environment variables

Create a `.env.local` file in the `ai-study-material-analyzer` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep this key private. Do not commit `.env.local` or expose the key in client-side code.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create a production build

```bash
npm run build
npm run start
```

## Project structure

The application is located in `Projects/ai-study-material-analyzer` within the repository.

```text
ai-study-material-analyzer/
├── public/
├── src/
│   ├── ai/                 # Gemini client configuration
│   ├── app/                # App Router pages and layouts
│   └── features/
│       └── study/
│           ├── actions/    # Server Actions
│           ├── components/ # Upload, planner, summary, concepts, quiz, notes
│           └── lib/        # PDF processing, prompts, schemas, data access
├── data/                   # Runtime session files (created/used by the app)
├── next.config.ts
└── package.json
```

The `data/` directory is runtime storage. It contains the active uploaded PDF and generated study-material JSON; it should not be treated as permanent or multi-user storage.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | API key used by the server to call the Gemini API. |

## Deployment

This is a full-stack Next.js application because it uses Server Components, Server Actions, filesystem access, and a server-side Gemini API call. Deploy it as a **Node.js web service**, not as a static site.

### Free demo deployment with Render

The repository contains the Next.js app in a nested directory, so configure Render's **Root Directory** as:

```text
Projects/ai-study-material-analyzer
```

Use these settings when creating a Render Web Service:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Root Directory | `Projects/ai-study-material-analyzer` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |

Add this environment variable in Render's Environment settings:

```text
GEMINI_API_KEY = your_gemini_api_key
```

Choose the Free instance for a portfolio demo. Render's free web services can spin down after inactivity, and their local filesystem is ephemeral. **Uploaded PDFs and generated sessions can disappear after a restart, redeploy, or spin-down.** The free service can also take around a minute to wake up after being idle.

### Important storage and usage limitations

The current implementation uses shared local files (`data/source.pdf` and `data/study-material.json`) for one active session. This is suitable for local development and a controlled demo, but it is not safe for multiple visitors using the deployed app at the same time: one visitor can replace or clear another visitor's session.

Before sharing the deployed app widely, consider one of these improvements:

- Keep the demo explicitly single-user / temporary and warn visitors not to upload private documents.
- Move uploaded PDFs and generated JSON to object storage, using a per-session identifier.
- Add authentication and isolated session storage if you want multiple users.

Do not upload confidential, personal, or sensitive documents to a public demo. The Gemini API key must remain server-side.

## Notes

- The Server Action request body limit is configured in `next.config.ts`. A hosting provider may impose its own request-size limit, independent of the Next.js setting.
- The app requires a Node.js runtime; a static export will not support its Server Actions or filesystem operations.
- Generated study material depends on the Gemini API and may take time depending on PDF size and model response time.

