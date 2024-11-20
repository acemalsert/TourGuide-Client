import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import MapComponent from './components/Map/Map.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register';
import Destinations from './components/Destinations/Destinations.jsx';
import Panorama from './components/Panorama/Panorama';
import DestinationDetail from './components/DestinationDetail/DestinationDetail.jsx';
import Guides from './components/Guides/Guides.jsx';
import GuideDetail from './components/GuideDetail/GuideDetail.jsx';
import Profile from './components/Profile/Profile.jsx';
import CreateDestination from './components/CreateDestination/CreateDestination.jsx';
import Addresses from './components/Addresses/Addresses.jsx';
import Home from './components/Home/Home.jsx';
import CreateAddress from  './components/CreateAddress/CreateAddress.jsx';
import Categories from './components/Categories/Categories.jsx';
import Countries from './components/Countries/Countries.jsx';
import CreateCountry from './components/CreateCountry/CreateCountry.jsx';
import Success from './pages/PaymentSuccess/PaymentSuccess.jsx';
import Cancel from './pages/PaymentFail/PaymentCancel.jsx';

// Layout bileşeni: Navbar'ı ve Footer'ı konum bazlı gösterir
const Layout = ({ children }) => {
  const location = useLocation();
  const showLayout = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/create-destination" element={<CreateDestination />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/panoramaTest" element={<Panorama />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresses" element={<Addresses/>}></Route>
          <Route path="/create-address" element={<CreateAddress />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/create-country" element={<CreateCountry />} />
          <Route path="/success" element={<Success/>}></Route>
          <Route path="/cancel" element={<Cancel/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
