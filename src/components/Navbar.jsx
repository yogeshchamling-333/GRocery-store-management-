import { Menu, Bell, Sprout } from 'lucide-react'

/**
 * Navbar
 * Top bar shown on every page. Hosts the mobile menu toggle, page title
 * area (rendered by each page) and a couple of quick-glance icons.
 */
function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-forest-900/5 bg-white/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-forest-800 hover:bg-sage-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-800 text-white">
            <Sprout size={16} />
          </span>
          <span className="font-display text-base font-bold text-forest-900">FreshCart</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-forest-800 transition hover:bg-sage-100"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-harvest-500" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-forest-800 text-center text-sm font-semibold leading-9 text-white">
            SM
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-semibold text-forest-900 leading-tight">Store Manager</p>
            <p className="text-xs text-forest-700/60 leading-tight">FreshCart Grocery</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
