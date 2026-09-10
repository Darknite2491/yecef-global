import { Link } from 'react-router-dom'
import {
  org, event, ministers, axes, editions, giving, programmes, eventIsPast,
} from '../data/site.js'
import Countdown from '../components/Countdown.jsx'
import AxisFinder from '../components/AxisFinder.jsx'

/* ── 01 · Hero ─────────────────────────────────────────────────
   Two versions, switched by the clock. Until Fresh Fire ends the page
   leads with the event; from Sunday it leads with the foundation and
   the event drops back to /fresh-fire. Nobody has to remember to
   change it on the day. */
function Hero({ past }) {
  const photo = event.heroImage
  return (
    <section
      className={`hero${photo ? ' hero--photo' : ''}`}
      style={photo ? { backgroundImage: `url("${photo}")` } : undefined}
    >
      <div className="hero__in">
        {past ? (
          <>
            <p className="eyebrow">{org.short}</p>
            <h1>We bring the bus to your <em>junction</em>.</h1>
            <p className="lede">
              A youth foundation in Lagos that runs one free conference a year,
              buys JAMB forms for students who can’t, and provides for widows in
              the communities it works in.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--ember" to="/give">Partner with us</Link>
              <Link className="btn btn--ghost" to="/editions">See what we’ve done</Link>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">{event.series} · {event.edition}</p>
            <h1>We bring the bus to your <em>junction</em>.</h1>
            <p className="lede">
              {org.short} runs one free conference a year and makes sure the fare
              is never the reason a young person misses it. This year it’s{' '}
              {event.theme} — {event.dateLabel}, at {event.venue}, Oniru.
            </p>

            <div className="hero__ctas">
              <a className="btn btn--ember" href={event.registerUrl}
                 target="_blank" rel="noopener noreferrer">
                Reserve your seat
              </a>
              <a className="btn btn--ghost" href="#find-my-bus">Find my bus</a>
            </div>

            <div style={{ marginTop: 'var(--s5)' }}>
              <Countdown />
            </div>

            <dl className="hero__meta">
              <div><dt>Doors</dt><dd>{event.doors}</dd></div>
              <div><dt>Starts</dt><dd>{event.starts}</dd></div>
              <div><dt>Entry</dt><dd>Free</dd></div>
              <div><dt>Pickup axes</dt><dd>{axes.length} across Lagos &amp; Ogun</dd></div>
              <div><dt>Registered</dt><dd>{event.registeredCount}+ so far</dd></div>
            </dl>
          </>
        )}
      </div>
    </section>
  )
}

/* ── The bus promise: the most distinctive thing YECEF does. ── */
function BusPromise() {
  return (
    <section className="band promise">
      <div className="shell promise__grid">
        <div className="stack">
          <p className="eyebrow">Why nobody pays</p>
          <p className="promise__big">Thirteen axes.<br /><em>No fare.</em></p>
          <p className="mid col">
            From Sango Ota to Bariga, a coach leaves your area on Saturday morning
            and brings you back. You don’t pay for the seat, the ride, or anything
            at the door. Transport cost decides who gets to show up — so we took it
            off the table.
          </p>
          <div className="row-wrap" style={{ marginTop: 'var(--s1)' }}>
            <a className="btn btn--core" href="#find-my-bus">
              See all {axes.length} pickup points
            </a>
          </div>
        </div>

        <ul className="axis-grid">
          {axes.map((a) => (
            <li key={a.id}>
              <b>{String(a.id).padStart(2, '0')}</b>
              {a.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── What the foundation does all year, not just in September. ── */
function Programmes({ past }) {
  return (
    <section className={`band${past ? '' : ' band--surface'}`}>
      <div className="shell">
        <div className="sec-head">
          <p className="eyebrow">What we do</p>
          <h2>Three things, all year</h2>
          <p className="mid">
            The conference is the loudest thing YECEF does. It isn’t the only thing.
          </p>
        </div>

        <div className="progs">
          {programmes.map((p) => (
            <article className="prog" key={p.id}>
              <div className="prog__head">
                <h3 className="prog__name">{p.name}</h3>
                {p.stat
                  ? <span className="prog__stat">{p.stat}</span>
                  : <span className="prog__stat prog__stat--tbc">Ongoing</span>}
              </div>
              <div className="prog__body">
                <p>{p.body}</p>
                {p.link && (
                  <Link className="btn btn--ghost btn--sm" to={p.link}>
                    {p.linkLabel || 'Read more'}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ministers() {
  return (
    <section className="band">
      <div className="shell">
        <div className="sec-head">
          <p className="eyebrow">Ministering</p>
          <h2>Seven voices, one morning</h2>
          <p className="mid">
            Two of them have been with us across editions — the lineup isn’t
            assembled from scratch each year.
          </p>
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
  )
}

export default function Home() {
  const past = eventIsPast()

  return (
    <>
      <Hero past={past} />

      {!past && <BusPromise />}

      {/* The finder is the one real interactive object on the page. */}
      {!past && (
        <section className="band">
          <div className="shell">
            <div className="sec-head">
              <p className="eyebrow">Getting there</p>
              <h2>Which bus is yours?</h2>
              <p className="mid">
                Every axis has a coordinator who runs the pickup for their own
                neighbourhood. Find yours, then reserve — the headcount is what
                tells us how many coaches to hire.
              </p>
            </div>
            <AxisFinder />
          </div>
        </section>
      )}

      <Programmes past={past} />

      {!past && <Ministers />}

      {/* The one purely typographic moment — the logo's gradient at page
          scale. Everything around it stays quiet so it can carry. */}
      <section className="scripture">
        <div className="shell">
          <blockquote>“{event.scripture.text}”</blockquote>
          <cite>
            {event.scripture.ref} &nbsp;·&nbsp; {event.theme} draws also on{' '}
            {event.scripture.also}
          </cite>
        </div>
      </section>

      {/* Credibility without adjectives. */}
      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">The record</p>
            <h2>Three Septembers running</h2>
            <p className="mid">
              Second Saturday of September, every year, in a bigger hall each time.
            </p>
          </div>

          <div className="editions">
            {editions.map((ed) => (
              <article className={`edition${ed.upcoming && !past ? ' edition--now' : ''}`} key={ed.year}>
                <span className="edition__yr">{ed.year}</span>
                {ed.photo ? (
                  <img className="edition__photo" src={ed.photo}
                       alt={`${ed.theme || 'YECEF'} ${ed.year}`} loading="lazy" />
                ) : (
                  <div className="edition__plate">
                    <span>Photo from<br />{ed.year} goes here</span>
                  </div>
                )}
                <dl>
                  <dt>Theme</dt>
                  <dd>{ed.theme || 'To be added'}</dd>
                  <dt>Venue</dt>
                  <dd>{ed.venue || 'To be added'}</dd>
                </dl>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'var(--s4)' }}>
            <Link className="btn btn--ghost" to="/editions">Open the full archive</Link>
          </div>
        </div>
      </section>

      {/* The ask. One thing on this band, nothing else. */}
      <section className="band band--surface">
        <div className="shell grid2">
          <div className="stack">
            <p className="eyebrow">Partner with us</p>
            <h2>One seat. One young person.</h2>
            <p className="mid">
              A coach from one axis carries about {giving.seatsPerCoach}. Partnering
              covers the hire, the fuel and the return trip — so a coordinator in
              Odogunyan never has to turn anyone away for space.
            </p>
            <div className="row-wrap">
              <Link className="btn btn--ember" to="/give">Partner with a bus</Link>
              <Link className="btn btn--ghost" to="/serve">Volunteer instead</Link>
            </div>
          </div>
          <div className="stack">
            <div className="rules">
              <div className="rule">
                <h4>{axes.length} axes</h4>
                <p className="mid">Every one needs a coach, a driver and fuel both ways.</p>
              </div>
              <div className="rule">
                <h4>{event.registeredCount}+ registered</h4>
                <p className="mid">
                  {past ? 'At the last edition.' : 'And registration is still open until the doors.'}
                </p>
              </div>
              <div className="rule">
                <h4>₦0 at the door</h4>
                <p className="mid">No ticket, no offering requirement, no exceptions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
