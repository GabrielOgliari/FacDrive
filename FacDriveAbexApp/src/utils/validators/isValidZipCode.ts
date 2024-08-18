export const isValidZipCode = (zipCode: string | undefined): boolean => {
  if (!zipCode) return false;

  const zipCodeRegex = /^\d{5}-\d{3}$/;
  return zipCodeRegex.test(zipCode);
};
