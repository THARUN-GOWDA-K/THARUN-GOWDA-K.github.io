(function () {
  function updateCgpa() {
    document.querySelectorAll('*').forEach(function (element) {
      if (element.children.length === 0 && element.textContent?.includes('8.1 CGPA')) {
        element.textContent = element.textContent.replace(/8\.1 CGPA/g, '8.23 CGPA');
      }
    });
  }

  function organizeSkills() {
    var cards = Array.from(document.querySelectorAll('#tech .skill-card'));
    if (!cards.length || document.querySelector('#tech .skill-card[data-organized="true"]')) return false;

    var webCard = cards.find(function (card) {
      return card.querySelector('.cat-title')?.textContent.trim() === 'Web Development';
    });
    var dataCard = cards.find(function (card) {
      return card.querySelector('.cat-title')?.textContent.trim() === 'Data Science';
    });
    if (!webCard || !dataCard) return false;

    webCard.dataset.organized = 'true';
    dataCard.querySelector('.cat-title').textContent = 'Data Analytics';
    webCard.querySelectorAll('.skill-box').forEach(function (box) {
      if (box.querySelector('.skill-name')?.textContent.trim() === 'JavaScript') box.remove();
    });

    var backend = webCard.cloneNode(false);
    backend.dataset.organized = 'true';
    backend.innerHTML = '<div class="card-header"><span class="cat-icon">⌘</span><h3 class="cat-title">Backend</h3></div><div class="card-divider"></div><div class="card-items"></div>';
    var backendItems = backend.querySelector('.card-items');
    webCard.querySelectorAll('.skill-box').forEach(function (box) {
      var name = box.querySelector('.skill-name')?.textContent.trim();
      if (name === 'Flask' || name === 'FastAPI') backendItems.appendChild(box);
    });
    webCard.insertAdjacentElement('afterend', backend);
    return true;
  }

  function useAjaxContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form || form.dataset.ajaxReady === 'true') return false;
    form.dataset.ajaxReady = 'true';

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var original = button.innerHTML;
      button.disabled = true;
      button.textContent = 'SENDING...';
      try {
        var values = Object.fromEntries(new FormData(form).entries());
        var response = await fetch('https://formsubmit.co/ajax/tharungowda0369@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values)
        });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        button.textContent = '✓ MESSAGE SENT!';
      } catch (error) {
        button.textContent = 'TRY AGAIN';
      }
      setTimeout(function () {
        button.disabled = false;
        button.innerHTML = original;
      }, 4000);
    });
    return true;
  }

  var observer = new MutationObserver(function () {
    updateCgpa();
    organizeSkills();
    useAjaxContactForm();
    if (document.querySelector('#tech .skill-card[data-organized="true"]') && document.querySelector('.contact-form[data-ajax-ready="true"]')) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  updateCgpa();
  organizeSkills();
  useAjaxContactForm();
}());
