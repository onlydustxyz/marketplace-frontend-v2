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

export const useHasuraQuery = (
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: QueryHookOptions = {}
): QueryResult => {
  const apolloQuery = useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));

  return { ...apolloQuery, data: deepCamelCase(apolloQuery.data) };
};

export const useHasuraMutation = (
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: MutationHookOptions = {}
) => {
  return useMutation(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
