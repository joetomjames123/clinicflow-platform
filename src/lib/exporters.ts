// Lightweight client-side CSV export helpers
export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Array.from(
    rows.reduce((s, r) => { Object.keys(r).forEach(k => s.add(k)); return s; }, new Set<string>())
  );
  const esc = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map(r => headers.map(h => esc(r[h])).join(","))].join("\n");
}

export function downloadFile(filename: string, content: string, mime = "text/csv;charset=utf-8;") {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  downloadFile(filename, toCSV(rows));
}

export function printDocument(html: string, title = "ClinicFlow") {
  if (typeof window === "undefined") return;
  const w = window.open("", "_blank", "width=800,height=900");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>${title}</title>
    <style>
      body{font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;padding:32px;color:#0f172a}
      h1,h2,h3{margin:0 0 8px}
      table{width:100%;border-collapse:collapse;margin-top:12px}
      td,th{padding:8px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:14px}
      .muted{color:#64748b;font-size:12px}
      .row{display:flex;justify-content:space-between;margin:4px 0}
      .card{border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-top:12px}
      .total{font-weight:700;font-size:18px;border-top:2px solid #0f172a;padding-top:8px;margin-top:8px}
    </style></head><body>${html}
    <script>window.onload=()=>{window.print()}</script>
    </body></html>`);
  w.document.close();
}
