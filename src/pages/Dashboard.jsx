import { ShoppingBasket, ClipboardList, Users, DollarSign, ArrowUpRight, AlertTriangle } from 'lucide-react'
import StatsCard from '../components/StatsCard.jsx'
import products from '../data/products.js'
import orders from '../data/orders.js'
import customers from '../data/customers.js'

/**
 * Dashboard
 * Landing page — welcome message, 4 summary stat cards, a "Recent Products"
 * list and a "Low Stock Products" alert list.
 */
function Dashboard() {
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalCustomers = customers.length
  const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5)

  const lowStockProducts = products
    .filter((p) => p.stock <= p.lowStockThreshold)
    .sort((a, b) => a.stock - b.stock)

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome message */}
      <div className="rounded-xl2 bg-gradient-to-br from-forest-800 to-forest-700 px-6 py-7 text-white shadow-soft sm:px-8">
        <p className="text-sm font-medium text-leaf-400/90">Welcome back,</p>
        <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Store Manager 👋</h1>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Here's what's happening at FreshCart today — a quick snapshot of your products, orders and customers.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Products" value={totalProducts} icon={ShoppingBasket} accent="forest" />
        <StatsCard label="Total Orders" value={totalOrders} icon={ClipboardList} accent="leaf" />
        <StatsCard label="Total Customers" value={totalCustomers} icon={Users} accent="harvest" />
        <StatsCard label="Revenue" value={`$${revenue.toFixed(2)}`} icon={DollarSign} accent="forest" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Recent Products */}
        <div className="rounded-xl2 bg-white p-5 shadow-card ring-1 ring-forest-900/5 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest-900">Recent Products</h2>
            <span className="flex items-center gap-1 text-xs font-medium text-leaf-600">
              Latest additions <ArrowUpRight size={14} />
            </span>
          </div>
          <div className="flex flex-col divide-y divide-forest-900/5">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-11 w-11 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-forest-900">{p.name}</p>
                  <p className="text-xs text-forest-700/60">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-forest-900">${p.price.toFixed(2)}</p>
                  <p className="text-xs text-forest-700/60">{p.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="rounded-xl2 bg-white p-5 shadow-card ring-1 ring-forest-900/5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest-900">Low Stock Products</h2>
            <AlertTriangle size={18} className="text-harvest-500" />
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="py-6 text-center text-sm text-forest-700/60">All products are well stocked 🎉</p>
          ) : (
            <div className="flex flex-col gap-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl bg-harvest-300/20 px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-forest-900">{p.name}</p>
                    <p className="text-xs text-forest-700/60">{p.category}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-harvest-500 px-2.5 py-1 text-xs font-semibold text-forest-900">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
