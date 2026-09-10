import { editions, event } from '../data/site.js'

export default function Editions() {
  return (
    <>
      <section className="hero">
        <div className="hero__in">
          <p className="eyebrow">Archive</p>
          <h1>Every September, on the record.</h1>
          <p className="lede">
            {event.series} has run on the second Saturday of September since 2024. Theme,
            venue and who ministered — kept here so the foundation’s history is readable by
            anyone, not only the people who were in the room.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell stack-lg">
          {editions.map((ed) => (
            <article key={ed.year} className="grid2" style={{ alignItems: 'start' }}>
              <div className="stack">
                <div className="row-wrap" style={{ alignItems: 'baseline' }}>
                  <span
                    className="edition__yr"
                    style={{ color: ed.upcoming ? 'var(--ember)' : 'var(--text)' }}
                  >
                    {ed.year}
                  </span>
                  {ed.upcoming && <span className="pill pill--ember">Coming up</span>}
                </div>
                <h2>{ed.theme || 'Theme to be added'}</h2>
                <div className="rules">
                  <div className="rule">
                    <h4>Date</h4>
                    <p className="mid">{ed.date}</p>
                  </div>
                  <div className="rule">
                    <h4>Venue</h4>
                    <p className="mid">{ed.venue || <span className="dim">To be added</span>}</p>
                  </div>
                  <div className="rule">
                    <h4>Ministered</h4>
                    <p className="mid">{ed.ministers.join(' · ')}</p>
                  </div>
                  {ed.scripture && (
                    <div className="rule">
                      <h4>Text</h4>
                      <p className="mid">{ed.scripture}</p>
                    </div>
                  )}
                  {ed.note && (
                    <div className="rule">
                      <h4>Note</h4>
                      <p className="mid">{ed.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {ed.photo ? (
                <div className="stack-sm">
                  <img
                    className="edition__photo"
                    src={ed.photo}
                    alt={`${ed.theme || 'YECEF'} ${ed.year}`}
                    loading="lazy"
                  />
                  {ed.photos?.length > 0 && (
                    <div className="gallery">
                      {ed.photos.map((p) => (
                        <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="edition__plate">
                  <span>
                    Drop your {ed.year} photos in
                    <br />
                    /public/images/ and add the
                    <br />
                    filename to src/data/site.js
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
