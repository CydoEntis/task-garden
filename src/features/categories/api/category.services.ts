import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import { TaskListResponse } from "../../task-list/shared/task-list.types";
import {
  NewCategoryRequest,
  NewCategoryResponse,
  CategoryResponse,
} from "../shared/category.types";

export const createCategory = async (
  newCategory: NewCategoryRequest
): Promise<NewCategoryResponse> => {
  const response = (await apiClient.post(`${endpoints.category}`, newCategory))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const response = (await apiClient.get(`${endpoints.category}`)).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const getAllTaskListsForCategory = async (
  category: string
): Promise<TaskListResponse[]> => {
  const response = (await apiClient.get(`${endpoints.category}/${category}`))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
