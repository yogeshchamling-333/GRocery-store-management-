import { Pencil, Trash2, Leaf } from 'lucide-react'

/**
 * ProductCard
 * Displays a single product with image, name, category, price and stock.
 * Exposes onEdit / onDelete callbacks used by the Products page.
 */
function ProductCard({ product, onEdit, onDelete }) {
  const isLowStock = product.stock <= product.lowStockThreshold

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card ring-1 ring-forest-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-36 w-full overflow-hidden bg-sage-100 sm:h-40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest-800 shadow-sm backdrop-blur">
          {product.category}
        </span>
        {isLowStock && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-harvest-400 px-2.5 py-1 text-[11px] font-semibold text-forest-900 shadow-sm">
            Low stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="truncate font-display text-[15px] font-semibold text-forest-900">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-leaf-600">
            ${product.price.toFixed(2)}
            <span className="ml-1 text-xs font-normal text-forest-700/50">/ {product.unit}</span>
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-forest-700/70">
          <Leaf size={13} className="text-leaf-500" />
          <span>
            {product.stock} {product.unit === 'kg' ? 'kg' : 'units'} in stock
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-forest-800/15 bg-sage-50 py-1.5 text-xs font-medium text-forest-800 transition hover:bg-forest-800 hover:text-white"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
