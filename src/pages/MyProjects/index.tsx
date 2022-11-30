import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";

interface MyProject {
  // to be replaced with codegen types
  id: string;
}

export default function MyProjects() {
  const { loading, error, data } = useHasuraQuery(GET_PROJECTS_QUERY);
  return (
    <>
      {loading && <div className="flex justify-center mt-10 text-2xl">Loading</div>}
      {data && (
        <>
          <div className="flex justify-center mt-10 text-2xl">My project ids:</div>
          {data.projects.map((project: MyProject) => (
            <div className="flex justify-center mt-10 text-2xl" key={project.id}>
              {project.id}
            </div>
          ))}
        </>
      )}
      {error && <div className="flex justify-center mt-10 text-2xl">{JSON.stringify(error)}</div>}
    </>
  );
}

export const GET_PROJECTS_QUERY = gql`
  query MyQuery {
    projects {
      id
    }
  }
`;
