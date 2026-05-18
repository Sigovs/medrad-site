<!-- ============================================================
     11 — Get in Touch
     ============================================================ -->
<section class="section section--accent" id="contact">
  <div class="container">

    <div class="contact-header text-center mb-128">
      <p class="section__label">Get in Touch</p>
      <h2>Choose how you&rsquo;d like to connect.</h2>
      <p class="contact-header__desc text-text-muted">Referrals accepted from all physicians. Self-referral available for select procedures.</p>
    </div>

    <div class="contact-paths contact-paths--stacked grid gap-32">

      <!-- Path 1: Call -->
      <div class="contact-path flex flex-col py-64 px-32 text-center items-center">
        <div class="contact-path__icon flex items-center justify-center bg-bg-accent text-accent mb-32">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <h3 class="contact-path__title h5 font-display text-text mb-8">Call us directly</h3>
        <p class="contact-path__desc p2 text-text-muted mb-32 flex-1">Speak with our team now. We can answer questions, verify insurance, and schedule your visit.</p>
        <a href="tel:+17086574540" class="contact-path__action h5 font-display text-text">(708) 657-4540</a>
        <p class="contact-path__meta p2 text-text-dim mt-8">Mon&ndash;Fri &middot; 8:00 AM&ndash;5:00 PM</p>
      </div>

      <!-- Path 2: Callback -->
      <div class="contact-path flex flex-col py-64 px-32 text-center items-center">
        <div class="contact-path__icon flex items-center justify-center bg-bg-accent text-accent mb-32">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h3 class="contact-path__title h5 font-display text-text mb-8">Request a callback</h3>
        <p class="contact-path__desc p2 text-text-muted mb-32 flex-1">Leave your name and number. We&rsquo;ll reach out within 24 hours.</p>
        <form class="contact-path__form flex flex-col gap-8 w-full" id="contactForm">
          <input class="form__input" type="text" placeholder="Your name" required />
          <input class="form__input" type="tel" placeholder="Phone number" required />
          <button type="submit" class="btn btn--primary btn--full">Request Callback</button>
        </form>
        <div class="form__success" id="formSuccess" style="display:none;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><circle cx="12" cy="12" r="10"/></svg>
          <p>Thank you. We&rsquo;ll call you within 24 hours.</p>
        </div>
      </div>

      <!-- Path 3: Ask Dr. E (consolidated form, wide focal card) -->
      <div class="contact-path contact-path--wide">
        <div class="contact-path__intro">
          <div class="contact-path__icon flex items-center justify-center bg-bg-accent text-accent mb-32">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 class="contact-path__title h5 font-display text-text mb-8">Ask Dr. E</h3>
          <p class="contact-path__desc p2 text-text-muted mb-32 flex-1">Not ready to book? Ask a question about your imaging, your report, or what to expect &mdash; we typically reply within one business day.</p>
        </div>
        <form class="contact-path__form contact-path__form--wide flex flex-col gap-8 w-full" id="askdreForm" novalidate>
          <div class="contact-path__form-row grid grid-2 gap-8">
            <input class="form__input" type="text" placeholder="Your name" autocomplete="name" required />
            <input class="form__input" type="email" placeholder="Email" autocomplete="email" inputmode="email" required />
          </div>
          <input class="form__input" type="tel" placeholder="Phone (optional)" autocomplete="tel" inputmode="tel" />
          <textarea class="form__input contact-path__textarea contact-path__textarea--lg" placeholder="Your question" rows="5" required></textarea>
          <button type="submit" class="btn btn--primary">Send</button>
        </form>
      </div>

    </div>

  </div>
</section>
