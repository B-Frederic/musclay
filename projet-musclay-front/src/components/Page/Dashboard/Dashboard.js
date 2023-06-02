import { Link } from 'react-router-dom';
import {
  Button, Typography, Box, CardActionArea, Alert,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import training from '../../../assets/img/dashboard/training.jpg';
import createTraining from '../../../assets/img/dashboard/create-training.jpg';
import stats from '../../../assets/img/dashboard/stats.jpg';
import monplanning from '../../../assets/img/dashboard/monplanning.jpg';

const StyledCard = styled(Card)`
&:hover {
  transform: scale(1.02);
  backgroundColor: 'none';
  box-shadow: 0px 0px 20px 6px rgba(0,0,0,0.2);
}
`;

const StyledCardDisabled = styled(Card)`
&:hover {
  backgroundColor: none;
}
`;

function CentralPage() {
  const userState = useSelector((state) => state.userReducer);
  return (
    <div className="container">
      {userState.userWithoutAccount && <Alert severity="info" sx={{ my: 1 }}>Vous utilisez l'application sans être connecté</Alert>}
      <Typography component="h2" variant="h2" sx={{ m: 3 }}>Accueil</Typography>
      <Box sx={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', mb: { md: '44px' },
      }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <StyledCard sx={{
            m: 2, maxWidth: '400px',
          }}
          >

            <CardActionArea component={Link} to="/accueil/entrainement/creer">
              <CardMedia
                component="img"
                image={createTraining}
                alt="Musclay"
              />
              <Button size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                Créer un entrainement
              </Button>
            </CardActionArea>
          </StyledCard>
          <StyledCard sx={{
            m: 2, maxWidth: '400px',
          }}
          >
            <CardActionArea component={Link} to="/accueil/entrainement">
              <CardMedia
                component="img"
                image={training}
                alt="Musclay"
              />
              <Button size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                S'entrainer
              </Button>
            </CardActionArea>
          </StyledCard>
        </Box>
        {userState.userWithoutAccount
          ? (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <StyledCardDisabled sx={{
                m: 2, maxWidth: '400px',
              }}
              >

                <CardActionArea disabled={userState.userWithoutAccount} component={Link} to="/accueil/stats">
                  <CardMedia
                    component="img"
                    image={stats}
                    alt="Musclay"
                  />
                  <Button disabled={userState.userWithoutAccount} size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                    Statistiques
                  </Button>
                </CardActionArea>
              </StyledCardDisabled>
              <StyledCardDisabled sx={{
                m: 2, maxWidth: '400px',
              }}
              >
                <CardActionArea disabled={userState.userWithoutAccount} component={Link} to="/accueil/monplanning">
                  <CardMedia
                    component="img"
                    image={monplanning}
                    alt="Musclay"
                  />
                  <Button disabled={userState.userWithoutAccount} size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                    Planning
                  </Button>
                </CardActionArea>
              </StyledCardDisabled>
            </Box>
          )
          : (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <StyledCard sx={{
                m: 2, maxWidth: '400px',
              }}
              >

                <CardActionArea component={Link} to="/accueil/stats">
                  <CardMedia
                    component="img"
                    image={stats}
                    alt="Musclay"
                  />
                  <Button size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                    Statistiques
                  </Button>
                </CardActionArea>
              </StyledCard>
              <StyledCard sx={{
                m: 2, maxWidth: '400px',
              }}
              >
                <CardActionArea component={Link} to="/accueil/monplanning">
                  <CardMedia
                    component="img"
                    image={monplanning}
                    alt="Musclay"
                  />
                  <Button size="small" color="primary" variant="contained" fullWidth sx={{ height: '35px', borderRadius: '0px' }}>
                    Planning
                  </Button>
                </CardActionArea>
              </StyledCard>
            </Box>
          )}
      </Box>
    </div>
  );
}

export default CentralPage;
