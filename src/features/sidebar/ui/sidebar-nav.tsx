import { Stack, StackProps } from "@mui/material";
import React from "react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { getNavData } from "../lib/getNavData";
import { useTranslation } from "react-i18next";

export const SidebarNav: React.FC<Omit<StackProps, "children">> = (props) => {
  const { t } = useTranslation("sidebar");
  const NAVDATA = getNavData(t);

  return (
    <Stack {...props}>
      {NAVDATA.map((el, idx) => (
        <SidebarNavItem item={el} key={idx} />
      ))}
    </Stack>
  );
};
