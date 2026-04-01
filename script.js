// Embedded data
const siteData = {
  company: {
    name: "Venus Handicrafts",
    established: 1972,
    tagline: "since 1972 | certified exporter",
    certifications: ["ISO 9001:2015", "Certified Exporter"],
    contact: {
      address: "Venus Handicrafts Pvt. Ltd.\nF-42, Export House, Jaipur - 302002, Rajasthan, India",
      phone: "+91-141-4001122",
      email: "exports@venushandicrafts.com",
      website: "www.venushandicrafts.com"
    }
  },
  products: [
    { name: "Iron Handicrafts", icon: "fas fa-cog", description: "Exquisite iron craft pieces" },
    { name: "Glass Handicrafts", icon: "fas fa-wine-bottle", description: "Elegant glass decor" },
    { name: "Brass Handicrafts", icon: "fas fa-crown", description: "Timeless brass artistry" },
    { name: "Wood Handicrafts", icon: "fas fa-tree", description: "Natural wood creations" },
    { name: "Aluminium Handicrafts", icon: "fas fa-industry", description: "Modern aluminium designs" },
    { name: "Handicraft Decorative", icon: "fas fa-fan", description: "Decorative masterpieces" },
    { name: "Tablewares", icon: "fas fa-utensils", description: "Elegant dining essentials" },
    { name: "Home Décor", icon: "fas fa-couch", description: "Beautiful home accents" },
    { name: "Candle Accessories", icon: "fa-solid fa-menorah", description: "Ambient candle holders" },
    { name: "Metal Wall Art", icon: "fas fa-palette", description: "Stunning wall sculptures" },
    { name: "Glass", icon: "fas fa-wine-bottle", description: "Glass Masterpieces" },
    { name: "Stone Craft", icon: "fas fa-gem", description: "Natural stone artistry" }
  ],
  gallery: [
    { title: "Iron Sculptures", icon: "fas fa-hammer", subtitle: "artisan craft" },
    { title: "Glass Vases", icon: "fas fa-glass-cheers", subtitle: "artisan craft" },
    { title: "Brass Lamps", icon: "fas fa-lightbulb", subtitle: "artisan craft" },
    { title: "Wooden Carvings", icon: "fas fa-igloo", subtitle: "artisan craft" },
    { title: "Aluminium Bowls", icon: "fa-solid fa-bowl-food", subtitle: "artisan craft" },
    { title: "Decorative Trays", icon: "fas fa-th-large", subtitle: "artisan craft" },
    { title: "Hand-painted Plates", icon: "fas fa-paintbrush-fine", subtitle: "artisan craft" },
    { title: "Candle Holders", icon: "fas fa-fire", subtitle: "artisan craft" }
  ],
  faqs: [
    {
      question: "What is your minimum order quantity?",
      answer: "We welcome both small and bulk orders. Minimum order quantity typically 50 pieces per design, but sample orders can be arranged."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we export to global importers, wholesalers & retailers across USA, Europe, Middle East, Australia and more."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "We prioritize sustainable sourcing and use eco-conscious processes. Many products are crafted from recycled metals & responsibly sourced wood."
    },
    {
      question: "Can I get custom designs?",
      answer: "Absolutely! We offer OEM and custom designs based on your requirements. Our design team works with global clients."
    },
    {
      question: "What is your lead time?",
      answer: "Standard production lead time 30-45 days depending on order volume. Sample dispatch within 10-12 days."
    },
    {
      question: "Are you a certified company?",
      answer: "Yes, Venus Handicrafts is ISO 9001:2015 certified and recognized by export promotion councils."
    }
  ]
};

// Smooth scrolling function
function smoothScrollTo(targetElement, offset = 80) {
  if (!targetElement) return;
  
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Initialize smooth scrolling for all navigation links and buttons
function initSmoothScrolling() {
  // Select all anchor links that start with #
  const allLinks = document.querySelectorAll('a[href^="#"]');
  
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
        }
        
        // Smooth scroll to target
        smoothScrollTo(targetElement, 80);
      }
    });
  });
  
  // Handle any buttons that might have data-scroll attributes
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');
  scrollButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll-to');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoothScrollTo(targetElement, 80);
      }
    });
  });
}

// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if(mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Contact form handler
const inquiryForm = document.getElementById('inquiryForm');
const feedback = document.getElementById('formFeedback');
if(inquiryForm) {
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const msg = document.getElementById('msgInput').value.trim();
    if(name && email && msg) {
      feedback.innerHTML = '<i class="fas fa-check-circle" style="color:green;"></i> Thank you! Our team will contact you soon.';
      feedback.style.color = '#2c7a47';
      inquiryForm.reset();
      setTimeout(() => { feedback.innerHTML = ''; }, 4000);
    } else {
      feedback.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill all fields.';
      feedback.style.color = '#b33';
    }
  });
}

// Global function to toggle FAQ answers (used after dynamic render)
function attachFaqToggles() {
  document.querySelectorAll('.faq-question').forEach(question => {
    // Remove existing listener to avoid duplicates
    question.removeEventListener('click', question._listener);
    const handler = function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.fa-chevron-down, .fa-chevron-up');
      if(answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        if(icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      } else {
        answer.style.display = 'none';
        if(icon) {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        }
      }
    };
    question.addEventListener('click', handler);
    question._listener = handler;
  });
}

// Helper to escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
    return c;
  });
}

// Render products from embedded data
function renderProducts() {
  const productsContainer = document.getElementById('productsContainer');
  if (productsContainer && siteData.products && Array.isArray(siteData.products)) {
    productsContainer.innerHTML = '';
    siteData.products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      const iconClass = product.icon ? product.icon : 'fas fa-gem';
      card.innerHTML = `
        <i class="${iconClass}"></i>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
      `;
      productsContainer.appendChild(card);
    });
  } else if (productsContainer) {
    productsContainer.innerHTML = '<p>No product data available.</p>';
  }
}

// Render gallery from embedded data
function renderGallery() {
  const galleryContainer = document.getElementById('galleryContainer');
  if (galleryContainer && siteData.gallery && Array.isArray(siteData.gallery)) {
    galleryContainer.innerHTML = '';
    siteData.gallery.forEach(item => {
      const galleryCard = document.createElement('div');
      galleryCard.className = 'gallery-card';
      const iconClass = item.icon ? item.icon : 'fas fa-image';
      galleryCard.innerHTML = `
        <i class="${iconClass}"></i>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.subtitle)}</p>
      `;
      galleryContainer.appendChild(galleryCard);
    });
  } else if (galleryContainer) {
    galleryContainer.innerHTML = '<p>Gallery items not available.</p>';
  }
}

// Render FAQs from embedded data
function renderFaqs() {
  const faqContainer = document.getElementById('faqContainer');
  if (faqContainer && siteData.faqs && Array.isArray(siteData.faqs)) {
    faqContainer.innerHTML = '';
    siteData.faqs.forEach((faq, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML = `
        <div class="faq-question" style="cursor:pointer;">
          <span><i class="fas fa-question-circle" style="color:#b28244; margin-right: 10px;"></i> ${escapeHtml(faq.question)}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer" style="display: none;">
          ${escapeHtml(faq.answer)}
        </div>
      `;
      faqContainer.appendChild(faqItem);
    });
    attachFaqToggles();
  } else if (faqContainer) {
    faqContainer.innerHTML = '<p>FAQs not available.</p>';
  }
}

// Render dynamic tags for sitemap
function renderDynamicTags() {
  const tagsContainer = document.getElementById('dynamicTags');
  if (tagsContainer && siteData.products && Array.isArray(siteData.products)) {
    const keywords = ['Iron', 'Glass', 'Brass', 'Wood', 'Aluminium', 'Ceramic', 'Metal', 'Stone', 'Marble'];
    let existingSpans = Array.from(tagsContainer.querySelectorAll('span')).map(span => span.innerText);
    keywords.forEach(kw => {
      if (!existingSpans.includes(kw)) {
        const span = document.createElement('span');
        span.textContent = kw;
        tagsContainer.appendChild(span);
      }
    });
  }
}

// Add CSS for smooth scrolling to HTML element
function addSmoothScrollStyle() {
  const style = document.createElement('style');
  style.textContent = `
    html {
      scroll-behavior: smooth;
    }
    
    /* Smooth transition for all elements */
    * {
      transition: all 0.3s ease-in-out;
    }
    
    /* Smooth hover effects for buttons and links */
    a, button {
      transition: all 0.3s ease;
    }
    
    /* Smooth transform for product cards and gallery items */
    .product-card, .gallery-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover, .gallery-card:hover {
      transform: translateY(-5px);
    }
  `;
  document.head.appendChild(style);
}

// Initialize all data rendering and smooth scrolling
function init() {
  addSmoothScrollStyle();
  renderProducts();
  renderGallery();
  renderFaqs();
  renderDynamicTags();
  initSmoothScrolling();
}

// Start the application
init();