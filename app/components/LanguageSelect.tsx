import type { FC } from "react";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  language: string;
  onChange: (language: string) => void;
  label?: string;
  disabled?: boolean;
}

const languages = [
  { value: "Natural Language", label: "Natural Language" },
  { value: "Assembly Language", label: "Assembly Language" },
  { value: "Bash", label: "Bash" },
  { value: "C", label: "C" },
  { value: "C#", label: "C#" },
  { value: "C++", label: "C++" },
  { value: "Clojure", label: "Clojure" },
  { value: "COBOL", label: "COBOL" },
  { value: "CoffeeScript", label: "CoffeeScript" },
  { value: "CSS", label: "CSS" },
  { value: "Dart", label: "Dart" },
  { value: "Elixir", label: "Elixir" },
  { value: "Fortran", label: "Fortran" },
  { value: "Go", label: "Go" },
  { value: "Groovy", label: "Groovy" },
  { value: "Haskell", label: "Haskell" },
  { value: "HTML", label: "HTML" },
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "JSX", label: "JSX" },
  { value: "Julia", label: "Julia" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Lisp", label: "Lisp" },
  { value: "Lua", label: "Lua" },
  { value: "Matlab", label: "Matlab" },
  { value: "NoSQL", label: "NoSQL" },
  { value: "Objective-C", label: "Objective-C" },
  { value: "Pascal", label: "Pascal" },
  { value: "Perl", label: "Perl" },
  { value: "PHP", label: "PHP" },
  { value: "PL/SQL", label: "PL/SQL" },
  { value: "Powershell", label: "Powershell" },
  { value: "Python", label: "Python" },
  { value: "R", label: "R" },
  { value: "Racket", label: "Racket" },
  { value: "Ruby", label: "Ruby" },
  { value: "Rust", label: "Rust" },
  { value: "SAS", label: "SAS" },
  { value: "Scala", label: "Scala" },
  { value: "SQL", label: "SQL" },
  { value: "Swift", label: "Swift" },
  { value: "SwiftUI", label: "SwiftUI" },
  { value: "TSX", label: "TSX" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Visual Basic .NET", label: "Visual Basic .NET" },
  { value: "Vue", label: "Vue" },
];

export const LanguageSelect: FC<Props> = ({
  language,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <Select value={language} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="bg-background/90">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
