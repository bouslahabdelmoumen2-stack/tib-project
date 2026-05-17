// ============================
// د. محمود رأفت — Main JS
// ============================
 
document.addEventListener('DOMContentLoaded', () => {
 
    // ---------- Mobile menu toggle ----------
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn?.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    // Close on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });
   
    // ---------- Navbar scroll effect ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
   
    // ---------- Active nav link on scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          active?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
   
    // ---------- Scroll reveal ----------
    const revealEls = document.querySelectorAll('.service-card, .gallery-item, .bg-gray-50.rounded-2xl');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('reveal');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => {
      el.classList.add('reveal');
      revealObs.observe(el);
    });
   
    // ---------- Back to top button ----------
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('hidden');
        backToTop.classList.add('flex');
      } else {
        backToTop.classList.add('hidden');
        backToTop.classList.remove('flex');
      }
    });
   
    // ---------- Counter animation ----------
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target || el.innerText.replace(/\D/g, ''), 10);
      const suffix = el.innerText.replace(/[\d,]/g, '').trim();
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.innerText = '+' + current.toLocaleString('ar-EG') + (suffix.includes('%') ? '%' : '');
      }, 25);
    };
    const counterEls = document.querySelectorAll('.text-4xl.font-black');
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObs.observe(el));
   
    // ---------- Appointment form ----------
    const form = document.getElementById('appointmentForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم إرسال طلبك بنجاح!';
        btn.classList.remove('bg-teal-600', 'hover:bg-teal-700');
        btn.classList.add('bg-green-500');
        form.reset();
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i>إرسال طلب الحجز';
          btn.classList.add('bg-teal-600', 'hover:bg-teal-700');
          btn.classList.remove('bg-green-500');
          btn.disabled = false;
        }, 3500);
      }, 1500);
    });
   
    // ---------- WhatsApp float animation ----------
    const waBtn = document.querySelector('a[href*="wa.me"]');
    waBtn?.classList.add('wa-float');
   
  });