import { z } from "zod";
import {
  createTasklistItemSchema,
  createTasklistSchema,
  createTasklistWithCategorySchema,
  updateTasklistItemSchema,
  updateTasklistSchema,
} from "./tasks.schemas";
import { Member, SuccessMessage } from "../../shared/shared.types";

export type CreateTasklist = z.infer<typeof createTasklistSchema>;

export type CreatedTasklist = SuccessMessage & {
  tasklistPreview: TasklistInfo;
};

export type UpdateTasklist = z.infer<typeof updateTasklistSchema>;

export type UpdatedTasklist = CreateTasklist;

export type DeletedTasklist = SuccessMessage & {
  id: number;
};

export type CategoryWithTasklists = {
  id: number;
  name: string;
  tag: string;
  color: string;
  tasklistsInfo: TasklistInfo[];
}

type CategoryInfo = {
  id: number;
  name: string;
  tag: string;
  color: string;
};

export type TasklistInfo = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  members: Member[];
  totalTasksCount: number;
  completedTasksCount: number;
  taskCompletionPercentage: number;
};

export type CategoryAndTasklistInfo = {
  categoryInfo: CategoryInfo;
  tasklistInfo: TasklistInfo;
}


export type Tasklist = {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  isCompleted: boolean;
  members: Member[];
  tasklistItems: TasklistItem[];
  totalTasksCount: number;
  completedTasksCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTasklistWithCategory = z.infer<typeof createTasklistWithCategorySchema>;

export interface CreatedTasklistWithCategory {
  categoryId: number;
  categoryName: string;
  tasklistId: number;
  tasklistName: string;
  message: string;
}

// Task List Item Types

export type CreateTasklistItem = z.infer<typeof createTasklistItemSchema>;

export type CreatedTasklistItem = SuccessMessage & {
  tasklistId: number;
  tasklistItemDetail: TasklistItem;
};

export type CreatedTasklistItems = SuccessMessage & {
  tasklistId: number;
  tasklistItemDetails: TasklistItem[];
};

export type UpdateTasklistItem = z.infer<typeof updateTasklistItemSchema>;

export type UpdatedTasklistItem = CreatedTasklistItem;

export type ReorderTasklistItems = {
  items: TasklistItemPosition[];
};

export type TasklistItemStatus = {
  id: number;
  isCompleted: boolean;
};

export type TasklistItemPosition = {
  id: number;
  position: number;
};

export type TasklistItem = {
  id: number;
  description: string;
  isCompleted: boolean;
  position: number;
};
