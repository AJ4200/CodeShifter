"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LuArrowRight,
  LuBinary,
  LuCloudLightning,
  LuGauge,
  LuLoader2,
  LuShieldCheck,
  LuSparkles,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";
import { Toaster, toast } from "sonner";
import { CodeBlock } from "./components/CodeBlock";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageSelect } from "./components/LanguageSelect";
import { ModelSelect } from "./components/ModelSelect";
import { TextBlock } from "./components/TextBlock";
import { Badge } from "./components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { GroqModel, TranslateBody } from "./types/types";
import { copyToClipboard } from "./utils/copy";
import { cn } from "@/lib/utils";

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

  const statusMessage = loading
    ? "Groq is shifting at top speed..."
    : !inputCode.trim()
      ? "Paste your input, choose a mode, then shift."
      : hasTranslated
        ? "Translation complete"
        : "Ready to shift";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--foreground)/0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:32px_32px]" />

      <Header />

      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-xl transition-opacity duration-700 ${
          showSplash ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!showSplash}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary shadow-lg shadow-black/20 animate-float">
            <LuSparkles size={28} />
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              CodeShifter
            </p>
            <p className="text-base font-semibold text-foreground">
              Shift code with cyan precision
            </p>
          </div>
        </div>
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -left-20 bottom-[-6rem] h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-primary/40 text-primary">
              <LuSparkles size={12} />
              Groq-powered translation
            </Badge>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Shift code across languages in seconds.
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Choose a model, translate instantly, and keep your flow. Built for
                speed, accuracy, and the moments you need clean code on demand.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <LuGauge size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold">Instant output</p>
                <p className="text-xs text-muted-foreground">
                  Groq delivers results at lightning speed for tight deadlines.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <LuWorkflow size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold">40+ languages</p>
                <p className="text-xs text-muted-foreground">
                  Shift between mainstream stacks and specialist ecosystems.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <LuShieldCheck size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold">Clean handoff</p>
                <p className="text-xs text-muted-foreground">
                  Copy-ready output, automatically placed on your clipboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card className="relative overflow-hidden border-border/60 bg-card/80 p-4 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_55%)]" />
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground">
                  1
                </span>
                Configure
                <span className="hidden h-px w-8 bg-border/60 sm:block" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground">
                  2
                </span>
                Insert
                <span className="hidden h-px w-8 bg-border/60 sm:block" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground">
                  3
                </span>
                Shift
              </div>
              <span className="text-xs text-muted-foreground">
                Tune the mode and model before you paste.
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  Mode
                </span>
                <div className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-muted/50 p-1">
                  <button
                    type="button"
                    onClick={() => switchMode("natural")}
                    aria-pressed={mode === "natural"}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition",
                      mode === "natural"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/60"
                        : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                    )}
                  >
                    <LuSparkles size={14} />
                    Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("code")}
                    aria-pressed={mode === "code"}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition",
                      mode === "code"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/60"
                        : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                    )}
                  >
                    <LuBinary size={14} />
                    Programming
                  </button>
                </div>
              </div>
              <div className="min-w-[240px]">
                <ModelSelect model={model} onChange={setModel} />
              </div>
            </div>
          </div>
        </Card>

        <section className="relative grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="relative">
            <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <CardTitle>Original Input</CardTitle>
                <CardDescription>
                  Paste code or describe what you need.
                </CardDescription>
              </div>
              <div className="min-w-[210px]">
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
            </CardHeader>
            <CardContent className="pt-0">
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
            </CardContent>
          </Card>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-primary shadow-lg shadow-black/20">
              <LuArrowRight size={16} />
            </div>
          </div>

          <Card className="relative">
            <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {hasTranslated ? "Shifted Output" : "Output"}
                  {hasTranslated && didCopy && (
                    <Badge className="px-2 py-0 text-[10px] uppercase tracking-wide">
                      Copied
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Review and drop into your workflow.
                </CardDescription>
              </div>
              <div className="min-w-[210px]">
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
            </CardHeader>
            <CardContent className="pt-0">
              {outputLanguage === "Natural Language" ? (
                <TextBlock text={outputCode} />
              ) : (
                <CodeBlock code={outputCode} />
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="relative overflow-hidden border-border/60 bg-card/80 p-4 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_55%)]" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-primary">
                <LuZap size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Shift</p>
                <p className="text-xs text-muted-foreground">
                  Send the request and copy the output instantly.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    loading ? "bg-primary animate-pulse" : "bg-primary/70",
                  )}
                />
                {statusMessage}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-primary/20 blur-xl" />
                <Button
                  onClick={handleTranslate}
                  disabled={!canTranslate}
                  size="lg"
                  className="relative min-w-[200px] rounded-xl bg-primary text-base text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/60 hover:shadow-primary/40"
                >
                  {loading ? (
                    <>
                      <LuLoader2 size={16} className="animate-spin" />
                      Shifting...
                    </>
                  ) : (
                    <>
                      <LuZap size={16} />
                      Shift Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-1 text-primary">
              <LuCloudLightning size={12} />
              {mode === "natural" ? "Natural to code" : "Code to code"}
            </span>
            <span className="flex items-center gap-1">
              <LuGauge size={12} />
              {model.includes("70b") ? "Max quality" : "Balanced speed"}
            </span>
          </div>
        </Card>
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
