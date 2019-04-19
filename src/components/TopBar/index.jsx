import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// SVG Icons
import IAccountCircle from '@material-ui/icons/AccountCircle'
import IMenu from '@material-ui/icons/Menu'

import { AppDispatchContext } from '../App/AppStateProvider'
import { AuthDispatchContext } from '../App/AuthStateProvider'

function TopBar({ classes }) {
    const appDispatch = useContext(AppDispatchContext)

    const authDispatch = useContext(AuthDispatchContext)

    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)

    return (
        <>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        aria-label="Toggle drawer"
                        color="inherit"
                        className={classes.menuButton}
                        onClick={() => appDispatch({ type: 'appState/ui/TOGGLE_LEFT_BAR' })}
                    >
                        <IMenu />
                    </IconButton>

                    <div className={classes.grow} />

                    <div className={classes.rightSection}>
                        <IconButton
                            aria-owns={userMenuAnchorEl ? 'menu-app-bar' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={event => setUserMenuAnchorEl(event.currentTarget)}
                        >
                            <IAccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-app-bar"
                            open={!!userMenuAnchorEl}
                            anchorEl={userMenuAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={() => setUserMenuAnchorEl(null)}
                        >
                            <MenuItem
                                onClick={() => {
                                    setUserMenuAnchorEl(null)
                                    authDispatch({ type: 'authState/RESET' })
                                }}
                            >
                                Sign out
                            </MenuItem>
                        </Menu>
                        <Typography variant="body1" color="inherit">
                            User Name
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(theme => ({
    appBar: {
        boxShadow: 'none',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
        }),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
}), { withTheme: true })(TopBar)
