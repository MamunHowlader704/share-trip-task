import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "@/pages/Home.jsx";
import Cart from "@/pages/Cart.jsx";
import Navbar from "@/components/Navigation/Navbar.jsx";
import WishListPage from "@/pages/WishList.jsx";
import SingleProductDetails from "@/pages/SingleProductDetails.jsx";
function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<WishListPage />} />
                    <Route path="/product/:id" element={<SingleProductDetails />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
