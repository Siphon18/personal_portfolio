import { useEffect, useRef, useState } from 'react';
import {
  experienceBullets,
  projects,
  certifications,
  contactLinks,
  coreStack,
} from '../data/content';

export default function ResumeModal({ open, onClose }) {
  const bodyRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const updateProgress = () => {
      const el = bodyRef.current;
      if (!el) {
        setProgress(0);
        return;
      }
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.max(0, Math.min(100, (el.scrollTop / max) * 100)) : 100);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    /* Capture ref so cleanup uses the same element */
    const body = bodyRef.current;
    body?.addEventListener('scroll', updateProgress, { passive: true });
    requestAnimationFrame(updateProgress);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      body?.removeEventListener('scroll', updateProgress);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="resume-backdrop" role="presentation" onClick={onClose}>
      <div
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Resume preview"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-shell">
          <div className="resume-header">
            <div>
              <div className="resume-kicker">Resume Preview</div>
              <h3>Aditya Singh</h3>
            </div>
            <button className="resume-close" type="button" onClick={onClose}>
              Close
            </button>
            <div className="resume-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="resume-body" ref={bodyRef}>
            <section className="resume-card">
              <h4>Summary</h4>
              <p>
                Aspiring Full-Stack Developer and recent CSE graduate passionate about building
                web applications, AI integration, and realtime systems. Eager to learn, collaborate,
                and deliver clean, functional code.
              </p>
            </section>

            <section className="resume-card">
              <h4>Core Stack</h4>
              <div className="chip-row">
                {coreStack.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="resume-card">
              <h4>Experience</h4>
              <p className="resume-line">
                <b>Project Engineer, Wipro</b> · Nov 2025 – Apr 2026
              </p>
              <ul className="card-list">
                {experienceBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="resume-card grid-two">
              <div>
                <h4>Projects</h4>
                <p className="resume-line">
                  <b>Defense GPT</b> · Jan 2026
                </p>
                <p className="resume-mini">
                  RAG-based exam prep platform with multimodal streaming and
                  vector search.
                </p>
                <div className="resume-link-row">
                  <a
                    className="resume-link"
                    href={projects[0].links.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    className="resume-link"
                    href={projects[0].links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <p className="resume-line">
                  <b>DevChat</b> · Oct 2025
                </p>
                <p className="resume-mini">
                  Realtime collaboration platform with WebSockets and restricted
                  code execution.
                </p>
                <div className="resume-link-row">
                  <a
                    className="resume-link"
                    href={projects[1].links.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    className="resume-link"
                    href={projects[1].links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div>
                <h4>Education &amp; Certs</h4>
                <p className="resume-line">
                  <b>Chandigarh University</b> · B.Tech CSE
                </p>
                <p className="resume-mini">Aug 2021 – Jun 2025</p>
                <div className="resume-mini-list">
                  {certifications.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="resume-actions">
            <a
              className="btn btn-primary hoverable magnetic"
              href={contactLinks.resume}
              target="_blank"
              rel="noreferrer"
            >
              <span className="dot" /> Open PDF
            </a>
            <a className="btn btn-ghost hoverable magnetic" href={contactLinks.email}>
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
