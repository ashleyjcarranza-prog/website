function buildNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  nav.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-white bg-opacity-75 border-bottom sticky-top">
      <div class="container py-1">
        <a class="navbar-brand" href="/">Ashley Carranza</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="/my-work">My Work</a></li>
            <li class="nav-item"><a class="nav-link" href="/speaking-features">Speaking & Features</a></li>
            <li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('.nav-link').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (currentPath === linkPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function buildFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <footer class="py-4 mt-5">
      <div class="container d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary">
        <small>© ${year} Ashley Carranza</small>
        <small>Media & speaking inquiries: <a class="text-decoration-none" href="mailto:ashleyjcarranza@gmail.com">ashleyjcarranza@gmail.com</a></small>
      </div>
    </footer>
  `;
}

function initAnimations() {
  if (window.AOS) {
    window.AOS.init({
      once: true,
      duration: 650,
      easing: 'ease-out-cubic'
    });
  }
}

async function getJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to fetch ${path}`);
  return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initAnimations();
});
