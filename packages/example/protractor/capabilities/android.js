const path = require("path");

const matrix = [
  {
    avd: "Pixel_XL_API_30",
    deviceName: "Pixel_XL_API_30",
  },
];

/**
 * @type {import('protractor').Capabilities[]}
 */
exports.default = matrix.map(({ avd, deviceName }) => ({
  browserName: "",
  autoWebview: true,
  autoWebviewTimeout: 20000,
  adbExecTimeout: 120000,
  avdLaunchTimeout: 120000,
  avdReadyTimeout: 120000,
  allowTestPackages: true,
  platformName: "Android",
  deviceName,
  app: path.join(
    __dirname,
    "../../android/app/build/outputs/apk/debug/app-debug.apk"
  ),
  avd,
  autoGrantPermissions: true,
  newCommandTimeout: 300000,
  automationName: "UiAutomator2",
  // skipServerInstallation: true,
  noReset: false,
  fullReset: true,
}));
