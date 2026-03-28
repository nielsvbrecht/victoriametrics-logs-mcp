# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.2] - 2026-03-28

### Changed
- **CI Initialization**: Replaced manual configuration file creation with official `gemini projects new` and `gemini extensions link` commands. This ensures a consistent and valid CLI environment across all platforms, resolving project registration issues on Windows.

## [2.4.1] - 2026-03-28

### Fixed
- **CI Stability (Windows)**: Updated the extension linking step to run directly from the workspace directory. This ensures the Gemini CLI correctly identifies the project and registers the extension in the registry, resolving path mismatch issues on Windows runners.

## [2.4.0] - 2026-03-28

### Changed
- **CI Verification**: Replaced unreliable CLI output parsing with direct verification of the `projects.json` registry file. This ensures robust extension linking validation even if the CLI crashes during finalization in headless environments.

## [2.3.9] - 2026-03-28

### Fixed
- **CI Stability**: Switched to a Node.js-based check for extension verification to ensure robust string matching across different shell environments and platforms.

## [2.3.8] - 2026-03-28

### Fixed
- **CI Stability**: Switched to file-based output redirection for extension verification to gracefully handle CLI crashes in headless environments. Added mandatory frontmatter to all skill files to comply with recent Gemini CLI requirements.

## [2.3.7] - 2026-03-28

### Fixed
- **CI Stability**: Used JSON output format for extension verification to avoid parsing issues with terminal checkmarks and ANSI codes. Refined `GEMINI_CLI_HOME` to a dedicated temporary directory.

## [2.3.6] - 2026-03-28

### Fixed
- **CI Stability**: Fixed `GEMINI_CLI_HOME` path to avoid double-nested configuration directories. Switched back to `extensions link` for local installation testing to avoid archive extraction issues in older CLI versions.

## [2.3.5] - 2026-03-28

### Fixed
- **CI Installation Test**: Used the `file://` protocol for local artifact installation to ensure the Gemini CLI correctly identifies and extracts the package contents across all platforms.

## [2.3.4] - 2026-03-28

### Changed
- **CI Stability**: Switched to a local `npm install` for the Gemini CLI within a temporary directory during CI. This avoids global path resolution issues and `Cannot find module` errors encountered on macOS and Windows runners.

## [2.3.3] - 2026-03-28

### Fixed
- **CI Configuration**: Corrected the configuration directory environment variable from `GEMINI_CONFIG_DIR` to `GEMINI_CLI_HOME` and switched to global `npm install` for more reliable CLI execution in CI.

## [2.3.2] - 2026-03-28

### Fixed
- **CI Installation Test**: Switched to absolute paths for local artifact installation to resolve path resolution issues in different CI environments.

## [2.3.1] - 2026-03-28

### Changed
- **CI Installation Test**: Updated the pipeline to test installation directly from packaged artifacts (`.tar.gz` and `.zip`) using `gemini extensions install`, ensuring that both the packaging logic and the installation process are verified on all platforms.

## [2.3.0] - 2026-03-28

### Changed
- **CI Resilience**: Updated the pipeline to ensure all test stages (unit tests and multi-platform installation tests) run to completion even if individual steps fail. Added `fail-fast: false` and `continue-on-error: true` for test steps, with a final status check to ensure build integrity.

## [2.2.9] - 2026-03-28

### Changed
- **CI Stability**: Replaced `--headless` flag with `-p` for compatibility with `gemini-cli` 0.35.2 and updated the installation test to run directly from the workspace to ensure correct configuration detection.

## [2.2.8] - 2026-03-28

### Changed
- **CI Stability**: Pinned `gemini-cli` to `0.35.2` (first version with `--headless`) to support headless environments while avoiding regressions in newer versions.

## [2.2.7] - 2026-03-28

### Changed
- **CI Stability**: Switched to `npx` and pinned `gemini-cli` to `0.35.1` for all test installation steps across platforms to ensure a stable and consistent testing environment.

## [2.2.6] - 2026-03-28

### Fixed
- **CI Stability (macOS)**: Pinned `gemini-cli` to `0.35.2` to avoid regressions in newer versions and added additional debug logging to the test installation step.

## [2.2.5] - 2026-03-28

### Fixed
- **CI Stability (macOS)**: Upgraded `gemini-cli` to latest and added the `--headless` flag to all test commands to resolve UI-related crashes in CI environments.

## [2.2.4] - 2026-03-28

### Added
- **CI Unit Tests**: Integrated automated unit tests into the multi-platform pipeline to verify commands and manifest integrity.

## [2.2.3] - 2026-03-28

### Fixed
- **CI Stability**: Added `GEMINI_NO_HISTORY: "true"` and refined `projects.json` structure to prevent crashes in headless CI environments.

## [2.2.2] - 2026-03-28

### Changed
- **CI Matrix**: Re-enabled Darwin (macOS) stage after stability improvements.

## [2.2.1] - 2026-03-28

### Fixed
- **CI Resilience**: Improved resilience of installation checks to handle cases where `gemini-cli` crashes during cleanup but successfully performs the requested action.

## [2.2.0] - 2026-03-28

### Fixed
- **CI Stability**: Running installation tests from a neutral directory to prevent `gemini-cli` from crashing during automatic project detection in CI environments.

## [2.1.9] - 2026-03-28

### Fixed
- **CI Reliability**: Switched to `GEMINI_CONFIG_DIR` in workspace and improved `projects.json` structure to prevent `TypeError` and `ENOENT` crashes during extension link.

## [2.1.8] - 2026-03-28

### Fixed
- **CI Keychain Error**: Added `GEMINI_STORAGE_BACKEND: "file"` to bypass system keychain requirements in headless CI environments.

## [2.1.7] - 2026-03-28

### Changed
- **CI Matrix**: Temporarily disabled Darwin (macOS) stage to verify Linux and Windows stages.

## [2.1.6] - 2026-03-28

### Changed
- **CI Unix Test**: Made installation test stricter with `set -e` and removed `|| true` to properly identify root causes of failures.

## [2.1.5] - 2026-03-28

### Changed
- **CI Packaging**: Verified and refined multi-platform packaging steps to ensure correct artifact generation for Linux, Darwin, and Win32.

## [2.1.4] - 2026-03-28

### Fixed
- **CI Windows Test**: Fixed PowerShell syntax error in the installation test step.

## [2.1.3] - 2026-03-28

### Fixed
- **CI Installation**: Improved resilience of the installation test step by ignoring non-critical `gemini-cli` errors while still verifying success.

## [2.1.2] - 2026-03-28

### Fixed
- **CI Configuration**: Switched to `gemini --version` for safe configuration file initialization, avoiding `TypeError` from manually created empty files.

## [2.1.1] - 2026-03-28

### Added
- **CI Stability**: Enhanced CI environment with `libsecret-1-0` and initialized `projects.json`/`config.json` to improve `gemini-cli` reliability.

## [2.1.0] - 2026-03-28

### Added
- **CI Environment**: Automatic creation of `~/.gemini` directory in CI to prevent `projects.json` errors.

### Fixed
- **Version Sync**: Synchronized `package.json`, `gemini-extension.json`, and `index.js` with `version.txt`.

## [2.0.9] - 2026-03-28

### Fixed
- **CI Installation**: Replaced invalid `--yes` flag with `--consent` for `gemini extensions link`.

## [2.0.8] - 2026-03-28

### Fixed
- **CI Installation**: Added `--yes` flag to `gemini extensions link` to bypass non-interactive confirmation prompt.

## [2.0.7] - 2026-03-28

### Added
- **CI Secrets**: Added `gemini` environment and `GEMINI_API_KEY` to the pipeline for extension testing.

## [2.0.6] - 2026-03-28

### Fixed
- **CI Validation**: Fixed cross-platform `Validate Changelog` step by forcing `bash` shell on Windows.

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
