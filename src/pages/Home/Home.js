import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class HomePage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className="HomePage">
                <Button variant="contained" color="primary" className={classes.button}>
                    Primary </Button>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Secondary </Button>
            </div>);
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(HomePage);
