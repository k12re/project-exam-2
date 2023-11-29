import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
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
