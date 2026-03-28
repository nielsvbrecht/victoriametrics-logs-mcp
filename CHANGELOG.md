# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-28

### Added
- **VictoriaLogs Support**: Integrated full LogsQL support with new tools:
  - `logs_query`: Execute LogsQL queries.
  - `logs_hits`: Get log statistics over time.
  - `logs_list_field_names`: Discover available log fields.
  - `logs_list_field_values`: Explore unique values for log fields.
  - `logs_status`: Health check for VictoriaLogs instances.
- **SSRF Protection**: Added URL validation for instance entrypoints.
- **Request Timeouts**: Implemented 30s timeouts for all outgoing requests.
- **Enhanced Error Handling**: Improved error reporting for failed requests and configuration issues.

### Changed
- **Renamed Project**: Renamed from `vm-mcp` to `victoriametrics-logs-mcp` to reflect expanded scope.
- **Refactored Code**: Centralized fetch and configuration logic in `index.js`.
- **Updated Documentation**: Comprehensive updates to `README.md` and `GEMINI.md`.

### Fixed
- **Security Vulnerabilities**: Resolved high-severity vulnerabilities in development dependencies.

## [1.1.0] - 2026-02-18

### Added
- Initial support for VictoriaMetrics MetricsQL.
- Basic health and status monitoring.
- Integration with community `mcp-victoriametrics` server.
