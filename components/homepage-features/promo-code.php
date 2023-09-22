//  promo-code.php code (promo code validation and application)
function validatePromoCode($promoCode) {
  // Connect to the database and query the promo code table.
  // If the promo code is valid, return the discount amount.
  // Otherwise, return null.
}

function applyPromoCode($totalPrice, $promoCode) {
  $discount = validatePromoCode($promoCode);
  if ($discount !== null) {
    $totalPrice -= $discount;
  }
  return $totalPrice;
}

