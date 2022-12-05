import ProjectCard from "src/components/ProjectCard";
import ProjectInformation, { TELEGRAM_LINK_KEY } from "src/components/ProjectInformation";

interface ProjectProps {
  name: string;
  details?: {
    description: string;
    [TELEGRAM_LINK_KEY]: string;
  };
}

export default function Project(props: ProjectProps) {
  return (
    <ProjectCard>
      <ProjectInformation {...props} />
    </ProjectCard>
  );
}
