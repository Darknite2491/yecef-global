import { useState, useEffect, useRef, useMemo } from 'react'
import { axes, event, org, desk } from '../data/site.js'

/* ═══════════════════════════════════════════════════════════════
   ON-SITE REGISTRATION DESK  ·  /desk

   Built for a volunteer standing at a table with a queue in front of
   them and a phone in one hand. Three rules shaped every decision:

   1. IT MUST WORK WITH NO NETWORK. Every entry is written to this
      device immediately. Sending to the sheet is a separate, retrying
      background job. Losing a person because Oniru had no signal is
      not an acceptable failure.
   2. THE NEXT PERSON IS ALWAYS ONE TAP AWAY. Save clears the form and
      puts the cursor back in the name field. No dialogs, no scrolling.
   3. NOTHING IS EVER ONLY IN ONE PLACE. Export CSV works offline, so a
      volunteer can hand over their entries even if sync never runs.
   ═══════════════════════════════════════════════════════════════ */

const LS_KEY = 'yecef.desk.entries.v1'
const LS_VOL = 'yecef.desk.volunteer.v1'

const BLANK = { name: '', phone: '', gender: '', age: '', axis: '', first: '', notes: '' }

function load() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  } catch {
    return []
  }
}

function save(rows) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows))
  } catch {
    /* private mode / quota — the in-memory list still works for this session */
  }
}

/** Nigerian numbers: strip spaces and punctuation, keep a leading + */
function tidyPhone(v) {
  const t = v.replace(/[^\d+]/g, '')
  return t.startsWith('+') ? '+' + t.slice(1).replace(/\+/g, '') : t.replace(/\+/g, '')
}

function phoneLooksWrong(v) {
  const d = v.replace(/\D/g, '')
  return d.length < 10 || d.length > 14
}

function toCSV(rows) {
  const head = ['Saved at', 'Name', 'Phone', 'Gender', 'Age', 'Area / axis', 'First time', 'Notes', 'Volunteer', 'Synced']
  const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`
  const body = rows.map((r) =>
    [new Date(r.at).toLocaleString('en-NG'), r.name, r.phone, r.gender, r.age,
     r.axis, r.first, r.notes, r.volunteer, r.synced ? 'yes' : 'no'].map(esc).join(','))
  return [head.map(esc).join(','), ...body].join('\r\n')
}

export default function Desk() {
  const [unlocked, setUnlocked] = useState(!desk.pin)
  const [pin, setPin] = useState('')
  const [volunteer, setVolunteer] = useState(() => {
    try { return localStorage.getItem(LS_VOL) || '' } catch { return '' }
  })
  const [form, setForm] = useState(BLANK)
  const [rows, setRows] = useState(load)
  const [toast, setToast] = useState('')
  const [online, setOnline] = useState(() => navigator.onLine)
  const [syncing, setSyncing] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => { save(rows) }, [rows])
  useEffect(() => { try { localStorage.setItem(LS_VOL, volunteer) } catch {} }, [volunteer])

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  const pending = useMemo(() => rows.filter((r) => !r.synced), [rows])

  // ── Background sync. Only runs if an endpoint is configured; the desk
  //    is fully usable without one.
  async function flush() {
    if (!desk.endpoint || !online || syncing || pending.length === 0) return
    setSyncing(true)
    try {
      for (const r of pending) {
        // no-cors: Apps Script web apps don't send CORS headers. We can't
        // read the response, so we treat a resolved request as delivered —
        // and the CSV export remains the belt-and-braces copy.
        await fetch(desk.endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(r),
        })
        setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, synced: true } : x)))
      }
    } catch {
      /* stays pending, retried on the next tick */
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    flush()
    const t = setInterval(flush, 20000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, rows.length])

  function say(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) { nameRef.current?.focus(); return say('Name is needed') }
    if (!form.phone.trim()) return say('Phone number is needed')

    const entry = {
      ...form,
      name: form.name.trim().replace(/\s+/g, ' '),
      phone: tidyPhone(form.phone),
      volunteer: volunteer.trim(),
      event: `${event.theme} ${event.year}`,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      at: Date.now(),
      synced: false,
    }
    setRows((prev) => [entry, ...prev])
    setForm(BLANK)
    nameRef.current?.focus()
    say(`Saved · ${rows.length + 1} today`)
  }

  function remove(id) {
    setRows((prev) => prev.filter((r) => r.id !== id))
    say('Removed')
  }

  function exportCSV() {
    const blob = new Blob([toCSV(rows)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `yecef-desk-${volunteer.trim().replace(/\W+/g, '-') || 'entries'}-${new Date()
      .toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  async function copyCSV() {
    try {
      await navigator.clipboard.writeText(toCSV(rows))
      say('Copied — paste into WhatsApp or the sheet')
    } catch {
      say('Could not copy. Use Export CSV instead.')
    }
  }

  /* ── PIN gate. Not security — it just stops a stranger who finds the
        URL from filling your sheet with nonsense. ── */
  if (!unlocked) {
    return (
      <section className="band">
        <div className="shell" style={{ maxWidth: '26rem' }}>
          <div className="sec-head">
            <p className="eyebrow">Registration desk</p>
            <h2>Enter the desk code</h2>
            <p className="mid">Ask the coordinator for today’s code.</p>
          </div>
          <form
            className="stack"
            onSubmit={(e) => {
              e.preventDefault()
              if (pin.trim() === String(desk.pin)) setUnlocked(true)
              else say('Wrong code')
            }}
          >
            <input className="finder__input" type="text" inputMode="numeric"
                   value={pin} onChange={(e) => setPin(e.target.value)}
                   placeholder="Desk code" autoFocus />
            <button className="btn btn--ember" type="submit">Open the desk</button>
          </form>
          {toast && <p className="desk__toast" role="status">{toast}</p>}
        </div>
      </section>
    )
  }

  return (
    <section className="band band--tight">
      <div className="shell desk">
        {/* ── Status bar: the volunteer must always know if it's saving ── */}
        <div className="desk__bar">
          <div className="desk__count">
            <b>{rows.length}</b>
            <span>registered on this phone</span>
          </div>
          <div className="row-wrap" style={{ alignItems: 'center' }}>
            <span className={`pill ${online ? 'pill--ok' : 'pill--ember'}`}>
              {online ? 'Online' : 'Offline — still saving'}
            </span>
            {desk.endpoint && (
              <span className="pill">
                {syncing ? 'Sending…' : pending.length ? `${pending.length} to send` : 'All sent'}
              </span>
            )}
          </div>
        </div>

        <div className="desk__grid">
          {/* ── The form ── */}
          <form className="desk__form" onSubmit={submit}>
            <div className="sec-head" style={{ marginBottom: 'var(--s2)' }}>
              <p className="eyebrow">On-site registration</p>
              <h2>Add a person</h2>
              <p className="mid" style={{ fontSize: '.94rem' }}>
                You type, they don’t have to. Read the phone number back before you save.
              </p>
            </div>

            <label className="desk__f">
              <span>Volunteer at this desk</span>
              <input value={volunteer} onChange={(e) => setVolunteer(e.target.value)}
                     placeholder="Your name" autoComplete="off" />
            </label>

            <label className="desk__f">
              <span>Full name <b>*</b></span>
              <input ref={nameRef} value={form.name} autoFocus autoComplete="off"
                     onChange={(e) => setForm({ ...form, name: e.target.value })}
                     placeholder="Surname first" />
            </label>

            <label className="desk__f">
              <span>Phone <b>*</b></span>
              <input value={form.phone} type="tel" inputMode="tel" autoComplete="off"
                     onChange={(e) => setForm({ ...form, phone: e.target.value })}
                     placeholder="0801 234 5678" />
              {form.phone && phoneLooksWrong(form.phone) && (
                <em className="desk__warn">That doesn’t look like a full number — check it.</em>
              )}
            </label>

            <div className="desk__row">
              <label className="desk__f">
                <span>Gender</span>
                <div className="desk__seg">
                  {['M', 'F'].map((g) => (
                    <button key={g} type="button"
                            aria-pressed={form.gender === g}
                            onClick={() => setForm({ ...form, gender: form.gender === g ? '' : g })}>
                      {g}
                    </button>
                  ))}
                </div>
              </label>
              <label className="desk__f">
                <span>Age</span>
                <input value={form.age} type="number" inputMode="numeric" min="1" max="120"
                       onChange={(e) => setForm({ ...form, age: e.target.value })}
                       placeholder="—" />
              </label>
              <label className="desk__f">
                <span>First time?</span>
                <div className="desk__seg">
                  {['Yes', 'No'].map((v) => (
                    <button key={v} type="button"
                            aria-pressed={form.first === v}
                            onClick={() => setForm({ ...form, first: form.first === v ? '' : v })}>
                      {v}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <label className="desk__f">
              <span>Area / bus axis</span>
              <select value={form.axis} onChange={(e) => setForm({ ...form, axis: e.target.value })}>
                <option value="">— select —</option>
                {axes.map((a) => (
                  <option key={a.id} value={a.name}>
                    {String(a.id).padStart(2, '0')} · {a.name}
                  </option>
                ))}
                <option value="Came on their own">Came on their own</option>
              </select>
            </label>

            <label className="desk__f">
              <span>Notes</span>
              <input value={form.notes} autoComplete="off"
                     onChange={(e) => setForm({ ...form, notes: e.target.value })}
                     placeholder="Needs a seat home, came with a friend…" />
            </label>

            <button className="btn btn--ember desk__save" type="submit">
              Save &amp; next person
            </button>
          </form>

          {/* ── Recent entries + export ── */}
          <div className="desk__side">
            <div className="stack-sm">
              <h3>Just added</h3>
              {rows.length === 0 ? (
                <p className="dim" style={{ fontSize: '.92rem' }}>
                  Nothing yet. The first person you save appears here.
                </p>
              ) : (
                <ul className="desk__recent">
                  {rows.slice(0, 6).map((r) => (
                    <li key={r.id}>
                      <div>
                        <b>{r.name}</b>
                        <span className="mono">{r.phone}</span>
                        {r.axis && <span className="dim"> · {r.axis}</span>}
                      </div>
                      <button type="button" onClick={() => remove(r.id)}
                              aria-label={`Remove ${r.name}`}>Undo</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="notice">
              <strong>Before you leave the desk</strong>
              <span>
                Export the CSV and send it to the data desk — even if everything says
                “All sent”. Two copies, always.
              </span>
            </div>

            <div className="row-wrap">
              <button className="btn btn--core btn--sm" type="button" onClick={exportCSV}
                      disabled={!rows.length}>
                Export CSV
              </button>
              <button className="btn btn--ghost btn--sm" type="button" onClick={copyCSV}
                      disabled={!rows.length}>
                Copy all
              </button>
            </div>

            <p className="dim" style={{ fontSize: '.8rem' }}>
              Entries are stored on this phone only. Don’t clear your browser data before
              exporting. Questions: {org.handle}.
            </p>
          </div>
        </div>

        {toast && <p className="desk__toast" role="status" aria-live="polite">{toast}</p>}
      </div>
    </section>
  )
}
