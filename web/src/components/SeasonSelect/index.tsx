import * as React from 'react';
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select'
import { MenuItem, Button } from '@blueprintjs/core';


// all available seasons
export const availableSeasons: Season[] = [
    { id: "1819", displayName: "2018/2019" },
    { id: "1718", displayName: "2017/2018" },
    { id: "1617", displayName: "2016/2017" },
];

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

export default class SeasonSelect extends React.PureComponent<Props, State> {

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