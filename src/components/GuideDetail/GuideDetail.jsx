import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGuide = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Auth/GetGuidesById/${id}`);
      setGuide(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuide();
  }, [id]);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!guide) return <p>No guide found</p>;

  return (
   <div>
    {guide.fullName}
    {guide.description}
   </div>
  );
};

export default GuideDetail;
