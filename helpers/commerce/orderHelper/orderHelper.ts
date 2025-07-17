import { Page, expect } from '@playwright/test';
import { OrderPage } from '../../../pages/main/orders/orders/OrderPage';
import { OrderPaymentPage } from '../../../pages/main/orders/orders/OrderPaymentPage';


export class OrderHelper {
  async CreateAndSubmitOrder(page: Page, customerId: string = '1000', productId: string = 'sp_01',
     quantity: number = 2, expectedOrderStatus: string = 'Accepted') {
    const orderPage = new OrderPage(page);
    await orderPage.createNewOrder();
    await orderPage.searchCustomer(customerId);
    await orderPage.editOrderDetails();
    await orderPage.searchAndSelectProduct(productId);
    await orderPage.setQuantityAndAdd(quantity.toString());
    await orderPage.selectShippingMethod();
    await orderPage.saveOrder();
    await orderPage.submitOrder();
    await orderPage.verifyOrderStatus(expectedOrderStatus);
    const orderNumber = Number(await orderPage.getOrderNumber());
    console.log(`Order created successfully with Order Number: ${orderNumber}`);
    return orderNumber;   
    
  }

  async AddPaymentToOrder(page: Page, orderNumber: string, paymentDetails: {
    nameOnCard: string,
    cardNumber: string,
    expMonth: string,
    expYear: string,
    cvv: string
  }) {
    const paymentPage = new OrderPaymentPage(page );
      await paymentPage.selectNewCreditCard();
      await paymentPage.fillNameOnCard(paymentDetails.nameOnCard);
      await paymentPage.selectCardType('VISA');
      await paymentPage.fillCardNumber(paymentDetails.cardNumber);
      await paymentPage.fillExpMonth(paymentDetails.expMonth);
      await paymentPage.fillExpYear(paymentDetails.expYear);
      await paymentPage.fillCVV(paymentDetails.cvv);
      await paymentPage.clickSaveButton();
  }
}
