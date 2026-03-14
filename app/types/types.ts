export type GroqModel =
  | "llama-3.3-70b-versatile"
  | "llama-3.1-8b-instant"
  | "mixtral-8x7b-32768"
  | "gemma2-9b-it";

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: GroqModel;
}

export interface TranslateResponse {
  code: string;
}
