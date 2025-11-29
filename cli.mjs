#!/usr/bin/env node

/**
 * Corporate Minute Book CLI
 * 
 * Main entrypoint for all repository management tools.
 * Routes commands to tool scripts in the .tools/ directory.
 * 
 * Usage:
 *   node cli.mjs <tool> [args...]     Run a tool with arguments
 *   node cli.mjs --help               Show available tools
 *   node cli.mjs <tool> --help        Show tool-specific help
 */

import { existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = join(__dirname, '.tools');

function getTools() {
  if (!existsSync(TOOLS_DIR)) return [];
  
  return readdirSync(TOOLS_DIR)
    .filter(f => f.endsWith('.mjs') && !f.startsWith('_'))
    .map(f => f.replace('.mjs', ''));
}

function showHelp() {
  const tools = getTools();
  
  console.log(`
Corporate Minute Book CLI

Usage:
  node cli.mjs <tool> [args...]     Run a tool
  node cli.mjs --help               Show this help

Available tools:
${tools.length > 0 ? tools.map(t => `  ${t}`).join('\n') : '  (no tools found)'}

Examples:
  node cli.mjs setup                Run the setup wizard
  node cli.mjs validate             Validate repository state
  node cli.mjs setup --help         Show setup tool help
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }
  
  let toolName = args[0];
  const toolArgs = args.slice(1);
  
  if (toolName.endsWith('.mjs')) {
    toolName = toolName.slice(0, -4);
  }
  
  const toolPath = join(TOOLS_DIR, `${toolName}.mjs`);
  
  if (!existsSync(toolPath)) {
    console.error(`Error: Tool '${toolName}' not found.\n`);
    showHelp();
    process.exit(1);
  }
  
  process.argv = [process.argv[0], toolPath, ...toolArgs];
  
  try {
    await import(pathToFileURL(toolPath).href);
  } catch (err) {
    console.error(`Error running tool '${toolName}':`, err.message);
    process.exit(1);
  }
}

main();
