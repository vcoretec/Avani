import { BarChart3, Download } from 'lucide-react';
export default function ReportsPage() {
  const reports = [
    { name: 'Procurement Report', desc: 'MT purchased, average rate, farmer analysis, quality deductions', icon: '📊' },
    { name: 'Transport Report', desc: 'Trips, utilization, delays, freight analysis', icon: '🚛' },
    { name: 'Warehouse Report', desc: 'Stock, capacity, aging, movement', icon: '🏭' },
    { name: 'Sales Report', desc: 'Orders, MT sold, revenue, customer outstanding', icon: '💰' },
    { name: 'Finance Report', desc: 'Payables, receivables, collections, settlements', icon: '🏦' },
    { name: 'Profitability', desc: 'Landed cost/MT, margin/MT, procurement vs sales', icon: '📈' },
    { name: 'Management MIS', desc: 'Exceptions, trends, stock position, profitability overview', icon: '🎯' },
  ];
  return (
    <div>
      <div className="page-header"><div><h1>Reports & Analytics</h1></div></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18 }}>
        {reports.map(r => (
          <div className="card" key={r.name} style={{cursor:'pointer'}}>
            <div className="card-body" style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{fontSize:'2rem'}}>{r.icon}</div>
              <div>
                <h3 style={{fontWeight:600,fontSize:'1rem',marginBottom:4}}>{r.name}</h3>
                <p style={{fontSize:'0.85rem',color:'var(--gray-500)'}}>{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
