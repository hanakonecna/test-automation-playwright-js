import { test as base, expect } from "@playwright/test";
import { OrderPage } from "../tests/pages/order.page";

export const test = base.extend({
  orderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page);
    await orderPage.open();
    await use(orderPage);
  },
  expect: async ({}, use) => {
    await use(expect);
  },
});

export { expect };

export const ApplicationTexts = {
  orderPage: {
    title: "  Nová objednávka - Czechitas  ",
    orderInformationHeading: "Objednávka akce",
    contactInformationHeading: "Kontaktní osoba",
    preferredTermSection: "Požadovaný termín",
    serviceSelectionHeading: "Objednávaná služba",
    successOrderCreationHeading: "Děkujeme za objednávku",
  },
};

export const DefaultOrderData = {
  ico: "60077212",
  receiver: "Základní škola a Mateřská škola, L.Kuby 48, České Budějovice",
  address: "L. Kuby 1165/48, České Budějovice 7, 370 07 České Budějovice",
  schoolDirector: "Romana Kábelová",
  name: "Eva Anderlová",
  phone: "386 102 363",
  email: "anderlov+1@gmail.com",
  startDate1: "02.02.2026",
  endDate1: "06.02.2026",
  numberOfChildren: "25",
  childrenAge: "11",
  numberOfSupervisors: "2",
};
