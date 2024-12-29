import {useEffect, useState} from 'react';
import priceAfterDiscount from '@/utils/priceAfterDiscount.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/reduxStore/slices/cartSlice.js';
import DiscountCard from '@/components/products/DiscountCard.jsx';
import discountedPrice from '@/utils/dicountedPrice.js';
import {useNavigate} from "react-router-dom";
function ProductsCard({ allProducts }) {
    const [addWishList, setAddWishList] = useState(false);
    const wishList = (item) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isAlreadyInWishlist = wishlist.find((wishlistItem) => wishlistItem.id === item.id);

        if (isAlreadyInWishlist) {
            const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setAddWishList(false);
        } else {
            wishlist.push(item);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setAddWishList(true);
        }
    };
    const products = allProducts;
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isInCart = (id) => cartItems.some((item) => item.id === id);

    const handleAddToCart = (item) => {
        const product = {
            ...item,
            priceAfterDiscount: priceAfterDiscount(item.price, item.discountPercentage),
        };
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const navigate = useNavigate();

    const handleQuickView = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className='products-card container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>
                {products?.map((item) => (
                    <div
                        key={item.id}
                        className='group w-full max-w-sm bg-white border border-transparent rounded-lg shadow-sm hover:border-gray-200 hover:shadow-lg dark:bg-gray-800 dark:border-transparent dark:hover:border-gray-700'
                    >
                        <div className='relative p-1'>
                            <img
                                className='rounded-lg w-full group-hover:bg-black group-hover:bg-opacity-[33%] transition duration-300'
                                src={item.thumbnail}
                                alt='img'
                            />
                            <div className='absolute top-3 -left-1'>
                                {(item.discountPercentage > 0 ||
                                    item.discountPercentage != null) && (
                                    <DiscountCard
                                        discountedPrice={discountedPrice(
                                            item.price,
                                            item.discountPercentage
                                        )}
                                    />
                                )}
                            </div>

                            <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto'>
                                <button
                                    className='btn-top-right px-2 py-1'
                                    onClick={() => wishList(item)}
                                >
                                    {JSON.parse(localStorage.getItem('wishlist'))?.find(
                                        (wishlistItem) => wishlistItem.id === item.id
                                    ) ? (
                                        <img
                                            src='/images/products/addedWishListIcon.svg'
                                            alt='img'
                                        />
                                    ) : (
                                        <img src='/images/products/WishlistIcon.svg' alt='img' />
                                    )}
                                </button>
                            </div>
                            <div className='absolute mx-3 inset-0 flex flex-col items-center justify-end pb-4 opacity-0 group-hover:opacity-100'>
                                {isInCart(item.id) ? (
                                    <div className='w-full flex items-center justify-between py-1.5 mb-2 bg-[#03A629] text-white border-[1.5px] border-[#FFFFFF4D] rounded-md gap-x-2 px-2'>
                                        <button
                                            className='flex items-center justify-center text-white w-6 h-6'
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            <img
                                                src='/images/products/Trash.png'
                                                alt='cart'
                                                className='w-6 h-6'
                                            />
                                        </button>
                                        <span className='text-center flex-grow text-white'>
                                            {cartItems.find((i) => i.id === item.id)?.quantity}{' '}
                                            added in Cart
                                        </span>
                                        <button
                                            className='flex items-center justify-center text-white w-6 h-6'
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <img
                                                src='/images/products/Plus.png'
                                                alt='cart'
                                                className='w-6 h-6'
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className='w-full justify-center btn-primary py-1.5 mb-2 bg-[#FFFFFF4D] text-white border-[1.5px] border-[#FFFFFF4D] rounded-md flex items-center gap-x-2'
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <img
                                            src='/images/products/cart.png'
                                            alt='cart'
                                            className='w-4 h-4'
                                        />
                                        Add to Cart
                                    </button>
                                )}

                                <button
                                    className='w-full justify-center btn-secondary py-1.5 bg-[#FFFFFF4D] text-white border-[1.5px] border-[#FFFFFF4D] rounded-md flex items-center gap-x-2'
                                    onClick={() => handleQuickView(item.id)}
                                >
                                    <img
                                        src='/images/products/eye.png'
                                        alt='eye'
                                        className='w-4 h-4'
                                    />
                                    Quick View
                                </button>
                            </div>
                        </div>
                        <div className='p-2'>
                            <p className='mb-0.5 text-[12px] sm:text-[14px] font-normal text-[#5A6573] leading-4'>
                                {item.title}
                            </p>

                            <p
                                className='line-clamp-2 max-w-[50ch] text-[#1A2B3D] text-[14px] sm:text-[16px] font-semibold'
                                title='Fabrilife Mens Premium Designer Edition T Shirt - 786'
                            >
                                {item.description}
                            </p>

                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 flex gap-2 mt-2'>
                                <span className='text-[#1882FF] font-semibold'>
                                    ৳ {priceAfterDiscount(item.price, item.discountPercentage)}
                                </span>
                                <span className='line-through text-[#77818C] font-normal'>
                                    ৳ {item.price}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsCard;
