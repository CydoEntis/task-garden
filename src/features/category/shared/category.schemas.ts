import { z } from "zod";
import { categoryColors, validCategoryTags } from "./category.constants";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(25, "Name must be at most 25 characters long."),
  tag: z.enum(validCategoryTags, {
    errorMap: () => ({ message: "You must select a valid icon." }),
  }),
  color: z.enum(categoryColors, {
    errorMap: () => ({ message: "You must select a valid color." }),
  }),
});

export const selectCategorySchema = z.object({
  id: z.number().min(1, "Category is required"),
});

export const updateCategorySchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(25, "Name must be at most 25 characters long."),
  tag: z.enum(validCategoryTags, {
    errorMap: () => ({ message: "You must select a valid icon." }),
  }),
  color: z.enum(categoryColors, {
    errorMap: () => ({ message: "You must select a valid color." }),
  }),
});
