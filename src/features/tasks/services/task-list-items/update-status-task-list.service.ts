import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTasklistItemStatus, UpdateTasklistItemStatus } from "../../shared/tasks.types";

const updateTasklistStatusItem = async (request: UpdateTasklistItemStatus): Promise<UpdatedTasklistItemStatus> => {
  return apiRequest("put", `${endpoints.tasklist}/${request.tasklistId}/items/status`, request);
};

export function useUpdateTasklistStatusItemMutation(tasklistId: number, page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: UpdateTasklistItemStatus): Promise<UpdatedTasklistItemStatus> => {
      return await updateTasklistStatusItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", tasklistId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId, page],
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
