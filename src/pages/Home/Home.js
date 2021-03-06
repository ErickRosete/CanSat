import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// npm install --save is-electron
// HemalR had the solution  
// https://github.com/electron/electron/issues/9920
// https://github.com/cheton/is-electron
// https://github.com/csepulv/electron-with-create-react-app/blob/electron-remote/src/App.jshttps://github.com/csepulv/electron-with-create-react-app/blob/electron-remote/src/App.js
import isElectron from 'is-electron';

import DragAndDrop from '../../components/Home/DragAndDrop/DragAndDrop';
import PortMenu from '../../components/Home/PortMenu/PortMenu';
import SmallPortMenu from '../../components/Home/PortMenu/SmallPortMenu';

import "./Home.css";

// menu
// state = {
//     open: false,
// };
class HomePage extends Component {
    state = {
        anchorEl: null,
        selectedIndex: 1,
        openPortMenu: false,
        anchorSmallEl: null,
    };

    //PortMenu
    clickListItemHandler = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    clickMenuItemHandler = index => {
        this.setState({
            selectedIndex: index,
            anchorEl: null
        });
    };

    closeListItemHandler = () => {
        this.setState({ anchorEl: null });
    };

    //Small Port Menu
    smallPortMenuToggleHandler = (event) => {
        this.setState({ anchorSmallEl: event.currentTarget });
    };

    smallPortMenuCloseHandler = () => {
        this.setState({ anchorSmallEl: null });
    };


    //Buttons
    handleClick2 = (e) => {
        e.preventDefault();
        console.log('El segundo boton fue seleccionado.');
        if (isElectron()) {
            console.log(window.ipcRenderer);
            window.ipcRenderer.send('code:submit', 'Segundo')
        }
    }

    handleClick3 = (e) => {
        e.preventDefault();
        console.log('El segundo boton fue seleccionado.');
        if (isElectron()) {
            console.log(window.ipcRenderer);
            window.ipcRenderer.send('code:submit', 'Tercero')
        }
    }

    closeClick = (e) => {
        e.preventDefault();
        console.log('El boton de cierre fue seleccionado.');
        if (isElectron()) {
            window.ipcRenderer.send('code:submit', 'Cerrando')
            // const { app } = window.require('electron').remote;
            console.log(window.app.quit())
        }
    }

    render() {
        const { classes } = this.props;
        // const { open } = this.state;

        window.ipcRenderer.on("code:feedback", (event, arg) => {
            console.log(arg);
            this.thirdOption = arg;
            // this.setState({ options: options });
            console.log(this.options)

        });

        function handleClick1(e) {
            e.preventDefault();
            console.log('El primer boton fue seleccionado.');
            if (isElectron()) {
                console.log(window.ipcRenderer);
                window.ipcRenderer.send('code:submit', 'Primero');
            }
        }
        // window.ipcRenderer.on('pong', (event, arg) => {
        //     this.setState({ipc: true})
        // })
        // ipcRenderer.send('code:submit', "primero")
        // const { app } = window.require('electron').remote;
        // for app.quit()

        console.log("Soy una aplicacion de Electron?: " + isElectron());
        return (
            <div className="HomePage">
                <PortMenu onClose={this.closeListItemHandler}
                    onClickList={this.clickListItemHandler}
                    onClickMenu={this.clickMenuItemHandler}
                    anchorEl={this.state.anchorEl}
                    selectedIndex={this.state.selectedIndex}>
                </PortMenu>

                <div className="action-bar">
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleClick1}>
                        Escaneo arduino </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick2}>
                        LED Rapido </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick3}>
                        LED Lento </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.closeClick}>
                        Close </Button>

                    <SmallPortMenu
                        onClose={this.smallPortMenuCloseHandler}
                        onClickMenu={this.smallPortMenuToggleHandler}
                        anchorEl={this.state.anchorSmallEl}>
                    </SmallPortMenu>
                </div>

                <DragAndDrop></DragAndDrop>
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
