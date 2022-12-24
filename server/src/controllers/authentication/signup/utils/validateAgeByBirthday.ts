export const isValidAge = (birthday: string) => {
  // birthday is a string in the format DD-MM-YYYY
  //validate the age to be over 18 by birthdate
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
};
