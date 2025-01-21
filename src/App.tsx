import { useState } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks2/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks2/data";
import { Calendar, Divide } from "lucide-react";
import ThemeToggle from "./components/theme/ThemeToggle";
import InProgressTaskListCard from "./features/task-list/InProgressTaskListCard";
import CompletedTaskListCard from "./features/task-list/CompletedTaskListCard";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import TomatoStage3 from "./assets/crops/tomato-stage-3.png";
import useAuthStore from "./stores/useAuthStore";

function App() {
  const { user } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleToggleCard = (cardId: number) => {
    setOpenCard((prev) => (prev === cardId ? null : cardId));
  };

  const stage = 3;

  return (
    <>
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user!.username}</Title>
        <Group align="center" gap={4}>
          <Text c="dimmed">Your tomatos are almost fully grown!</Text>
          <Avatar size="sm" w={30} h={30} src={TomatoStage3} />
        </Group>
        <Group grow gap={5} mt="xs">
          <Progress
            size="xs"
            color="lime"
            value={stage > 0 ? 100 : 0}
            transitionDuration={0}
          />
          <Progress
            size="xs"
            color="lime"
            transitionDuration={0}
            value={stage < 2 ? 0 : 100}
          />
          <Progress
            size="xs"
            color="lime"
            transitionDuration={0}
            value={stage < 3 ? 0 : 100}
          />
          <Progress
            size="xs"
            color="lime"
            transitionDuration={0}
            value={stage < 4 ? 0 : 100}
          />
        </Group>
      </Stack>

      <TaskListTabs />
    </>
  );
}

export default App;
