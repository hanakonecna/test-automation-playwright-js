//Page object describing the home page//

export class HomePage {
  constructor(page) {
    this.page = page;
    this.navigationTeachers = this.page.getByRole("button", { name: "Pro učitelé" });
    this.orderForMSZS = this.page.getByRole("link", { name: "Objednávka pro MŠ/ZŠ" });
  }

  async open() {
    await this.page.goto("/");
  }
}
