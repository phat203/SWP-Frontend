import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const HomePage = () => {
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
    "Shake",
    "Ring",
    "Charm",
    "Necklace",
    "Bracket"
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
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ width: '103.8%' }}>
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
                  transition: 'transform 0.3s ease-in-out'
                }}
              />
              <Typography
                variant="h2"
                gutterBottom
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'White', // #0040AEChanged text color to green
                  zIndex: 1,
                  opacity: 0.8,
                  padding: '10px',
                  borderRadius: '5px',
                  transition: 'opacity 18s ease-in-out',
                  '&:hover': {
                    opacity: 1,
                  },
                  animation: 'typing 18s steps(10, end) infinite' // Added animation directly to Typography
                }}
              >
                <strong>Welcome to Our Jewelry Store</strong>
              </Typography>
              <Box sx={{ mt: 2 }}>
                {jewelryItems.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="contained"
                    color="primary"
                    className="circular-button"
                    sx={{
                      m: 1,
                      fontWeight: 'bold',
                      animation: 'moveInOut 6s infinite', // Changed animation to moveInOut
                      '&:hover': {
                        backgroundColor: '#4CAF50',
                      }
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
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

      <style>
        {`
        @keyframes typing {
          0% {
            width: 0;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0;
          }
        }

        @keyframes moveInOut {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        `}
      </style>
    </Container>
  );
};

export default HomePage;
