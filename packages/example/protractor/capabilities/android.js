const path = require('path');

const matrix = [
  {
    avd: 'nexus_s',
    deviceName: 'nexus_s',
  },
];

/**
 * @type {import('protractor').Capabilities[]}
 */
exports.default = matrix.map(({ avd, deviceName }) => ({
  browserName: '',
  autoWebview: true,
  autoWebviewTimeout: 20000,
  adbExecTimeout: 120000,
  avdLaunchTimeout: 120000,
  avdReadyTimeout: 120000,
  allowTestPackages: true,
  platformName: 'Android',
  app: path.join(
    __dirname,
    '../../android/app/build/outputs/apk/debug/app-debug.apk',
  ),
  avd: process.env.AVD_NAME,
  deviceName: process.env.PROFILE,
  autoGrantPermissions: true,
  newCommandTimeout: 300000,
  automationName: 'UiAutomator2',
  // skipServerInstallation: true,
  noReset: false,
  fullReset: true,
}));
