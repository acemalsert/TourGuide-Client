import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./destinations.css"

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Destination/GetAllDestinations`);
      setDestinations(res.data);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setError(error.message); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []); // Component mount olduğunda bir kez çalışır

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const goToDetails = (id) => {
    navigate(`/destinations/${id}`);
  };

  //TODO : Bir arama cubugu eklenmeli

  return (
    <div className="destinations">
      <h2>Destinations</h2>
      <div className="row">
        {destinations.map((destination) => (
          <div className="card" style={{ width: '18rem', margin: '10px' }} key={destination.id}>
            <img className="card-img-top" src="https://www.bizevdeyokuz.com/wp-content/uploads/agra-tac-mahal.jpg" alt="Destination Image" /> {/* Burada destination'a ait bir image url eklemelisin */}
            <div className="card-body">
              <h5 className="card-title">{destination.name}</h5>
              <p className="card-text">
                {destination.description}
              </p>
              <button className="btn btn-primary" onClick={() => goToDetails(destination.id)}>
                Go to Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
