export const isValidPlate = (plate: string | undefined): boolean => {
  if (!plate) return false;

  const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  const regexOld = /^[A-Z]{3}-[0-9]{4}$/;

  const cleanedPlate = plate.replace(/\s/g, '').toUpperCase();

  return regexMercosul.test(cleanedPlate) || regexOld.test(cleanedPlate);
};
