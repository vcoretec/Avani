import { Plus, Download } from 'lucide-react';
export default function SalesPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Sales</span></div>
          <h1>Sales</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm"><Download size={14} /> Export</button>
          <button className="btn btn-primary"><Plus size={16} /> New Sales Order</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card teal"><div className="kpi-label">New Orders</div><div className="kpi-value">8</div></div>
        <div className="kpi-card green"><div className="kpi-label">Approved</div><div className="kpi-value">12</div></div>
        <div className="kpi-card blue"><div className="kpi-label">Dispatched</div><div className="kpi-value">5</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Delivered</div><div className="kpi-value">3</div></div>
      </div>
      <div className="card">
        <div className="filter-bar"><input type="text" className="search-input" placeholder="Search sales orders..." /></div>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>SO Number</th><th>Customer</th><th>Product</th><th>Qty</th><th>Amount</th><th>Delivery</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td><strong>SO-2026-001</strong></td><td>Sri Lakshmi Traders</td><td>Rice - Raw</td><td>50 MT</td><td>₹17,50,000</td><td>25 Aug 2026</td><td><span className="badge badge-success">Approved</span></td><td><button className="btn btn-ghost btn-sm">View</button></td></tr>
              <tr><td><strong>SO-2026-002</strong></td><td>Sai Enterprises</td><td>Paddy</td><td>30 MT</td><td>₹6,90,000</td><td>26 Aug 2026</td><td><span className="badge badge-warning">Pending</span></td><td><button className="btn btn-ghost btn-sm">View</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
