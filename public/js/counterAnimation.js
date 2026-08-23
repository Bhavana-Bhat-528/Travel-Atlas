document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-val');
  const speed = 200; // Counter speed animation duration

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = Math.max(1, Math.ceil(target / speed));

    if (count < target) {
      counter.innerText = Math.min(count + inc, target);
      setTimeout(() => startCounting(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
});
