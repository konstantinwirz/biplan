import Store from '../types';
import * as constants from '../constants';
import * as actions from '../actions';


export function changeSeason(state: Store, action: actions.SeasonAction): Store {
    switch (action.type) {
        case constants.SEASON_CHANGED:
            return {...state, season: action.season};
    }

    return state;
}
