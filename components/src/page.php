<?php
// Include the header of the theme
get_header();
?>

<div id="content">
  <?php while (have_posts()) : the_post(); ?>
    <h2><?php the_title(); ?></h2>
    <?php the_content(); ?>
  <?php endwhile; ?>
</div>

<?php
// Include the footer of the theme
get_footer();
?>

