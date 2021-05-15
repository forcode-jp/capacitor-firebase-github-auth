import WebViewScreen from '../screenobjects/webview.screen';
import { CONTEXT_REF } from '../helpers/WebView';

// https://github.com/webdriverio/appium-boilerplate/blob/main/tests/specs/app.webview.spec.js
describe('Top', () => {
  // As the name suggests, this runs before each test. It is a good place to set
  // up common settings.
  beforeEach(() => {
    WebViewScreen.waitForWebsiteLoaded();
  });

  // It is important that we run each test in isolation. The running of a previous test
  // should not affect the next one. Otherwise, it could end up being very difficult to
  // track down what is causing a test to fail.
  afterEach(() => {
    browser.reloadSession();
  });

  it('should hide the text box', async () => {
    WebViewScreen.switchToContext(CONTEXT_REF.WEBVIEW);
    const deviceName = await browser['capabilities']['deviceName'];
    await browser.saveScreenshot(`./${deviceName}.png`);
  });
});
