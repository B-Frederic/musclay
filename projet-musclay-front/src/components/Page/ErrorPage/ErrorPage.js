import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Logo from '../../UI/Logo/Logo';
import './ErrorPage.css';

function ErrorPage() {
  useEffect(() => {
    setTimeout(() => window.location.href = 'https://musclay.web.app/accueil', 7500);
  }, []);

  return (
    <div className="container">
      <Box className="cube">
        <Box className="side" id="one">
          {/* Cube Big */}
          <Typography
            sx={{
              textAlign: 'center', mt: { md: '80px', xs: '25px' }, mb: { md: '20px', xs: '20px' }, fontSize: { md: '4rem', xs: '2rem' },
            }}
            variant="h1"
          >
            <Box className="animation--crack">
              <span> 404 NOT FOUND </span>
              <span> 404 NOT FOUND </span>
              <span> 404 NOT FOUND </span>
            </Box>
          </Typography>
        </Box>
        <Box className="side" id="two">
          <Typography
            sx={{ textAlign: 'center', mt: { md: '90px', xs: '25px' }, mb: { md: '20px', xs: '20px' } }}
            variant="h3"
          >
            Ne vous inquiétez pas
          </Typography>
        </Box>
        <Box className="side" id="three">
          <Typography
            sx={{ textAlign: 'center', mt: { md: '80px', sm: '10px', xs: '25px' }, mb: { md: '20px', xs: '20px' } }}
            variant="h3"
          >
            On vous redirige sur l'accueil
          </Typography>
        </Box>
        <Box className="side" id="for">
          <Typography
            sx={{ textAlign: 'center', mt: { md: '50px', sm: '0px', xs: '15px' }, mb: { md: '20px', xs: '10px' } }}
            variant="h3"
          >
            De votre site favori
          </Typography>
          <Box sx={{
            width: { md: '250px', sm: '120px', xs: '120px' }, height: { md: '100px', sm: '30px', xs: '70px' }, m: { md: 'auto', xs: 'auto' }, mt: { md: '10px', sm: '-8px', xs: '5px' },
          }}
          >
            <Logo />
          </Box>
        </Box>
        {/* Cube Small */}
        <Box className="cube--small">
          <Box className="side--small" id="five">
            <Typography
              sx={{ fontSize: { md: '4rem', xs: '2rem' } }}
              variant="h1"
            >
              <Box sx={{
                width: { md: '180px', xs: '80px' }, height: { md: '80px', xs: '50px' }, m: { md: 'auto', xs: 'auto' }, mt: { md: '10px', xs: '5px' },
              }}
              >
                <Logo />
              </Box>
            </Typography>
          </Box>
          <Box className="side--small" id="six">
            <Typography
              sx={{ fontSize: { md: '4rem', xs: '2rem' } }}
              variant="h1"
            >
              <Box sx={{
                width: { md: '180px', xs: '80px' }, height: { md: '80px', xs: '50px' }, m: { md: 'auto', xs: 'auto' }, mt: { md: '10px', xs: '5px' },
              }}
              >
                <Logo />
              </Box>
            </Typography>
          </Box>
          <Box className="side--small" id="seven">
            <Typography
              sx={{ fontSize: { md: '4rem', xs: '2rem' } }}
              variant="h1"
            >
              <Box sx={{
                width: { md: '180px', xs: '80px' }, height: { md: '80px', xs: '50px' }, m: { md: 'auto', xs: 'auto' }, mt: { md: '10px', xs: '5px' },
              }}
              >
                <Logo />
              </Box>
            </Typography>
          </Box>
          <Box className="side--small" id="eight">
            <Typography
              sx={{ fontSize: { md: '4rem', xs: '2rem' } }}
              variant="h1"
            >
              <Box sx={{
                width: { md: '180px', xs: '80px' }, height: { md: '80px', xs: '50px' }, m: { md: 'auto', xs: 'auto' }, mt: { md: '10px', xs: '5px' },
              }}
              >
                <Logo />
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
