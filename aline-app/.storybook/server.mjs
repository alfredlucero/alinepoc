import { storybookPlugin } from '@web/dev-server-storybook';
import baseConfig from '../web-dev-server.config.mjs';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: '/',
  // This is important to stay undefined or else we won't be able to load Storybook's UI
  appIndex: undefined,
  plugins: [storybookPlugin({ type: 'web-components' }), ...baseConfig.plugins],
});
