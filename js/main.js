/***** NAVBAR *****/
const mainNav = document.querySelector(".main-navigation");
const navBtn = document.querySelector(".mobile-nav-button");

navBtn.addEventListener("click", function() {
    const visibility = mainNav.getAttribute("data-visible")
    if (visibility === "false") {
        mainNav.setAttribute("data-visible", "true");
        navBtn.style.backgroundImage = "url('/img/nav-btn-close.svg')";

    } else {
        mainNav.setAttribute("data-visible", "false");
        navBtn.style.backgroundImage = "url('/img/nav-btn-open.svg')";
    }
})
/***** NAVBAR END *****/

/***** RESIZE ANIMATION STOPPER *****/
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
/***** RESIZE ANIMATION STOPPER END *****/

/***** CAROUSEL *****/
const carouselSlides = document.querySelector(".carousel__slides");
const slides = Array.from(carouselSlides.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__navigation");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// slides[0].style.left = slideWidth * 0 + "px";;
// slides[1].style.left = slideWidth * 1 + "px";
// slides[2].style.left = slideWidth * 2 + "px";
// slides[3].style.left = slideWidth * 3 + "px";

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);

const moveToSlide = (carouselSlides, currentSlide, targetSlide) => {
  carouselSlides.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide")
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length -1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}

nextButton.addEventListener("click", e => {
  const currentSlide = carouselSlides.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(carouselSlides, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

prevButton.addEventListener("click", e => {
  const currentSlide = carouselSlides.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(carouselSlides, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})
 
dotsNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return; 
  const currentSlide = carouselSlides.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(carouselSlides, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

/***** CAROUSEL END *****/