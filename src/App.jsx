import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import MapComponent from './components/Map/Map.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register';
import Destinations from './components/Destinations/Destinations';
import About from './components/About/About';
import Panorama from './components/Panorama/Panorama';
import DestinationDetail from './components/DestinationDetail/DestinationDetail.jsx';

function App() {
  const panoramaImage = 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/panoramaTest" element={<Panorama image={panoramaImage} />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
