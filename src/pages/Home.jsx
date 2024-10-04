import React from 'react';
import CarouselSlider from '../components/CarouselSlider';
import slider_1 from '../assets/slides/slide_1.webp';
import slider_2 from '../assets/slides/slide_2.webp';
import slider_3 from '../assets/slides/slide_3.webp';
import category_item_1 from '../data/category_item_1';
import category_item_2 from '../data/category_item_2';
import category_item_3 from '../data/category_item_3';
import category_item_4 from '../data/category_item_4';
import Hero from '../components/Hero';
import list_category from '../data/list_category';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import GroupCollection from '../components/GroupCollection';
import Combo from '../components/Combo';
import Coupon from '../components/Coupon';
import Coupons from '../components/Coupons';
import NewProductCollection from '../components/NewProductCollection';
const slides = [slider_1, slider_2, slider_3];
const Home = () => {
    return (
        <div className="pt-[15px]">
            <CarouselSlider autoSlide={true}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} />
                ))}
            </CarouselSlider>

            <div className=" space-y-8 px-[14px] md:mx-[-14px]">
                <h1 className="my-8  border-l-[3px] border-[#000000] py-1 pl-2 text-[18px] font-bold uppercase text-black">
                    Ưu đãi dành cho bạn
                </h1>

                <Coupons />
                <Hero id_category={20} bgColor={'bg-[#E0E0E0]'} style={' rounded-[10px] p-[15px]'} />

                <NewProductCollection id_category={1} />

                <Hero id_category={4} />

                <Hero id_category={22} bgColor={'bg-[#E0E0E0]'} style={' rounded-[10px] p-[15px]'} />

                <GroupCollection />
                <Combo />
            </div>
        </div>
    );
};

export default Home;
