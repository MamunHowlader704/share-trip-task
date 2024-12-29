import ProductDetail from '@/components/products/ProductDetails.jsx';
import { useEffect, useState } from 'react';
import { getSingleProducts } from '@/services/getSingleProducts.js';
import { useParams } from 'react-router-dom';
function SingleProductDetails() {
    const { id } = useParams(); // Get the product ID from the route params
    const [productsDetailsData, setProductsDetailsData] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchSIngleProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await getSingleProducts(id);
            setProductsDetailsData(response);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err?.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSIngleProductsData();
    }, []);

    if (isLoading)
        return (
            <div className='spinner-container'>
                <div className='spinner'></div>
            </div>
        );
    return (
        <>
            <ProductDetail productsData={productsDetailsData} />
        </>
    );
}
export default SingleProductDetails;
