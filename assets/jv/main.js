/* =====================================================
   Resume section tabs and tab contents
===================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const resumeTab = document.querySelector(".resume-tabs");
    const resumePortfolioTabBtns = resumeTab.querySelectorAll(".tab-btn");
    const resumeTabContents = document.querySelectorAll(".resume-tab-content");

    var resumeTabNav = function(resumeTabClick) {
        // Hiding all contents and removing active class
        resumeTabContents.forEach((resumeTabContent) => {
            resumeTabContent.style.display = "none"; // Ensure contents are hidden
            resumeTabContent.classList.remove("active");
        });

        // Removing active class from all tab buttons
        resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
            resumePortfolioTabBtn.classList.remove("active");
        });

        // Displaying the selected content
        resumeTabContents[resumeTabClick].style.display = "flex"; // Show the clicked content
        setTimeout(() => {
            resumeTabContents[resumeTabClick].classList.add("active"); // Adding the active class with delay
        }, 100);

        // Adding active class to the clicked tab button
        resumePortfolioTabBtns[resumeTabClick].classList.add("active");
    }

    // Add event listeners to each tab button
    resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
        resumePortfolioTabBtn.addEventListener("click", (e) => {
            e.preventDefault();  // Prevent default anchor behavior
            resumeTabNav(i);
        });
    });
});

/* =====================================================
   Service modal open/close function
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const ServiceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

    ServiceCardWithModals.forEach((ServiceCardWithModal) => {
        const serviceCard = ServiceCardWithModal.querySelector(".service-card");
        const serviceBackDrop = ServiceCardWithModal.querySelector(".service-modal-backdrop");
        const modalCloseBtn = ServiceCardWithModal.querySelector(".modal-close-btn");
        const serviceModal = ServiceCardWithModal.querySelector(".service-modal");

        // Cek apakah elemen ditemukan
        console.log(serviceCard, serviceBackDrop, modalCloseBtn, serviceModal);

        // Pastikan elemen ditemukan sebelum menambahkan event listener
        if (serviceCard && serviceBackDrop && modalCloseBtn && serviceModal) {
            serviceCard.addEventListener("click", () => {
                serviceBackDrop.style.display = "flex";
                setTimeout(() => {
                    serviceBackDrop.classList.add("active");
                }, 100);

                setTimeout(() => {
                    serviceModal.classList.add("active");
                }, 300);
            });

            modalCloseBtn.addEventListener("click", () => {
                setTimeout(() => {
                    serviceBackDrop.style.display = "none";
                }, 500);

                setTimeout(() => {
                    serviceBackDrop.classList.remove("active");
                    serviceModal.classList.remove("active");
                }, 100);
            });
        }
    });
});


/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */
// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {
   const portfolioTabs = document.querySelector(".portfolio-tabs");
   if (portfolioTabs) { // Check if the element exists
      const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
      const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

      portfolioTabBtns.forEach((tabBtn) => {
         tabBtn.addEventListener("click", () => {
            const filter = tabBtn.getAttribute("data-filter");

            cardsWithModals.forEach((cardsWithModal) => {
               if (filter === "all" || cardsWithModal.classList.contains(filter)) {
                  cardsWithModal.classList.remove("hidden");

                  setTimeout(() => {
                     cardsWithModal.style.opacity = "1";
                     cardsWithModal.style.transition = ".3s";
                  }, 1)
               } else {
                  cardsWithModal.classList.add("hidden");

                  setTimeout(() => {
                     cardsWithModal.style.opacity = "0"
                     cardsWithModal.style.transition = ".3s";
                  }, 1)
               }
            });
            // Add active class to clicked tab button
            portfolioTabBtns.forEach(btn => btn.classList.remove("active"));
            tabBtn.classList.add("active");
         });
      });
   }
});
// Open/Close Portfolio modals.

const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

if (portfolioCardsWithModals.length > 0) { // Ensure the elements exist
   portfolioCardsWithModals.forEach((portfolioCardsWithModal) => {
      const portfolioCard = portfolioCardsWithModal.querySelector(".portfolio-card");
      const portfolioBackDrop = portfolioCardsWithModal.querySelector(".portfolio-modal-backdrop");
      const portfolioModal = portfolioCardsWithModal.querySelector(".portfolio-modal");
      const portfolioCloseBtn = portfolioCardsWithModal.querySelector(".modal-close-btn");

      portfolioCard.addEventListener("click", () => {
         portfolioBackDrop.style.display = "flex";

         setTimeout(() => {
            portfolioBackDrop.classList.add("active");
         }, 300);

         setTimeout(() => {
            portfolioModal.classList.add("active");
         }, 300);
      });

      portfolioCloseBtn.addEventListener("click", () => {

         setTimeout(() => {
            portfolioBackDrop.style.display = "none";
         }, 500);

         setTimeout(() => {
            portfolioBackDrop.classList.remove("active");
            portfolioModal.classList.remove("active");
         }, 100);
      });
   });
}


/* =====================================================
   Academic Recomendation Swiper
===================================================== */
var swiper = new Swiper(".ell-academic-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   loop: true,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
      },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      },
});


/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function () {
   // Inisialisasi EmailJS
   emailjs.init({
      publicKey: "6-JKKzi2Ccyr7yYQm",
   });
})();

const ellContactForm = document.getElementById("ell-contact-form");
const ellContactFormAllert = document.querySelector(".contact-form-alert");
const recaptchaContainer = document.getElementById("recaptcha-container");

let hasSentBefore = false; // 🔁 Penanda apakah user sudah pernah mengirim
let isCaptchaShown = false;

ellContactForm.addEventListener("submit", function (event) {
   event.preventDefault();

   // Jika sudah pernah kirim, maka reCAPTCHA wajib
   if (hasSentBefore) {
      const recaptchaResponse = grecaptcha.getResponse();

      if (!recaptchaResponse) {
         if (!isCaptchaShown) {
            recaptchaContainer.style.display = "block";
            isCaptchaShown = true;
            ellContactFormAllert.innerHTML = "<span>Please verify you are not a robot.</span> <i class='ri-error-warning-fill'></i>";
         }
         return;
      }
   }

   // Kirim form via EmailJS
   emailjs.sendForm('service_m2646dm', 'template_tmvxdvm', '#ell-contact-form')
      .then(() => {
         ellContactFormAllert.innerHTML = "<span>Your message sent successfully! Thank you!</span> <i class='ri-checkbox-circle-fill'></i>";
         ellContactForm.reset();
         
         // Reset reCAPTCHA jika sudah tampil
         if (hasSentBefore) {
            grecaptcha.reset();
            recaptchaContainer.style.display = "none";
         }

         hasSentBefore = true; // 🔁 Mulai aktifkan reCAPTCHA di pengiriman berikutnya
         isCaptchaShown = false;

         setTimeout(() => {
            ellContactFormAllert.innerHTML = "";
         }, 5000);
      }, (error) => {
         ellContactFormAllert.innerHTML = "<span>Your message not sent!</span> <i class='ri-error-warning-fill'></i>";
         ellContactFormAllert.title = error;
      });
});


/* ==============================
Voice recognation
======================= */
 window.addEventListener("DOMContentLoaded", () => {
    const startVoiceBtn = document.getElementById("startVoice");
    const micIcon = document.getElementById("micIcon");
    const voiceInput = document.getElementById("voiceInput");
    const languageSelect = document.getElementById("languageSelect");

    let isRecording = false;
    let recognition = null;

    function initRecognition(lang) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = lang;
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map(r => r[0].transcript).join(" ");
        voiceInput.value = transcript.trim();
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        stopRecording();
      };

      recognition.onend = () => {
        stopRecording();
      };
    }

    function startRecording(lang) {
      initRecognition(lang);
      recognition.start();
      isRecording = true;
      micIcon.classList.replace("ri-mic-off-fill", "ri-mic-fill");
    }

    function stopRecording() {
      if (recognition) {
        recognition.stop();
      }
      isRecording = false;
      micIcon.classList.replace("ri-mic-fill", "ri-mic-off-fill");
    }

    // when tombol mic clicked
    startVoiceBtn.addEventListener("click", () => {
      if (!isRecording) {
        languageSelect.style.display = "block";
        languageSelect.focus();
      } else {
        stopRecording();
      }
    });

    // when languange choosen, directly Start Record
    languageSelect.addEventListener("change", () => {
      const lang = languageSelect.value;
      languageSelect.style.display = "none";
      startRecording(lang);
    });
  });

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener('scroll', function () {
   const subHeader = document.querySelector(".ell-header");

   subHeader.classList.toggle('shrink', window.scrollY > 0);
});

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.scrollY; // Gunakan window.scrollY untuk scroll vertical

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50; // Sesuaikan dengan margin offset jika diperlukan
      let id = navMenuSection.getAttribute("id");

      const link = document.querySelector(".bottom-nav .menu li a[href*=" + id + "]");

      // Jika scroll berada dalam rentang section ini, tambahkan kelas 'current'
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         link.classList.add("current");
      } else {
         // Jika scroll tidak dalam rentang section ini, hapus kelas 'current'
         link.classList.remove("current");
      }
   });
});

function stylePickaxe() {
  const pickaxeFrame = document.querySelector(".pickaxe-embed > div");
  if (pickaxeFrame && !pickaxeFrame.dataset.styled) {
    pickaxeFrame.style.width = "400px";
    pickaxeFrame.style.height = "800px";
    pickaxeFrame.style.bottom = "-40px";
    pickaxeFrame.style.right = "90px";
    pickaxeFrame.style.overflow = "hidden";

    if (pickaxeFrame.firstChild) {
      pickaxeFrame.firstChild.style.transform = "translateY(-50px)";
      pickaxeFrame.firstChild.style.marginTop = "0px";
    }

    pickaxeFrame.dataset.styled = "true";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const chatbotTrigger = document.getElementById("deployment-b4ca20dc-fcf7-47be-95a0-1cd2c6172573");
  const container = document.querySelector(".pickaxe-container");

  chatbotTrigger.addEventListener("click", (event) => {
    const pickaxeFrame = document.querySelector(".pickaxe-embed > div");

    // Jika pickaxeFrame belum ada, langsung toggle
    if (!pickaxeFrame) {
      toggleContainer(container);
      return;
    }

    // Cek apakah klik terjadi di dalam pickaxeFrame
    const isInsidePickaxe = pickaxeFrame.contains(event.target);

    if (!isInsidePickaxe) {
      // Klik di luar konten pickaxe -> toggle
      toggleContainer(container);
    }
    // Jika klik di dalam pickaxe, biarkan terbuka (tidak tutup)
  });

  const observer = new MutationObserver(() => {
    stylePickaxe();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

function toggleContainer(container) {
  const currentDisplay = window.getComputedStyle(container).display;

  if (currentDisplay === "none") {
    setTimeout(() => {
      container.style.display = "block";
    }, 100);
  } else {
    container.style.display = "none";
  }
}



// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () =>{
   const buttonNav = document.querySelector(".bottom-nav");

   buttonNav.classList.toggle("active", window.scrollY <10);
})


// Javascript to show/hide bottom navigation menu on home(scroll).
const buttomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
let navTimeout;

// Event listener untuk scroll
window.addEventListener("scroll", () => {
   buttomNav.classList.add("active");
   menuShowBtn.classList.remove("active")

   if (window.scrollY < 10) {
      menuHideBtn.classList.remove("active")

      function scrollStopped(){
         buttomNav.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped,2000);
   }
   if (window.scrollY > 10) {
      menuHideBtn.classList.add("active")

      function scrollStopped(){
         buttomNav.classList.remove("active");
         menuShowBtn.classList.add("active")
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped,2000);
   }
});



// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   buttomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});

// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   buttomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});


/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () =>{
   const toTopBtn = document.querySelector(".to-top-btn");

   toTopBtn.classList.toggle("active", window.scrollY > 0);

   const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

   const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

   const scrollValue = (pageScroll / height)*100;

   scrollIndicatorBar.style.height = scrollValue  + "%";
})

/* =====================================================
   Customized cursor on mousemove
===================================================== */

const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
   let x = e.clientX;
   let y = e.clientY;

   cursorDot.style.top = y + "px";
   cursorDot.style.left = x + "px";
   cursorCircle.style.top = y + "px";
   cursorCircle.style.left = x + "px";

})


// Cursor effects on hover website elements.
const cursorHoverLinks = document.querySelectorAll("body a, .theme-btn, .ell-main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn");

cursorHoverLinks.forEach((cursorHoverLink) => {
   cursorCircle.style.display = "none";
   cursorDot.style.display = "none";
   cursorHoverLink.addEventListener("mouseover", () =>{
      cursorDot.classList.add("large");
      cursorDot.style.display = "block";
      cursorCircle.style.display = "none";
   });
});
cursorHoverLinks.forEach((cursorHoverLink) => {
   cursorHoverLink.addEventListener("mouseout", () =>{
      cursorDot.classList.remove("large");
      cursorCircle.style.display = "none";
      cursorDot.style.display = "none";
   });
});



/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   //change theme
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   //save theme
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon")? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme")? "light" : "dark";

   localStorage.setItem("ell-saved-icon", getCurrentIcon());
   localStorage.setItem("ell-saved-theme", getCurrentTheme());
})


// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("ell-saved-icon");
const savedTheme = localStorage.getItem("ell-saved-theme");

document.addEventListener("DOMContentLoaded", () =>{
   themeBtn.classList [savedIcon === "sun" ? "add" : "remove"] ("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"] ("light-theme");
})

/* =====================================================
   ScrollReveal JS animations
===================================================== */
 ScrollReveal({ 
   // reset: true,
   distance: '60px',
   duration:2500,
   delay:400
 });

// Common reveal options to create reveal animations.

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top'});
ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top'});
ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom'});
ScrollReveal().reveal('.about-img', { delay: 700, origin: 'left'});
ScrollReveal().reveal('.about-info', { delay: 300, origin: 'right'});
ScrollReveal().reveal('.pro-card, .about-buttons, .ell-main-btn, .resume-tabs, .tab-btn, .portfolio-tabs, .tab-btn', { delay: 500, origin: 'right', interval:200});
ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom'});
ScrollReveal().reveal('.service-card, .portfolio-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom' ,interval : 300});
ScrollReveal().reveal('.ell-academic-swiper, .contact-form-body', { delay: 700, origin: 'right'});
ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'left'});
ScrollReveal().reveal('.ell-footer, .ell-logo', { delay: 300, origin: 'bottom'});