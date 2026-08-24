import { Plus } from 'lucide-react';
export default function WarehousePage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Warehouse</span></div>
          <h1>Warehouse</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary"><Plus size={16} /> Gate Entry</button>
          <button className="btn btn-secondary">Weighment</button>
          <button className="btn btn-secondary">Receipt</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card teal"><div className="kpi-label">Today Arrivals</div><div className="kpi-value">6</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Pending</div><div className="kpi-value">3</div></div>
        <div className="kpi-card green"><div className="kpi-label">Received</div><div className="kpi-value">95 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card blue"><div className="kpi-label">Capacity Used</div><div className="kpi-value">72<span className="kpi-unit">%</span></div></div>
      </div>
      <div className="card"><div className="card-header"><h2>Recent Receiving Activity</h2></div>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Entry #</th><th>Vehicle</th><th>Farmer</th><th>PO</th><th>Qty</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td><strong>GE-001</strong></td><td>TS09UA1234</td><td>Lakshmi FPO</td><td>PO-2026-001</td><td>16 MT</td><td><span className="badge badge-warning">Awaiting Weighment</span></td><td><button className="btn btn-ghost btn-sm">Process</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
