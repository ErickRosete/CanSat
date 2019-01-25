import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// botonmenu
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';


// npm install --save is-electron
// HemalR had the solution  
// https://github.com/electron/electron/issues/9920
// https://github.com/cheton/is-electron
// https://github.com/csepulv/electron-with-create-react-app/blob/electron-remote/src/App.jshttps://github.com/csepulv/electron-with-create-react-app/blob/electron-remote/src/App.js
import isElectron from 'is-electron';


  


class HomePage extends Component {
    // menu
    // state = {
    //     open: false,
    // };
    state = {
        anchorEl: null,
        selectedIndex: 1,
      };
    thirdOption="COMZ"

    options = [
        'Seleccionar un puerto',
        'COMX',
        'COMY',
        this.thirdOption,
    ];


    handleClick2=(e)=>{
        e.preventDefault();
        console.log('El segundo boton fue seleccionado.');
        if (isElectron()) {
            console.log(window.ipcRenderer);
            window.ipcRenderer.send('code:submit','Segundo')
        }
    }

    handleClick3=(e)=>{
        e.preventDefault();
        console.log('El segundo boton fue seleccionado.');
        if (isElectron()) {
            console.log(window.ipcRenderer);
            window.ipcRenderer.send('code:submit','Tercero')
        }
    }

    closeClick=(e)=>{
        e.preventDefault();
        console.log('El boton de cierre fue seleccionado.');
        if (isElectron()) {
            window.ipcRenderer.send('code:submit','Cerrando')
             // const { app } = window.require('electron').remote;
            console.log(window.app.quit())
        }
    }

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };



    render() {
        const { classes } = this.props;
        // const { open } = this.state;
        const { anchorEl } = this.state;


        window.ipcRenderer.on("code:feedback", (event, arg) => {
            console.log(arg);
            this.thirdOption=arg;
            // this.setState({ options: options });
            console.log(this.options)

        });

        function handleClick1(e) {
            e.preventDefault();
            console.log('El primer boton fue seleccionado.');
            if (isElectron()) {
                console.log(window.ipcRenderer);
                window.ipcRenderer.send('code:submit','Primero');
                // window.ipcRenderer.on('pong', (event, arg) => {
                //     this.setState({ipc: true})
                // })
                // ipcRenderer.send('code:submit', "primero")
                // const { app } = window.require('electron').remote;
                // for app.quit()
            }
        }

        console.log("Soy una aplicacion de Electron?: "+isElectron());
        return (
            <div className="HomePage">
                <Button variant="contained" color="primary" className={classes.button} onClick={handleClick1}>
                    Escaneo arduino </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick2}>
                    LED Rapido </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick3}>
                    LED Lento </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.closeClick}>
                    Close </Button>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                        primary="Puerto"
                        secondary={this.options[this.state.selectedIndex]}
                        />
                    </ListItem>
                    </List>
                    <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    >
                    {this.options.map((option, index) => (
                        <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClick(event, index)}
                        >
                        {option}
                        </MenuItem>
                    ))}
                    </Menu>

            </div>
        );
    }
}

// css material ui y react
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

// materialui
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
