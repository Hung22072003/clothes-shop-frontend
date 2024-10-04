import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
const CarouselSlider = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, []);
    return (
        <div className="group relative overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 hidden items-center justify-between p-4 text-white group-hover:flex">
                <button onClick={prev}>
                    <ChevronLeft size={40} />
                </button>
                <button onClick={next}>
                    <ChevronRight size={40} t />
                </button>
            </div>

            <div className="w- absolute bottom-2 left-0 right-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 cursor-pointer rounded-full border-[1px] border-[#000000] ${current === index ? 'bg-black' : 'bg-transparent'}`}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselSlider;
