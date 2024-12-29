export default function priceAfterDiscount(price, discountPercentage) {
    const discountedPrice = price - (price * discountPercentage) / 100;
    return discountedPrice.toFixed(2);
}
