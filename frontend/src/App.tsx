import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import BuyersPage from './pages/BuyersPage';
import OrdersPage from './pages/OrdersPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/cars" />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/buyers" element={<BuyersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;