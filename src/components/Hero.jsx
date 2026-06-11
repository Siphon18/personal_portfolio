import { marqueeTop, marqueeBottom } from '../data/content';

export default function Hero({ onViewResume }) {
  return (
    <>
      <section className="hero">
        <div className="hero-tag" id="scrambleTag">
          // FULL-STACK DEVELOPER · AI-INTEGRATED APPS · RAG PIPELINES
        </div>
        <div className="h1-3d" id="h13d">
          <h1>
            <span className="row">
              <span className="t3d-ink">I BUILD</span>
            </span>
            <span className="row">
              <span className="t3d-red">SCALABLE</span>
            </span>
            <span className="row">
              <span className="t3d-blue">PRODUCTS.</span>
            </span>
          </h1>
        </div>
        <p className="hero-sub">
          Hi, I&rsquo;m <b>Aditya Singh</b> — a recent graduate and passionate full-stack developer who loves building web apps, exploring AI integration, and continuously learning new technologies.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary hoverable magnetic"
            data-label="VIEW WORK"
            href="#projects"
          >
            <span className="dot" /> View Projects
          </a>
          <button
            className="btn btn-ghost hoverable magnetic"
            data-label="SEE STACK"
            type="button"
            onClick={onViewResume}
          >
            View Resume ↓
          </button>
        </div>
        <div className="hero-meta">
          <div>REACT · FASTAPI · NEXT.JS</div>
          <div className="scroll-hint">
            <div className="wheel" />
            SCROLL TO EXPLORE
          </div>
          <div>DOCKER · RAG · WEB SOCKETS</div>
        </div>
      </section>

      {/* Marquee items duplicated for seamless CSS translateX(-50%) looping */}
      <div className="marquee m-fwd">
        <div className="marquee-track">
          {[...marqueeTop, ...marqueeTop].map((item, i) => (
            <span key={`t-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="marquee m-rev m2">
        <div className="marquee-track">
          {[...marqueeBottom, ...marqueeBottom].map((item, i) => (
            <span key={`b-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}
