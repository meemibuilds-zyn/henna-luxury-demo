import Section from './Section'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import BookCta from './BookCta'

// Shared layout for the trust pages: heading, content, then a booking call to action.
export default function TrustPage({ eyebrow, title, intro, children }) {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading level={1} eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>
        {children}
      </Section>
      <BookCta />
    </>
  )
}
