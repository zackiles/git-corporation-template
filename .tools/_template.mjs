#!/usr/bin/env node

/**
 * Tool Template
 * 
 * Copy this file and rename it to create a new tool.
 * Remove the underscore prefix (e.g., my-tool.mjs).
 * Tool names should use kebab-case (e.g., my-tool.mjs).
 * 
 * Usage:
 *   node cli.mjs <tool-name> [args...]
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function showHelp() {
  console.log(`
Tool Name — Corporate Minute Book

Usage:
  node cli.mjs <tool-name>              Run the tool
  node cli.mjs <tool-name> --help       Show this help

Description:
  Describe what your tool does here.

Options:
  --help, -h    Show this help message
  --example     An example option
`);
}

async function main() {
  console.log('Tool executed successfully!');
  console.log('ROOT directory:', ROOT);
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else {
  main();
}
