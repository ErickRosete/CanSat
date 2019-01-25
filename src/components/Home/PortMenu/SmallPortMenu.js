import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const smallPortMenu = (props) => {
    const { anchorEl } = props;

    return (
        <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={props.onClickMenu}
            >
                Select Port
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={props.onClose}>
                <MenuItem onClick={props.onClose}>COM1</MenuItem>
                <MenuItem onClick={props.onClose}>COM2</MenuItem>
                <MenuItem onClick={props.onClose}>COM3</MenuItem>
            </Menu>
        </div>
    );
}


export default smallPortMenu;