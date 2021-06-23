import {
  eachUserFieldIsDefinedAndNotFalsy,
  isValidAge,
  isValidEmail,
  isValidLinkedinURL,
  isValidUser,
} from "./validators";

describe("testing validators functions", () => {
  const mockUser0 = {
    name: "John",
    lastName: "Doe",
    age: 25,
    email: "john.doe@gmail.com",
    linkedinProfile: "https://cl.linkedin.com/company/john-doe",
  };
  const mockUser1 = {
    name: "Ana",
    lastName: "Frank",
    age: 82,
    email: "anna.frank.memorial@gmail.com",
    linkedinProfile: "https://cl.linkedin.com/company/anna-frank-memoria",
  };

  const failUser0 = { ...mockUser0, name: null };
  const failUser1 = { ...mockUser0, lastName: undefined };

  it("testing eachUserFieldIsDefinedAndNotFalsy", () => {
    const shouldPassTheValidation = [mockUser0, mockUser1];
    const shouldFailTheValidation = [{}, failUser0, failUser1];

    shouldPassTheValidation.forEach((item) => {
      expect(eachUserFieldIsDefinedAndNotFalsy(item)).toBeTruthy();
    });

    shouldFailTheValidation.forEach((item) => {
      expect(eachUserFieldIsDefinedAndNotFalsy(item)).toBeFalsy();
    });
  });

  it("testing isValidAge", () => {
    const shouldPassTheValidation = ["16", "25", "40", "100"];
    const shouldFailTheValidation = [{}, "AA", "15", "150"];

    shouldPassTheValidation.forEach((item) => {
      expect(isValidAge(item)).toBeTruthy();
    });

    shouldFailTheValidation.forEach((item) => {
      expect(isValidAge(item)).toBeFalsy();
    });
  });

  it("testing isValidEmail", () => {
    const shouldPassTheValidation = [mockUser0.email, mockUser1.email];
    const shouldFailTheValidation = [
      "diego.netsolutions@@gmail.com",
      "diego.netsolutionsmail.com",
      "diego.netsolutions@gmail.",
    ];

    shouldPassTheValidation.forEach((item) => {
      expect(isValidEmail(item)).toBeTruthy();
    });

    shouldFailTheValidation.forEach((item) => {
      expect(isValidEmail(item)).toBeFalsy();
    });
  });

  it("testing isValidLinkedin", () => {
    const shouldPassTheValidation = [
      mockUser0.linkedinProfile,
      mockUser1.linkedinProfile,
    ];
    const shouldFailTheValidation = [
      "https://cl.google.com/company/anna-frank-memoria",
      "httpcl.linkedin.com/company/anna-frank-memoria",
      "diego.netsolutions@gmail.com",
    ];

    shouldPassTheValidation.forEach((item) => {
      expect(isValidLinkedinURL(item)).toBeTruthy();
    });

    shouldFailTheValidation.forEach((item) => {
      expect(isValidLinkedinURL(item)).toBeFalsy();
    });
  });

  it("testing isValidUser", () => {
    const shouldPassTheValidation = [mockUser0, mockUser1];
    const shouldFailTheValidation = [{}, failUser0, failUser1];

    shouldPassTheValidation.forEach((item) => {
      expect(isValidUser(item)).toBeTruthy();
    });

    shouldFailTheValidation.forEach((item) => {
      expect(isValidUser(item)).toBeFalsy();
    });
  });
});
