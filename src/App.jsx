import { useMemo, useState } from 'react'
import Cart from './components/Cart.jsx'
import Filters from './components/Filters.jsx'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { useProducts } from './hooks/useProducts.js'

const SORTERS = {
  featured: null,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
}

export default function App() {
  const { products, loading, error } = useProducts()
  const [filters, setFilters] = useState({ search: '', category: 'all', sort: 'featured' })
  const [cartOpen, setCartOpen] = useState(false)

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products])

  const visible = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    const filtered = products.filter(
      (p) =>
        (filters.category === 'all' || p.category === filters.category) &&
        p.name.toLowerCase().includes(term),
    )
    const sorter = SORTERS[filters.sort]
    return sorter ? [...filtered].sort(sorter) : filtered
  }, [products, filters])

  return (
    <CartProvider>
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <Filters categories={categories} filters={filters} onChange={setFilters} />
        {loading && <p className="empty">Loading products…</p>}
        {error && <p className="error">Failed to load products.</p>}
        {!loading && !error && <ProductList products={visible} />}
      </main>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  )
}
