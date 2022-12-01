import { QueryHookOptions, MutationHookOptions, TypedDocumentNode, useQuery, useMutation } from "@apollo/client";
import merge from "lodash/merge";
import { HasuraUserRole } from "src/types";

export const useHasuraQuery = (
  query: TypedDocumentNode,
  role: HasuraUserRole = HasuraUserRole.Public,
  options: QueryHookOptions = {}
) => {
  return useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};

export const useHasuraMutation = (
  query: TypedDocumentNode,
  role: HasuraUserRole = HasuraUserRole.Public,
  options: MutationHookOptions = {}
) => {
  return useMutation(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
