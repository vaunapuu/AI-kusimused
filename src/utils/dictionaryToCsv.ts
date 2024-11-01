export const dictionaryToCsv = (
  dict: Record<string, string | number>
): string => {
  // If dictionary is empty, return empty string
  if (Object.keys(dict).length === 0) return "";

  // Create header row from keys
  const headers = Object.keys(dict).sort();

  // Create data row from values
  const values = headers.map((key) => {
    const value = dict[key];
    // Handle values that need quotes (only strings can contain commas)
    return typeof value === "string" && value.includes(",")
      ? `"${value.replace(/"/g, '""')}"`
      : value;
  });

  return `${headers.join(";")}\n${values.join(";")}`;
};
