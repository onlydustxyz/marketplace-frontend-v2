import { QueryResult } from "@apollo/client";
import Loader from "src/components/Loader";

type PropsType = {
  query: QueryResult;
  errorMessage?: string;
};

const DEFAULT_ERROR = "Something happened...";

const QueryWrapper: React.FC<React.PropsWithChildren<PropsType>> = ({
  query,
  errorMessage = DEFAULT_ERROR,
  children,
}) => {
  const { loading, data, error } = query;
  return (
    <>
      {loading && <Loader />}
      {data && children}
      {error && <div className="flex justify-center mt-10 text-2xl">{errorMessage}</div>}
    </>
  );
};

export default QueryWrapper;
