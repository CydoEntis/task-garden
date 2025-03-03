import { Paper, Title, Text, Stack, Group, Button, Avatar } from "@mantine/core";
import { Plus } from "lucide-react";
import { TaskListDetails } from "../shared/task-list-details.types";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "@tanstack/react-router";
import UpdateTaskListModal from "../../task-list/components/UpdateTaskListModal";
import { useDeleteTaskListMutation } from "../../task-list/services/delete-task-list.service";
import { useState } from "react";
import CreateTaskListItemButton from "../../task-list-item/components/CreateTaskListItemButton";
import UpsertTaskListItem from "./UpsertTaskListItem";

type TaskListDetailsCardProps = {
  onOpenAddTask: () => void;
  taskListDetails: TaskListDetails;
};

function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [isUpdateTaskListOpened, { open: onOpenUpdateTaskListModal, close: onCloseTaskListModal }] =
    useDisclosure(false);
  const deleteTaskList = useDeleteTaskListMutation();
  const navigate = useNavigate();

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isCreatingTaskItem, setIsCreatingTaskItem] = useState(false);

  const deleteTaskListHandler = async () => {
    await deleteTaskList.mutateAsync(taskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  const showTaskItemFormHandler = () => setIsCreatingTaskItem((prevState) => !prevState);

  return (
    <>
      <UpdateTaskListModal
        onClose={onCloseTaskListModal}
        isOpen={isUpdateTaskListOpened}
        taskList={{
          taskListId: taskListDetails.id,
          name: taskListDetails.name,
          description: taskListDetails.description,
          categoryName: categoryName,
        }}
      />

      <Paper p={16} radius="md" mt={16}>
        <Stack gap={2} mb={16}>
          <Group justify="space-between" align="center">
            <Title>{taskListDetails.name}</Title>
            <UpdateAndDeleteMenu onUpdate={onOpenUpdateTaskListModal} onDelete={deleteTaskListHandler} />
          </Group>
          <Text c="dimmed">{taskListDetails.description}</Text>
          <Group gap={8}>
            <Button size="xs" variant="light" color="lime">
              Details
            </Button>
            <Button size="xs" variant="subtle" color="inverse">
              Comments
            </Button>
            <Button size="xs" variant="subtle" color="inverse">
              Attachments
            </Button>
          </Group>
          <Stack mt={16} gap={4}>
            <Text size="xs">Members</Text>
            <Group justify="space-between" align="center">
              <Avatar.Group>
                {taskListDetails.members.map((member) => (
                  <Avatar key={member.userId} color="initials" name={member.name} />
                ))}
                <Avatar>
                  <Plus size={20} />
                </Avatar>
              </Avatar.Group>
              <CreateTaskListItemButton isCreating={isCreatingTaskItem} onCreate={showTaskItemFormHandler} />
            </Group>
          </Stack>
        </Stack>

        {/* Show Create Task Input */}
        {isCreatingTaskItem && (
          <UpsertTaskListItem
            taskListId={taskListDetails.id}
            isActive={isCreatingTaskItem}
            onSuccess={() => setIsCreatingTaskItem(false)}
            onCancel={() => setIsCreatingTaskItem(false)}
          />
        )}

        {/* Render Task Items */}
        {taskListDetails.taskListItems.map((taskListItem) => (
          <div key={taskListItem.id} onDoubleClick={() => setEditingTaskId(taskListItem.id)}>
            {editingTaskId === taskListItem.id ? (
              <UpsertTaskListItem
                isActive={true}
                taskListId={taskListItem.id}
                taskListItem={taskListItem}
                onSuccess={() => setEditingTaskId(null)}
                onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <p>{taskListItem.description}</p>
            )}
          </div>
        ))}
      </Paper>
    </>
  );
}

export default TaskListDetailsCard;
