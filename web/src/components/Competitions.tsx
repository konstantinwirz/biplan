import * as React from 'react';
import { Competition } from '../model';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';



interface Props {
    match: any // passed by router lib
}

interface State {
    competitions: Competition[]
}

class Competitions extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            competitions: []
        };
    }

    componentWillMount() {
        const id = this.props.match.params['id'];
        fetch(`http://localhost:8080/v1/competitions/${id}`)
            .then(response => response.json())
            .then(body => body as Competition[])
            .then(competitions => this.setState({ competitions }))
    }

    render() {
        const { competitions } = this.state;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Race ID</TableCell>
                            <TableCell>Distance</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Starttime</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            competitions.map(comp =>
                                <TableRow key={comp.raceId}>
                                    <TableCell>
                                        <Link to={"/races/" + comp.raceId}>{comp.raceId}</Link>
                                    </TableCell>
                                    <TableCell>{comp.distance}</TableCell>
                                    <TableCell>{comp.name}</TableCell>
                                    <TableCell>{comp.startTime}</TableCell>
                                    <TableCell>{comp.completed}</TableCell>
                                </TableRow>
                            )
                    }
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

export default Competitions;