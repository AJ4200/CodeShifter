"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LanguageSelect } from "@/components/LanguageSelect";
import { ModelSelect } from "@/components/ModelSelect";
import { TextBlock } from "@/components/TextBlock";
import { GroqModel, TranslateBody } from "@/types/types";
import { Toaster, toast } from "sonner";
import { FiArrowRight, FiLoader, FiZap } from "react-icons/fi";

export default function HomePage() {
  const [inputLanguage, setInputLanguage] = useState<string>("JavaScript");
  const [outputLanguage, setOutputLanguage] = useState<string>("Python");
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [model, setModel] = useState<GroqModel>("llama-3.3-70b-versatile");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const handleTranslate = async () => {
    if (inputLanguage === outputLanguage) {
      toast.error("Please select different languages.");
      return;
    }
    if (!inputCode.trim()) {
      toast.error("Please enter some code to translate.");
      return;
    }
    if (inputCode.length > 12000) {
      toast.error(`Code is too long. Max 12,000 characters (currently ${inputCode.length}).`);
      return;
    }

    setLoading(true);
    setOutputCode("");

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
    };

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const data = response.body;
      if (!data) {
        toast.error("No response received.");
        setLoading(false);
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let code = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        code += chunk;
        setOutputCode((prev) => prev + chunk);
      }

      setHasTranslated(true);
      navigator.clipboard.writeText(code).catch(() => {});
      toast.success("Translation complete — copied to clipboard!");
    } catch {
      toast.error("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Controls row */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="flex-1">
            <ModelSelect model={model} onChange={setModel} />
          </div>
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-semibold text-bg transition-all hover:bg-accent/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <FiLoader size={16} className="animate-spin" />
                Shifting...
              </>
            ) : (
              <>
                <FiZap size={16} />
                Shift Code
              </>
            )}
          </button>
        </div>

        {/* Editor panels */}
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Input panel */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Original Code</h2>
              <LanguageSelect
                language={inputLanguage}
                onChange={(value) => {
                  setInputLanguage(value);
                  setHasTranslated(false);
                  setInputCode("");
                  setOutputCode("");
                }}
              />
            </div>
            {inputLanguage === "Natural Language" ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>

          {/* Arrow divider (visible only on large screens) */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-accent">
              <FiArrowRight size={16} />
            </div>
          </div>

          {/* Output panel */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                {hasTranslated ? "Shifted Code" : "Output"}
                {hasTranslated && (
                  <span className="ml-2 text-xs font-normal text-accent">(copied!)</span>
                )}
              </h2>
              <LanguageSelect
                language={outputLanguage}
                onChange={(value) => {
                  setOutputLanguage(value);
                  setOutputCode("");
                }}
              />
            </div>
            {outputLanguage === "Natural Language" ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-center">
          <p className="text-xs text-muted">
            {loading
              ? "Groq AI is translating your code at lightning speed..."
              : !inputCode.trim()
                ? "Paste your code on the left, choose languages, and hit Shift Code"
                : hasTranslated
                  ? "Translation complete"
                  : "Ready to shift"}
          </p>
        </div>
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
