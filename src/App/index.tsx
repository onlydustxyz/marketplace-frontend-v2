import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRoutes } from "react-router-dom";

import Loader from "src/assets/icons/Loader";
import Layout from "src/components/Layout";
import ProtectedRoute from "src/components/ProtectedRoute";
import { AuthProvider } from "src/hooks/useAuth";
import ErrorFallback from "src/components/ErrorFallback";
import Login from "src/pages/Login";
import Projects from "src/pages/Projects";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  CatchAll = "*",
}

function App() {
  const routes = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: RoutePaths.Projects,
          element: (
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Login,
          element: <Login />,
        },
        {
          path: RoutePaths.CatchAll,
          element: (
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
        <AuthProvider>{routes}</AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
