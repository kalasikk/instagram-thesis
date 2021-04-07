import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

// export const NavBarListItems = (
//   <div>
//     <ListItem key="company" button>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Company" />
//     </ListItem>
//     <ListItem key="users" button>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Users" />
//     </ListItem>
//     <ListItem key="accountInfo" button>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Account Info" />
//     </ListItem>
//   </div>
// );

const NavBarListItems = ({onClick}) => {

return (
  <div>
    <ListItem id="company" button onClick={onClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItem>
    <ListItem id="users" button onClick={onClick}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem id="accountInfo" button onClick={onClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Account Info" />
    </ListItem>
  </div>
);
}

export default NavBarListItems;