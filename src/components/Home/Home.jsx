import React from 'react';
import Slider from 'react-slick';
import './Home.css'; // Stil dosyasını dışarıya taşıyabilirsiniz.

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="home-container container mt-4">

            <div className="hero">
                <h1>Explore the World with Us</h1>
                <p>Discover the best destinations, hidden gems, and travel tips. Start your adventure now!</p>
            </div>

            <Slider {...settings}>
                <div className="slider-item">
                    <img src="https://cdnp.flypgs.com/files/Sehirler-long-tail/Ankara/ankara-gezilecek-yerler-anitkabir.jpg" alt="Destinasyon 1" />
                    <div className="slider-text">
                        <h2>Welcome to the Ultimate Travel Guide</h2>
                        <p>Discover beautiful places and unique adventures around the world.</p>
                        <button className="explore-button">Explore Now</button>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu7kr5Kv1ZJw1tOnW8ktxdYvf6bgFwjnw6Jw&s" alt="Destinasyon 2" />
                    <div className="slider-text">
                        <h2>Unforgettable Experiences Await</h2>
                        <p>Join us for an unforgettable experience in the most amazing locations.</p>
                        <button className="explore-button">Explore Now</button>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="https://img.traveltriangle.com/blog/wp-content/uploads/2020/03/Places-To-Visit-In-Turkey-_7th-jun.jpg" alt="Destinasyon 3" />
                    <div className="slider-text">
                        <h2>Adventure Awaits You</h2>
                        <p>Let’s embark on new adventures and explore the unseen.</p>
                        <button className="explore-button">Explore Now</button>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Home;
