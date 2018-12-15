import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SeasonAction } from 'src/store/actions';
import { Event, Season } from '../../model';
import Store from '../../store/types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Link } from "react-router-dom";

interface Props {
    season: Season
}

interface State {
    events: Event[]
}

class Index extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentWillReceiveProps(props: Props) {
        fetch(`http://localhost:8080/v1/events/${props.season.id}`)
            .then(response => response.json())
            .then(body => body as Event[])
            .then(events => this.setState({ events }))
    }

    render() {
        const { events } = this.state;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Organizer</TableCell>
                            <TableCell>Starttime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            events.map(event =>
                                <TableRow key={event.id}>
                                    <TableCell>
                                        <Link to={"/events/" + event.id}>{event.id}</Link>
                                    </TableCell>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.level}</TableCell>
                                    <TableCell>{event.country}</TableCell>
                                    <TableCell>{event.organizer}</TableCell>
                                    <TableCell>{event.startTime}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>

        );
    }
}


function mapStateToProps({ season }: Store) {
    return {
        season
    };
}

function mapDispatchToProps(dispatch: Dispatch<SeasonAction>) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);