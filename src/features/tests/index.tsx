import React from "react";
import { CabinetLayout } from "../cabinet-layout";
import { useParams } from "react-router-dom";
import { TestsGame } from "../tests-game";

export const TestsPage = () => {
  // const { category, level, subject } = useParams<{
  //   subject: string;
  //   category: string;
  //   level: string;
  // }>();

  return (
    <CabinetLayout>
      <TestsGame />
    </CabinetLayout>
  );
};
