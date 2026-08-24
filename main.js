/* Thorcast.AI landing — the only two things on this page that need scripting:
   the use-case tablist and the mobile nav drawer. Everything else is CSS. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Sticky-nav offset — keeps #anchor scroll targets clear of the header
     --------------------------------------------------------------------- */
  var nav = document.querySelector('.nav');

  function syncNavHeight() {
    if (!nav) return;
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);

  /* ---------------------------------------------------------------------
     Mobile nav drawer
     --------------------------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  function setMenu(open) {
    if (!toggle || !links) return;
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Any in-page jump should dismiss the drawer.
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      setMenu(false);
      toggle.focus();
    });

    // Leaving the mobile breakpoint with the drawer open would strand the class.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  /* ---------------------------------------------------------------------
     Use-case tabs (WAI-ARIA tabs pattern, roving tabindex)
     --------------------------------------------------------------------- */
  var tablist = document.querySelector('.tabs');
  if (!tablist) return;

  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

  function select(index, focus) {
    tabs.forEach(function (tab, i) {
      var active = i === index;
      var panel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (panel) panel.hidden = !active;
    });

    if (focus) tabs[index].focus();
  }

  tablist.addEventListener('click', function (e) {
    var tab = e.target.closest('[role="tab"]');
    if (tab) select(tabs.indexOf(tab), false);
  });

  tablist.addEventListener('keydown', function (e) {
    var current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    var next;
    switch (e.key) {
      case 'ArrowRight': next = (current + 1) % tabs.length; break;
      case 'ArrowLeft':  next = (current - 1 + tabs.length) % tabs.length; break;
      case 'Home':       next = 0; break;
      case 'End':        next = tabs.length - 1; break;
      default: return;
    }

    e.preventDefault();
    select(next, true);
  });
})();
