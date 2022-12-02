import { ComponentStory, ComponentMeta } from "@storybook/react";

import MyProject, { INITIAL_AMOUNT_KEY, REMAINING_AMOUNT_KEY, TELEGRAM_LINK_KEY } from ".";

export default {
  title: "MyProject",
  component: MyProject,
} as ComponentMeta<typeof MyProject>;

const Template: ComponentStory<typeof MyProject> = args => <MyProject {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "test",
  budget: { [REMAINING_AMOUNT_KEY]: 500, [INITIAL_AMOUNT_KEY]: 1000 },
  details: { [TELEGRAM_LINK_KEY]: "https://web.telegram.org/z/", description: "Test description" },
};
