import { motion } from 'framer-motion'

// Gentle fade-in when the element first appears. No scroll-driven animation.
export default function Reveal({ delay = 0, className = '', children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
