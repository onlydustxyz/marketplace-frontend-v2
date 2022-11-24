import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import Layout from "src/components/Layout";
import ProtectedRoute from "src/components/ProtectedRoute";
import Login from "src/pages/Login";
import Projects from "src/pages/Projects";
import Profile from "src/pages/Profile";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  Profile = "/profile",
  CatchAll = "*",
}

export type Router = any;

type MemoryRouterOptions = {
  basename?: string;
  initialEntries?: string[];
  initialIndex?: number;
};

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: RoutePaths.Projects,
        element: <Projects />,
      },
      {
        path: RoutePaths.Profile,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.Login,
        element: <Login />,
      },
      {
        path: RoutePaths.CatchAll,
        element: <Projects />,
      },
    ],
  },
];

export const createAppRouter = (): Router => createBrowserRouter(routes);
export const createTestRouter = (options: MemoryRouterOptions): Router => createMemoryRouter(routes, options);
