import { Box, Button, Title, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useParams } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import { ValidIconTags } from "../util/types/valid-icon.types";
import { CategoryWithTasklists, Tasklist, TasklistInfo } from "../features/tasks/shared/tasks.types";
import TasklistCard from "../features/tasks/components/task-card/TasklistCard";
import { useState } from "react";
import UpsertTasklistModal from "../features/tasks/components/upsert-task-list/UpsertTasklistModal";

type CategoryTasklistPageProps = {
  categoryTasklists: CategoryWithTasklists;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CategoryTasklistPage({ categoryTasklists }: CategoryTasklistPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });

  const [
    isUpsertTasklistModalOpened,
    { open: onOpenCreateTasklistWithCategoryModal, close: onCloseUpsertTasklistModal },
  ] = useDisclosure(false);

  const [selectedTasklist, setSelectedTasklist] = useState<undefined | Tasklist>(undefined);

  const openEditTasklistModal = (tasklist: TasklistInfo) => {
    setSelectedTasklist({
      id: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
    });
    onOpenCreateTasklistWithCategoryModal();
  };

  const handleClose = () => {
    setSelectedTasklist(undefined);
    onCloseUpsertTasklistModal();
  };

  return (
    <Box mt={32}>
      <UpsertTasklistModal isOpen={isUpsertTasklistModalOpened} onClose={handleClose} tasklist={selectedTasklist} />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(categoryTasklists.tag as ValidIconTags)}
            size="xl"
            iconColor="white"
            hasBackground
            backgroundColor={categoryTasklists.color}
          />
        }
        rightSection={
          <Button onClick={onOpenCreateTasklistWithCategoryModal} leftSection={<Plus size={20} />} color="lime">
            Task List
          </Button>
        }
      >
        <Title>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Title>
      </LazyHeader>

      {categoryTasklists.tasklistsInfo.length > 0 ? (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
            {categoryTasklists.tasklistsInfo.map((tasklist) => (
              <motion.div key={tasklist.id} variants={itemVariants}>
                <TasklistCard
                  tasklist={tasklist}
                  categoryName={categoryName}
                  onEdit={() => openEditTasklistModal(tasklist)}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      ) : (
        <Title ta="center" mt={32} c="dimmed">
          No task lists available
        </Title>
      )}
    </Box>
  );
}

export default CategoryTasklistPage;
