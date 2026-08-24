import { Plus, Download, MapPin } from 'lucide-react';
export default function TransportPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Transport</span></div>
          <h1>Transport</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm"><MapPin size={14} /> View Map</button>
          <button className="btn btn-primary"><Plus size={16} /> New Trip</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card teal"><div className="kpi-label">Assigned</div><div className="kpi-value">12</div></div>
        <div className="kpi-card blue"><div className="kpi-label">In Transit</div><div className="kpi-value">18</div></div>
        <div className="kpi-card green"><div className="kpi-label">Delivered</div><div className="kpi-value">8</div></div>
        <div className="kpi-card red"><div className="kpi-label">Delayed</div><div className="kpi-value">4</div></div>
      </div>
      <div className="card">
        <div className="filter-bar">
          <input type="text" className="search-input" placeholder="Search trips..." />
          <select className="form-select" style={{width:'auto',minWidth:140}}>
            <option value="">All Status</option>
            <option>Assigned</option><option>In Transit</option><option>Delivered</option>
          </select>
          <select className="form-select" style={{width:'auto',minWidth:140}}>
            <option value="">All Directions</option>
            <option>Inbound</option><option>Outbound</option>
          </select>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Trip #</th><th>Direction</th><th>Vehicle</th><th>Driver</th><th>Route</th><th>Qty</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td><strong>TRP-001</strong></td><td><span className="badge badge-info">Inbound</span></td><td>TS09UA1234</td><td>Ramesh</td><td>Warangal → WH-001</td><td>16 MT</td><td><span className="badge badge-teal">In Transit</span></td><td><button className="btn btn-ghost btn-sm">Track</button></td></tr>
              <tr><td><strong>TRP-002</strong></td><td><span className="badge badge-neutral">Outbound</span></td><td>AP31TC5678</td><td>Sunil</td><td>WH-001 → Chennai</td><td>10 MT</td><td><span className="badge badge-warning">Loading</span></td><td><button className="btn btn-ghost btn-sm">Track</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
