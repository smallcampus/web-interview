import { describe, expect, it } from 'vitest'
import { EMPTY_SHIPPING, validateShipping } from './validation.js'

const valid = {
  ...EMPTY_SHIPPING,
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  address1: '1 Analytical St',
  city: 'London',
  postalCode: '12345',
}

describe('validateShipping', () => {
  it('accepts a complete address', () => {
    expect(validateShipping(valid)).toEqual({})
  })

  it('requires the mandatory fields', () => {
    const errors = validateShipping(EMPTY_SHIPPING)
    expect(Object.keys(errors)).toEqual(['fullName', 'email', 'address1', 'city', 'postalCode'])
  })

  it('rejects an invalid email', () => {
    expect(validateShipping({ ...valid, email: 'not-an-email' }).email).toBeDefined()
  })

  it('rejects a malformed postal code', () => {
    expect(validateShipping({ ...valid, postalCode: '1234' }).postalCode).toBeDefined()
  })
})
