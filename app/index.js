import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import UserLogin from './components/user/login/UserLogin'
import UserRegistration from './components/user/registration/UserRegistration'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/util/PrivateRoute';
import RegistrationSuccess from './components/user/registration/RegistrationSuccess';
import history from './components/util/history';
import './css/main.css';

function App() {
    return (
        <>
            <div className="jumbotron">
                <div className="container-fluid min-100">
                    <div className="col-md-8 offset-md-2">
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <PrivateRoute exact path="/playlist" component={Dashboard} />
                                <Route path="/login" component={UserLogin} />
                                <Route path="/register/success" component={RegistrationSuccess} />
                                <Route path="/register" component={UserRegistration} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('app-root'))
