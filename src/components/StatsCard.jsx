/**
 * StatsCard
 * Small summary card used on the Dashboard to display a single metric
 * (e.g. Total Products, Total Orders, Total Customers, Revenue).
 */
function StatsCard({ label, value, icon: Icon, accent = 'forest', trend }) {
  const accentStyles = {
    forest: 'bg-forest-800 text-white',
    leaf: 'bg-leaf-500 text-white',
    harvest: 'bg-harvest-400 text-forest-900',
    sage: 'bg-white text-forest-800',
  }

  return (
    <div className="group relative overflow-hidden rounded-xl2 bg-white p-5 shadow-card ring-1 ring-forest-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-forest-700/70">{label}</p>
          <p className="mt-2 text-3xl font-display font-bold text-forest-900">{value}</p>
          {trend && (
            <p className="mt-1 text-xs font-medium text-leaf-600">{trend}</p>
          )}
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]} shadow-sm transition-transform duration-300 group-hover:rotate-6`}
        >
          {Icon && <Icon size={20} strokeWidth={2.2} />}
        </div>
      </div>
      <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-leaf-400/10 transition-transform duration-300 group-hover:scale-125" />
    </div>
  )
}

export default StatsCard
