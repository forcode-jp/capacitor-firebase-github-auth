const tsNode = require("ts-node");
const path = require("path");

const androidCapabilities = require("./capabilities/android").default;
const iosCapabilities = require("./capabilities/ios").default;

const multiCapabilities =
  process.env.PLATFORM === "iOS" ? iosCapabilities : androidCapabilities;
/**
 * @type {import("protractor").Config}
 */
const config = {
  allScriptsTimeout: 11000,
  specs: ["tests/**/*.test.ts"],
  baseUrl: "http://localhost:4200/",
  multiCapabilities,
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
  },
  seleniumAddress: "http://localhost:4723/wd/hub",
  onPrepare: () => {
    tsNode.register({
      project: path.join(__dirname, "./tsconfig.json"),
    });
  },
};

exports.config = config;
