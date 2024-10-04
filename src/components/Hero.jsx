import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import rightArrow from '../assets/right-arrow.png';
import leftArrow from '../assets/left-arrow.png';
import Button from './Button';
import ProductSlider from './ProductSlider';
import { getCategoryById } from '../api/services/CategoryService';
import { getProductByCategory } from '../api/services/ProductService';
const Hero = ({ id_category, bgColor, style }) => {
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [id_category]);

    const fetchCategory = async () => {
        const response = await getCategoryById(id_category);
        // console.log(response);
        if (response.status == 200) {
            setCategory(response.data.result);
        }
    };

    const fetchProducts = async () => {
        const response = await getProductByCategory(id_category);
        // console.log(response.data);
        if (response.status == 200) {
            setProducts(response.data.result);
        }
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    backgroundImage: `url(${rightArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '25px',
                    height: '25px',
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    backgroundImage: `url(${leftArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '25px',
                    height: '25px',
                }}
                onClick={onClick}
            />
        );
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 764,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };
    return (
        <div className={`${bgColor} ${style}`}>
            {category && (
                <>
                    {category.theme != null ? (
                        <img src={category.theme} />
                    ) : (
                        <div className="mb-[10px] flex h-[45px] items-center">
                            <h2 className="text-[18px] font-bold uppercase">
                                <span className="flex">
                                    <img
                                        className="mr-[5px]"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        src="https://file.hstatic.net/1000253775/file/flash_c1195bb7597344909c3a855990d45510.png"
                                        alt="FLASH SALE"
                                    />
                                    FLASH SALE
                                </span>
                            </h2>
                        </div>
                    )}
                    <div className={`${bgColor} mt-[15px]`}>
                        <ProductSlider products={products} />

                        <div className="mt-[10px]">
                            <Button idCategory={category.id} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Hero;
