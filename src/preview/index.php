<?php
/**
 * Design-system preview index.
 * Links to every specimen page under /preview.
 */
$pageTitle = 'Design System — MedRad Clinics';

$previews = [
  ['typography.php', 'Typography', 'Type scale, the font() mixin, headings, body, labels.'],
  ['colors.php',     'Colours',    'The project palette — surfaces, text, accent, lines.'],
  ['spacing.php',    'Spacing & Breakpoints', 'Geometric spacing scale, breakpoints, the space() mixin.'],
];
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/../shared/head.php'; ?>
<body>

  <style>
    .ds-list { list-style: none; margin: var(--space-lg) 0 0; padding: 0; }
    .ds-list li { border-bottom: 1px solid var(--color-border); }
    .ds-card {
      display: block;
      padding: var(--space-md) 0;
      transition: padding-left 200ms var(--ease, ease);
    }
    .ds-card:hover { padding-left: var(--space-xs); }
    .ds-card h3 { margin: 0; }
    .ds-card p  { margin: var(--space-2xs) 0 0; }
  </style>

  <main class="container" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl); max-width: 720px;">

    <p class="eyebrow" style="color: var(--color-accent);">MedRad Clinics</p>
    <h1>Design System</h1>
    <p class="lead">Living specimen pages for the design tokens &mdash; each generated straight
      from the SCSS source under <code>src/shared/</code>.</p>

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
