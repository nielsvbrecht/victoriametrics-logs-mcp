# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.5] - 2026-03-28

### Changed
- **Node.js 24**: Updated CI runner and actions to Node.js 24 to resolve deprecation warnings.

## [2.0.4] - 2026-03-28

### Added
- **Changelog Validation**: CI now fails if `version.txt` is updated without a corresponding entry in `CHANGELOG.md`.

## [2.0.3] - 2026-03-28

### Added
- **Multi-Platform CI**: Added matrix builds for Ubuntu, macOS, and Windows.
- **Cross-Platform Verification**: Tests installation in `gemini-cli` on all OSes.

## [2.0.2] - 2026-03-28

### Added
- **CI Installation Test**: Automatic verification that the extension links correctly in `gemini-cli`.

## [2.0.1] - 2026-03-28

### Fixed
- **CI Trigger**: Fixed GitHub Actions push triggers for `version.txt`.

## [2.0.0] - 2026-03-28

### Added
- **VictoriaLogs Support**: Integrated full LogsQL support with new tools:
  - `logs_query`: Execute LogsQL queries.
  - `logs_hits`: Get log statistics over time.
  - `logs_list_field_names`: Discover available log fields.
  - `logs_list_field_values`: Explore unique values for log fields.
  - `logs_status`: Health check for VictoriaLogs instances.
- **New Skill: logs-expert**: Specialized expertise in LogsQL and log analysis.
- **Enhanced Skill: troubleshooter**: Now includes VictoriaLogs diagnostic workflows and correlation.
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
