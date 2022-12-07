import {
  QueryHookOptions,
  MutationHookOptions,
  TypedDocumentNode,
  useQuery,
  useMutation,
  QueryResult,
} from "@apollo/client";
import merge from "lodash/merge";
import { HasuraUserRole } from "src/types";

export const useHasuraQuery = <T, V>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: QueryHookOptions<T, V> = {}
): QueryResult<T, V> => {
  return useQuery<T, V>(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};

export const useHasuraMutation = (
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: MutationHookOptions = {}
) => {
  return useMutation(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
