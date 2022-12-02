import { QueryHookOptions, TypedDocumentNode, useQuery } from "@apollo/client";
import merge from "lodash/merge";
import { HasuraUserRole } from "src/types";

export const useHasuraQuery = (
  query: TypedDocumentNode,
  role: HasuraUserRole = HasuraUserRole.Public,
  options: QueryHookOptions = {}
) => {
  return useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
