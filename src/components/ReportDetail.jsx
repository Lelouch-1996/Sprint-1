function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-MX");
  } catch {
    return iso;
  }
}

export default function ReportDetail({ report, onClose }) {
  if (!report) {
    return (
      <div className="card">
        <h2>Detalle</h2>
        <p className="muted">Selecciona un reporte para ver el detalle.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row space">
        <h2>Detalle</h2>
        <button className="ghost" onClick={onClose}>Cerrar</button>
      </div>

      <div className="kv">
        <div><span className="k">ID:</span> <span className="v mono">{report.id}</span></div>
        <div><span className="k">Tipo:</span> <span className="v">{report.type}</span></div>
        <div><span className="k">Estado:</span> <span className="v">{report.status}</span></div>
        <div><span className="k">Fecha:</span> <span className="v">{formatDate(report.createdAt)}</span></div>
        <div><span className="k">Ubicación:</span> <span className="v">{report.location}</span></div>
      </div>

      <h3>Descripción</h3>
      <p className="descBlock">{report.description}</p>
    </div>
  );
}
