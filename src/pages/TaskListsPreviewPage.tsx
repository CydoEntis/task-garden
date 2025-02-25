import { useDisclosure } from "@mantine/hooks";
import { TaskList } from "../features-new/task-list/shared/task-list.types";
import CreateTaskListModal from "../features-new/task-list/components/CreateTaskListModal";
import GridList from "../components/GridList";
import InProgressTaskListCard from "../features-new/task-list/components/InProgressTaskListCard";
import { Box } from "@mantine/core";

type TaskListPage = {
  taskLists: TaskList[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] = useDisclosure(false);

  return (
    <>
      <CreateTaskListModal onClose={onCloseNewList} isOpened={isNewTaskListOpened} />
      <Box mt={32}>
        <GridList>
          {taskLists.map((taskList) => (
            <InProgressTaskListCard taskList={taskList} />
          ))}
        </GridList>
      </Box>
      {/* <TaskListsPreview onOpen={onOpenNewList} taskLists={taskLists} /> */}
    </>
  );
}

export default TaskListPage;
