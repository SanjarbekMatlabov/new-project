document.addEventListener('DOMContentLoaded', () => {

    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuIcon.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }


    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

});
const scrollbar = document.getElementById('myScrollbar');
    const thumb = document.getElementById('scrollbarThumb');
    const scrollContent = document.getElementById('scrollContent');

    let isDragging = false;
    let startY = 0;

    // Matnning umumiy kengligi (faqat bir marta hisoblanadi)
    const contentWidth = scrollContent.scrollWidth - window.innerWidth;

    // Thumb drag boshlash
    thumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY - thumb.offsetTop;
      document.body.style.userSelect = 'none';
    });

    // Drag harakati
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const rect = scrollbar.getBoundingClientRect();
      const y = e.clientY - rect.top - startY;
      const maxY = scrollbar.offsetHeight - thumb.offsetHeight;
      const boundedY = Math.max(0, Math.min(y, maxY));

      thumb.style.top = `${boundedY}px`;

      const scrollRatio = boundedY / maxY;

      // Sahifani scroll qilish
      const maxPageScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, scrollRatio * maxPageScroll);

      // Matnni gorizontal siljitish
      const translateX = -scrollRatio * contentWidth;
      scrollContent.style.transform = `translateX(${translateX}px)`;
    });

    // Drag tugashi
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.userSelect = '';
    });

    // Sahifa scroll qilinsa
    window.addEventListener('scroll', () => {
      if (isDragging) return;

      const scrollRatio = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
      const maxY = scrollbar.offsetHeight - thumb.offsetHeight;
      thumb.style.top = `${scrollRatio * maxY}px`;

      // Matnni sinxron siljitish
      const translateX = -scrollRatio * contentWidth;
      scrollContent.style.transform = `translateX(${translateX}px)`;
    });

    // Responsive: Mobil qurilmalarda scrollbar yashirish
    const updateScrollbar = () => {
      if (window.innerWidth <= 768) {
        scrollbar.style.display = 'none';
      } else {
        scrollbar.style.display = 'block';
      }
    };

    window.addEventListener('resize', updateScrollbar);
    updateScrollbar();