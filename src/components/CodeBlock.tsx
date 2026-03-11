"use client";

import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => setCopied(true));
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
          {copied ? (
            <>
              <FiCheck size={12} />
              Copied
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
