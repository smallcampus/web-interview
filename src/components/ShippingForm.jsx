import { useState } from 'react'
import { COUNTRIES, EMPTY_SHIPPING, validateShipping } from '../utils/validation.js'

export default function ShippingForm({ initialValues = EMPTY_SHIPPING, submitLabel = 'Continue', disabled, onSubmit, onBack }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateShipping(values)
    setErrors(found)
    if (Object.keys(found).length === 0) onSubmit(values)
  }

  const shared = { values, errors, onChange: handleChange }

  const Field = ({ label, name, values, errors, onChange, type = 'text', ...rest }) => {
    return (
      <label className="field">
        <span>{label}</span>
        <input type={type} name={name} value={values[name]} onChange={onChange} {...rest} />
        {errors[name] && <span className="field-error">{errors[name]}</span>}
      </label>
    )
  }


  return (
    <form className="shipping-form" onSubmit={handleSubmit} noValidate>
      <Field label="Full name" name="fullName" autoComplete="name" {...shared} />
      <Field label="Email" name="email" type="email" autoComplete="email" {...shared} />
      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" {...shared} />
      <Field label="Address" name="address1" autoComplete="address-line1" {...shared} />
      <Field label="Apartment, suite, etc. (optional)" name="address2" autoComplete="address-line2" {...shared} />
      <div className="row">
        <Field label="City" name="city" autoComplete="address-level2" {...shared} />
        <Field label="Postal code" name="postalCode" autoComplete="postal-code" {...shared} />
      </div>
      <label className="field">
        <span>Country</span>
        <select name="country" value={values.country} onChange={handleChange}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <div className="form-actions">
        {onBack && (
          <button type="button" className="ghost" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" disabled={disabled}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
