import { FormGeneration } from "./generated-types/form-generation.interface";

export const defaultConfiguration: FormGeneration = {
  title: "User registration",
  actions: [
    { name: "cancel", label: "Cancel", type: "default" },
    { name: "save", label: "Save", type: "default" },
  ],
  fields: [
    { label: "Fullname", name: "fullname", type: "input" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    {
      label: "Gender",
      name: "gender",
      type: "radio",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
    { label: "Children", name: "children", type: "number" },
    {
      label: "Where did you hear about us?",
      name: "marketing",
      type: "checkbox",
      options: [
        { label: "Internet", value: "internet" },
        { label: "TV", value: "tv" },
        { label: "Other", value: "other" },
      ],
    },
    { label: "Comments", name: "comments", type: "textarea" },
    {
      label: "",
      name: "agreeWithTC",
      type: "checkbox",
      options: [
        { label: "Agree with Terms and Conditions", value: "agreeWithTC" },
      ],
    },
  ],
};
