import { useEffect } from 'react';
import ProductsCard from '@/components/products/ProductsCard.jsx';
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "@/reduxStore/productSlices/productSlice.js";
function Home() {
    const productItems = useSelector((state) => state.products.products);
    const isLoading=useSelector((state) => state.isLoading);
    const isError = useSelector((state) => state.isError);
    const ErrorMessage=useSelector((state) => state.error);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    if (isLoading)
        return (
            <div className='spinner-container'>
                <div className='spinner'></div>
            </div>
        );
    if (isError) return <div>Error: {ErrorMessage}</div>;
    if (productItems?.products?.length === 0) return <div>No products available.</div>;
    return (
        <div className='font-murecho '>
            {productItems?.products && <ProductsCard allProducts={productItems?.products} />}
        </div>
    );
}

export default Home;
