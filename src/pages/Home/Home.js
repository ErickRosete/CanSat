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




class HomePage extends Component {

    handleClick2=(e)=>{
        e.preventDefault();
        console.log('El segundo boton fue seleccionado.');
        if (isElectron()) {
            console.log(window.ipcRenderer);
            window.ipcRenderer.send('code:submit','Segundo')
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

    render() {
        const { classes } = this.props;

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
                    Primary </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick2}>
                    Secondary </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.closeClick}>
                    Close </Button>
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
