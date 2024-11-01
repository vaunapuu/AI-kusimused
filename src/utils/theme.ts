export function updateThemeColors(primary: string) {
  const root = document.documentElement;

  // Convert primary color to RGB for calculations
  const getRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Darken color function
  const darken = (hex: string, percent: number) => {
    const rgb = getRGB(hex);
    const darker = rgb.map((c) =>
      Math.max(0, Math.floor(c * (1 - percent / 100)))
    );
    return `rgb(${darker.join(",")})`;
  };

  // Update CSS variables
  root.style.setProperty("--host-primary", primary);
  root.style.setProperty("--host-primary-dark", darken(primary, 15));
  root.style.setProperty("--host-primary-darker", darken(primary, 20));
  root.style.setProperty("--host-primary-shadow", `${primary}40`); // 40 is 0.25 opacity in hex

  // Calculate and set body background (15% mix with white)
  const rgb = getRGB(primary);
  const bodyBg = `rgb(${rgb
    .map((c) => Math.floor(c * 0.15 + 255 * 0.85))
    .join(",")})`;
  root.style.setProperty("--host-body-bg", bodyBg);
}
