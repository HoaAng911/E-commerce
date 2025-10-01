import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from '../src/components/ProductDetail';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import AuthForm from './components/AuthForm';
import useUserStore from './store/useUserStore';
import UserProfile from './pages/UserProfile';
import CheckoutForm from './pages/CheckoutForm';
import OrderList from './pages/OrderList';
import MomoReturn from './pages/MomoReturn';
import MyOrders from './pages/MyOrder';
function App() {
 const { user } = useUserStore()
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/orderlist" element={<OrderList />} />
           <Route path="/momo-return" element={<MomoReturn />} />
           <Route path="/my-order" element={<MyOrders />} />
          {/* Route có điều kiện */}
          <Route
            path="/profile"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
