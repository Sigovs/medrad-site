<!-- ============================================================
     10 — Our Specialists (carousel)
     ============================================================ -->
<section class="section" id="dr-block">
  <div class="container">

    <header class="dr-carousel__header text-center mb-128">
      <p class="section__label">Our Specialists</p>
      <h2>Meet the team</h2>
      <p class="dr-carousel__lede">A small, subspecialty-focused team &mdash; every patient is treated personally by an attending physician.</p>
    </header>

    <div class="dr-carousel" id="drCarousel">

      <button class="dr-carousel__arrow dr-carousel__arrow--prev" id="drPrev" type="button" aria-label="Previous specialist">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <div class="dr-carousel__viewport">
        <div class="dr-carousel__track" id="drTrack">

          <!-- Slide 1: Dr. Ekechukwu -->
          <article class="dr-slide is-active">
            <div class="dr-slide__photo">
              <img src="assets/images/Our Specialist_about.png" alt="Dr. Kenneth U. Ekechukwu" />
            </div>
            <div class="dr-slide__text">
              <h3 class="dr-slide__name"><strong>Dr. Kenneth U. Ekechukwu, MD, MPH</strong></h3>
              <p class="dr-slide__title p2">Founder &middot; Interventional Radiologist</p>
              <p class="dr-slide__credentials p2">Board Certified &middot; Fellowship-Trained</p>
              <p class="dr-slide__bio">Fellowship-trained interventional radiologist with over 18 years of clinical practice. Particular focus on vascular interventions, embolotherapy, and interventional oncology. Every patient is seen, assessed, and treated personally.</p>
              <div class="dr-slide__actions flex items-center gap-32 flex-wrap">
                <a href="#contact" class="btn btn--ghost">Schedule a Consultation</a>
              </div>
            </div>
          </article>

          <!-- Slide 2: Dr. Whitfield -->
          <article class="dr-slide">
            <div class="dr-slide__photo">
              <img src="assets/images/margaret_img.png" alt="Dr. Margaret L. Whitfield" />
            </div>
            <div class="dr-slide__text">
              <h3 class="dr-slide__name"><strong>Dr. Margaret L. Whitfield, MD, PhD</strong></h3>
              <p class="dr-slide__title p2">Director of Vascular Imaging</p>
              <p class="dr-slide__credentials p2">Board Certified &middot; Dual-Trained, IR + Vascular Medicine</p>
              <p class="dr-slide__bio">Dr. Whitfield leads the practice's complex vascular access program. Her clinical interest centers on hemodialysis access salvage and limb-preservation work in chronic peripheral arterial disease.</p>
              <div class="dr-slide__actions flex items-center gap-32 flex-wrap">
                <a href="#contact" class="btn btn--ghost">Schedule a Consultation</a>
              </div>
            </div>
          </article>

          <!-- Slide 3: Dr. Ridgeway -->
          <article class="dr-slide">
            <div class="dr-slide__photo">
              <img src="assets/images/marcus_img.png" alt="Dr. Marcus T. Ridgeway" />
            </div>
            <div class="dr-slide__text">
              <h3 class="dr-slide__name"><strong>Dr. Marcus T. Ridgeway, DO, MSc</strong></h3>
              <p class="dr-slide__title p2">Lead Interventional Oncologist</p>
              <p class="dr-slide__credentials p2">Board Certified &middot; Sub-Fellowship in Interventional Oncology</p>
              <p class="dr-slide__bio">Dr. Ridgeway focuses on percutaneous tumor ablation, transarterial chemoembolization, and selective internal radiation therapy. Directs the practice's multidisciplinary tumor board collaboration.</p>
              <div class="dr-slide__actions flex items-center gap-32 flex-wrap">
                <a href="#contact" class="btn btn--ghost">Schedule a Consultation</a>
              </div>
            </div>
          </article>

        </div>
      </div>

      <button class="dr-carousel__arrow dr-carousel__arrow--next" id="drNext" type="button" aria-label="Next specialist">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

    </div>

    <div class="dr-carousel__dots flex justify-center gap-8 mt-64" id="drDots" role="tablist" aria-label="Specialists">
      <button class="dr-carousel__dot is-active" type="button" aria-label="Specialist 1" data-i="0"></button>
      <button class="dr-carousel__dot" type="button" aria-label="Specialist 2" data-i="1"></button>
      <button class="dr-carousel__dot" type="button" aria-label="Specialist 3" data-i="2"></button>
    </div>

  </div>
</section>
