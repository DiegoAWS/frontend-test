export const eachUserFieldIsDefinedAndNotFalsy = (user) => {
  const { name, lastName, age, email, linkedinProfile } = user;

  return (
    !!name &&
    name.length > 2 &&
    lastName &&
    lastName.length > 2 &&
    age &&
    email &&
    linkedinProfile
  );
};

export const isValidAge = (age) =>
  !isNaN(parseInt(age)) && parseInt(age) >= 16 && parseInt(age) < 120;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,6})+$/;

export const isValidEmail = (email) => emailRegex.test(email);

const linkedinURLRegex =
  /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/([a-z0-9-.]+\/?)+$/;

export const isValidLinkedinURL = (url) => linkedinURLRegex.test(url);

export const isValidUser = (user) =>
  eachUserFieldIsDefinedAndNotFalsy(user) &&
  isValidAge(user.age) &&
  isValidEmail(user.email) &&
  isValidLinkedinURL(user.linkedinProfile);
