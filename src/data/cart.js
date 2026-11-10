// Shopping cart, kept in this browser only (localStorage). One place reads and writes it.
const KEY = 'henna-demo-cart-v1'
let memory = []
const subs = new Set()

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const a = JSON.parse(raw)
      if (Array.isArray(a)) return a
    }
  } catch (e) {
    /* storage blocked, use memory */
  }
  return memory
}

function write(list) {
  memory = list
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch (e) {
    /* memory only */
  }
  subs.forEach((f) => f())
}

export const keyOf = (pid, vid) => pid + ':' + vid
export const getCart = () => read()
export const cartCount = (list = read()) => list.reduce((n, i) => n + i.qty, 0)

// item: { pid, vid, qty }. Names and prices are looked up from the product data when shown.
export function addToCart({ pid, vid, qty }) {
  const list = read().slice()
  const k = keyOf(pid, vid)
  const i = list.findIndex((x) => x.k === k)
  if (i > -1) list[i] = { ...list[i], qty: Math.min(99, list[i].qty + qty) }
  else list.push({ k, pid, vid, qty: Math.min(99, qty) })
  write(list)
}

export function setQty(k, qty) {
  write(read().map((x) => (x.k === k ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)))
}

export function removeItem(k) {
  write(read().filter((x) => x.k !== k))
}

export function clearCart() {
  write([])
}

export function subscribeCart(fn) {
  subs.add(fn)
  const onStorage = (e) => {
    if (e.key === KEY || e.key === null) fn()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    subs.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}
