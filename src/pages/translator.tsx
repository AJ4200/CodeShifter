import { useState, useEffect } from "react";

type Language = "javascript" | "python" | "ruby" | "typescript" | "java" | "csharp";

export default function ConvertPage() {
  const [code, setCode] = useState("");
  const [fromLanguage, setFromLanguage] = useState<Language>("javascript");
  const [toLanguage, setToLanguage] = useState<Language>("python");
  const [convertedCode, setConvertedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const convertCode = (code: string, fromLanguage: Language, toLanguage: Language): string => {
    if (fromLanguage === "javascript" && toLanguage === "python") {
      // Replace JavaScript-specific syntax with Python syntax using regular expressions
      code = code.replace(/let/g, "def");
      code = code.replace(/const/g, "");
      code = code.replace(/;/g, "");
      code = code.replace(/console\.log\((.*)\)/g, "print($1)");
    } else if (fromLanguage === "python" && toLanguage === "javascript") {
      // Replace Python-specific syntax with JavaScript syntax using regular expressions
      code = code.replace(/def/g, "let");
      code = code.replace(/print\((.*)\)/g, "console.log($1);");
    } else if (fromLanguage === "typescript" && toLanguage === "javascript") {
      // Remove TypeScript-specific syntax
      code = code.replace(/: /g, " ");
    } else if (fromLanguage === "java" && toLanguage === "python") {
      // Replace Java-specific syntax with Python syntax using regular expressions
      code = code.replace(/public static void main\(String\[\] args\)/g, "def main():");
      code = code.replace(/System\.out\.println\((.*)\)/g, "print($1)");
    } else if (fromLanguage === "csharp" && toLanguage === "python") {
      // Replace C#-specific syntax with Python syntax using regular expressions
      code = code.replace(/using System;/g, "");
      code = code.replace(/Console\.WriteLine\((.*)\);/g, "print($1)");
    }

    return code;
  };

  const handleCopyClick = (code: string) => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setButtonClicked(false);
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCode = convertCode(code, fromLanguage, toLanguage);
    setConvertedCode(newCode);
  };

  function copyToClipboard(convertedCode: string): void {
    navigator.clipboard.writeText(convertedCode);
  }

  useEffect(() => {
    const container = document.querySelector(".container");
    container?.classList.add("loaded");
  }, []);

  return (
    <>
      <header>
        <h1 className="heading">Code Shifter</h1>
        <a>alpha v1.3</a>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="fromLanguage" className={"form-label"}>
              Convert from:
            </label>
            <select
          id="fromLanguage"
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value as Language)}
          className={"form-select"}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="toLanguage" className={"form-label"}>
          Convert to:
        </label>
        <select
          id="toLanguage"
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value as Language)}
          className={"form-select"}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="code" className={"form-label"}>
          Enter your code:
        </label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={"form-textarea"}
        />
      </div>
      <button
        type="submit"
        onClick={() => setButtonClicked(true)}
        className={"form-button"}
      >
        {buttonClicked ? "Converted!" : "Convert"}
      </button>
    </form>
    {convertedCode && (
          <>
            <h2 className="form-label">Converted Code:</h2>
            <pre className="output">{convertedCode}</pre>
            <button
              className={`form-button ${buttonClicked ? "clicked" : ""}`}
              onClick={() => {
                handleCopyClick(convertedCode);
                setButtonClicked(true);
              }}
              disabled={copied}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </>
        )}
  </div>
</>);
}
