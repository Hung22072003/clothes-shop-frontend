import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const Cart = ({ numberOfCarts, setNumberOfCarts }) => {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('carts')) ?? [];
        setCarts(carts);
    }, [numberOfCarts]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleDecreaseQuantity = (cart) => {
        if (cart.quantity > 1) {
            const newCarts = carts.map((item) => {
                if (item.id == cart.id && item.color == cart.color && item.size == cart.size) item.quantity -= 1;
                return item;
            });

            localStorage.setItem('carts', JSON.stringify(newCarts));
            setNumberOfCarts((prev) => prev - 1);
        }
    };

    const handleIncreaseQuantity = (cart) => {
        const newCarts = carts.map((item) => {
            if (item.id == cart.id && item.color == cart.color && item.size == cart.size) item.quantity += 1;
            return item;
        });

        localStorage.setItem('carts', JSON.stringify(newCarts));
        setNumberOfCarts((prev) => prev + 1);
    };

    const handleRemoveProductToCart = (cart) => {
        const newCarts = carts.filter((item) => item !== cart);
        localStorage.setItem('carts', JSON.stringify(newCarts));
        setNumberOfCarts((prev) => prev - cart.quantity);
    };
    return (
        <div>
            <div>
                <ul className="flex items-center py-[10px] text-[13px]">
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className="before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <span>Giỏ hàng</span>
                    </li>
                </ul>

                <div className="mt-[15px] grid grid-cols-[58.33333333%_41.66666667%]">
                    <div>
                        <div className="rounded-[3px] bg-white p-[15px]">
                            <div className="flex items-center justify-between border-b-[1px] border-[#eee] pb-[15px]">
                                <h2 className="text-[20px] font-bold">Giỏ hàng:</h2>
                                <span className="border-b-[1px] border-[#000] text-[14px]">
                                    {numberOfCarts} Sản phẩm
                                </span>
                            </div>

                            <div className="my-[5px] block h-[6px] w-[100%] rounded-[9999px] bg-[#efefed]"></div>

                            {carts.length === 0 ? (
                                <div className="my-[20px] text-center">
                                    <p className="text-[17px]">
                                        Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm{' '}
                                        <a href="/collections/3" className="font-semibold">
                                            tại đây.
                                        </a>
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-[20px]">
                                    {carts.map((cart, index) => (
                                        <div key={index} className="mb-[20px] flex flex-row">
                                            <div className="mr-[12px] max-w-[120px]">
                                                <img src={cart.image} />
                                            </div>

                                            <div className="relative w-[100%]">
                                                <div className="flex cursor-pointer items-center justify-between">
                                                    <a
                                                        href={`/products/${cart.id}`}
                                                        className="block hover:text-[#FB8500]"
                                                    >
                                                        {cart.name}
                                                    </a>
                                                    <div
                                                        className="hover:text-[#FB8500]"
                                                        onClick={() => handleRemoveProductToCart(cart)}
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-0 w-[100%]">
                                                    <div className="mb-[10px] text-[14px]">
                                                        {cart.color} / {cart.size}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="float-left mr-[15px] flex border-[1px] border-[#e1e1e1]">
                                                            <input
                                                                type="button"
                                                                onClick={() => handleDecreaseQuantity(cart)}
                                                                className="quantity-btn"
                                                                value="-"
                                                            />
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                className="quantity-selector"
                                                                value={cart.quantity}
                                                            />
                                                            <input
                                                                type="button"
                                                                onClick={() => handleIncreaseQuantity(cart)}
                                                                className="quantity-btn"
                                                                value="+"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col items-end">
                                                            <span className="font-semibold">
                                                                {VND.format(cart.sell_price * cart.quantity)}
                                                            </span>
                                                            {cart.sell_price !== cart.original_price && (
                                                                <span className="text-[#7C858D] ">
                                                                    <del>
                                                                        {VND.format(
                                                                            cart.original_price * cart.quantity,
                                                                        )}
                                                                    </del>
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pl-[15px]">
                        <div className="sticky top-[15px] w-[100%] rounded-[3px] bg-white p-[15px]">
                            <h4 className="mb-[18px] text-[21px] font-semibold leading-normal">Thông tin đơn hàng</h4>
                            <div>
                                <p className="mb-[10px] flex items-center justify-between text-[16px] font-medium">
                                    Tạm tính:{' '}
                                    <span>
                                        {VND.format(
                                            carts.reduce((sum, cart) => sum + cart.original_price * cart.quantity, 0),
                                        )}
                                    </span>
                                </p>
                                <p className="mb-[10px] flex items-center justify-between text-[16px] font-medium">
                                    Giá giảm:{' '}
                                    <span>
                                        {VND.format(
                                            carts.reduce(
                                                (sum, cart) =>
                                                    sum + cart.quantity * (cart.original_price - cart.sell_price),
                                                0,
                                            ),
                                        )}
                                    </span>
                                </p>
                                <p className="mb-[10px] flex items-center justify-between text-[16px] font-medium">
                                    Tổng tiền:{' '}
                                    <span className="font-semibold">
                                        {VND.format(
                                            carts.reduce((sum, cart) => sum + cart.quantity * cart.sell_price, 0),
                                        )}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-[15px] mt-[20px] text-[21px] font-semibold">Ghi chú đơn hàng</div>
                            <textarea
                                className="mb-[10px] h-[60px] w-[100%] resize-none border-[1px] border-[#e5e5e5] p-[8px_10px] text-[14px] outline-none"
                                placeholder="Ghi chú"
                            />
                            <input
                                className="my-[10px] h-auto w-[100%] border-[1px] border-[#e5e5e5] p-[8px_10px] text-[14px] outline-none"
                                placeholder="Nhập mã khuyến mãi (nếu có)"
                            />

                            <div className="text-center">
                                <a
                                    href=""
                                    className="out my-[15px] block w-[100%] rounded-[3px] border-none bg-black p-[10px_15px] text-center text-[14px] uppercase text-white"
                                >
                                    Thanh toán ngay
                                </a>
                                <a
                                    href="/collections/3"
                                    className="mb-[10px] block cursor-pointer text-center text-[14px] outline-none hover:text-[#FB8500]"
                                >
                                    <FontAwesomeIcon icon={faReply} className="mr-[2px]" />
                                    Tiếp tục mua hàng
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
