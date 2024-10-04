import React, { useEffect, useMemo } from 'react';
import ImageProductSlider from '../components/ImageProductSlider';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProductById } from '../api/services/ProductService';
import { getAllVoucher } from '../api/services/VoucherService';
const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [colors, setColors] = useState();
    const [sizes, setSizes] = useState();
    const [currentColor, setCurrentColor] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [quantity, setQuantity] = useState(1);
    const [choiceSize, setChoiceSize] = useState();
    const [descriptionId, setDescriptionId] = useState(1);
    const [currentSize, setCurrentSize] = useState();
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
    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        const response = await getProductById(productId);
        if (response.status === 200) {
            setProduct(response.data.result);
            // setColors(response.data.result.colors);
            // setSizes(response.data.result.sizes);
        }
    };
    useEffect(() => {
        if (product) {
            const index = product.images.indexOf(product.colors[0].image);
            setCurrentColor(product.colors[0].id);
            setCurrentImage(index != -1 ? index : 0);
        }
    }, [product]);

    useEffect(() => {
        setChoiceSize(product && product.sizes[0].values[0].type);
        setCurrentSize(product && product.sizes.find((size) => size.id_color === currentColor));
    }, [currentColor]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const list_promotion = [
        <span>
            Giảm <strong style={{ color: '#D22928' }}> 10%</strong> toàn bộ <a href="#">sản phẩm mới</a>
        </span>,
        <span>
            Giảm <strong style={{ color: '#D22928' }}> 5% </strong> đối với <a href="#">sản phẩm MARVEL</a>
        </span>,
        <span>
            Nhập mã <strong style={{ color: '#D22928' }}>QK50</strong> giảm 50K đơn hàng từ 999K
        </span>,
        <span>
            Nhập mã <strong style={{ color: '#D22928' }}>QK100</strong> giảm 100K đơn hàng từ 1499K
        </span>,
        <span>
            <strong>FREESHIP</strong> mọi đơn hàng
        </span>,
    ];

    const policies = [
        {
            image: '/src/assets/policy/policy_1.webp',
            title: 'Đổi trả tận nhà trong vòng 7 ngày',
        },
        {
            image: '/src/assets/policy/policy_2.webp',
            title: 'Freeship toàn bộ đơn hàng',
        },
        {
            image: '/src/assets/policy/policy_3.webp',
            title: 'Bảo hành trong vòng 30 ngày',
        },
        {
            image: '/src/assets/policy/policy_4.webp',
            title: 'Hotline 0287.100.6789 hỗ trợ từ 8h30-24h',
        },
        {
            image: '/src/assets/policy/policy_5.webp',
            title: 'Giao hàng toàn quốc',
        },
        {
            image: '/src/assets/policy/policy_6.webp',
            title: 'Có cộng dồn ưu đãi KHTT',
        },
    ];

    const list_description = [
        {
            id: 1,
            title: 'Mô tả',
            desc: product && (
                <div>
                    <p className="font-bold">{product.name}</p>
                    <ul className="my-[13px] ml-[15px] list-disc">
                        {product.material && (
                            <li>
                                <strong>Chất liệu: </strong>
                                {product.material}
                            </li>
                        )}
                        {product.fit && (
                            <li>
                                <strong>Form: </strong>
                                {product.fit}
                            </li>
                        )}
                    </ul>
                    <hr></hr>
                    {product.descriptions.map((description) => (
                        <div>
                            <span className="my-[15px] block font-bold leading-[21px]">{description.title}</span>
                            <div dangerouslySetInnerHTML={{ __html: description.description }}></div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 2,
            title: 'Chính sách giao hàng',
            desc: (
                <div>
                    <p style={{ textAlign: 'center' }}>
                        <img src="https://file.hstatic.net/1000253775/file/giaohang.jpg" />
                    </p>
                </div>
            ),
        },
        {
            id: 3,
            title: 'Chính sách đổi trả',
            desc: (
                <div>
                    <p style={{ textAlign: 'center' }}>
                        <img src="//file.hstatic.net/1000253775/file/z3473872421273_d4dfe497f2f0c96645d3234e2ee021d3_11d54821b8a040e1920dbcf5969961f5.jpg" />
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <img src="//file.hstatic.net/1000253775/file/doitra_1_f4c64e0f9510477eae1bac666cdf21e9.jpg" />
                    </p>
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                    <hr></hr>
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                    <p style={{ textAlign: 'center' }}>
                        <img src="//file.hstatic.net/1000253775/file/doitra_2_24f5ca9744df4693b86f97875efd2c85.jpg" />
                    </p>
                    <p>&nbsp;</p>
                </div>
            ),
        },
    ];

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const convertPrice = (price) => {
        if (price >= 1000) {
            return price / 1000 + 'K';
        }
        return price.toString();
    };
    return (
        product && (
            <div>
                <ul className="flex items-center py-[10px] text-[13px]">
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className="before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <a href="/collections/3">TẤT CẢ SẢN PHẨM</a>
                    </li>
                    <li className="before:px-[8px] before:text-[#ccc] before:content-['/\00a0']">
                        <span>{product.name}</span>
                    </li>
                </ul>

                <div className="mx-[-40px]">
                    <div className="grid grid-cols-2 gap-[30px]">
                        <div className="relative rounded-[5px] bg-white p-[15px]">
                            <div className="sticky top-[10px]">
                                <ImageProductSlider images={product.images} currentImage={currentImage} />
                            </div>
                            {product.discount !== 0 && (
                                <div className="absolute right-[20px] top-[15px] h-[55px] w-[55px] bg-[#ff0000] text-center text-[22px] leading-[55px] text-white">
                                    <span className="after:absolute after:right-[0px] after:top-[55px] after:border-x-[28px]  after:border-y-[15px] after:border-[red_transparent_transparent_transparent] after:content-['']">
                                        {product.discount * 100}%
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="rounded-[3px] bg-white p-[15px]">
                                <div>
                                    <h1 className="m-0 inline-block text-[24px] font-normal capitalize text-black">
                                        {product.name}
                                        <p className="relative left-[5px] top-[-5px] inline-block rounded-[3px] bg-[#38bf57] p-[1px_7px] text-[11px] text-white">
                                            {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                                        </p>
                                    </h1>
                                </div>

                                <div className="my-[10px] text-[14px]">
                                    <span>Loại:</span>
                                    <a href="#" className="ml-[5px] font-bold">
                                        {product.type}
                                    </a>
                                </div>

                                <div className="flex items-center">
                                    <span className="mr-[15px] text-[22px] font-bold text-[#ff0000]">
                                        {VND.format(product.sell_price)}
                                    </span>
                                    {product.discount !== 0 && (
                                        <del className="text-[16px] font-bold text-[#919191]">
                                            {VND.format(product.original_price)}
                                        </del>
                                    )}
                                </div>

                                <div className="relative mb-[10px] mt-[25px] border-[2px] border-dashed border-black p-[18px_15px_15px_15px]">
                                    <h3 className="absolute top-[-18px] mb-[8px] flex items-center gap-[5px] bg-white p-[5px_10px] text-[14px] font-semibold text-[#D22928]">
                                        <img className="h-[22px] w-[22px]" src="/src/assets/gift.webp" />
                                        KHUYẾN MÃI - ƯU ĐÃI
                                    </h3>

                                    <ul>
                                        {coupons &&
                                            coupons.map((coupon, index) => (
                                                <li className="mb-[7px] text-[14px]" key={index}>
                                                    <span>
                                                        Nhập mã{' '}
                                                        <strong style={{ color: '#D22928' }}> {coupon.id}</strong> giảm{' '}
                                                        {convertPrice(coupon.discount_price)} đơn hàng từ{' '}
                                                        {convertPrice(coupon.min_total)}
                                                    </span>
                                                </li>
                                            ))}
                                        <li className="text-[14px]">
                                            <span>
                                                <strong>FREESHIP</strong> đơn từ 399K
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {coupons && (
                                    <div>
                                        <h4 className="mb-[13px] text-[16px] leading-[18px]">
                                            Mã giảm giá bạn có thể sử dụng
                                        </h4>
                                        <ul className="flex items-center">
                                            {coupons.map((coupon, index) => (
                                                <button
                                                    className="coupon_item relative mr-[10px] rounded-[6px] border-[1px] border-black bg-black p-[5px_30px] text-[14px] text-white"
                                                    key={index}
                                                    content={coupon}
                                                    onClick={(e) => {
                                                        navigator.clipboard.writeText(e.target.getAttribute('content'));
                                                        e.target.innerText = 'Đã sao chép';
                                                        setTimeout(() => {
                                                            e.target.innerText = coupon.id;
                                                        }, 2000);
                                                    }}
                                                >
                                                    {coupon.id}
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {product.colors && (
                                    <div className="border-b-[1px] border-dotted border-[#dfe0e1] py-[10px]">
                                        <div className="mb-[8px] flex items-center text-[13px]">
                                            Màu sắc:
                                            <span className="ml-[3px] font-bold">
                                                {product.colors.find((color) => color.id === currentColor) &&
                                                    product.colors.find((color) => color.id === currentColor).name}
                                            </span>
                                        </div>
                                        <div className="mb-[8px] flex items-center">
                                            {product.colors.map((color) => (
                                                <span
                                                    className={`block h-[35px] w-[35px] min-w-[35px] cursor-pointer overflow-hidden rounded-full border-[1px] ${color.id === currentColor ? 'border-[#e4393c]' : 'border-[#e5e5e5]'} mr-[8px]  p-[3px] text-center`}
                                                    key={color.id}
                                                    onClick={() => {
                                                        setCurrentColor(color.id);
                                                        setCurrentImage(product.images.indexOf(color.image));
                                                    }}
                                                >
                                                    <img className="h-full w-full rounded-full" src={color.image} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {currentSize && (
                                    <div className="py-[10px]">
                                        <div className="mb-[8px] flex items-center text-[13px]">
                                            Kích thước:
                                            <span className="ml-[3px] font-bold">{choiceSize}</span>
                                        </div>

                                        <div>
                                            {currentSize.values.map((value) => (
                                                <div
                                                    className={`${value.quantity == 0 && 'sold-out'} group relative mr-[8px] inline-block cursor-pointer`}
                                                    onClick={(e) => {
                                                        if (!e.target.classList.contains('sold-out'))
                                                            setChoiceSize(value.type);
                                                    }}
                                                    key={value.type}
                                                >
                                                    <span
                                                        className={`block h-[35px] min-w-[40px] overflow-hidden rounded-[4px] border-[1px] ${choiceSize === value.type ? 'border-[#e4393c]' : 'border-[#e5e5e5]'}  text-center text-[12px] leading-[35px]`}
                                                    >
                                                        {value.type}
                                                    </span>

                                                    <img
                                                        className={`absolute bottom-0 right-0  ${choiceSize === value.type ? 'block' : 'hidden'}`}
                                                        src="/src/assets/check.webp"
                                                    />

                                                    <div className="popup-size absolute top-[-60px] z-50 hidden min-w-[320px] rounded-[2px] bg-white p-[16px] text-[13px] shadow-[0px_2px_16px_4px_rgba(0,0,0,0.16)] group-hover:block">
                                                        {value.parameter}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mr-[-15px] pt-[15px] ">
                                    <div className="float-left mr-[15px] flex border-[1px] border-[#e1e1e1]">
                                        <input
                                            type="button"
                                            onClick={handleDecreaseQuantity}
                                            className="quantity-btn"
                                            value="-"
                                        />
                                        <input type="text" readOnly className="quantity-selector" value={quantity} />
                                        <input
                                            type="button"
                                            onClick={handleIncreaseQuantity}
                                            className="quantity-btn"
                                            value="+"
                                        />
                                    </div>

                                    {currentSize &&
                                    currentSize.values.find(
                                        (value) => value.type === choiceSize && value.quantity > 0,
                                    ) ? (
                                        <div className="flex items-center">
                                            <button className="mr-[15px] h-[40px] w-half-minus-15 border-[1px] border-black bg-black text-[14px] font-bold text-white hover:bg-white hover:text-black">
                                                Thêm vào giỏ
                                            </button>
                                            <button className=" mr-[15px] h-[40px] w-half-minus-15 border-[1px] border-black bg-white text-[14px] font-bold hover:bg-black hover:text-white">
                                                Mua ngay
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <button className="mr-[15px] h-[40px] w-half-minus-15 border-[1px] border-black bg-black text-[14px] font-bold text-white hover:bg-white hover:text-black">
                                                Hết hàng
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-[10px] grid grid-cols-3 border-b-[1px] border-[#d9d9d9] bg-white">
                                {policies.map((policy) => (
                                    <div
                                        key={policy.title}
                                        className="flex flex-col items-center justify-center py-[15px]"
                                    >
                                        <img className="h-[45px] w-[45px]" src={policy.image} />
                                        <span className="text-center text-[12px]">{policy.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-[30px] rounded-[3px] bg-white p-[15px]">
                        <div>
                            <ul className="mb-[20px] flex items-center border-b-[1px] border-[#e4e7e6] text-[14px] uppercase">
                                {list_description.map((description) => (
                                    <li
                                        className={`${description.id === descriptionId && 'border-t-[3px] border-t-black'} mb-[-1px] mr-[-1px] cursor-pointer border-[1px] border-b-[0px] border-[#e4e7e6] bg-[#f7f7fb] p-[12px_15px_10px] hover:border-t-[3px] hover:border-t-black`}
                                        key={description.title}
                                        onClick={() => setDescriptionId(description.id)}
                                    >
                                        <span>{description.title}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="product-description text-[14px]">
                                {list_description.map((description) => (
                                    <div
                                        className={`${description.id === descriptionId ? 'block' : 'hidden'}`}
                                        key={description.id}
                                    >
                                        {description.desc}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Product;
