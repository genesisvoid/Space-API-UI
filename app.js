// Select elements for carousel and theme toggle
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// Carousel Sliding Logic
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;

  // Event listener for the arrow click
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);  // Calculate items per screen width
    clickCounter++;

    // Only move the carousel if there are more items to show
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      const currentTransform = window.getComputedStyle(movieLists[i]).transform;
      const currentX = currentTransform !== "none" ? parseInt(currentTransform.split(',')[4]) : 0;
      movieLists[i].style.transform = `translateX(${currentX - 300}px)`;  // Move carousel by 300px
    } else {
      movieLists[i].style.transform = "translateX(0)";  // Reset carousel to start
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));  // For debugging
});

// Debounce function to limit rapid event firing (for carousel sliding)
function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

// Theme Toggle (Light/Dark Mode)
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

// Accessibility: Add ARIA role for toggle switch
ball.setAttribute('aria-label', 'Toggle Dark/Light Mode');

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");  // Toggle active class for theme change
  });
  ball.classList.toggle("active");  // Toggle ball state
  // Update ARIA label based on the theme state
  if (ball.classList.contains('active')) {
    ball.setAttribute('aria-label', 'Switch to Light Mode');
  } else {
    ball.setAttribute('aria-label', 'Switch to Dark Mode');
  }
});

// ** Accessibility Features: Adding focus states and ARIA roles **
const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');

// Add focus state styles
focusableElements.forEach((el) => {
  el.addEventListener('focus', () => {
    el.classList.add('focus');
  });
  el.addEventListener('blur', () => {
    el.classList.remove('focus');
  });
});

// Add ARIA roles for movie list items (if needed)
movieLists.forEach((list) => {
  const listItems = list.querySelectorAll(".movie-list-item");
  listItems.forEach((item) => {
    item.setAttribute("role", "listitem");
  });
});

// ** Preloading Animation or Loading State **
// Display a loading spinner or animation while the page is loading
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loading-spinner");
  if (loader) {
    loader.style.display = "none";  // Hide the loading spinner once content is loaded
  }
});

// ** Cross-Browser Compatibility for Transform Property **
// Use `window.getComputedStyle` for cross-browser support
arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);  // Get the number of items visible
    clickCounter++;

    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      const currentTransform = window.getComputedStyle(movieLists[i]).transform;
      const currentX = currentTransform !== "none" ? parseInt(currentTransform.split(',')[4]) : 0;
      movieLists[i].style.transform = `translateX(${currentX - 300}px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

// Make carousel sliding more responsive and smoother
// Consider adding CSS transitions for smooth slide effect
const smoothScroll = () => {
  movieLists.forEach((list) => {
    list.style.transition = "transform 0.5s ease";  // Smooth sliding transition
  });
};

// Make sure the carousel adjusts on resize
window.addEventListener("resize", debounce(smoothScroll, 200));

