import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { CategoryWithTaskList } from "../../task-list/shared/tasks.types";

const getAllTaskListsForCategory = async (categoryName: string): Promise<CategoryWithTaskList> => {
  return apiRequest<CategoryWithTaskList>("get", `${endpoints.category}/${categoryName}`);
};

export const getAllTaskListsForCategoryQueryOptions = (categoryName: string) =>
  queryOptions({
    queryKey: ["task-lists", categoryName.toLowerCase()],
    queryFn: () => getAllTaskListsForCategory(categoryName),
    enabled: !!categoryName,
    staleTime: 0,
  });

export const useGetAllTaskListsForCategory = (categoryName: string) => {
  return useQuery(getAllTaskListsForCategoryQueryOptions(categoryName));
};
