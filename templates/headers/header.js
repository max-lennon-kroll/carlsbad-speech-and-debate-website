// This function initializes all header functionality.
// It should be called after the header HTML has been loaded into the page.
function initializeHeader() {
  
  // ---- SCRIPT FOR DESKTOP DROPDOWNS ----
  const dropdowns = document.querySelectorAll('.nav-container .header-dropdown');
  function closeAllDropdowns() {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); 
    link.addEventListener('click', function(event) {
      if (window.innerWidth <= 1024 && link.getAttribute('href') !== null && link.getAttribute('href') !== '#') {
          return;
      }
      // If the top-level link itself has a destination (like Contacts), allow navigation.
      if (window.innerWidth > 1024 && link.getAttribute('href') !== null && link.getAttribute('href') !== '#') {
          return;
      }

      event.preventDefault(); 
      const wasActive = dropdown.classList.contains('active');
      closeAllDropdowns();
      if (!wasActive) {
        dropdown.classList.add('active');
      }
    });
  });
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.header-nav-buttons')) {
      closeAllDropdowns();
    }
  });
  
  // ---- SCRIPT FOR NAV BAR HIDING ON SCROLL ----
  const navContainer = document.getElementById('navContainer');
  if (navContainer) {
    const navHeight = navContainer.offsetHeight;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Simple hide on scroll down, show on scroll up logic
      if (scrollY > lastScrollY && scrollY > navHeight){
        navContainer.style.top = `-${navHeight}px`;
        closeAllDropdowns();
      } else {
        navContainer.style.top = '0';
      }
      lastScrollY = scrollY;
    });
  }

  // ---- SCRIPT FOR HAMBURGER MENU ----
  const hamburgerBtn = document.querySelector('.header-hamburger-menu');
  const navMenu = document.querySelector('.nav-container nav');
  const closeBtn = document.querySelector('.header-close-menu');
  const body = document.body;

  if (hamburgerBtn && navMenu && closeBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.add('is-open');
        body.classList.add('header-nav-open'); 
    });
    closeBtn.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        body.classList.remove('header-nav-open');
    });
    document.addEventListener('click', (e) => {
        // Close if click is outside the opened menu, and not on the hamburger button itself
        if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            navMenu.classList.remove('is-open');
            body.classList.remove('header-nav-open');
        }
    });
  }
}