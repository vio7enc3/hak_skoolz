import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, RouteProps, Routes } from "react-router-dom";
import { LoginPage } from "./login";
import { RegistrationPage } from "./registration";
import { EntryPage } from "./entry";

import ScrollToTop from "@/shared/ScrollToTop/ScrollToTop";
import { StudyPage } from "./study";
import { StudySubjectPage } from "./study-subject";
import { TestsPage } from "@/features/tests";

const routes: RouteProps[] = [
  { path: "/", element: <EntryPage /> },
  {
    path: "/login/:type",
    element: <LoginPage />,
  },
  {
    path: "/registration/:type",
    element: <RegistrationPage />,
  },
  { path: "/study", element: <StudyPage /> },
  { path: "/study/:id", element: <StudySubjectPage /> },
  { path: "/study/:subject/:category/:level", element: <TestsPage /> },
];

const Routing = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ScrollToTop />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
