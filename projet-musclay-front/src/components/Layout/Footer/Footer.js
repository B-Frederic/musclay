import {
  AppBar, Box, IconButton, ListItem, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  const footerTitle = [
    {
      name: 'FAQ',
      link: '/faq',
    },
    {
      name: 'Contact',
      link: '/contact',
    },
    {
      name: 'À propos',
      link: '/apropos',
    },
  ];
  return (
    <AppBar
      component="footer"
      sx={{
        display: { xs: 'none', md: 'flex', zIndex: '100' }, flexDirection: 'row', justifyContent: 'space-between', width: '100vw', justifySelf: 'flex-end',
      }}
      position="static"
    >
      <ListItem sx={{ width: '200px' }}>
        <IconButton sx={{ color: 'white' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <InstagramIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <TwitterIcon />
        </IconButton>
      </ListItem>
      <Box sx={{
        display: 'flex ', justifyContent: 'center', alignItems: 'center', gap: 2,
      }}
      >
        {footerTitle.map((footer) => (
          <Typography
            color="white"
            component={Link}
            key={footer.name}
            style={{
              textDecoration: 'none',
            }}
            to={footer.link}
            variant="body1"
          >
            {footer.name}
          </Typography>
        ))}
      </Box>
      <Box sx={{ width: '200px' }} />
    </AppBar>
  );
}

export default Footer;
