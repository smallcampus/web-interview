import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function ProductCard({ product }) {
  const { items, addItem } = useCart()
  const inCart = items.find((i) => i.id === product.id)?.quantity ?? 0
  const soldOut = product.stock === 0
  const maxed = inCart >= product.stock

  return (
    <article className="card">
      <div className="card-emoji" aria-hidden="true">{product.emoji}</div>
      <h3>{product.name}</h3>
      <p className="muted">{product.category} · ⭐ {product.rating}</p>
      <p className="price">{formatPrice(product.price)}</p>
      {product.stock > 0 && product.stock <= 5 && <p className="low-stock">Only {product.stock} left</p>}
      <button disabled={soldOut || maxed} onClick={() => addItem(product)}>
        {soldOut ? 'Sold out' : maxed ? 'Max in cart' : 'Add to cart'}
      </button>
    </article>
  )
}
