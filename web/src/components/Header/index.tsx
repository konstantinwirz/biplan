import * as React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core'
import SeasonSelect from '../SeasonSelect';


const Header = () => {
    return (
        <Navbar className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>BIPLAN</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Navbar.Divider />
                <SeasonSelect />
            </Navbar.Group>
            </Navbar>
    );
};

export default Header;