#!/usr/bin/env node

/**
 * Validate Tool
 * 
 * Validates the repository state, checking for missing files, 
 * broken templates, and configuration issues.
 * 
 * Usage:
 *   node cli.mjs validate              Validate repository state
 *   node cli.mjs validate --help       Show help
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const CONFIG = {
  markerFile: '.initialized',
  contextFile: 'secretary-context.json',
};

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

function showHelp() {
  console.log(`
Validate Tool — Corporate Minute Book

Usage:
  node cli.mjs validate          Check repository state

Checks performed:
  - Initialization status
  - Required files existence
  - Register files existence
  - Template files existence

Exit codes:
  0  All checks passed
  1  One or more issues found
`);
}

async function validateState() {
  console.log('\n🔍 Validating repository state...\n');
  
  const issues = [];
  const context = readJSON(join(ROOT, CONFIG.contextFile));
  
  const initialized = existsSync(join(ROOT, CONFIG.markerFile));
  console.log(`Initialized: ${initialized ? '✓' : '✗ (run node cli.mjs setup)'}`);
  
  const requiredFiles = ['AGENTS.md', 'SECRETARY.md', 'WORKFLOWS.md', CONFIG.contextFile];
  for (const file of requiredFiles) {
    const exists = existsSync(join(ROOT, file));
    console.log(`${file}: ${exists ? '✓' : '✗'}`);
    if (!exists) issues.push(`Missing required file: ${file}`);
  }
  
  if (context?.registers) {
    console.log('\nRegisters:');
    for (const reg of context.registers) {
      const exists = existsSync(join(ROOT, reg.path));
      console.log(`  ${reg.name}: ${exists ? '✓' : '✗'}`);
      if (!exists) issues.push(`Missing register: ${reg.path}`);
    }
  }
  
  if (context?.templates) {
    console.log('\nTemplates:');
    let templateCount = 0;
    let missingCount = 0;
    for (const tpl of context.templates) {
      const exists = existsSync(join(ROOT, tpl.path));
      if (!exists) {
        missingCount++;
        issues.push(`Missing template: ${tpl.path}`);
      } else {
        templateCount++;
      }
    }
    console.log(`  Found: ${templateCount}, Missing: ${missingCount}`);
  }
  
  console.log('\n' + '─'.repeat(60));
  if (issues.length === 0) {
    console.log('✅ Repository state is valid.\n');
    process.exit(0);
  } else {
    console.log(`⚠️  Found ${issues.length} issue(s):\n`);
    for (const issue of issues) {
      console.log(`   • ${issue}`);
    }
    console.log('');
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else {
  validateState();
}
