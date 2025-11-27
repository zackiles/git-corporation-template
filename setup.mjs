#!/usr/bin/env node

/**
 * Corporate Minute Book Setup Script
 * 
 * Initializes a forked/cloned corporate minute book template for a specific corporation.
 * Transforms the repository from template state to secretary-ready state.
 * 
 * Usage:
 *   npm run setup                    # Interactive setup
 *   npm run setup -- --config corp.json  # Non-interactive with config file
 *   npm run setup -- --validate      # Validate current state
 *   npm run setup -- --generate-context  # Regenerate secretary-context.json
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync, renameSync, copyFileSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  markerFile: '.initialized',
  templateMarker: '.template-repo',
  archiveDir: '.template-archive',
  contextFile: 'secretary-context.json',
  versionFile: 'VERSION',
  corporationFile: 'CORPORATION.md',
  
  filesToArchive: [
    'MAINTAINERS.md',
    'FORK-SETUP.md',
    '.template-repo',
  ],
  
  filesToRemove: [
    // Files that get archived, not removed
  ],
  
  // Files that should be replaced with secretary-focused versions
  filesToReplace: {
    'README.md': generateSecretaryReadme,
    'AGENTS.md': generateAgentsFile,
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

function writeJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function getAllFiles(dir, base = dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...getAllFiles(fullPath, base));
      }
    } else {
      files.push(relative(base, fullPath));
    }
  }
  return files;
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function getVersion() {
  try {
    return readFileSync(join(ROOT, CONFIG.versionFile), 'utf-8').trim();
  } catch {
    return '0.0.0';
  }
}

// ============================================================================
// Context Generation
// ============================================================================

function generateFolderIndex() {
  const folders = {
    '01-formation': {
      description: 'Incorporation documents, bylaws, and initial organization',
      subfolders: {
        'bylaws': 'Corporate bylaws and amendments',
        'federal': 'Federal incorporation documents from Corporations Canada',
        'ontario-extra-provincial': 'Ontario extra-provincial registration',
        'organizational-resolutions': 'Initial board and shareholder resolutions',
      }
    },
    '02-constating-documents': {
      description: 'Shareholder agreements, policies, and governance amendments',
      subfolders: {
        'amendments': 'Amendments to constating documents',
        'policies': 'Corporate policies (dividend, signing authority)',
        'shareholders-agreements': 'Shareholder agreements',
      }
    },
    '03-registers': {
      description: 'Authoritative corporate registers (CSV files)',
      subfolders: {}
    },
    '04-meetings-and-resolutions': {
      description: 'Board and shareholder meetings, minutes, and resolutions',
      subfolders: {
        'board': 'Board of directors meetings and resolutions',
        'board/0000-templates': 'Templates for board documents',
        'shareholders': 'Shareholder meetings and resolutions',
        'shareholders/0000-templates': 'Templates for shareholder documents',
      }
    },
    '05-capitalization': {
      description: 'Cap table, share issuances, options, and ESOP',
      subfolders: {
        'cap-table': 'Current capitalization summary',
        'options-and-ESOP': 'Stock option plans and grants',
        'share-issuances': 'Individual share issuance transactions',
        'share-issuances/0000-templates': 'Templates for share issuance documents',
      }
    },
    '06-regulatory-filings': {
      description: 'Government filings and regulatory compliance',
      subfolders: {
        'corporations-canada': 'Federal filings with Corporations Canada',
        'ontario': 'Ontario provincial filings',
        'cra': 'Canada Revenue Agency filings',
        'licenses-and-permits': 'Business licenses and permits',
      }
    },
    '07-finance-and-tax': {
      description: 'Financial statements, tax records, and banking',
      subfolders: {
        'banking': 'Bank account mandates and resolutions',
        'financial-statements': 'Annual financial statement approvals',
        'tax-returns': 'Corporate tax filing records',
      }
    },
    '08-commercial-and-ip': {
      description: 'Key contracts, intellectual property, and HR agreements',
      subfolders: {
        'hr': 'Employee IP and confidentiality agreements',
        'ip': 'IP assignments and registrations',
        'ip/assignments': 'IP assignment agreements',
        'ip/registrations': 'Trademark and patent registrations',
        'key-contracts': 'Major commercial agreements',
        'key-contracts/0000-templates': 'Contract templates',
      }
    },
    '09-binary-artifacts': {
      description: 'Signed PDFs, scans, and receipts (Git LFS)',
      subfolders: {
        'receipts': 'Business receipts and expense documentation',
      }
    },
    '99-meta': {
      description: 'Process documentation and meta-templates (reference only)',
      subfolders: {
        'templates': 'PR description and changelog templates',
      }
    },
  };
  
  return folders;
}

function generateTemplateIndex() {
  const templates = [
    // Formation
    { path: '01-formation/bylaws/_001-general-by-law-template.md', name: 'General By-Law', category: 'formation' },
    { path: '01-formation/organizational-resolutions/_organizational-resolution-template.md', name: 'Organizational Resolution', category: 'formation' },
    
    // Constating Documents
    { path: '02-constating-documents/amendments/_amendment-template.md', name: 'Amendment', category: 'governance' },
    { path: '02-constating-documents/policies/_dividend-policy-template.md', name: 'Dividend Policy', category: 'governance' },
    { path: '02-constating-documents/policies/_signing-authority-policy-template.md', name: 'Signing Authority Policy', category: 'governance' },
    { path: '02-constating-documents/shareholders-agreements/_unanimous-shareholders-agreement-template.md', name: 'Unanimous Shareholders Agreement', category: 'governance' },
    
    // Meetings & Resolutions
    { path: '04-meetings-and-resolutions/board/0000-templates/_board-meeting-minutes-template.md', name: 'Board Meeting Minutes', category: 'meetings' },
    { path: '04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md', name: 'Board Resolution', category: 'meetings' },
    { path: '04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-meeting-minutes-template.md', name: 'Shareholder Meeting Minutes', category: 'meetings' },
    { path: '04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md', name: 'Shareholder Resolution', category: 'meetings' },
    
    // Capitalization
    { path: '05-capitalization/cap-table/_cap-table-template.md', name: 'Cap Table', category: 'capitalization' },
    { path: '05-capitalization/options-and-ESOP/_esop-plan-template.md', name: 'ESOP Plan', category: 'capitalization' },
    { path: '05-capitalization/options-and-ESOP/_option-grant-template.md', name: 'Option Grant', category: 'capitalization' },
    { path: '05-capitalization/share-issuances/0000-templates/_closing-agenda-template.md', name: 'Closing Agenda', category: 'capitalization' },
    { path: '05-capitalization/share-issuances/0000-templates/_share-certificate-template.md', name: 'Share Certificate', category: 'capitalization' },
    { path: '05-capitalization/share-issuances/0000-templates/_share-subscription-agreement-template.md', name: 'Share Subscription Agreement', category: 'capitalization' },
    
    // Finance
    { path: '07-finance-and-tax/banking/_open-bank-account-resolution-template.md', name: 'Open Bank Account Resolution', category: 'finance' },
    { path: '07-finance-and-tax/financial-statements/_financial-statement-approval-resolution-template.md', name: 'Financial Statement Approval', category: 'finance' },
    
    // Commercial & IP
    { path: '08-commercial-and-ip/hr/_employee-ip-and-confidentiality-template.md', name: 'Employee IP & Confidentiality', category: 'commercial' },
    { path: '08-commercial-and-ip/ip/assignments/_ip-assignment-template.md', name: 'IP Assignment', category: 'commercial' },
    { path: '08-commercial-and-ip/key-contracts/0000-templates/_msa-template.md', name: 'Master Service Agreement', category: 'commercial' },
    { path: '08-commercial-and-ip/key-contracts/0000-templates/_nda-template.md', name: 'Non-Disclosure Agreement', category: 'commercial' },
    
    // Meta
    { path: '99-meta/templates/_changelog-entry-template.md', name: 'Changelog Entry', category: 'meta' },
    { path: '99-meta/templates/_pull-request-description-template.md', name: 'PR Description', category: 'meta' },
  ];
  
  return templates;
}

function generateRegisterIndex() {
  const registers = [
    { path: '03-registers/directors-register.csv', name: 'Directors Register', schema: ['id', 'full_name', 'address', 'appointment_date', 'cessation_date', 'appointing_resolution'] },
    { path: '03-registers/officers-register.csv', name: 'Officers Register', schema: ['id', 'full_name', 'position', 'appointment_date', 'cessation_date', 'appointing_resolution'] },
    { path: '03-registers/shareholders-register.csv', name: 'Shareholders Register', schema: ['id', 'shareholder_name', 'address', 'share_class', 'number_of_shares', 'issue_date', 'certificate_number'] },
    { path: '03-registers/securities-register.csv', name: 'Securities Register', schema: ['id', 'security_type', 'holder_name', 'number_issued', 'issue_date', 'consideration', 'certificate_number', 'cancelled_date'] },
    { path: '03-registers/share-transfers-register.csv', name: 'Share Transfers Register', schema: ['id', 'transfer_date', 'from_shareholder', 'to_shareholder', 'share_class', 'number_of_shares', 'consideration', 'old_cert_number', 'new_cert_number'] },
    { path: '03-registers/debt-obligations-register.csv', name: 'Debt Obligations Register', schema: ['id', 'instrument_type', 'creditor_name', 'principal_amount', 'issue_date', 'maturity_date', 'interest_rate', 'status'] },
    { path: '05-capitalization/options-and-ESOP/option-grants-register.csv', name: 'Option Grants Register', schema: ['grant_id', 'employee_name', 'number_of_options', 'strike_price', 'grant_date', 'vesting_start', 'vesting_terms'] },
  ];
  
  return registers;
}

function generateWorkflowGraph() {
  const workflows = {
    'initial-setup': {
      name: 'Initial Corporation Setup',
      description: 'First-time setup after incorporation',
      steps: [
        { id: 'review-incorporation-docs', name: 'Review incorporation documents', description: 'Review PDFs/screenshots from federal and provincial registration' },
        { id: 'record-initial-director', name: 'Record initial director', description: 'Add incorporating director to directors register', dependsOn: ['review-incorporation-docs'] },
        { id: 'create-organizational-resolution', name: 'Create organizational resolution', description: 'Adopt bylaws, appoint officers, authorize shares', dependsOn: ['record-initial-director'] },
        { id: 'appoint-officers', name: 'Appoint officers', description: 'Update officers register with initial appointments', dependsOn: ['create-organizational-resolution'] },
        { id: 'issue-founder-shares', name: 'Issue founder shares', description: 'Issue initial shares to founders', dependsOn: ['create-organizational-resolution'] },
        { id: 'setup-banking', name: 'Set up banking', description: 'Create banking resolution and open accounts', dependsOn: ['appoint-officers'] },
      ]
    },
    'director-management': {
      name: 'Director Management',
      description: 'Adding or removing directors',
      steps: [
        { id: 'appoint-director', name: 'Appoint director', description: 'Create resolution and update directors register' },
        { id: 'remove-director', name: 'Remove/resign director', description: 'Record cessation and update register' },
        { id: 'file-director-change', name: 'File director change', description: 'Submit Form 6 to Corporations Canada', dependsOn: ['appoint-director', 'remove-director'] },
      ]
    },
    'officer-management': {
      name: 'Officer Management',
      description: 'Appointing or removing officers',
      steps: [
        { id: 'appoint-officer', name: 'Appoint officer', description: 'Create board resolution and update officers register' },
        { id: 'remove-officer', name: 'Remove/resign officer', description: 'Record cessation and update register' },
      ]
    },
    'share-transactions': {
      name: 'Share Transactions',
      description: 'Issuing or transferring shares',
      steps: [
        { id: 'issue-shares', name: 'Issue shares', description: 'Create resolution, subscription agreement, certificate' },
        { id: 'update-shareholders-register', name: 'Update shareholders register', description: 'Add new shareholder entry', dependsOn: ['issue-shares'] },
        { id: 'update-securities-register', name: 'Update securities register', description: 'Record security issuance', dependsOn: ['issue-shares'] },
        { id: 'transfer-shares', name: 'Transfer shares', description: 'Record share transfer between parties' },
      ]
    },
    'meetings': {
      name: 'Meetings',
      description: 'Board and shareholder meetings',
      steps: [
        { id: 'schedule-meeting', name: 'Schedule meeting', description: 'Determine date, send notices' },
        { id: 'prepare-agenda', name: 'Prepare agenda', description: 'Draft meeting agenda and materials' },
        { id: 'record-minutes', name: 'Record minutes', description: 'Document meeting proceedings' },
        { id: 'pass-resolutions', name: 'Pass resolutions', description: 'Create resolution documents', dependsOn: ['record-minutes'] },
      ]
    },
    'annual-compliance': {
      name: 'Annual Compliance',
      description: 'Yearly regulatory requirements',
      steps: [
        { id: 'file-annual-return-federal', name: 'File federal annual return', description: 'Submit to Corporations Canada within 60 days of anniversary' },
        { id: 'file-annual-return-provincial', name: 'File provincial annual return', description: 'Submit to Ontario within 60 days of anniversary' },
        { id: 'approve-financial-statements', name: 'Approve financial statements', description: 'Board resolution approving annual financials' },
        { id: 'hold-agm', name: 'Hold AGM', description: 'Annual general meeting of shareholders', dependsOn: ['approve-financial-statements'] },
        { id: 'file-tax-return', name: 'File corporate tax return', description: 'T2 return within 6 months of fiscal year end' },
      ]
    },
    'policy-updates': {
      name: 'Policy Updates',
      description: 'Updating governance policies',
      steps: [
        { id: 'update-bylaws', name: 'Update bylaws', description: 'Amend bylaws with shareholder approval' },
        { id: 'update-policy', name: 'Update policy', description: 'Amend corporate policy with board approval' },
      ]
    },
  };
  
  return workflows;
}

function generateSecretaryContext(corporation = null) {
  const context = {
    $schema: './secretary-context.schema.json',
    version: getVersion(),
    generatedAt: new Date().toISOString(),
    initialized: existsSync(join(ROOT, CONFIG.markerFile)),
    
    corporation: corporation || {
      name: null,
      federalNumber: null,
      provincialNumber: null,
      incorporationDate: null,
      fiscalYearEnd: null,
      registeredAddress: null,
      jurisdiction: {
        federal: 'Canada (CBCA)',
        provincial: 'Ontario',
      },
      shareStructure: {
        classes: ['Common'],
        unlimited: true,
      },
    },
    
    folders: generateFolderIndex(),
    templates: generateTemplateIndex(),
    registers: generateRegisterIndex(),
    workflows: generateWorkflowGraph(),
    
    entryPoints: {
      agents: 'AGENTS.md',
      context: 'secretary-context.json',
      guide: 'SECRETARY.md',
      workflows: 'WORKFLOWS.md',
      corporation: 'CORPORATION.md',
    },
    
    conventions: {
      templatePrefix: '_',
      resolutionFormat: 'RYYYY-NN-slug.md',
      meetingFolderFormat: 'YYYY-MM-DD-slug/',
      dateFormat: 'YYYY-MM-DD',
      branchPrefix: 'corp/',
    },
    
    compliance: {
      annualReturnDeadline: '60 days after incorporation anniversary',
      agmDeadline: 'Within 18 months of incorporation, then annually',
      taxReturnDeadline: '6 months after fiscal year end',
      directorChangeFilingDeadline: '15 days',
    },
  };
  
  return context;
}

// ============================================================================
// File Generators
// ============================================================================

function generateSecretaryReadme(corporation) {
  const corpName = corporation?.name || '[Corporation Name]';
  const corpNumber = corporation?.federalNumber || '[Federal Corporation Number]';
  
  return `# ${corpName} — Corporate Minute Book

This repository is the official minute book for **${corpName}** (Corporation No. ${corpNumber}).

## Quick Start for Secretary

**AI Agents**: Start with \`AGENTS.md\` for discovery, load \`secretary-context.json\` for structured context, then refer to \`SECRETARY.md\` for detailed instructions.

**Humans**: Start with \`SECRETARY.md\` for orientation, then use \`WORKFLOWS.md\` for specific tasks.

## Corporation Details

See \`CORPORATION.md\` for:
- Federal and provincial registration numbers
- Registered address
- Incorporation date
- Current directors and officers

## Key Entry Points

| File | Purpose |
|------|---------|
| \`AGENTS.md\` | AI agent discovery and instructions |
| \`secretary-context.json\` | Structured context for AI agents |
| \`SECRETARY.md\` | Detailed secretary guide |
| \`WORKFLOWS.md\` | Step-by-step task procedures |
| \`CORPORATION.md\` | Corporation-specific details |

## Repository Structure

\`\`\`
├── 01-formation/           # Incorporation documents
├── 02-constating-documents/ # Policies, shareholder agreements
├── 03-registers/           # Directors, officers, shareholders (CSV)
├── 04-meetings-and-resolutions/ # Board & shareholder minutes
├── 05-capitalization/      # Cap table, shares, options
├── 06-regulatory-filings/  # Government filings
├── 07-finance-and-tax/     # Financial governance
├── 08-commercial-and-ip/   # Contracts, IP
├── 09-binary-artifacts/    # Signed PDFs (Git LFS)
└── 99-meta/                # Process documentation
\`\`\`

## First Actions

If this is a newly incorporated corporation:

1. **Review incorporation documents** in \`09-binary-artifacts/01-formation/\`
2. **Record initial director** in \`03-registers/directors-register.csv\`
3. **Create organizational resolution** adopting bylaws and appointing officers
4. **Issue founder shares** per the organizational resolution

See \`WORKFLOWS.md#initial-setup\` for detailed steps.

---

*Template version: ${getVersion()}*
`;
}

function generateAgentsFile(corporation) {
  const corpName = corporation?.name || '[Corporation Name]';
  const corpNumber = corporation?.federalNumber || '[Corporation Number]';
  
  return `# AI Agent Instructions

> **You are the corporate secretary for ${corpName}.** This file provides instructions for AI agents operating in this repository.

## Quick Start

1. **Load context**: Parse \`secretary-context.json\` for complete repository structure
2. **Review details**: Read \`CORPORATION.md\` for entity-specific information
3. **Follow procedures**: Use \`WORKFLOWS.md\` for step-by-step task execution
4. **Reference guide**: Consult \`SECRETARY.md\` for operational guidelines

## Your Role

You are responsible for maintaining the corporation's digital minute book—the authoritative record of corporate governance. Your duties include:

- **Drafting documents**: Resolutions, meeting minutes, agreements
- **Maintaining registers**: Directors, officers, shareholders, securities
- **Tracking compliance**: Filing deadlines, annual returns, regulatory notices
- **Managing capitalization**: Share issuances, transfers, option grants

## Corporation Context

| Field | Value |
|-------|-------|
| **Legal Name** | ${corpName} |
| **Corporation Number** | ${corpNumber} |
| **Jurisdiction** | Canada (CBCA) / Ontario |

For complete details, see \`CORPORATION.md\`.

## Context Loading

### Primary Context File

\`secretary-context.json\` contains machine-readable data:

\`\`\`json
{
  "corporation": { /* Entity details */ },
  "folders": { /* Repository structure with descriptions */ },
  "templates": [ /* All templates with paths and categories */ ],
  "registers": [ /* CSV registers with schemas */ ],
  "workflows": { /* Task procedures with dependencies */ },
  "conventions": { /* Naming patterns, date formats */ },
  "compliance": { /* Key regulatory deadlines */ }
}
\`\`\`

### Workflow Execution Pattern

\`\`\`
1. Identify workflow in secretary-context.json
2. Find template(s) for the task
3. Copy template (remove _ prefix)
4. Fill placeholders with corporation data
5. Update affected registers (CSV files)
6. Create branch with corp/ prefix
7. Commit with [corp] prefix
\`\`\`

## File Conventions

| Pattern | Meaning |
|---------|---------|
| \`_filename.md\` | Template—copy, don't edit directly |
| \`*.csv\` | Register—authoritative corporate records |
| \`RYYYY-NN-*.md\` | Resolution (e.g., \`R2025-03-appoint-cfo.md\`) |
| \`YYYY-MM-DD-*/\` | Meeting folder |
| \`corp/*\` branch | Corporate action branch |

## Key Locations

| Need | Location |
|------|----------|
| Corporation details | \`CORPORATION.md\` |
| Task procedures | \`WORKFLOWS.md\` |
| Operational guide | \`SECRETARY.md\` |
| Directors list | \`03-registers/directors-register.csv\` |
| Officers list | \`03-registers/officers-register.csv\` |
| Shareholders | \`03-registers/shareholders-register.csv\` |
| Board resolutions | \`04-meetings-and-resolutions/board/\` |
| Share transactions | \`05-capitalization/share-issuances/\` |

## Common Tasks

### Record a Board Resolution

1. Copy \`04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md\`
2. Save as \`04-meetings-and-resolutions/board/YYYY/RYYYY-NN-slug.md\`
3. Fill placeholders from \`CORPORATION.md\`
4. Create branch \`corp/resolution-slug-YYYY-MM\`

### Add a Director

1. Create board resolution authorizing appointment
2. Update \`03-registers/directors-register.csv\`
3. Create branch \`corp/add-director-name-YYYY-MM\`
4. Note: File Form 6 with Corporations Canada within 15 days

### Issue Shares

1. Create board resolution authorizing issuance
2. Create subscription agreement from template
3. Create share certificate from template
4. Update \`03-registers/shareholders-register.csv\`
5. Update \`03-registers/securities-register.csv\`
6. Create branch \`corp/issuance-description-YYYY-MM\`

## Principles

1. **Traceability**: Every register change references an authorizing resolution
2. **Atomicity**: One corporate action per PR
3. **Accuracy**: Use exact values from \`CORPORATION.md\`
4. **Compliance**: Note filing deadlines when relevant
5. **Organization**: Follow naming conventions strictly

## Error Recovery

If you encounter issues:

- **Missing template**: Check \`secretary-context.json\` templates array
- **Unknown workflow**: Check \`WORKFLOWS.md\` for procedures
- **Register schema**: Check \`secretary-context.json\` registers array for column definitions
- **Corporation details**: Always reference \`CORPORATION.md\`

---

*For detailed operational guidance, see \`SECRETARY.md\`. For step-by-step procedures, see \`WORKFLOWS.md\`.*
`;
}

function generateCorporationFile(corporation) {
  return `# Corporation Details

## Identity

| Field | Value |
|-------|-------|
| **Legal Name** | ${corporation.name || '[To be filled]'} |
| **Federal Corporation Number** | ${corporation.federalNumber || '[To be filled]'} |
| **Ontario Corporation Number** | ${corporation.provincialNumber || '[To be filled]'} |
| **Incorporation Date** | ${corporation.incorporationDate || '[To be filled]'} |
| **Fiscal Year End** | ${corporation.fiscalYearEnd || '[To be filled]'} |

## Registered Office

\`\`\`
${corporation.registeredAddress || '[Address to be filled]'}
\`\`\`

## Jurisdiction

- **Federal**: Canada Business Corporations Act (CBCA)
- **Provincial Registration**: Ontario

## Share Structure

- **Share Classes**: ${corporation.shareStructure?.classes?.join(', ') || 'Common'}
- **Authorized**: ${corporation.shareStructure?.unlimited ? 'Unlimited' : '[Specify limit]'}

## Initial Director(s)

| Name | Address | Appointed |
|------|---------|-----------|
| ${corporation.initialDirector?.name || '[Name]'} | ${corporation.initialDirector?.address || '[Address]'} | ${corporation.incorporationDate || '[Date]'} |

## Key Documents Location

| Document | Location |
|----------|----------|
| Articles of Incorporation | \`09-binary-artifacts/01-formation/\` |
| Certificate of Incorporation | \`09-binary-artifacts/01-formation/\` |
| Ontario Registration | \`09-binary-artifacts/01-formation/\` |
| Bylaws | \`01-formation/bylaws/\` |

## Notes

${corporation.notes || '_No additional notes._'}

---

*Last updated: ${new Date().toISOString().split('T')[0]}*
`;
}

// ============================================================================
// Main Functions
// ============================================================================

async function interactiveSetup() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║        Corporate Minute Book — Initial Setup                  ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  // Check if already initialized
  if (existsSync(join(ROOT, CONFIG.markerFile))) {
    console.log('⚠️  This repository has already been initialized.');
    const proceed = await prompt('Do you want to reinitialize? This will reset corporation details. (yes/no): ');
    if (proceed.toLowerCase() !== 'yes') {
      console.log('Aborted.');
      process.exit(0);
    }
  }
  
  console.log('Please provide the corporation details from your incorporation documents.\n');
  console.log('(You can leave fields blank and fill them in CORPORATION.md later)\n');
  
  const corporation = {
    name: await prompt('Corporation Legal Name: '),
    federalNumber: await prompt('Federal Corporation Number (from Corporations Canada): '),
    provincialNumber: await prompt('Ontario Corporation Number (if registered): '),
    incorporationDate: await prompt('Incorporation Date (YYYY-MM-DD): '),
    fiscalYearEnd: await prompt('Fiscal Year End (e.g., December 31): '),
    registeredAddress: await prompt('Registered Office Address: '),
    jurisdiction: {
      federal: 'Canada (CBCA)',
      provincial: 'Ontario',
    },
    shareStructure: {
      classes: ['Common'],
      unlimited: true,
    },
    initialDirector: {
      name: await prompt('Initial Director Name: '),
      address: await prompt('Initial Director Address: '),
    },
    notes: '',
  };
  
  console.log('\n─────────────────────────────────────────────────────────────────');
  console.log('Setting up repository...\n');
  
  await performSetup(corporation);
}

async function validateState() {
  console.log('\n🔍 Validating repository state...\n');
  
  const issues = [];
  const context = readJSON(join(ROOT, CONFIG.contextFile));
  
  // Check if initialized
  const initialized = existsSync(join(ROOT, CONFIG.markerFile));
  console.log(`Initialized: ${initialized ? '✓' : '✗ (run npm run setup)'}`);
  
  // Check required files
  const requiredFiles = ['AGENTS.md', 'SECRETARY.md', 'WORKFLOWS.md', CONFIG.contextFile];
  for (const file of requiredFiles) {
    const exists = existsSync(join(ROOT, file));
    console.log(`${file}: ${exists ? '✓' : '✗'}`);
    if (!exists) issues.push(`Missing required file: ${file}`);
  }
  
  // Check registers
  if (context?.registers) {
    console.log('\nRegisters:');
    for (const reg of context.registers) {
      const exists = existsSync(join(ROOT, reg.path));
      console.log(`  ${reg.name}: ${exists ? '✓' : '✗'}`);
      if (!exists) issues.push(`Missing register: ${reg.path}`);
    }
  }
  
  // Check templates
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
  } else {
    console.log(`⚠️  Found ${issues.length} issue(s):\n`);
    for (const issue of issues) {
      console.log(`   • ${issue}`);
    }
    console.log('');
  }
}

async function regenerateContext() {
  console.log('\n🔄 Regenerating secretary-context.json...\n');
  
  // Try to preserve corporation data if it exists
  const existingContext = readJSON(join(ROOT, CONFIG.contextFile));
  const corporation = existingContext?.corporation || null;
  
  const context = generateSecretaryContext(corporation);
  writeJSON(join(ROOT, CONFIG.contextFile), context);
  
  console.log('✅ Context regenerated.\n');
}

// ============================================================================
// Non-Interactive Setup
// ============================================================================

async function configFileSetup(configPath) {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║        Corporate Minute Book — Config File Setup              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  // Check if already initialized
  if (existsSync(join(ROOT, CONFIG.markerFile))) {
    console.log('⚠️  This repository has already been initialized.');
    console.log('   Delete .initialized to reinitialize.\n');
    process.exit(1);
  }
  
  // Read config file
  const fullConfigPath = configPath.startsWith('/') ? configPath : join(ROOT, configPath);
  if (!existsSync(fullConfigPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    console.log('\nCreate a config file with this structure:');
    console.log(JSON.stringify({
      name: "Corporation Name Inc.",
      federalNumber: "1234567-8",
      provincialNumber: "ON-9876543",
      incorporationDate: "2025-01-15",
      fiscalYearEnd: "December 31",
      registeredAddress: "123 Main Street, City ON A1B 2C3",
      initialDirector: {
        name: "Director Name",
        address: "456 Oak Avenue, City ON D4E 5F6"
      }
    }, null, 2));
    process.exit(1);
  }
  
  let config;
  try {
    config = JSON.parse(readFileSync(fullConfigPath, 'utf-8'));
  } catch (e) {
    console.error(`❌ Invalid JSON in config file: ${e.message}`);
    process.exit(1);
  }
  
  // Validate required fields
  const requiredFields = ['name'];
  for (const field of requiredFields) {
    if (!config[field]) {
      console.error(`❌ Missing required field: ${field}`);
      process.exit(1);
    }
  }
  
  const corporation = {
    name: config.name || '',
    federalNumber: config.federalNumber || '',
    provincialNumber: config.provincialNumber || '',
    incorporationDate: config.incorporationDate || '',
    fiscalYearEnd: config.fiscalYearEnd || '',
    registeredAddress: config.registeredAddress || '',
    jurisdiction: {
      federal: 'Canada (CBCA)',
      provincial: 'Ontario',
    },
    shareStructure: config.shareStructure || {
      classes: ['Common'],
      unlimited: true,
    },
    initialDirector: config.initialDirector || {
      name: '',
      address: '',
    },
    notes: config.notes || '',
  };
  
  console.log(`Setting up repository for: ${corporation.name}\n`);
  
  // Run the same setup steps as interactive
  await performSetup(corporation);
}

async function performSetup(corporation) {
  // 1. Archive template-specific files
  console.log('📦 Archiving template files...');
  ensureDir(join(ROOT, CONFIG.archiveDir));
  for (const file of CONFIG.filesToArchive) {
    const srcPath = join(ROOT, file);
    if (existsSync(srcPath)) {
      const destPath = join(ROOT, CONFIG.archiveDir, file);
      ensureDir(dirname(destPath));
      renameSync(srcPath, destPath);
      console.log(`   Archived: ${file}`);
    }
  }
  
  // 2. Generate and write secretary-focused README
  console.log('📝 Generating secretary-focused README...');
  const readmePath = join(ROOT, 'README.md');
  const originalReadme = existsSync(readmePath) ? readFileSync(readmePath, 'utf-8') : '';
  
  // Archive original README
  writeFileSync(join(ROOT, CONFIG.archiveDir, 'README.template.md'), originalReadme);
  
  // Write new README
  writeFileSync(readmePath, generateSecretaryReadme(corporation));
  
  // 3. Generate CORPORATION.md
  console.log('📝 Generating CORPORATION.md...');
  writeFileSync(join(ROOT, CONFIG.corporationFile), generateCorporationFile(corporation));
  
  // 4. Generate AGENTS.md with corporation context
  console.log('🤖 Generating AGENTS.md...');
  writeFileSync(join(ROOT, 'AGENTS.md'), generateAgentsFile(corporation));
  
  // 5. Update directors register with initial director
  if (corporation.initialDirector?.name) {
    console.log('📊 Updating directors register...');
    const directorsPath = join(ROOT, '03-registers/directors-register.csv');
    const directorsHeader = 'id,full_name,address,appointment_date,cessation_date,appointing_resolution';
    const directorRow = `D001,"${corporation.initialDirector.name}","${corporation.initialDirector.address || ''}",${corporation.incorporationDate || ''},,`;
    writeFileSync(directorsPath, directorsHeader + '\n' + directorRow + '\n');
  }
  
  // 6. Create initialization marker (before context so initialized=true)
  console.log('✓  Creating initialization marker...');
  writeFileSync(join(ROOT, CONFIG.markerFile), JSON.stringify({
    initializedAt: new Date().toISOString(),
    templateVersion: getVersion(),
    corporationName: corporation.name,
  }, null, 2));
  
  // 7. Generate secretary context (after marker so initialized=true)
  console.log('🤖 Generating secretary-context.json...');
  const context = generateSecretaryContext(corporation);
  writeJSON(join(ROOT, CONFIG.contextFile), context);
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('  1. Add incorporation documents to 09-binary-artifacts/01-formation/');
  console.log('  2. Review and complete CORPORATION.md');
  console.log('  3. Create organizational resolution (see WORKFLOWS.md#initial-setup)');
  console.log('  4. Commit these changes: git add -A && git commit -m "[corp] Initialize minute book"');
  console.log('\nFor AI agents: AGENTS.md provides discovery instructions; secretary-context.json has structured context.');
  console.log('For humans: Start with SECRETARY.md for detailed guidance.\n');
}

// ============================================================================
// Entry Point
// ============================================================================

const args = process.argv.slice(2);

if (args.includes('--validate')) {
  validateState();
} else if (args.includes('--generate-context')) {
  regenerateContext();
} else if (args.includes('--config')) {
  const configIndex = args.indexOf('--config');
  const configPath = args[configIndex + 1];
  if (!configPath) {
    console.error('❌ --config requires a file path argument');
    process.exit(1);
  }
  configFileSetup(configPath);
} else if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Corporate Minute Book Setup

Usage:
  npm run setup                       Interactive setup wizard
  npm run setup -- --config FILE      Non-interactive setup with JSON config
  npm run setup -- --validate         Validate repository state
  npm run setup -- --generate-context Regenerate secretary-context.json

Options:
  --help, -h    Show this help message
  --validate    Check repository state without modifying
  --config FILE Use JSON config file for non-interactive setup
  --generate-context  Regenerate the AI context file

Config File Format:
  {
    "name": "Corporation Name Inc.",
    "federalNumber": "1234567-8",
    "provincialNumber": "ON-9876543",
    "incorporationDate": "2025-01-15",
    "fiscalYearEnd": "December 31",
    "registeredAddress": "123 Main Street, City ON A1B 2C3",
    "initialDirector": {
      "name": "Director Name",
      "address": "456 Oak Avenue, City ON D4E 5F6"
    }
  }
`);
} else {
  interactiveSetup();
}
