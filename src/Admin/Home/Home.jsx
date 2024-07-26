import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => {
  const images = [
    "https://images.pexels.com/photos/6625941/pexels-photo-6625941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5370704/pexels-photo-5370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8398840/pexels-photo-8398840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5370658/pexels-photo-5370658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const jewelryItems = [
    "Ring",
    "Necklace",
    "Pendant",
    "Earring",
    "Bracelet",
    "Charm",
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 0,
        m: 0,
      }}
    >
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ width: '100%' }}>
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img
                src={image}
                className="d-block w-100"
                alt={`Slide ${index}`}
                style={{
                  border: '3px solid green',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
              {index === 0 && (
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    zIndex: 1,
                    opacity: 0.8,
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <strong>Welcome to Our Jewelry Store</strong>
                </Typography>
              )}
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Box sx={{ mt: 4 }}>
        {jewelryItems.map((item, idx) => (
          <Button
            key={idx}
            variant="contained"
            color="primary"
            sx={{
              m: 1,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#4CAF50',
              }
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
