import { useState } from "react";

type Language = "javascript" | "python" | "ruby";

export default function ConvertPage() {
  const [code, setCode] = useState<string>("");
  const [fromLanguage, setFromLanguage] = useState<Language>("javascript");
  const [toLanguage, setToLanguage] = useState<Language>("python");
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
    const newCode = convertCode(code, fromLanguage, toLanguage);
    setConvertedCode(newCode);
  };

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
              <option value="python
">Python</option>
<option value="ruby">Ruby</option>
</select>
</div>      <div className="form-control">
        <label htmlFor="code" className={"form-label"}>
          Enter your code:
        </label>
        <textarea
          id="code"
          className="form-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <button className="form-button" type="submit" onClick={() => setButtonClicked(true)}>
        Convert
      </button>
    </form>

    {convertedCode && (
      <div className="code-container">
        <label htmlFor="convertedCode" className="form-label">
          Converted code:
        </label>
        <pre id="convertedCode" className="code">
          {convertedCode}
        </pre>
        <button className="copy-button" onClick={() => handleCopyClick(convertedCode)}>
          {copied && buttonClicked ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
    )}
  </div>
</>
);
}