(function () {
  function initTestimonialsSwiper(container) {
    var el = container.querySelector('.testimonials__swiper');
    if (!el || typeof Swiper === 'undefined') return;

    if (el.swiper) el.swiper.destroy(true, true);

    var autoplay = el.dataset.autoplay === 'true';
    var autoplaySpeed = parseInt(el.dataset.autoplaySpeed, 10) || 5000;
    var loop = el.dataset.loop === 'true';

    new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: loop,
      speed: 800,
      freeMode: {
        enabled: true,
        momentum: true,
        momentumRatio: 0.5
      },
      autoplay: autoplay ? { delay: autoplaySpeed, disableOnInteraction: false } : false,
      breakpoints: {
        0: { spaceBetween: 16 },
        750: { spaceBetween: 24 }
      }
    });
  }

  function init() {
    var sections = document.querySelectorAll('.testimonials');
    for (var i = 0; i < sections.length; i++) {
      initTestimonialsSwiper(sections[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function (e) {
    if (e.target.querySelector('.testimonials__swiper')) {
      initTestimonialsSwiper(e.target);
    }
  });
})();
