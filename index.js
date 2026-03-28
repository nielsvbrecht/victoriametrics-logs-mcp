/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'victoriametrics-logs-mcp',
  version: '2.2.6',
});

/**
 * Validates and returns the VictoriaMetrics entrypoint.
 */
function getVmEntrypoint() {
  const url = process.env.VM_INSTANCE_ENTRYPOINT || 'http://localhost:8428';
  validateUrl(url);
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Validates and returns the VictoriaLogs entrypoint.
 */
function getVlEntrypoint() {
  const url = process.env.VL_INSTANCE_ENTRYPOINT || 'http://localhost:9428';
  validateUrl(url);
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Basic SSRF protection: Ensure URL is http/https and has a valid format.
 */
function validateUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error(`Invalid protocol: ${parsed.protocol}. Only http and https are allowed.`);
    }
  } catch (error) {
    throw new Error(`Invalid instance entrypoint URL: ${url}. ${error.message}`);
  }
}

/**
 * Fetch with timeout and status check.
 */
async function fetchWithTimeout(url, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
    }
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  }
}

server.registerTool(
  'get_extension_info',
  {
    description: 'Returns information about the VictoriaMetrics extension.',
    inputSchema: z.object({}).shape,
  },
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: 'VictoriaMetrics & VictoriaLogs Gemini Extension (victoriametrics-logs-mcp). Version 2.0.0. Provides MetricsQL and LogsQL expertise.',
        },
      ],
    };
  },
);

server.registerTool(
  'check_config',
  {
    description: 'Checks if the VictoriaMetrics and VictoriaLogs configurations are set in environment variables.',
    inputSchema: z.object({}).shape,
  },
  async () => {
    try {
      const vm_url = getVmEntrypoint();
      const vl_url = getVlEntrypoint();
      const type = process.env.VM_INSTANCE_TYPE || 'single';
      return {
        content: [
          {
            type: 'text',
            text: `Configuration Status:\nVictoriaMetrics URL: ${vm_url}\nVictoriaLogs URL: ${vl_url}\nType: ${type}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Configuration error: ${error.message}` }],
        isError: true,
      };
    }
  },
);

server.registerTool(
  'query',
  {
    description: 'Execute a MetricsQL query against VictoriaMetrics.',
    inputSchema: z.object({
      query: z.string().describe('The MetricsQL query expression.'),
    }),
  },
  async ({ query }) => {
    const entrypoint = getVmEntrypoint();
    try {
      const response = await fetchWithTimeout(`${entrypoint}/api/v1/query?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error executing query: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'logs_query',
  {
    description: 'Execute a LogsQL query against VictoriaLogs.',
    inputSchema: z.object({
      query: z.string().describe('The LogsQL query expression.'),
      limit: z.number().optional().describe('Maximum number of log entries to return.'),
      start: z.string().optional().describe('Start time (RFC3339, Unix timestamp, or relative duration like 5m).'),
      end: z.string().optional().describe('End time.'),
    }),
  },
  async ({ query, limit, start, end }) => {
    const entrypoint = getVlEntrypoint();
    const params = new URLSearchParams({ query });
    if (limit) params.append('limit', limit.toString());
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    try {
      const response = await fetchWithTimeout(`${entrypoint}/select/logsql/query?${params.toString()}`);
      const text = await response.text();
      return {
        content: [{ type: 'text', text }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error executing logs query: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'logs_list_field_names',
  {
    description: 'List all field names in VictoriaLogs.',
    inputSchema: z.object({
      query: z.string().optional().describe('Optional LogsQL query to filter fields.'),
    }),
  },
  async ({ query }) => {
    const entrypoint = getVlEntrypoint();
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    
    try {
      const response = await fetchWithTimeout(`${entrypoint}/select/logsql/field_names?${params.toString()}`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error listing fields: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'logs_list_field_values',
  {
    description: 'List unique values for a specific field in VictoriaLogs.',
    inputSchema: z.object({
      field: z.string().describe('The field name to list values for.'),
      query: z.string().optional().describe('Optional LogsQL query to filter values.'),
      limit: z.number().optional().describe('Maximum number of values to return.'),
    }),
  },
  async ({ field, query, limit }) => {
    const entrypoint = getVlEntrypoint();
    const params = new URLSearchParams({ field });
    if (query) params.append('query', query);
    if (limit) params.append('limit', limit.toString());
    
    try {
      const response = await fetchWithTimeout(`${entrypoint}/select/logsql/field_values?${params.toString()}`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error listing field values: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'logs_hits',
  {
    description: 'Get statistics on the number of logs matching a query over time.',
    inputSchema: z.object({
      query: z.string().describe('LogsQL query.'),
      step: z.string().describe('The interval between data points (e.g., 1m, 1h).'),
      start: z.string().optional().describe('Start time.'),
      end: z.string().optional().describe('End time.'),
    }),
  },
  async ({ query, step, start, end }) => {
    const entrypoint = getVlEntrypoint();
    const params = new URLSearchParams({ query, step });
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    try {
      const response = await fetchWithTimeout(`${entrypoint}/select/logsql/hits?${params.toString()}`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error getting hits: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'logs_status',
  {
    description: 'Check the health and status of the VictoriaLogs instance.',
    inputSchema: z.object({}).shape,
  },
  async () => {
    const entrypoint = getVlEntrypoint();
    try {
      const healthResponse = await fetchWithTimeout(`${entrypoint}/health`);
      const health = await healthResponse.text();
      return {
        content: [
          {
            type: 'text',
            text: `VictoriaLogs Health: ${health}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error checking logs status: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'list_metrics',
  {
    description: 'List available metrics in the VictoriaMetrics instance.',
    inputSchema: z.object({}),
  },
  async () => {
    const entrypoint = getVmEntrypoint();
    try {
      const response = await fetchWithTimeout(`${entrypoint}/api/v1/label/__name__/values`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data.data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error listing metrics: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'list_labels',
  {
    description: 'List available label names in the VictoriaMetrics instance.',
    inputSchema: z.object({}),
  },
  async () => {
    const entrypoint = getVmEntrypoint();
    try {
      const response = await fetchWithTimeout(`${entrypoint}/api/v1/labels`);
      const data = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data.data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error listing labels: ${error.message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'vm_status',
  {
    description: 'Check the health and status of the VictoriaMetrics instance.',
    inputSchema: z.object({}),
  },
  async () => {
    const entrypoint = getVmEntrypoint();
    try {
      const healthResponse = await fetchWithTimeout(`${entrypoint}/health`);
      const health = await healthResponse.text();
      
      const statusResponse = await fetchWithTimeout(`${entrypoint}/api/v1/status/tsdb`);
      const status = await statusResponse.json();

      return {
        content: [
          {
            type: 'text',
            text: `Health: ${health}\n\nTSDB Status:\n${JSON.stringify(status.data, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error checking status: ${error.message}` }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
