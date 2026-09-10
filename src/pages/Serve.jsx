import { org, event, axes } from '../data/site.js'

const ROLES = [
  {
    title: 'Axis coordinator',
    body:
      'Run the pickup for your own area: gather names, confirm the headcount, be at the junction on Saturday morning. This is how the whole thing works.',
  },
  {
    title: 'Registration desk',
    body:
      'First face anyone sees at Trinity House. Check people in, hand out anything being handed out, point people to seats.',
  },
  {
    title: 'Media',
    body:
      'Photos and video on the day. The archive on this site is only as good as what gets captured — and right now there is very little of it.',
  },
  {
    title: 'Ushering and welfare',
    body: 'Seating, aisles, water, and looking after anyone who needs looking after.',
  },
]

export default function Serve() {
  return (
    <>
      <section className="hero">
        <div className="hero__in">
          <p className="eyebrow">Volunteer</p>
          <h1>Somebody has to be at the junction.</h1>
          <p className="lede">
            {axes.length} axes run because {axes.length} people decided to run them. If you
            want the network in your area next September, this is where that starts.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--ember" href={org.instagram}
               target="_blank" rel="noopener noreferrer">
              Message {org.handle} to volunteer
            </a>
            <a className="btn btn--ghost" href={event.coordinatorUrl}
               target="_blank" rel="noopener noreferrer">
              Coordinator headcount form
            </a>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="sec-head">
            <p className="eyebrow">Roles</p>
            <h2>Four jobs that need doing</h2>
          </div>
          <div className="rules">
            {ROLES.map((r) => (
              <div className="rule" key={r.title}>
                <h4>{r.title}</h4>
                <p className="mid">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--surface">
        <div className="shell grid2" style={{ alignItems: 'start' }}>
          <div className="stack">
            <h2>What running an axis actually involves</h2>
            <ul className="checks mid">
              <li>Collect names from your area and get them registered.</li>
              <li>Send the headcount in, then update it when it moves.</li>
              <li>Agree a pickup landmark and a departure time, and tell everyone.</li>
              <li>Be there before the coach is, and count people on.</li>
              <li>Ride with them, and get everyone home afterwards.</li>
            </ul>
          </div>

          <div className="notice">
            <strong>Replace this with a real form.</strong>
            <span>
              Volunteering currently routes through Instagram DM. A short Google Form — name,
              phone, area, preferred role — feeding the same sheet as registration would give
              you a pipeline instead of a inbox. Paste its link into{' '}
              <span className="mono">src/data/site.js</span> and swap the button above.
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
