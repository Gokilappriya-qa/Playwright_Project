import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(path.join(__dirname, 'package.json'));
const playwrightCli = require.resolve('@playwright/test/cli');
const inputArgs = process.argv.slice(2);
const suiteIndex = inputArgs.indexOf('--suite');
const tagsIndex = inputArgs.indexOf('--tags');
const suite = suiteIndex >= 0 ? inputArgs[suiteIndex + 1] : undefined;
const tags = tagsIndex >= 0 ? inputArgs[tagsIndex + 1] : undefined;

if (suiteIndex >= 0 && suite !== 'cart') {
  throw new Error(`Unsupported test suite: ${suite ?? '(missing)'}`);
}

if (tagsIndex >= 0 && (!tags || tags.startsWith('--'))) {
  throw new Error('Provide a tag after --tags (for example: --tags @sanity).');
}

const playwrightArgs = ['test', '--config', 'playwright.config.ts', '--project=chrome'];
if (suite === 'cart') {
  playwrightArgs.push('tests/components/cartflow.spec.ts');
}
if (tags) {
  playwrightArgs.push('--grep', tags);
}

const result = spawnSync(process.execPath, [playwrightCli, ...playwrightArgs], {
  cwd: __dirname,
  env: process.env,
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;
