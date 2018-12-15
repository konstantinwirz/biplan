import { Action } from 'redux';
import * as constants from '../constants';
import {Season} from '../../model';

export interface ChangeSeasonAction extends Action {
    type: constants.SEASON_CHANGED
    season: Season
}

export function changeSeason(season: Season): SeasonAction {
    return {
        type: constants.SEASON_CHANGED,
        season
    }
}

export type SeasonAction = ChangeSeasonAction;
