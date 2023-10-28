import type { Meta, StoryObj } from '@storybook/react';

import { MyButton } from './MyButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'MyButton/Button',
  component: MyButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    mySize: 'large',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    mySize: 'small',
    children: 'Button',
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    children: 'Delete now',
    backgroundColor: 'red',
  },
};
