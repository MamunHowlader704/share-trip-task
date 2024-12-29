import { Link } from 'react-router-dom';
import { useState } from 'react';
import CartIcon from '@/components/products/CartIcon.jsx';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className='bg-white shadow-md container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className=' flex justify-between items-center px-4 py-2'>
                    <Link to='/' className='text-xl font-semibold text-gray-800'>
                       ShareTrip
                    </Link>

                    <div className='hidden md:flex space-x-8'>
                        <Link to='/cart'>
                            <CartIcon />
                        </Link>
                        <Link to='/wishlist'>
                            <img
                                src='/images/products/addedWishListIcon.svg'
                                alt='img'
                            />
                        </Link>
                    </div>
                    <button
                        onClick={toggleMenu}
                        className='md:hidden text-gray-700 focus:outline-none'
                    >
                        {isMenuOpen ? 'X' : '☰'}
                    </button>
                </div>

                {/* For Responsiveness */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white py-4`}>
                    <div className='flex flex-col items-center space-y-4'>
                        <Link to='/cart'>
                            <CartIcon />
                        </Link>
                        <Link to='/wishlist'>
                            <img
                                src='/images/products/addedWishListIcon.svg'
                                alt='img'
                            />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
