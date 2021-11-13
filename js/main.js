const hamburger = document.querySelector(".main-navigation--hamburger");
const navMenu = document.querySelector(".main-navigation--menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}