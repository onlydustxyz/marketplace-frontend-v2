import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import MyProject from "./MyProject";

export const PROJECTS_BY_PK_KEY = "projects_by_pk";
export const PROJECT_DETAILS_KEY = "project_details";

interface MyProjectsProps {
  projectIds: string[];
}

export default function MyProjectsProps() {
  const { hasuraToken } = useAuth();
  const { ledProjectIds } = useJwtRole(hasuraToken?.accessToken);
  return (
    <>
      <div className="px-10 flex flex-col align-center items-center">
        {ledProjectIds.map((projectId: string) => (
          <div key={projectId} className="flex w-5/6 my-3">
            <MyProjectContainer projectId={projectId} />
          </div>
        ))}
      </div>
    </>
  );
}

interface MyProjectContainerProps {
  projectId: string;
}

function MyProjectContainer({ projectId }: MyProjectContainerProps) {
  const { data } = useHasuraQuery(GET_MY_PROJECT_QUERY, undefined, {
    variables: { id: projectId },
  });
  const project = data ? data[PROJECTS_BY_PK_KEY] : null;
  return (
    <>
      {project && (
        <MyProject name={project.name} budget={project?.budgets[0]} details={project?.[PROJECT_DETAILS_KEY]} />
      )}
    </>
  );
}

export const GET_MY_PROJECT_QUERY = gql`
  query MyProject($id: uuid!) {
    projects_by_pk(id: $id) {
      name
      budgets {
        initial_amount
        remaining_amount
      }
      project_details {
        description
        telegram_link
      }
    }
  }
`;