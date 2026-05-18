<?php
/**
 * MedRad Clinics — Homepage
 * Assembled from shared partials + per-section partials.
 */
$pageTitle = 'MedRad Clinics — Interventional Radiology & Image-Guided Treatment';
?>
<!DOCTYPE html>
<html lang="en">
<?php include __DIR__ . '/shared/head/head.php'; ?>
<body>

  <?php include __DIR__ . '/shared/header/header.php'; ?>

  <?php include __DIR__ . '/sections/home/hero/hero.php'; ?>
  <?php include __DIR__ . '/sections/home/trust-strip/trust-strip.php'; ?>
  <?php include __DIR__ . '/sections/home/featured-procedures/featured-procedures.php'; ?>
  <?php include __DIR__ . '/sections/home/visual-break/visual-break.php'; ?>
  <?php include __DIR__ . '/sections/home/procedures-directory/procedures-directory.php'; ?>
  <?php include __DIR__ . '/sections/home/diagnostic-imaging/diagnostic-imaging.php'; ?>
  <?php include __DIR__ . '/sections/home/interactive-tool/interactive-tool.php'; ?>
  <?php include __DIR__ . '/sections/home/reviews/reviews.php'; ?>
  <?php include __DIR__ . '/sections/home/treatment-cases/treatment-cases.php'; ?>
  <?php include __DIR__ . '/sections/home/specialists/specialists.php'; ?>
  <?php include __DIR__ . '/sections/home/contact/contact.php'; ?>

  <?php include __DIR__ . '/shared/footer/footer.php'; ?>

  <?php include __DIR__ . '/sections/home/assess-overlay/assess-overlay.php'; ?>

  <?php include __DIR__ . '/sections/home/page-scripts/page-scripts.php'; ?>

</body>
</html>
