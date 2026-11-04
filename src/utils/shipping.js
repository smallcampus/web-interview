export const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard', days: '5-7 business days', price: 4.99 },
  { id: 'express', label: 'Express', days: '1-2 business days', price: 14.99 },
]

const FREE_SHIPPING_THRESHOLD = 100

export function getShippingCost(methodId, subtotal) {
  const method = SHIPPING_METHODS.find((m) => m.id === methodId)
  if (methodId === 'standard' && subtotal > FREE_SHIPPING_THRESHOLD) return 0
  return method.price
}
