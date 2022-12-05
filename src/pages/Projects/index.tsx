import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { TELEGRAM_LINK_KEY } from "src/components/ProjectInformation";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { PROJECT_DETAILS_KEY } from "../MyProjects";
import Project from "./Project";

interface Project {
  id: string;
  name: string;
  [PROJECT_DETAILS_KEY]: {
    description: string;
    [TELEGRAM_LINK_KEY]: string;
  };
}

export default function Projects() {
  const { loading, error, data } = useHasuraQuery(GET_PROJECTS_QUERY);
  return (
    <>
      {loading && <div className="flex justify-center mt-10 text-2xl">Loading</div>}
      {data && (
        <div className="px-10 flex flex-col align-center items-center">
          {data.projects.map((project: Project) => (
            <Link key={project.id} className="flex w-5/6 my-3" to={`/project/${project.id}`}>
              <Project name={project.name} details={project?.[PROJECT_DETAILS_KEY]} />
            </Link>
          ))}
        </div>
      )}
      {error && <div className="flex justify-center mt-10 text-2xl">{JSON.stringify(error)}</div>}
    </>
  );
}

export const GET_PROJECTS_QUERY = gql`
  query MyQuery {
    projects {
      id
      name
      project_details {
        description
        telegram_link
      }
    }
  }
`;
