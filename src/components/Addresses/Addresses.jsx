import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./addresses.css";


export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            // const config = {
            //     headers: {
            //         Authorization : `Bearer ${token}`, 
            //     },
            // };

            const res = await axios.get(`http://localhost:5008/api/Address/GetAllAddresses`) //,config);
            debugger
            setAddresses(res.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container mt-4 mb-4'>
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-success" onClick={() => navigate('/create-address')}>
                    Add Address
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Street No</th>
                        <th scope="col">Address Line 1</th>
                        <th scope="col">Address Line 2</th>
                        <th scope="col">City Name</th>
                        <th scope="col">Postal Code</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col"> Edit </th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address) => {
                        return (
                            <tr key='address.id'>
                                <th scope="row">{address.id}</th>
                                <td>{address.streetNo}</td>
                                <td>{address.addressLine1}</td>
                                <td>{address.addressLine2}</td>
                                <td>{address.cityName}</td>
                                <td>{address.postalCode}</td>
                                <td>{address.latitude}</td>
                                <td>{address.longitude}</td>
                                <td></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}