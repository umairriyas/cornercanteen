/* ============================================================
   CORNER CANTEEN — main.js
   cornercanteen.co.uk
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. NAV TOGGLE (mobile hamburger)
     ------------------------------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-bar nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('open', !isOpen);
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------
     2. SCROLL REVEAL
     ------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback — just show everything if IntersectionObserver not supported
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ------------------------------------------------------------
     3. CATEGORY TABS (menu.html)
     ------------------------------------------------------------ */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-tab');

        // Update button states
        tabBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show correct panel
        tabPanels.forEach(function (panel) {
          if (panel.getAttribute('data-panel') === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });

    // Keyboard navigation for tabs (left / right arrow keys)
    tabBtns.forEach(function (btn, index) {
      btn.addEventListener('keydown', function (e) {
        let newIndex = null;
        if (e.key === 'ArrowRight') newIndex = (index + 1) % tabBtns.length;
        if (e.key === 'ArrowLeft')  newIndex = (index - 1 + tabBtns.length) % tabBtns.length;
        if (newIndex !== null) {
          tabBtns[newIndex].focus();
          tabBtns[newIndex].click();
        }
      });
    });
  }

  /* ------------------------------------------------------------
     4. STICKY HEADER SHADOW ON SCROLL
     ------------------------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteHeader.style.boxShadow = '0 4px 24px rgba(30,26,20,0.10)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------
     5. SMOOTH SCROLL for anchor links
     ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------------------------------------------------------------
     6. ACTIVE NAV LINK highlight based on current page
     ------------------------------------------------------------ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.style.color = 'var(--color-text)';
      link.style.fontWeight = '800';
    }
  });

  /* ------------------------------------------------------------
     7. FORM RESULT auto-hide after 6 seconds
     ------------------------------------------------------------ */
  const formResult = document.getElementById('form-result');

  if (formResult) {
    const observer = new MutationObserver(function () {
      if (formResult.classList.contains('success')) {
        setTimeout(function () {
          formResult.style.transition = 'opacity 0.6s ease';
          formResult.style.opacity = '0';
          setTimeout(function () {
            formResult.style.display = 'none';
            formResult.style.opacity = '1';
          }, 600);
        }, 6000);
      }
    });

    observer.observe(formResult, { attributes: true, attributeFilter: ['class'] });
  }

  /* ------------------------------------------------------------
     8. PHONE LINK — log click for analytics placeholder
     ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      // Swap this comment for your analytics event e.g. gtag()
      console.info('Phone link clicked:', link.href);
    });
  });

})();