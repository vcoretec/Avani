export default function FinancePage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><a href="/dashboard">Home</a> <span>/</span> <span>Finance</span></div>
          <h1>Finance</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">Receive Payment</button>
          <button className="btn btn-secondary">Make Payment</button>
          <button className="btn btn-secondary">Reconcile</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card green"><div className="kpi-label">Receivable</div><div className="kpi-value">₹45.2L</div></div>
        <div className="kpi-card red"><div className="kpi-label">Payable</div><div className="kpi-value">₹28.5L</div></div>
        <div className="kpi-card teal"><div className="kpi-label">Today's Txns</div><div className="kpi-value">18</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Reconciliation Queue</div><div className="kpi-value">7</div></div>
      </div>
      <div className="card"><div className="card-header"><h2>Recent Transactions</h2></div>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Ref</th><th>Type</th><th>Party</th><th>Amount</th><th>Mode</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>PAY-001</td><td>Farmer Payment</td><td>Lakshmi FPO</td><td>₹11,00,000</td><td>NEFT</td><td>24 Aug 2026</td><td><span className="badge badge-success">Completed</span></td></tr>
              <tr><td>COL-001</td><td>Collection</td><td>Sri Lakshmi Traders</td><td>₹17,50,000</td><td>RTGS</td><td>24 Aug 2026</td><td><span className="badge badge-warning">Pending</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
