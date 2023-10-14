import { CabinetLayout } from "@/features/cabinet-layout";
import { useTranslation } from "react-i18next";
import { ReactComponent as MathIcon } from "@/app/assets/icons/cabinet/math.svg";
import { ReactComponent as Alphatbet } from "@/app/assets/icons/cabinet/alphabet.svg";
import { ReactComponent as CyrillicAlphabet } from "@/app/assets/icons/cabinet/cyrillic-alphabet.svg";
import { ReactComponent as Geography } from "@/app/assets/icons/cabinet/flags.svg";
import { Container, Grid, Stack } from "@mui/material";
import { IPlayCard } from "./lib/types";
import { PlayCard } from "@/features/play-card";

export const StudyPage = () => {
  const { t } = useTranslation();

  const arrOfCards: IPlayCard[] = [
    {
      title: t("math"),
      Icon: MathIcon,
      btnText: t("next"),
      bgColor: t("#15C47B"),
      to: "/study/math",
    },
    {
      title: t("english"),
      Icon: Alphatbet,
      btnText: t("next"),
      bgColor: "#01A8BF",
      btnDisabled: true,
    },
    {
      title: t("russian"),
      Icon: CyrillicAlphabet,
      btnText: t("next"),
      bgColor: t("#15C4AC"),
      btnDisabled: true,
    },
    {
      title: t("geography"),
      Icon: Geography,
      btnText: t("developing"),
      bgColor: "#15C4AC99",
      btnDisabled: true,
    },
  ];

  return (
    <CabinetLayout>
      <Container>
        <Stack spacing={1.5}>
          {arrOfCards.map((card) => (
            <PlayCard key={card.title} {...card} />
          ))}
        </Stack>
      </Container>
      {/* <Grid container>
        <Grid item xs={12}>
          <Stack spacing={1.5}>
            {arrOfCards.map((card) => (
              <PlayCard key={card.title} {...card} />
            ))}
          </Stack>
        </Grid>
      </Grid> */}
    </CabinetLayout>
  );
};
