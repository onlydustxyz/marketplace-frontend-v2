import ProjectCard from "src/components/ProjectCard";
import ProjectInformation from "src/components/ProjectInformation";

interface ProjectProps {
  name: string;
  details?: {
    description: string;
    telegramLink: string;
  };
}

export default function Project(props: ProjectProps) {
  return (
    <ProjectCard selectable={true}>
      <ProjectInformation {...props} />
    </ProjectCard>
  );
}
