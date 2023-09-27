import * as Yup from "yup";

export const CREATE_USER = Yup.object().shape({
  name: Yup.string()
    .max(50, "Maximum name 50 characters")
    .required("Name is required"),
  username: Yup.string()
    .max(50, "Maximum username 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required")
    .test("domain", "Email is not valid", (value) => {
      if (value) {
        const supportedProviders = [
          "gmail.com",
          "yahoo.com",
          "yahoo.co.id",
          "hotmail.com",
        ];
        const domain = value.split("@")[1];
        return supportedProviders.includes(domain);
      }
      return true;
    }),
  photo_profile: Yup.string().nullable(),
  password: Yup.string()
    .max(50, "Maximum password 50 characters")
    .min(6, "Minimum password 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password doesn't match"),
});

export const LOGIN = Yup.object().shape({
  email: Yup.string()
    .email("Must a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const EDIT_PROFILE = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Must be a valid email address").required("Email is required"),
  password: Yup.string().required('Password is required'),
});

export const EDIT_PASSWORD = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Password doesn't match"),
});