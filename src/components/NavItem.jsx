import React from 'react';

const NavItem = ({ id, name, subcategories }) => {
    return (
        <a href={id === 2 ? '#' : `/collections/${id}`} key={id}>
            <div className="group relative flex items-center gap-2 p-4">
                <span
                    className={`text-[12px] font-bold uppercase ${name === 'Outlet' ? 'text-[#F50000]' : 'group-hover:text-[#FB8500]'} `}
                >
                    {name}
                </span>
                {subcategories && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 group-hover:text-[#FB8500]"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                )}

                {subcategories && (
                    <ul className="absolute left-2 top-[100%] z-50 hidden min-w-40 flex-col bg-white shadow-[0px_2px_20px_rgba(0,0,0,0.2)] group-hover:flex">
                        {subcategories.map((item) => (
                            <a
                                key={item.id}
                                href={`/collections/${item.id}`}
                                className="block p-2 font-sans text-[12px] font-bold uppercase hover:text-[#FB8500]"
                            >
                                {item.name}
                            </a>
                        ))}
                    </ul>
                )}
            </div>
        </a>
    );
};

export default NavItem;
