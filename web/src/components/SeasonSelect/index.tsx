import { FormControl, MenuItem, Select } from "@material-ui/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeSeason, SeasonAction } from 'src/store/actions';
import { availableSeasons, Season, seasonById } from '../../model';
import Store from '../../store/types';


interface Props {
    onSeasonChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void
    season: Season;
}

function mapStateToProps({ season }: Store) {
    return {
        season
    }
}

function mapDispatchToProps(dispatch: Dispatch<SeasonAction>) {
    return {
        onSeasonChanged: (event: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(changeSeason(seasonById(event.target.value)!))
    }
}


const SeasonSelect = ({onSeasonChanged, season}: Props) => {
    
    return (
        <FormControl>
            <Select
                displayEmpty={true}
                value={season.id}
                onChange={onSeasonChanged}>

                {
                    availableSeasons.map(season =>
                        <MenuItem key={season.id} value={season.id} name={season.displayName} >
                            {season.displayName}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelect);


/*



const SeasonSelect = ({ season, onSeasonChanged }: Props) => {
    return (
        <SelectComponent
            items={availableSeasons}
            itemRenderer={render}
            itemPredicate={predicate}
            onItemSelect={onSeasonChanged}>
            <Button text={season.displayName} rightIcon="double-caret-vertical" />
        </SelectComponent>
    )
};


*/