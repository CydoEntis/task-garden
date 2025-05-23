import { Box, Flex, Paper, Title, SimpleGrid, Pagination, Stack, Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import { useSearch, useNavigate } from "@tanstack/react-router";

import { FavoritedTaskList } from "../../shared/tasks.types";
import FavoritedTaskListCard from "./FavoritedTaskListCard";
import PageHeader from "../../../../components/header/PageHeader";
import LazyText from "../../../../lazy-components/text/LazyText";
import FilterSortControls from "../../../auth/components/controls/FilterSortControls";
import LazyIcon from "../../../../lazy-components/icons/LazyIcon";
import { Heart } from "lucide-react";
import { useGetFavoritedTaskLists } from "../../services/task-list/get-favorite-task-list.service";
import LoadingSkeleton from "../../../../components/loaders/LoadingSkeleton";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FavoritedTaskListsPage = () => {
  const searchParams = useSearch({ from: "/_authenticated/task-list/favorites" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const { data: paginatedFavorites, isLoading, isFetching } = useGetFavoritedTaskLists(searchParams);

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/task-list/favorites`,
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <Box mih="calc(95vh - 65px)">
      <Flex direction="column" h="100%" justify="space-between">
        <Stack gap={16} style={{ flexGrow: 1 }}>
          <Paper bg="primary.9" p={16} radius="md">
            <PageHeader
              leftSection={<LazyIcon icon={<Heart />} size="xl" hasBackground backgroundColor="red" />}
              wrap="wrap"
              mb={16}
            >
              <Title>Favorited Lists</Title>
            </PageHeader>

            <Stack mb="md" gap="8">
              <FilterSortControls
                route="/task-list/favorites"
                searchParams={searchParams}
                sortByOptions={[
                  { value: "createdAt", label: "Created At" },
                  { value: "name", label: "Name" },
                  { value: "favorited", label: "Favorited" },
                ]}
              />
            </Stack>
          </Paper>
          {isLoading || isFetching ? (
            <>
              <LoadingSkeleton numberOfSkeletons={16} height={190} />
              <Skeleton height={64} />
            </>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={16}>
                {paginatedFavorites?.items.map((taskList: FavoritedTaskList) => (
                  <motion.div key={taskList.taskListId} variants={itemVariants}>
                    <FavoritedTaskListCard favoritedTaskList={taskList} />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          )}
        </Stack>

        {!isLoading && !isFetching && paginatedFavorites?.totalPages && paginatedFavorites.totalPages > 1 && (
          <Paper bg="primary.9" p={16} radius="md" mt={32}>
            <Flex justify="space-between" align="center">
              <LazyText
                text={`page ${page} of ${paginatedFavorites.totalPages}`}
                highlight={page}
                highlightColor="lime"
                c="gray"
              />
              <Pagination color="lime" value={page} onChange={handlePageChange} total={paginatedFavorites.totalPages} />
            </Flex>
          </Paper>
        )}
      </Flex>
    </Box>
  );
};

export default FavoritedTaskListsPage;
