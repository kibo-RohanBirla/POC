const { StdioClientTransport, McpClient } = require("@modelcontextprotocol/sdk/client/stdio");

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["./build/index.js"],
  });

  const client = new McpClient({ transport });
  await client.connect();

  // Test instruction to navigate to the Playwright MCP GitHub repository and click on the Issues tab
  const result = await client.callTool("navigate-to-issues", {
    instruction: "Navigate to the Playwright MCP GitHub repository and click on the Issues tab",
  });

  console.log("Result:", result.content[0].text);

  await client.disconnect();
}

main().catch((error) => {
  console.error("Error:", error);
});
