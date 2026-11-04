import { useCart } from '../context/CartContext.jsx'

export default function Header({ onCartClick }) {
  const { count } = useCart()

  return (
    <header className="header">
      <h1>🛍️ Mini Shop</h1>
      <button className="cart-button" onClick={onCartClick} aria-label={`Open cart, ${count} items`}>
        🛒 Cart <span className="badge">{count}</span>
      </button>
    </header>
  )
}
