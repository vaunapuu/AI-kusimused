import { Card } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";

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
  return (
    <Card bg={"secondary"} text="white" className="mt-2">
      <Card.Body>
        <Card.Text> {title}</Card.Text>
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
      </Card.Body>
    </Card>
  );
}
