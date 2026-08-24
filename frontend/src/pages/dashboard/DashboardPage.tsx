import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../stores/AuthContext';
import { dashboardApi } from '../../api';
import type { DashboardKpis } from '../../types';
import {
  ShoppingCart, Package, DollarSign, Truck,
  Plus, ArrowRight, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [kpis, setKpis] = useState<DashboardKpis>({
    procurementMt: 125, inventoryMt: 4850, salesAmount: 2450000,
    activeTrips: 42, pendingApprovals: 8, todayReceipts: 12,
    overduePayments: 3, lowStockAlerts: 2,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadKpis();
  }, []);

  const loadKpis = async () => {
    setLoading(true);
    try {
      const res = await dashboardApi.getKpis();
      if (res.data?.data) setKpis(res.data.data);
    } catch {
      // Use fallback data on error
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span></div>
          <h1>Dashboard</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/procurement/new')}>
            <Plus size={16} /> New Purchase
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/transport/new')}>
            <Truck size={16} /> Transport
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/warehouse/receipt')}>
            <Package size={16} /> Goods Receipt
          </button>
        </div>
      </div>

      {/* KPI Cards — Today at a glance */}
      <div className="dashboard-section-label">Today at a Glance</div>
      <div className="kpi-grid">
        <div className="kpi-card teal" onClick={() => navigate('/procurement')}>
          <div className="kpi-icon-wrapper teal-bg"><ShoppingCart size={22} /></div>
          <div className="kpi-label">Procurement</div>
          <div className="kpi-value">{kpis.procurementMt} <span className="kpi-unit">MT</span></div>
          <div className="kpi-sub">Today's purchases</div>
        </div>
        <div className="kpi-card blue" onClick={() => navigate('/inventory')}>
          <div className="kpi-icon-wrapper blue-bg"><Package size={22} /></div>
          <div className="kpi-label">Inventory</div>
          <div className="kpi-value">{kpis.inventoryMt.toLocaleString()} <span className="kpi-unit">MT</span></div>
          <div className="kpi-sub">Current stock</div>
        </div>
        <div className="kpi-card green" onClick={() => navigate('/sales')}>
          <div className="kpi-icon-wrapper green-bg"><DollarSign size={22} /></div>
          <div className="kpi-label">Sales</div>
          <div className="kpi-value">{formatAmount(kpis.salesAmount)}</div>
          <div className="kpi-sub">Today's revenue</div>
        </div>
        <div className="kpi-card amber" onClick={() => navigate('/transport')}>
          <div className="kpi-icon-wrapper amber-bg"><Truck size={22} /></div>
          <div className="kpi-label">Trips</div>
          <div className="kpi-value">{kpis.activeTrips}</div>
          <div className="kpi-sub">Active trips</div>
        </div>
      </div>

      {/* Operational Summary */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Operational Summary</h2>
            <button className="btn btn-ghost btn-sm">View All <ArrowRight size={14} /></button>
          </div>
          <div className="card-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Volume</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Procurement</strong></td>
                  <td>{kpis.procurementMt} MT</td>
                  <td><span className="badge badge-success"><CheckCircle size={12} /> On Track</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/procurement')}>View</button></td>
                </tr>
                <tr>
                  <td><strong>Inbound</strong></td>
                  <td>{kpis.activeTrips} Trips</td>
                  <td><span className="badge badge-warning"><Clock size={12} /> In Progress</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/transport')}>View</button></td>
                </tr>
                <tr>
                  <td><strong>Warehouse</strong></td>
                  <td>{kpis.todayReceipts} Receipts</td>
                  <td><span className="badge badge-success"><CheckCircle size={12} /> Normal</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/warehouse')}>View</button></td>
                </tr>
                <tr>
                  <td><strong>Sales</strong></td>
                  <td>{formatAmount(kpis.salesAmount)}</td>
                  <td><span className="badge badge-success"><CheckCircle size={12} /> On Track</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/sales')}>View</button></td>
                </tr>
                <tr>
                  <td><strong>Finance</strong></td>
                  <td>{kpis.overduePayments} Overdue</td>
                  <td>{kpis.overduePayments > 0
                    ? <span className="badge badge-danger"><AlertTriangle size={12} /> Attention</span>
                    : <span className="badge badge-success"><CheckCircle size={12} /> Clear</span>
                  }</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/finance')}>View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="card-header">
            <h2>Alerts & Exceptions</h2>
          </div>
          <div className="card-body">
            <div className="alert-list">
              {kpis.pendingApprovals > 0 && (
                <div className="alert-item warning">
                  <Clock size={18} />
                  <div>
                    <strong>{kpis.pendingApprovals} Pending Approvals</strong>
                    <p>Purchase orders awaiting approval</p>
                  </div>
                </div>
              )}
              {kpis.lowStockAlerts > 0 && (
                <div className="alert-item danger">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>{kpis.lowStockAlerts} Low Stock Alerts</strong>
                    <p>Items below minimum stock level</p>
                  </div>
                </div>
              )}
              {kpis.overduePayments > 0 && (
                <div className="alert-item danger">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>{kpis.overduePayments} Overdue Payments</strong>
                    <p>Customer payments past due date</p>
                  </div>
                </div>
              )}
              {kpis.pendingApprovals === 0 && kpis.lowStockAlerts === 0 && kpis.overduePayments === 0 && (
                <div className="alert-item success">
                  <CheckCircle size={18} />
                  <div><strong>All Clear</strong><p>No pending alerts</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
