import { Box, SxProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "@/app/assets/icons/arrow_left.svg";

interface Props {
  to: string;
  sx?: SxProps;
}

export const BackBtn: React.FC<Props> = ({ to, sx }) => {
  return (
    <Box
      component={Link}
      to={to}
      sx={{
        textDecoration: "none",
        width: "42px",
        height: "42px",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        component={ArrowLeftIcon}
        sx={{
          "& path": {
            fill: "#000",
          },
        }}
      />
    </Box>
  );
};
