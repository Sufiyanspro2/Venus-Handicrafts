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

  // Fetch and render data from data.json
  async function loadData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Failed to load data.json');
      const data = await response.json();

      // 1. Render Products Section
      const productsContainer = document.getElementById('productsContainer');
      if (productsContainer && data.products && Array.isArray(data.products)) {
        productsContainer.innerHTML = '';
        data.products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          // Use icon from JSON if exists, fallback to default
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

      // 2. Render Gallery Section (with images + icon + title/desc)
      const galleryContainer = document.getElementById('galleryContainer');
      if (galleryContainer && data.gallery && Array.isArray(data.gallery)) {
        galleryContainer.innerHTML = '';
        // Provided gallery images from unsplash to match product feel
        const fallbackImages = [
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1562329267-1d8f3ec6fad2?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1558367843-f08c1e9a16ae?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1574702483862-ff4e6b2b7f3b?w=400&h=300&fit=crop"
        ];
        data.gallery.forEach((item, idx) => {
          const card = document.createElement('div');
          card.className = 'gallery-card';
          const imgUrl = item.imageUrl || fallbackImages[idx % fallbackImages.length];
          const iconClass = item.icon ? item.icon : 'fas fa-camera';
          const title = item.title || 'Artisan Creation';
          const subtitle = item.subtitle || (item.description || 'Handcrafted with love');
          card.innerHTML = `
            <img src="${imgUrl}" alt="${escapeHtml(title)}" loading="lazy">
            <i class="${iconClass}"></i>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(subtitle)}</p>
          `;
          galleryContainer.appendChild(card);
        });
      } else if (galleryContainer) {
        galleryContainer.innerHTML = '<p>Gallery data unavailable.</p>';
      }

      // 3. Render FAQ Section (using faqs array from JSON)
      const faqContainer = document.getElementById('faqContainer');
      if (faqContainer && data.faqs && Array.isArray(data.faqs)) {
        faqContainer.innerHTML = '';
        data.faqs.forEach((faq, index) => {
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

      // 4. Optionally enrich sitemap tags from product categories (dynamic)
      const tagsContainer = document.getElementById('dynamicTags');
      if (tagsContainer && data.products && Array.isArray(data.products)) {
        // extract unique material-like tags from product names
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

    } catch (error) {
      console.error('Error loading data.json:', error);
      // Fallback: show static content if JSON fails to load but keep user experience
      const productsContainer = document.getElementById('productsContainer');
      if (productsContainer) {
        productsContainer.innerHTML = `
          <div class="product-card"><i class="fas fa-hammer"></i><h3>Iron Filigree Vase</h3><p>Handcrafted iron with antique finish</p></div>
          <div class="product-card"><i class="fa-solid fa-menorah"></i><h3>Brass Candle Stand</h3><p>Traditional brass with intricate carving</p></div>
          <div class="product-card"><i class="fas fa-tree"></i><h3>Wooden Wall Art</h3><p>Mango wood floral patterns</p></div>
          <div class="product-card"><i class="fas fa-utensils"></i><h3>Aluminium Serving Tray</h3><p>Modern minimalist design</p></div>
          <div class="product-card"><i class="fas fa-wine-bottle"></i><h3>Glass Decorative Bowl</h3><p>Hand-blown colored glass</p></div>
          <div class="product-card"><i class="fas fa-paw"></i><h3>Metal Elephant Sculpture</h3><p>Brass & iron fusion</p></div>
        `;
      }
      const galleryContainer = document.getElementById('galleryContainer');
      if (galleryContainer) {
        galleryContainer.innerHTML = `
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop"><i class="fas fa-mug-hot"></i><h3>Handcrafted Ceramic Pottery</h3><p>Traditional hand-painted ceramic</p></div>
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"><i class="fas fa-trophy"></i><h3>Brass Artifacts Collection</h3><p>Elegant brass decor items</p></div>
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1562329267-1d8f3ec6fad2?w=400&h=300&fit=crop"><i class="fas fa-tree"></i><h3>Wooden Masterpieces</h3><p>Exquisite hand-carved wood</p></div>
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop"><i class="fas fa-wine-bottle"></i><h3>Art Glass Collection</h3><p>Hand-blown glass art</p></div>
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1558367843-f08c1e9a16ae?w=400&h=300&fit=crop"><i class="fas fa-cube"></i><h3>Metal Art Sculptures</h3><p>Contemporary metal art</p></div>
          <div class="gallery-card"><img src="https://images.unsplash.com/photo-1574702483862-ff4e6b2b7f3b?w=400&h=300&fit=crop"><i class="fas fa-utensils"></i><h3>Decorative Tableware</h3><p>Elegant serving pieces</p></div>
        `;
      }
      const faqContainer = document.getElementById('faqContainer');
      if (faqContainer) {
        faqContainer.innerHTML = `
          <div class="faq-item"><div class="faq-question"><span><i class="fas fa-question-circle"></i> Do you export worldwide?</span><i class="fas fa-chevron-down"></i></div><div class="faq-answer" style="display:none;">Yes, we ship globally to importers and wholesalers.</div></div>
          <div class="faq-item"><div class="faq-question"><span><i class="fas fa-paintbrush"></i> Can I get custom designs?</span><i class="fas fa-chevron-down"></i></div><div class="faq-answer" style="display:none;">Absolutely! OEM orders welcome.</div></div>
        `;
        attachFaqToggles();
      }
    }
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

  // Initialize data load
  loadData();