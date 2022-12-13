import { gql } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole } from "src/types";
import Overview from "./Overview";
import Payments from "./PaymentActions";
import Project from "./Project";

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
}

export default function ProjectDetails() {
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { projectId } = useParams<ProjectDetailsParams>();
  const { hasuraToken } = useAuth();
  const { ledProjectIds, isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const { data } = useHasuraQuery(
    isLoggedIn ? GET_PROJECT_USER_QUERY : GET_PROJECT_PUBLIC_QUERY,
    isLoggedIn ? HasuraUserRole.RegisteredUser : HasuraUserRole.Public,
    {
      variables: { id: projectId },
    }
  );

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview];
  const project = data ? data.projectsByPk : null;
  const githubRepo = project ? project.githubRepo : null;

  console.log(project);

  return (
    <div className="px-10 flex flex-col align-center items-center">
      {project && (
        <div className="flex flex-col w-11/12 my-3 gap-5">
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
          {selectedTab === ProjectDetailsTab.Overview && (
            <Overview
              decodedReadme={decodeURIComponent(escape(atob(githubRepo.readme.content)))}
              contributors={githubRepo.contributors}
              repo={{ name: githubRepo.name, owner: githubRepo.owner }}
            />
          )}
          {selectedTab === ProjectDetailsTab.Payments && <Payments budget={project?.budgets?.[0]} />}
        </div>
      )}
    </div>
  );
}

const GITHUB_REPO_FIELDS_FRAGMENT = gql`
  fragment ProjectDetailsGithubRepoFields on Repository {
    name
    owner
    readme {
      content
      encoding
    }
    contributors {
      avatarUrl
      login
    }
  }
`;

export const GET_PROJECT_PUBLIC_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query Project($id: uuid!) {
    projectsByPk(id: $id) {
      name
      projectDetails {
        description
        telegramLink
      }
      githubRepo {
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;

export const GET_PROJECT_USER_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query Project($id: uuid!) {
    projectsByPk(id: $id) {
      name
      budgets {
        id
        initialAmount
        remainingAmount
      }
      projectDetails {
        description
        telegramLink
      }
      githubRepo {
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;
