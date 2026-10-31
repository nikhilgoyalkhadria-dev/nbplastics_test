/**
 * N.B. PLASTICS — Core JavaScript Functionality
 * Pure Vanilla JS, zero runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCatalogFilters();
  initRfqForm();
  initMobileDrawer();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('nb_plastics_theme');
  
  // Check preference or stored setting
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon(storedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nb_plastics_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ==========================================================================
   2. Material Catalog Filtering
   ========================================================================== */
function initCatalogFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const materialCards = document.querySelectorAll('.material-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      materialCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
        }
      });
    });
  });

  // Material Card "Get Rate" triggers
  const inquiryLinks = document.querySelectorAll('.card-link');
  inquiryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const materialName = link.getAttribute('data-material');
      const selectEl = document.getElementById('rfq-material');
      if (selectEl && materialName) {
        // Set select value if matches
        for (let i = 0; i < selectEl.options.length; i++) {
          if (selectEl.options[i].text.includes(materialName) || selectEl.options[i].value.includes(materialName)) {
            selectEl.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}

/* ==========================================================================
   3. RFQ Form & WhatsApp Dispatch Generator
   ========================================================================== */
function initRfqForm() {
  const form = document.getElementById('rfq-form');
  const feedback = document.getElementById('form-feedback');
  
  // Official WhatsApp Dispatch desk contact (Sector 10, Noida)
  const defaultWhatsAppNumber = "919711283371"; 

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const company = document.getElementById('rfq-company').value.trim();
    const phone = document.getElementById('rfq-phone').value.trim();
    const material = document.getElementById('rfq-material').value;
    const quantity = document.getElementById('rfq-quantity').value.trim();
    const destination = document.getElementById('rfq-destination').value.trim();
    const notes = document.getElementById('rfq-notes').value.trim();

    if (!company || !phone) {
      alert('Please fill in your company/name and phone number.');
      return;
    }

    // Build structured inquiry text for WhatsApp
    const message = `*N.B. PLASTICS - MATERIAL INQUIRY*\n` +
      `--------------------------------\n` +
      `*Company/Buyer:* ${company}\n` +
      `*Phone/WhatsApp:* ${phone}\n` +
      `*Material Required:* ${material}\n` +
      `*Estimated Volume:* ${quantity || 'Spot Batch'}\n` +
      `*Delivery Location:* ${destination || 'Noida / Delhi NCR'}\n` +
      (notes ? `*Technical Notes:* ${notes}\n` : '') +
      `--------------------------------\n` +
      `_Sent via nbplastics.com web catalog_`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodedMsg}`;

    // Show on-page confirmation
    if (feedback) {
      feedback.classList.add('success');
      feedback.innerHTML = `
        <strong>Quotation Logged!</strong> Preparing your WhatsApp dispatch inquiry... 
        <br><span style="font-size:0.75rem; opacity:0.85;">If WhatsApp does not open automatically, <a href="${waUrl}" target="_blank" style="text-decoration:underline; font-weight:700;">click here to chat directly</a>.</span>
      `;
    }

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  });
}

/* ==========================================================================
   4. Mobile Menu Drawer
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  if (!drawer || !openBtn) return;

  const toggleDrawer = (open) => {
    if (open) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  openBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) toggleDrawer(false);
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

/* ==========================================================================
   5. Smooth Scroll Offset
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight || 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
