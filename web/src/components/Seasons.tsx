import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';



interface ListItemLinkProps {
    to: string
    primary: string
}

const ListItemLink = ({ to, primary }: ListItemLinkProps) => {
    const renderLink = (props: any) => <Link to={to} {...props} />;

    return (
        <li>
            <ListItem button={true} component={renderLink}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

const Seasons = () => {
    return (
        <List>
            <ListItemLink to="/events/1718" primary="Season 2017/2018" />
        </List>
    );
}

export default Seasons;