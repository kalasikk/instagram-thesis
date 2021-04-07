import React, {useState, useEffect} from 'react';
import classes from './Home.module.css';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import action_1 from '../../../store/actionCreators/action_1';
import {Bar} from '../../layouts/Bar';
import {SideDrawer} from '../../layouts/SideDrawer';
import {Main} from '../Main';
import {Account} from '../Account';

export const Home = ({userData, handle_logout}) => {
     const [open,
        setOpen] = React.useState(true);
    const selectedSideMenuItem = useSelector(state => state.selectedSideMenuItem);
    return (
        <div className={classes.root}>
            <Bar open={open} setOpen={setOpen} userData={userData} handle_logout={handle_logout}/>
            <SideDrawer open={open} setOpen={setOpen} />
            {!selectedSideMenuItem && <Main />}
            {selectedSideMenuItem === 'accountInfo' && <Account />}
            {/* {value}
        <button onClick={() => {dispatch(action_1('Alinochka'))}}>Alina</button> */}
        </div>
    )
}
