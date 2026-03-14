"use client";

import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiLoader,FiZap, FiCloudLightning } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { CodeBlock } from "./components/CodeBlock";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageSelect } from "./components/LanguageSelect";
import { ModelSelect } from "./components/ModelSelect";
import { TextBlock } from "./components/TextBlock";
import { GroqModel, TranslateBody } from "./types/types";
import { copyToClipboard } from "./utils/copy";

type Mode = "code" | "natural";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("code");
  const [inputLanguage, setInputLanguage] = useState<string>("JavaScript");
  const [outputLanguage, setOutputLanguage] = useState<string>("Python");
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [model, setModel] = useState<GroqModel>("llama-3.3-70b-versatile");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [didCopy, setDidCopy] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(t);
  }, []);

  const canTranslate = useMemo(() => {
    if (loading) return false;
    if (!inputCode.trim()) return false;
    if (mode === "code" && inputLanguage === outputLanguage) return false;
    return true;
  }, [inputCode, inputLanguage, loading, mode, outputLanguage]);

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setHasTranslated(false);
    setDidCopy(false);
    setInputCode("");
    setOutputCode("");

    if (nextMode === "natural") {
      setInputLanguage("Natural Language");
      if (outputLanguage === "Natural Language") {
        setOutputLanguage("Python");
      }
      return;
    }

    if (inputLanguage === "Natural Language") {
      setInputLanguage("JavaScript");
    }
  };

  const handleTranslate = async () => {
    if (mode === "code" && inputLanguage === outputLanguage) {
      toast.error("Please select different languages.");
      return;
    }
    if (!inputCode.trim()) {
      toast.error("Please enter some code to translate.");
      return;
    }
    if (inputCode.length > 12000) {
      toast.error(
        `Code is too long. Max 12,000 characters (currently ${inputCode.length}).`,
      );
      return;
    }

    setLoading(true);
    setOutputCode("");
    setHasTranslated(false);
    setDidCopy(false);

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
        const message = await response.text().catch(() => "");
        toast.error(message || "Something went wrong. Please try again.");
        return;
      }

      const text = await response.text();
      if (!text.trim()) {
        toast.error("Empty response received. Please try again.");
        return;
      }

      setOutputCode(text);
      setHasTranslated(true);

      const copied = await copyToClipboard(text);
      setDidCopy(copied);
      if (copied) {
        toast.success("Translation complete. Copied to clipboard.");
      } else {
        toast.error("Translation complete, but copy failed.");
      }
    } catch {
      toast.error("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-foreground">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-6rem] h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[-6rem] top-40 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <Header />

      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 backdrop-blur-xl transition-opacity duration-700 ${
          showSplash ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!showSplash}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-orange-300 text-bg shadow-lg shadow-accent/30 animate-float">
            <span className="text-2xl font-bold">CS</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              CodeShifter
            </p>
            <p className="text-base font-semibold text-foreground">
              Shifting code with Groq
            </p>
          </div>
        </div>
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <FiCloudLightning size={12} />
                Instant AI translation
              </span>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Shift code across languages in seconds
              </h1>
              <p className="max-w-2xl text-sm text-muted sm:text-base">
                Pick a model, choose your mode, and let Groq handle the heavy
                lifting. Fast, accurate, and built for developers.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1 rounded-full border border-border bg-bg/60 p-1">
                  <button
                    type="button"
                    onClick={() => switchMode("natural")}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                      mode === "natural"
                        ? "bg-accent text-bg shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("code")}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                      mode === "code"
                        ? "bg-accent text-bg shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Programming
                  </button>
                </div>
                <div className="min-w-[210px]">
                  <ModelSelect model={model} onChange={setModel} />
                </div>
              </div>

              <button
                onClick={handleTranslate}
                disabled={!canTranslate}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
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
          </div>
        </section>

        <section className="relative grid flex-1 grid-cols-1 gap-4 rounded-2xl border border-border/60 bg-surface/60 p-4 shadow-xl shadow-black/5 backdrop-blur-xl lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Original Input
              </h2>
              <LanguageSelect
                label="Input"
                language={inputLanguage}
                disabled={mode === "natural"}
                onChange={(value) => {
                  setInputLanguage(value);
                  setHasTranslated(false);
                  setDidCopy(false);
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

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-accent shadow-lg shadow-black/10">
              <FiArrowRight size={16} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                {hasTranslated ? "Shifted Output" : "Output"}
                {hasTranslated && didCopy && (
                  <span className="ml-2 text-xs font-normal text-accent">
                    (copied)
                  </span>
                )}
              </h2>
              <LanguageSelect
                label="Output"
                language={outputLanguage}
                onChange={(value) => {
                  setOutputLanguage(value);
                  setHasTranslated(false);
                  setDidCopy(false);
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
        </section>

        <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            {loading
              ? "Groq AI is translating at lightning speed..."
              : !inputCode.trim()
                ? "Paste your input, choose a mode, and hit Shift Code"
                : hasTranslated
                  ? "Translation complete"
                  : "Ready to shift"}
          </span>
          <span className="flex items-center gap-1 text-accent">
            <FiCloudLightning size={12} />
            {mode === "natural" ? "Natural to code" : "Code to code"}
          </span>
        </div>
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
