import { Alert, Button, Card } from "react-bootstrap";
import CodeBlock from "./CodeBlock";
import a11yLight from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-light";
import { dictionaryToCsv } from "../utils/dictionaryToCsv";
import { FormProps } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { useTranslation } from "react-i18next";
import { getFlattenedTitles } from "../utils/flattenSchemaTitles";

export default function Output({
  id,
  type,
  output,
  step,
  handlePrev,
  onSubmit,
  data,
  fullSchema,
  validator,
}: {
  id: number;
  type: "output" | "error";
  output: Record<string, string>;
  step: number;
  handlePrev: () => void;
  onSubmit: (
    index: number,
    data: FormProps<any, RJSFSchema, any>["formData"]
  ) => void;
  data: FormProps<any, RJSFSchema, any>["schema"];
  fullSchema: FormProps<any, RJSFSchema, any>["schema"];
  validator: FormProps<any, RJSFSchema, any>["validator"];
}) {
  const { t } = useTranslation();
  // filter out intermediate output from the form data.
  data = Object.fromEntries(
    Object.entries(data).filter(([key]) => !key.startsWith("output"))
  );
  const flattenedTitles = getFlattenedTitles(fullSchema, validator, data);

  // Enrich the data with the output.
  data = { ...data, output: output.default };

  return (
    <>
      <Card bg={"light"} className="mb-4">
        <Card.Body>
          <Card.Title>{output?.title}</Card.Title>

          <Alert variant="primary" className={type === "error" ? "mb-0" : ""}>
            {output?.default}
          </Alert>
          {type === "output" && (
            <>
              <Card.Text>{t("save output")}</Card.Text>
              <CodeBlock
                style={a11yLight}
                code={dictionaryToCsv(data, flattenedTitles)}
                language={"typescript"}
                title={"CSV"}
                wrapLongLines={false}
              />
              <CodeBlock
                style={a11yLight}
                code={JSON.stringify(
                  Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                      key === "output"
                        ? "Tulemus"
                        : flattenedTitles[key] ?? key,
                      value,
                    ])
                  ),
                  null,
                  2
                )}
                language="json"
                title="JSON"
                wrapLongLines={false}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <div className="d-flex flex-row justify-content-between flex-row-reverse">
        <Button
          onClick={() => onSubmit(id, data)}
          variant="primary"
          type="submit"
        >
          {t("done")}
        </Button>
        {step > 0 && (
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handlePrev}
            style={{ marginRight: "8px" }}
          >
            {t("back")}
          </Button>
        )}
      </div>
    </>
  );
}
