import React, { useEffect, useState } from 'react';
import Coupon from './Coupon';
import list_coupon from '../data/list_coupon';
import { getAllVoucher } from '../api/services/VoucherService';
const Coupons = () => {
    const [selectedCoupon, setSelectedCoupon] = useState();
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        fetchVouchers();
    }, []);
    const fetchVouchers = async () => {
        const response = await getAllVoucher();
        // console.log(response);
        if (response.status === 200) {
            setCoupons(response.data);
        }
    };
    return (
        <div className="mx-[-7px] flex flex-nowrap overflow-x-auto">
            {coupons &&
                coupons.map((coupon) => (
                    <div
                        className="flex-shrink-0 flex-grow-0 basis-[90%] px-[7px] md:basis-[45%] lg:basis-[35%] xl:basis-[25%]"
                        key={coupon.id}
                    >
                        <Coupon coupon={coupon} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} />
                    </div>
                ))}
        </div>
    );
};

export default Coupons;
