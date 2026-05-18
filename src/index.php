<?php
/**
 * MedRad Clinics — Homepage
 * Assembled from shared partials + per-section partials.
 */
$pageTitle = 'MedRad Clinics — Interventional Radiology & Image-Guided Treatment';
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/shared/head.php'; ?>
<body>

  <?php include __DIR__ . '/shared/header.php'; ?>

  <?php include __DIR__ . '/home/hero.php'; ?>
  <?php include __DIR__ . '/home/trust-strip.php'; ?>
  <?php include __DIR__ . '/home/featured-procedures.php'; ?>
  <?php include __DIR__ . '/home/visual-break.php'; ?>
  <?php include __DIR__ . '/home/procedures-directory.php'; ?>
  <?php include __DIR__ . '/home/diagnostic-imaging.php'; ?>
  <?php include __DIR__ . '/home/interactive-tool.php'; ?>
  <?php include __DIR__ . '/home/reviews.php'; ?>
  <?php include __DIR__ . '/home/treatment-cases.php'; ?>
  <?php include __DIR__ . '/home/specialists.php'; ?>
  <?php include __DIR__ . '/home/contact.php'; ?>

  <?php include __DIR__ . '/shared/footer.php'; ?>

  <?php include __DIR__ . '/home/assess-overlay.php'; ?>

  <?php include __DIR__ . '/home/page-scripts.php'; ?>

</body>
</html>
