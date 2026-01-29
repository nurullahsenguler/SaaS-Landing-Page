const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

// Menüyü ve Bulanıklığı Aç/Kapat
function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);

// Boşluğa (Overlay) tıklayınca da kapansın
overlay.addEventListener("click", toggleMenu);

// Linklere tıklayınca her şeyi kapat
document.querySelectorAll(".nav-center a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// Smooth scroll (Mevcut kodun)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId !== "#") {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// FAQ Accordion Mantığı
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;

    // Diğer açık olanları kapatmak istersen (isteğe bağlı):
    // document.querySelectorAll('.faq-item').forEach(item => {
    //   if (item !== faqItem) item.classList.remove('active');
    // });

    faqItem.classList.toggle("active");
  });
});


/* =========================
    SCROLL REVEAL (Animasyonlar)
========================= */
const revealElements = document.querySelectorAll(".reveal");

const scrollReveal = () => {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150; // Ne kadar yaklaşınca görünsün

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", scrollReveal);
// Sayfa ilk yüklendiğinde de kontrol et (hero kısmı için)
scrollReveal();


/* =========================
    ACTIVE LINK & BACK TO TOP
========================= */
const sections = document.querySelectorAll("section[id]");
const backToTopBtn = document.createElement("button");
backToTopBtn.id = "backToTop";
backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  // 1. Active Link Mantığı
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // Navbar yüksekliği kadar pay bırak
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-center a[href*=" + sectionId + "]")?.classList.add("active-link");
    } else {
      document.querySelector(".nav-center a[href*=" + sectionId + "]")?.classList.remove("active-link");
    }
  });

  // 2. Back to Top Görünürlüğü
  if (scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Yukarı çık butonu tıklama olayı
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});