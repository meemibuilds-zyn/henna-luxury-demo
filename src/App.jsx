import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Process = lazy(() => import('./pages/Process'))
const Policy = lazy(() => import('./pages/Policy'))
const Faq = lazy(() => import('./pages/Faq'))
const Expect = lazy(() => import('./pages/Expect'))
const Aftercare = lazy(() => import('./pages/Aftercare'))
const Admin = lazy(() => import('./pages/Admin'))
const BookHub = lazy(() => import('./pages/BookHub'))
const BookBridal = lazy(() => import('./pages/BookBridal'))
const BookParty = lazy(() => import('./pages/BookParty'))
const BookFestive = lazy(() => import('./pages/BookFestive'))
const BookGroup = lazy(() => import('./pages/BookGroup'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="services" element={<Navigate to="/pricing" replace />} />
        <Route path="about" element={<About />} />
        <Route path="process" element={<Process />} />
        <Route path="policy" element={<Policy />} />
        <Route path="faq" element={<Faq />} />
        <Route path="expect" element={<Expect />} />
        <Route path="aftercare" element={<Aftercare />} />
        <Route path="admin" element={<Admin />} />
        <Route path="book" element={<BookHub />} />
        <Route path="book/bridal" element={<BookBridal />} />
        <Route path="book/party" element={<BookParty />} />
        <Route path="book/festive" element={<BookFestive />} />
        <Route path="book/group" element={<BookGroup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
