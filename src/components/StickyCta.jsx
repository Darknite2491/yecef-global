import { event } from '../data/site.js'

// Mobile-only bar. Most visitors arrive from a WhatsApp forward on a
// phone; the two things they came to do should never be more than a
// thumb away, no matter how far down the page they are.
export default function StickyCta() {
  return (
    <div className="sticky-cta">
      <a className="btn btn--ember" href={event.registerUrl}
         target="_blank" rel="noopener noreferrer">
        Reserve a seat
      </a>
      <a className="btn btn--ghost" href="#find-my-bus">Find my bus</a>
    </div>
  )
}
