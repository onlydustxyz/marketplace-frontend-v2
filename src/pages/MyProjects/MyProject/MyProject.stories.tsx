import { ComponentStory, ComponentMeta } from "@storybook/react";

import MyProject from ".";

export default {
  title: "MyProject",
  component: MyProject,
} as ComponentMeta<typeof MyProject>;

const Template: ComponentStory<typeof MyProject> = args => <MyProject {...args} />;

export const Default = Template.bind({});

Default.args = { projectName: "test", remainingBudget: 500, initialBudget: 1000 };
