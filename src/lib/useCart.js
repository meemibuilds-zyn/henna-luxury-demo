import { useEffect, useState } from 'react'
import { getCart, subscribeCart, cartCount } from '../data/cart'

export function useCart() {
  const [items, setItems] = useState(() => getCart())
  useEffect(() => subscribeCart(() => setItems(getCart())), [])
  return { items, count: cartCount(items) }
}
