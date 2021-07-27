const puppeteer = require("puppeteer");

let config = {
  launchOptions: {
    headless: false,
  },
};
const loginPage = {
  name: 'input[id="name"]',
  email: 'input[id="email"]',
  phone: 'input[id="phone"]',
  company: 'input[id="company"]',
  requestButton: "button",
};

puppeteer.launch(config.launchOptions).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("http://contractorsinsurancereview.com/ExampleForm/");
  await page.type(loginPage.name, "Dana");
  await page.type(loginPage.email, "dana@gmail.com");
  await page.type(loginPage.phone, "0526134688");
  await page.type(loginPage.company, "Jones");

  await page.screenshot({ path: "ExamplePage.png", fullPage: true });

  await page.click(loginPage.requestButton);

  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.evaluate(() => alert("You are in the Thank you page"));

  await browser.close();
});
