import { Search, X } from 'lucide-react'

/**
 * SearchBar
 * Reusable search input with a leading search icon and a clear ("x") button.
 * Controlled component — parent owns the value via `value` and `onChange`.
 */
function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-700/40"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-forest-900/10 bg-white py-2.5 pl-10 pr-9 text-sm text-forest-900 placeholder:text-forest-700/40 shadow-sm outline-none transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-700/40 transition hover:text-forest-800"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
