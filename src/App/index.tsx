import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { Router } from "src/routes";
import Loader from "src/assets/icons/Loader";
import ErrorFallback from "src/components/ErrorFallback";
import { RouterProvider } from "react-router-dom";

type PropsType = {
  router: Router;
};

const App = ({ router }: PropsType) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader className="animate-spin mt-[30vh]" size={62} />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
