type Language = "javascript" | "python" | "ruby" | "typescript" | "java" | "csharp";

export const convertCode = (code: string, fromLanguage: Language, toLanguage: Language): string => {
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
