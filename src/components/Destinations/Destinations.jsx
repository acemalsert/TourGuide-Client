import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook'u

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Destination/GetAllDestinations`);
      setDestinations(res.data);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setError(error.message); // Hata varsa kaydet
      setLoading(false); // Yükleme tamamlandı
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []); // Component mount olduğunda bir kez çalışır

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Butona tıklandığında detay sayfasına git
  const goToDetails = (id) => {
    navigate(`/destinations/${id}`);
  };

  return (
    <div>
      <h2>Destinations</h2>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            {/* Detay sayfasına gitmek için buton */}
            <button onClick={() => goToDetails(destination.id)}>Go to Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
