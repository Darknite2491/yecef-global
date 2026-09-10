import { useState, useMemo } from 'react'
import { axes, org, event } from '../data/site.js'

function match(axis, q) {
  if (!q) return true
  const needle = q.trim().toLowerCase()
  if (axis.name.toLowerCase().includes(needle)) return true
  return axis.keywords.some((k) => k.includes(needle) || needle.includes(k))
}

function AxisCard({ axis }) {
  return (
    <article className="axis-card">
      <div className="axis-card__top">
        <span className="axis-card__n">Axis {String(axis.id).padStart(2, '0')}</span>
        {axis.confirmedSeats && (
          <span className="pill pill--ok">{axis.confirmedSeats} seats confirmed</span>
        )}
      </div>
      <h4>{axis.name}</h4>
      <dl>
        <dt>Pickup</dt>
        {axis.landmark
          ? <dd>{axis.landmark}</dd>
          : <dd className="tbc">Your coordinator will send the exact spot</dd>}

        <dt>Departs</dt>
        {axis.departs
          ? <dd>{axis.departs}</dd>
          : <dd className="tbc">Time to be confirmed — ask your coordinator</dd>}

        <dt>Coordinator</dt>
        {axis.coordinators?.length
          ? <dd>{axis.coordinators.join(' · ')}</dd>
          : <dd className="tbc">Not yet listed</dd>}
      </dl>
    </article>
  )
}

export default function AxisFinder() {
  const [q, setQ] = useState('')
  const results = useMemo(() => axes.filter((a) => match(a, q)), [q])

  return (
    <section className="finder" id="find-my-bus" aria-labelledby="finder-title">
      <div className="finder__head">
        <p className="eyebrow">Bus finder</p>
        <h3 id="finder-title">Find your pickup point</h3>
        <p className="mid" style={{ fontSize: '0.94rem' }}>
          Type your area — Bariga, Sango, Ikotun, anywhere in between.
        </p>
      </div>

      <div className="finder__body">
        <div className="finder__field">
          <label htmlFor="axis-q">Where are you coming from?</label>
          <input
            id="axis-q"
            className="finder__input"
            type="search"
            value={q}
            placeholder="e.g. Gbagada"
            autoComplete="off"
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <p className="mono dim" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
          {results.length} of {axes.length} {results.length === 1 ? 'axis' : 'axes'}
        </p>

        <div className="finder__results">
          {results.length > 0 ? (
            results.map((a) => <AxisCard key={a.id} axis={a} />)
          ) : (
            <div className="stack-sm">
              <p className="finder__empty">
                No bus listed for “{q}” yet — but that does not mean you can’t come.
              </p>
              <p className="finder__empty">
                Message us on Instagram{' '}
                <a href={org.instagram} target="_blank" rel="noopener noreferrer">
                  {org.handle}
                </a>{' '}
                and we’ll point you to the nearest axis.
              </p>
            </div>
          )}
        </div>

        <a className="btn btn--ember" href={event.registerUrl}
           target="_blank" rel="noopener noreferrer">
          Reserve a seat on the bus
        </a>
        <p className="dim" style={{ fontSize: '0.84rem' }}>
          Registration is on Luma. Tell us your pickup point when you register so
          your coordinator knows to count you.
        </p>
      </div>
    </section>
  )
}
