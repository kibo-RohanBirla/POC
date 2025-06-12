"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "playwright-mcp-server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Example tool registration
server.tool("example-tool", "An example tool", {
    input: zod_1.z.object({
        message: zod_1.z.string().describe("A message to echo back"),
    }),
}, async ({ input }) => {
    return { content: [{ type: "text", text: `Echo: ${input.message}` }] };
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Playwright MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
