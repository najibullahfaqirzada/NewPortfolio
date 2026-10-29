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


/* Contact form: validate fields, then prepare an email in the visitor's mail app. */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields.';
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    formStatus.textContent = 'Your email app should open so you can send your message.';
    window.location.href = `mailto:najibullah.faqirzada@outlook.com?subject=${subject}&body=${body}`;
  });
}
