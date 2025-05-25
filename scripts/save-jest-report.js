import { renameSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

function getReadableTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;
}

const reportsDir = path.resolve('./reports');
const reportFile = path.join(reportsDir, 'jest-report.html');

if (!existsSync(reportsDir)) {
  mkdirSync(reportsDir, { recursive: true });
}

if (existsSync(reportFile)) {
  const timestamp = getReadableTimestamp();
  const newReportFile = path.join(reportsDir, `jest-report-${timestamp}.html`);
  renameSync(reportFile, newReportFile);
  console.log(`Saved Jest report as ${newReportFile}`);
} else {
  console.log('No jest report found to rename.');
}
