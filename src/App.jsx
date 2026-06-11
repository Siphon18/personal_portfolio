import { useCallback, useEffect, useRef, useState } from 'react';
import { usePortfolioEffects } from './usePortfolioEffects';
import {
  stats,
  skillGroups,
  experienceBullets,
  projects,
  education,
  certifications,
  contactLinks,
  experienceChips,
} from './data/content';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResumeModal from './components/ResumeModal';
import Footer from './components/Footer';

function App() {
  const rootRef = useRef(null);
  const trailRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadFill, setLoadFill] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState('LOADING RESUME DATA…');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return (
      window.localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });

  const handleLoaded = useCallback(() => setLoaded(true), []);
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  );

  usePortfolioEffects({
    rootRef,
    trailRef,
    loaded,
    onLoaded: handleLoaded,
    setLoaderProgress: setLoadFill,
    setLoaderStatus,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div ref={rootRef} className="site">
      {/* Accessibility: skip link for keyboard users */}
      <a className="skip-link" href="#summary">
        Skip to content
      </a>

      <Loader loaded={loaded} loadFill={loadFill} loaderStatus={loaderStatus} />

      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="cursor-label" id="cursorLabel" />
      <canvas ref={trailRef} id="webTrail" aria-hidden="true" />
      <div className="mesh-gradient" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="halftone" />
      <div className="halftone-red" />
      <div className="progress">
        <span id="progFill" />
      </div>

      <div className="hud hud-tl">
        FULL-STACK DEVELOPER <b>ADITYA SINGH</b>
        <br />
        KATHUA, J&amp;K, INDIA
      </div>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="top">
        <div className="skew-wrap">
          <Hero onViewResume={openResume} />

          {/* ─── 01 Summary ─── */}
          <section id="summary">
            <div className="eyebrow reveal">01 — Summary</div>
            <h2 className="h2 flip3d">
              FULL-STACK <span className="accent">DEVELOPER</span>
            </h2>
            <div className="about-grid">
              <div className="about-text">
                <p className="reveal">
                  I'm a recent B.Tech graduate with hands-on project experience
                  across full-stack development, AI-integrated apps, and RAG
                  pipelines. I love turning concepts into practical, working applications
                  and exploring how different systems connect.
                </p>
                <p className="reveal">
                  From building real-time WebSocket apps to setting up containerized dev environments,
                  I enjoy getting my hands dirty, solving issues, and continuously adding new tools
                  to my stack.
                </p>
                <p className="quote reveal">
                  &ldquo;Learning is a continuous loop of building, understanding how things work, and refining my skills.&rdquo;
                </p>
              </div>
              <div className="stats reveal">
                {stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div
                      className="num"
                      data-count={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0
                    </div>
                    <div className="lbl">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 02 Skills ─── */}
          <section id="skills">
            <div className="eyebrow reveal">02 — Technical Skills</div>
            <h2 className="h2 flip3d">
              MY TECHNICAL <span className="accent">STACKS</span> &amp; TOOLS
            </h2>
            <div className="cards">
              {skillGroups.map((skill, index) => (
                <div className={`card hoverable reveal stagger-${index + 1}`} key={skill.title}>
                  <div className="badge">{skill.badge}</div>
                  <div className="glyph" aria-hidden="true">
                    ◆
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <div className="chip-row">
                    {skill.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 03 Experience ─── */}
          <section id="experience">
            <div className="eyebrow reveal">03 — Experience</div>
            <h2 className="h2 flip3d">
              INDUSTRY EXPERIENCE AT{' '}
              <span className="accent">WIPRO</span>
            </h2>
            <div className="steps">
              <div className="step reveal">
                <div className="no">01</div>
                <h4>Project Engineer</h4>
                <p>Wipro · Nov 2025 – Apr 2026 · Gurgaon, India</p>
              </div>
              <div className="card reveal">
                <div className="badge">RESPONSIBILITIES</div>
                <div className="glyph" aria-hidden="true">
                  ⚙
                </div>
                <h3>Delivery Highlights</h3>
                <ul className="card-list">
                  {experienceBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="chip-row">
                  {experienceChips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── 04 Projects ─── */}
          <section id="projects">
            <div className="eyebrow reveal">04 — Projects</div>
            <h2 className="h2 flip3d">
              FEATURED <span className="accent">PROJECTS</span> &amp; APPLICATIONS
            </h2>
            <div className="cards cards-2col">
              {projects.map((project) => (
                <div className="card hoverable reveal" key={project.title}>
                  <div className="badge">{project.badge}</div>
                  <div className="glyph" aria-hidden="true">
                    ▣
                  </div>
                  <h3>{project.title}</h3>
                  <p>
                    {project.period} · {project.body}
                  </p>
                  <ul className="card-list">
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="chip-row">
                    {project.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="project-link-row">
                    <a
                      className="project-link hoverable"
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      className="project-link hoverable"
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 05 Education ─── */}
          <section id="education">
            <div className="eyebrow reveal">
              05 — Education &amp; Certifications
            </div>
            <h2 className="h2 flip3d">
              EDUCATION &amp; <span className="accent">CERTIFICATIONS</span>
            </h2>
            <div className="about-grid">
              <div className="about-text">
                {education.map((item) => (
                  <div className="step reveal" key={item.title}>
                    <div className="no">ED</div>
                    <h4>{item.title}</h4>
                    <p>
                      {item.period} · {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="stats reveal">
                {certifications.map((cert, index) => (
                  <div className="stat" key={cert}>
                    <div className="num">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="lbl">{cert}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 06 Contact ─── */}
          <section id="contact" className="contact">
            <div className="eyebrow reveal center">06 — Contact</div>
            <h2 className="h2 flip3d">
              GET IN <span className="accent">TOUCH</span>
            </h2>
            <p className="hero-sub reveal center">
              Reach out for fresher-friendly roles, internships, or product
              engineering work.
            </p>
            <div className="mega-cta reveal">
              <a
                className="btn btn-primary hoverable magnetic"
                data-label="EMAIL ME"
                href={contactLinks.email}
              >
                <span className="dot" /> Email Aditya
              </a>
            </div>
            <div className="social-row reveal">
              <a
                className="social hoverable"
                href={contactLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 10v6M12 8v8M16 12v4" />
                </svg>
                LinkedIn
              </a>
              <a
                className="social hoverable"
                href={contactLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .2 1.8-.7 2.1-1.1.1-.7.4-1.2.7-1.4-2.3-.3-4.7-1.2-4.7-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3.1 1.1a10.8 10.8 0 0 1 5.6 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.8 1.1 3 0 4.2-2.4 5.1-4.7 5.4.4.4.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
                </svg>
                GitHub
              </a>
              <button
                className="social social-button hoverable"
                type="button"
                onClick={openResume}
                aria-label="View resume"
              >
                {/* Document icon (replaces incorrect chat-bubble SVG) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M6 2h9l5 5v15H6z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 13h6M9 17h4" />
                </svg>
                View Resume
              </button>
            </div>
          </section>
        </div>
      </main>

      <ResumeModal open={resumeOpen} onClose={closeResume} />
      <Footer />
    </div>
  );
}

export default App;