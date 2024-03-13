import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "data/api";
import { FetchSingleProduct } from 'data/types';

const useSingleProduct = (slug: string, state: { country: string }) => {
    console.log({slug})
    const [product, setProduct] = useState<FetchSingleProduct>();
    const [loading, setLoading] = useState<boolean>(false);
    let [productSlug] = slug.split('?');

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/product/${productSlug}?country=${state.country}`)
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        setLoading(true);
        if (slug) {
            fetchProduct();
        }
    }, [slug, state.country]);

    return { product, loading }
};

export default useSingleProduct;