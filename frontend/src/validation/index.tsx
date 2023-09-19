import * as Yup from "yup";

export const CREATE_USER = Yup.object().shape({
  name: Yup.string().max(50, 'maksimal panjang nama 50 huruf').required("nama harus diisi"),
  username: Yup.string().max(50, 'maksimal panjang nama 50 huruf').required("nama harus diisi"),
  email: Yup.string().email("email harus valid").required("nama harus diisi")
  .test(
      "domain",
      "Email is not valid",
      (value) => {
          if (value) {
              const supportedProviders = ["gmail.com", "yahoo.com", "yahoo.co.id", "hotmail.com"];
              const domain = value.split("@")[1];
              return supportedProviders.includes(domain);
            }
            return true;
        }
        ),
    password: Yup.string().max(50, 'maksimal panjang nama 50 huruf').min(5, 'min length password 5 character').required("nama harus diisi"),
    confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), ], 'Passwords must match'),
});

export const LOGIN = Yup.object().shape({
    email: Yup.string().email("email harus valid").required("email harus diisi"),
    password: Yup.string().required("password harus diisi"),
});
