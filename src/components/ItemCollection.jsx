import React, { useEffect, useState } from 'react';
import ProductSlider from './ProductSlider';
import Button from './Button';
import { getCategoryById } from '../api/services/CategoryService';
import { getProductByCategory } from '../api/services/ProductService';

const ItemCollection = ({ id_category }) => {
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
            <div className="w-full rounded-[5px] bg-white p-[15px_15px_20px_0px]">
                <div className="mb-[15px] flex items-center justify-between rounded-[5px]">
                    <h2 className="m-0 border-l-[3px] border-black pl-[12px] text-[20px] font-bold uppercase text-black">
                        {category.name}
                    </h2>
                    <Button
                        padding={'px-[10px] py-[5px]'}
                        idCategory={category.id}
                        border={'border-[1px] border-black'}
                    />
                </div>

                <div>
                    <ProductSlider
                        products={products}
                        slidesToShow={3}
                        slidesToScroll={1}
                        bgColor={'bg-white'}
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                },
                            },
                            {
                                breakpoint: 764,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                },
                            },
                        ]}
                    />
                </div>
            </div>
        )
    );
};

export default ItemCollection;
