import { html } from 'lit';
import { Story } from './storyTypes.js';
import '../src/offboarding-templates.js';
import { OffboardingTemplate } from '../src/OffboardingTemplates.js';

export default {
  title: 'OffboardingTemplates/OffboardingTemplateCard',
  component: 'offboarding-template-card',
};

interface ArgTypes {
  template: OffboardingTemplate;
}

const Template: Story<ArgTypes> = ({ template }: ArgTypes) => html`
  <offboarding-template-card .template=${template}></offboarding-template-card>
`;

export const Default = Template.bind({});
Default.args = {
  template: {
    id: 1,
    name: 'Offboarding for Developers',
    description:
      'This offboarding is designed for all full-time, part-time, and intern software engineers...',
    lastModified: '12/08/2022',
    latestVersion: 2,
  },
};
