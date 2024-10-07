import React, { useEffect, useState, forwardRef, useRef } from 'react';
import logo from '../assets/logo.png';
import cart from '../assets/cart.webp';
import category from '../data/category.js';
import { Link, NavLink } from 'react-router-dom';
import { getCategoriesByOptions } from '../api/services/CategoryService.jsx';
import { searchProduct } from '../api/services/ProductService.jsx';
import carts from '../data/cart.jsx';
const Header = ({ cartVisible, setCartVisible, searchVisible, setSearchVisible, numberOfCarts, setNumberOfCarts }) => {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('carts')) ?? [];
        setCarts(carts);
    }, [numberOfCarts]);

    const handleRemoveProductToCart = (cart) => {
        const newCarts = carts.filter((item) => item !== cart);
        localStorage.setItem('carts', JSON.stringify(newCarts));
        setNumberOfCarts((prev) => prev - cart.quantity);
    };
    const [valueInput, setValueInput] = useState('');
    const [products, setProducts] = useState([]);
    const [tabletNavVisible, setTabletNavVisible] = useState(false);
    const [subNavId, setSubNavId] = useState([]);
    const [searchBar, setSearchBar] = useState(false);
    const [options, setOptions] = useState([
        'Hàng mới',
        'Sản phẩm',
        'Áo Nam',
        'Quần Nam',
        'Outlet',
        'Marvel Collection',
    ]);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, [options]);

    useEffect(() => {
        fetchProductsSearching();
    }, [valueInput]);
    const fetchCategories = async () => {
        const response = await getCategoriesByOptions(options);
        // console.log(response);
        if (response.status == 200) {
            setCategories(response.data.result);
        }
    };

    const fetchProductsSearching = async () => {
        const response = await searchProduct(valueInput, 0, 4);
        if (response.status == 200) {
            setProducts(response.data.result.data);
        }
    };
    return (
        <div className="fixed left-0 right-0 top-0 z-[5000] h-[76px] bg-black py-3">
            <div className="mx-auto px-4 md:px-[15px] lg:max-w-[1200px]">
                <div className="grid grid-cols-[25%_50%_25%] items-center">
                    <div className="cursor-pointer lg:hidden" onClick={() => setTabletNavVisible(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </div>
                    <div>
                        <a href="/">
                            <img className="mx-auto" src={logo} width={130} height={35} />
                        </a>
                    </div>

                    <div className="relative hidden lg:block">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (valueInput.trim() !== '') {
                                    window.location.href = `/search?query=${encodeURIComponent(valueInput)}`;
                                }
                            }}
                        >
                            <div>
                                <input
                                    value={valueInput}
                                    className="w-full rounded-md border-2 border-[#e5e5e5] px-3 py-2 outline-none"
                                    type="text"
                                    placeholder="Bạn đang tìm gì..."
                                    onChange={(e) => {
                                        setValueInput(e.target.value);
                                        if (e.target.value == '') {
                                            setSearchVisible(false);
                                        } else {
                                            setSearchVisible(true);
                                        }
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="absolute right-[3px] top-[2px] rounded-md bg-black px-7 py-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </button>
                        </form>

                        {products && searchVisible && (
                            <div className="absolute z-[9999] w-[100%] overflow-y-auto bg-white py-[15px] pt-[8px] shadow-[0px_0px_3px_0px_#ccc]">
                                <div className="mb-[10px] text-center text-[18px] font-bold uppercase">
                                    Kết quả tìm kiếm
                                </div>
                                <div className="mb-[10px] flex items-center justify-between bg-[#f5f5f5] p-[2px_15px]">
                                    <span className="text-[15px] font-semibold uppercase">Sản phẩm</span>
                                    {products.length != 0 && (
                                        <a
                                            href={`/search?query=${encodeURIComponent(valueInput)}`}
                                            className="text-[14px] font-[400]"
                                        >
                                            Xem tất cả
                                        </a>
                                    )}
                                </div>
                                <ul className="px-[15px]">
                                    {products.length != 0 ? (
                                        products.map((product, index) => (
                                            <li key={index} className="mb-[5px] flex">
                                                <div className="h-[80px] w-[80px] flex-[0_0_100px] pr-[10px]">
                                                    <a href={`/products/${product.id}`}>
                                                        <img
                                                            className="h-[100%] w-[100%] object-contain"
                                                            src={product.images[0]}
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="text-[14px]">
                                                    <a
                                                        href={`/products/${product.id}`}
                                                        className="block overflow-hidden outline-none hover:text-[#FB8500]"
                                                    >
                                                        {product.name}
                                                    </a>
                                                    <span className="text-red-600">
                                                        {VND.format(product.sell_price)}
                                                    </span>
                                                    <del className="ml-[10px] text-[#666]">
                                                        {VND.format(product.original_price)}
                                                    </del>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <div>Không có sản phẩm phù hợp</div>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <ul className="flex items-center justify-end gap-4 text-white">
                            <li className=" relative cursor-pointer">
                                <span
                                    className="lg:hidden"
                                    onClick={() => {
                                        setSearchBar((prev) => !prev);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </span>
                                {searchBar && (
                                    <div>
                                        <span className="absolute hidden h-[15px] w-[22px] md:top-[35px] md:block lg:hidden">
                                            <svg viewBox="0 0 20 9" role="presentation">
                                                <path
                                                    d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                    fill="#ffffff"
                                                ></path>
                                            </svg>
                                        </span>
                                        <div className=" absolute right-[-104px] top-[44px] z-50 min-w-[100vw] md:left-[-350px] md:min-w-[420px] lg:hidden  ">
                                            <div className="border-1  w-full rounded-[3px] border-[#dfe3e8] bg-white px-3 py-4 shadow-[0_1px_5px_2px_rgba(0,0,0,0.1)] md:w-[420px]">
                                                <p className="mb-3 border-b-2 border-[#ededed] px-[10px] py-[6px] text-center text-[17px] font-bold text-black">
                                                    TÌM KIẾM
                                                </p>
                                                <input
                                                    placeholder="Tìm kiếm sản phẩm"
                                                    className="h-[45px] w-[100%] border-2 border-[#ececec] bg-[#f5f5f5] pl-[20px] pr-[55px] text-[14px] font-medium text-[#333333] outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                <a href="/login" className="flex flex-col items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                        />
                                    </svg>

                                    <span className="hidden font-sans text-[13px] lg:block">Đăng nhập</span>
                                </a>
                            </li>
                            <li className="relative">
                                <span
                                    href=""
                                    className=" flex cursor-pointer flex-col items-center gap-1"
                                    onClick={() => {
                                        setCartVisible((prev) => !prev);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>

                                    <span className="hidden font-sans text-[13px] lg:block">Giỏ hàng</span>

                                    <p className="absolute right-[-4px] top-[-4px] aspect-square w-4 rounded-full bg-white text-center text-[10px] text-xs leading-4 text-black lg:right-[6px] lg:top-[-5px]">
                                        {numberOfCarts}
                                    </p>
                                </span>

                                {
                                    <div
                                        className={`${cartVisible ? 'visible scale-100 opacity-100' : 'hidden scale-0'} cart-dropdown absolute right-[-50%] top-full-plus-13  z-[1000] w-[420px] min-w-[280px] rounded-[3px] border-[1px] border-[#dfe3e8] bg-white text-black shadow-[0px_1px_5px_2px_rgba(0,0,0,0.1)] transition-transform delay-200 ease-in-out`}
                                    >
                                        <div className="h-[100%] max-h-[755px] w-[100%] overflow-y-auto overflow-x-hidden p-[10px_15px]">
                                            <div className="mb-[5px] text-center text-[17px] uppercase">Giỏ hàng</div>
                                            <div>
                                                <div className=" border-b-[1px] border-[#ccc]">
                                                    {carts.length == 0 ? (
                                                        <div className="flex flex-col items-center">
                                                            <img className="mb-[10px] w-[60px]" src={cart} alt="" />
                                                            <p className="text-[14px]">Hiện chưa có sản phẩm</p>
                                                        </div>
                                                    ) : (
                                                        <div className="cart-scroll max-h-[276px] overflow-y-auto">
                                                            <table className="w-[100%] border-collapse border-spacing-x-0 p-[10px]">
                                                                <tbody>
                                                                    {carts.map((cart, index) => (
                                                                        <tr
                                                                            className={`${index < carts.length - 1 && 'border-b-[1px] border-dotted border-[#ddd]'} relative`}
                                                                            key={index}
                                                                        >
                                                                            <td className="w-[90px] p-[10px]">
                                                                                <a href={`products/${cart.id}`}>
                                                                                    <img
                                                                                        className="mb-[10px] w-[70px] text-center"
                                                                                        src={cart.image}
                                                                                    />
                                                                                </a>
                                                                            </td>
                                                                            <td className="p-[10px]">
                                                                                <a
                                                                                    href={`products/${cart.id}`}
                                                                                    className="float-left w-[100%] pr-[15px] text-start text-[14px] font-bold hover:text-[#FB8500]"
                                                                                >
                                                                                    {cart.name}
                                                                                </a>
                                                                                <span className="float-left my-[2px] w-[100%] text-left text-[13px]">
                                                                                    {cart.color} / {cart.size}
                                                                                </span>
                                                                                <div className="float-left flex w-[100%] items-center text-[14px]">
                                                                                    <span className="mr-[10px] block text-center font-[500] leading-[26px] text-[#ff0000]">
                                                                                        {VND.format(cart.sell_price)}
                                                                                    </span>
                                                                                    {cart.sell_price !==
                                                                                        cart.original_price && (
                                                                                        <span>
                                                                                            <del>
                                                                                                {VND.format(
                                                                                                    cart.original_price,
                                                                                                )}
                                                                                            </del>
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <p className="float-left mr-[10px] block text-[14px] font-[500] leading-[26px]">
                                                                                    x{cart.quantity}
                                                                                </p>

                                                                                <span
                                                                                    onClick={() =>
                                                                                        handleRemoveProductToCart(cart)
                                                                                    }
                                                                                    className="absolute right-0 top-[10px] h-[20px] w-[20px] cursor-pointer text-center text-[17px] leading-[20px]"
                                                                                >
                                                                                    <i className="fa fa-times"></i>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <ul>
                                                        <li className="flex items-center justify-between py-[3px] font-semibold">
                                                            <span className=" text-[16px] ">Tạm tính: </span>
                                                            <span className="text-[18px]">
                                                                {VND.format(
                                                                    carts.reduce(
                                                                        (sum, cart) =>
                                                                            sum + cart.original_price * cart.quantity,
                                                                        0,
                                                                    ),
                                                                )}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center justify-between py-[3px] font-semibold">
                                                            <span className=" text-[16px] ">Giảm giá: </span>
                                                            <span className="text-[18px]">
                                                                {VND.format(
                                                                    carts.reduce(
                                                                        (sum, cart) =>
                                                                            sum +
                                                                            (cart.original_price - cart.sell_price) *
                                                                                cart.quantity,
                                                                        0,
                                                                    ),
                                                                )}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center justify-between py-[3px] font-semibold">
                                                            <span className=" text-[16px] ">Tổng tiền: </span>
                                                            <span className="text-[18px] text-red-600">
                                                                {VND.format(
                                                                    carts.reduce(
                                                                        (sum, cart) =>
                                                                            sum + cart.sell_price * cart.quantity,
                                                                        0,
                                                                    ),
                                                                )}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center justify-between py-[3px] font-semibold">
                                                            <a
                                                                href="/cart"
                                                                className="inline-block overflow-hidden border-[1px] border-black bg-white p-[13px_35px] text-center text-[12px] font-bold uppercase hover:bg-black hover:text-white"
                                                            >
                                                                Chỉnh sửa giỏ hàng
                                                            </a>
                                                            <a
                                                                href=""
                                                                className="inline-block overflow-hidden border-[1px] border-black bg-black p-[13px_35px] text-center text-[12px] font-bold uppercase text-white hover:bg-white hover:text-black"
                                                            >
                                                                Thanh toán
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                className={`fixed bottom-0 right-0 top-0 z-50 snap-none scroll-m-0 overflow-hidden overflow-y-auto bg-black transition-all lg:hidden ${tabletNavVisible ? 'w-full' : 'w-0'}`}
            >
                <div className="relative">
                    <a href="/">
                        <img className="mx-auto" src={logo} width={170} height={50} />
                    </a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="absolute right-3 top-[50%] size-7 translate-y-[-50%] cursor-pointer text-white"
                        onClick={() => {
                            setTabletNavVisible(false);
                            setSubNavId([]);
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <ul className="flex flex-col">
                    {categories.map((item) => (
                        <li
                            key={item.id}
                            className={`relative float-left w-full overflow-hidden ${item.name === 'Outlet' && 'border-2 border-[#d70000] bg-red-600'}`}
                        >
                            <span
                                className={`block p-3 text-[15px] uppercase text-white ${item.name === 'Outlet' && 'font-bold'}`}
                            >
                                <a href={item.id === 2 ? '#' : `/collections/${item.id}`}>{item.name}</a>
                            </span>

                            {item.subcategories &&
                                (subNavId.includes(item.id) ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="absolute right-3 top-3 size-6 cursor-pointer text-white"
                                        onClick={() => {
                                            const newSubNavId = [...subNavId];

                                            newSubNavId.splice(newSubNavId.indexOf(item.id), 1);
                                            setSubNavId(newSubNavId);
                                        }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="absolute right-3 top-3 size-6 cursor-pointer text-white"
                                        onClick={() => {
                                            setSubNavId((prev) => [...prev, item.id]);
                                        }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                ))}

                            {subNavId.includes(item.id) && (
                                <ul className="px-3">
                                    {item.subcategories.map((subitem) => (
                                        <li key={subitem.id} className="p-2">
                                            <a
                                                href={`/collections/${subitem.id}`}
                                                className="text-[15px] uppercase text-white"
                                            >
                                                {subitem.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
