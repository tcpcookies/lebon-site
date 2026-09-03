/* ========================================
   HK LEBON - Main Interaction Script
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // Header scroll effect
  // ========================================
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // Mobile nav toggle
  // ========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ========================================
  // Smooth scroll for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ========================================
  // Reveal on scroll
  // ========================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.category-card, .product-card, .strength-card, .process-step, .metric-card, .story-block, .faq-item, .section-header'
  ).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ========================================
  // Lightbox for product images
  // ========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.product-card, .hero-img-main, .hero-img-float').forEach(card => {
      card.style.cursor = 'zoom-in';
      card.addEventListener('click', e => {
        const img = card.querySelector('img');
        if (!img) return;
        e.preventDefault();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Product preview';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ========================================
  // Inquiry form -> WhatsApp
  // ========================================
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(inquiryForm);
      const name = (data.get('name') || '').toString().trim();
      const company = (data.get('company') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const country = (data.get('country') || '').toString().trim();
      const category = (data.get('category') || '').toString().trim();
      const quantity = (data.get('quantity') || '').toString().trim();
      const timeline = (data.get('timeline') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const lines = [];
      lines.push('*New Inquiry from HK LEBON website*');
      lines.push('');
      if (name)     lines.push(`*Name:* ${name}`);
      if (company)  lines.push(`*Company:* ${company}`);
      if (email)    lines.push(`*Email:* ${email}`);
      if (phone)    lines.push(`*Phone:* ${phone}`);
      if (country)  lines.push(`*Country:* ${country}`);
      if (category) lines.push(`*Product Interest:* ${category}`);
      if (quantity) lines.push(`*Quantity:* ${quantity}`);
      if (timeline) lines.push(`*Timeline:* ${timeline}`);
      if (message)  lines.push('', '*Message:*', message);

      const text = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/8613631512415?text=${text}`, '_blank');
    });
  }

  // ========================================
  // Close only-one details open at a time (FAQ optional)
  // ========================================
  // kept open by default; user requested FAQ opens independently

  // ========================================
  // Set current nav active state by page
  // ========================================
  // CSS class .active is already set in HTML per page
})();
