import LazySidebarLayout from "../../lazy-components/layouts/sidebar-layout/LazySidebarLayout";
import { useDisclosure } from "@mantine/hooks";
import { Box, NavLink, Paper, Stack, Title, Flex } from "@mantine/core";
import CreateTasklistWithCategoryModal from "../tasks/components/create-task-list/CreateTasklistWithCategoryModal";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Calendar, Grid2x2Plus, Heart, LogOut, Plus, Star } from "lucide-react";
import React from "react";
import ThemeToggle from "../../components/theme/ThemeToggle";
import useAuthStore from "../../stores/useAuthStore";
import { logoutUser } from "../auth/services/logout.service";
import { motion } from "framer-motion";

function ProtectedLayout() {
  const location = useLocation();
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const navigate = useNavigate();
  const { logoutUser: logoutClient } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logoutClient();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [
    isCreateTasklistWithCategoryModalOpened,
    { open: onOpenCreateTasklistWithCategoryModal, close: onCloseCreateTasklistWithCategoryModal },
  ] = useDisclosure(false);

  const navLinks = [
    { label: "Today", to: "/task-list/today", icon: <Star />, iconColor: "yellow" },
    { label: "Coming Up", to: "/task-list/coming-up", icon: <Calendar />, iconColor: "cyan" },
    { label: "Categories", to: "/categories", icon: <Grid2x2Plus />, iconColor: "lime" },
    { label: "Favorites", to: "/favorites", icon: <Heart />, iconColor: "red" },
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
      <CreateTasklistWithCategoryModal
        isOpen={isCreateTasklistWithCategoryModalOpened}
        onClose={onCloseCreateTasklistWithCategoryModal}
      />
      <LazySidebarLayout
        logo={
          <Title size="1.45rem" c="white">
            Task Garden
          </Title>
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
                    color="gray"
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
                    active={location.pathname === to}
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
              color="gray"
              label="New List"
              onClick={onOpenCreateTasklistWithCategoryModal}
            />
            <Box style={{ borderTop: "1px solid var(--border-color)" }} px={8} py={16}>
              <Flex justify="space-between" align="center" gap={12}>
                <NavLink
                  style={{
                    borderRadius: "8px",
                    fontSize: "1.25rem",
                  }}
                  leftSection={<LogOut size={20} />}
                  color="gray"
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
