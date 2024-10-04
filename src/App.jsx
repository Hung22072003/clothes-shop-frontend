import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Collection from './pages/Collection';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './fontawesome.js';
function App() {
    return (
        <div className="bg-[#f5f5f5]">
            <Header />
            <Navbar />
            <div className="z-0 mx-auto mt-[76px] md:px-[15px] lg:mt-[126px] lg:max-w-[1200px]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collections/:collectionId" element={<Collection />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products/:productId" element={<Product />} />
                    <Route path="/place-order" element={<PlaceOrder />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
