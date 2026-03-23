(function () {
  var DURATION = '0.35s';
  var EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';
  var TRANSITION = 'height ' + DURATION + ' ' + EASING;

  function initAccordions(scope) {
    var accordions = scope.querySelectorAll('details[data-accordion]');
    if (!accordions.length) return;

    for (var i = 0; i < accordions.length; i++) {
      if (accordions[i].hasAttribute('data-accordion-init')) continue;
      accordions[i].setAttribute('data-accordion-init', '');
      setupAccordion(accordions[i], scope);
    }
  }

  function setupAccordion(det, scope) {
    var sum = det.querySelector('summary');
    var body = det.querySelector('[data-accordion-body]');
    if (!sum || !body) return;

    var group = det.getAttribute('data-accordion-group');
    var animating = false;

    /* Set initial state */
    body.style.overflow = 'hidden';
    if (det.open) {
      body.style.height = 'auto';
    } else {
      body.style.height = '0';
    }

    sum.addEventListener('click', function (e) {
      e.preventDefault();
      if (animating) return;

      if (det.open && !det.classList.contains('is-closing')) {
        /* --- Close --- */
        animateClose(det, body, function () { animating = false; });
        animating = true;
      } else if (!det.open) {
        /* --- Close siblings first --- */
        if (group) {
          var siblings = scope.querySelectorAll(
            'details[data-accordion-group="' + group + '"]'
          );
          for (var j = 0; j < siblings.length; j++) {
            if (siblings[j] !== det && siblings[j].open) {
              var sibBody = siblings[j].querySelector('[data-accordion-body]');
              if (sibBody) animateClose(siblings[j], sibBody);
            }
          }
        }
        /* --- Open --- */
        animateOpen(det, body, function () { animating = false; });
        animating = true;
      }
    });
  }

  function animateOpen(det, body, done) {
    det.setAttribute('open', '');

    /* Measure natural height while visible but collapsed */
    body.style.transition = 'none';
    body.style.height = '0';
    body.offsetHeight; /* force reflow */

    var target = body.scrollHeight;

    body.style.transition = TRANSITION;
    body.style.height = target + 'px';

    body.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'height') return;
      body.removeEventListener('transitionend', handler);
      body.style.height = 'auto';
      body.style.transition = 'none';
      if (done) done();
    });
  }

  function animateClose(det, body, done) {
    /* Capture current height */
    var current = body.scrollHeight;
    body.style.transition = 'none';
    body.style.height = current + 'px';
    body.offsetHeight; /* force reflow */

    det.classList.add('is-closing');
    body.style.transition = TRANSITION;
    body.style.height = '0';

    body.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'height') return;
      body.removeEventListener('transitionend', handler);
      det.removeAttribute('open');
      det.classList.remove('is-closing');
      body.style.transition = 'none';
      if (done) done();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAccordions(document);
    });
  } else {
    initAccordions(document);
  }

  document.addEventListener('shopify:section:load', function (e) {
    initAccordions(e.target);
  });
})();
