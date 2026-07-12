import { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import initialProducts from '../data/products.js'

const emptyForm = {
  name: '',
  category: '',
  price: '',
  unit: 'unit',
  stock: '',
  image: '',
}

/**
 * Products
 * Grid of product cards with search/filter, plus a modal form that
 * is reused for both "Add Product" and "Edit Product".
 */
function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }, [products, query])

  function openAddModal() {
    setEditingProduct(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEditModal(product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
      image: product.image,
    })
    setModalOpen(true)
  }

  function handleDelete(product) {
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                category: form.category,
                price: parseFloat(form.price) || 0,
                unit: form.unit,
                stock: parseInt(form.stock, 10) || 0,
                image: form.image || p.image,
              }
            : p
        )
      )
    } else {
      const newProduct = {
        id: `P${String(products.length + 1).padStart(3, '0')}-${Date.now().toString().slice(-4)}`,
        name: form.name,
        category: form.category,
        price: parseFloat(form.price) || 0,
        unit: form.unit,
        stock: parseInt(form.stock, 10) || 0,
        lowStockThreshold: 10,
        image:
          form.image ||
          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=60',
        dateAdded: new Date().toISOString().slice(0, 10),
      }
      setProducts((prev) => [newProduct, ...prev])
    }
    setModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">Products</h1>
          <p className="mt-1 text-sm text-forest-700/60">
            {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="sm:w-72">
            <SearchBar value={query} onChange={setQuery} placeholder="Search products or category..." />
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-full bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700 active:scale-95"
          >
            <Plus size={17} /> Add Product
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl2 bg-white py-16 text-center text-sm text-forest-700/60 shadow-card">
          No products match "{query}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl2 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-forest-900">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-forest-700/60 hover:bg-sage-100 hover:text-forest-900"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-forest-700/70">Product Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                  placeholder="e.g. Organic Bananas"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-forest-700/70">Category</label>
                  <input
                    required
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                    placeholder="e.g. Fruits"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-forest-700/70">Unit</label>
                  <input
                    type="text"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                    placeholder="e.g. kg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-forest-700/70">Price ($)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-forest-700/70">Stock Quantity</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-forest-700/70">Image URL (optional)</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-lg border border-forest-900/10 px-3 py-2 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-400/30"
                  placeholder="https://..."
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-forest-700 hover:bg-sage-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf-600 active:scale-95"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
