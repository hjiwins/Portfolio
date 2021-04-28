const nav = document.querySelector("header");
const hero = document.getElementById("hero")
const about = document.getElementById("about");
const projects = document.getElementById("projects");
const cta = document.getElementById("cta");

//Nav color change
const navController = new ScrollMagic.Controller();

const heroNavBg = new ScrollMagic.Scene({
    triggerElement: "#hero",
})
.setTween(nav, .1, {backgroundColor: "var(--point-pink"})
.addIndicators({name: "hero"})
.addTo(navController)

const aboutNavBg = new ScrollMagic.Scene({
    triggerElement: "#about",
})
.setTween(nav, .3, {backgroundColor: "var(--point-blue"})
.addIndicators({name: "about", indent: 100})
.addTo(navController)

const projectsNavBg = new ScrollMagic.Scene({
    triggerElement: "#projects",
})
.setTween(nav, .3, {backgroundColor: "var(--point-green"})
.addIndicators({name: "projects", indent: 200})
.addTo(navController)

const contactNavBg = new ScrollMagic.Scene({
    triggerElement: "#cta",
})
.setTween(nav, .3, {backgroundColor: "var(--point-orange"})
.addIndicators({name: "contact"})
.addTo(navController)

//change Nav icon's background color
function iconBgColor(navColor) {
  const textBlock = document.querySelectorAll(".icon-text");
  textBlock.forEach((icon) => {
    icon.style.backgroundColor = navColor;
  });
}

//Page pinning
const slideController = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave',
        duration: "200%"
    }
});
// get all slides
const slides = [hero, about, projects];
// create scene for every slide
for (var i=0; i<slides.length; i++) {
    console.log(slides[i]);
    new ScrollMagic.Scene({
            triggerElement: slides[i],
            duration: 300
        })
        .setPin(slides[i])
        //.addIndicators({name: `slide${i+1}`})
        .addTo(slideController);
}

//About girl swimming forward
const swimmingTl = gsap.timeline();
swimmingTl.to (".about-text-left", {x: 0, duration: 2})
swimmingTl.to (".about-text-right", {x: 0, duration: 2}, "-=2")
swimmingTl.to (".swimming-girl", {y: 0, duration: 3}, "-=2")

const swimmingScroll = new ScrollMagic.Controller();
const swimForward = new ScrollMagic.Scene({
    triggerElement: "#about",
    triggerHook: 0.3,
})
.setTween(swimmingTl)
.addIndicators({name: "swim", indent: 200})
.addTo(swimmingScroll);

//Project show up
const projectTl = gsap.timeline();
projectTl.to(".project-img", {y: 0, opacity: 1, duration: 2, stagger: .7})
projectTl.to(".project-text", {y: 0, opacity: 1, duration: 2, stagger: .7}, "-=3")

const projectScroll = new ScrollMagic.Controller();
const projectAppear = new ScrollMagic.Scene({
    triggerElement: "#projects",
    offset: 300
})
.setTween(projectTl)
.addIndicators({name: "project", indent: 200})
.addTo(projectScroll);

//Contact orange rolling
const orangeRollController = new ScrollMagic.Controller();
const orangeRolling = new ScrollMagic.Scene({
    triggerElement: "#cta",
    triggerHook: 0.5,
})
.setTween(".orange-left", {x: 0, rotate: 360*4, duration: 3})
//.addIndicators({name: "orange", indent: 200})
.addTo(orangeRollController);

//Nav button effects
const navBtns = document.querySelectorAll(".icon-text a");
const aboutFont = document.querySelector(".about-font");
const projectsFont = document.querySelector(".projects-font");
const contactFont = document.querySelector(".contact-font");

navBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", (event) => {
    const icon = event.target.className;
    const tl = gsap.timeline();
    switch (icon) {
      case "about-icon":
        tl.to(".about-image", { opacity: 0, scale: 0, duration: 0.2 });
        tl.to(".about-icon-txt", { opacity: 1, duration: 0.5 });
        break;
      case "projects-icon":
        tl.to(".projects-image", { opacity: 0, scale: 0, duration: 0.2 });
        tl.to(".projects-icon-txt", { opacity: 1, duration: 0.5 });
        break;
      case "contact-icon":
        tl.to(".contact-image", { opacity: 0, scale: 0, duration: 0.2 });
        tl.to(".contact-icon-txt", { opacity: 1, duration: 0.5 });
        break;
      default:
        break;
    }
  });
});

navBtns.forEach((btn) => {
  btn.addEventListener("mouseout", (event) => {
    let icon = event.target.className;
    const tl = gsap.timeline();
    switch (icon) {
      case "about-icon":
        tl.to(".about-image", { opacity: 1, scale: 1, duration: 0.5 });
        tl.to(".about-icon-txt", { opacity: 0, duration: 0.3 });
        isStillThere();
        break;
      case "projects-icon":
        tl.to(".projects-image", { opacity: 1, scale: 1, duration: 0.3 });
        tl.to(".projects-icon-txt", { opacity: 0, duration: 0.3 });
        isStillThere();
        break;
      case "contact-icon":
        tl.to(".contact-image", { opacity: 1, scale: 1, duration: 0.3 });
        tl.to(".contact-icon-txt", { opacity: 0, duration: 0.3 });
        isStillThere();
        break;
      default:
        break;
    }
  });
 
});

function isStillThere() {
    const iconText = document.querySelectorAll(".icon-text");
    iconText.forEach((icon) => {
        console.log(icon);
        if (icon.style.opacity === 1) {
            icon.style.opacity = 0;
        }
    });
}


