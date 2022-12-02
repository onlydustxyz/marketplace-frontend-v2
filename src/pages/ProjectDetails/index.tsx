import { gql } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "src/components/ProjectCard";
import ProjectInformation from "src/components/ProjectInformation";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { PROJECTS_BY_PK_KEY, PROJECT_DETAILS_KEY } from "../MyProjects";

type ProjectDetailsParams = {
  projectId: string;
};

enum Tab {
  Overview = "Overview",
  Payment = "Payment",
}

export default function ProjectDetails() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { hasuraToken } = useAuth();
  const { ledProjectIds } = useJwtRole(hasuraToken?.accessToken);
  const { data } = useHasuraQuery(GET_PROJECT_QUERY, undefined, {
    variables: { id: projectId },
  });

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId) ? [Tab.Overview, Tab.Payment] : [Tab.Overview];
  const project = data ? data[PROJECTS_BY_PK_KEY] : null;

  return (
    <div className="px-10 flex flex-col align-center items-center">
      {project && (
        <div className="flex flex-col w-5/6 my-3">
          <ProjectCard>
            <div className="flex flex-col divide-white divide-solid divide-y-2">
              <div className="pb-5">
                <ProjectInformation
                  name={project.name}
                  budget={project?.budgets[0]}
                  details={project?.[PROJECT_DETAILS_KEY]}
                />
              </div>
              <div className="flex flex-row align-start pt-5 space-x-3">
                {availableTabs.map((tab: Tab) => (
                  <div
                    className={`border-solid border-white border-2 w-fit p-2 hover:cursor-pointer ${
                      selectedTab === tab ? "font-bold border-3" : "opacity-70"
                    }`}
                    onClick={e => setSelectedTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </ProjectCard>
        </div>
      )}
    </div>
  );
}

export const GET_PROJECT_QUERY = gql`
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
