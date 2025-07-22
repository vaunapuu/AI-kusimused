export function dictionaryToCsv(
  data: Record<string, string>,
  titles: Record<string, string>
): string {
  const entries = Object.entries(data);

  const headers = entries.map(([key]) =>
    key === "output" ? "Järeldus" : titles[key] ?? key
  );
  const values = entries.map(([, value]) => value);

  return `${headers.join(";")}\n${values.join(";")}`;
}
