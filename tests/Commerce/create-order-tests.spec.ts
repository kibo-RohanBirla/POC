import { test } from '../../fixtures/login-fixture';
import { OrderHelper } from '../../helpers/commerce/orderHelper/orderHelper';
import { shipmentsPage } from '../../pages/main/orders/orders/shipmentsPage';
import { OrderPaymentPage } from '../../pages/main/orders/orders/OrderPaymentPage';
import { expect } from '@playwright/test';
import { OrderApiHelper } from '../../helpers/api/orderApiHelper';
import { OrderPage } from '../../pages/main/orders/orders/OrderPage';

let orderNumber: Number;
test('Create new order using POM', async ({loginPage, page }) => {
  const orderHelper = new OrderHelper();

  orderNumber = await orderHelper.CreateAndSubmitOrder(page);

});
     

test('Add payment to order', async ({loginPage, page, request}) => {

  const orderHelper = new OrderHelper();
   const paymentPage = new OrderPaymentPage(page );
   const orderPage = new OrderPage(page);

  const response = await OrderApiHelper.CreateAndSubmitOrder(request);
  await page.goto(`${process.env.LOGIN_URL}/edit/${response.id}`);
  await orderPage.verifyOrderStatus('Accepted');

  await paymentPage.clickPaymentsTab();
  await paymentPage.clickAddPaymentButton();
  await orderHelper.AddPaymentToOrder(page, response.orderNumber, {
    nameOnCard: 'sam billings',
    cardNumber: '4111111111111111',
    expMonth: '12',
    expYear: '2028',
    cvv: '123'
  });

  await paymentPage.verifyRollUpPaymentStatus('Pending');
  await paymentPage.verifyPaymentStatus('Authorized');

 
});

test('Fulfill the order from admin UI', async ({loginPage, page, request }) => {
 const Shipments = new shipmentsPage(page);
   const orderPage = new OrderPage(page);
 const response = await OrderApiHelper.CreateAndSubmitOrder(request);
  await page.goto(`${process.env.LOGIN_URL}/edit/${response.id}`);
  await orderPage.verifyOrderStatus('Accepted');
 await Shipments.clickShipmentsTab();
 await Shipments.clickUpdateShipment();
 await Shipments.clickMarkAsShipped();
 await Shipments.verifyShipmentStatus('FULFILLED');
 await Shipments.verifyRollUpShipmentStatus('FULFILLED');
});
