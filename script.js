// ============================================================
// AMC Sandaruwan â€” Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  /* ---------- loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 1800);

  /* ---------- custom cursor ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .glass-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1)');
  });

  /* ---------- nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
    });
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const navLinksWrap = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinksWrap.classList.toggle('open'));
  navLinksWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksWrap.classList.remove('open')));

  /* ---------- theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('amc-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'dark') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'light');
    localStorage.setItem('amc-theme', next);
  });

  /* ---------- typing animation ---------- */
  const roles = [
    'Flutter Developer',
    'Laravel Developer',
    'Full Stack Web & Mobile App Developer',
    'HND in Information Technology -SLIATE'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let val = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        val = Math.min(target, val + step);
        el.textContent = val;
        if (val < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- skills tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  function fillBars(panel) {
    panel.querySelectorAll('.skill-row').forEach(row => {
      const level = row.dataset.level;
      row.querySelector('.skill-fill').style.width = level + '%';
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`.skills-panel[data-panel="${btn.dataset.tab}"]`);
      panel.classList.add('active');
      fillBars(panel);
    });
  });

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillBars(document.querySelector('.skills-panel.active'));
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  /* ---------- project filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- contact form handling via AJAX ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          note.textContent = 'Message sent successfully!';
          note.style.color = 'var(--success)';
          form.reset();
        } else {
          note.textContent = 'Oops! There was a problem sending your message.';
          note.style.color = '#ef4444';
        }
      })
      .catch(error => {
        note.textContent = 'Oops! There was a problem sending your message.';
        note.style.color = '#ef4444';
      })
      .finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
  });

  /* ---------- github repos fetch ---------- */
  const githubGrid = document.getElementById('githubReposGrid');
  if (githubGrid) {
    fetch('https://api.github.com/users/AMCNW2002/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(repos => {
        githubGrid.innerHTML = '';
        
        if (!Array.isArray(repos) || repos.length === 0) {
          githubGrid.innerHTML = '<div class="github-loading">No repositories found.</div>';
          return;
        }
        
        const getLangColor = (lang) => {
          const colors = {
            'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'HTML': '#e34c26', 
            'CSS': '#563d7c', 'PHP': '#4F5D95', 'Dart': '#00B4AB', 'Python': '#3572A5',
            'Java': '#b07219', 'C++': '#f34b7d', 'C#': '#178600'
          };
          return colors[lang] || 'var(--accent)';
        };

        let added = 0;
        repos.forEach(repo => {
          if (repo.fork || added >= 6) return;
          
          const card = document.createElement('a');
          card.href = repo.html_url;
          card.target = '_blank';
          card.className = 'github-card reveal-up';
          
          card.innerHTML = `
            <div class="github-card-top">
              <h4><i data-lucide="folder-git-2"></i> ${repo.name}</h4>
              <p>${repo.description || 'No description provided.'}</p>
            </div>
            <div class="github-card-bottom">
              <div class="gh-lang">
                ${repo.language ? `<div class="gh-lang-color" style="background-color: ${getLangColor(repo.language)}"></div> <span>${repo.language}</span>` : '<span>N/A</span>'}
              </div>
              <div class="gh-stats">
                <span><i data-lucide="star"></i> ${repo.stargazers_count}</span>
                <span><i data-lucide="git-fork"></i> ${repo.forks_count}</span>
              </div>
            </div>
          `;
          githubGrid.appendChild(card);
          added++;
        });
        
        lucide.createIcons();
        document.querySelectorAll('#githubReposGrid .reveal-up').forEach(el => revealObserver.observe(el));
      })
      .catch(err => {
        console.error('Error fetching GitHub repos:', err);
        githubGrid.innerHTML = '<div class="github-loading">Failed to load repositories.</div>';
      });
  }
});

