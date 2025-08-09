/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_AI_KEY: string;
  readonly VITE_CENTRY_DCN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
