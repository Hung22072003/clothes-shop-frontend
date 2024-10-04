import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import collections from '../data/collections';
import ProductCard from '../components/ProductCard';
import { getCategoryById } from '../api/services/CategoryService';
import { getProductByCategory } from '../api/services/ProductService';
const Collection = () => {
    const [value, setValue] = useState('manual');
    const { collectionId } = useParams();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [collectionId]);

    const fetchCategory = async () => {
        const response = await getCategoryById(collectionId);
        if (response.status == 200) {
            setCategory(response.data.result);
        }
    };

    const fetchProducts = async () => {
        const response = await getProductByCategory(collectionId);
        if (response.status == 200) {
            setProducts(response.data.result);
            setCollectionSorted(response.data.result);
        }
    };

    const [collectionSorted, setCollectionSorted] = useState([]);
    useEffect(() => {
        switch (value) {
            case 'manual': {
                setCollectionSorted([...products]);
                break;
            }
            case 'price-ascending': {
                const newCollection = collectionSorted.sort(
                    (product1, product2) => product1.sell_price - product2.sell_price,
                );
                setCollectionSorted([...newCollection]);
                break;
            }
            case 'price-descending': {
                const newCollection = collectionSorted.sort(
                    (product1, product2) => product2.sell_price - product1.sell_price,
                );
                setCollectionSorted([...newCollection]);
                break;
            }
            case 'title-ascending': {
                const newCollection = collectionSorted.sort((product1, product2) =>
                    product1.name.localeCompare(product2.name),
                );
                setCollectionSorted([...newCollection]);
                break;
            }
            case 'title-descending': {
                const newCollection = collectionSorted.sort((product1, product2) =>
                    product2.name.localeCompare(product1.name),
                );
                setCollectionSorted([...newCollection]);
                break;
            }
        }
    }, [value]);
    return (
        category && (
            <div>
                <ul className="flex items-center py-[10px] text-[13px]">
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className="uppercase before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <span>{category.name}</span>
                    </li>
                </ul>

                <div className="pt-[10px]">
                    <img className="w-full" src={category.background} />
                </div>

                <div className="mb-[15px] mt-[25px] flex items-center justify-end">
                    <label className="mr-[15px] text-[14px] font-bold" htmlFor="sortby">
                        Sắp xếp:
                    </label>
                    <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="h-[36px] min-w-[175px] appearance-none border-[1px] border-black bg-imgsort bg-[right_10px_center] bg-no-repeat px-[15px] text-[15px] font-medium leading-[36px] outline-none"
                    >
                        <option value="manual" data-filter="&sortby=manual">
                            Sản phẩm nổi bật
                        </option>
                        <option value="price-ascending" data-filter="&sortby=(price:product=asc)">
                            Giá: Tăng dần
                        </option>
                        <option value="price-descending" data-filter="&sortby=(price:product=desc)">
                            Giá: Giảm dần
                        </option>
                        <option value="title-ascending" data-filter="&sortby=(title:product=asc)">
                            Tên: A-Z
                        </option>
                        <option value="title-descending" data-filter="&sortby=(title:product=desc)">
                            Tên: Z-A
                        </option>
                        <option value="created-ascending" data-filter="&sortby=(updated_at:product=desc)">
                            Cũ nhất
                        </option>
                        <option value="created-descending" data-filter="&sortby=(updated_at:product=asc)">
                            Mới nhất
                        </option>
                        <option value="best-selling" data-filter="&sortby=(sold_quantity:product=desc)">
                            Bán chạy nhất
                        </option>
                        <option value="quantity-descending" data-filter="&sortby=(quantity:product=desc)">
                            Tồn kho: Giảm dần
                        </option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {collectionSorted.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default Collection;
