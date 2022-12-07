const getHasuraUrl = () => process.env.HASURA_URL ?? "http://localhost:8080/v1/graphql";
const getHasuraSecretKey = () => process.env.HASURA_SECRET_KEY ?? "myadminsecretkey";

const roleList = ["public", "user"];

const generateSchemas = () =>
  roleList.map(role => ({
    [getHasuraUrl()]: {
      headers: {
        "X-Hasura-Admin-Secret": getHasuraSecretKey(),
        "X-Hasura-Role": role,
      },
    },
  }));

module.exports = {
  schema: generateSchemas(),
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/__generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./src/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
