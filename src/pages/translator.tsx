import { useState, useEffect } from "react";
import { convertCode } from "./codeConverter";

type Language = "javascript" | "python" | "ruby";

export default function ConvertPage() {
  const [code, setCode] = useState("");
  const [fromLanguage, setFromLanguage] = useState<Language>("javascript");
  const [toLanguage, setToLanguage] = useState<Language>("python");
  const [convertedCode, setConvertedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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
              className="form-select"
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value as Language)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="toLanguage" className={"form-label"}>
              Convert to:
            </label>
            <select
              id="toLanguage"
              className="form-select"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value as Language)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="code" className={"form-label"}>
              Enter your code:
            </label>
            <textarea
              id="code"
              className="form-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </div>
          <button
            className="form-button"
            onClick={() => setButtonClicked(true)}
          >
            Convert
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
    </>
  );
}
