import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { chromium } from "playwright";

// Create server instance
const server = new McpServer({
  name: "playwright-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Example tool registration
server.tool(
  "example-tool",
  "An example tool",
  {
    input: z.object({
      message: z.string().describe("A message to echo back"),
    }),
  },
  async ({ input }) => {
    return { content: [{ type: "text", text: `Echo: ${input.message}` }] };
  }
);

// Add a tool for browser automation
server.tool(
  "browser-automation",
  "Execute browser actions based on plain English instructions",
  {
    input: z.object({
      instruction: z.string().describe("Plain English instruction for browser interaction"),
    }),
  },
  async ({ input }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Example: Parse the instruction and perform actions
      if (input.instruction.toLowerCase().includes("open github")) {
        await page.goto("https://github.com");
      } else if (input.instruction.toLowerCase().includes("search for")) {
        const query = input.instruction.split("search for")[1].trim();
        await page.goto("https://www.google.com");
        await page.fill("input[name='q']", query);
        await page.press("input[name='q']", "Enter");
      } else {
        return { content: [{ type: "text", text: "Instruction not recognized." }] };
      }

      return { content: [{ type: "text", text: "Action completed successfully." }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    } finally {
      await browser.close();
    }
  }
);

server.tool(
  "navigate-to-issues",
  "Navigate to the Playwright MCP GitHub repository and click on the Issues tab",
  {
    input: z.object({
      instruction: z.string().describe("Plain English instruction for browser interaction"),
    }),
  },
  async ({ input }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to the Playwright MCP GitHub repository
      await page.goto("https://github.com/microsoft/playwright-mcp");

      // Click on the "Issues" tab
      await page.click('a[href="/microsoft/playwright-mcp/issues"]');

      return { content: [{ type: "text", text: "Navigated to the Issues tab." }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    } finally {
      await browser.close();
    }
  }
);

server.tool(
  "navigate-to-orders",
  "Navigate to the specified orders page",
  {
    input: z.object({
      instruction: z.string().describe("Plain English instruction for browser interaction"),
    }),
  },
  async ({ input }) => {
    const browser = await chromium.launch({ 
      headless: false,
      args: ['--no-sandbox']
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to the specified orders page
      await page.goto("https://t17838.sb.gdev09.gcp.kibocommerce.com/admin/s-22123/orders", {
        waitUntil: 'networkidle'
      });

      // Wait for the username field to be available
      await page.waitForSelector('input[name="username"]');
      
      // Enter the username in the input field
      await page.fill('input[name="username"]', 'admin@kibocommerce.com');

      return { content: [{ type: "text", text: "Successfully navigated and filled username." }] };
    } catch (error) {
      console.error('Navigation error:', error);
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    } finally {
      await context.close();
      await browser.close();
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playwright MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
