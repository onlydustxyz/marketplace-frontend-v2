import ProjectCard from "src/components/ProjectCard";
import ProjectInformation from "src/components/ProjectInformation";

interface MyProjectProps {
  name: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  };
  details?: {
    description: string;
    telegramLink: string;
  };
}

export default function MyProject(props: MyProjectProps) {
  return (
    <ProjectCard selectable={true}>
      <ProjectInformation {...props} />
    </ProjectCard>
  );
}
