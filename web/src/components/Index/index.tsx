import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SeasonAction } from 'src/store/actions';
import { Event, Season } from '../../model';
import Store from '../../store/types';

interface Props {
    season: Season
}


class Index extends React.PureComponent<Props> {

    componentWillReceiveProps(props: Props) {
        fetch(`http://localhost:8080/v1/events/${props.season.id}`)
            .then(response => response.json())
            .then(body => body as Event)
            .then(event => console.log("EVENT = ", event))
    }

    render() {
        const { season } = this.props;

        return (
            <h1>{season.displayName}</h1>
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