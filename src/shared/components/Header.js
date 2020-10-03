import React from 'react';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';

import '../../assets/styles/header.scss';

const Header = () => {
    return (
        <Navbar color="dark" expand="md" fixed="top">
            <NavbarBrand className="navBrand" href="/">GitSearch</NavbarBrand>
        </Navbar>
    );
}

export default Header;