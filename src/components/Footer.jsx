export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div>© 2026 ADITYA SINGH · FULL-STACK DEVELOPER</div>
      <div className="footer-links">
        <a href="#summary">Summary</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="mailto:adityachengaria043@gmail.com">Email</a>
      </div>
      <div className="footer-right">
        <span>BUILT WITH REACT + GSAP ♥</span>
        <button
          className="back-to-top hoverable"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑ TOP
        </button>
      </div>
    </footer>
  );
}
