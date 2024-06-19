export const isValidYear = (
  year: string | number | undefined,
  startYear?: number,
  endYear?: number,
): boolean => {
  if (!year) return false;

  const yearStr = year.toString();

  if (!/^\d{4}$/.test(yearStr)) return false;

  const yearNum = parseInt(yearStr, 10);

  if (startYear !== undefined && endYear !== undefined) {
    return yearNum >= startYear && yearNum <= endYear;
  }

  return true;
};
