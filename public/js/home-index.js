 // Intersection Observer for lazy loading animations
 const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  // Observe elements
  document.querySelectorAll('.feature-card, .story-card, .cta-section, .stat-card').forEach(el => {
    observer.observe(el);
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Scroll to features section when clicking the scroll indicator
  document.querySelector('.hero-scroll-indicator').addEventListener('click', function() {
    document.querySelector('.features-section').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Add this to your existing script section
  document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles effect for CTA section
    const ctaParticles = document.querySelector('.cta-particles');
    if (ctaParticles) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 20 + 10 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        ctaParticles.appendChild(particle);
      }
    }
  });