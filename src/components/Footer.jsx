import { Link } from 'react-router-dom'
import { org, event } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__grid">
          <div className="logo-block">
            {/* Both variants ship; CSS shows the one that matches the theme. */}
            <img className="logo logo--dark" src="/images/yecef-logo-dark.png"
                 alt={org.name} width="855" height="455" />
            <img className="logo logo--light" src="/images/yecef-logo-light.png"
                 alt="" aria-hidden="true" width="855" height="455" />
            <p className="mid" style={{ fontSize: '0.94rem', maxWidth: '32ch' }}>
              One free conference a year, and a free bus to get you there.
            </p>
            <p className="mono dim" style={{ fontSize: '0.72rem', marginTop: '0.4rem' }}>
              Convened by {org.convener}
            </p>
          </div>

          <div>
            <h4>The foundation</h4>
            <ul>
              <li><Link to="/about">About YECEF</Link></li>
              <li><Link to="/editions">Past editions</Link></li>
              <li><Link to="/serve">Volunteer</Link></li>
              <li><Link to="/give">Partner with us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Fresh Fire 2026</h4>
            <ul>
              <li><Link to="/fresh-fire">Event details</Link></li>
              <li>
                <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
                  Reserve a seat
                </a>
              </li>
              <li>
                <a href={event.coordinatorUrl} target="_blank" rel="noopener noreferrer">
                  Coordinator headcount
                </a>
              </li>
              <li>
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                  Directions to the venue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Reach us</h4>
            <ul>
              <li>
                <a href={org.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram {org.handle}
                </a>
              </li>
              {/* Each renders only when a real URL is set in site.js, so the
                  footer never ships a link that 404s. */}
              {org.facebook && (
                <li><a href={org.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              )}
              {org.youtube && (
                <li><a href={org.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
              )}
              {org.tiktok && (
                <li><a href={org.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
              )}
              {org.x && (
                <li><a href={org.x} target="_blank" rel="noopener noreferrer">X</a></li>
              )}
              {org.linkedin && (
                <li><a href={org.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              )}
              {org.email && <li><a href={`mailto:${org.email}`}>{org.email}</a></li>}
              {org.whatsapp && (
                <li>
                  <a href={`https://wa.me/${org.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="foot__base">
          <span>© {new Date().getFullYear()} {org.short}. Lagos, Nigeria.</span>
          <span className="mono">
            {org.cacNumber ? `RC ${org.cacNumber}` : 'Free entry. Free buses. Always.'}
          </span>
        </div>
      </div>
    </footer>
  )
}
