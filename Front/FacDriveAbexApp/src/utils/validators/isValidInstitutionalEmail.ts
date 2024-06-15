export const isValidInstitutionalEmail = (
  email: string | undefined,
): boolean => {
  if (!email) return false;

  const institutionalEmailRegex =
    /^[a-z0-9]+[\._]?[a-z0-9]+@unochapeco\.edu\.br$/;
  return institutionalEmailRegex.test(email);
};
