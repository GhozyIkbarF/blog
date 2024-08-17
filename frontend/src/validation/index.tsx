import * as Yup from "yup";

const CREATE_USER = Yup.object().shape({
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
    photo_profile: Yup.mixed()
    .test('fileType', 'Unsupported File Format', function (value) {
      if (value === "") return true; // Allow already saved URLs (strings)
      if (typeof value === 'string') return true; // Allow already saved URLs (strings)
      if (value instanceof FileList) value = value[0]; // Get the actual file if using FileList

      return value && true;
    }).nullable(),
  password: Yup.string()
    .max(50, "Maximum password 50 characters")
    .min(6, "Minimum password 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password doesn't match"),
});

const LOGIN = Yup.object().shape({
  email: Yup.string()
    .email("Must a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const EDIT_PROFILE = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Must be a valid email address").required("Email is required"),
  password: Yup.string().required('Password is required'),
});

const EDIT_PASSWORD = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
  .required("Confirm Password is required")
  .oneOf([Yup.ref("newPassword")], "Password doesn't match"),
});

const CREATE_POST = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  published: Yup.boolean().required('Published is required'),
  category: Yup.string().required('Category is required'),
  file: Yup.mixed().test('fileType', 'File must be a valid FileList or a string', function (value) {
    if (value instanceof FileList || typeof value === 'string') {
      return true;
    } else {
      return this.createError({ message: 'File must be a valid FileList or a string' });
    }
  }).required('File is required'),
});

export { CREATE_USER, LOGIN, EDIT_PROFILE, EDIT_PASSWORD, CREATE_POST}