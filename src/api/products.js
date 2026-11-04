const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 89.99, emoji: '🎧', stock: 12, rating: 4.5 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.0, emoji: '⌨️', stock: 5, rating: 4.8 },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 199.5, emoji: '⌚', stock: 0, rating: 4.2 },
  { id: 4, name: 'Running Shoes', category: 'Clothing', price: 74.95, emoji: '👟', stock: 20, rating: 4.4 },
  { id: 5, name: 'Denim Jacket', category: 'Clothing', price: 59.0, emoji: '🧥', stock: 8, rating: 4.1 },
  { id: 6, name: 'Sun Hat', category: 'Clothing', price: 19.99, emoji: '👒', stock: 30, rating: 3.9 },
  { id: 7, name: 'Ceramic Mug', category: 'Home', price: 12.5, emoji: '☕', stock: 50, rating: 4.7 },
  { id: 8, name: 'Desk Plant', category: 'Home', price: 24.0, emoji: '🪴', stock: 15, rating: 4.6 },
  { id: 9, name: 'Table Lamp', category: 'Home', price: 39.99, emoji: '💡', stock: 3, rating: 4.3 },
  { id: 10, name: 'Paperback Novel', category: 'Books', price: 9.99, emoji: '📖', stock: 40, rating: 4.0 },
  { id: 11, name: 'Cookbook', category: 'Books', price: 27.5, emoji: '📚', stock: 10, rating: 4.5 },
  { id: 12, name: 'Notebook Set', category: 'Books', price: 14.0, emoji: '📓', stock: 25, rating: 4.2 },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts() {
  await delay(500)
  return PRODUCTS.map((p) => ({ ...p }))
}

// Mock checkout: validates stock and returns an order receipt.
export async function checkout(items, shipping, total) {
  await delay(800)
  console.log('Placing order', items, shipping)
  if (!shipping) throw new Error('Shipping information is required')
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.id)
    if (!product || product.stock < item.quantity) {
      throw new Error(`"${item.name}" is out of stock`)
    }
  }
  return { orderId: `ORD-${Date.now().toString(36).toUpperCase()}`, itemCount: items.length, shipTo: shipping.city, charged: total }
}
