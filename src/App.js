import React, { useState } from 'react';
import { NavItem, Nav, NavLink } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink as RRNavLink
} from 'react-router-dom';
import Add from './pages/Add';
import Quizzes from './pages/Quizzes';
import Home from './pages/Home';
import UpdateQuiz from './pages/UpdateQuiz';
import './App.scss';
import users from './login.json';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        permissions: ''
    });

    const onSubmit = data => {
        users.forEach(user => {
            if (
                user.username === data.username &&
                user.password === data.password
            ) {
                setUserData(user);
                setIsLoggedIn(true);
                setFailedLogin(false);
            } else {
                setFailedLogin(true);
            }
        });
    };

    const handleLogOut = () => {
        setIsLoggedIn(false);
        setUserData({ username: '', password: '', permissions: '' });
    };

    return (
        <Router>
            <Nav className="mr-auto" tabs>
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/">
                        Home
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/add">
                        Add Quiz
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/quizzes">
                        All Quizzes
                    </NavLink>
                </NavItem>
                {isLoggedIn && (
                    <NavItem>
                        <NavLink
                            tag={RRNavLink}
                            exact
                            onClick={handleLogOut}
                            to="/"
                        >
                            Log Out
                        </NavLink>
                    </NavItem>
                )}
            </Nav>

            <Switch>
                <Route path="/updatequiz/:id">
                    <UpdateQuiz isLoggedIn={isLoggedIn} userData={userData} />
                </Route>
                <Route path="/add">
                    <Add isLoggedIn={isLoggedIn} userData={userData} />
                </Route>
                <Route path="/quizzes">
                    <Quizzes isLoggedIn={isLoggedIn} userData={userData} />
                </Route>
                <Route path="/">
                    <Home
                        onSubmit={onSubmit}
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                        failedLogin={failedLogin}
                    />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
