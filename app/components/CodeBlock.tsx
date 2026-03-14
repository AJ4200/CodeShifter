"use client";

import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useEffect, useState } from "react";
import { FiCheck, FiCopy, FiX } from "react-icons/fi";
import { copyToClipboard } from "../utils/copy";

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
    <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition-colors hover:bg-border hover:text-foreground"
        >
          {copyState === "success" ? (
            <>
              <FiCheck size={12} />
              Copied
            </>
          ) : copyState === "error" ? (
            <>
              <FiX size={12} />
              Failed
            </>
          ) : (
            <>
              <FiCopy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <CodeMirror
        editable={editable}
        value={code}
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={(value) => onChange(value)}
        height="280px"
        maxHeight="280px"
        style={{ fontSize: "13px" }}
      />
    </div>
  );
};
