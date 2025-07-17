import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/AdminLoginPage';
import { ProductEditPage } from '../../pages/main/catalog/prodcuts/productEditPage';
import { ProductGridPage } from '../../pages/main/catalog/prodcuts/productGridPage';
import { StorefrontPage } from '../../pages/StorefrontPage';
import { generateUniqueProductCodeAndTitle } from '../../helpers/testUtils';

test('Create Product and Check PDP Storefront', async ({ page }) => {
  // Initialize page objects
  const adminLoginPage = new AdminLoginPage(page);
  const productGridPage = new ProductGridPage(page);
  const productEditPage = new ProductEditPage(page);
  const storefrontPage = new StorefrontPage(page);

  // Generate unique identifiers
  const timestamp = generateUniqueProductCodeAndTitle(); // Unique product code and title
  const productPrice = 199.99; // Example price, can be adjusted as needed

  // Set the LOGIN_URL environment variable to match LoginPage URL
  process.env.LOGIN_URL = 'https://t50003.sb.gdev09.gcp.kibocommerce.com/admin/';

  // Login
  await adminLoginPage.goto();
  await adminLoginPage.login();

  // Navigate to products and create product
  await productGridPage.navigateToProducts();
  await productGridPage.clickCreateNewProduct();
  await productEditPage.createProduct(timestamp, timestamp, productPrice.toString());
  await productEditPage.addProductToCatalog();

  // Verify product in storefront PDP -> Verify product details, title, price, add to cart button, and weight
 
  await storefrontPage.goto(timestamp);
  await storefrontPage.verifyProductDetails(timestamp, productPrice.toString());
});
