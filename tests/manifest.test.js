import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('gemini-extension.json is valid', () => {
  const manifestPath = path.resolve(process.cwd(), 'gemini-extension.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest file exists');
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.strictEqual(manifest.name, 'victoriametrics-logs-mcp', 'manifest name matches');
  assert.ok(manifest.mcpServers, 'mcpServers are defined');
  assert.ok(manifest.mcpServers.victoriametrics, 'victoriametrics server is defined');
  assert.ok(manifest.mcpServers.vmMcpInfo, 'vmMcpInfo server is defined');
});
