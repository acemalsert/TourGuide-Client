import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGuide = async () => {
    try {
      const res = await axios.get(`http://localhost:5008/api/Auth/GetGuideById/${id}`);
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

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div className="spinner" style={{ fontSize: "20px", color: "#333" }}>
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>Error: {error}</p>
      </div>
    );

  if (!guide)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No guide found</p>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{guide.fullName}</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={guide.profilePicture || "https://i.dr.com.tr/pimages/Content/Uploads/ArtistImages/artist__260259.jpg"}
          alt={`${guide.fullName}'s profile`}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <div>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
            <strong>Description:</strong> {guide.description}
          </p>
          <p style={{ fontSize: "16px", color: "#555" }}>
            <strong>Expertise:</strong> {guide.expertise || "Not provided"}
          </p>
          <p style={{ fontSize: "16px", color: "#555" }}>
            <strong>Contact:</strong> {guide.contact || "Not provided"}
          </p>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: "20px", color: "#333", marginBottom: "10px" }}>About the Guide</h2>
        <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
          {guide.bio || "No bio available for this guide."}
        </p>
      </div>
    </div>
  );
};

export default GuideDetail;
