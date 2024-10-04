import React, { memo } from 'react';

const Coupon = ({ coupon, selectedCoupon, setSelectedCoupon }) => {
    const convertPrice = (price) => {
        if (price >= 1000) {
            return price / 1000 + 'K';
        }
        return price.toString();
    };
    return (
        <div className="flex overflow-auto rounded-[8px] bg-white shadow-[0px_0px_4px_2px_#ccc]">
            <div className="flex w-[30%] items-center justify-center border-l-[12px] border-r-[1px] border-l-[#FCBF49] border-r-[#ccc] p-[8px] text-[22px]">
                <strong>{coupon.id}</strong>
            </div>
            <div className="w-[70%] p-[5px]">
                <div>
                    <span className="mb-[7px] block text-[15px] font-bold uppercase">{`Giảm ${convertPrice(coupon.discount_price)}`}</span>
                    <small className="text-[11.5px]">{`đơn từ ${convertPrice(coupon.min_total)}`}</small>
                </div>
                <div className="mt-[10px] flex items-center justify-between">
                    <div>
                        <span className="block text-[11px]">
                            Mã: <strong>{coupon.id}</strong>
                        </span>
                        <span className="block text-[11px]">
                            HSD: <span>{coupon.end_date}</span>
                        </span>
                    </div>

                    <div>
                        <button
                            onClick={(e) => {
                                navigator.clipboard.writeText(coupon.id);
                                e.target.innerText = 'Đã sao chép';
                                setSelectedCoupon(coupon.id);
                            }}
                            className="rounded-[20px] bg-black px-[12px] py-[2px] text-[12px] text-white"
                        >
                            {selectedCoupon === coupon.id ? 'Đã sao chép' : 'Sao chép mã'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Coupon);
