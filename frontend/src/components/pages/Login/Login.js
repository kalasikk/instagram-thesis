import React, {useState} from 'react';
import classes from './Login.module.css';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export const Login = ({handle_login}) => {
    const [username,
        setUserName] = useState();
    const [password,
        setPassword] = useState()
    

    return (
        <>
        <div className={classes.header}>
            <Link to="/">Instagram Tracker</Link>
        </div>
        <div className={classes.container}>
            <div classname={classes.formContainer}>
                <Form onSubmit={e => handle_login(e,{username: username,password: password})}>
                    <h2 className={classes.formTitle}>Sign In</h2>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            onChange={e => setUserName(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group> */}

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
        </>
    )
}
