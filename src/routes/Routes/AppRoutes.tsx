import type { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../routes";
import { Home } from "../../react/pages/Home/Home";

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
};
