import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions,
} from "protractor";
import * as fs from "fs";

const saveImage = (filename: string, data: string) => {
  const stream = fs.createWriteStream(`protractor/screenshots/${filename}.png`);
  stream.write(Buffer.from(data, "base64"));
  stream.end();
};

const switchWebviewContext = async () => {
  const contexts = await browser.driver.listContexts();
  const currentContext = await browser.driver.getCurrentContext();
  console.log("Current context is: " + currentContext);
  const newContext = contexts.find(
    (c) => c.includes("WEBVIEW") && currentContext !== c
  );
  console.log("Switched context to: " + newContext);
  await browser.driver.selectContext(newContext);
};

describe("App", () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    // await switchAppContext("WEBVIEW");
  });

  it("saves screenshots", async () => {
    const capabilities = await browser.getCapabilities();
    const filename = capabilities.get("deviceName");
    const data = await browser.takeScreenshot();
    saveImage(filename, data);
  });

  it("allows user to login", async () => {
    const loginButton: ElementFinder = await element(
      by.css('[data-test-id="login"]')
    );
    await browser.wait(ExpectedConditions.elementToBeClickable(loginButton));
    const loginButtonLabel: string = await loginButton.getText();
    expect(loginButtonLabel.toUpperCase()).toEqual("GITHUB LOGIN");

    await loginButton.click();
    await browser.sleep(10000);

    // in-app browser
    await switchWebviewContext();

    expect(await browser.driver.getTitle()).toBe("Sign in to GitHub · GitHub");
    //const usernameInputField: ElementFinder = await element(by.id("login_field"));
    //const passwordInputField: ElementFinder = await element(by.id("password"));
    //const submitButton: ElementFinder = await element(by.name("commit"));
    // in app
    // await switchWebviewContext();
    // const cardHeader: ElementFinder = await element(by.css('[data-test-id="card-header"]'));
    // await browser.wait(ExpectedConditions.visibilityOf(cardHeader));
    // expect(await cardHeader.getText()).toBe(`Logged in as ${process.env.TESTING_GITHUB_USERNAME}`);
  });
});
