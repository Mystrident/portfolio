const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = Array.from(document.querySelectorAll('section[id]'));

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === '#' + id;
    link.classList.toggle('active', isActive);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length) {
      setActiveLink(visibleEntries[0].target.id);
    }
  },
  {
    rootMargin: '-30% 0px -45% 0px',
    threshold: [0.1, 0.25, 0.5, 0.75]
  }
);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveLink(target.id);
    window.history.pushState(null, '', targetId);
  });
});
