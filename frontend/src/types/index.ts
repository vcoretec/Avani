export interface User {
  username: string;
  fullName: string;
  role: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  pagination?: PageInfo;
  timestamp: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Procurement
export interface Farmer {
  id: number;
  farmerCode: string;
  name: string;
  type: 'FARMER' | 'FPO';
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  gstNumber: string;
  status: string;
  createdAt: string;
}

export interface PurchaseOrder {
  id: number;
  poNumber: string;
  farmerId: number;
  farmerName?: string;
  productId: number;
  productName?: string;
  gradeId: number;
  gradeName?: string;
  warehouseId: number;
  quantity: number;
  rate: number;
  totalAmount: number;
  pickupDate: string;
  status: string;
  receivedQuantity: number;
  pendingQuantity: number;
  createdAt: string;
}

// Transport
export interface Trip {
  id: number;
  tripNumber: string;
  direction: 'INBOUND' | 'OUTBOUND';
  vehicleNumber?: string;
  driverName?: string;
  originName: string;
  destinationName: string;
  plannedQuantity: number;
  actualQuantity: number;
  status: string;
  assignedAt: string;
  freightAmount: number;
}

// Warehouse
export interface Warehouse {
  id: number;
  warehouseCode: string;
  name: string;
  city: string;
  capacityMt: number;
  status: string;
}

export interface Weighment {
  id: number;
  weighmentNumber: string;
  vehicleNumber?: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  weighmentDate: string;
}

// Inventory
export interface InventoryItem {
  id: number;
  warehouseName: string;
  productName: string;
  gradeName: string;
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

// Sales
export interface Customer {
  id: number;
  customerCode: string;
  name: string;
  contactPerson: string;
  phone: string;
  city: string;
  gstNumber: string;
  creditLimit: number;
  outstandingAmount: number;
  status: string;
}

export interface SalesOrder {
  id: number;
  soNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  rate: number;
  grandTotal: number;
  deliveryDate: string;
  status: string;
}

// Finance
export interface Payment {
  id: number;
  paymentNumber: string;
  paymentType: string;
  payeeName: string;
  amount: number;
  paymentMode: string;
  paymentDate: string;
  status: string;
}

// Dashboard
export interface DashboardKpis {
  procurementMt: number;
  inventoryMt: number;
  salesAmount: number;
  activeTrips: number;
  pendingApprovals: number;
  todayReceipts: number;
  overduePayments: number;
  lowStockAlerts: number;
}
