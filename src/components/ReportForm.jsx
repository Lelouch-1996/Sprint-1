import { useMemo, useState } from "react";

const TYPES = ["Bache", "Luminaria", "Basura", "Fuga de agua", "Otro"];

export default function ReportForm({ onCreate }) {
  const [type, setType] = useState("Bache");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return description.trim().length > 0 && location.trim().length > 0 && type.trim().length > 0;
  }, [type, description, location]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    const report = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      type: type.trim(),
      description: description.trim(),
      location: location.trim(),
      status: "Pendiente",
      createdAt: new Date().toISOString(),
    };

    onCreate(report);
    setDescription("");
    setLocation("");
  }

  return (
    <div className="card">
      <h2>Crear reporte</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tipo/Categoría *
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Descripción *
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej. Bache grande frente a la tienda..."
            rows={3}
          />
        </label>

        <label>
          Ubicación *
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej. Calle Ejemplo 123"
          />
        </label>

        {error ? <p className="error">{error}</p> : null}

        <button type="submit" disabled={!canSubmit}>Guardar</button>
        <p className="hint">* Campos obligatorios</p>
      </form>
    </div>
  );
}
