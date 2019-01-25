import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import MenuList from '@material-ui/core/MenuList';
// import Paper from '@material-ui/core/Paper';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Popper from '@material-ui/core/Popper';
// import Grow from '@material-ui/core/Grow';

const portMenu = (props) => {
    const thirdOption = "COMZ"
    const options = [
        'Seleccionar un puerto',
        'COMX',
        'COMY',
        thirdOption,
    ];

    return (
        <div className="port-menu">
            <List component="nav">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="When device is locked"
                    onClick={props.onClickList}
                >
                    <ListItemText
                        primary="Puerto"
                        secondary={options[props.selectedIndex]}
                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={props.anchorEl}
                open={Boolean(props.anchorEl)}
                onClose={props.onClose}
            >
                {options.map((option, index) => {
                    // console.log(index);
                    return (<MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === props.selectedIndex}
                        onClick={props.onClickMenu.bind(this, index)}
                    >
                        {option}
                    </MenuItem>);
                })}
            </Menu>
        </div>
    )
}

export default portMenu
