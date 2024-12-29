import { useSelector } from 'react-redux';
function CartIcon() {
    const totalItems = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <div className='relative'>
            <img src='/images/products/cart.svg' alt='Cart' className='w-6 h-6 cursor-pointer' />
            <span className='absolute top-[1px] left-5  bg-[#03A629] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                {totalItems > 0 ? totalItems : 0}
            </span>
        </div>
    );
}

export default CartIcon;
