// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (menuToggle && navButtons) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navButtons.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navButtons && navButtons.classList.contains('active') && 
          !navButtons.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        menuToggle.classList.remove('active');
        navButtons.classList.remove('active');
      }
    });
  });