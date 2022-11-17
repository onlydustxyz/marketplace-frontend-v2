import { useQuery, gql } from "@apollo/client";

interface Project {
  // to be replaced with codegen types
  id: string;
}

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);
  return (
    <>
      {loading && <div className="flex justify-center mt-10 text-2xl">Loading</div>}
      {data && (
        <>
          <div className="flex justify-center mt-10 text-2xl">Project ids:</div>
          {data.projects.map((project: Project) => (
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
