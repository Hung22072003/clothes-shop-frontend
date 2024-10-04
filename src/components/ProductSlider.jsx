import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import rightArrow from '../assets/right-arrow.png';
import leftArrow from '../assets/left-arrow.png';
const ProductSlider = ({
    products,
    bgColor,
    style,
    slidesToShow = 5,
    slidesToScroll = 5,
    responsive = [
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
}) => {
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
        slidesToShow,
        slidesToScroll,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive,
    };
    return (
        <Slider {...settings} className={`${bgColor} ${style}`}>
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </Slider>
    );
};

export default ProductSlider;
