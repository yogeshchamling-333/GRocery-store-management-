import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import orders from '../data/orders.js'

const statusStyles = {
  Delivered: 'bg-leaf-500/15 text-leaf-600',
  Pending: 'bg-harvest-400/25 text-harvest-500',
  Processing: 'bg-forest-800/10 text-forest-800',
  Cancelled: 'bg-red-100 text-red-600',
}

/**
 * Orders
 * Responsive table listing Order ID, Customer Name, Total Amount,
 * Order Status and Date. Collapses to stacked cards on small screens.
 */
function Orders() {
  const [query, setQuery] = useState('')

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return orders
    return orders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">Orders</h1>
          <p className="mt-1 text-sm text-forest-700/60">
            {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
        <div className="sm:w-72">
          <SearchBar value={query} onChange={setQuery} placeholder="Search by order ID or customer..." />
        </div>
      </div>

      {/* Table for sm and up */}
      <div className="hidden overflow-hidden rounded-xl2 bg-white shadow-card ring-1 ring-forest-900/5 sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-forest-900/5 bg-sage-50 text-xs font-semibold uppercase tracking-wide text-forest-700/60">
              <th className="px-5 py-3.5">Order ID</th>
              <th className="px-5 py-3.5">Customer Name</th>
              <th className="px-5 py-3.5">Total Amount</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="transition hover:bg-sage-50/70">
                <td className="px-5 py-3.5 font-medium text-forest-900">{order.id}</td>
                <td className="px-5 py-3.5 text-forest-800">{order.customerName}</td>
                <td className="px-5 py-3.5 font-semibold text-forest-900">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-forest-700/70">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="py-12 text-center text-sm text-forest-700/60">No orders match "{query}".</p>
        )}
      </div>

      {/* Stacked cards for mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        {filteredOrders.map((order) => (
          <div key={order.id} className="rounded-xl2 bg-white p-4 shadow-card ring-1 ring-forest-900/5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-forest-900">{order.id}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-forest-800">{order.customerName}</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-leaf-600">${order.totalAmount.toFixed(2)}</span>
              <span className="text-forest-700/60">{order.date}</span>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <p className="py-12 text-center text-sm text-forest-700/60">No orders match "{query}".</p>
        )}
      </div>
    </div>
  )
}

export default Orders
