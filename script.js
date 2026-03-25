// ========== GLOBAL DATA STORE ==========
let websiteData = null;

// ========== FETCH DATA FROM JSON FILE ==========
async function fetchWebsiteData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    websiteData = await response.json();
    return websiteData;
  } catch (error) {
    console.error('Error loading data.json:', error);
    // Show error message to users
    const errorMessage = '<div class="error-message" style="text-align:center;padding:2rem;color:#b55b3c;">⚠️ Unable to load data. Please refresh the page.</div>';
    document.getElementById('productGrid').innerHTML = errorMessage;
    document.getElementById('galleryGrid').innerHTML = errorMessage;
    document.getElementById('faqContainer').innerHTML = errorMessage;
    return null;
  }
}

// ========== RENDER PRODUCTS FROM JSON ==========
function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  if (productGrid && websiteData && websiteData.products) {
    productGrid.innerHTML = "";
    websiteData.products.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <i class="${prod.icon}"></i>
        <h3>${prod.name}</h3>
        <p>${prod.description || 'Exquisite quality'}</p>
      `;
      productGrid.appendChild(card);
    });
  }
}

// ========== RENDER GALLERY FROM JSON ==========
function renderGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid && websiteData && websiteData.gallery) {
    galleryGrid.innerHTML = "";
    websiteData.gallery.forEach(item => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <i class="${item.icon}" style="font-size:4rem;"></i>
        <p>${item.title}</p>
        <span>✨ ${item.subtitle || 'artisan craft'}</span>
      `;
      galleryGrid.appendChild(div);
    });
  }
}

// ========== RENDER FAQ ACCORDION FROM JSON ==========
function renderFAQ() {
  const faqContainer = document.getElementById("faqContainer");
  if (faqContainer && websiteData && websiteData.faqs) {
    faqContainer.innerHTML = "";
    websiteData.faqs.forEach((item, idx) => {
      const faqDiv = document.createElement("div");
      faqDiv.className = "faq-item";
      faqDiv.innerHTML = `
        <div class="faq-question">
          <span>${item.question}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer">${item.answer}</div>
      `;
      const questionDiv = faqDiv.querySelector(".faq-question");
      questionDiv.addEventListener("click", () => {
        const isActive = faqDiv.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));
        if (!isActive) faqDiv.classList.add("active");
      });
      faqContainer.appendChild(faqDiv);
    });
  }
}

// ========== UPDATE COMPANY INFO FROM JSON ==========
function updateCompanyInfo() {
  if (websiteData && websiteData.company) {
    // Update logo text if needed
    const logoText = document.querySelector('.logo-text h1');
    const logoSub = document.querySelector('.logo-text p');
    if (logoText && websiteData.company.name) logoText.textContent = websiteData.company.name;
    if (logoSub && websiteData.company.tagline) logoSub.textContent = websiteData.company.tagline;
    
    // Update contact info if needed
    if (websiteData.company.contact) {
      const contactInfoDiv = document.querySelector('.contact-info');
      if (contactInfoDiv && websiteData.company.contact.address) {
        // Optional: dynamically update contact info
      }
    }
  }
}

// ========== CONTACT FORM HANDLER ==========
function initContactForm() {
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const msg = document.getElementById("msgInput").value.trim();
      const feedback = document.getElementById("formFeedback");
      
      if (name && email && msg) {
        feedback.innerHTML = `<span style="color:green;">✓ Thank you ${name}! Our export team will contact you within 24h.</span>`;
        inquiryForm.reset();
        setTimeout(() => feedback.innerHTML = "", 4000);
      } else {
        feedback.innerHTML = `<span style="color:#b55b3c;">Please fill all fields.</span>`;
      }
    });
  }
}

// ========== MOBILE MENU TOGGLE ==========
function initMobileMenu() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
    
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
        }
      });
    });
  }
}

// ========== ACTIVE LINK HIGHLIGHT ON SCROLL ==========
function initActiveLinkHighlight() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    
    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========== INITIALIZE ALL ==========
async function init() {
  // First fetch data from JSON
  await fetchWebsiteData();
  
  // Then render all components with the data
  renderProducts();
  renderGallery();
  renderFAQ();
  updateCompanyInfo();
  
  // Initialize interactive features
  initContactForm();
  initMobileMenu();
  initActiveLinkHighlight();
  initSmoothScroll();
  
  console.log("Venus Handicrafts | All modules initialized with data.json");
}

// Start the application when DOM is ready
document.addEventListener("DOMContentLoaded", init);