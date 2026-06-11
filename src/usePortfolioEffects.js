import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOADER_STATUSES = [
  'SCANNING RESUME…',
  'INDEXING SKILLS…',
  'LOADING PROJECTS…',
  'PREPARING PORTFOLIO…',
  'READY!',
];

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01';

function scrambleText(element) {
  if (!element) return () => {};

  const original = element.dataset.original || element.textContent || '';
  element.dataset.original = original;
  let frame = 0;
  const total = 40;

  const timer = window.setInterval(() => {
    frame += 1;
    element.textContent = original
      .split('')
      .map((character, index) => {
        if (character === ' ') return ' ';
        if (index < (frame / total) * original.length) return character;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');

    if (frame >= total) {
      element.textContent = original;
      window.clearInterval(timer);
    }
  }, 30);

  return () => window.clearInterval(timer);
}

export function usePortfolioEffects({
  rootRef,
  trailRef,
  loaded,
  onLoaded,
  setLoaderProgress,
  setLoaderStatus,
}) {
  /* ── Loader progress simulation ── */
  useEffect(() => {
    let progress = 0;
    let statusIndex = 0;

    const timer = window.setInterval(() => {
      progress = Math.min(100, progress + Math.random() * 14);
      setLoaderProgress(progress);

      if (
        (progress / 100) * LOADER_STATUSES.length > statusIndex &&
        statusIndex < LOADER_STATUSES.length - 1
      ) {
        statusIndex += 1;
        setLoaderStatus(LOADER_STATUSES[statusIndex]);
      }

      if (progress >= 100) {
        window.clearInterval(timer);
        setLoaderStatus(LOADER_STATUSES[LOADER_STATUSES.length - 1]);
        window.setTimeout(() => onLoaded(), 400);
      }
    }, 110);

    return () => window.clearInterval(timer);
  }, [onLoaded, setLoaderProgress, setLoaderStatus]);

  /* ── Main effects (after loader finishes) ── */
  useEffect(() => {
    if (!loaded || !rootRef.current) return undefined;

    const root = rootRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    const cleanups = [];
    const addCleanup = (fn) => cleanups.push(fn);

    /* ── Hero entrance ── */
    const heroTitleSpans = root.querySelectorAll('.hero h1 .row span');
    const heroTag = root.querySelector('.hero-tag');
    const heroSub = root.querySelector('.hero-sub');
    const heroActions = root.querySelector('.hero-actions');
    const heroMeta = root.querySelector('.hero-meta');
    const scrambleTag = root.querySelector('#scrambleTag');

    const launch = gsap.timeline({ defaults: { ease: 'power4.out' } });
    launch
      .to(heroTitleSpans, {
        y: 0,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'back.out(1.4)',
      }, 0.2)
      .to(heroTag, { opacity: 1, duration: 1 }, 0.5)
      .to(heroSub, { opacity: 1, duration: 1 }, 1)
      .to(heroActions, { opacity: 1, duration: 1 }, 1.2)
      .to(heroMeta, { opacity: 1, duration: 1 }, 1.4);

    addCleanup(scrambleText(scrambleTag));

    /* ── Scroll reveals ── */
    root.querySelectorAll('.reveal:not(.cards .reveal)').forEach((element) => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      });
    });

    /* ── Staggered card grid reveals ── */
    root.querySelectorAll('.cards').forEach((grid) => {
      const cards = grid.querySelectorAll('.card.reveal');
      if (cards.length === 0) return;

      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          });
        },
      });
    });

    root.querySelectorAll('.flip3d').forEach((element) => {
      gsap.to(element, {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1.3,
        ease: 'back.out(1.5)',
        transformPerspective: 900,
        scrollTrigger: { trigger: element, start: 'top 86%' },
      });
    });

    /* ── Counter animation ── */
    root.querySelectorAll('.num[data-count]').forEach((element) => {
      const target = Number(element.dataset.count || 0);
      const suffix = element.dataset.suffix || '+';
      ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            element,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate() {
                element.textContent = `${Math.floor(
                  Number(element.textContent || '0'),
                )}${suffix}`;
              },
              onComplete() {
                element.textContent = `${target}${suffix}`;
              },
            },
          );
        },
      });
    });

    /* ── Velocity skew ── */
    const skewWrap = root.querySelector('.skew-wrap');
    if (skewWrap) {
      const skewSetter = gsap.quickSetter(skewWrap, 'skewY', 'deg');
      ScrollTrigger.create({
        onUpdate(self) {
          const value = Math.max(-4, Math.min(4, self.getVelocity() / -450));
          skewSetter(value);
          gsap.to(skewWrap, {
            skewY: 0,
            duration: 0.7,
            ease: 'power3.out',
            overwrite: true,
          });
        },
      });
    }

    /* ── Card 3D tilt ── */
    root.querySelectorAll('.card').forEach((card) => {
      const moveHandler = (event) => {
        const rect = card.getBoundingClientRect();
        const percentX = (event.clientX - rect.left) / rect.width;
        const percentY = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', `${percentX * 100}%`);
        card.style.setProperty('--my', `${percentY * 100}%`);
        gsap.to(card, {
          rotateY: (percentX - 0.5) * 16,
          rotateX: (0.5 - percentY) * 16,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      };

      const leaveHandler = () =>
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'elastic.out(1,.5)',
        });

      card.addEventListener('pointermove', moveHandler);
      card.addEventListener('pointerleave', leaveHandler);
      addCleanup(() => {
        card.removeEventListener('pointermove', moveHandler);
        card.removeEventListener('pointerleave', leaveHandler);
      });
    });

    /* ── Custom cursor + trail — skip on touch devices ── */
    if (!isTouchDevice) {
      const dot = root.querySelector('.cursor-dot');
      const ring = root.querySelector('.cursor-ring');
      const label = root.querySelector('#cursorLabel');
      let rx = 0;
      let ry = 0;
      let ringId;

      const handlePointerMove = (event) => {
        if (dot) {
          dot.style.transform = `translate(${event.clientX}px,${event.clientY}px) translate(-50%,-50%)`;
        }
        if (label) {
          label.style.left = `${event.clientX}px`;
          label.style.top = `${event.clientY}px`;
        }
        rx = event.clientX;
        ry = event.clientY;
      };

      const ringLoop = () => {
        if (ring) {
          const rect = ring.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          ring.style.transform = `translate(${cx + (rx - cx) * 0.18}px,${cy + (ry - cy) * 0.18}px) translate(-50%,-50%)`;
        }
        if (!reduceMotion) {
          ringId = requestAnimationFrame(ringLoop);
        }
      };

      const hoverTargets = root.querySelectorAll('.hoverable, a, button');
      const onEnter = (event) => {
        if (!ring) return;
        ring.classList.add('hovering');
        const target = event.currentTarget;
        if (label && target instanceof HTMLElement && target.dataset.label) {
          label.textContent = target.dataset.label;
          label.style.opacity = '1';
        }
      };

      const onLeave = () => {
        if (ring) ring.classList.remove('hovering');
        if (label) label.style.opacity = '0';
      };

      window.addEventListener('pointermove', handlePointerMove);
      hoverTargets.forEach((element) => {
        element.addEventListener('pointerenter', onEnter);
        element.addEventListener('pointerleave', onLeave);
      });
      ringId = requestAnimationFrame(ringLoop);

      addCleanup(() => {
        cancelAnimationFrame(ringId);
        window.removeEventListener('pointermove', handlePointerMove);
        hoverTargets.forEach((element) => {
          element.removeEventListener('pointerenter', onEnter);
          element.removeEventListener('pointerleave', onLeave);
        });
      });

      /* ── Magnetic buttons ── */
      root.querySelectorAll('.magnetic').forEach((button) => {
        const moveHandler = (event) => {
          const rect = button.getBoundingClientRect();
          gsap.to(button, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.32,
            y: (event.clientY - rect.top - rect.height / 2) * 0.32,
            duration: 0.4,
          });
        };

        const leaveHandler = () =>
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1,.4)',
          });

        button.addEventListener('pointermove', moveHandler);
        button.addEventListener('pointerleave', leaveHandler);
        addCleanup(() => {
          button.removeEventListener('pointermove', moveHandler);
          button.removeEventListener('pointerleave', leaveHandler);
        });
      });

      /* ── Cursor trail canvas ── */
      const trailCanvas = trailRef.current;
      if (trailCanvas) {
        const context = trailCanvas.getContext('2d');
        const trail = [];
        let drawId;

        const resizeTrail = () => {
          trailCanvas.width = window.innerWidth;
          trailCanvas.height = window.innerHeight;
        };

        const trailMove = (event) => {
          trail.unshift({ x: event.clientX, y: event.clientY });
          if (trail.length > 26) trail.pop();
        };

        const draw = () => {
          if (!context) return;
          context.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

          if (trail.length > 2 && !reduceMotion) {
            for (let i = 1; i < trail.length; i += 1) {
              const fade = 1 - i / trail.length;
              context.strokeStyle = `rgba(224,32,47,${fade * 0.5})`;
              context.lineWidth = fade * 3;
              context.beginPath();
              context.moveTo(trail[i - 1].x, trail[i - 1].y);
              context.lineTo(trail[i].x, trail[i].y);
              context.stroke();
            }
          }

          drawId = requestAnimationFrame(draw);
        };

        resizeTrail();
        window.addEventListener('resize', resizeTrail);
        window.addEventListener('pointermove', trailMove);
        drawId = requestAnimationFrame(draw);

        addCleanup(() => {
          cancelAnimationFrame(drawId);
          window.removeEventListener('resize', resizeTrail);
          window.removeEventListener('pointermove', trailMove);
        });
      }
    }

    /* ── Scroll progress (rAF-throttled) ── */
    const progressFill = root.querySelector('#progFill');
    let scrollRafId = null;

    const onScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const value = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
        if (progressFill) progressFill.style.width = `${value * 100}%`;
        scrollRafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    addCleanup(() => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    });
    onScroll();

    /* ── Master cleanup ── */
    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loaded, rootRef, trailRef]);
}