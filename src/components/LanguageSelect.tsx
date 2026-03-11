import type { FC } from "react";

interface Props {
  language: string;
  onChange: (language: string) => void;
  label?: string;
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

export const LanguageSelect: FC<Props> = ({ language, onChange, label }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-muted">{label}</label>}
      <select
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
        value={language}
        onChange={(e) => onChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} className="bg-surface">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
