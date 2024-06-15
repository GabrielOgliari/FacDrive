export const isValidEmail = (email: string | undefined): boolean => {
  if (!email) return false;

  const emailRegex =
    /^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
