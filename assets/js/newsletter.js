/* newsletter.js — The Maison Edit */
(function () {
  const NEWSLETTER_ENDPOINT = ''; // Set to your Mailchimp/ConvertKit/Beehiiv action URL

  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      const btn   = form.querySelector('button[type="submit"]');
      const msg   = form.querySelector('.form-message');

      if (!email) return;

      if (!NEWSLETTER_ENDPOINT) {
        // Dev mode — just show success
        btn.textContent = 'Subscribed ✓';
        btn.disabled = true;
        if (msg) { msg.textContent = 'Welcome to The Maison Edit!'; msg.style.display = 'block'; }
        return;
      }

      btn.textContent = 'Subscribing…';
      btn.disabled = true;

      fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      .then(r => {
        if (r.ok) {
          btn.textContent = 'Subscribed ✓';
          if (msg) { msg.textContent = 'Welcome to The Maison Edit!'; msg.style.display = 'block'; }
        } else {
          btn.textContent = 'Try again';
          btn.disabled = false;
        }
      })
      .catch(() => { btn.textContent = 'Error — try again'; btn.disabled = false; });
    });
  });
})();
