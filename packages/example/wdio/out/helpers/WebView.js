"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTEXT_REF = void 0;
exports.CONTEXT_REF = {
  NATIVE: "native",
  WEBVIEW: "webview",
};
var DOCUMENT_READY_STATE = {
  COMPLETE: "complete",
  INTERACTIVE: "interactive",
  LOADING: "loading",
};
var WebView = /** @class */ (function () {
  function WebView() {}
  /**
   * Wait for the webview context to be loaded
   *
   * By default you have `NATIVE_APP` as the current context. If a webview is loaded it will be
   * added to the current contexts and will looks something like this
   * `["NATIVE_APP","WEBVIEW_28158.2"]`
   * The number behind `WEBVIEW` can be any string
   */
  WebView.prototype.waitForWebViewContextLoaded = function () {
    var _this = this;
    driver.waitUntil(
      function () {
        var currentContexts = _this.getCurrentContexts();
        return (
          currentContexts.length > 1 &&
          currentContexts.find(function (context) {
            return context.toLowerCase().includes(exports.CONTEXT_REF.WEBVIEW);
          })
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "Webview context not loaded",
        interval: 100,
      }
    );
  };
  /**
   * Switch to native or webview context
   *
   * @param {string} context should be native of webview
   */
  WebView.prototype.switchToContext = function (context) {
    driver.switchContext(
      this.getCurrentContexts()[context === exports.CONTEXT_REF.WEBVIEW ? 1 : 0]
    );
  };
  /**
   * Returns an object with the list of all available contexts
   *
   * @return {object} An object containing the list of all available contexts
   */
  WebView.prototype.getCurrentContexts = function () {
    return driver.getContexts();
  };
  /**
   * Wait for the document to be full loaded
   */
  WebView.prototype.waitForDocumentFullyLoaded = function () {
    driver.waitUntil(
      function () {
        return (
          driver.execute(function () {
            return document.readyState;
          }) === DOCUMENT_READY_STATE.COMPLETE
        );
      },
      {
        timeout: 15000,
        timeoutMsg: "Website not loaded",
        interval: 100,
      }
    );
  };
  /**
   * Wait for the website in the webview to be loaded
   */
  WebView.prototype.waitForWebsiteLoaded = function () {
    this.waitForWebViewContextLoaded();
    this.switchToContext(exports.CONTEXT_REF.WEBVIEW);
    this.waitForDocumentFullyLoaded();
    this.switchToContext(exports.CONTEXT_REF.NATIVE);
  };
  return WebView;
})();
exports.default = WebView;
//# sourceMappingURL=WebView.js.map
