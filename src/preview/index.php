<?php
/**
 * Design-system preview index.
 * Links to every specimen page under /preview.
 */
$pageTitle = 'Design System — MedRad Clinics';

$previews = [
  ['/preview/typography.php', 'Typography', 'Type scale, the font() mixin, headings, body, labels.'],
  ['/preview/colors.php',     'Colours',    'The project palette — surfaces, text, accent, lines.'],
  ['/preview/spacing.php',    'Spacing & Breakpoints', 'Geometric spacing scale, breakpoints, the space() mixin.'],
];
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/../shared/head/head.php'; ?>
<body>

  <style>
    .ds-list { list-style: none; margin: var(--space-32) 0 0; padding: 0; }
    .ds-list li { border-bottom: 1px solid var(--color-border); }
    .ds-card {
      display: block;
      padding: var(--space-32) 0;
      transition: padding-left 200ms var(--ease, ease);
    }
    .ds-card:hover { padding-left: var(--space-8); }
    .ds-card h3 { margin: 0; }
    .ds-card p  { margin: var(--space-4) 0 0; }
  </style>

  <main class="container" style="padding-top: var(--space-128); padding-bottom: var(--space-128); max-width: 720px;">

    <p class="eyebrow" style="color: var(--color-accent);">MedRad Clinics</p>
    <h1>Design System</h1>
    <p class="lead">Living specimen pages for the design tokens &mdash; each generated straight
      from the SCSS source under <code>src/styles/</code>.</p>

    <ul class="ds-list">
      <?php foreach ($previews as [$href, $title, $desc]): ?>
        <li>
          <a class="ds-card" href="<?= $href ?>">
            <h3><?= $title ?></h3>
            <p><?= $desc ?></p>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>

  </main>

</body>
</html>
