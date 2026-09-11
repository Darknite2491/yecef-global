import { Link } from 'react-router-dom'
import { org, mentors, mentoring, event } from '../data/site.js'

/* The mentoring track. The conference is one loud day; this is the
   part that runs in the months between, and it lives or dies on one
   thing — whether a young person can see a real face and know exactly
   how to reach them. So: photos, plain areas of help, and a single
   obvious way in. */

function Mentor({ m }) {
  const reach = m.instagram || (m.email ? `mailto:${m.email}` : null)
  return (
    <article className="mentor">
      {m.photo ? (
        <img className="mentor__photo" src={m.photo}
             alt={`${m.knownAs || m.name}, mentor`} loading="lazy" />
      ) : (
        <div className="mentor__photo mentor__photo--none" aria-hidden="true" />
      )}
      <div className="mentor__body">
        <h3>{m.knownAs || m.name}</h3>
        {m.knownAs && <p className="mentor__real">{m.name}</p>}
        <p className="mentor__role">{m.role}</p>
        {m.bio && <p className="mid" style={{ fontSize: '.94rem' }}>{m.bio}</p>}

        {m.areas?.length > 0 && (
          <ul className="mentor__areas">
            {m.areas.map((a) => <li key={a}>{a}</li>)}
          </ul>
        )}

        <div className="row-wrap" style={{ marginTop: 'auto' }}>
          {reach && (
            <a className="btn btn--core btn--sm" href={reach}
               target="_blank" rel="noopener noreferrer">
              Reach {(m.knownAs || m.name).split(' ')[0]}
            </a>
          )}
          {m.phone && (
            <a className="btn btn--ghost btn--sm" href={`tel:${m.phone.replace(/\s/g, '')}`}>
              {m.phone}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Mentorship() {
  const signup = mentoring.signupUrl || org.instagram

  return (
    <>
      <section
        className="hero hero--photo"
        style={{ backgroundImage: "url('/images/mentorship-hero.jpg')" }}
      >
        <div className="hero__in">
          <p className="eyebrow">Mentoring · {mentoring.cadence}</p>
          <h1>Nobody figures it out <em>alone</em>.</h1>
          <p className="lede">
            One Saturday a year fills a hall. The other fifty-one are where the
            decisions actually get made — so four times a year we put young people
            in a room with someone a few steps ahead of them.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--ember" href={signup}
               target="_blank" rel="noopener noreferrer">
              Ask for a mentor
            </a>
            <a className="btn btn--ghost" href="#mentors">Meet the mentors</a>
          </div>
        </div>
      </section>

      {/* What it actually is — said plainly, because "mentorship
          programme" means nothing to a 19-year-old. */}
      <section className="band band--surface">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">What it is</p>
            <h2>A small room and a straight answer</h2>
          </div>
          <div className="rules">
            <div className="rule">
              <h4>Four times a year</h4>
              <p className="mid">
                {mentoring.nextDate
                  ? <>Next session: <strong>{mentoring.nextDate}</strong>
                      {mentoring.nextVenue && <> · {mentoring.nextVenue}</>}.</>
                  : <>Dates are set a quarter ahead and announced on{' '}
                      <a href={org.instagram} target="_blank" rel="noopener noreferrer">
                        {org.handle}
                      </a>.</>}
              </p>
            </div>
            <div className="rule">
              <h4>Small groups</h4>
              <p className="mid">
                Not a lecture and not a stage. Few enough people that you can ask the
                thing you actually came to ask.
              </p>
            </div>
            <div className="rule">
              <h4>Free</h4>
              <p className="mid">
                Like everything else here. If getting there is the problem, say so when
                you sign up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you can bring */}
      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">Bring anything</p>
            <h2>Things people actually ask about</h2>
            <p className="mid">
              You don’t need a polished question. These are the ones that come up most.
            </p>
          </div>
          <ul className="topics">
            {mentoring.topics.map((t, i) => (
              <li key={t}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The mentors */}
      <section className="band band--surface" id="mentors">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">The bench</p>
            <h2>Who you’ll be sitting with</h2>
            <p className="mid">
              Real people with real jobs, who have agreed to answer honestly.
            </p>
          </div>

          <div className="mentors">
            {mentors.map((m) => <Mentor key={m.id} m={m} />)}
          </div>

          {mentors.length < 3 && (
            <div className="notice" style={{ marginTop: 'var(--s4)' }}>
              <strong>More mentors joining.</strong>
              <span>
                If you work in something a young person would want to ask about —
                a trade, a profession, a business you built —{' '}
                <Link to="/serve">put your name forward</Link>.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* The ask */}
      <section className="band">
        <div className="shell grid2">
          <div className="stack">
            <p className="eyebrow">Get started</p>
            <h2>Ask for a mentor</h2>
            <p className="mid">
              Tell us what you’re trying to figure out and roughly where you are. We’ll
              match you to someone and tell you when the next session is.
            </p>
            <div className="row-wrap">
              <a className="btn btn--ember" href={signup}
                 target="_blank" rel="noopener noreferrer">
                {mentoring.signupUrl ? 'Request a mentor' : `Message ${org.handle}`}
              </a>
              <Link className="btn btn--ghost" to="/serve">Become a mentor</Link>
            </div>
          </div>
          <div className="stack">
            <div className="notice">
              <strong>Coming to {event.theme} first?</strong>
              <span>
                Find the mentoring table on the day and put your name down there — it’s
                the fastest way in.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
