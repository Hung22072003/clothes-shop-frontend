import React from 'react';

const Button = ({ idCategory, padding = 'px-[20px] py-[10px]', border }) => {
    return (
        <div className="flex items-center justify-center">
            <a
                href={`/collections/${idCategory}`}
                className={`cursor-pointer rounded-md bg-black ${padding} ${border} text-[14px] text-white hover:bg-white hover:text-black`}
            >
                Xem tất cả »
            </a>
        </div>
    );
};

export default Button;
