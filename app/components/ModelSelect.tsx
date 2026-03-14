import { GroqModel } from "../types/types";
import { FC } from "react";

interface Props {
  model: GroqModel;
  onChange: (model: GroqModel) => void;
}

const MODELS: { value: GroqModel; label: string; description: string }[] = [
  {
    value: "llama-3.3-70b-versatile",
    label: "Llama 3.3 70B",
    description: "Best quality",
  },
  {
    value: "llama-3.1-8b-instant",
    label: "Llama 3.1 8B",
    description: "Fastest",
  },
  {
    value: "mixtral-8x7b-32768",
    label: "Mixtral 8x7B",
    description: "Long context",
  },
  {
    value: "gemma2-9b-it",
    label: "Gemma 2 9B",
    description: "Balanced",
  },
];

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted">Model</label>
      <select
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none hover:border-accent/70"
        value={model}
        onChange={(e) => onChange(e.target.value as GroqModel)}
      >
        {MODELS.map((m) => (
          <option key={m.value} value={m.value} className="bg-surface">
            {m.label} - {m.description}
          </option>
        ))}
      </select>
    </div>
  );
};

