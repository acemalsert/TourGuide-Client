import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapComponent from '../Map/Map';
import '../Map/map.css';
import './DestinationDetail.css';
import StripeCheckoutButton from '../StripeCheckoutButton/StripeCheckoutButton';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let product =  {
    ProductName: "Tour Ticket",
    Quantity: 1,
    Amount: 10, 
    Currency: "usd",
  };

  const fetchDestination = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Destination/GetDestinationById/${id}`);
      setDestination(res.data);
      setLoading(false);

     

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!destination) return <p>No destination found</p>;

  const imageSrc = destination.imageData
    ? `data:image/jpeg;base64,${destination.imageData}`
    : 'default_image_url.jpg';

  return (
    <div className="container mt-5 destination-detail">
      <div className="card">
        <div className="card-header text-center">
          <h2>{destination.name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img 
                src={imageSrc} 
                alt={destination.name} 
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h4>Description</h4>
              <p>{destination.description}</p>
              <h5 className="mt-3">Opening Hours</h5>
              <p>
                {`From ${new Date(destination.openingTime).toLocaleTimeString()} to ${new Date(destination.closingTime).toLocaleTimeString()}`}
              </p>
              <h5 className="mt-3">Ticket Price</h5>
              <p>{`$${destination.ticketPrice}`}</p>
              {/* <button className="btn btn-primary mt-3">Book Now</button> */}
              
              <StripeCheckoutButton product={product} />
            </div>
          </div>
        </div>
      </div>

      <MapComponent lat={destination.latitude} lon={destination.longitude} />
    </div>
  );
};

export default DestinationDetail;
