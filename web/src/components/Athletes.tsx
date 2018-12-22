import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Athlete } from '../model/Athlete';
import AthleteInfo from './AthleteInfo';



interface Props {
    match: any // provided by react-router
}

interface State {
    athlete: Athlete | null
}

export default class Athletes extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            athlete: null
        }
    }

    componentWillMount() {
        const id = this.props.match.params['id'];

        fetch(`http://localhost:8080/v1/athletes/${id}`)
            .then(response => response.json())
            .then(body => body as Athlete)
            .then(athlete => this.setState({ athlete }));
    }

    render() {
        const { athlete } = this.state;

        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom={true}>
                        Athlete information
                        </Typography>
                    {
                        athlete ? <AthleteInfo athlete={athlete} /> : <CircularProgress />
                    }
                </CardContent>
            </Card>
        );
    }

}