import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Collection from './pages/Collection';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Search from './pages/Search';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './fontawesome.js';
import { useState, useRef, useEffect } from 'react';
function App() {
    const [cartVisible, setCartVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [numberOfCarts, setNumberOfCarts] = useState(0);
    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('carts')) ?? [];
        setNumberOfCarts(carts.reduce((sum, item) => sum + item.quantity, 0));
    }, []);
    return (
        <div className="bg-[#f5f5f5]">
            <Header
                cartVisible={cartVisible}
                setCartVisible={setCartVisible}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                numberOfCarts={numberOfCarts}
                setNumberOfCarts={setNumberOfCarts}
            />
            <Navbar />
            <div className="z-0 mx-auto mt-[76px] md:px-[15px] lg:mt-[126px] lg:max-w-[1200px]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collections/:collectionId" element={<Collection />} />
                    <Route
                        path="/cart"
                        element={<Cart numberOfCarts={numberOfCarts} setNumberOfCarts={setNumberOfCarts} />}
                    />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products/:productId" element={<Product setNumberOfCarts={setNumberOfCarts} />} />
                    <Route path="/place-order" element={<PlaceOrder />} />
                </Routes>
            </div>
            <div
                className={`${cartVisible || searchVisible ? 'visible' : 'hidden'} fixed bottom-0 left-0 right-0 top-0 z-[500]  w-[100%] bg-black opacity-[0.5]`}
                onClick={() => {
                    setCartVisible(false);
                    setSearchVisible(false);
                }}
            ></div>
            <Footer />
        </div>
    );
}

export default App;
