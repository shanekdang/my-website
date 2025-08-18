document.addEventListener('DOMContentLoaded', function () {
  /* ----- Constants ----- */
  const CLASS_HIDDEN = 'hidden';
  const CLASS_ACTIVE = 'active';
  const CLASS_FLIPPED = 'flipped';
  const CLASS_SLIDE_LEFT = 'slide-left';
  const CLASS_DIMMED = 'dimmed';

  const slideDuration = 200;
  const flipDuration = 600;

  /* ----- Elements ----- */
  const urlParams = new URLSearchParams(window.location.search);
  const card = document.getElementById('businessCard');
  const flipToggleBtn = document.getElementById('flipToggleBtn');
  const cardContainer = document.querySelector('.card-container');
  const portfolioSection = document.getElementById('portfolioSection');
  const portfolioLink = document.getElementById('portfolioLink');
  const portfolioBtn = document.getElementById('portfolioBtn');
  const aboutLink = document.querySelector('a[href="index.html?flip=back"]');
  const homeLink = document.getElementById('homeLink');
  const contactLink = document.getElementById('contactLink');
  const contactBtn = document.getElementById('contactBtn');
  const contactSection = document.getElementById('contactSection');
  const contactCloseBtn = document.getElementById('contactCloseBtn');

  /* ----- Nav Bar Active ----- */
  function setActiveLink(activeId) {
    document.querySelectorAll("nav a").forEach(link => {
      link.classList.remove("active");
    });
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  /* ----- Initialize card flip on page load if ?flip=back ----- */
  if (urlParams.get('flip') === 'back' && card) {
    card.classList.add(CLASS_FLIPPED);
    setActiveLink("aboutLink");
    if (flipToggleBtn) {
      flipToggleBtn.textContent = 'Flip Card Back Over >>';
    }
  } else {
    setActiveLink("homeLink");
  }

  /* ----- Flip Card Button ----- */
  if (flipToggleBtn && card) {
    flipToggleBtn.addEventListener('click', () => {
      const isFlipped = card.classList.contains(CLASS_FLIPPED);

      flipToggleBtn.style.opacity = '0';
      flipToggleBtn.style.pointerEvents = 'none';

      if (isFlipped) {
        card.classList.remove(CLASS_FLIPPED);
        setTimeout(() => {
          flipToggleBtn.textContent = 'Flip Card for More >>';
          setActiveLink("homeLink");
        }, flipDuration);
      } else {
        card.classList.add(CLASS_FLIPPED);
        setTimeout(() => {
          flipToggleBtn.textContent = 'Flip Card Back Over >>';
          setActiveLink("aboutLink");
        }, flipDuration);
      }

      setTimeout(() => {
        flipToggleBtn.style.opacity = '1';
        flipToggleBtn.style.pointerEvents = 'auto';
      }, flipDuration + 500);
    });
  }

  /* ----- Helper delay function ----- */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ----- DRY Helper: Hide and deactivate multiple sections ----- */
  function hideSections(...sections) {
    sections.forEach(sec => sec.classList.remove(CLASS_ACTIVE));
    return delay(slideDuration).then(() => {
      sections.forEach(sec => sec.classList.add(CLASS_HIDDEN));
    });
  }

  /* ----- Portfolio tab and Button click ----- */
  if (portfolioLink) {
    portfolioLink.addEventListener('click', async function (e) {
      e.preventDefault();
      await hideSections(contactSection);
      card.classList.remove(CLASS_FLIPPED);
      cardContainer.classList.add(CLASS_SLIDE_LEFT);
      portfolioSection.classList.remove(CLASS_HIDDEN);
      void portfolioSection.offsetWidth;
      portfolioSection.classList.add(CLASS_ACTIVE);
      setActiveLink("portfolioLink");
      if (flipToggleBtn) flipToggleBtn.textContent = 'Flip Card for More >>';
    });
  }

  if (portfolioBtn) {
    portfolioBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      await hideSections(contactSection);
      card.classList.remove(CLASS_FLIPPED);
      cardContainer.classList.add(CLASS_SLIDE_LEFT);
      portfolioSection.classList.remove(CLASS_HIDDEN);
      void portfolioSection.offsetWidth;
      portfolioSection.classList.add(CLASS_ACTIVE);
      setActiveLink("portfolioLink");
      if (flipToggleBtn) flipToggleBtn.textContent = 'Flip Card for More >>';
    });
  }

  /* ----- About tab and Contact Button click ----- */
  if (aboutLink) {
    aboutLink.addEventListener('click', async function (e) {
      e.preventDefault();
      await hideSections(portfolioSection, contactSection);
      card.classList.add(CLASS_FLIPPED);
      cardContainer.classList.remove(CLASS_SLIDE_LEFT);
      setActiveLink("aboutLink");
      if (flipToggleBtn) flipToggleBtn.textContent = 'Flip Card Back Over >>';
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      await hideSections(portfolioSection, contactSection);
      card.classList.add(CLASS_FLIPPED);
      cardContainer.classList.remove(CLASS_SLIDE_LEFT);
      setActiveLink("contactLink");
      if (flipToggleBtn) flipToggleBtn.textContent = 'Flip Card Back Over >>';
    });
  }

  /* ----- Home tab click ----- */
  if (homeLink) {
    homeLink.addEventListener('click', async function (e) {
      e.preventDefault();
      const isOnHomePage =
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname === '';

      if (isOnHomePage) {
        await hideSections(portfolioSection, contactSection);
        card.classList.remove(CLASS_FLIPPED);
        await delay(flipDuration / 2);
        cardContainer.classList.remove(CLASS_SLIDE_LEFT);
        setActiveLink("homeLink");
        if (flipToggleBtn) flipToggleBtn.textContent = 'Flip Card for More >>';
        history.replaceState(null, '', 'index.html');
      }
    });
  }

  /* ----- Typewriter effect ----- */
  const words = ["DATA ANALYST", "PROGRAMMER", "SOFTWARE ENGINEER"];
  let wordIndex = 0;
  let charIndex = 0;
  const typeSpan = document.querySelector(".typewriter-text");
  const cursor = document.querySelector(".cursor");

  function type() {
    if (charIndex < words[wordIndex].length) {
      typeSpan.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typeSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    }
  }

  if (typeSpan && cursor) {
    type();
  }

  /* ----- Initialize AOS animations ----- */
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }

  /* ----- Contact tab click ----- */
  if (contactLink) {
    contactLink.addEventListener('click', async function (e) {
      e.preventDefault();

      // Flip to back of card (About)
      await hideSections(portfolioSection, contactSection);
      card.classList.add(CLASS_FLIPPED);
      cardContainer.classList.remove(CLASS_SLIDE_LEFT);
      setActiveLink("aboutLink");

      if (flipToggleBtn) {
        flipToggleBtn.textContent = 'Flip Card Back Over >>';
      }

      // Highlight the .ul-icons section
      const ulIcons = document.querySelector('.ul-icons');
      if (ulIcons) {
        ulIcons.classList.add('highlight-flash');

        // Remove highlight after animation
        setTimeout(() => {
          ulIcons.classList.remove('highlight-flash');
        }, 4000); // Match animation duration
      }
    });
  }



  /* ----- Contact close button ----- */
  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', () => {
      contactSection.classList.remove(CLASS_ACTIVE);
      setTimeout(() => {
        contactSection.classList.add(CLASS_HIDDEN);
        cardContainer.classList.remove(CLASS_DIMMED);
        portfolioSection.classList.remove(CLASS_DIMMED);
      }, 600);
    });
  }
});
