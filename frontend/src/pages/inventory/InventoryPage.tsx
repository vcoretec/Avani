import { Download } from 'lucide-react';
export default function InventoryPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Inventory</span></div>
          <h1>Inventory</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary">Stock Transfer</button>
          <button className="btn btn-secondary">Adjustment</button>
          <button className="btn btn-outline btn-sm"><Download size={14} /> Export</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card teal"><div className="kpi-label">Total Stock</div><div className="kpi-value">4,850 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card amber"><div className="kpi-label">Reserved</div><div className="kpi-value">320 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card green"><div className="kpi-label">Available</div><div className="kpi-value">4,530 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card blue"><div className="kpi-label">Batches</div><div className="kpi-value">145</div></div>
      </div>
      <div className="card">
        <div className="filter-bar">
          <input type="text" className="search-input" placeholder="Search inventory..." />
          <select className="form-select" style={{width:'auto'}}><option value="">All Warehouses</option><option>WH-001</option><option>WH-002</option></select>
          <select className="form-select" style={{width:'auto'}}><option value="">All Products</option><option>Paddy</option><option>Rice - Raw</option></select>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Warehouse</th><th>Product</th><th>Grade</th><th>Total (MT)</th><th>Reserved</th><th>Available</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>Main Warehouse</td><td>Paddy</td><td>Grade A</td><td>2,100</td><td>200</td><td>1,900</td><td><button className="btn btn-ghost btn-sm">View</button></td></tr>
              <tr><td>Main Warehouse</td><td>Rice - Raw</td><td>Grade A</td><td>1,500</td><td>120</td><td>1,380</td><td><button className="btn btn-ghost btn-sm">View</button></td></tr>
              <tr><td>North Warehouse</td><td>Paddy</td><td>Grade B</td><td>1,250</td><td>0</td><td>1,250</td><td><button className="btn btn-ghost btn-sm">View</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
