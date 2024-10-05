import React, { useEffect, useState } from 'react';
import Button from './Button';
import { getCategoryById } from '../api/services/CategoryService';
import { getProductByCategory } from '../api/services/ProductService';
import ProductCard from './ProductCard';

const NewProductCollection = ({ id_category }) => {
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [id_category]);

    const fetchCategory = async () => {
        const response = await getCategoryById(id_category);
        if (response.status == 200) {
            setCategory(response.data.result);
        }
    };

    const fetchProducts = async () => {
        const response = await getProductByCategory(id_category);
        if (response.status == 200) {
            setProducts(response.data.result.data);
        }
    };
    return (
        category && (
            <div className="pb-[10px]">
                <span className="bold mb-[20px] inline-block rounded-[5px] border-[1px] border-black bg-black p-[10px] text-[14px] uppercase text-white">
                    {category.name}
                </span>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="mt-[20px]">
                    <Button idCategory={category.id} />
                </div>
            </div>
        )
    );
};

export default NewProductCollection;
