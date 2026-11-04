import { useState } from 'react'
import { checkout } from '../api/products.js'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function Cart({ open, onClose }) {
  const { items, total, setQuantity, removeItem, clear } = useCart()
  const [status, setStatus] = useState({ state: 'idle' })

  const handleCheckout = async () => {
    setStatus({ state: 'loading' })
    try {
      const receipt = await checkout(items)
      clear()
      setStatus({ state: 'success', orderId: receipt.orderId })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const close = () => {
    setStatus({ state: 'idle' })
    onClose()
  }

  if (!open) return null

  return (
    <div className="overlay" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Shopping cart">
        <div className="drawer-header">
          <h2>Your cart</h2>
          <button className="ghost" onClick={close} aria-label="Close cart">✕</button>
        </div>

        {status.state === 'success' ? (
          <p className="success">🎉 Order {status.orderId} placed. Thank you!</p>
        ) : items.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id}>
                  <span className="cart-emoji">{item.emoji}</span>
                  <div className="cart-info">
                    <strong>{item.name}</strong>
                    <span className="muted">{formatPrice(item.price)}</span>
                  </div>
                  <div className="qty">
                    <button className="ghost" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.quantity}</span>
                    <button
                      className="ghost"
                      disabled={item.quantity >= item.stock}
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button className="ghost danger" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>🗑</button>
                </li>
              ))}
            </ul>
            <div className="total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            {status.state === 'error' && <p className="error">{status.message}</p>}
            <button className="checkout" disabled={status.state === 'loading'} onClick={handleCheckout}>
              {status.state === 'loading' ? 'Processing…' : 'Checkout'}
            </button>
          </>
        )}
      </aside>
    </div>
  )
}
