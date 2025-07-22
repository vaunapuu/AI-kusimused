import Form from "@rjsf/bootstrap-4";
import { FormProps } from "@rjsf/core";
import { GenericObjectType, retrieveSchema, RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Output from "./Output";
import { useTranslation } from "react-i18next";
import CustomFieldTemplate from "./CustomFieldTemplate";

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
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(formData || {});

  const flattenSchema = (
    resolvedSchema: any,
    rootSchema: any
  ): GenericObjectType => {
    const flattenedProperties: any = {};
    const requiredFields: string[] = [];

    // Helper to add properties from a schema object
    const addProperties = (schemaObject: any) => {
      // Add required fields from this schema object
      if (schemaObject.required) {
        requiredFields.push(...schemaObject.required);
      }

      // Handle regular properties
      Object.entries(schemaObject.properties || {}).forEach(
        ([key, value]: [string, any]) => {
          if (value && typeof value === "object") {
            if ("properties" in value) {
              // If it's a nested object with properties, resolve and add its properties
              const resolvedNestedSchema = retrieveSchema(
                validator,
                value,
                rootSchema,
                data
              );
              addProperties(resolvedNestedSchema);
            } else {
              flattenedProperties[key] = value;
            }
          } else {
            flattenedProperties[key] = value;
          }
        }
      );

      // Handle dependencies
      Object.entries(schemaObject.dependencies || {}).forEach(
        ([key, dependency]: [string, any]) => {
          if (data[key] && dependency.oneOf) {
            // Find matching schema in oneOf array
            const matchingSchema = dependency.oneOf.find((oneOfSchema: any) => {
              const enumValue = oneOfSchema.properties?.[key]?.enum?.[0];
              return enumValue === data[key];
            });

            if (matchingSchema) {
              // Resolve the matching schema
              const resolvedDependencySchema = retrieveSchema(
                validator,
                matchingSchema,
                rootSchema,
                data
              );

              // Add required fields from the dependency schema
              if (resolvedDependencySchema.required) {
                requiredFields.push(...resolvedDependencySchema.required);
              }

              // Add properties from the resolved dependency schema
              Object.entries(resolvedDependencySchema.properties || {}).forEach(
                ([depKey, depValue]) => {
                  if (depKey !== key) {
                    flattenedProperties[depKey] = depValue;
                  }
                }
              );
            }
          }
        }
      );
    };

    // Start with the main schema
    addProperties(resolvedSchema);

    return {
      ...resolvedSchema,
      properties: flattenedProperties,
      required: requiredFields,
    };
  };

  const getCurrentStepSchema = (
    validator: FormProps<any, RJSFSchema, any>["validator"],
    schema: FormProps<any, RJSFSchema, any>["schema"],
    currentData: FormProps<any, RJSFSchema, any>["formData"]
  ): GenericObjectType => {
    // First resolve the schema with the full root schema
    const resolvedSchema = retrieveSchema(
      validator,
      schema,
      schema,
      currentData
    );

    // Then flatten it while maintaining access to the root schema for nested references
    const flattenedSchema = flattenSchema(resolvedSchema, schema);

    const keys = Object.keys(flattenedSchema?.properties ?? {});
    const property = keys[step];

    if (flattenedSchema?.properties?.[property]) {
      return {
        type: "object",
        required: flattenedSchema?.required?.filter(
          (x: string) => x === property
        ),
        definitions: schema.definitions,
        properties: { [property]: flattenedSchema?.properties?.[property] },
      };
    }

    return {
      type: "object",
      properties: {
        error: {
          title: t("error title"),
          type: "string",
          default: t("error message"),
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
      errors[currentField].addError(t("required field"));
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
          aria-label="Close"
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
            fullSchema={schema}
            validator={validator}
          />
        ) : (
          <Form
            schema={currentStepSchema as RJSFSchema}
            uiSchema={uiSchema}
            formData={
              data[questions[0]]
                ? {
                    [questions[0]]: data[questions[0]],
                  }
                : {}
            }
            onSubmit={(data) => handleNext(data.formData)}
            validator={validator}
            customValidate={handleValidate}
            templates={{ FieldTemplate: CustomFieldTemplate }}
            className="d-flex flex-column justify-content-between flex-grow-1"
          >
            <div className="d-flex flex-row justify-content-between flex-row-reverse">
              <Button variant="primary" type="submit">
                {t("next")}
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
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default WizardForm;
