import { APIKeyInput } from "@/components/APIKeyInput";
import { CodeBlock } from "@/components/CodeBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LanguageSelect } from "@/components/LanguageSelect";
import { ModelSelect } from "@/components/ModelSelect";
import { TextBlock } from "@/components/TextBlock";
import { OpenAIModel, TranslateBody } from "@/types/types";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [inputLanguage, setInputLanguage] = useState<string>("JavaScript");
  const [outputLanguage, setOutputLanguage] = useState<string>("Python");
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [model, setModel] = useState<OpenAIModel>("gpt-3.5-turbo");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");

  const handleTranslate = async () => {
    const maxCodeLength = model === "gpt-3.5-turbo" ? 6000 : 12000;

    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }

    if (inputLanguage === outputLanguage) {
      alert("Please select different languages.");
      return;
    }

    if (!inputCode) {
      alert("Please enter some code.");
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutputCode("");

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    };

    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert("Something went wrong.");
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert("Something went wrong.");
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);

    localStorage.setItem("apiKey", value);
  };

  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  });

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");

    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="maincontainer flex h-full flex-col items-center px-4 text-neutral-200 w-full">
        <div className="mt-6 flex w-full flex-col sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 w-1/2">
            <div className="textshadow text-center text-xl font-bold">
              Original Code
            </div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                setInputCode("");
                setOutputCode("");
              }}
            />

            {inputLanguage === "Natural Language" ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full w-1/2 flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold textshadow">
              Shifted Code
            </div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode("");
              }}
            />

            {outputLanguage === "Natural Language" ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
        <div className="mt-2 text-center text-xs textshadow">
          {loading
            ? "Shifting..."
            : hasTranslated
            ? "Copied to clipboard!"
            : 'Enter your OpenAI API key then click "Shift"'}
        </div>
        <div className="mt-6 text-center text-sm">
          <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        </div>

        <div className="mt-2 mb-4 flex items-center space-x-2">
          <ModelSelect model={model} onChange={(value) => setModel(value)} />

          <button
            className="w-[140px] cursor-pointer rounded-md bg-white text-black px-4 py-2 font-bold hover:bg-gray-600/20 active:bg-gray-700"
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? "Shifting..." : "Shift"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
