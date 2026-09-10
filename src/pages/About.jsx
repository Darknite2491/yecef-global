import { Link } from 'react-router-dom'
import { org, event, axes, editions, programmes } from '../data/site.js'

export default function About() {
  return (
    <>
      <section className="hero">
        <div className="hero__in">
          <img className="logo logo--dark" src="/images/yecef-logo-dark.png"
               alt={org.name} width="855" height="455"
               style={{ maxWidth: '300px', marginBottom: 'var(--s4)' }} />
          <img className="logo logo--light" src="/images/yecef-logo-light.png"
               alt="" aria-hidden="true" width="855" height="455"
               style={{ maxWidth: '300px', marginBottom: 'var(--s4)' }} />
          <p className="eyebrow">The foundation</p>
          <h1>The fare decides who shows up.</h1>
          <p className="lede">
            So we took it off the table. {org.name} exists to make sure a young person’s
            postcode and pocket never settle whether they get into the room.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="col stack">
            <h2>What YECEF is</h2>
            <p className="mid">
              {org.short} is a youth foundation based in Lagos, convened by{' '}
              {org.convener}. It runs one gathering a year — {event.series}, on the
              second Saturday of September, free to attend. It also buys JAMB forms
              for students who can’t afford to sit the exam, and provides for widows
              in the communities it works in.
            </p>
            <p className="mid">
              What makes it work isn’t the venue. It’s the network: {axes.length} pickup axes
              across Lagos and Ogun, each with its own coordinator who knows their
              neighbourhood, gathers a headcount, and puts people on a coach on Saturday
              morning. Nobody pays a fare, and nobody pays at the door.
            </p>
          </div>
        </div>
      </section>

      <section className="band band--surface">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">What we do</p>
            <h2>Three programmes</h2>
            <p className="mid">
              The September conference is the one people know about. The other two
              run quietly and cost real money.
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

      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">What we hold to</p>
            <h2>Three commitments, with the receipts</h2>
          </div>
          <div className="rules">
            <div className="rule">
              <h4>Access first</h4>
              <p className="mid">
                {axes.length} pickup axes across two states, free entry, doors at {event.doors}.
                <span className="dim"> The axis list is published in full — nothing hidden behind a DM.</span>
              </p>
            </div>
            <div className="rule">
              <h4>Youth-led, not youth-targeted</h4>
              <p className="mid">
                Coordinators, hosts and convener run it themselves, axis by axis.
                <span className="dim"> Named coordinators return headcounts from their own neighbourhoods.</span>
              </p>
            </div>
            <div className="rule">
              <h4>It keeps happening</h4>
              <p className="mid">
                A {editions.length}rd consecutive September, each in a larger venue.
                <span className="dim"> Every edition is archived with its theme, venue and ministers.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell grid2">
          <div className="stack">
            <p className="eyebrow">Who runs it</p>
            <h2>Convened by {org.convener}</h2>
            <p className="mid">
              With hosts and an axis-coordinator network that grows every year. If you want
              to run a pickup in your own area next September, that’s a real job and it’s
              open.
            </p>
            <div className="row-wrap">
              <Link className="btn btn--ember" to="/serve">Run an axis</Link>
              <Link className="btn btn--ghost" to="/editions">See past editions</Link>
            </div>
          </div>

          <div className="notice">
            <strong>Still to publish</strong>
            <span>
              Registration details, trustees and an annual account of how partner money is
              spent. They belong on this page — an NGO that publishes them is trusted faster
              than one that doesn’t.
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
