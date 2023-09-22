// Add image dimensions to the alt attribute.
add_filter( 'wp_get_attachment_image_attributes', function( $attr ) {
  $attr['sizes'] = '(max-width: 767px) 100vw, (max-width: 991px) 50vw, (min-width: 992px) 33.33vw, 100vw';
  return $attr;
} );

// Add lazy loading to images.
add_filter( 'wp_get_attachment_image', function( $html, $attachment_id ) {
  $src = wp_get_attachment_image_url( $attachment_id, 'full' );
  $data_src = $src;
  $src = '';

  return str_replace( '<img', '<img loading="lazy" data-src="' . $data_src . '"', $html );
} );

