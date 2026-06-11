import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_SECTIONS, contactLinks } from '../data/content';

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navHidden, setNavHidden] = useState(false);
  const [navShadow, setNavShadow] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Track which section is in view */
  useEffect(() => {
    const observers = [];

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px' },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Hide on scroll-down, show on scroll-up */
  useEffect(() => {
    let rafId = null;
    let accumulated = 0;
    const HIDE_THRESHOLD = 60;  // px of sustained downward scroll to hide
    const SHOW_THRESHOLD = 30;  // px of sustained upward scroll to show

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (y <= 120) {
          // Near top — always show, reset
          setNavHidden(false);
          setNavShadow(false);
          accumulated = 0;
        } else {
          setNavShadow(true);

          // Accumulate in the current direction; reset on direction change
          if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0)) {
            accumulated = 0;
          }
          accumulated += delta;

          if (accumulated > HIDE_THRESHOLD) {
            setNavHidden(true);
          } else if (accumulated < -SHOW_THRESHOLD) {
            setNavHidden(false);
            accumulated = 0;
          }
        }

        lastScrollY.current = y;
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* Close mobile menu on Escape */
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  /* Theme wipe animation from toggle button */
  const handleThemeToggle = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Fire theme change first
      onToggleTheme();

      // Create wipe circle from the button position
      const wipe = document.createElement('div');
      wipe.className = 'theme-wipe';
      wipe.style.left = `${cx}px`;
      wipe.style.top = `${cy}px`;
      wipe.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(wipe);

      wipe.addEventListener('animationend', () => wipe.remove());
    },
    [onToggleTheme],
  );

  const navClasses = [
    navHidden && !menuOpen ? 'nav-hidden' : '',
    navShadow ? 'nav-shadow' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav ref={navRef} className={navClasses || undefined}>
      <a className="nav-logo hoverable" href="#top">
        ADITYA<span>.DEV</span>
      </a>

      <div className="nav-links">
        {NAV_SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            className={`hoverable${activeSection === id ? ' active' : ''}`}
            href={`#${id}`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button
          className="theme-toggle hoverable"
          type="button"
          onClick={handleThemeToggle}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <a className="nav-cta hoverable" href="#contact">
          Contact
        </a>
        <button
          className={`hamburger hoverable${menuOpen ? ' open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              className={`mobile-menu-link${activeSection === id ? ' active' : ''}`}
              href={`#${id}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <button
            className="mobile-menu-link"
            type="button"
            onClick={handleThemeToggle}
          >
            {theme === 'dark' ? '☀ Light mode' : '🌙 Dark mode'}
          </button>
          <a className="mobile-menu-link" href={contactLinks.email} onClick={closeMenu}>
            ✉ Contact
          </a>
        </div>
      )}
    </nav>
  );
}
