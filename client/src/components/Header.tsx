import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import { NavigationLink } from './shared/NavLink';

const Header = () => {
  const auth = useAuth();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (isScrollingDown) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'transparent',
          position: 'sticky',
          boxShadow: 'none',
          top: 0,
          transition: 'transform 0.3s', // Add a smooth transition for hiding/showing
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)', // Hide/show header
        }}
      >
        <Toolbar sx={{ display: 'flex' }}>
          <Logo />
          <Box sx={{}}>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink bg="#00ffcc" color="black" text="Chat with AI" to="/chat" />
                <NavigationLink bg="#51538f" color="white" text="Logout" to="/" onClick={auth.logout} />
              </>
            ) : (
              <>
                <NavigationLink bg="#00ffcc" color="black" text="Login" to="/login" />
                <NavigationLink bg="#51538f" color="white" text="Register" to="/register" />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
