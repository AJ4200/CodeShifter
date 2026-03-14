"use client";

import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useEffect, useState } from "react";
import { LuCheck, LuCopy, LuX } from "react-icons/lu";
import { copyToClipboard } from "../utils/copy";
import { Button } from "./ui/button";

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    if (copyState !== "idle") {
      const t = setTimeout(() => setCopyState("idle"), 2000);
      return () => clearTimeout(t);
    }
  }, [copyState]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    setCopyState(ok ? "success" : "error");
  };

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <Button
          onClick={handleCopy}
          aria-label="Copy code"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs text-muted-foreground"
        >
          {copyState === "success" ? (
            <>
              <LuCheck size={12} />
              Copied
            </>
          ) : copyState === "error" ? (
            <>
              <LuX size={12} />
              Failed
            </>
          ) : (
            <>
              <LuCopy size={12} />
              Copy
            </>
          )}
        </Button>
      </div>
      <CodeMirror
        editable={editable}
        value={code}
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={(value) => onChange(value)}
        height="300px"
        maxHeight="300px"
        style={{ fontSize: "13px" }}
      />
    </div>
  );
};
