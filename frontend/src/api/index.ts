import apiClient from './client';
import type { LoginRequest } from '../types';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post('/auth/login', data),
  refresh: (refreshToken: string) => apiClient.post('/auth/refresh', { refreshToken }),
};

export const dashboardApi = {
  getKpis: () => apiClient.get('/dashboard/kpis'),
  getOperationalSummary: () => apiClient.get('/dashboard/operational-summary'),
};

export const farmerApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/farmers', { params }),
  getById: (id: number) => apiClient.get(`/farmers/${id}`),
  create: (data: unknown) => apiClient.post('/farmers', data),
  update: (id: number, data: unknown) => apiClient.put(`/farmers/${id}`, data),
};

export const procurementApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/purchase-orders', { params }),
  getById: (id: number) => apiClient.get(`/purchase-orders/${id}`),
  create: (data: unknown) => apiClient.post('/purchase-orders', data),
  update: (id: number, data: unknown) => apiClient.put(`/purchase-orders/${id}`, data),
  approve: (id: number, data: unknown) => apiClient.post(`/purchase-orders/${id}/approve`, data),
  reject: (id: number, data: unknown) => apiClient.post(`/purchase-orders/${id}/reject`, data),
  getDashboard: () => apiClient.get('/purchase-orders/dashboard'),
};

export const transportApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/trips', { params }),
  getById: (id: number) => apiClient.get(`/trips/${id}`),
  create: (data: unknown) => apiClient.post('/trips', data),
  updateStatus: (id: number, status: string) => apiClient.post(`/trips/${id}/${status}`),
  getTracking: (id: number) => apiClient.get(`/trips/${id}/tracking`),
  getDashboard: () => apiClient.get('/trips/dashboard'),
  getDriverTrips: () => apiClient.get('/trips/driver'),
};

export const warehouseApi = {
  getAll: () => apiClient.get('/warehouses'),
  createGateEntry: (data: unknown) => apiClient.post('/gate-entries', data),
  createWeighment: (data: unknown) => apiClient.post('/weighments', data),
  createReceipt: (data: unknown) => apiClient.post('/warehouse-receipts', data),
  getDashboard: () => apiClient.get('/warehouses/dashboard'),
};

export const qualityApi = {
  getParameters: (productId: number) => apiClient.get(`/quality/parameters/${productId}`),
  createInspection: (data: unknown) => apiClient.post('/quality/inspections', data),
  getInspection: (id: number) => apiClient.get(`/quality/inspections/${id}`),
};

export const inventoryApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/inventory', { params }),
  getTransactions: (params?: Record<string, unknown>) => apiClient.get('/inventory/transactions', { params }),
  createTransfer: (data: unknown) => apiClient.post('/inventory/transfers', data),
  createAdjustment: (data: unknown) => apiClient.post('/inventory/adjustments', data),
  getDashboard: () => apiClient.get('/inventory/dashboard'),
};

export const customerApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/customers', { params }),
  getById: (id: number) => apiClient.get(`/customers/${id}`),
  create: (data: unknown) => apiClient.post('/customers', data),
  update: (id: number, data: unknown) => apiClient.put(`/customers/${id}`, data),
};

export const salesApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/sales-orders', { params }),
  getById: (id: number) => apiClient.get(`/sales-orders/${id}`),
  create: (data: unknown) => apiClient.post('/sales-orders', data),
  approve: (id: number, data: unknown) => apiClient.post(`/sales-orders/${id}/approve`, data),
  dispatch: (data: unknown) => apiClient.post('/dispatches', data),
  getDashboard: () => apiClient.get('/sales-orders/dashboard'),
};

export const financeApi = {
  getPayments: (params?: Record<string, unknown>) => apiClient.get('/payments', { params }),
  createPayment: (data: unknown) => apiClient.post('/payments', data),
  getCollections: (params?: Record<string, unknown>) => apiClient.get('/collections', { params }),
  createCollection: (data: unknown) => apiClient.post('/collections', data),
  getReconciliation: (params?: Record<string, unknown>) => apiClient.get('/reconciliation', { params }),
  getDashboard: () => apiClient.get('/finance/dashboard'),
};

export const reportsApi = {
  get: (name: string, params?: Record<string, unknown>) => apiClient.get(`/reports/${name}`, { params }),
  exportReport: (name: string, params?: Record<string, unknown>) => apiClient.get(`/reports/${name}/export`, { params, responseType: 'blob' }),
};

export const notificationApi = {
  getAll: () => apiClient.get('/notifications'),
  markRead: (id: number) => apiClient.put(`/notifications/${id}/read`),
};

export const userApi = {
  getAll: (params?: Record<string, unknown>) => apiClient.get('/users', { params }),
  create: (data: unknown) => apiClient.post('/users', data),
  update: (id: number, data: unknown) => apiClient.put(`/users/${id}`, data),
  getRoles: () => apiClient.get('/roles'),
};
