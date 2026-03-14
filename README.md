# CodeShifter

CodeShifter is a Groq-powered code translator that shifts code across languages in seconds. Choose a mode, pick a model, paste your input, and get clean output with automatic copy-to-clipboard.

## Features
- Code-to-code and natural-language-to-code modes
- 40+ language targets
- Groq model selection
- Fast streaming-free responses
- Polished cyan/black/white UI with shadcn-style components

## Tech Stack
- Next.js (App Router)
- AI SDK + Groq
- Tailwind CSS
- Radix UI + shadcn-style components
- CodeMirror editor

## Getting Started
1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file with your Groq API key:

```bash
GROQ_API_KEY=your_api_key_here
```

3. Run the dev server:

```bash
pnpm dev
```

4. Open the app:

```text
http://localhost:3000
```

## API
`POST /api/translate`

Body:
- `inputLanguage` (string)
- `outputLanguage` (string)
- `inputCode` (string)
- `model` (string)

Returns plain text output from the model.

## Scripts
- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## Credits
Built by aj4200.
