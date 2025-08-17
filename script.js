document.addEventListener('DOMContentLoaded', function () {
  /* ----- Constants ----- */
  const CLASS_HIDDEN = 'hidden';
  const CLASS_ACTIVE = 'active';
  const CLASS_FLIPPED = 'flipped';
  const CLASS_SLIDE_LEFT = 'slide-left';
  const CLASS_DIMMED = 'dimmed';

  const slideDuration = 200;  // slide transition time in ms
  const flipDuration = 600;   // estimated flip duration

  /* ----- Elements ----- */
  const card = document.getElementById('businessCard');
  const cardContainer = document.querySelector('.card-container');
  const portfolioSection = document.getElementById('portfolioSection');
  const portfolioLink = document.getElementById('portfolioLink');
  const aboutLink = document.querySelector('a[href="index.html?flip=back"]');
  const homeLink = document.getElementById('homeLink');
  const contactLink = document.getElementById('contactLink'); // CHANGE #3
  const contactSection = document.getElementById('contactSection');
  const contactCloseBtn = document.getElementById('contactCloseBtn');

  /* ----- Initialize card flip on page load if URL param ?flip=back ----- */
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('flip') === 'back' && card) {
    card.classList.add(CLASS_FLIPPED);
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

  /* ----- Portfolio tab click ----- */
  if (portfolioLink) {
    portfolioLink.addEventListener('click', async function (e) {
      e.preventDefault();

      await hideSections(contactSection);
      card.classList.remove(CLASS_FLIPPED);
      cardContainer.classList.add(CLASS_SLIDE_LEFT);
      portfolioSection.classList.remove(CLASS_HIDDEN);
      void portfolioSection.offsetWidth; // reflow
      portfolioSection.classList.add(CLASS_ACTIVE);
    });
  }

  /* ----- About tab click ----- */
  if (aboutLink) {
    aboutLink.addEventListener('click', async function (e) {
      e.preventDefault();

      await hideSections(portfolioSection, contactSection);
      card.classList.add(CLASS_FLIPPED);
      cardContainer.classList.remove(CLASS_SLIDE_LEFT);
    });
  }

  /* ----- Home tab click ----- */
  if (homeLink) {
    homeLink.addEventListener('click', async function (e) {
      const isOnHomePage =
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname === '';

      if (isOnHomePage) {
        e.preventDefault();

        await hideSections(portfolioSection, contactSection);
        card.classList.remove(CLASS_FLIPPED);
        await delay(flipDuration / 2);
        cardContainer.classList.remove(CLASS_SLIDE_LEFT);

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
    contactLink.addEventListener('click', function (e) {
      e.preventDefault();

      contactSection.classList.remove(CLASS_HIDDEN);
      void contactSection.offsetWidth; // force reflow
      contactSection.classList.add(CLASS_ACTIVE);

      cardContainer.classList.add(CLASS_DIMMED);
      portfolioSection.classList.add(CLASS_DIMMED);
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
