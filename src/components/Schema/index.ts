import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    // .min(8, "Must be at least 8 characters")
    .required("Password is required"),
  avatarUrl: yup.string(),
  venueManager: yup.boolean(),
});

export const venueSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    media: yup.string(),
    price: yup
      .number()
      .typeError("Price is required")
      .required("Price is required"),
    maxGuests: yup
      .number()
      .typeError("No of guests is required")
      .required("No of guests is required"),
    rating: yup.number(),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    petsAllowed: yup.boolean(),
  })
  .required();
