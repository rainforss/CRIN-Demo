import * as Yup from "yup";

export const contactFormSubmissionSchema = Yup.object().shape({
  bsi_firstname: Yup.string()
    .trim()
    .min(1, "Please enter your first name")
    .required("First name is required."),
  bsi_lastname: Yup.string()
    .trim()
    .min(1, "Please enter your last name")
    .required("Last name is required."),
  bsi_email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  bsi_message: Yup.string()
    .trim()
    .min(10, "Message is too short.")
    .required("Please enter your message to us."),
  recaptcha: Yup.string().required(
    "Please complete reCAPTCHA before submitting."
  ),
});

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(1, "Please enter your official first name")
    .required("First name is required."),
  lastName: Yup.string()
    .trim()
    .min(1, "Please enter your official last name")
    .required("Last name is required."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  username: Yup.string()
    .trim()
    .min(6, "Username must contain at least 6 characters")
    .max(12, "Username cannot contain more than 12 characters")
    .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed")
    .required("Username is required."),
  password: Yup.string()
    .trim()
    .min(6, "Password must contain at least 6 characters")
    .matches(
      /^(?=.{10,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
      "Password must contain at least one uppercase character, one lowercase character and one special character."
    )
    .required("Password is required."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
