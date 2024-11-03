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

  const flattenSchema = (
    resolvedSchema: any,
    definitions: any,
    rootSchema: any
  ): GenericObjectType => {
    const flattenedProperties: any = {};
    const processedRefs = new Set<string>(); // Track processed refs to prevent infinite loops

    // Helper to process a single reference
    const processRef = (refValue: any, key: string) => {
      const refPath = refValue.$ref.replace("#/definitions/", "");
      // Prevent infinite loops
      if (processedRefs.has(refPath)) {
        return;
      }
      processedRefs.add(refPath);

      const refSchema = definitions[refPath];
      if (refSchema) {
        const resolvedRef = retrieveSchema(
          validator,
          refSchema,
          rootSchema,
          data
        );
        addProperties({ properties: { [key]: resolvedRef } });
      }
    };

    // Helper to add properties from a schema object
    const addProperties = (schemaObject: any) => {
      // Handle regular properties
      Object.entries(schemaObject.properties || {}).forEach(
        ([key, value]: [string, any]) => {
          if (value && typeof value === "object") {
            if ("$ref" in value) {
              processRef(value, key);
            } else if ("properties" in value) {
              addProperties(value);
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
            const matchingSchema = dependency.oneOf.find((oneOfSchema: any) => {
              const enumValue = oneOfSchema.properties?.[key]?.enum?.[0];
              return enumValue === data[key];
            });

            if (matchingSchema?.properties) {
              // Process each property in the matching dependency schema
              Object.entries(matchingSchema.properties).forEach(
                ([depKey, depValue]) => {
                  if (depKey !== key) {
                    if (depValue && typeof depValue === "object") {
                      if ("$ref" in depValue) {
                        processRef(depValue, depKey);
                      } else if ("properties" in depValue) {
                        addProperties({ properties: { [depKey]: depValue } });
                      } else {
                        flattenedProperties[depKey] = depValue;
                      }
                    } else {
                      flattenedProperties[depKey] = depValue;
                    }
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
    console.log("After retrieveSchema:", {
      resolvedSchema: resolvedSchema,
      resolvedProperties: resolvedSchema.properties,
    });

    // Then flatten it while maintaining access to the root schema for nested references
    const flattenedSchema = flattenSchema(
      resolvedSchema,
      schema.definitions,
      schema
    );

    const keys = Object.keys(flattenedSchema?.properties ?? {});
    const property = keys[step];
    console.log("After flattenSchema:", {
      flattenedProperties: flattenedSchema.properties,
      propertySchema: flattenedSchema?.properties?.[property],
    });

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
