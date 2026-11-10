// Shows a fact from src/data/site.js. If it is still a placeholder, it is shown as a visible tag.
export default function SiteFact({ value }) {
  const v = String(value || '')
  if (v.startsWith('[')) {
    return (
      <span className="rounded-sm border border-dashed border-gold bg-cream px-1.5 py-0.5 text-[0.85em] text-gold-deep">
        {v}
      </span>
    )
  }
  return <>{v}</>
}
