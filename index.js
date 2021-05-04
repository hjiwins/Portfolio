//NAV ICONS
const iconImages = document.querySelectorAll(".icon-image img");
const iconText = document.querySelectorAll(".icon-text a");
const about = document.querySelector(".about-icon-txt");

iconImages.forEach((icon) => {
  icon.addEventListener("mouseover", (e) => {
    let textItem = document.querySelector(`.${e.target.classList[0]}-txt`);
    textItem.classList.add("appear");
    e.target.classList.add("dissappear");
  });
  icon.addEventListener("mouseleave", (e) => {
    let textItem = document.querySelector(`.${e.target.classList[0]}-txt`);
    textItem.classList.toggle("appear");
    e.target.classList.remove("dissappear");
  });
  icon.addEventListener("click", (e) => {
    let textItem = document.querySelector(`.${e.target.classList[0]}-txt`);
    textItem.style.opacity = 0;
    e.target.classList.remove("dissappear");
  });
});

//NAV COLOR
const heroSlide = document.getElementById("hero");
const aboutSlide = document.getElementById("about");
const projectsSlide = document.getElementById("projects");
const ctaSlide = document.getElementById("cta");
const allSlides = [heroSlide, aboutSlide, projectsSlide, ctaSlide];

const header = document.querySelector("header");

const mainWrap = document.querySelector("main");
mainWrap.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;
  console.log(this.scrollY);

  if (heroSlide.getBoundingClientRect().top === 0) {
    header.style.backgroundColor = "var(--point-pink)";
  }
  if (aboutSlide.getBoundingClientRect().top === 0) {
    header.style.backgroundColor = "var(--point-blue)";
    swimmingAni();
  }
  if (projectsSlide.getBoundingClientRect().top === 0) {
    header.style.backgroundColor = "var(--point-green)";
  }
  if (ctaSlide.getBoundingClientRect().top < 1) {
    header.style.backgroundColor = "var(--point-orange)";
  }

  // if (scrollPos === 0 || scrollPos < aboutSlide.offsetTop - 20) {
  //   header.style.backgroundColor = "var(--point-pink)";
  // }
  // if (scrollPos > aboutSlide.offsetTop - 20) {
  //   header.style.backgroundColor = "var(--point-blue)";
  //   swimmingAni();
  // }
  // if (scrollPos > projectsSlide.offsetTop) {
  //   header.style.backgroundColor = "var(--point-green)";
  // }
  // if (scrollPos > ctaSlide.offsetTop - 20) {
  //   header.style.backgroundColor = "var(--point-orange)";
  //   orangeAni();
  // }
});

//HERO TEXT
const jobTitle = ["Developer", "Designer", "Creater", "Artist"];
const span = document.querySelector(".hero-text span");
let index = 0;

setInterval(titleShuffle, 3000);

function titleShuffle() {
  span.innerText = jobTitle[index];
  index++;
  if (index > jobTitle.length - 1) {
    index = 0;
  }
}

//SLIDE ANIMATION
const aboutWrap = document.querySelector(".about-content")
const textLeft = document.querySelector(".about-text-left");
const textRight = document.querySelector(".about-text-right");
const swimmingGirl = document.querySelector(".swimming-girl");
function swimmingAni() {
  if (window.innerWidth > 991) {
    aboutWrap.style.opacity = 1
    swimmingGirl.style.animation = "swim-vertical 4s -1s forwards 1";
    textLeft.style.transform = "translateX(-20vh)";
    textLeft.style.transition = "2s";
    textRight.style.transform = "translateX(20vh)";
    textRight.style.transition = "2s";
  } else {
    aboutWrap.style.opacity = 1
    swimmingGirl.style.animation = "swim-horizontal 4s -1s forwards 1";
    textLeft.style.transform = "translateY(-15vh)";
    textLeft.style.transition = "2s";
    textRight.style.transform = "translateY(15vh)";
    textRight.style.transition = "2s";
  }
}

function orangeAni() {}
