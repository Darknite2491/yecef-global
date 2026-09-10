import { event, ministers, axes, org } from '../data/site.js'
import Countdown from '../components/Countdown.jsx'
import AxisFinder from '../components/AxisFinder.jsx'

export default function FreshFire() {
  return (
    <>
      <section
        className={`hero${event.heroImage ? ' hero--photo' : ''}`}
        style={event.heroImage ? { backgroundImage: `url("${event.heroImage}")` } : undefined}
      >
        <div className="hero__in">
          <p className="eyebrow">{event.series} {event.year} · {event.edition}</p>
          <h1>{event.theme}.</h1>
          <p className="lede">
            {event.dateLabel}. {event.venue}, Oniru. Doors {event.doors}, we start{' '}
            {event.starts}. Free entry — and a free bus from {axes.length} points across
            Lagos and Ogun.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--ember" href={event.registerUrl}
               target="_blank" rel="noopener noreferrer">
              Reserve your seat
            </a>
            <a className="btn btn--ghost" href="#find-my-bus">Find my bus</a>
            <a className="btn btn--ghost" href={event.mapUrl}
               target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </div>
          <div style={{ marginTop: 'var(--s5)' }}>
            <Countdown />
          </div>
        </div>
      </section>

      {/* The five facts everyone asks for, before anything else. */}
      <section className="band band--tight band--surface">
        <div className="shell">
          <div className="rules">
            <div className="rule">
              <h4>When</h4>
              <p className="mid">
                {event.dateLabel}. Doors open {event.doors}; we start {event.starts} and
                run to about 3:00pm.
              </p>
            </div>
            <div className="rule">
              <h4>Where</h4>
              <p className="mid">
                {event.venue}, {event.address}.{' '}
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </p>
            </div>
            <div className="rule">
              <h4>Cost</h4>
              <p className="mid">
                Nothing. Free entry, free transport, no ticket to buy and nothing collected
                at the door.
              </p>
            </div>
            <div className="rule">
              <h4>Getting there</h4>
              <p className="mid">
                Free coaches from {axes.length} pickup axes. Find yours below, reserve so
                your coordinator can count you, then{' '}
                <a href={event.busWhatsapp} target="_blank" rel="noopener noreferrer">
                  join the free bus WhatsApp group
                </a>{' '}
                — that’s where pickup points and departure times get posted.
              </p>
            </div>
            <div className="rule">
              <h4>Bring</h4>
              <p className="mid">
                Yourself, and a friend if you have one. That’s the whole list.
              </p>
            </div>
            <div className="rule">
              <h4>Registration</h4>
              <p className="mid">
                All on{' '}
                <a href={event.lumaUrl} target="_blank" rel="noopener noreferrer">
                  Luma
                </a>{' '}
                — {event.registeredCount}+ already registered. One list, one source
                of truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The flyer is the thing people actually forward. It appears here
          the moment `flyer` is set in src/data/site.js. */}
      {event.flyer && (
        <section className="band">
          <div className="shell grid2" style={{ alignItems: 'center' }}>
            <figure className="flyer">
              <img src={event.flyer} alt={event.flyerAlt} loading="lazy" />
              <figcaption>{event.theme} {event.year} · official flyer</figcaption>
            </figure>
            <div className="stack">
              <p className="eyebrow">Spread it</p>
              <h2>Send this to someone</h2>
              <p className="mid">
                Save the flyer and forward it, or send the link to this page —
                it carries the flyer, the date, the venue and every pickup point
                in one place, and it stays right when details change.
              </p>
              <div className="row-wrap">
                <a className="btn btn--ember" href={event.registerUrl}
                   target="_blank" rel="noopener noreferrer">
                  Reserve your seat
                </a>
                <a className="btn btn--ghost" href={event.flyer} download>
                  Save the flyer
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">Getting there</p>
            <h2>Find your pickup point</h2>
          </div>
          <AxisFinder />
        </div>
      </section>

      <section className="scripture">
        <div className="shell">
          <blockquote>“{event.scripture.text}”</blockquote>
          <cite>{event.scripture.ref} &nbsp;·&nbsp; also {event.scripture.also}</cite>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">Ministering</p>
            <h2>Who’s bringing the word</h2>
          </div>
          <div className="ministers">
            {ministers.map((m, i) => (
              <div className="minister" key={m.name}>
                <span className="minister__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.name}</h3>
                {m.returning && <span className="pill pill--ember">Returning</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinators are a real audience with a real job — give them
          their own door rather than burying the form in a footer. */}
      <section className="band band--surface">
        <div className="shell grid2">
          <div className="stack">
            <p className="eyebrow">Axis coordinators</p>
            <h2>Send in your headcount</h2>
            <p className="mid">
              If you’re running a pickup, your return is what decides how many coaches get
              hired for your axis. Send it in as soon as you have it, and update it if it moves.
            </p>
            <div className="row-wrap">
              <a className="btn btn--ember" href={event.coordinatorUrl}
                 target="_blank" rel="noopener noreferrer">
                Submit a headcount
              </a>
            </div>
          </div>
          <div className="notice">
            <strong>Not sure which axis you belong to?</strong>
            <span>
              Message {org.handle} on{' '}
              <a href={org.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>{' '}
              and we’ll sort it out before Saturday.
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
