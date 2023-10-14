import { CabinetLayout } from "@/features/cabinet-layout";
import { PageTitle } from "@/shared/page-title";
import {
  Box,
  Button,
  Container,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import { Colors } from "@/app/constants";
import { useGetLevelsQuery } from "@/entities/app/api";
import _ from "lodash";

export const StudySubjectPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data } = useGetLevelsQuery({});

  if (!id) {
    return <Navigate to="/study" />;
  }

  const levels = _.groupBy(data?.levels ?? [], "theme");

  return (
    <CabinetLayout>
      <Container>
        <PageTitle
          title={t(id)}
          backUrl="/study"
          sx={{
            mb: 3,
          }}
        />
        <Stack spacing={2}>
          {Object.entries(levels).map(([theme, levels]) => (
            <Box key={theme}>
              <Box
                sx={{
                  backgroundColor: Colors.TURQUOISE,
                  p: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                  }}
                >
                  {theme}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={1}
                  mt={2}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Ознакомьтесь с теорией, прежде чем приступать к заданиям
                  </Typography>
                  <Link to={`study/dicts/${theme}`}>
                    <Button color="inherit">Справочник</Button>
                  </Link>
                </Stack>
              </Box>

              <Stack spacing={1} sx={{ mt: 2 }}>
                {levels.map((level) => (
                  <Box
                    key={level.id}
                    component={Link}
                    to={`${theme}/${level.id}`}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        border: `1px solid ${Colors.PRIMARY}`,
                        borderRadius: "8px",
                      }}
                    >
                      <Radio />
                      <Typography>
                        {theme}: {level.number} уровень
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </CabinetLayout>
  );
};
