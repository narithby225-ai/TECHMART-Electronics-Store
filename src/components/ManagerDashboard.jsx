import React, { useState } from 'react';
import { Package, TrendingUp, Users, AlertCircle, CheckCircle, Clock, Box, Plus, Truck, RefreshCw, DollarSign, FileText, TrendingDown, Receipt, BarChart3 } from 'lucide-react';
import AddProduct from './AddProduct';
import DeliveryTracker from './DeliveryTracker';

export default function ManagerDashboard({ user, darkMode, onAddProduct, orders = [], onUpdateOrderStatus }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, income, invoices, inventory
  
  const stats = [
    { label: 'Pending Orders', value: orders.filter(o => o.deliveryStatus === 'preparing').length.toString(), icon: Clock, color: 'amber', change: '+12%' },
    { label: 'Out for Delivery', value: orders.filter(o => o.deliveryStatus === 'out_for_delivery').length.toString(), icon: Truck, color: 'blue', change: '+8%' },
    { label: 'Delivered Today', value: orders.filter(o => o.deliveryStatus === 'delivered' && new Date(o.statusTimestamp).toDateString() === new Date().toDateString()).length.toString(), icon: CheckCircle, color: 'emerald', change: '+15%' },
    { label: 'Total Orders', value: orders.length.toString(), icon: Package, color: 'cyan', change: '+20%' }
  ];

  // Filter orders by status
  const preparingOrders = orders.filter(o => o.deliveryStatus === 'preparing');
  const deliveryOrders = orders.filter(o => o.deliveryStatus === 'out_for_delivery');

  const updateDeliveryStatus = (orderId, newStatus) => {
    if (onUpdateOrderStatus) {
      const courierInfo = newStatus === 'out_for_delivery' ? {
        name: 'FastExpress',
        phone: '+1 (555) 123-4567',
        vehicle: 'Van #247'
      } : undefined;

      const deliveredTo = newStatus === 'delivered' ? 'John Doe' : undefined;
      const deliveryNote = newStatus === 'delivered' ? 'Package delivered successfully' : undefined;

      onUpdateOrderStatus(orderId, newStatus, {
        courierInfo,
        deliveredTo,
        deliveryNote
      });
    }
  };

  const lowStockProducts = [
    { id: 'P-101', name: 'MacBook Pro 14" M3', stock: 3, threshold: 10 },
    { id: 'P-102', name: 'GeForce RTX 4080', stock: 2, threshold: 5 },
    { id: 'P-103', name: 'AMD Ryzen 7 7800X3D', stock: 4, threshold: 10 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Low': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-4xl rounded-2xl border shadow-2xl overflow-y-auto max-h-[90vh] ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-6">
              <AddProduct 
                onClose={() => setShowAddProduct(false)}
                onSave={(product) => {
                  if (onAddProduct) {
                    onAddProduct(product);
                  }
                  setShowAddProduct(false);
                }}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Store Manager Dashboard - {user.name} 👨‍💼</h2>
            <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Manage orders, inventory, view income/expenses and customer invoices</p>
          </div>
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex gap-2 p-2 rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
              : darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
            activeTab === 'income'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
              : darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Income/Expense
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
            activeTab === 'invoices'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
              : darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          Customer Invoices
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
              : darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <Box className="w-4 h-4" />
          Inventory
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (<>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.change.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preparing Orders */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Preparing Orders ({preparingOrders.length})
            </h3>
          </div>

          <div className="space-y-3">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No orders to prepare</p>
              </div>
            ) : (
              preparingOrders.slice(0, 4).map((order) => (
                <div key={order.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">Order #{order.id}</div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {order.items.length} items • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => updateDeliveryStatus(order.id, 'out_for_delivery')}
                      className="flex-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <Truck className="w-3 h-3" />
                      Ship Out
                    </button>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded text-xs font-semibold transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Out for Delivery */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              Out for Delivery ({deliveryOrders.length})
            </h3>
          </div>

          <div className="space-y-3">
            {deliveryOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Truck className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No active deliveries</p>
              </div>
            ) : (
              deliveryOrders.slice(0, 4).map((order) => (
                <div key={order.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">Order #{order.id}</div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {order.courierInfo?.name || 'Courier'} • {order.courierInfo?.vehicle || 'In transit'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => updateDeliveryStatus(order.id, 'delivered')}
                      className="flex-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Mark Delivered
                    </button>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded text-xs font-semibold transition"
                    >
                      Track
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delivery Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-y-auto max-h-[90vh] ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-6">
              <DeliveryTracker order={selectedOrder} darkMode={darkMode} />
              <div className="mt-4 flex gap-3">
                {selectedOrder.deliveryStatus === 'preparing' && (
                  <button
                    onClick={() => {
                      updateDeliveryStatus(selectedOrder.id, 'out_for_delivery');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    Ship Out
                  </button>
                )}
                {selectedOrder.deliveryStatus === 'out_for_delivery' && (
                  <button
                    onClick={() => {
                      updateDeliveryStatus(selectedOrder.id, 'delivered');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Delivered
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button className={`p-4 rounded-xl border text-left transition ${darkMode ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-400'}`}>
          <Package className="w-6 h-6 text-purple-400 mb-2" />
          <div className="font-semibold mb-1">All Orders</div>
          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>View all orders</div>
        </button>
        <button className={`p-4 rounded-xl border text-left transition ${darkMode ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-400'}`}>
          <Box className="w-6 h-6 text-blue-400 mb-2" />
          <div className="font-semibold mb-1">Inventory</div>
          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Manage stock</div>
        </button>
        <button className={`p-4 rounded-xl border text-left transition ${darkMode ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-400'}`}>
          <Users className="w-6 h-6 text-emerald-400 mb-2" />
          <div className="font-semibold mb-1">Customers</div>
          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>View customers</div>
        </button>
        <button className={`p-4 rounded-xl border text-left transition ${darkMode ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-400'}`}>
          <Truck className="w-6 h-6 text-cyan-400 mb-2" />
          <div className="font-semibold mb-1">Deliveries</div>
          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Track deliveries</div>
        </button>
      </div>
      </>)}

      {/* Income/Expense Tab */}
      {activeTab === 'income' && (
        <div className="space-y-6">
          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 text-emerald-400" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">+12.5%</span>
              </div>
              <div className="text-3xl font-black text-emerald-400 mb-2">$45,280.00</div>
              <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Total Income (This Month)</div>
            </div>

            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-500/30' : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-10 h-10 text-rose-400" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-400">+5.2%</span>
              </div>
              <div className="text-3xl font-black text-rose-400 mb-2">$12,430.00</div>
              <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Total Expenses (This Month)</div>
            </div>

            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-10 h-10 text-cyan-400" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">+18.3%</span>
              </div>
              <div className="text-3xl font-black text-cyan-400 mb-2">$32,850.00</div>
              <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Net Profit (This Month)</div>
            </div>
          </div>

          {/* Income/Expense Records */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Records */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Recent Income
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'INC-001', type: 'Product Sales', amount: 2850.00, date: '2026-11-07', customer: 'John Customer' },
                  { id: 'INC-002', type: 'Product Sales', amount: 1499.99, date: '2026-11-07', customer: 'Sarah Smith' },
                  { id: 'INC-003', type: 'Product Sales', amount: 3250.50, date: '2026-11-06', customer: 'Mike Johnson' },
                  { id: 'INC-004', type: 'Product Sales', amount: 899.99, date: '2026-11-06', customer: 'Emily Davis' },
                ].map((record) => (
                  <div key={record.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-emerald-400">{record.id}</div>
                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {record.type} • {record.customer}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400">+${record.amount.toFixed(2)}</div>
                        <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{record.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Records */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-rose-400" />
                Recent Expenses
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'EXP-001', type: 'Shipping Costs', amount: 450.00, date: '2026-11-07', note: 'Courier fees' },
                  { id: 'EXP-002', type: 'Packaging', amount: 280.50, date: '2026-11-07', note: 'Boxes & materials' },
                  { id: 'EXP-003', type: 'Utilities', amount: 650.00, date: '2026-11-06', note: 'Store utilities' },
                  { id: 'EXP-004', type: 'Maintenance', amount: 320.00, date: '2026-11-06', note: 'Equipment repair' },
                ].map((record) => (
                  <div key={record.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-rose-400">{record.id}</div>
                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {record.type} • {record.note}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-rose-400">-${record.amount.toFixed(2)}</div>
                        <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{record.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note about inventory purchase */}
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-400 mb-1">Permission Note</div>
                <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  As a Store Manager, you can view income/expense records but cannot purchase new inventory. Contact the Store Owner for inventory purchases.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-cyan-400" />
              Customer Purchase Invoices
            </h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">Invoice #{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          order.deliveryStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                          order.deliveryStatus === 'out_for_delivery' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {order.deliveryStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Customer: John Customer • customer@demo.com
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-cyan-400">${order.total.toFixed(2)}</div>
                      <button className="mt-2 px-4 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-xs font-semibold transition">
                        View Full Invoice
                      </button>
                    </div>
                  </div>
                  
                  <div className={`pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="text-sm font-semibold mb-3">Order Items:</div>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-semibold">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`mt-4 pt-4 border-t space-y-1 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <div className="flex justify-between text-sm">
                        <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Shipping Address:</span>
                        <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{order.shippingAddress}</span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex justify-between text-sm">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Estimated Delivery:</span>
                          <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{order.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Management Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-amber-400" />
              Stock Management - Adjust Levels
            </h3>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg mb-1">{product.name}</div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Product ID: {product.id}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          product.stock < 3 ? 'bg-rose-500/20 text-rose-400' :
                          product.stock < 5 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {product.stock < 3 ? 'Critical' : product.stock < 5 ? 'Low' : 'Normal'} Stock
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400 mb-2">Current Stock</div>
                      <div className="text-4xl font-black text-cyan-400 mb-3">{product.stock}</div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg text-sm font-semibold transition flex items-center gap-1">
                          <TrendingDown className="w-4 h-4" />
                          Remove
                        </button>
                        <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg text-sm font-semibold transition flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`pt-3 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Reorder threshold: {product.threshold} units • You can adjust stock levels but cannot purchase new inventory
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission Note */}
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-400 mb-1">Inventory Management Permission</div>
                <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  ✅ You can: Add products, edit products, adjust stock levels (add/remove from existing stock)<br />
                  ❌ You cannot: Purchase new inventory from suppliers - This requires Store Owner authorization
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
