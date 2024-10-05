import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import category from '../data/category.js';
import NavItem from './NavItem';
import { getCategoriesByOptions, getCategoryById } from '../api/services/CategoryService';
const Navbar = () => {
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
        <div className="fixed left-0 right-0 top-[76px] z-[1000] hidden bg-white shadow-[0_1px_5px_2px_rgba(0,0,0,0.15)] lg:block">
            <div className="mx-auto px-4 md:px-8 lg:max-w-[1200px]">
                <ul className="flex items-center justify-center gap-2">
                    {categories.map((item) => (
                        <div key={item.id}>
                            <NavItem id={item.id} name={item.name} subcategories={item.subcategories} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
