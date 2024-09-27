import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this destination?');
    if (!confirmed) return; 

    try {
      await axios.post(`http://localhost:5008/api/Destination/DeleteDestination`, { id });
      alert('Destination deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting destination');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5008/api/Destination/UpdateDestination`, {
        id: destination.id,
        name: destination.name,
        description: destination.description,
      });
      setIsEditing(false);
      alert('Destination updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating destination');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!destination) return <p>No destination found</p>;

  return (
    <div>
      <h2>{isEditing ? 'Edit Destination' : destination.name}</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={isEditing ? destination.name : destination.name}
            onChange={(e) => setDestination({ ...destination, name: e.target.value })}
            readOnly={!isEditing}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={isEditing ? destination.description : destination.description}
            onChange={(e) => setDestination({ ...destination, description: e.target.value })}
            readOnly={!isEditing}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={isEditing ? destination.latitude : destination.latitude}
            onChange={(e) => setDestination({ ...destination, latitude: parseFloat(e.target.value) })}
            readOnly={!isEditing}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={isEditing ? destination.longitude : destination.longitude}
            onChange={(e) => setDestination({ ...destination, longitude: parseFloat(e.target.value) })}
            readOnly={!isEditing}
            required
          />
        </div>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button type="submit">Update</button>}
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DestinationDetail;
