import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TELEGRAM_LINK_KEY } from "src/components/ProjectInformation";
import ProjectDetails from ".";

export default {
  title: "ProjectDetails",
  component: ProjectDetails,
} as ComponentMeta<typeof ProjectDetails>;

const Template: ComponentStory<typeof ProjectDetails> = args => <ProjectDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "test",
  details: { [TELEGRAM_LINK_KEY]: "https://web.telegram.org/z/", description: "Test description" },
};
