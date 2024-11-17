import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "./addresses.css";


export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            setLoading(true);
            // const config = {
            //     headers: {
            //         Authorization : `Bearer ${token}`, 
            //     },
            // };

            const res = await axios.get(`http://localhost:5008/api/Category/GetAllCategories`) //,config);
            debugger
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container mt-4 mb-4'>
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-success" onClick={() => navigate('/create-category')}>
                    Add Category
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
                    {categories.map((category) => {
                        return (
                            <tr key='address.id'>
                                <th scope="row">{category.id}</th>
                                <td>{category.categoryName}</td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}