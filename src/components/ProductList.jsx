import ProductCard from './ProductCard.jsx'

export default function ProductList({ products }) {
  if (products.length === 0) return <p className="empty">No products match your filters.</p>

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
