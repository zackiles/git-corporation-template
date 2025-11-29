# Tools

This folder contains CLI tools for managing the corporate minute book repository.

## Usage

All tools are accessed via the main CLI entrypoint:

```bash
node cli.mjs <tool-name> [args...]
```

## Available Tools

| Tool | Purpose |
|------|---------|
| `setup` | Initialize repository for a corporation |
| `validate` | Check repository state for issues |

## Creating New Tools

1. Copy `_template.mjs` and rename it (use kebab-case, e.g., `my-tool.mjs`)
2. Implement your tool functionality
3. The tool is auto-discovered by `cli.mjs`

### Tool Naming

- Use kebab-case for filenames (e.g., `my-tool.mjs`)
- Files prefixed with `_` are ignored (templates/internal)
- Extension must be `.mjs`

### Tool Structure

Each tool should:
- Handle its own argument parsing from `process.argv.slice(2)`
- Implement a `--help` flag
- Exit with appropriate codes (0 for success, non-zero for errors)

See `_template.mjs` for a starter template.
