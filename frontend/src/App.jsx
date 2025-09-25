import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from '../src/components/ProductDetail'
import Collection from './pages/Collection';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail/>}/>
           <Route path="/collection" element={<Collection/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
