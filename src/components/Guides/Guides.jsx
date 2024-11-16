import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './guides.css';

const GuidesComponent = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`http://localhost:5008/api/Auth/GetAllGuides`, config);
            setGuides(res.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuides();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const goToDetails = (id) => {
        navigate(`/guides/${id}`);
    };

    return (
        <div className="guides">
            <div className='row mt-4 justify-content-center'>
                {guides.map((guide) => (
                    <div className="card" style={{ width: '18rem', margin: '10px', padding:'0px' }} key={guide.id}>
                        <img className="card-img-top" src="https://i.dr.com.tr/pimages/Content/Uploads/ArtistImages/artist__260259.jpg" alt="Guide" />
                        <div className="card-body">
                            <h5 className="card-title">{guide.fullName}</h5>
                            <p className="card-text"> {guide.description}</p>
                            <button className="btn btn-primary" onClick={() => goToDetails(guide.id)}>
                                Go to Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuidesComponent;