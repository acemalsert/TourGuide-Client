import React, { useState } from 'react';
import axios from 'axios';

function CreateAddress() {
    const [formData, setFormData] = useState({
        streetNo: '',
        addressLine1: '',
        addressLine2: '',
        cityName: '',
        regionName: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        countryId: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5008/api/Address/CreateAddress', formData); 
            setResponseMessage('Address created successfully!');
            console.log('API Response:', response.data);
        } catch (error) {
            setResponseMessage('Failed to create address. Please try again.');
            console.error('API Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Create Address</h1>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="streetNo" className="form-label">
                            Street No
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="streetNo"
                            name="streetNo"
                            value={formData.streetNo}
                            onChange={handleChange}
                            placeholder="Enter street number"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="addressLine1" className="form-label">
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="Enter address line 1"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="addressLine2" className="form-label">
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="Enter address line 2"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cityName" className="form-label">
                            City
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cityName"
                            name="cityName"
                            value={formData.cityName}
                            onChange={handleChange}
                            placeholder="Enter city name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="regionName" className="form-label">
                            Region
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="regionName"
                            name="regionName"
                            value={formData.regionName}
                            onChange={handleChange}
                            placeholder="Enter region name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postalCode" className="form-label">
                            Postal Code
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Enter postal code"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="latitude" className="form-label">
                            Latitude
                        </label>
                        <input
                            type="number"
                            step="0.000001"
                            className="form-control"
                            id="latitude"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            placeholder="Enter latitude"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="longitude" className="form-label">
                            Longitude
                        </label>
                        <input
                            type="number"
                            step="0.000001"
                            className="form-control"
                            id="longitude"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            placeholder="Enter longitude"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="countryId" className="form-label">
                            Country ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="countryId"
                            name="countryId"
                            value={formData.countryId}
                            onChange={handleChange}
                            placeholder="Enter country ID"
                            required
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary px-5">
                        Submit
                    </button>
                </div>
                {responseMessage && (
                    <div className="mt-3 alert alert-info text-center">
                        {responseMessage}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreateAddress;