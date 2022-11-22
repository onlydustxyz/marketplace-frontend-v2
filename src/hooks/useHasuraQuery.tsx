import { QueryHookOptions, TypedDocumentNode, useQuery } from "@apollo/client";
import merge from "lodash/merge";
import { USER_ROLES } from "src/types";

export const useHasuraQuery = (
  query: TypedDocumentNode,
  role: USER_ROLES = USER_ROLES.PUBLIC,
  options: QueryHookOptions = {}
) => {
  return useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
