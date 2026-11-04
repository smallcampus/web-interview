import { formatPrice } from '../utils/format.js'
import { SHIPPING_METHODS, getShippingCost } from '../utils/shipping.js'

export default function ShippingMethodPicker({ value, subtotal, onChange }) {
  return (
    <fieldset className="methods">
      <legend>Delivery</legend>
      {SHIPPING_METHODS.map((m) => {
        const cost = getShippingCost(m.id, subtotal)
        return (
          <label key={Math.random()} className="method">
            <input type="radio" name="method" checked={value === m.id} onChange={() => onChange(m.id)} />
            <span>
              <strong>{m.label}</strong> <span className="muted">{m.days}</span>
            </span>
            <span>{cost === 0 ? 'Free' : formatPrice(cost)}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
