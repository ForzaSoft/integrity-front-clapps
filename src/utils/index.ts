const shortTimeFormatter = new Intl.DateTimeFormat('es-ES', { timeStyle: 'short' }).format;

/**
 * Formatea una fecha en formato corto (hora y minutos) en español.
 *
 * Si la fecha no es válida, devuelve la cadena original, asumiendo que es de la
 * forma 'HH:mm'.
 *
 * @param source - La fecha a formatear.
 * @returns La fecha formateada en formato corto (hora y minutos).
 */
export const formatTime = (source?: string | null): string => {
  if (!source) return '';

  try {
    return shortTimeFormatter(new Date(source));
  } catch {
    return source;
  }
};

/**
 * Formatea una fecha en formato 'YYYY-MM-DD'.
 *
 * @param date - La fecha a formatear.
 * @returns La fecha formateada en formato 'YYYY-MM-DD'.
 */
export const formatDate = (date: Date): string => date.toISOString().split('T')[0];

/**
 * Devuelve la fecha actual en español en formato 'DD MMM, YYYY'.
 *
 * Ejemplo: '1 Enero, 2023'.
 *
 * @returns La fecha actual en formato 'DD MMM, YYYY'.
 */
export const currentDateString = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
};

const asciiify = (str: string): string =>
  str
    .normalize('NFD') // Normaliza la cadena para descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina los caracteres de acento
    .toLowerCase(); // Convierte a minúsculas

/**
 * Verifica si una cadena contiene otra, ignorando acentos y mayúsculas.
 *
 * @param highstak - La cadena principal.
 * @param niddle - La cadena a buscar.
 * @returns true si highstak contiene niddle, false en caso contrario.
 */
export const localeIncludes = (highstak: string, niddle: string): boolean =>
  asciiify(highstak).includes(asciiify(niddle));
