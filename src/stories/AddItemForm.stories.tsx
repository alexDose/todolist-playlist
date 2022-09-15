import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
  title: 'AddItemForm',
  component: AddItemForm
}

const addItem = action('Button inside form clicked')



export const AddItemFormExample = () => {
  return <AddItemForm addItem={addItem}/>
}
