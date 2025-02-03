const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Skills animation pause on hover
const skillsTrack = document.querySelector(".skills-track");

skillsTrack.addEventListener("mouseenter", () => {
  skillsTrack.style.animationPlayState = "paused";
});

skillsTrack.addEventListener("mouseleave", () => {
  skillsTrack.style.animationPlayState = "running";
});

// Work Page Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      // Filter cards
      workCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "block";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });
});
// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const messageField = document.getElementById("message");
const charCounter = document.querySelector(".char-counter span");

// Real-time input validation
contactForm.addEventListener("input", (e) => {
  const input = e.target;

  if (input.id === "name") {
    validateName(input);
  }

  if (input.id === "email") {
    validateEmail(input);
  }

  if (input.id === "message") {
    updateCharCounter(input);
  }
});

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValid = validateName(document.getElementById("name"));
  const emailValid = validateEmail(document.getElementById("email"));
  const messageValid = validateMessage(document.getElementById("message"));

  if (nameValid && emailValid && messageValid) {
    // Simulate form submission
    showSuccessMessage();
    contactForm.reset();
    charCounter.textContent = "0";
  }
});

function validateName(input) {
  const error = input.nextElementSibling;
  if (input.value.trim().length < 2) {
    error.textContent = "Please enter a valid name";
    return false;
  }
  error.textContent = "";
  return true;
}

function validateEmail(input) {
  const error = input.nextElementSibling;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(input.value)) {
    error.textContent = "Please enter a valid email";
    return false;
  }
  error.textContent = "";
  return true;
}

function validateMessage(input) {
  const error = input.nextElementSibling;
  if (input.value.trim().length < 10) {
    error.textContent = "Message must be at least 10 characters";
    return false;
  }
  error.textContent = "";
  return true;
}

function updateCharCounter(input) {
  const count = input.value.length;
  charCounter.textContent = count;
  charCounter.parentElement.style.color = count > 500 ? "#e74c3c" : "#666";
}

function showSuccessMessage() {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Message sent successfully!
    `;

  contactForm.prepend(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
} // Add to script.js
const formAssistant = {
  messages: [
    "Pro tip: Be specific about your project goals!",
    "Feeling stuck? Just share your main objective!",
    "The more details, the better I can help!",
    "Let's create something user-centric!",
    "Don't forget to include your timeline!",
  ],
  init() {
    this.cycleMessages();
    this.addFieldInteractions();
  },
  cycleMessages() {
    let index = 0;
    setInterval(() => {
      document.querySelector(".active-message").textContent =
        this.messages[index];
      index = (index + 1) % this.messages.length;
    }, 5000);
  },
  addFieldInteractions() {
    const fields = document.querySelectorAll("input, textarea");

    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        this.showContextMessage(field.id);
      });
    });
  },
  showContextMessage(fieldId) {
    const messages = {
      name: "What should I call you?",
      email: "Where can I reach you?",
      message: "Share your vision in detail!",
    };

    if (messages[fieldId]) {
      document.querySelector(".active-message").textContent = messages[fieldId];
    }
  },
};

// Initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => formAssistant.init());

// Smooth scroll and active state
document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = document.querySelectorAll(".toc-link");
  const caseSections = document.querySelectorAll(".case-section");

  // Smooth scroll
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Active state
  window.addEventListener("scroll", () => {
    let current = "";

    caseSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    tocLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// Update current section in TOC
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".case-section");
  const tocLinks = document.querySelectorAll(".toc-list a");
  const currentSection = document.querySelector(".toc-current");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  tocLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      currentSection.textContent = link.textContent;
    }
  });
});

// Smooth scroll
document.querySelectorAll(".toc-list a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    document.getElementById("toc-toggle").checked = false;
  });
});
