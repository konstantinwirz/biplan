import * as React from 'react';



interface Props {
    match: any // passed by router lib
}

class Events extends React.PureComponent<Props> {


    render() {
        const id = this.props.match.params['id'];
        return <h1>{"ID = " + id}</h1>;
    }

}

export default Events;