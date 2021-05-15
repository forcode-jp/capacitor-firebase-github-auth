import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions,
} from 'protractor';
import * as fs from 'fs';

const until = ExpectedConditions;

const saveImage = (filename: string, data: string) => {
  return new Promise(resolve => {
    const stream = fs.createWriteStream(
      `protractor/screenshots/${filename}.png`,
    );
    stream.write(Buffer.from(data, 'base64'));
    stream.end(resolve);
  });
};

const switchWebviewContext = async () => {
  const contexts = await browser.driver.listContexts();
  console.log(`Available contexts: ${contexts}`);
  const currentContext = await browser.driver.getCurrentContext();
  console.log('Current context is: ' + currentContext);
  const newContext = contexts.find(
    c => c.includes('WEBVIEW') && currentContext !== c,
  );
  if (newContext) {
    console.log('Switched context to: ' + newContext);
    await browser.driver.selectContext(newContext);
  } else {
    console.log('Context not found');
  }
};

const switchToNativeContext = async () => {
  const contexts = await browser.driver.listContexts();
  console.log(`Available contexts: ${contexts}`);
  console.log('Switching to NATIVE');
  const newContext = contexts.find(c => c.includes('NATIVE'));
  await browser.driver.selectContext(newContext);
};

describe('App', () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it('saves screenshots', async () => {
    const capabilities = await browser.getCapabilities();
    const filename = capabilities.get('deviceName');
    const data = await browser.takeScreenshot();
    await saveImage(filename, data);
  });

  it('allows user to login', async () => {
    const loginButton: ElementFinder = await element(by.id('login-button'));
    await browser.wait(until.elementToBeClickable(loginButton));
    const loginButtonLabel: string = await loginButton.getText();
    expect(loginButtonLabel.toUpperCase()).toEqual('GITHUB LOGIN');

    await loginButton.click();
    await browser.sleep(5000);

    if (process.env.PLATFORM !== 'iOS') {
      await switchToNativeContext();

      try {
        const acceptButton: ElementFinder = await element(
          by.xpath(
            '*//android.widget.Button[@resource-id="com.android.chrome:id/terms_accept"]',
          ),
        );
        await browser.wait(
          until.presenceOf(acceptButton),
          20000,
          'The welcome screen is not shown, this is not an error.',
        );
        // If the `Accept & continue` is shown, click on it
        await acceptButton.click();
        // Wait for the `No Thanks` button and click on it
        const noThanksButton: ElementFinder = await element(
          by.xpath(
            '*//android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]',
          ),
        );
        await browser.wait(until.presenceOf(noThanksButton), 20000);
        await noThanksButton.click();
        await browser.sleep(5000);
        console.log('Chaging context to app');
        await browser.driver.selectContext(
          'WEBVIEW_com.auth.github.firebase.capacitor.example',
        );
        const contexts = await browser.driver.listContexts();
        console.log(`Available contexts: ${contexts}`);
        const currentContext = await browser.driver.getCurrentContext();
        console.log('Current context is: ' + currentContext);
        await saveImage('WEBVIEW:click', await browser.takeScreenshot());
      } catch (e) {
        console.log(`ERROR: ${e}`);
        await saveImage('ERROR', await browser.takeScreenshot());
      }
    }
    // in-app browser
    await switchWebviewContext();
    await browser.wait(until.urlContains('github.com'), 20000);
    expect(await browser.driver.getTitle()).toBe('Sign in to GitHub · GitHub');
    //  const usernameInputField: ElementFinder = await element(by.id("login_field"));
    //  await usernameInputField.sendKeys(process.env.TESTING_GITHUB_USERNAME ?? "");
    //  const passwordInputField: ElementFinder = await element(by.id("password"));
    //  await passwordInputField.sendKeys(process.env.TESTING_GITHUB_PASSWORD ?? "");
    //  const submitButton: ElementFinder = await element(by.name("commit"));
    //  await submitButton.click();
    //  await browser.sleep(5000);
    // in app
    // await switchWebviewContext();
    // const cardHeader: ElementFinder = await element(by.css('[data-test-id="card-header"]'));
    // await browser.wait(ExpectedConditions.visibilityOf(cardHeader));
    // expect(await cardHeader.getText()).toBe(`Logged in as ${process.env.TESTING_GITHUB_USERNAME}`);
  });
});
