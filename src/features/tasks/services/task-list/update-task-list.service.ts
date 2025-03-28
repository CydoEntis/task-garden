import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { SuccessResponse, UpdateTasklist } from "../../shared/tasks.types";

const updateTasklist = async (updatedTasklist: UpdateTasklist): Promise<SuccessResponse> => {
  return apiRequest<SuccessResponse>("put", `${endpoints.Tasklist}`, updatedTasklist);
};

export function useUpdateTasklistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTasklist: UpdateTasklist): Promise<SuccessResponse> => {
      return await updateTasklist(updatedTasklist);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.TasklistId],
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
