import { SET_SIDE_MENU_ITEM_ACTION } from '../actions/setSideMenuItemAction'

export const setSideMenuItem = (menuItem) => {
    return {
        type: SET_SIDE_MENU_ITEM_ACTION,
        payload: menuItem
    };
}
