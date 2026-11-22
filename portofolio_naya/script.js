document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle Menu Mobile (Hamburger)
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Filter Kategori Pengalaman
  const filterButtons = document.querySelectorAll('#filterPills .pill');
  const featuredBanner = document.querySelector('.featured-banner');
  const expCards = document.querySelectorAll('#expGrid .exp-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.getAttribute('data-filter');

      if (featuredBanner) {
        const cat = featuredBanner.getAttribute('data-category');
        if (selected === 'all' || cat === selected) {
          featuredBanner.classList.remove('is-hidden');
        } else {
          featuredBanner.classList.add('is-hidden');
        }
      }

      expCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (selected === 'all' || cat === selected) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 3. Lightbox Perbesar Foto Kegiatan & Sertifikat
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const gallerySlots = document.querySelectorAll('.gallery-slot');

  gallerySlots.forEach((slot) => {
    slot.addEventListener('click', () => {
      const img = slot.querySelector('img');
      if (!img) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Preview Foto';
      lightboxCaption.textContent = slot.getAttribute('data-caption') || img.alt || '';
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 4. Tombol Salin Email
  const copyBtn = document.getElementById('copyBtn');
  const emailAddress = document.getElementById('emailAddress');

  if (copyBtn && emailAddress) {
    copyBtn.addEventListener('click', () => {
      const emailText = emailAddress.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Tersalin!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    });
  }

  // 5. Animasi Reveal saat Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});