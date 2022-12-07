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
import { deepCamelCase } from "src/utils/deepCamelCase";

export const useHasuraQuery = <T, V>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: QueryHookOptions<T, V> = {}
): QueryResult<T, V> => {
  const apolloQuery = useQuery<T, V>(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));

  return { ...apolloQuery, data: deepCamelCase(apolloQuery.data) };
};

export const useHasuraMutation = (
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: MutationHookOptions = {}
) => {
  return useMutation(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
