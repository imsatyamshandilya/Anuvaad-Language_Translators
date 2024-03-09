import React from "react";
import history from "../../../../web.history";

import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import APITransport from "../../../../flux/actions/apitransport/apitransport";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { showSidebar } from '../../../../flux/actions/apis/common/showSidebar';
import GlobalStyles from "../../../styles/web/styles";
import Theme from "../../../theme/web/theme-anuvaad";
import classNames from "classnames";
import clearTask from '../../../../flux/actions/apis/view_scheduled_jobs/clear_task';


class SentenceCardHeader extends React.Component {
    render() {
        const { classes, open_sidebar } = this.props;
        return (
            <AppBar position="fixed" color="secondary" className={classNames(classes.appBar, open_sidebar && classes.appBarShift)} style={{ height: '50px' }}>

                <Toolbar disableGutters={!this.props.open_sidebar} style={{ minHeight: "50px" }}>
                    {
                        open_sidebar ?
                            <IconButton onClick={() => this.props.showSidebar()} className={classes.menuButton} color="inherit" aria-label="Menu" style={{ margin: "0px 5px" }}>
                                <CloseIcon />
                            </IconButton> :
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <IconButton
                                    onClick={() => {
                                        this.props.clearTask()
                                        history.push(`${process.env.PUBLIC_URL}/view-annotation-job`);
                                    }}
                                    className={classes.menuButton} color="inherit" aria-label="Menu" style={{ margin: "0px 5px" }}
                                >
                                    <BackIcon />
                                </IconButton>
                                <div style={{ borderLeft: "1px solid #D6D6D6", height: "40px", marginRight: "5px", marginTop: "5px" }} />
                                <IconButton onClick={() => this.props.showSidebar(!open_sidebar)} className={classes.menuButton} color="inherit" aria-label="Menu" style={{ margin: "0px 5px 0px 3px" }}>
                                    <MenuIcon />
                                </IconButton>
                            </div>
                    }

                    <div style={{ borderLeft: "1px solid #D6D6D6", height: "40px", marginRight: "10px" }}></div>
                    <Typography variant="h5" color="inherit" className={classes.flex}>
                        Rate Sentences
                    </Typography>
                    <Typography variant="h6" color="inherit" style={{ marginLeft: '10vw' }} noWrap>
                        Total Sentences:{` ${this.props.total_count}`}
                    </Typography>
                    <Typography variant="h6" color="inherit" style={{ marginLeft: '5vw' }} noWrap>
                        Sentences Completed:{` ${this.props.saved_count}`}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    open_sidebar: state.open_sidebar.open,
    sentence_stats: state.taskdetail
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        APITransport,
        showSidebar,
        clearTask
    },
    dispatch
);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(GlobalStyles(Theme), { withTheme: true })(SentenceCardHeader)));