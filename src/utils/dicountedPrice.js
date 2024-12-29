export default function discountedPrice(price, discountPercentage) {
    const discountedPrice = price - price * (1 - discountPercentage / 100);
    return discountedPrice.toFixed(2);
}
