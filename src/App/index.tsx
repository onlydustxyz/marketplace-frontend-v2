import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRoutes } from "react-router-dom";

import Layout from "src/components/Layout";
import ProtectedRoute from "src/components/ProtectedRoute";
import ErrorFallback from "src/components/ErrorFallback";

const Login = lazy(() => import("src/pages/Login"));
const Projects = lazy(() => import("src/pages/Projects"));
const Profile = lazy(() => import("src/pages/Profile"));
const MyProjects = lazy(() => import("src/pages/MyProjects"));
const MyContributions = lazy(() => import("src/pages/MyContributions"));
const ProjectDetails = lazy(() => import("src/pages/ProjectDetails"));

import { CustomUserRole, HasuraUserRole } from "src/types";
import LoaderFallback from "src/components/LoaderFallback";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  Profile = "/profile",
  MyProjects = "/myprojects",
  ProjectDetails = "/project/:projectId",
  MyContributions = "/mycontributions",
  CatchAll = "*",
}

function App() {
  const routes = useRoutes([
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
            <ProtectedRoute requiredRole={HasuraUserRole.User}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.MyContributions,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.User}>
              <MyContributions />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.MyProjects,
          element: (
            <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
              <MyProjects />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Login,
          element: <Login />,
        },
        {
          path: RoutePaths.ProjectDetails,
          element: <ProjectDetails />,
        },
        {
          path: RoutePaths.CatchAll,
          element: <Projects />,
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoaderFallback />}>{routes}</Suspense>
    </ErrorBoundary>
  );
}

export default App;
