import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './stores/AuthContext';
import AppLayout from './components/layout/AppLayout';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/home/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const ProcurementPage = lazy(() => import('./pages/procurement/ProcurementPage'));
const TransportPage = lazy(() => import('./pages/transport/TransportPage'));
const WarehousePage = lazy(() => import('./pages/warehouse/WarehousePage'));
const InventoryPage = lazy(() => import('./pages/inventory/InventoryPage'));
const SalesPage = lazy(() => import('./pages/sales/SalesPage'));
const FinancePage = lazy(() => import('./pages/finance/FinancePage'));
const ReportsPage = lazy(() => import('./pages/reports/ReportsPage'));

function PageLoader() {
  return (
    <div className="page-loading">
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/procurement" element={<ProcurementPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/warehouse" element={<WarehousePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
