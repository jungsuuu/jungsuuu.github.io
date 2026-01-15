"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

export const CodeBlock = ({
  language = "typescript",
  code,
  className = "",
}: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={monokai}
      customStyle={{
        padding: "16px",
        borderRadius: "8px",
        fontSize: "14px",
        lineHeight: "1.5",
        margin: "0",
      }}
      className={`overflow-x-auto ${className}`}
      showLineNumbers={false}
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
};
