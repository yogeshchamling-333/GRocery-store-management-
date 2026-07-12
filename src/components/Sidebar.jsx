import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBasket, ClipboardList, Users, Sprout, X } from 'lucide-react'

/**
 * Sidebar
 * Primary navigation for the app. Renders as a fixed drawer on mobile
 * (toggled from the Navbar) and a static column on larger screens.
 */
const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/products', label: 'Products', icon: ShoppingBasket },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/customers', label: 'Customers', icon: Users },
]

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-forest-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-64 shrink-0 transform flex-col bg-forest-800 text-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-500">
              <Sprout size={20} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">FreshCart</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto px-3 scrollbar-thin">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-leaf-500 text-white shadow-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 p-4">
          <div className="rounded-xl bg-white/5 p-4 text-xs text-white/60">
            <p className="font-semibold text-white/80">FreshCart Admin</p>
            <p className="mt-1">Grocery Store Management System — college project demo.</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
