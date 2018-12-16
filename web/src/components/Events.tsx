import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { Event } from '../model';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Link } from "react-router-dom";

interface Props {
    match: any // // passed by react-router lib
}

interface State {
    events: Event[]
}

class Events extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentWillMount() {
        const id = this.props.match.params['id'];

        fetch(`http://localhost:8080/v1/events/${id}`)
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
                                        <Link to={"/competitions/" + event.id}>{event.id}</Link>
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


export default Events;