// ============================================================
// AMC SANDARUWAN — PREMIUM PORTFOLIO INTERACTION ENGINE
// Smooth, Responsive, Robust & Fault-Tolerant
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- 1. LOADER DISMISSAL ---------- */
  const loader = document.getElementById('loader');
  const dismissLoader = () => {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
    }
  };

  window.addEventListener('load', () => setTimeout(dismissLoader, 300));
  setTimeout(dismissLoader, 1600); // Safety fallback

  /* ---------- 2. CUSTOM CURSOR (DESKTOP MOUSE ONLY) ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactiveSelectors = 'a, button, .glass-card, input, textarea, .tab-btn, .filter-btn, .chip';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = 'rgba(56, 189, 248, 0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      });
    });
  }

  /* ---------- 2.5. LIGHTWEIGHT POINTER DEPTH (DESKTOP ONLY) ---------- */
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!motionPreference.matches && finePointer.matches) {
    document.querySelectorAll('[data-tilt], .project-card').forEach(card => {
      let frame = 0;

      card.addEventListener('pointermove', event => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const bounds = card.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
          const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
          const tiltX = (0.5 - y) * 5;
          const tiltY = (x - 0.5) * 7;

          card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
          card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);

          const heroVisual = card.closest('.hero-visual');
          if (heroVisual) {
            heroVisual.style.setProperty('--orbit-x', `${((0.5 - x) * 12).toFixed(1)}px`);
            heroVisual.style.setProperty('--orbit-y', `${((0.5 - y) * 12).toFixed(1)}px`);
          }
        });
      });

      card.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');

        const heroVisual = card.closest('.hero-visual');
        if (heroVisual) {
          heroVisual.style.setProperty('--orbit-x', '0px');
          heroVisual.style.setProperty('--orbit-y', '0px');
        }
      });
    });
  }

  /* ---------- 3. SHOWCASE CODE TABS SWITCHER ---------- */
  const codeTabs = document.querySelectorAll('.code-tab');
  const codePanels = document.querySelectorAll('.code-panel');

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      codeTabs.forEach(t => t.classList.remove('active'));
      codePanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`code-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ---------- 4. SRI LANKA REAL-TIME LOCAL CLOCK ---------- */
  const clockEl = document.getElementById('localClock');
  const updateClock = () => {
    if (!clockEl) return;
    try {
      const now = new Date();
      // Format in Sri Lanka Time (UTC +05:30)
      const options = {
        timeZone: 'Asia/Colombo',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    } catch {
      // Fallback
      const d = new Date();
      clockEl.textContent = d.toLocaleTimeString();
    }
  };
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- 5. TOAST NOTIFICATION & COPY EMAIL ---------- */
  const toast = document.getElementById('toastNotification');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${message}</span>`;
    if (window.lucide) lucide.createIcons();
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'chamindusandaruwan818@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email address copied to clipboard!');
        }).catch(() => {
          showToast('Copied: ' + email);
        });
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email address copied to clipboard!');
      }
    });
  }

  /* ---------- 6. NAVBAR SCROLL SPY & BACK TO TOP ---------- */
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 40);
    }
    if (backToTop) {
      backToTop.classList.toggle('show', scrollY > 450);
    }

    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 140;
      if (scrollY >= sectionTop) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active-link', href === `#${currentSection}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 7. MOBILE NAVIGATION DRAWER ---------- */
  const burger = document.getElementById('navBurger');
  const navLinksWrap = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  const toggleMobileMenu = (forceClose = false) => {
    if (!burger || !navLinksWrap) return;
    const isOpen = forceClose ? false : !navLinksWrap.classList.contains('open');

    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    navLinksWrap.classList.toggle('open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (burger) {
    burger.addEventListener('click', () => toggleMobileMenu());
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleMobileMenu(true));
  }

  navLinksWrap?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMobileMenu(true));
  });

  /* ---------- 8. THEME TOGGLE (DARK / LIGHT) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('amc-theme');

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';

      if (nextTheme === 'dark') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', 'light');
      }

      localStorage.setItem('amc-theme', nextTheme);
    });
  }

  /* ---------- 9. TYPING ANIMATION ---------- */
  const roles = [
    'Full Stack Developer / Software Developer',
    'Flutter Mobile Engineer',
    'Laravel Backend Developer',
    'Full Stack Web & Mobile Architect',
    'HND in IT — SLIATE Sri Lanka'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function typeLoop() {
    if (!typedEl) return;
    const currentText = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typedEl.textContent = currentText.slice(0, charIndex);
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = currentText.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 30 : 60);
  }
  if (typedEl) typedEl.textContent = roles[0];
  setTimeout(typeLoop, 1800);

  /* ---------- 10. SCROLL REVEAL (INTERSECTION OBSERVER) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  /* ---------- 11. ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      let val = 0;
      const step = Math.max(1, Math.round(target / 35));
      const tick = () => {
        val = Math.min(target, val + step);
        el.textContent = val;
        if (val < target) {
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------- 12. SKILLS TABS & PROGRESS BARS ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  const fillBars = (panel) => {
    if (!panel) return;
    panel.querySelectorAll('.skill-card').forEach(card => {
      const level = card.dataset.level || '80';
      const fill = card.querySelector('.skill-fill');
      if (fill) {
        fill.style.width = `${level}%`;
      }
    });
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.querySelector(`.skills-panel[data-panel="${btn.dataset.tab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        fillBars(targetPanel);
      }
    });
  });

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillBars(document.querySelector('.skills-panel.active'));
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  /* ---------- 13. PROJECT FILTERS ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectCarouselViewport = document.getElementById('projectCarouselViewport');
  const projectCarouselStatus = document.getElementById('projectCarouselStatus');
  const projectPrevious = document.getElementById('projectPrevious');
  const projectNext = document.getElementById('projectNext');
  let visibleProjectCards = [];
  let currentProjectIndex = 0;
  let carouselRotation = 0;

  const updateProjectCarousel = () => {
    if (!projectCarouselViewport) return;

    visibleProjectCards = Array.from(projectCards).filter(card => !card.classList.contains('hidden'));
    currentProjectIndex = visibleProjectCards.length
      ? currentProjectIndex % visibleProjectCards.length
      : 0;
    carouselRotation = visibleProjectCards.length ? carouselRotation : 0;

    const cardCount = visibleProjectCards.length;
    const cardWidth = visibleProjectCards[0]?.offsetWidth || projectCarouselViewport.clientWidth;
    const radius = cardCount > 2
      ? cardWidth / (2 * Math.tan(Math.PI / cardCount))
      : cardCount === 2 ? cardWidth * 0.4 : 0;
    let tallestCard = 0;

    visibleProjectCards.forEach((card, index) => {
      const angle = index * 360 / cardCount - carouselRotation;
      const distanceFromFront = Math.abs(((angle + 180) % 360 + 360) % 360 - 180);
      const opacity = 0.48 + 0.52 * Math.max(0, Math.cos(distanceFromFront * Math.PI / 180));
      const isActive = index === currentProjectIndex;

      card.style.setProperty('--carousel-angle', `${angle.toFixed(2)}deg`);
      card.style.setProperty('--carousel-radius', `${radius.toFixed(1)}px`);
      card.style.setProperty('--carousel-opacity', opacity.toFixed(2));
      card.style.zIndex = isActive ? '2' : '1';
      card.inert = !isActive;
      card.setAttribute('aria-hidden', String(!isActive));
      tallestCard = Math.max(tallestCard, card.offsetHeight);
    });

    projectCarouselViewport.style.height = `${Math.ceil(tallestCard * 1400 / Math.max(1, 1400 - radius))}px`;

    projectCards.forEach(card => {
      if (card.classList.contains('hidden')) {
        card.inert = true;
        card.setAttribute('aria-hidden', 'true');
      }
    });

    const hasProjects = cardCount > 0;
    const activeTitle = visibleProjectCards[currentProjectIndex]?.querySelector('h3')?.textContent?.trim();
    if (projectCarouselStatus) {
      projectCarouselStatus.textContent = hasProjects
        ? `${String(currentProjectIndex + 1).padStart(2, '0')} / ${String(cardCount).padStart(2, '0')} · ${activeTitle}`
        : 'No projects';
    }
    if (projectPrevious) projectPrevious.disabled = cardCount < 2;
    if (projectNext) projectNext.disabled = cardCount < 2;
  };

  const moveProject = direction => {
    if (visibleProjectCards.length < 2) return;
    currentProjectIndex = (currentProjectIndex + direction + visibleProjectCards.length) % visibleProjectCards.length;
    carouselRotation += direction * 360 / visibleProjectCards.length;
    updateProjectCarousel();
  };

  projectPrevious?.addEventListener('click', () => moveProject(-1));
  projectNext?.addEventListener('click', () => moveProject(1));

  if (projectCarouselViewport) {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragged = false;

    projectCarouselViewport.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      dragged = false;
      projectCarouselViewport.setPointerCapture(event.pointerId);
    });

    projectCarouselViewport.addEventListener('pointerup', event => {
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
        dragged = true;
        moveProject(deltaX < 0 ? 1 : -1);
        setTimeout(() => { dragged = false; }, 0);
      }
    });

    projectCarouselViewport.addEventListener('click', event => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    projectCarouselViewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveProject(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveProject(1);
      }
    });

    window.addEventListener('resize', updateProjectCarousel);
    updateProjectCarousel();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.cat;
        const matches = filter === 'all' || category === filter;
        if (matches) {
          card.classList.remove('hidden');
          setTimeout(() => card.classList.add('in-view'), 20);
        } else {
          card.classList.add('hidden');
        }
      });
      currentProjectIndex = 0;
      carouselRotation = 0;
      requestAnimationFrame(updateProjectCarousel);
    });
  });

  /* ---------- 14. CONTACT FORM (AJAX VIA WEB3FORMS) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const sendBtn = document.getElementById('sendBtn');

  if (form && sendBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = sendBtn.innerHTML;
      sendBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>Sending...</span>';
      sendBtn.disabled = true;
      if (window.lucide) lucide.createIcons();

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            note.innerHTML = '<span style="color: var(--success);"><i data-lucide="check-circle-2"></i> Thank you! Your message was sent successfully.</span>';
            showToast('Message delivered successfully!');
            form.reset();
          } else {
            note.innerHTML = '<span style="color: var(--danger);">Something went wrong. Please reach out directly via WhatsApp or Email.</span>';
          }
        })
        .catch(() => {
          note.innerHTML = '<span style="color: var(--danger);">Connection error. Please message directly on WhatsApp or Email.</span>';
        })
        .finally(() => {
          sendBtn.innerHTML = originalText;
          sendBtn.disabled = false;
          if (window.lucide) lucide.createIcons();
        });
    });
  }

  /* ---------- 15. LIVE METRICS (GITHUB REPOS & VIEWS COUNT) ---------- */
  const githubProjectCountEl = document.getElementById('github-project-count');
  if (githubProjectCountEl) {
    fetch('https://api.github.com/users/AMCNW2002')
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          const target = data.public_repos;
          githubProjectCountEl.dataset.count = target;
          let val = parseInt(githubProjectCountEl.textContent, 10) || 0;
          const step = Math.max(1, Math.round(target / 25));
          const tick = () => {
            val = Math.min(target, val + step);
            githubProjectCountEl.textContent = val;
            if (val < target) requestAnimationFrame(tick);
          };
          tick();
        }
      })
      .catch(err => console.debug('GitHub count fetch error:', err));
  }

  const portfolioViewsCountEl = document.getElementById('portfolio-views-count');
  if (portfolioViewsCountEl) {
    fetch('https://abacus.jasoncameron.dev/hit/amcnw2002/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data && data.value !== undefined) {
          const target = 100 + data.value;
          portfolioViewsCountEl.dataset.count = target;
          let val = parseInt(portfolioViewsCountEl.textContent, 10) || 0;
          const step = Math.max(1, Math.round(target / 35));
          const tick = () => {
            val = Math.min(target, val + step);
            portfolioViewsCountEl.textContent = val;
            if (val < target) requestAnimationFrame(tick);
          };
          tick();
        }
      })
      .catch(err => console.debug('Views count fetch error:', err));
  }

  /* ---------- 16. LIVE GITHUB REPOSITORIES SHOWCASE (WITH ROBUST FALLBACK) ---------- */
  const githubGrid = document.getElementById('githubReposGrid');

  const fallbackRepos = [
    {
      name: "salepro",
      description: "Smart Sales & Distribution management mobile application built with Flutter & Firebase.",
      language: "Dart",
      stargazers_count: 2,
      forks_count: 1,
      html_url: "https://github.com/AMCNW2002/salepro"
    },
    {
      name: "EcoTrack",
      description: "Municipal Garbage Management and Waste Collection tracking web platform powered by Laravel.",
      language: "PHP",
      stargazers_count: 3,
      forks_count: 0,
      html_url: "https://github.com/AMCNW2002/EcoTrack"
    },
    {
      name: "attendpro2",
      description: "Attendance management mobile application with dashboard statistics and employee logs.",
      language: "Dart",
      stargazers_count: 1,
      forks_count: 0,
      html_url: "https://github.com/AMCNW2002/attendpro2"
    },
    {
      name: "ExpenseTrack",
      description: "Personal and business expense tracking application with monthly categorical summaries.",
      language: "Dart",
      stargazers_count: 1,
      forks_count: 0,
      html_url: "https://github.com/AMCNW2002/ExpenseTrack"
    },
    {
      name: "Employee-performance-Attendance-Dashboard",
      description: "Interactive Employee Performance & Attendance Dashboard with data analytics and visual filters.",
      language: "Power BI",
      stargazers_count: 1,
      forks_count: 0,
      html_url: "https://github.com/AMCNW2002/Employee-performance-Attendance-Dashboard"
    },
    {
      name: "portfolio-main",
      description: "Personal software engineer portfolio website showcasing full stack projects and expertise.",
      language: "JavaScript",
      stargazers_count: 4,
      forks_count: 1,
      html_url: "https://github.com/AMCNW2002/portfolio-main"
    }
  ];

  const renderRepos = (repos) => {
    if (!githubGrid) return;
    githubGrid.innerHTML = '';

    const getLangColor = (lang) => {
      const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Dart': '#00B4AB',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'Power BI': '#f2c811'
      };
      return colors[lang] || 'var(--accent)';
    };

    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'github-card reveal-up in-view';

      card.innerHTML = `
        <div class="github-card-top">
          <h4><i data-lucide="folder-git-2"></i> ${repo.name}</h4>
          <p>${repo.description || 'Public repository by AMC Sandaruwan.'}</p>
        </div>
        <div class="github-card-bottom">
          <div class="gh-lang">
            <span class="gh-lang-color" style="background-color: ${getLangColor(repo.language)}"></span>
            <span>${repo.language || 'Code'}</span>
          </div>
          <div class="gh-stats">
            <span><i data-lucide="star"></i> ${repo.stargazers_count || 0}</span>
            <span><i data-lucide="git-fork"></i> ${repo.forks_count || 0}</span>
          </div>
        </div>
      `;
      githubGrid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  };

  if (githubGrid) {
    fetch('https://api.github.com/users/AMCNW2002/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(repos => {
        if (Array.isArray(repos) && repos.length > 0) {
          renderRepos(repos.filter(r => !r.fork));
        } else {
          renderRepos(fallbackRepos);
        }
      })
      .catch(() => {
        renderRepos(fallbackRepos);
      });
  }
});
