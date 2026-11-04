import { useEffect, useState } from 'react'
import { checkout } from '../api/products.js'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'
import ShippingForm from './ShippingForm.jsx'

function loadShipping() {
  try {
    return JSON.parse(localStorage.getItem('shipping')) ?? undefined
  } catch {
    return undefined
  }
}

export default function Cart({ open, onClose }) {
  const { items, total, setQuantity, removeItem, clear } = useCart()
  const [status, setStatus] = useState({ state: 'idle' })
  const [step, setStep] = useState('cart')

  const placeOrder = async (shipping) => {
    setStatus({ state: 'loading' })
    try {
      const receipt = await checkout(items, shipping)
      localStorage.setItem('shipping', JSON.stringify(shipping))
      clear()
      setStatus({ state: 'success', orderId: receipt.orderId, shipTo: receipt.shipTo })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const close = () => {
    setStatus({ state: 'idle' })
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div className="overlay" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Shopping cart">
        <div className="drawer-header">
          <h2>{step === 'shipping' ? 'Shipping details' : 'Your cart'}</h2>
          <button className="ghost" onClick={close} aria-label="Close cart">✕</button>
        </div>

        {status.state === 'success' ? (
          <p className="success">
            🎉 Order {status.orderId} placed. We'll ship it to {status.shipTo}. Thank you!
          </p>
        ) : items.length === 0 && step === 'cart' ? (
          <p className="empty">Your cart is empty.</p>
        ) : step === 'shipping' ? (
          <>
            {status.state === 'error' && <p className="error">{status.message}</p>}
            <ShippingForm
              initialValues={loadShipping()}
              submitLabel={status.state === 'loading' ? 'Processing…' : `Pay ${formatPrice(total)}`}
              disabled={status.state === 'loading'}
              onSubmit={placeOrder}
              onBack={() => setStep('cart')}
            />
          </>
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
            <button className="checkout" onClick={() => setStep('shipping')}>
              Continue to shipping
            </button>
          </>
        )}
      </aside>
    </div>
  )
}
