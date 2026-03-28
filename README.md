# VictoriaMetrics & VictoriaLogs Gemini Extension (victoriametrics-logs-mcp)

A specialized Gemini CLI extension for interacting with VictoriaMetrics and VictoriaLogs instances. This extension provides expert-level MetricsQL and LogsQL support, health monitoring, and troubleshooting tools.

## Features

- **MCP Integration**: Seamlessly connects to community and custom MCP servers for monitoring and logging.
- **Custom Skills**: 
  - `metrics-expert`: Specialized in PromQL/MetricsQL and query optimization.
  - `troubleshooter`: Focused on VictoriaMetrics health, ingestion, and storage diagnostics.
- **VictoriaLogs Support**: Full LogsQL integration for log retrieval, statistics, and analysis.
- **Slash Commands**:
  - `/vm-status`: Quick health report and status summary.
  - `/vm-query <query>`: Execute a query with AI-assisted interpretation.
- **Persistent Context**: `GEMINI.md` provides foundational knowledge about VictoriaMetrics and VictoriaLogs architecture and best practices.

## Installation

### For Users (from GitHub)
Run the following command to install the extension directly from the repository:
```bash
gemini extensions install https://github.com/nielsvbrecht/victoriametrics-logs-mcp.git
```

### For Developers (Local)
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/nielsvbrecht/victoriametrics-logs-mcp.git
    cd victoriametrics-logs-mcp
    ```

2.  **Install dependencies and build**:
    ```bash
    npm install
    npm run build
    ```

3.  **Link the extension**:
    ```bash
    gemini extensions link .
    ```

4.  **Configure Instances**:
    By default, the extension looks for VictoriaMetrics at `http://localhost:8428` and VictoriaLogs at `http://localhost:9428`. You can customize this by editing `gemini-extension.json` or setting environment variables:
    - `VM_INSTANCE_ENTRYPOINT`: URL of your VictoriaMetrics instance.
    - `VL_INSTANCE_ENTRYPOINT`: URL of your VictoriaLogs instance.
    - `VM_INSTANCE_TYPE`: `single` or `cluster`.

## Usage

Once linked, start a new Gemini CLI session. You can use the following commands and tools:

### Commands
- `/vm-status`: "Check the health of my VictoriaMetrics instance."
- `/vm-query "sum(rate(node_cpu_seconds_total[5m]))"`: Run a query and get an analysis.

### Tools
- `victoriametrics__query`: Execute raw MetricsQL.
- `vmMcpInfo__logs_query`: Execute LogsQL queries to retrieve log entries.
- `vmMcpInfo__logs_hits`: Get log statistics and frequency over time.
- `vmMcpInfo__logs_list_field_names`: Discover available log fields.
- `vmMcpInfo__logs_list_field_values`: Explore unique values for a specific log field (e.g., `level`, `app`).
- `vmMcpInfo__logs_status`: Check the health of your VictoriaLogs instance.
- `vmMcpInfo__check_config`: Verify your local configuration.

### Examples
- **Logs Query**: `vmMcpInfo__logs_query(query='error AND app="api"', limit=20)`
- **Log Hits (Stats)**: `vmMcpInfo__logs_hits(query='level="error"', step='1h')`
- **List Log Fields**: `vmMcpInfo__logs_list_field_names()`
- **List Field Values**: `vmMcpInfo__logs_list_field_values(field='host')`

### Skills
The extension's skills are automatically available. You can also explicitly activate them:
- `activate_skill(name="metrics-expert")`

## Development

### Running Tests
```bash
npm test
```

### Project Structure
- `gemini-extension.json`: Extension manifest.
- `index.js`: Local MCP server for extension metadata.
- `skills/`: Specialized agent expertise.
- `commands/`: Custom slash command definitions.
- `GEMINI.md`: Core instruction set.
