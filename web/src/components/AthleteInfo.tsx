import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Athlete } from '../model/Athlete';


interface Props {
    athlete: Athlete
}

const AthleteInfo = (props: Props) => {
    const { athlete } = props;

    return (
        <div>
            <CardMedia style={{ height: '64px', width: '64px' }}
                image={athlete.photoUri}
                title={athlete.fullName} />
            <Typography>
                <b>Name: </b>{athlete.fullName}
            </Typography>
            <Typography>
                <b>Age: </b>{athlete.age}
            </Typography>
            <CardMedia style={{ height: '35px', width: '39px' }}
                image={athlete.flagUri}
                title={athlete.country} />
        </div>
    );
}

export default AthleteInfo;