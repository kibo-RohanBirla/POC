import { Page, expect } from '@playwright/test';

export class shipmentsPage {
  constructor(private page: Page) {
    this.page = page;
  }


  async clickShipmentsTab() {
    await this.page.getByText('Shipments', { exact: true }).click();
  }

  async clickUpdateShipment(){
    await this.page.locator('div.taco-order-fulfillment-shipments > div >div>div:not(.taco-shipment-item-header) a.taco-splitbutton>span').click({position: { x: 100, y: 20 } });
  }

  async clickMarkAsShipped() {
    await this.page.getByRole('link', { name: 'Mark as shipped' }).click();
  }

  async selectCancelShipment() {
    await this.page.getByRole('link', { name: 'Cancel Shipment' }).click();
  }

  async verifyShipmentType(expectedType: string) {
    const shipmentType = await this.page.locator('div:below(:text("Type"))').first().textContent();
    expect(shipmentType).toBe(expectedType);
    return shipmentType;
  }

  async getShipmentNumber() {
    const shipmentNumber = await this.page.locator('div:below(:text("Shipment"))').first().textContent();
    return Number(shipmentNumber.trim());
  }

  async verifyShipmentStatus(expectedStatus: string) {
    const shipmentStatus= await this.page.locator('div:below(:text("Status"))').first().textContent();
    expect(shipmentStatus).toBe(expectedStatus);
    return shipmentStatus;
  }

  async verifyRollUpShipmentStatus(expectedStatus: string) {
    await expect(async () => {
    await this.page.reload();
    await this.clickShipmentsTab();
    const shipmentStatus = await this.page.locator('span:below(:text("Shipment Status"))').first().textContent();
    expect(shipmentStatus).toBe(expectedStatus);
  }).toPass({ timeout: 60_000,  intervals: [5_000, 10_000, 15_000, 20_000, 25_000, 30_000, 35_000, 40_000, 45_000, 50_000, 55_000] });
  }


}