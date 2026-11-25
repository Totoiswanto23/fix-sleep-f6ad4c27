// Fix Human Sleep: Funniest Patch Note — make.fun bounty
// Writes one line of patch notes announcing that human sleep has
// been fixed. The bug: sleep ended before it started. The fix:
// humans now wake up rested. The honest footnote: Mondays remain
// a known issue — some bugs are out of scope even for a patch.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Changelog voice, terse and confident, with the joke in the last
// words: the fix works, but Mondays are still broken — the most
// dreaded part of the week is quietly declared out of scope.
const MESSAGE =
  "Fixed a bug where sleep ended before it started. Humans now wake up rested; Mondays remain a known issue.";

if (MESSAGE.includes('\n') || MESSAGE.includes('\r')) {
  console.error('entry must be a single line');
  process.exit(1);
}
if (MESSAGE !== MESSAGE.trim()) {
  console.error('entry must not start or end with whitespace');
  process.exit(1);
}
if (MESSAGE.length < 1 || MESSAGE.length > 160) {
  console.error(`entry must be 1-160 characters, got ${MESSAGE.length}`);
  process.exit(1);
}
if (MESSAGE.trim().length === 0) {
  console.error('entry must not be only whitespace');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), MESSAGE);
console.log(`wrote ${MESSAGE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
console.log(MESSAGE);
