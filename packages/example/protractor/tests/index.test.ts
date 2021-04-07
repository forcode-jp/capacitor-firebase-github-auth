import { browser } from "protractor";
import * as fs from "fs";

const saveImage = (filename: string, data: string) => {
  const stream = fs.createWriteStream(`protractor/screenshots/${filename}.png`);
  stream.write(Buffer.from(data, "base64"));
  stream.end();
};

describe("App", () => {
  it("saves screenshots", async () => {
    const capabilities = await browser.getCapabilities();
    const filename = capabilities.get("deviceName");
    const data = await browser.takeScreenshot();
    saveImage(filename, data);
  });
});
