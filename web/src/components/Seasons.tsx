import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { availableSeasons } from 'src/model';



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
            {
                availableSeasons.map(season =>
                    <ListItemLink key={season.id} to={"/events/" + season.id} primary={"Season " + season.displayName} />
                )
            }
        </List>
    );
}

export default Seasons;