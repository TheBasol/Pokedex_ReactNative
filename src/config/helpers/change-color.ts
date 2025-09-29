export const darkenColor = (hex: string, amount: number = 0.2): string => {
  // Elimina el # si existe
  hex = hex.replace(/^#/, '');
  // Convierte a RGB
  let num = parseInt(hex, 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;
  // Oscurece cada canal
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));
  // Devuelve el nuevo color en hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const isLightColor = (hex: string): boolean => {
  hex = hex.replace(/^#/, '');
  let num = parseInt(hex, 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;
  // Fórmula de luminosidad
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 200; // Puedes ajustar el umbral
}