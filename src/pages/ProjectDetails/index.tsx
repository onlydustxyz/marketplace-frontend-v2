import { gql } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole } from "src/types";
import PaymentForm from "./PaymentForm";
import Project from "./Project";

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payment = "Payment",
}

export default function ProjectDetails() {
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { hasuraToken } = useAuth();
  const { ledProjectIds, isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const { data } = useHasuraQuery(
    isLoggedIn ? GET_PROJECT_USER_QUERY : GET_PROJECT_PUBLIC_QUERY,
    isLoggedIn ? HasuraUserRole.User : HasuraUserRole.Public,
    {
      variables: { id: projectId },
    }
  );

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Payment]
      : [ProjectDetailsTab.Overview];
  const project = data ? data.projectByPk : null;

  return (
    <div className="px-10 flex flex-col align-center items-center">
      {project && (
        <div className="flex flex-col w-5/6 my-3 gap-5">
          <Project name={project.name} details={project?.projectDetails} budget={project?.budgets?.[0]}>
            {availableTabs.map((tab: ProjectDetailsTab) => (
              <div
                key={tab}
                className={`border-solid border-white border-2 w-fit p-2 hover:cursor-pointer ${
                  selectedTab === tab ? "font-bold border-3" : "opacity-70"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </div>
            ))}
          </Project>
          {selectedTab === ProjectDetailsTab.Payment && <PaymentForm budget={project?.budgets?.[0]} />}
        </div>
      )}
    </div>
  );
}

export const GET_PROJECT_PUBLIC_QUERY = gql`
  query Project($id: uuid!) {
    projects_by_pk(id: $id) {
      name
      project_details {
        description
        telegram_link
      }
    }
  }
`;

export const GET_PROJECT_USER_QUERY = gql`
  query Project($id: uuid!) {
    projects_by_pk(id: $id) {
      name
      budgets {
        id
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
