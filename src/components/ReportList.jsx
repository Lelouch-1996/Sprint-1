export default function ReportList({
  reports,
  selectedId,
  onSelect,
}) {
  return (
    <div className="card">
      <h2>Listado</h2>
      {reports.length === 0 ? (
        <p className="muted">Aún no hay reportes. Crea el primero.</p>
      ) : (
        <ul className="list">
          {reports.map((r) => (
            <li key={r.id}>
              <button
                className={"listItem " + (selectedId === r.id ? "active" : "")}
                onClick={() => onSelect(r.id)}
              >
                <div className="row">
                  <span className="pill">{r.type}</span>
                  <span className="status">{r.status}</span>
                </div>
                <div className="desc">{r.description}</div>
                <div className="meta">{r.location}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
