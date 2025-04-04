import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreatedTasklistWithCategory, CreateTasklistWithCategory } from "../../shared/tasks.types";

export const createCategoryWithTasklist = async (
  request: CreateTasklistWithCategory
): Promise<CreatedTasklistWithCategory> => {
  return apiRequest<CreatedTasklistWithCategory>("post", endpoints.tasklist + "/with-category", request);
};

export function useCreateTasklistWithCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryWithTasklist,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      queryClient.invalidateQueries({ queryKey: ["categories", "list-with-count"] });
      queryClient.invalidateQueries({ queryKey: ["task-lists", "list"] });
      queryClient.invalidateQueries({ queryKey: ["task-lists", data.categoryName.toLowerCase()] });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
