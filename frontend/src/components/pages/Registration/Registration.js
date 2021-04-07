import React, {useState} from 'react';
import classes from './Registration.module.css';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Constants} from '../../../utils/Constants';

const defaultCreatorRoleIndex = 0;

export const Registration = ({handle_signup}) => {
    const [username,
        setUserName] = useState();
    const [password,
        setPassword] = useState()
    const [group,
        setGroup] = useState(defaultCreatorRoleIndex);

    return (
    <>
    <div className={classes.header}>
        <Link to="/">Instagram Tracker</Link>
    </div> < div className = {
        classes.container
    } > <div classname={classes.formContainer}>
        <Form
            onSubmit={e => handle_signup(e, {
            username: username,
            password: password,
            groups: [group],
        })}>
            <h2 className={classes.formTitle}>Sign Up</h2>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={e => setUserName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formRoleSelect">
                <Form.Label>User Role</Form.Label>
                <Form.Control as="select" defaultValue="Select Role" onChange={(e) => setGroup(e.currentTarget.selectedIndex)}>
                    <option>{Constants.USER_ROLES.CREATOR}</option>
                    <option>{Constants.USER_ROLES.BUSINESS}</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword"
                    aria-describedby="passwordHelpInline"
                    onChange={e => setPassword(e.target.value)}/>
                <Form.Text id="passwordHelpInline" muted>
                    Must be 8-20 characters long.
                </Form.Text>
            </Form.Group>
            <Button color="primary" variant="contained" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    </div>
        </>)
}
