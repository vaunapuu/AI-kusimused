import Form from "@rjsf/bootstrap-4";
import { FormProps } from "@rjsf/core";
import { GenericObjectType, retrieveSchema, RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Output from "./Output";

const WizardForm = ({
  id,
  schema,
  uiSchema,
  formData,
  onSubmit,
  onCancel,
  validator,
}: {
  id: number;
  schema: FormProps<any, RJSFSchema, any>["schema"];
  uiSchema: FormProps<any, RJSFSchema, any>["uiSchema"];
  formData: FormProps<any, RJSFSchema, any>["formData"];
  onSubmit: (
    index: number,
    data: FormProps<any, RJSFSchema, any>["formData"]
  ) => void;
  onCancel: (index: number) => void;
  validator: FormProps<any, RJSFSchema, any>["validator"];
}) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(formData || {});

  const flattenSchema = (resolvedSchema: any): GenericObjectType => {
    const flattenedProperties: any = {};

    const addProperties = (properties: any) => {
      Object.entries(properties).forEach(([key, value]: [string, any]) => {
        if (value && typeof value === "object") {
          if ("properties" in value) {
            // If it's an object with properties, add those properties directly
            addProperties(value.properties);
          } else {
            // If it's a leaf property (like enum, type, etc.), add it directly
            flattenedProperties[key] = value;
          }
        } else {
          flattenedProperties[key] = value;
        }
      });
    };

    if (resolvedSchema.properties) {
      addProperties(resolvedSchema.properties);
    }

    return {
      ...resolvedSchema,
      properties: flattenedProperties,
    };
  };

  const getCurrentStepSchema = (
    validator: FormProps<any, RJSFSchema, any>["validator"],
    schema: FormProps<any, RJSFSchema, any>["schema"],
    currentData: FormProps<any, RJSFSchema, any>["formData"]
  ): GenericObjectType => {
    // Calculate the step schema based on the current data and dependencies
    const resolvedSchema = retrieveSchema(
      validator,
      schema,
      schema,
      currentData
    );

    const flattenedSchema = flattenSchema(resolvedSchema);

    const keys = Object.keys(flattenedSchema?.properties ?? {});
    const property = keys[step];

    console.log("test", resolvedSchema, flattenedSchema, property);

    if (flattenedSchema?.properties?.[property]) {
      return {
        type: "object",
        required: flattenedSchema?.required?.filter((x) => x === property),
        definitions: flattenedSchema?.definitions,
        properties: { [property]: flattenedSchema?.properties?.[property] },
      };
    }

    return {
      type: "object",
      properties: {
        error: {
          title: "Foutmelding",
          type: "string",
          default: "Oeps, er is iets misgegaan. Geen uikomst gevonden.",
        },
      },
    };
  };

  const handleValidate = (formData: any, errors: any) => {
    const currentSchema = getCurrentStepSchema(validator, schema, data);
    const currentField = Object.keys(currentSchema.properties)[0];

    if (
      currentSchema.required?.includes(currentField) &&
      (formData[currentField] === undefined || formData[currentField] === "")
    ) {
      errors[currentField].addError("Dit veld is verplicht");
    }

    return errors;
  };

  const handleNext = (formData: typeof data) => {
    setData((prevData: typeof data) => ({ ...prevData, ...formData }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const currentStepSchema = getCurrentStepSchema(validator, schema, data);
  const questions = Object.keys(
    getCurrentStepSchema(validator, schema, data)?.properties ?? {}
  );

  const firstQuestion = currentStepSchema?.properties?.[questions[0]];

  return (
    <Card style={{ minHeight: "300px" }}>
      <Card.Header className="d-flex flex-row justify-content-between">
        <Card.Title className="my-1">{schema.title}</Card.Title>
        <button
          type="button"
          onClick={() => onCancel(id)}
          className="close ml-4"
          aria-label="Sluit"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between">
        {questions[0] === "output" || questions[0] === "error" ? (
          <Output
            id={id}
            type={questions[0] as "output" | "error"}
            output={firstQuestion}
            step={step}
            handlePrev={handlePrev}
            onSubmit={onSubmit}
            data={data}
          />
        ) : (
          <Form
            schema={currentStepSchema as RJSFSchema}
            uiSchema={uiSchema}
            formData={{
              [questions[0]]: data[questions[0]],
            }}
            onSubmit={(data) => handleNext(data.formData)}
            validator={validator}
            customValidate={handleValidate}
            className="d-flex flex-column justify-content-between flex-grow-1"
          >
            <div className="d-flex flex-row justify-content-between flex-row-reverse">
              <Button variant="primary" type="submit">
                Volgende
              </Button>
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handlePrev}
                  style={{ marginRight: "8px" }}
                >
                  Vorige
                </Button>
              )}
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default WizardForm;
