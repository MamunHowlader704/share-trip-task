import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, removeFromCart } from '@/reduxStore/slices/cartSlice.js';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Cart Information</h2>
            {cartItems.length === 0 ? (
                <div className='grid place-items-center min-h-[80vh]'>
                    <div className=''>No Item is found</div>
                </div>
            ) : (
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className='flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-md bg-white dark:bg-gray-800'
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className='w-24 h-24 object-cover rounded-md mb-3'
                                />
                                <h3 className='text-lg font-semibold text-center'>{item.title}</h3>
                                <p className='text-sm text-gray-500 text-center'>
                                    ৳ {item.priceAfterDiscount} x {item.quantity}
                                </p>
                                <div className='flex items-center justify-between w-full mt-3'>
                                    <span className='font-semibold text-gray-700'>
                                        ৳ {item.priceAfterDiscount * item.quantity}
                                    </span>
                                    <div className='flex items-center gap-1'>
                                        <button
                                            className='px-3 py-1 bg-gray-200 rounded-md'
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                        >
                                            -
                                        </button>
                                        <span className='px-3'>{item.quantity}</span>
                                        <button
                                            className='px-3 py-1 bg-gray-200 rounded-md'
                                            onClick={() => dispatch(addToCart(item))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className='w-full px-3 py-2 mt-3 bg-red-500 text-white rounded-md'
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='mt-6 text-right'>
                        <h3 className='text-xl font-semibold'>Total: ৳ {total.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
