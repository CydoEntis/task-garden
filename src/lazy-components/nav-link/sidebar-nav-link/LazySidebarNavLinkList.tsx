import { NavLink, NavLinkProps, Paper, Stack, Text } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { LazyNavLinkList } from "./lazy-sidebar-nav-link.types";
import styles from "./lazy-side-bar-nav-link-list.module.css";
import React, { ReactElement } from "react";

type LazySidebarNavLinkListProps = {
  navList: LazyNavLinkList[];
  childLinkProps?: NavLinkProps;
} & NavLinkProps;

function LazySidebarNavLinkList({ navList, childLinkProps = {}, ...rest }: LazySidebarNavLinkListProps) {
  const matchRoute = useMatchRoute();

  return (
    <Stack gap={16}>
      {navList.map((list, listIndex) => (
        <div key={listIndex}>
          {list.sectionTitle && (
            <Text fw={600} size="lg" c="gray" mt={8}>
              {list.sectionTitle}
            </Text>
          )}

          <Stack gap={8} mt={8}>
            {list.links.map((link, linkIndex) => {
              const isAnyChildActive = link.childLinks?.some((childLink) =>
                Boolean(matchRoute({ to: childLink.to, fuzzy: true }))
              );

              const isParentActive = link.childLinks?.length
                ? false
                : Boolean(matchRoute({ to: link.to, fuzzy: false }));

              const isLinkActive = isAnyChildActive ? false : isParentActive;

              return (
                <div key={linkIndex}>
                  <NavLink
                    className={styles.navlink}
                    component={Link}
                    label={link.label}
                    leftSection={
                      link.icon && (
                        <Paper
                          px={6}
                          py={8}
                          bg={link.iconColor}
                          radius="md"
                          h={35}
                          w={35}
                          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                          {React.isValidElement(link.icon)
                            ? React.cloneElement(link.icon as ReactElement, { size: 32, color: "white" })
                            : link.icon}
                        </Paper>
                      )
                    }
                    childrenOffset={28}
                    to={link.to}
                    active={isLinkActive}
                    {...rest}
                  >
                    {link.childLinks && link.childLinks.length > 0 && (
                      <Stack gap={8} py={8}>
                        {link.childLinks.map((childLink) => {
                          const isChildActive = Boolean(matchRoute({ to: childLink.to, fuzzy: true }));

                          return (
                            <NavLink
                              className={styles.navlink}
                              key={childLink.to}
                              component={Link}
                              label={childLink.label}
                              childrenOffset={28}
                              active={isChildActive}
                              to={childLink.to}
                              {...childLinkProps}
                            />
                          );
                        })}
                      </Stack>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

export default LazySidebarNavLinkList;
