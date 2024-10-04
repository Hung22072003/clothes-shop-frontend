import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import category from '../data/category.js';
import { Link, NavLink } from 'react-router-dom';
import { getCategoriesByOptions } from '../api/services/CategoryService.jsx';
const Header = () => {
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

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, [options]);
    const fetchCategories = async () => {
        const response = await getCategoriesByOptions(options);
        // console.log(response);
        if (response.status == 200) {
            setCategories(response.data.result);
        }
    };
    return (
        <div className="fixed left-0 right-0 top-0 z-50 h-[76px] bg-black py-3">
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
                        <form action="">
                            <div>
                                <input
                                    className="w-full rounded-md border-2 border-[#e5e5e5] px-3 py-2 outline-none"
                                    type="text"
                                    placeholder="Bạn đang tìm gì..."
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
                                <a href="/login" className=" flex flex-col items-center gap-1">
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
                                        4
                                    </p>
                                </a>
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
