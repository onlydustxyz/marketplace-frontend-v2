import { PropsWithChildren } from "react";
import ProjectCard from "src/components/ProjectCard";
import ProjectInformation, {
  INITIAL_AMOUNT_KEY,
  REMAINING_AMOUNT_KEY,
  TELEGRAM_LINK_KEY,
} from "src/components/ProjectInformation";

interface ProjectProps extends PropsWithChildren {
  name: string;
  details?: {
    description: string;
    [TELEGRAM_LINK_KEY]: string;
  };
  budget?: {
    [REMAINING_AMOUNT_KEY]: number;
    [INITIAL_AMOUNT_KEY]: number;
  };
}

export default function Project({ name, details, budget, children }: ProjectProps) {
  return (
    <ProjectCard>
      <div className="flex flex-col divide-white divide-solid divide-y-2">
        <div className="pb-5">
          <ProjectInformation name={name} budget={budget} details={details} />
        </div>
        <div className="flex flex-row align-start pt-5 space-x-3">{children}</div>
      </div>
    </ProjectCard>
  );
}
