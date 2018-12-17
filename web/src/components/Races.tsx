import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { Race } from '../model/Race';
import { Link } from 'react-router-dom';


interface Props {
    match: any
}

interface State {
    race: Race | null
}

class Races extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            race: null
        }
    }

    componentWillMount() {
        const id = this.props.match.params['id'];

        fetch(`http://localhost:8080/v1/races/${id}`)
            .then(response => response.json())
            .then(body => body as Race)
            .then(race => this.setState({ race }))
    }

    render() {
        const { race } = this.state;

        if (!race) {
            return <h1>empty</h1>
        } else {
            return (
                <Paper>
                    <h1>{race.completed ? "Completed" : "Planned"}</h1>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Rank</TableCell>
                                <TableCell>Start Order</TableCell>
                                <TableCell>Result Order</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                race.results.map(result =>
                                    <TableRow key={result.athleteId}>
                                        <TableCell>
                                            <Link to={"/athletes/" + result.athleteId}>{result.name}</Link>
                                        </TableCell>
                                        <TableCell>{result.country}</TableCell>
                                        <TableCell>{result.rank}</TableCell>
                                        <TableCell>{result.startOrder}</TableCell>
                                        <TableCell>{result.resultOrder}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </Paper>
            )
        }
    }
}


export default Races;