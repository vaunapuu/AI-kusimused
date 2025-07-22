import { retrieveSchema, RJSFSchema } from "@rjsf/utils";

export function getFlattenedTitles(
  fullSchema: RJSFSchema,
  validator: any,
  formData: Record<string, any>
): Record<string, string> {
  const resolvedSchema = retrieveSchema(
    validator,
    fullSchema,
    fullSchema,
    formData
  );

  const titles: Record<string, string> = {};

  function walk(schema: any) {
    if (schema.properties) {
      for (const [key, value] of Object.entries(schema.properties)) {
        if (value && typeof value === "object") {
          const title = (value as any).title;
          if (title) titles[key] = title;

          // Recurse into nested schemas
          if ("properties" in value) {
            walk(value);
          }
        }
      }
    }
    // If dependencies exist and are triggered by formData
    if (schema.dependencies) {
      for (const [key, dep] of Object.entries(schema.dependencies)) {
        if (formData[key] && (dep as any).oneOf) {
          const matched = (dep as any).oneOf.find(
            (o: any) => o.properties?.[key]?.enum?.[0] === formData[key]
          );
          if (matched) {
            walk(retrieveSchema(validator, matched, fullSchema, formData));
          }
        }
      }
    }
  }

  walk(resolvedSchema);
  return titles;
}
