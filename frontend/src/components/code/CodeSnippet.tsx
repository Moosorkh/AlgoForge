import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CodeSnippetProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  title?: string;
  copyable?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "javascript",
  highlightLines = [],
  showLineNumbers = true,
  title,
  copyable = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "js":
        return "bg-yellow-500";
      case "python":
        return "bg-blue-500";
      case "java":
        return "bg-red-500";
      case "cpp":
      case "c++":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {title && <span className="text-gray-300 text-sm font-medium">{title}</span>}
          <span
            className={`${getLanguageColor(
              language
            )} text-white text-xs px-2 py-1 rounded font-semibold uppercase`}
          >
            {language}
          </span>
        </div>

        {copyable && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            {copied ? (
              <>
                <FaCheck className="text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={`${
                    isHighlighted
                      ? "bg-blue-900 bg-opacity-40 border-l-4 border-blue-500"
                      : ""
                  } ${showLineNumbers ? "pl-2" : ""} transition-colors`}
                >
                  {showLineNumbers && (
                    <span className="text-gray-500 select-none mr-4 inline-block w-8 text-right">
                      {lineNumber}
                    </span>
                  )}
                  <span>{line || " "}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
