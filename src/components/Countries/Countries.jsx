import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "./addresses.css";


export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCountries = async () => {
        try {
            setLoading(true);
            // const config = {
            //     headers: {
            //         Authorization : `Bearer ${token}`, 
            //     },
            // };

            const res = await axios.get(`http://localhost:5008/api/Countries/GetAllCountries`) //,config);
            debugger
            setCountries(res.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container mt-4 mb-4'>
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-success" onClick={() => navigate('/create-country')}>
                    Add Country
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => {
                        return (
                            <tr key='address.id'>
                                <th scope="row">{country.id}</th>
                                <td>{country.countryName}</td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}