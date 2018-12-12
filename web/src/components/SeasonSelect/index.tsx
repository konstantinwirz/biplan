import * as React from 'react';
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select'
import { MenuItem, Button } from '@blueprintjs/core';
import Season, { availableSeasons } from '../../model/Season';
import Store from 'src/store/types';
import { SeasonAction } from 'src/store/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const SelectComponent = Select.ofType<Season>();

const predicate: ItemPredicate<Season> = (query, season) => {
    return season.displayName.indexOf(query) >= 0;
};

const render: ItemRenderer<Season> = (season, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    return (
        <MenuItem
            active={modifiers.active}
            key={season.id}
            label={season.displayName}
            onClick={handleClick}
            text={season.displayName}
        />
    );
}

interface Props {

}

interface State {
    season: Season
}


function mapStateToProps({season}: Store) {
    return {
        season
    }   
}

function mapDispatchToProps(dispatch: Dispatch<SeasonAction>) {
    return {

    }
}

class SeasonSelect extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            season: availableSeasons[0]
        };
    }

    selectSeason = (season: Season): void => {
        this.setState({
            season
        });
    }

    render() {
        const { season } = this.state
        return (
            <SelectComponent
                items={availableSeasons}
                itemRenderer={render}
                itemPredicate={predicate}
                onItemSelect={this.selectSeason}>
                <Button text={season.displayName} rightIcon="double-caret-vertical" />
            </SelectComponent>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelect);