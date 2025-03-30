import { useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TasklistItem } from "../../shared/tasks.types";

export const getPaginatedTasklistItems = async (
  tasklistId: number,
  page: number,
  pageSize: number
): Promise<{ items: TasklistItem[]; totalItems: number; completedTasksCount: number; totalTasksCount: number }> => {
  return apiRequest("get", `${endpoints.tasklist}/${tasklistId}/items`, { params: { page, pageSize } });
};

export const getPaginatedTasklistItemsQueryOptions = (tasklistId: number, page: number, pageSize: number) => ({
  queryKey: ["task-list-items", tasklistId, page, pageSize],
  queryFn: () => getPaginatedTasklistItems(tasklistId, page, pageSize),
  enabled: !!tasklistId,
  staleTime: 0,
});

export const useGetPaginatedTasklistItems = (tasklistId: number, page: number, pageSize: number) => {
  return useQuery(getPaginatedTasklistItemsQueryOptions(tasklistId, page, pageSize));
};
