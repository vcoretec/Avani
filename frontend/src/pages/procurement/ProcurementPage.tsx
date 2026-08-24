import { ShoppingCart, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProcurementPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Procurement</span></div>
          <h1>Procurement</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm"><Download size={14} /> Export</button>
          <button className="btn btn-primary"><Plus size={16} /> New Purchase Order</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card teal"><div className="kpi-label">Planned</div><div className="kpi-value">250 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card green"><div className="kpi-label">Received</div><div className="kpi-value">180 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card amber"><div className="kpi-label">Pending</div><div className="kpi-value">70 <span className="kpi-unit">MT</span></div></div>
        <div className="kpi-card blue"><div className="kpi-label">Orders</div><div className="kpi-value">15</div></div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <input type="text" className="search-input" placeholder="Search orders..." />
          <select className="form-select" style={{width:'auto',minWidth:140}}>
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>PO Number</th><th>Farmer/FPO</th><th>Product</th><th>Qty (MT)</th><th>Rate</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PO-2026-001</strong></td><td>Lakshmi FPO</td><td>Paddy</td><td>50</td><td>₹22,000</td><td>₹11,00,000</td><td>24 Aug 2026</td>
                <td><span className="badge badge-warning">Pending Approval</span></td>
                <td><button className="btn btn-ghost btn-sm">View</button></td>
              </tr>
              <tr>
                <td><strong>PO-2026-002</strong></td><td>Venkatesh Farms</td><td>Paddy</td><td>30</td><td>₹21,500</td><td>₹6,45,000</td><td>23 Aug 2026</td>
                <td><span className="badge badge-success">Approved</span></td>
                <td><button className="btn btn-ghost btn-sm">View</button></td>
              </tr>
              <tr>
                <td><strong>PO-2026-003</strong></td><td>Green Valley FPO</td><td>Rice - Raw</td><td>100</td><td>₹35,000</td><td>₹35,00,000</td><td>22 Aug 2026</td>
                <td><span className="badge badge-teal">In Progress</span></td>
                <td><button className="btn btn-ghost btn-sm">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-info">Showing 1-3 of 15 orders</div>
          <div className="pagination-buttons">
            <button className="pagination-btn" disabled>Prev</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
