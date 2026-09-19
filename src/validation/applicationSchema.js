import { z } from "zod";

export const createApplicationSchema = (fields = []) => {
  const shape = {};

  fields.forEach((field) => {
    let validator;

    // 1. Build the base rule based on input type
    if (field.type === "email") {
      validator = z.string().trim().email("Please enter a valid email address");
    } else if (field.type === "tel") {
      const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
      validator = z
        .string()
        .trim()
        .regex(phoneRegex, "Please enter a valid phone number");
    } else if (field.type === "date") {
      validator = z.string().trim().min(1, "Please select a date");
    } else if (field.type === "textarea") {
      validator = z
        .string()
        .trim()
        .min(10, `${field.label} must be at least 10 characters`);
    } else {
      validator = z
        .string()
        .trim()
        .min(1, `${field.label} is required`);
    }

    // 2. Apply optional vs required wrapper cleanly
    if (field.optional) {
      shape[field.id] = validator.optional().or(z.literal("")).or(z.null());
    } else {
      shape[field.id] = validator;
    }
  });

  return z.object(shape);
};