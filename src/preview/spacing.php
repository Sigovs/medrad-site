<?php
/**
 * Spacing + breakpoints preview / specimen page.
 * Source of truth: src/styles/spacing.scss, src/styles/breakpoints.scss
 */
$pageTitle = 'Spacing — MedRad Clinics';

// 4px base, 8px next, then ×2, capped at 256.
$scale = [4, 8, 16, 32, 64, 128, 256];

$breakpoints = [
  ['Mobile',  '< 768px',   '@include mobile  { … }'],
  ['Tablet',  '>= 768px',  '@include tablet  { … }'],
  ['Desktop', '>= 1340px', '@include desktop { … }'],
];
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/../shared/head/head.php'; ?>
<body>

  <style>
    .ds-table { width: 100%; border-collapse: collapse; margin-top: var(--space-32); }
    .ds-table th,
    .ds-table td {
      text-align: left; vertical-align: middle;
      padding: var(--space-16);
      border-bottom: 1px solid var(--color-border);
    }
    .ds-table thead th {
      font: 600 12px/1.25 'Inter', sans-serif;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--color-accent);
      border-bottom: 2px solid var(--color-border);
    }
    .ds-table td.token,
    .ds-table td.scss {
      font: 500 13px/1.5 ui-monospace, 'SF Mono', Menlo, monospace;
      color: var(--color-text); white-space: nowrap;
    }
    .ds-table td.spec { font: 400 13px/1.5 'Inter', sans-serif; color: var(--color-text-muted); white-space: nowrap; }
    .bar { height: 18px; background: var(--color-accent); border-radius: 2px; }
  </style>

  <main class="container" style="padding-top: var(--space-128); padding-bottom: var(--space-128);">

    <p class="eyebrow" style="color: var(--color-accent);">Design System</p>
    <h1>Spacing &amp; Breakpoints</h1>
    <p class="lead">A geometric spacing scale &mdash; 4px base, then each step doubles up to 256.
      Defined in <code>src/styles/spacing.scss</code>.</p>

    <h3 style="margin-top: var(--space-64);">Spacing scale</h3>
    <table class="ds-table">
      <thead>
        <tr><th>Step</th><th>CSS variable</th><th>SCSS</th><th>Value</th><th>Utility classes</th></tr>
      </thead>
      <tbody>
        <?php foreach ($scale as $n): ?>
          <tr>
            <td style="width: 280px;"><div class="bar" style="width: <?= $n ?>px;"></div></td>
            <td class="token">--space-<?= $n ?></td>
            <td class="scss">sp(<?= $n ?>)</td>
            <td class="spec"><?= $n ?>px</td>
            <td class="scss">.p-<?= $n ?> &middot; .m-<?= $n ?> &middot; .gap-<?= $n ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <p style="margin-top: var(--space-32);"><small>Margin / padding utilities cover every
      direction &mdash; <code>m mt mr mb ml mx my</code> and <code>p pt pr pb pl px py</code>,
      plus <code>gap</code>. Each has a per-resolution variant: append
      <code>-tablet</code> (&ge; 768px) or <code>-desktop</code> (&ge; 1340px),
      e.g. <code>class="p-16 p-32-tablet p-64-desktop"</code>.</small></p>

    <h3 style="margin-top: var(--space-128);">Breakpoints</h3>
    <p>Every <code>@media</code> query lives in <code>src/styles/breakpoints.scss</code> &mdash;
      components call the mixin rather than writing raw queries.</p>
    <table class="ds-table">
      <thead>
        <tr><th>Resolution</th><th>Range</th><th>Mixin</th></tr>
      </thead>
      <tbody>
        <?php foreach ($breakpoints as [$label, $range, $mixin]): ?>
          <tr>
            <td class="spec" style="color: var(--color-text); font-weight: 600;"><?= $label ?></td>
            <td class="spec"><?= $range ?></td>
            <td class="scss"><?= htmlspecialchars($mixin) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <h3 style="margin-top: var(--space-128);">Responsive spacing</h3>
    <p>The <code>space()</code> mixin applies a spacing property with one value per resolution &mdash;
      the breakpoint media queries are encapsulated, so components stay declarative:</p>
    <pre style="background: var(--color-bg-accent); padding: var(--space-32); border-radius: var(--radius-sm); overflow-x: auto; font: 500 13px/1.6 ui-monospace, Menlo, monospace;">// property, mobile, [tablet], [desktop]
@include space(padding, sp(16), sp(32), sp(64));
@include space(margin-top, sp(32), sp(64));</pre>

  </main>

</body>
</html>
