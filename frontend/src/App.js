import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './components/pages/Home';
import {Login} from './components/pages/Login';
import {Registration} from './components/pages/Registration';
import { Provider } from 'react-redux';
import {store} from './store/store';
import {ErrorModal} from './components/layouts/ErrorModal';
import {Constants} from './utils/Constants';

function App() {
    const [userData, setUserData] = useState({
        loggedIn: localStorage.getItem('token') ? true : false,
        username: '',
        group: [],
        error: null,
    })



    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        });
        const currentUser = await response.json();
        setUserData(prevState => ({
          ...prevState,
          username: currentUser.username,
          group: currentUser.groups?.length ? (currentUser.groups[0] === 1 ? Constants.USER_ROLES.CREATOR : Constants.USER_ROLES.BUSINESS) : null,
        }))
      } catch (error) {
        setUserData(prevState => ({
          ...prevState,
          error: error
        }))
        console.error(error)
      }

    }

    useEffect(() => {
        if (loggedIn) {
            fetchCurrentUser()
          }
    }, []);

    const handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem('token', json.token);
            setUserData(prevState => ({
                ...prevState,
                loggedIn: true,
                username: json.user.username,
            }))
            window.location.href = "/";
          })
          .catch(error => {
            setUserData(prevState => ({
              ...prevState,
              error: error
            }))
          });
      };

      const handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem('token', json.token);
            setUserData(prevState => ({
                ...prevState,
                loggedIn: true,
                username: json.username
            }))
            debugger
            window.location.href = "/";
          })
          .catch(error => {
            setUserData(prevState => ({
              ...prevState,
              error: error
            }))
          });
      };

      const handle_logout = () => {
        localStorage.removeItem('token');
        setUserData(prevState => ({
            ...prevState,
            loggedIn: false,
            username: '',
        }))
      };

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/signUp">
                        <Registration handle_signup={handle_signup} />
                    </Route>
                    <Route path="/login">
                        <Login handle_login={handle_login} />
                    </Route>
                    <Route path="/">
                        {/* {userData.error && <ErrorModal error={userData.error}/>} */}
                        <Home userData={userData} handle_logout={handle_logout}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default App;
