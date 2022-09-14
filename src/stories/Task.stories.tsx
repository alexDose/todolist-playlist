import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorater";


export default {
  title: 'Task',
  component: TaskWithRedux,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithRedux>;

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove button inside Task clicked")

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {id: "1", isDone: true, title: "JS"},
  todolistId: "todolistId1"
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: {id: "1", isDone: false, title: "JS"},
  todolistId: "todolistId1"
};

