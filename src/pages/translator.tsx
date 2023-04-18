import { useState } from "react";

type Language = "javascript" | "python" | "ruby";

export default function ConvertPage() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [convertedCode, setConvertedCode] = useState<string>("");
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
    const newCode = convertCode(code, language);
    setConvertedCode(newCode);
  };

  const convertCode = (code: string, language: Language): string => {
    if (language === "python") {
      // Replace JavaScript-specific syntax with Python syntax using regular expressions
      code = code.replace(/let/g, "def");
      code = code.replace(/const/g, "");
      code = code.replace(/;/g, "");
      code = code.replace(/console\.log\((.*)\)/g, "print($1)");
    }

    return code;
  };

  function copyToClipboard(convertedCode: string): void {
    navigator.clipboard
      .writeText(convertedCode)
    //  .then(() => alert("Code copied to clipboard"))
    //  .catch((err) => console.error("Could not copy code: ", err));
  }

  return (
    <>
      <header>
        <h1 className="heading">Code Shifter</h1>alpha
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="language" className={"form-label"}>
              Programming Language:
            </label>
            <select
              id="language"
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="code" className="form-label">
              Code:
            </label>
            <textarea
              id="code"
              className="form-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            Convert Code
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
