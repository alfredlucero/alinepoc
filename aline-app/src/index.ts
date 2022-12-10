import { Router } from '@vaadin/router';

export const router = new Router(document.getElementById('aline-outlet'));
router.setRoutes([
  {
    path: '',
    component: 'aline-app',
    action: async () => {
      await import('./aline-app.js');
    },
  },
  {
    path: 'offboarding/templates',
    component: 'offboarding-templates',
    action: async () => {
      await import('./offboarding-templates.js');
    },
  },
  {
    path: 'offboarding/templates/new',
    component: 'offboarding-templates-new',
    action: async () => {
      await import('./offboarding-templates-new.js');
    },
  },
  {
    path: 'offboarding/templates/:id',
    component: 'offboarding-templates-details',
    action: async () => {
      await import('./offboarding-templates-details.js');
    },
  },
]);
