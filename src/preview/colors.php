<?php
/**
 * Colour preview / specimen page.
 * Source of truth: src/styles/colors.scss
 */
$pageTitle = 'Colours — MedRad Clinics';

// name => [hex, group] — mirrors the $colors map in colors.scss
$palette = [
  ['bg',           '#F8F7F5', 'Surfaces — light'],
  ['bg-accent',    '#F2EFE9', 'Surfaces — light'],
  ['sand',         '#ECE4D6', 'Surfaces — light'],
  ['stone',        '#D6CFC3', 'Surfaces — light'],
  ['text',         '#14130F', 'Surfaces — dark'],
  ['bg-dark',      '#1F1D19', 'Surfaces — dark'],
  ['surface-dark', '#2A2825', 'Surfaces — dark'],
  ['text-muted',   '#56534C', 'Text'],
  ['text-dim',     '#8B867D', 'Text'],
  ['text-light',   '#E8E5DF', 'Text'],
  ['accent',       '#4A5F70', 'Accent'],
  ['accent-soft',  '#7E94A4', 'Accent'],
  ['border',       '#E2DED8', 'Lines'],
  ['border-dark',  '#2A2824', 'Lines'],
  ['white',        '#FFFFFF', 'Lines'],
];
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/../shared/head/head.php'; ?>
<body>

  <style>
    .ds-table { width: 100%; border-collapse: collapse; margin-top: var(--space-lg); }
    .ds-table th,
    .ds-table td {
      text-align: left; vertical-align: middle;
      padding: var(--space-sm);
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
    .ds-table td.spec { font: 400 13px/1.5 'Inter', sans-serif; color: var(--color-text-muted); }
    .swatch {
      width: 96px; height: 44px; border-radius: var(--radius-sm);
      border: 1px solid rgba(0,0,0,0.10);
    }
    .ds-group td {
      font: 600 12px/1.25 'Inter', sans-serif;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--color-text-dim);
      padding-top: var(--space-md);
    }
  </style>

  <main class="container" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl);">

    <p class="eyebrow" style="color: var(--color-accent);">Design System</p>
    <h1>Colours</h1>
    <p class="lead">The MedRad palette. Defined once in <code>src/styles/colors.scss</code> —
      available as <code>var(--color-*)</code> and the SCSS <code>color()</code> function.</p>

    <table class="ds-table">
      <thead>
        <tr><th>Swatch</th><th>CSS variable</th><th>SCSS</th><th>Hex</th><th>Utility classes</th></tr>
      </thead>
      <tbody>
        <?php $group = ''; foreach ($palette as [$name, $hex, $g]): ?>
          <?php if ($g !== $group): $group = $g; ?>
            <tr class="ds-group"><td colspan="5"><?= $g ?></td></tr>
          <?php endif; ?>
          <tr>
            <td><div class="swatch" style="background: var(--color-<?= $name ?>);"></div></td>
            <td class="token">--color-<?= $name ?></td>
            <td class="scss">color(<?= $name ?>)</td>
            <td class="spec"><?= $hex ?></td>
            <td class="scss">.text-<?= $name ?> &middot; .bg-<?= $name ?> &middot; .border-<?= $name ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

  </main>

</body>
</html>
