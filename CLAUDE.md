MedRad Clinics Website Redesign

Goal:
Create a modern, high-trust medical website that separates:
- Patient experience
- Education center
- Interactive tools

Key features to preserve:
- Assess Your Risk
- Ask Dr. E
- Teaching Files
- Case Gallery
- Procedures / Tests

Focus:
- Clean UX structure
- Strong hierarchy
- Conversion-first layout
- Trust and authority


Design System (src/ build) — STRICT RULES

The src/ build has a token-based design system. These files are the
SINGLE SOURCE OF TRUTH and must always be used:
- Colours     -> src/styles/colors.scss      (var(--color-*) / color())
- Spacing     -> src/styles/spacing.scss     (var(--space-N) / sp() / space())
- Typography  -> src/styles/typography.scss  (font() mixin, type scale)
- Breakpoints -> src/styles/breakpoints.scss (mobile / tablet / desktop mixins)
- Radius      -> src/styles/radius.scss      (var(--radius-*) / radius() / .radius-*)
- Shadow      -> src/styles/shadow.scss      (var(--shadow-*) / shadow() / .shadow-*)
- Transitions -> src/styles/transitions.scss (var(--ease*) / var(--duration*))
- Forms       -> src/styles/forms.scss       (form controls styled by element,
                 not by class; field spacing via margin utility classes)

Rules:
- Always use these tokens / their utility classes. Never hardcode a colour,
  spacing value, font size/family/weight, or breakpoint anywhere else.
- Use px for all sizing. Never use rem.
- Never add font / typography rules outside typography.scss without asking.
- Prefer utility classes in the markup over writing new SCSS. Avoid custom
  SCSS for a section when a class can do it. Remove styles that aren't needed.
- Section partials (src/sections/**) must NOT define custom colour, spacing,
  or typography. They compose existing tokens / utility classes only.
- Do NOT add or change a token (new colour, new spacing step, type change)
  without explicitly asking the user first.
- If a section seems to need a value that isn't in the tokens, ask — do not
  invent one.