import ProjectCard from "src/components/ProjectCard";
import ProjectInformation, {
  INITIAL_AMOUNT_KEY,
  REMAINING_AMOUNT_KEY,
  TELEGRAM_LINK_KEY,
} from "src/components/ProjectInformation";

interface MyProjectProps {
  name: string;
  budget?: {
    [REMAINING_AMOUNT_KEY]: number;
    [INITIAL_AMOUNT_KEY]: number;
  };
  details?: {
    description: string;
    [TELEGRAM_LINK_KEY]: string;
  };
}

export default function MyProject(props: MyProjectProps) {
  return (
    <ProjectCard selectable={true}>
      <ProjectInformation {...props} />
    </ProjectCard>
  );
}
