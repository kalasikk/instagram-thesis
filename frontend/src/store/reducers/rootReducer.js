import ACTION_1 from '../actions/action_1';
import {SET_SIDE_MENU_ITEM_ACTION} from '../actions/setSideMenuItemAction';
import initialState from '../initialState';

export const reducer = (state = initialState , action) => {
    switch(action.type) {
        case ACTION_1: return { value: action.value_1 };
        case SET_SIDE_MENU_ITEM_ACTION: return {
            ...state,
            selectedSideMenuItem: action.payload,
        };
        default: return state;
    }
}
