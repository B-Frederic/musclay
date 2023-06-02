import {
  Typography, IconButton, Box, Card, CardContent, CardMedia, CardActions,
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Buymeacoffee from '../../UI/Logo/Buymeacoffee';
import yusuf from '../../../assets/img/photo/Yusuf-Demiryurek.jpg';
import yassine from '../../../assets/img/photo/Yassine-Ayoub.jpg';
import frederic from '../../../assets/img/photo/Frédéric-Betaouaf.jpeg';
import siaka from '../../../assets/img/photo/Siaka-Andhum.jpg';

const Team = [
  {
    name: 'Yassine Ayoub',
    title: 'Product Owner et développeur full stack',
    img: yassine,
    github: 'https://github.com/yassineayoub',
    linkedin: 'https://www.linkedin.com/in/yassineayoub/',
  },
  {
    name: 'Yusuf Demiryurek',
    title: 'Lead tech et développeur full stack',
    img: yusuf,
    github: 'https://github.com/Yusuf-Demiryurek',
    linkedin: 'https://www.linkedin.com/in/yusufde/',
  },

  {
    name: 'Frédéric Betaouaf',
    title: 'Scrum Master et développeur full stack',
    img: frederic,
    github: 'https://github.com/B-Frederic',
    linkedin: 'https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-betaouaf-615120244/',
  },
  {
    name: 'Siaka Andhum',
    title: 'Git master et développeur full stack',
    img: siaka,
    github: 'https://github.com/ASiaka',
    linkedin: 'https://www.linkedin.com/in/siakaandhum/',
  },
];

const StyledCard = styled(Card)`
  ${({ theme }) => `
  // cursor: pointer;
  transition: ${theme.transitions.create(['transform'], {
    duration: 400,
  })};
  &:hover {
    transform: scale(1.04);
  }
  `}
`;

function About() {
  return (
    <div className="container">
      <Typography component="h2" variant="h2" sx={{ mt: 3 }}>L'Equipe Musclay</Typography>
      <Box sx={{ my: 2 }}>
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'center', alignItems: 'center', my: 4,
        }}
        >
          {Team.map((mate) => (
            <StyledCard sx={{ maxWidth: 350, m: 2 }} key={mate.name}>
              <CardMedia
                component="img"
                height="350px"
                image={mate.img}
                alt={mate.name}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {mate.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mate.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center', py: 0 }}>
                <IconButton target="_blank" href={mate.linkedin} color="primary" size="large">
                  <LinkedInIcon />
                </IconButton>
                <IconButton target="_blank" href={mate.github} color="primary" size="large">
                  <GitHubIcon />
                </IconButton>
              </CardActions>
            </StyledCard>
          ))}
        </Box>
        <IconButton target="_blank" href="https://www.buymeacoffee.com/muscleyywebU" style={{ backgroundColor: 'transparent', m: 2 }}>
          <Buymeacoffee />
          <Typography variant="body1">&nbsp;Pour soutenir l'équipe, achetez nous des cafés 🤗</Typography>
        </IconButton>
      </Box>
    </div>
  );
}

export default About;
