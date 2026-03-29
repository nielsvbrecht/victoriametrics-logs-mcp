# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-03-28

### Fixed
- **CI Maintenance**: Removed forced Node.js 24 execution for GitHub Actions to resolve deprecation warnings while maintaining Node.js 24 for the application runtime.

## [2.0.0] - 2026-03-28

### Added
- **VictoriaLogs Support**: Full integration with VictoriaLogs including Tools (`logs_query`, `logs_hits`, `logs_list_field_names`, `logs_list_field_values`) and specific expert Skills.
- **Multi-Platform CI/CD**: Automated build, test, and release pipeline for Linux, macOS (Darwin), and Windows (Win32).
- **Expert Skills**: Added `logs-expert`, `metrics-expert`, and `troubleshooter` agent skills with mandatory YAML frontmatter.
- **Enhanced Security**: Implemented SSRF protection via URL validation and mandatory request timeouts using `AbortController`.

### Changed
- **Project Rebranding**: Renamed to `victoriametrics-logs-mcp` to reflect the expanded scope.
- **CI Stability**: Switched to `GEMINI_CLI_HOME` and direct registry file verification for robust cross-platform testing.
- **Distribution**: Automated packaging into `.tar.gz` and `.zip` artifacts for all supported platforms.

### Fixed
- **Headless Environment Crashes**: Resolved `sessionId` and terminal UI issues in CI by using non-interactive flags and optimized configuration structures.
- **Windows Path Handling**: Fixed registry registration and path escaping for Windows-based runners.
