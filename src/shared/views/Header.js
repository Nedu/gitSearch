import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';

const NavLinks = styled(Link)`
  font-size: 18px;
  font-family: 'gotham medium';
  line-height: 20px;
  letter-spacing: 0.13px;
  margin-right: 60px;
  color: #fff;
  text-decoration: none;

  &:hover { 
    color: #7f7f7f;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <Grid item>
      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <div style={{ flex: 1 }}>
              <Typography>
                  <NavLinks className="option" to="/">
                    GitSearch
                  </NavLinks>
                </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
};

export default Header;