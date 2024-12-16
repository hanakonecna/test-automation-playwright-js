import { ApplicationTexts, DefaultOrderData, expect, test } from "../fixtures/fixtures";
import { HomePage } from "./pages/home.page";

test.describe("tests for navigation to and rendering of the order form", () => {
  test("user can create new order for MŠ/ZŠ from home page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await expect(homePage.navigationTeachers).toBeVisible();
    await homePage.navigationTeachers.click();
    await homePage.orderForMSZS.waitFor({ state: "visible" });
    await homePage.orderForMSZS.click();

    await expect(page).toHaveTitle(ApplicationTexts.orderPage.title);
  });

  test("should display all sections correctly", async ({ orderPage }) => {
    await expect(orderPage.titleOrderForm).toBeVisible();
    await expect(orderPage.titleOrderForm).toHaveText(ApplicationTexts.orderPage.orderInformationHeading);

    await expect(orderPage.contactInformationSection).toBeVisible();
    await expect(orderPage.contactInformationSection).toHaveText(ApplicationTexts.orderPage.contactInformationHeading);

    await expect(orderPage.preferredTermSection).toBeVisible();
    await expect(orderPage.preferredTermSection).toHaveText(ApplicationTexts.orderPage.preferredTermSection);

    await expect(orderPage.serviceSelectionSection).toBeVisible();
    await expect(orderPage.serviceSelectionSection).toHaveText(ApplicationTexts.orderPage.serviceSelectionHeading);
  });

  test("check there are 12 required input fields for Day Camp order", async ({ orderPage }) => {
    await orderPage.selectDayCamp();
    const activeRequiredInputs = orderPage.page.locator("input[required]:not([disabled])");
    await expect(activeRequiredInputs).toHaveCount(12);
  });
});

test.describe("tests for creating an order", () => {
  test.fail("ICO input should populate recipient details from ARES", async ({ orderPage }) => {
    await orderPage.fillIcoNumber(DefaultOrderData);

    await expect(orderPage.inputReceiver).toHaveValue(DefaultOrderData.receiver);
    await expect(orderPage.inputFullAddress).toHaveValue(DefaultOrderData.address);
  });

  test("should show an error message when ARES search fails", async ({ orderPage }) => {
    await orderPage.fillIcoNumber(DefaultOrderData);

    await expect(orderPage.toastMessage).toBeVisible({ timeout: 10000 });
    await expect(orderPage.toastMessage).toHaveText("Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně");
  });

  test("form submits successfully with valid inputs", async ({ orderPage }) => {
    await orderPage.fillIcoNumber(DefaultOrderData);
    await expect(orderPage.toastMessage).toBeVisible({ timeout: 10000 });

    await orderPage.fillOrderForm(DefaultOrderData);

    await orderPage.selectDayCamp();
    await orderPage.selectDayCampAfternoon();

    await orderPage.fillDayCampOrder(DefaultOrderData);
    await orderPage.submitOrder.click();

    await expect(orderPage.toastMessage).toBeVisible;
    await expect(orderPage.toastMessage).toHaveText("Objednávka byla úspěšně uložena");
    await expect(orderPage.successOrderHeading).toHaveText(ApplicationTexts.orderPage.successOrderCreationHeading);
  });

  test("form should not submit with missing required input", async ({ orderPage }) => {
    await orderPage.selectDayCamp();
    await orderPage.submitOrder.click();

    const validationMessage = await orderPage.inputIco.evaluate((input) => input.validationMessage);
    expect(validationMessage).toBe("Please fill in this field.");
  });

  test("form should not submit with invalid inputs", async ({ orderPage }) => {
    const InvalidEmailData = {
      ...DefaultOrderData,
      email: "anderlova@a.com",
    };

    await orderPage.fillIcoNumber(DefaultOrderData);
    await expect(orderPage.toastMessage).toBeVisible({ timeout: 10000 });

    await orderPage.fillOrderForm(InvalidEmailData);

    await orderPage.selectDayCamp();
    await orderPage.selectDayCampAfternoon();

    await orderPage.fillDayCampOrder(DefaultOrderData);
    await orderPage.submitOrder.click();

    await expect(orderPage.alert).toBeVisible;
    await expect(orderPage.alert).toHaveText("Zadaná adresa neexistuje, zkontrolujte překlepy");
  });
});
