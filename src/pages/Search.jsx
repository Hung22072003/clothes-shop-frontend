import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProduct } from '../api/services/ProductService';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Search = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

    const changePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const incrementPage = () => {
        setPage(page + 1);
        if (page + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    useEffect(() => {
        fetchProductsSearching();
    }, [page]);

    const decrementPage = () => {
        setPage(page - 1);
        if ((page - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        if (page - 1 === 0) {
            return null;
        }
    };

    const [totalPages, setTotalPages] = useState();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProductsSearching();
    }, [query]);

    const fetchProductsSearching = async () => {
        setLoading(true);
        const response = await searchProduct(query, page - 1, pageSize);
        if (response.status == 200) {
            setTotalPages(response.data.result.pagination.total_pages);
            setProducts(response.data.result.data);
            setLoading(false);
        }
    };

    return (
        query &&
        loading == false && (
            <div>
                <ul className="flex items-center py-[10px] text-[13px]">
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className="before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <span>Tìm kiếm</span>
                    </li>
                </ul>

                <h1 className="mb-[13px] mt-[30px] text-center text-[36px]">Tìm kiếm</h1>
                <p className="mb-[25px] text-[14px]">
                    Kết quả tìm kiếm cho "<strong>{query}</strong>"
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <Pagination
                    totalPages={totalPages + 1}
                    pageSize={pageSize}
                    page={page}
                    changePage={changePage}
                    incrementPage={incrementPage}
                    decrementPage={decrementPage}
                    pageNumberLimit={pageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                    maxPageNumberLimit={maxPageNumberLimit}
                />
            </div>
        )
    );
};

export default Search;
