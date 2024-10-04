import React, { useEffect, useState, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

const ImageProductSlider = ({ images, autoSlide = false, autoSlideInterval = 3000, currentImage }) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        setCurrent(currentImage);
    }, [currentImage]);
    const prev = () => setCurrent((current) => (current === 0 ? images.length - 1 : current - 1));
    const next = () => setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, []);
    return (
        <div className="overflow-hidden">
            <div className="relative overflow-hidden">
                <div className=" flex " style={{ transform: `translateX(-${current * 100}%)` }}>
                    {images.map((image, index) => (
                        <img
                            className={`${index === current ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-linear`}
                            key={index}
                            src={image}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between text-white">
                    <button className="h-[35px] w-[35px] rounded-full bg-white" onClick={prev}>
                        <ChevronLeft size={35} className="text-black" />
                    </button>
                    <button className="h-[35px] w-[35px] rounded-full bg-white" onClick={next}>
                        <ChevronRight size={35} className="text-black" />
                    </button>
                </div>
            </div>

            <div
                className="mx-[-5px] mt-[10px] w-[990px] overflow-hidden transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current <= images.length - 6 && current * 10}%)` }}
            >
                {images.map((image, index) => (
                    <div onClick={() => setCurrent(index)} className="float-left w-[99px] px-[5px]" key={index}>
                        <img className={`${index === current && 'border-[1px] border-[#000]'} w-full`} src={image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(ImageProductSlider);
