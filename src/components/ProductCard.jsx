import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    function createSlug(text) {
        return text
            .toLowerCase() // Chuyển thành chữ thường
            .replace(/ /g, '-') // Thay khoảng trắng thành dấu gạch ngang
            .replace(/[^\w-]+/g, ''); // Loại bỏ các ký tự không phải là chữ cái, chữ số, hoặc gạch ngang
    }
    return (
        <div className="w-full rounded-md bg-white px-[5px] py-[10px]">
            <div className="relative">
                <a href={`/products/${product.id}`} className="outline-none">
                    <img src={product.images[0]} />
                </a>
                {product.discount !== 0 && (
                    <span className="absolute right-2 top-2 rounded-md bg-red-700 px-1 text-[14px] font-bold text-white">
                        {product.discount * 100}%
                    </span>
                )}

                <div className="absolute bottom-2 right-2">
                    <button className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[20px] bg-black transition-all duration-100 hover:w-[125px]">
                        <span className="mr-[10px] hidden w-max pl-[10px] text-[13px] text-white transition-none group-hover:block">
                            Thêm vào giỏ
                        </span>

                        <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[20px] bg-black group-hover:mr-[2px] group-hover:bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-[16px] w-[16px] text-white group-hover:text-[#288ad6]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <div className="px-2">
                <div className="h-[46px] max-h-[46px] overflow-hidden">
                    <a
                        href={`/products/${product.id}`}
                        className="line-clamp-2 overflow-hidden pt-[10px] text-[14px] font-normal leading-[18px] text-black"
                    >
                        {product.name}
                    </a>
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <span className="text-[14px] font-bold text-[#e70303]">{VND.format(product.sell_price)}</span>
                    <del className="text-[13px] font-bold text-[#888888]">
                        {product.discount !== 0 && VND.format(product.original_price)}
                    </del>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
