import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import './DestinationDetail.css';
import MapComponent from '../Map/Map';
import "../Map/map.css";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestination = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Destination/GetDestinationById/${id}`);
      setDestination(res.data);
      debugger
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

  const imageSrc = destination.imageData ? `data:image/jpeg;base64,${destination.imageData}` : 'default_image_url.jpg';

  return (
    <Container className="mt-5 destination-detail">
      <Card>
        <Card.Header className="text-center">
          <h2>{destination.name}</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Image 
                src={imageSrc} 
                alt={destination.name} 
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h4>Description</h4>
              <p>{destination.description}</p>
              <h5 className="mt-3">Opening Hours</h5>
              <p>
                {`From ${new Date(destination.openingTime).toLocaleTimeString()} to ${new Date(destination.closingTime).toLocaleTimeString()}`}
              </p>
              <h5 className="mt-3">Ticket Price</h5>
              <p>{`$${destination.ticketPrice}`}</p>
              <Button variant="primary" className="mt-3">Book Now</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <MapComponent lat={destination.latitude} lon={destination.longitude}/>
    </Container>
  );
};

export default DestinationDetail;