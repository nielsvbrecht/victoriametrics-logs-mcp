# VictoriaMetrics MCP Integration (victoriametrics-logs-mcp)

## Problem
Building a Gemini CLI extension to interact with VictoriaMetrics via the Model Context Protocol (MCP).

## Solution
Create a structured extension with multiple MCP servers, custom skills, and slash commands.

### Architecture
- **MCP Integration**: Using `mcp-victoriametrics` (community server) for read-only MetricsQL.
- **Custom MCP Server (`index.js`)**: Implements metadata and configuration checks.
- **Skills**: `metrics-expert` and `troubleshooter` for specialized LLM context.
- **Commands**: `/vm-status` and `/vm-query` for quick user interaction.

### Key Snippets
#### `gemini-extension.json`
```json
{
  "mcpServers": {
    "victoriametrics": {
      "command": "npx",
      "args": ["-y", "mcp-victoriametrics"],
      "env": { "VM_INSTANCE_ENTRYPOINT": "http://localhost:8428" }
    },
    "vmMcpInfo": {
      "command": "node",
      "args": ["${extensionPath}${/}index.js"]
    }
  }
}
```

#### `commands/vm-status.toml`
```toml
description = "Get the health and status of the VictoriaMetrics instance."
prompt = """
Check the health and status of the VictoriaMetrics instance using the available tools...
"""
```

## Validation
- Automated tests in `tests/` for manifest and command structure.
- Manual verification via `gemini mcp list`.
