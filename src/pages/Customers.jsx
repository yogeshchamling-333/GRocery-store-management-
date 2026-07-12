import { useMemo, useState } from 'react'
import { Mail, Phone, ShoppingBag } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import customers from '../data/customers.js'

/**
 * Customers
 * Grid of customer cards: Name, Email, Phone Number, Total Orders.
 */
function Customers() {
  const [query, setQuery] = useState('')

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return customers
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">Customers</h1>
          <p className="mt-1 text-sm text-forest-700/60">
            {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
        <div className="sm:w-72">
          <SearchBar value={query} onChange={setQuery} placeholder="Search by name or email..." />
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="rounded-xl2 bg-white py-16 text-center text-sm text-forest-700/60 shadow-card">
          No customers match "{query}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="group flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-card ring-1 ring-forest-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 font-display text-sm font-bold text-white">
                  {customer.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-semibold text-forest-900">
                    {customer.name}
                  </p>
                  <p className="text-xs text-forest-700/60">Customer ID: {customer.id}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-sm text-forest-800">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={14} className="shrink-0 text-leaf-500" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-leaf-500" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-2 rounded-lg bg-sage-50 px-3 py-2 text-xs font-medium text-forest-700">
                <ShoppingBag size={14} className="text-forest-800" />
                {customer.totalOrders} total orders
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Customers
