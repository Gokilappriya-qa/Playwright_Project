import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

interface ReporterOptions {
  outputFile?: string;
}

interface TestRecord {
  readonly suite: string;
  readonly title: string;
  readonly status: TestResult['status'];
  readonly duration: number;
  readonly error: string;
}

export default class ExtentHtmlReporter implements Reporter {
  private readonly records: TestRecord[] = [];
  private outputFile: string;

  constructor(options: ReporterOptions = {}) {
    this.outputFile = options.outputFile ?? 'reports/extent-report.html';
  }

  onBegin(config: FullConfig, _suite: Suite): void {
    this.outputFile = path.resolve(config.rootDir, this.outputFile);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const errors = result.errors
      .map(error => error.message ?? error.stack ?? 'Unknown error')
      .filter(Boolean)
      .join('\n');

    this.records.push({
      suite: test.titlePath().slice(0, -1).join(' › ') || 'Test',
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: errors,
    });
  }

  async onEnd(result: FullResult): Promise<void> {
    const passed = this.records.filter(record => record.status === 'passed').length;
    const skipped = this.records.filter(record => record.status === 'skipped').length;
    const failed = this.records.length - passed - skipped;
    const rows = this.records.map(record => this.renderRecord(record)).join('\n');
    const html = this.renderReport({ passed, failed, skipped, status: result.status, rows });

    await mkdir(path.dirname(this.outputFile), { recursive: true });
    await writeFile(this.outputFile, html, 'utf8');
    console.log(`Extent HTML report generated: ${this.outputFile}`);
  }

  private renderRecord(record: TestRecord): string {
    const statusClass = record.status.replace(/[^a-z]/gi, '').toLowerCase();
    const error = record.error
      ? `<details><summary>View error</summary><pre>${escapeHtml(record.error)}</pre></details>`
      : '—';

    return `<tr>
      <td><span class="status ${statusClass}">${escapeHtml(record.status)}</span></td>
      <td>${escapeHtml(record.suite)}</td>
      <td>${escapeHtml(record.title)}</td>
      <td>${formatDuration(record.duration)}</td>
      <td>${error}</td>
    </tr>`;
  }

  private renderReport(summary: { passed: number; failed: number; skipped: number; status: string; rows: string }): string {
    const total = this.records.length;
    const generatedAt = new Date().toISOString();
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ScriptedQA Extent Test Report</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; color: #202124; background: #f4f6f9; }
    body { margin: 0; padding: 32px; }
    header { background: #25364a; color: #fff; padding: 24px 28px; border-radius: 8px; }
    h1 { margin: 0 0 8px; font-size: 24px; }
    .meta { color: #d7e0eb; font-size: 13px; }
    .summary { display: grid; grid-template-columns: repeat(4, minmax(120px, 1fr)); gap: 14px; margin: 20px 0; }
    .metric { background: #fff; border-radius: 8px; padding: 18px; box-shadow: 0 1px 4px #0001; }
    .metric strong { display: block; font-size: 24px; margin-top: 6px; }
    .passed-value { color: #18864b; } .failed-value { color: #c62828; }
    .skipped-value { color: #8a6d1d; }
    .table-wrap { overflow-x: auto; background: #fff; border-radius: 8px; box-shadow: 0 1px 4px #0001; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 13px 15px; border-bottom: 1px solid #e8ebef; text-align: left; vertical-align: top; }
    th { background: #eef2f6; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
    .status { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .passed { color: #12663a; background: #e4f5eb; } .failed, .timedout, .interrupted { color: #9c1c1c; background: #fde8e8; }
    .skipped { color: #755c17; background: #fff4d6; }
    details summary { cursor: pointer; color: #a32121; }
    pre { max-width: 520px; white-space: pre-wrap; overflow-wrap: anywhere; color: #7d1717; }
    @media (max-width: 700px) { body { padding: 14px; } .summary { grid-template-columns: repeat(2, 1fr); } }
  </style>
</head>
<body>
  <header>
    <h1>ScriptedQA Extent Test Report</h1>
    <div class="meta">Run status: ${escapeHtml(summary.status)} · Generated: ${escapeHtml(generatedAt)}</div>
  </header>
  <section class="summary" aria-label="Test summary">
    <div class="metric">Total tests<strong>${total}</strong></div>
    <div class="metric">Passed<strong class="passed-value">${summary.passed}</strong></div>
    <div class="metric">Failed<strong class="failed-value">${summary.failed}</strong></div>
    <div class="metric">Skipped<strong class="skipped-value">${summary.skipped}</strong></div>
  </section>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Status</th><th>Suite</th><th>Test</th><th>Duration</th><th>Details</th></tr></thead>
      <tbody>${summary.rows || '<tr><td colspan="5">No tests were executed.</td></tr>'}</tbody>
    </table>
  </div>
</body>
</html>`;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function formatDuration(duration: number): string {
  return duration < 1000 ? `${duration} ms` : `${(duration / 1000).toFixed(2)} s`;
}
