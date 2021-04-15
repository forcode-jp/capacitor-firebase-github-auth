const path = require("path");

const matrix = [
  {
    version: "14.4",
    deviceName: "iPhone 12 Pro Max",
  },
];

/**
 * @type {import('protractor').Capabilities[]}
 */
exports.default = matrix.map(({ version, deviceName }) => ({
  browserName: "",
  autoWebview: true,
  autoWebviewTimeout: 20000,
  app: path.join(
    __dirname,
    "../../ios/App/App.xcarchive/Products/Applications/App.app"
  ),
  version,
  platform: "iOS",
  deviceName,
  platformName: "iOS",
  automationName: "XCUITest",
  nativeWebTap: "true",
  // fullReset: "true"
}));
