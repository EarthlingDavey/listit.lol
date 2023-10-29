import type { Meta, StoryObj } from "@storybook/react";

import {SideBar} from "./MySideBar";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/SideBar",
  component: () => (
    <div className="h-screen">
      <SideBar />
    </div>
  ),
  tags: ["autodocs"],
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Click me",
  },
};

// export const Secondary: Story = {
//   args: {
//     children: 'Click me',
//     variant: 'secondary',
//   },
// };
