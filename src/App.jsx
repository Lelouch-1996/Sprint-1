import { useEffect, useMemo, useState } from "react";
import ReportForm from "./components/ReportForm.jsx";
import ReportList from "./components/ReportList.jsx";
import ReportDetail from "./components/ReportDetail.jsx";
import { addReport, loadReports, saveReports } from "./lib/storage.js";

function seedIfEmpty() {
  const existing = loadReports();
  if (existing.length === 0) {
    const demo = [
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
        type: "Bache",
        description: "Bache grande frente a la tienda",
        location: "Calle Ejemplo 123",
        status: "Pendiente",
        createdAt: new Date().toISOString(),
      },
    ];
    saveReports(demo);
    return demo;
  }
  return existing;
}

export default function App() {
  const [reports, setReports] = useState([]);
  const [view, setView] = useState("create"); 
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setReports(seedIfEmpty());
  }, []);

  function handleCreate(report) {
    const next = addReport(report);
    setReports(next);
    setView("list");
    setSelectedId(report.id);
  }

  const selected = useMemo(() => {
    return reports.find((r) => r.id === selectedId) || null;
  }, [reports, selectedId]);

  return (
    <div className="container">
      <header className="header">
        <h1>Reportes (MVP)</h1>
        <nav className="nav">
          <button className={view === "create" ? "active" : ""} onClick={() => setView("create")}>
            Crear
          </button>
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
            Lista
          </button>
        </nav>
      </header>

      <main className="grid">
        <section>
          {view === "create" ? (
            <ReportForm onCreate={handleCreate} />
          ) : (
            <ReportList reports={reports} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </section>
        <section>
          {view === "list" ? (
            <ReportDetail report={selected} onClose={() => setSelectedId(null)} />
          ) : null}
        </section>
      </main>
    </div>
  );
}
