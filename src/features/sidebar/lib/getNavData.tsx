import BookIcon from "@/app/assets/icons/sidebar/book-icon.png";
import StarIcon from "@/app/assets/icons/sidebar/start-icon.png";
import GamepadIcon from "@/app/assets/icons/sidebar/gamepad-icon.png";
import GirlIcon from "@/app/assets/icons/sidebar/girl-icon.png";

import { NavItem } from "./types";
import { TFunction } from "i18next";

export const getNavData = (t: TFunction): NavItem[] => {
  return [
    {
      icon: BookIcon,
      label: t("study"),
      to: "/study",
    },
    {
      icon: GamepadIcon,
      label: t("training"),
      to: "#",
    },
    {
      icon: StarIcon,
      label: t("rating"),
      to: "#",
    },
    {
      icon: GirlIcon,
      label: t("profile"),
      to: "#",
    },
  ];
};
