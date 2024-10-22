import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    profileImage: null,
    address: '',
    name: '',
    description: '',
    email: '',
    phone: '', 
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const fetchUser = async () => {
    try {
      const id = localStorage.getItem('userId');
      const res = await axios.get(`http://localhost:5008/api/Auth/GetUserById/${id}`);
      setUser(res.data);
      setLoading(false);
      
      setFormData({
        id: res.data.id || '',
        address: res.data.address || '',
        name: res.data.fullName || '',
        description: res.data.description || '',
        email: res.data.email || '',
        phone: res.data.phone || '',  
        profileImage: null,  
      });

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h3>User Profile</h3>
      <Form onSubmit={handleSubmit}>
        {/* ID Field */}
        <Form.Group controlId="formId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter Id"
            readOnly
          />
        </Form.Group>

        {/* Profile Image Field */}
        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>

        {/* Address Field */}
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Address"
            required
          />
        </Form.Group>

        {/* Name Field */}
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
            required
          />
        </Form.Group>

        {/* Phone Field */}
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
            required
          />
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Description"
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}