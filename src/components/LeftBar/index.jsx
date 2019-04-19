import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// SVG icons
import IApps from '@material-ui/icons/Apps'

import { AppStateContext } from '../App/AppStateProvider'

function LeftBar({
    classes,
    location: { pathname },
    theme,
}) {
    const {
        ui: {
            leftBar: {
                expandedWidth,
                isExpanded,
                isVisible: isLeftBarVisible,
                shrunkWidth,
            },
            topBar: {
                isVisible: isTopBarVisible,
                height: topBarHeight,
            },
        },
    } = useContext(AppStateContext)

    if (!isLeftBarVisible) {
        return null
    }

    const offsetTop = isTopBarVisible ? topBarHeight : 0

    const items = [
        {
            id: 'item-home',
            isActive: pathname === '/',
            isSubItem: false,
            Icon: IApps,
            label: 'Home',
            hasBorderBottom: true,
            linkTo: '/',
            onClick: () => console.log('::: >>> Home'),
        },
        {
            id: 'item-page-1',
            isActive: pathname === '/page1',
            isSubItem: false,
            Icon: IApps,
            label: 'Page 1',
            hasBorderBottom: true,
            linkTo: '/page1',
            onClick: () => console.log('::: >>> Page 1'),
        },
        {
            id: 'sub-item-page-11',
            isActive: pathname === '/page1/page11',
            isSubItem: true,
            Icon: IApps,
            label: 'Page 11',
            hasBorderBottom: false,
            linkTo: '/page1/page11',
            onClick: () => console.log('::: >>> Page 11'),
        },
        {
            id: 'sub-item-page-12',
            isActive: pathname === '/page1/page12',
            isSubItem: true,
            Icon: IApps,
            label: 'Page 12',
            hasBorderBottom: true,
            linkTo: '/page1/page12',
            onClick: () => console.log('::: >>> Page 12'),
        },
        {
            id: 'item-page-2',
            isActive: pathname === '/page2',
            isSubItem: false,
            Icon: IApps,
            label: 'Page 2',
            hasBorderBottom: true,
            linkTo: '/page2',
            onClick: () => console.log('::: >>> Page 2'),
        },
    ]

    return (
        <Drawer
            variant="permanent"
            open
            // open={isLeftBarVisible}
            className={classes.drawer}
            classes={{ paper: classes.paper }}
            style={{
                marginTop: offsetTop,
                width: isExpanded ? expandedWidth : shrunkWidth,
                height: `calc(100% - ${offsetTop}px)`,
            }}
        >
            <List className={classNames(classes.list, classes.listFitVert)}>
                {items.map(({
                    Icon = null,
                    isActive = false,
                    id = '',
                    isSubItem = false,
                    hasBorderBottom = false,
                    label = '',
                    linkTo = '#',
                    onClick = () => { },
                }) => (
                    <Link
                        key={id}
                        to={linkTo}
                        className={classes.link}
                        onClick={onClick}
                    >
                        <ListItem
                            button
                            disableRipple
                            className={classNames(classes.listItem, isSubItem ? classes.listSubItem : '')}
                        >
                            {Icon ? (
                                <ListItemIcon className={classes.listItemIcon}>
                                    <Icon
                                        color="inherit"
                                        style={{ color: isActive ? theme.palette.primary.main : '' }}
                                    />
                                </ListItemIcon>
                            ) : null}
                            <ListItemText
                                primary={(
                                    <span style={{ color: isActive ? theme.palette.primary.main : theme.palette.text.secondary }}>
                                        {label}
                                    </span>
                                )}
                                className={classes.listItemText}
                                classes={{ primary: classes.listItemTextPrimary }}
                            />
                        </ListItem>
                        {hasBorderBottom ? <Divider /> : null}
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}

LeftBar.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(theme => ({
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
        }),
    },
    link: {
        textDecoration: 'none',
    },
    list: {
        padding: 0,
        margin: 0,
    },
    listFitVert: {
        flex: 1,
    },
    listItem: {
        height: 48,
        margin: 0,
        padding: '0 20px',
    },
    listItemIcon: {
        margin: 0,
        padding: '0 24px 0 0',
    },
    listItemText: {
        padding: 0,
    },
    listItemTextPrimary: {
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.1rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    listSubItem: {
        backgroundColor: theme.palette.grey['100'],
    },
    paper: {
        top: 'inherit',
        width: 'inherit',
        height: 'inherit',
        overflowX: 'hidden',
    },
}), { withTheme: true })(withRouter(LeftBar))
