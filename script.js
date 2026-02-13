
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.style.color = "var(--color-primary)"
        } else {
          link.style.color = ""
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

let lastScrollTop = 0
const nav = document.querySelector(".nav")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 50) {
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    nav.style.boxShadow = "none"
  }

  lastScrollTop = scrollTop
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.querySelectorAll(".project-card, .skill-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})

console.log("[v0] Portfolio website loaded successfully")
