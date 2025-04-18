import LazySidebarLayout from "../../lazy-components/layouts/sidebar-layout/LazySidebarLayout";
import { useDisclosure } from "@mantine/hooks";
import { Box, NavLink, Paper, Stack, Title, Flex, Group } from "@mantine/core";
import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, Grid2x2Plus, Heart, LogOut, Plus, Sprout, Star } from "lucide-react";
import React from "react";
import ThemeToggle from "../../components/theme/ThemeToggle";
import useAuthStore from "../../stores/useAuthStore";
import { logoutUser } from "../auth/services/logout.service";
import { motion } from "framer-motion";
import CreateTaskListWithCategoryModal from "../task-list/components/create-task-list-with-category/CreateTaskListWithCategoryModal";
import localStorageService from "../../services/localStorage.service";
import LazyIcon from "../../lazy-components/icons/LazyIcon";

function ProtectedLayout() {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const { logoutUser: logoutClient } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logoutClient();
      localStorageService.removeItem("taskgarden");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [
    isCreateTaskListWithCategoryModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseCreateTaskListWithCategoryModal },
  ] = useDisclosure(false);

  const navLinks = [
    { label: "Today", to: "/task-list/today", icon: <Star />, iconColor: "yellow" },
    { label: "Coming Up", to: "/task-list/coming-up", icon: <Calendar />, iconColor: "cyan" },
    { label: "Categories", to: "/categories", icon: <Grid2x2Plus />, iconColor: "lime" },
    { label: "Favorites", to: "/task-list/favorites", icon: <Heart />, iconColor: "red" },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <CreateTaskListWithCategoryModal
        isOpen={isCreateTaskListWithCategoryModalOpened}
        onClose={onCloseCreateTaskListWithCategoryModal}
      />
      <LazySidebarLayout
        logo={
          <Group gap={8} align="center">
            <LazyIcon icon={<Sprout color="#A9E34B" />} backgroundColor="lime" />
            <Title size="1.45rem">Sprout</Title>
          </Group>
        }
        isSidebarOpened={isSidebarOpened}
        onToggle={toggleSidebar}
      >
        <Stack style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          <Stack gap={12} px={8} mt={32} style={{ flexGrow: 1 }}>
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              {navLinks.map(({ label, to, icon, iconColor }) => (
                <motion.div key={to} variants={itemVariants}>
                  <NavLink
                    style={{
                      borderRadius: "8px",
                      fontSize: "1.25rem",
                      marginBottom: "12px",
                    }}
                    color="gray.6"
                    component={Link}
                    label={label}
                    leftSection={
                      <Paper
                        px={6}
                        py={8}
                        bg={iconColor}
                        radius="md"
                        h={35}
                        w={35}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        {React.cloneElement(icon, { size: 32, color: "white" })}
                      </Paper>
                    }
                    childrenOffset={28}
                    to={to}
                    active={Boolean(matchRoute({ to, fuzzy: true }))}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Stack>
          <Stack gap={12} px={8}>
            <NavLink
              style={{
                borderRadius: "8px",
                fontSize: "1.25rem",
              }}
              leftSection={<Plus size={20} />}
              color="inverse"
              label="New List"
              onClick={onOpenCreateTaskListWithCategoryModal}
            />
            <Box style={{ borderTop: "2px solid var(--secondary)" }} px={8} py={16}>
              <Flex justify="space-between" align="center" gap={12}>
                <NavLink
                  style={{
                    borderRadius: "8px",
                    fontSize: "1.25rem",
                  }}
                  leftSection={<LogOut size={20} />}
                  color="inverse"
                  label="Logout"
                  onClick={handleLogout}
                />
                <ThemeToggle />
              </Flex>
            </Box>
          </Stack>
        </Stack>
      </LazySidebarLayout>
    </>
  );
}

export default ProtectedLayout;
