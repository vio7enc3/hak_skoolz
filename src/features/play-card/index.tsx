import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import { Colors } from "@/app/constants";
import { IPlayCard } from "@/pages/study/lib/types";
import { Link } from "react-router-dom";

export const PlayCard: FC<IPlayCard> = ({
  bgColor,
  btnText,
  Icon,
  btnDisabled,
  title,
  to,
}) => {
  const { t } = useTranslation("");

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: bgColor,
        p: "24px 20px",
        borderRadius: "8px",
        minWidth: 700,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" justifyContent="space-between">
          <Typography variant="h2" color={Colors.TEXT_WHITE}>
            {title}
          </Typography>
          <Box
            {...(to
              ? {
                  component: Link,
                  to,
                }
              : {})}
          >
            <Button
              disabled={btnDisabled}
              sx={{
                color: Colors.TURQUOISE,
                backgroundColor: Colors.TEXT_WHITE,
                ":hover": { backgroundColor: Colors.TEXT_WHITE },
              }}
            >
              {t(btnText)}
            </Button>
          </Box>
        </Stack>

        <Box component={Icon} />
      </Stack>
    </Box>
  );
};
