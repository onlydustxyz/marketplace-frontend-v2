import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TELEGRAM_LINK_KEY } from "src/components/ProjectInformation";

import Project from ".";

export default {
  title: "Project Details Card",
  component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = args => <Project {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "test",
  details: { [TELEGRAM_LINK_KEY]: "https://web.telegram.org/z/", description: "Test description" },
};
