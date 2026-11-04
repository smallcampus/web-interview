import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'cart'
const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product } = action
      const existing = state.find((i) => i.id === product.id)
      if (!existing) return [...state, { ...product, quantity: 1 }]
      if (existing.quantity >= product.stock) return state
      return state.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
    }
    case 'setQuantity': {
      const { id, quantity } = action
      if (quantity <= 0) return state.filter((i) => i.id !== id)
      return state.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, i.stock) } : i))
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      addItem: (product) => dispatch({ type: 'add', product }),
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
