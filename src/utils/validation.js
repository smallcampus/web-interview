const EMAIL_RE = /^\S+@\S+$/
const POSTAL_RE = /^\d{5}$/
const PHONE_RE = /^\+?[\d\s-]{7,15}$/

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
]

export const EMPTY_SHIPPING = {
  fullName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  postalCode: '',
  country: 'US',
}

// Returns an object of { field: message }. An empty object means the values are valid.
export function validateShipping(values) {
  const errors = {}

  if (!values.fullName.trim()) errors.fullName = 'Full name is required'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address'

  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = 'Enter a valid phone number'

  if (!values.address1.trim()) errors.address1 = 'Address is required'
  if (!values.city.trim()) errors.city = 'City is required'

  if (!values.postalCode.trim()) errors.postalCode = 'Postal code is required'
  else if (!POSTAL_RE.test(values.postalCode)) errors.postalCode = 'Enter a valid postal code'

  return errors
}
