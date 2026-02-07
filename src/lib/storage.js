const STORAGE_KEY = "rv_reports_v1";

export function loadReports() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function addReport(report) {
  const existing = loadReports();
  const next = [report, ...existing];
  saveReports(next);
  return next;
}
