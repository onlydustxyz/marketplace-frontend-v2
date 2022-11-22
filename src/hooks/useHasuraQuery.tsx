import { QueryHookOptions, TypedDocumentNode, useQuery } from "@apollo/client";
import merge from "lodash/merge";
import { USER_ROLES } from "src/types";

type HasuraQueryOptions = QueryHookOptions & {
  role?: USER_ROLES;
};

export const useHasuraQuery = (query: TypedDocumentNode, options: HasuraQueryOptions = {}) => {
  return useQuery(
    query,
    merge(options, { context: { headers: { "X-Hasura-Role": options?.role ?? USER_ROLES.PUBLIC } } })
  );
};
