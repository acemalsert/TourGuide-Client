import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchDestinations = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
  
      const res = await axios.get(`http://localhost:5008/api/Destination/GetAllDestinations`, config);

      setDestinations(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const goToDetails = (id) => {
    navigate(`/destinations/${id}`);
  };

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="destinations justify-content-center mb-4">

      <div className='input-group justify-content-center'>
        <div className="form-outline" data-mdb-input-init>
          <input
            type="search"
            id="form1"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input form-control"
          />
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        {filteredDestinations.map((destination) => {
          // Base64 stringini kontrol et ve URL formatına dönüştür
          const imageSrc = destination.imageData ? `data:image/jpeg;base64,${destination.imageData}` : 'default_image_url.jpg';

          return (
            <div className="card" style={{ width: '18rem', margin: '10px', padding:'0px' }} key={destination.id}>
              <img className="card-img-top" src={imageSrc} alt={destination.name} />
              <div className="card-body">
                <h5 className="card-title">{destination.name}</h5>
                <p className="card-text">{destination.description}</p>
                <button className="btn btn-primary" onClick={() => goToDetails(destination.id)}>
                  Go to Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Destinations;