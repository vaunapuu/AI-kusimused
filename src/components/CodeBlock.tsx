import SyntaxHighlighter from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

export default function CodeBlock({
  code,
  language,
  style,
  title,
  wrapLines = true,
  wrapLongLines = true,
}: {
  code: string;
  language: string;
  style: any;
  title: string;
  wrapLines?: boolean;
  wrapLongLines?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  // Reset the copied state after 2 seconds.
  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="bg-primary mt-2 rounded">
      <div className="d-flex flex-row justify-content-between align-items-center p-2">
        <h6 className="mb-0 ml-2 text-white"> {title}</h6>
        <CopyToClipboard text={code}>
          <Button className="btn btn-primary" onClick={() => setCopied(true)}>
            <small>{copied ? t("copied") : t("copy")}</small>
          </Button>
        </CopyToClipboard>
      </div>

      <SyntaxHighlighter
        language={language}
        style={style}
        wrapLines={wrapLines}
        wrapLongLines={wrapLongLines}
        showLineNumbers={true}
        showInlineLineNumbers={false}
        header={"Code"}
        customStyle={{
          border: "1px solid #c3c3c3",
          borderRadius: "5px",
          marginBottom: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
