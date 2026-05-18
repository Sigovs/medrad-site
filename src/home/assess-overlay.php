<!-- ============================================================
     Assess Your Risk — Full-Screen Overlay
     ============================================================ -->
<div class="assess-overlay" id="assessOverlay" role="dialog" aria-modal="true" aria-label="Assess Your Risk">

  <div class="assess-bar-wrap">
    <div class="assess-bar">
      <span class="assess-bar__logo">MedRad<em>Clinics</em></span>
      <button class="assess-bar__close" id="assessClose" type="button" aria-label="Close assessment">
        Close
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </div>

  <div class="assess-view" id="assessViewSelect">
    <div class="assess-inner">
      <p class="assess-eyebrow">Risk Assessment</p>
      <h2 class="assess-heading">Select a condition</h2>
      <p class="assess-intro">Choose the condition you would like to assess. You will be guided through a short, structured questionnaire.</p>
      <div class="assess-conditions" id="assessConditions" role="list"></div>
    </div>
  </div>

  <div class="assess-view" id="assessViewQ" hidden>
    <div class="assess-inner assess-inner--narrow">
      <div class="assess-q-header">
        <div class="assess-q-top">
          <button class="assess-change-cond" id="assessBackCond" type="button">&#8592; Change condition</button>
          <span class="assess-q-cond-label" id="assessCondName"></span>
        </div>
        <p class="assess-q-progress" id="assessProgress"></p>
      </div>
      <div class="assess-q-body" id="assessQBody"></div>
      <button class="assess-back-q" id="assessBackQ" type="button">&#8592; Back</button>
    </div>
  </div>

  <div class="assess-view" id="assessViewResult" hidden>
    <div class="assess-inner assess-inner--narrow" id="assessResultInner"></div>
  </div>

</div>
