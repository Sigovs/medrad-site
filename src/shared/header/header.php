<!-- ============================================================
     01 — Navigation
     ============================================================ -->
<header class="nav" id="nav">
  <div class="nav__inner">
    <a href="/" class="nav__logo inline-flex items-center"><img class="block" src="assets/images/logo.svg" alt="MedRad Clinics" /></a>

    <nav class="nav__links flex items-center gap-32" id="navLinks">
      <a href="about.html">About</a>

      <div class="nav__dropdown-wrap" id="navProcDropWrap">
        <button class="nav__dropdown-trigger inline-flex items-center" id="navProcTrigger"
                aria-expanded="false" aria-haspopup="true" aria-controls="navProcDropdown">
          Procedures
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav__dropdown" id="navProcDropdown" role="region" aria-label="Procedures menu">
          <a href="procedure-ufe.html" class="nav__dropdown-item">Uterine Fibroid Embolization</a>
          <a href="#" class="nav__dropdown-item">Vertebroplasty &amp; Kyphoplasty</a>
          <a href="#" class="nav__dropdown-item">Hemodialysis Access</a>
          <a href="#" class="nav__dropdown-item">Peripheral Arterial Disease (PAD)</a>
          <a href="all-procedures.html" class="nav__dropdown-viewall p2">View All Procedures &rarr;</a>
        </div>
      </div>

      <a href="patient-education.html">Patient Education</a>
      <a href="treatment-cases.html">Treatment Cases</a>
      <a href="lecture-library.html">Lecture Library</a>
      <a href="contact.html" class="nav__cta">Contact</a>
      <a href="appointment.html" class="nav__cta nav__cta--filled">Book Appointment</a>
    </nav>

    <button class="nav__toggle" id="navToggle" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
