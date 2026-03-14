import { FC } from "react";

import { GroqModel } from "../types/types";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
      <Label>Model</Label>
      <Select value={model} onValueChange={(value) => onChange(value as GroqModel)}>
        <SelectTrigger className="bg-background/90">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {MODELS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label} - {m.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
