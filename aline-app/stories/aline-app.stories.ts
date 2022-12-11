import { html } from 'lit';
import { Story } from './storyTypes.js';
import '../src/aline-app.js';

export default {
  title: 'AlineApp',
  component: 'aline-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface ArgTypes {
  title: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <aline-app
    style="--aline-app-background-color: ${backgroundColor}"
    .title=${title}
  ></aline-app>
`;

export const App = Template.bind({});
App.args = {
  title: 'Aline',
};
