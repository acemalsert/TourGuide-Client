import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CreateDestination = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    openingTime: '', // datetime-local için
    closingTime: '', // datetime-local için
    ticketPrice: 0,
    imageData: '',
    categoryId: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageData: reader.result.split(',')[1] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name: formData.name,
      description: formData.description,
      openingTime: new Date(formData.openingTime).toISOString(), 
      closingTime: new Date(formData.closingTime).toISOString(), 
      ticketPrice: formData.ticketPrice,
      imageData: formData.imageData,
      categoryId: formData.categoryId
    };

    try {
      await axios.post('http://localhost:5008/api/Destination/CreateDestination', requestData);
      alert('Destination created successfully!');
    } catch (error) {
      console.error('Error creating destination:', error);
      alert('Failed to create destination. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Create Destination</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="openingTime">
              <Form.Label>Opening Time</Form.Label>
              <Form.Control
                type="datetime-local" 
                name="openingTime"
                value={formData.openingTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="closingTime">
              <Form.Label>Closing Time</Form.Label>
              <Form.Control
                type="datetime-local" 
                name="closingTime"
                value={formData.closingTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="ticketPrice">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="categoryId">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="number"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="imageUpload">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                name="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Destination
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDestination;
