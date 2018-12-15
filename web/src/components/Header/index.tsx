import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { Link } from "react-router-dom";
import SeasonSelect from '../SeasonSelect';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


const IndexLink = (props: any) => <Link to="/" {...props}></Link>

const Header = (props: WithStyles<typeof styles>) => {
  const { classes } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton component={IndexLink} className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          BIPLAN
          </Typography>
        <SeasonSelect />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
