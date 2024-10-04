import React from 'react';
import list_combo from '../data/list_combo';
import Button from './Button';
const Combo = () => {
    return (
        <div>
            <h2 className="mb-[25px] text-[20px] font-bold uppercase">Combo mix & match đúng chuẩn</h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {list_combo.map((combo) => (
                    <div key={combo.id} className="relative">
                        <a href="">
                            <img className="h-full w-full rounded-lg" src={combo.img} />
                        </a>

                        <div className="absolute bottom-[10px] right-[10px] z-10">
                            <button className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[20px] bg-black transition-all duration-100">
                                <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[20px] bg-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-[16px] w-[16px] text-white"
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
                ))}
            </div>

            <div className="mt-[25px] flex items-center justify-center">
                <a
                    className={`max-w-[150px] cursor-pointer rounded-lg border-[1px] border-black bg-white px-[25px] py-[8px] text-[16px] font-medium hover:bg-black hover:text-white`}
                >
                    Xem tất cả
                </a>
            </div>
        </div>
    );
};

export default Combo;
