// Short, accessible first-load animation. The page remains usable if JS is delayed.
document.body.classList.add('is-loading');
const pageLoader = document.querySelector('.page-loader');
const finishLoading = () => {
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-ready');
  if (pageLoader) {
    window.setTimeout(() => pageLoader.classList.add('is-hidden'), 950);
    window.setTimeout(() => pageLoader.remove(), 1600);
  }
};
if (document.readyState === 'complete') finishLoading();
else window.addEventListener('load', finishLoading, { once: true });

const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();
