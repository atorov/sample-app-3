import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// SVG icons
import IError from '@material-ui/icons/Error'
import ILockOutlined from '@material-ui/icons/LockOutlined'
import IVisibility from '@material-ui/icons/Visibility'
import IVisibilityOff from '@material-ui/icons/VisibilityOff'

import useSignIn from '../../lib/api/use-sign-in'
import getMessageFromError from '../../lib/api/get-message-from-error'
import useFormData from '../../lib/use-form-data'

import checkSignedIn from '../../lib/check-signed-in'

import { AuthDispatchContext, AuthStateContext } from '../App/AuthStateProvider'

import validateData from './validate-data'

const INIT_DATA = {
    email: '',
    password: '',
}

const INIT_VALIDATION = {
    isValid: true,
    data: {
        email: {},
        password: {},
    },
}

function SignIn({ classes, location }) {
    const authDispatch = useContext(AuthDispatchContext)

    const authState = useContext(AuthStateContext)

    const [signInStatus, setSignInStatus, signInError, , goSignIn] = useSignIn(authDispatch, authState)

    const [formData, setFormData, validation] = useFormData(INIT_DATA, INIT_VALIDATION, validateData)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    useEffect(() => {
        setSignInStatus(':READY:')
    }, [formData, setSignInStatus])

    const isSignedIn = checkSignedIn(authState)

    if (isSignedIn) {
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }

    return (
        <div className="container">
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ILockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form
                        className={classes.form}
                        onSubmit={(event) => {
                            event.preventDefault()
                            goSignIn(formData)
                        }}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                {validation.data.email.message || 'Email Address'}
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                error={!validation.data.email.isValid}
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => {
                                    event.persist()
                                    setFormData(prevState => ({ ...prevState, email: event.target.value }))
                                }}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="adornment-password">
                                {validation.data.password.message || 'Password'}
                            </InputLabel>
                            <Input
                                id="adornment-password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={formData.password}
                                error={!validation.data.password.isValid}
                                onChange={(event) => {
                                    event.persist()
                                    setFormData(prevState => ({ ...prevState, password: event.target.value }))
                                }}
                                endAdornment={(
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={() => setIsPasswordVisible(prevState => !prevState)}
                                        >
                                            {isPasswordVisible ? <IVisibility /> : <IVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )}
                            />
                        </FormControl>
                        <Button
                            disabled={!validation.isValid || signInStatus === ':PENDING:'}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>

            {signInStatus === ':ERROR:' ? (
                <Paper className={classes.errorMessage}>
                    <IError className={classes.errorMessageWarningIcon} />
                    <Typography component="p" variant="body1" color="inherit">
                        {getMessageFromError(signInError)}
                    </Typography>
                </Paper>
            ) : null}
        </div>
    )
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default withStyles(theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        minWidth: 240,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(700)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.error.light,
        color: '#fff',
    },
    errorMessageWarningIcon: {
        margin: theme.spacing.unit,
        color: 'rgba(255, 255, 255, 0.75)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    main: {
        width: 'auto',
        minWidth: 240,
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(700)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
}), { withTheme: true })(SignIn)
