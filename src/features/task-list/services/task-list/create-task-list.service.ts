import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreatedTaskList, CreateTaskList } from "../../shared/tasks.types";

const createTaskList = async (request: CreateTaskList): Promise<CreatedTaskList> => {
  return apiRequest<CreatedTaskList>("post", `${endpoints.tasklist}`, request);
};

export function useCreateTaskListMutation(categoryName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: CreateTaskList): Promise<CreatedTaskList> => {
      return await createTaskList(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", categoryName],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: () => {
      notifications.show({
        title: "Task List Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
