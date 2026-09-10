import { Link } from 'react-router-dom'
import { event } from '../data/site.js'

export default function NotFound() {
  return (
    <section className="hero">
      <div className="hero__in">
        <p className="eyebrow">404</p>
        <h1>That page isn’t here.</h1>
        <p className="lede">
          The two things most people come for are below — everything else is in the menu.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--ember" href={event.registerUrl}
             target="_blank" rel="noopener noreferrer">
            Reserve a seat
          </a>
          <Link className="btn btn--ghost" to="/fresh-fire">Fresh Fire details</Link>
        </div>
      </div>
    </section>
  )
}
