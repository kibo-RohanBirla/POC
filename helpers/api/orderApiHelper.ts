import { APIRequestContext, expect } from '@playwright/test';
import * as data from '../../data/orders/orderapi.json';

export class OrderApiHelper  {
  static async getOrders(request: APIRequestContext) {
    const response = await request.get(`${process.env.BASE_URL}/mozu.commerceruntime.webapi/commerce/orders`, {
      headers: await OrderApiHelper.buildHeaders()
    });
    const responseBody = await response.json();
    console.log('API response status:', responseBody.items[0]?.orderNumber);
    expect(response.status()).toBe(200);
    console.log('API response status:', response.status());
    return responseBody;
  }

  static async CreateOrder(request: APIRequestContext, payload: any) {
    const response = await request.post(`${process.env.BASE_URL}/mozu.commerceruntime.webapi/commerce/orders`, {
      headers: await OrderApiHelper.buildHeaders(),
      data: payload
    });
    const responseBody = await response.json();
    console.log('API response status:', responseBody.orderNumber);
    expect(response.status()).toBe(201);
    return responseBody;
  }

  static async AddItemToOrder(request: APIRequestContext, orderId: string, payload: any) {
    const response = await request.post(`${process.env.BASE_URL}/mozu.commerceruntime.webapi/commerce/orders/${orderId}/items?updatemode=ApplyToOriginal`, {
      headers: await OrderApiHelper.buildHeaders(),
      data: payload
    });
    const responseBody = await response.json();
    console.log('API response status:', responseBody.orderNumber);
    expect(response.status()).toBe(201);
    return responseBody;
  }

  static async UpdateFulfillmentInfo(request: APIRequestContext, orderId: string, payload: any) {
    const response = await request.put(`${process.env.BASE_URL}/mozu.commerceruntime.webapi/commerce/orders/${orderId}/fulfillmentinfo`, {
      headers: await OrderApiHelper.buildHeaders(),
      data: payload
    });
    const responseBody = await response.json();
    console.log('API response status:', responseBody.orderNumber);
    expect(response.status()).toBe(200);
    return responseBody;
  }

  static async SubmitOrder(request: APIRequestContext, orderId: string, payload: any) {
    const response = await request.post(`${process.env.BASE_URL}/mozu.commerceruntime.webapi/commerce/orders/${orderId}/actions`, {
      headers: await OrderApiHelper.buildHeaders(),
      data: payload
    });
     const responseBody = await response.json();
    console.log('API response status:', responseBody.orderNumber);
    expect(response.status()).toBe(200);
    return responseBody;
  }

  static async CreateAndSubmitOrder(request: APIRequestContext, payload: any = data.CreateOrder) {
    const orderResponse = await OrderApiHelper.CreateOrder(request, data.CreateOrder.CreateOrderPayload);
    console.log(`Order created successfully with Order Number: ${orderResponse.orderNumber}`);

    // Assuming you want to add an item to the order
    const addItemPayload = data.CreateOrder.AddItemsToOrderPayload;
    const addItemResponse = await OrderApiHelper.AddItemToOrder(request, orderResponse.id, addItemPayload);
    console.log(`Item added successfully to Order Number: ${addItemResponse.orderNumber}`);

    // Update fulfillment info if needed
    const fulfillmentPayload = data.CreateOrder.UpdateFulfillmentInfoPayload;
    const fulfillmentResponse = await OrderApiHelper.UpdateFulfillmentInfo(request, orderResponse.id, fulfillmentPayload);
    console.log(`Fulfillment info updated successfully for Order Number: ${fulfillmentResponse.orderNumber}`);

    // Assuming you want to submit the order after creation
    const submitPayload = data.CreateOrder.SubmitOrderPayload;
    const submitResponse = await OrderApiHelper.SubmitOrder(request, orderResponse.id, submitPayload);
    
    console.log(`Order submitted successfully with Order Number: ${submitResponse.orderNumber}`);
    return submitResponse;

  }

  static async buildHeaders() {
    return {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'x-vol-master-catalog': process.env.MASTER_CATALOG_ID,
      'x-vol-catalog': process.env.CATALOG_ID,
      'x-vol-tenant': process.env.TENANT_ID,
      'x-vol-site': process.env.SITE_ID,
      'x-vol-currency': process.env.CURRENCY,
      'x-vol-locale': process.env.LOCALE,
      'x-vol-app-claims': process.env.APP_CLAIMS,
      'Authorization': process.env.AUTHORIZATION_TOKEN
    };
  }
}
