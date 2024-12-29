import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/reduxStore/slices/cartSlice.js';
import priceAfterDiscount from "@/utils/priceAfterDiscount.js";
function ProductDetail({productsData}) {
const products =productsData
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const isInCart = cartItems.some((item) => item.id === products.id);

    const handleAddToCart = () => {
        const product = {
            ...products,
            priceAfterDiscount: priceAfterDiscount(products.price, products.discountPercentage),
        };
        dispatch(addToCart(product));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh] items-center">
                <div className="productsData-image flex justify-center">
                    <img
                        src={products.thumbnail}
                        alt={products.title}
                        className="w-full h-auto max-w-md rounded-lg shadow-md"
                    />
                </div>

                <div className="products-details">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {products.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {products.description}
                    </p>
                    <div className="mt-4">
                <span className="text-xl font-semibold text-blue-500">
                    ৳ {products.price}
                </span>
                        {products.discountPercentage > 0 && (
                            <span className="ml-2 text-gray-500 line-through">
                        ৳ {priceAfterDiscount(products.price, products.discountPercentage)}
                    </span>
                        )}
                    </div>

                    <div className="mt-4">
                        {isInCart ? (
                            <div
                                className="w-1/2 flex items-center justify-between py-1.5 mb-2 bg-[#03A629] text-white border-[1.5px] border-[#FFFFFF4D] rounded-md gap-x-2 px-2">
                                <button
                                    className="flex items-center justify-center text-white w-6 h-6"
                                    onClick={() => dispatch(removeFromCart(products.id))}
                                >
                                    <img
                                        src="/images/products/Trash.png"
                                        alt="cart"
                                        className="w-6 h-6"
                                    />
                                </button>
                                <span className="text-center flex-grow text-white">
                            {cartItems.find((i) => i.id === products.id)?.quantity} added in Cart
                        </span>
                                <button
                                    className="flex items-center justify-center text-white w-6 h-6"
                                    onClick={() => handleAddToCart()}
                                >
                                    <img
                                        src="/images/products/Plus.png"
                                        alt="cart"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>
                        ) : (
                            <button
                                className="w-1/2 justify-center btn-primary py-1.5 mb-2 bg-[#FFFFFF4D] text-black border-[1.5px] border-[#03A629] rounded-md flex items-center gap-x-2"
                                onClick={() => handleAddToCart()}
                            >
                                <img
                                    src="/images/products/cart.png"
                                    alt="cart"
                                    className="w-4 h-4"
                                />
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProductDetail;
