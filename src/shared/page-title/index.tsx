import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { PageTitleProps } from "./lib/types";
import { BackBtn } from "../back-btn";

export const PageTitle: React.FC<PageTitleProps> = ({ backUrl, title, sx }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: "1px solid #D9D9D9",
        ...sx,
      }}
    >
      {backUrl && <BackBtn to={backUrl} />}
      <Typography variant="h3">{title}</Typography>
      <Box />
    </Stack>
  );
};
