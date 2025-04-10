import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTaskListItemStatus, UpdateTaskListItemStatus } from "../../shared/tasks.types";

const updateTaskListStatusItem = async (request: UpdateTaskListItemStatus): Promise<UpdatedTaskListItemStatus> => {
  return apiRequest("put", `${endpoints.tasklist}/${request.taskListId}/items/status`, request);
};

export function useUpdateTaskListStatusItemMutation(taskListId: number, page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: UpdateTaskListItemStatus): Promise<UpdatedTaskListItemStatus> => {
      return await updateTaskListStatusItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", taskListId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId, page],
      });
      queryClient.invalidateQueries({
        queryKey: ["task-list", "today", page],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
