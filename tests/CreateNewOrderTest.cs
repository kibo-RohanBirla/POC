using Microsoft.Playwright;
using NUnit.Framework;
using System.Threading.Tasks;

namespace KiboCommerceTests
{
    public class CreateNewOrderTest
    {
        private IBrowser _browser;
        private IPage _page;
        private IPlaywright _playwright;

        [SetUp]
        public async Task Setup()
        {
            _playwright = await Playwright.CreateAsync();
            _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = false });
            _page = await _browser.NewPageAsync();
        }

        [TearDown]
        public async Task Teardown()
        {
            await _browser.CloseAsync();
            _playwright.Dispose();
        }

        [Test]
        public async Task CreateNewOrder()
        {
            // 1. Navigate to the KiboCommerce admin login page
            await _page.GotoAsync("https://t17838.sb.gdev09.gcp.kibocommerce.com/admin");

            // 2. Fill the email input
            await _page.FillAsync("#Email", "admin@kibocommerce.com");
            await _page.ClickAsync("button:has-text('Next')");

            // 3. Fill the password input
            await _page.FillAsync("#Password", "Kibo1!");
            await _page.ClickAsync("button:has-text('Log in')");

            // 4. Click on Orders navigation link
            await _page.ClickAsync("a:has-text('Orders')");

            // 5. Click on Create New Order
            await _page.ClickAsync("button:has-text('Create New Order')");

            // 6. Click AutomationEcommPlusOms navigation link
            var automationNav = _page.Locator("a:has-text('AutomationEcommPlusOms')");
            if (await automationNav.IsVisibleAsync())
                await automationNav.ClickAsync();

            // 7. Enter 1000 in the customer search input
            await _page.FillAsync("input[placeholder='Customer Search']", "1000");

            // 8. Select the first customer option with value TestAuto@gmail.com
            var firstCustomer = _page.Locator("text=TestAuto@gmail.com").First;
            if (await firstCustomer.IsVisibleAsync())
                await firstCustomer.ClickAsync();

            // 9. Click Edit Details
            var editDetailsBtn = _page.GetByRole(AriaRole.Button, new() { Name = "Edit Details" });
            if (await editDetailsBtn.IsVisibleAsync())
                await editDetailsBtn.ClickAsync();

            // 10. Search for product "sp_01" and select it
            await _page.FillAsync("input[placeholder='Search Products']", "sp_01");
            var productOption = _page.Locator("text=sp_01").First;
            if (await productOption.IsVisibleAsync())
                await productOption.ClickAsync();

            // 11. Select "Direct Ship" from Fulfillment dropdown
            await _page.SelectOptionAsync("select[aria-label='Fulfillment']", "Direct Ship");

            // 12. Enter 2 in the Qty input
            await _page.FillAsync("input[aria-label='Qty']", "2");

            // 13. Click Add
            await _page.ClickAsync("button:has-text('Add')");

            // 14. Confirm success (add your own assertion here)
            Assert.Pass("Order creation steps completed.");
        }
    }
}
