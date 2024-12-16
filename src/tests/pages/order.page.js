//Page object describing the new order page//
class OrderPage {
  constructor(page) {
    this.page = page;
    this.titleOrderForm = this.page.getByRole("heading", { name: "Objednávka akce" });
    this.inputIco = this.page.getByLabel("IČO");
    this.inputReceiver = this.page.getByLabel("Odběratel");
    this.inputFullAddress = this.page.getByLabel("Úplná adresa");
    this.inputSchoolDirector = this.page.getByLabel("Zastoupena - ředitel(ka) školy");
    this.contactInformationSection = this.page.getByRole("heading", { name: "Kontaktní osoba" });
    this.inputContactName = this.page.getByLabel("Jméno a příjmení");
    this.inputContactPhone = this.page.getByLabel("Telefon");
    this.inputContactEmail = this.page.getByLabel("Email");
    this.preferredTermSection = this.page.getByRole("heading", { name: "Požadovaný termín" });
    this.inputPreferredStartDate1 = this.page.getByLabel("Upřednostňovaný termín 1");
    this.inputPreferredEndDate1 = this.page.locator("#end_date_1");
    this.serviceSelectionSection = this.page.getByRole("heading", { name: "Objednávaná služba" });
    this.dayCampNav = this.page.locator("#nav-home-tab");
    this.dropdownDayCampOption = this.page.getByLabel("Kurz");
    this.inputNumberOfChildren = this.page.getByRole("spinbutton", { name: "Počet dětí" });
    this.inputChildrenAge = this.page.getByRole("textbox", { name: "ve věku" });
    this.inputNumberOfSupervisors = this.page.getByRole("spinbutton", { name: "Počet pedagogického doprovodu" });
    this.toastMessage = this.page.locator(".toast-message");
    this.submitOrder = this.page.getByRole("button", { name: "Uložit objednávku" });
    this.successOrderHeading = this.page.getByRole("heading", { name: "Děkujeme za objednávku" });
    this.alert = this.page.getByText("Zadaná adresa neexistuje,");
  }

  async open() {
    await this.page.goto("/objednavka/pridat");
  }

  async fillIcoNumber(customOrderData) {
    await this.inputIco.fill(customOrderData.ico);
    await this.page.keyboard.press("Enter");
  }

  async selectDayCamp() {
    await this.dayCampNav.click();
  }

  async fillOrderForm(customOrderData) {
    await this.inputReceiver.fill(customOrderData.receiver);
    await this.inputFullAddress.fill(customOrderData.address);
    await this.inputSchoolDirector.fill(customOrderData.schoolDirector);
    await this.inputContactName.fill(customOrderData.name);
    await this.inputContactPhone.fill(customOrderData.phone);
    await this.inputContactEmail.fill(customOrderData.email);
    await this.inputPreferredStartDate1.fill(customOrderData.startDate1);
    await this.page.keyboard.press("Enter");
    await this.inputPreferredEndDate1.fill(customOrderData.endDate1);
    await this.page.keyboard.press("Enter");
  }

  async selectDayCampAfternoon() {
    await this.dropdownDayCampOption.selectOption("afternoon");
  }

  async fillDayCampOrder(customOrderData) {
    await this.inputNumberOfChildren.fill(customOrderData.numberOfChildren);
    await this.inputChildrenAge.fill(customOrderData.childrenAge);
    await this.inputNumberOfSupervisors.fill(customOrderData.numberOfSupervisors);
  }
}

export { OrderPage };
