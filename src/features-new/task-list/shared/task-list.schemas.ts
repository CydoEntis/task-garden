import { z } from "zod";

export const newTaskListSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
});

export const updateTaskListSchema = newTaskListSchema.extend({
  id: z.number().min(1, "Task list ID is required"),
});
