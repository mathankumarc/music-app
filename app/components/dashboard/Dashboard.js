import React from 'react';
import { Router, NavLink, Route, Switch } from 'react-router-dom'
import Songs from './../songs/Songs'
import Playlist from './../playlist/Playlist'
import history from './../util/history'

function dashboard() {
    return (
        <>
            <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" exact  to="/">All Songs</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" exact  to="/playlist">Playlist</NavLink>
                </li>
            </ul>
            </nav>
            <div className="tab-content m-2" id="myTabContent">
            <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-home-tab">
            <Router history={history}>
                <Switch>
                    <Route path="/playlist*" component={Playlist} />
                    <Route path="/" component={Songs} />
                </Switch>
            </Router>
            </div>
            </div>
        </>
    );
}

export default dashboard;
