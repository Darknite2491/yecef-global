import { useState } from 'react'
import { giving, org, axes } from '../data/site.js'

const naira = (n) =>
  '₦' + Math.round(n).toLocaleString('en-NG')

export default function Give() {
  const perSeat = giving.coachCostNaira
    ? giving.coachCostNaira / giving.seatsPerCoach
    : null

  const tiers = perSeat
    ? [
        { seats: 1, amount: perSeat, label: 'One seat' },
        { seats: 5, amount: perSeat * 5, label: 'Five seats' },
        { seats: giving.seatsPerCoach, amount: giving.coachCostNaira, label: 'A whole coach' },
      ]
    : []

  const [picked, setPicked] = useState(0)

  return (
    <>
      <section className="hero">
        <div className="hero__in">
          <p className="eyebrow">Partner</p>
          <h1>One seat. One young person.</h1>
          <p className="lede">
            Entry is free and always will be. The cost that doesn’t disappear is the
            transport — {axes.length} coaches, fuel, drivers, both ways. That’s what
            partnering pays for.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell grid2" style={{ alignItems: 'start' }}>
          <div className="give-card">
            <div className="stack-sm">
              <p className="eyebrow">Give once</p>
              <h3>Put someone on a bus</h3>
            </div>

            {tiers.length > 0 ? (
              <>
                <div className="give-amounts">
                  {tiers.map((t, i) => (
                    <button
                      key={t.label}
                      className="give-amount"
                      aria-pressed={picked === i}
                      onClick={() => setPicked(i)}
                    >
                      <b>{naira(t.amount)}</b>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
                <a
                  className="btn btn--ember"
                  href={giving.paystackUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Give {naira(tiers[picked].amount)}
                </a>
                <p className="dim" style={{ fontSize: '0.85rem' }}>
                  Secured by Paystack. Card, transfer or USSD.
                </p>
              </>
            ) : (
              <div className="notice">
                <strong>This page needs one number before it goes live.</strong>
                <span>
                  Get the real cost of hiring one coach for one axis from a coordinator, put
                  it in <span className="mono">src/data/site.js</span> as{' '}
                  <span className="mono">coachCostNaira</span>, and these buttons appear with
                  true amounts. An ask tied to a real seat converts; “support our work”
                  doesn’t.
                </span>
              </div>
            )}

            {giving.bank.number && (
              <div className="stack-sm">
                <hr className="hr" />
                <p className="eyebrow">Or transfer directly</p>
                <p className="mono" style={{ fontSize: '0.92rem' }}>
                  {giving.bank.name}
                  <br />
                  {giving.bank.account}
                  <br />
                  {giving.bank.number}
                </p>
              </div>
            )}
          </div>

          <div className="stack">
            <h2>Where the money goes</h2>
            <div className="rules">
              <div className="rule">
                <h4>Coach hire</h4>
                <p className="mid">
                  One vehicle per axis, seating about {giving.seatsPerCoach}, hired for the day.
                </p>
              </div>
              <div className="rule">
                <h4>Fuel, both ways</h4>
                <p className="mid">
                  Out to Oniru in the morning and back to the junction in the afternoon.
                  Nobody is left to find their own way home.
                </p>
              </div>
              <div className="rule">
                <h4>Never the door</h4>
                <p className="mid">
                  Entry stays free whatever comes in. Partner money buys seats, not tickets.
                </p>
              </div>
            </div>

            <div className="notice">
              <strong>Publish the account.</strong>
              <span>
                After the event, put the number of coaches hired and what they cost on this
                page. Transparency of that kind is the cheapest trust a young foundation can
                buy — and it makes the second ask far easier than the first.
              </span>
            </div>

            <p className="mid" style={{ fontSize: '0.94rem' }}>
              Questions about partnering? Message {org.handle} on{' '}
              <a href={org.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
