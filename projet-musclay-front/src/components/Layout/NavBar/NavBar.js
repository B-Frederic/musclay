import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {
  AppBar, Button, MenuItem, Drawer, List, ListItem, Divider,
  ListItemButton, FormControlLabel,
  Box, Typography, IconButton, Menu, Avatar, Icon,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { blue } from '@mui/material/colors';
import ThemeSwitch from '../../UI/ThemeSwitch/ThemeSwitch';
import { userLogout, setUserTheme } from '../../../actions/user';
import Logo from '../../UI/Logo/Logo';

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  // SideBar State
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // eslint-disable-next-line no-shadow
  const { isLogged, user, darkTheme } = useSelector((state) => state.userReducer);

  const location = useLocation();
  const dispatch = useDispatch();

  const handleTheme = (check) => {
    dispatch(setUserTheme(check));
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const navMenuTitle = [
    {
      name: 'Accueil',
      link: '/accueil',
    },
    {
      name: 'Profil',
      link: '/profil',
    },
    {
      name: 'Entraînements',
      link: '/accueil/entrainement',
    },
    {
      name: 'Planning',
      link: '/accueil/monplanning',
    },
    {
      name: 'Statistiques',
      link: '/accueil/stats',
    },
  ];
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

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleLogin = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Side Bar Menu

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const listMenuLink = (anchor) => (
    <List>
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          checked={darkTheme}
          onChange={(e) => handleTheme(e.target.checked)}
          control={<ThemeSwitch sx={{ m: 1 }} />}
        />
        <HighlightOffRoundedIcon sx={{ width: '35px', height: '35px' }} onClick={handleCloseMenu} />
      </ListItem>
      <Divider />
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
      >
        <List>
          {[...navMenuTitle, ...footerTitle].map((nav) => (
            <NavLink
              onClick={(e) => {
                if ((nav.name === 'Profil' || nav.name === 'Statistiques' || nav.name === 'Planning') && !isLogged) e.preventDefault();
              }}
              key={nav.name}
              to={nav.link}
              end
              style={({ isActive }) => (isActive
                ? {
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: darkTheme ? '#3399FF' : '#265D97',
                }
                : {
                  textDecoration: 'none',
                  color: darkTheme ? 'white' : '#0A1929',
                }
              )}
            >
              <ListItem key={nav.name} disablePadding>
                <ListItemButton
                  onClick={handleCloseMenu}
                  disabled={(nav.name === 'Profil' || nav.name === 'Statistiques' || nav.name === 'Planning') && !isLogged}
                >
                  {nav.name}
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
      <Divider />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FacebookIcon sx={{ width: 35, height: 35, mt: 3 }} />
        <InstagramIcon sx={{ width: 35, height: 35, mt: 3 }} />
        <TwitterIcon sx={{ width: 35, height: 35, mt: 3 }} />
      </ListItem>
    </List>
  );

  // Badge connexion (circle green)
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: isLogged ? '#44b700' : 'grey',
      color: isLogged ? '#44b700' : 'grey',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      },
    },
  }));
  return (
    <Box>
      <AppBar sx={{ width: '100vw', px: 2 }} position="static">

        <Drawer sx={{ width: '50px' }} open={openMenu} anchor="left" onClose={handleCloseMenu}>
          {listMenuLink()}
        </Drawer>
        <Box sx={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <IconButton
            className="menu-nav"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none', xs: 'flex' }, mr: 2 }}
            onClick={handleOpenMenu}
          >
            <MenuIcon sx={{ mr: 1 }} />
          </IconButton>

          <Box sx={{ display: 'flex', width: { lg: '287px' } }}>
            <IconButton component={Link} to="/accueil" focusRipple={false} style={{ backgroundColor: 'transparent' }}>
              <Logo width="150px" height="45px" color="#fff" />
            </IconButton>
          </Box>
          <Box sx={{
            display: { xs: 'none', md: 'flex' }, flexBasis: 'auto', mt: 1, mb: 0, mr: 'auto', ml: 'auto', fontWeight: 'bold', gap: '1rem',
          }}
          >
            <Typography component="div" sx={{ ml: 'auto', mr: 'auto' }}>
              {navMenuTitle.map((nav) => (
                <Button
                  key={nav.name}
                  variant="text"
                  name={nav.name}
                  disabled={(nav.name === 'Profil' || nav.name === 'Statistiques' || nav.name === 'Planning') && !isLogged}
                  style={location.pathname === nav.link ? { opacity: '100%', borderBottom: 'white solid 3px' } : { opacity: '100%' }}
                  component={Link}
                  to={nav.link}
                  color="inherit"
                  sx={{ fontSize: '16px', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {nav.name}
                </Button>
              ))}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: { lg: '287px' }, justifyContent: { lg: 'flex-end' } }}>
            <FormControlLabel
              sx={{ display: { xs: 'none', md: 'flex' }, m: 0 }}
              checked={darkTheme}
              onChange={(e) => handleTheme(e.target.checked)}
              control={<ThemeSwitch sx={{ my: 1 }} />}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogin}
              color="inherit"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar
                  sx={{ bgcolor: blue[500] }}
                  alt={user.name ? user.name.toUpperCase() : ''}
                  src={user.picture}
                />
              </StyledBadge>
            </IconButton>
            <Typography
              variant="body1"
              onClick={handleLogin}
              sx={{
                display: { lg: 'flex', xs: 'none' },
                alignItems: { lg: 'center' },
                mr: '10px',
                cursor: { lg: 'pointer' },
              }}
            >
              {isLogged ? user.name : '' }
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Typography
              sx={{
                display: { lg: 'none', xs: 'flex' }, justifyContent: 'center', fontSize: '18px', px: '15px', mb: '10px',
              }}
              variant="h1"
            >
              {isLogged ? user.name : ''}
            </Typography>
            <Box>
              { isLogged
                ? (
                  <MenuItem onClick={handleLogout}>
                    <Typography color="primary" width="160px" textAlign="center" sx={darkTheme ? { color: '#FFF', textDecoration: 'none' } : { textDecoration: 'none' }} component={Link} to="/">
                      Déconnexion
                    </Typography>
                  </MenuItem>
                )
                : (
                  <div>
                    <MenuItem onClick={handleClose}>
                      <Typography color="primary" sx={darkTheme ? { color: '#FFF', textDecoration: 'none' } : { textDecoration: 'none' }} component={Link} to="/">
                        Connexion
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Typography color="primary" sx={darkTheme ? { color: '#FFF', textDecoration: 'none' } : { textDecoration: 'none' }} component={Link} to="/inscription">
                        S'enregistrer
                      </Typography>
                    </MenuItem>
                  </div>
                )}
            </Box>
          </Menu>
        </Box>

      </AppBar>
    </Box>
  );
}

export default NavBar;
