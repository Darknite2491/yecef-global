import { useState, useEffect } from 'react'
import { event } from '../data/site.js'

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export default function Countdown() {
  const target = new Date(event.startsAt).getTime()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = target - now

  // After the event, the countdown stops being a countdown rather than
  // showing a wall of zeros — the page demotes itself automatically.
  if (remaining <= 0) {
    return (
      <div className="countdown countdown--past">
        <div className="countdown__unit" style={{ minWidth: 'auto' }}>
          <span className="countdown__n">{event.theme} has happened</span>
          <span className="countdown__l">See it in the editions archive</span>
        </div>
      </div>
    )
  }

  const { days, hours, minutes, seconds } = parts(remaining)
  const units = [
    { n: days, l: days === 1 ? 'day' : 'days' },
    { n: hours, l: 'hrs' },
    { n: minutes, l: 'min' },
    { n: seconds, l: 'sec' },
  ]

  return (
    <div className="countdown" role="timer" aria-live="off"
         aria-label={`${days} days, ${hours} hours and ${minutes} minutes until ${event.theme}`}>
      {units.map((u) => (
        <div className="countdown__unit" key={u.l}>
          <span className="countdown__n">{String(u.n).padStart(2, '0')}</span>
          <span className="countdown__l">{u.l}</span>
        </div>
      ))}
    </div>
  )
}
