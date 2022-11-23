import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRoutes } from "react-router-dom";

import Loader from "src/assets/icons/Loader";
import Layout from "src/components/Layout";
import ProtectedRoute from "src/components/ProtectedRoute";
import ErrorFallback from "src/components/ErrorFallback";
import Login from "src/pages/Login";
import Projects from "src/pages/Projects";
import Profile from "src/pages/Profile";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  Profile = "/profile",
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
  ]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>{routes}</Suspense>
    </ErrorBoundary>
  );
}

export default App;
