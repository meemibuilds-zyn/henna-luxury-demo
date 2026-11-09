// Visible placeholder for any fact the artist must supply. Never replace these
// with invented details.
export default function Confirm({ children }) {
  return (
    <span className="rounded-sm border border-dashed border-gold bg-cream px-1.5 py-0.5 text-[0.85em] text-gold-deep">
      [ARTIST TO CONFIRM: {children}]
    </span>
  )
}
