import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import UserService from '../../../services/UserService';
import history from './../../util/history';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            email: "",
            submitted: false,
            errorMsg: ''
        }

        // Bind the events to Components context.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {

        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })

    }

    handleSubmit(e) {

        e.preventDefault();

        if (this.state.email && this.state.password) {

            this.setState({
                ...this.state,
                submitted: true
            });

            UserService.login({email: this.state.email, password: this.state.password})
            .then((token) => {

                // Redirect the user to dashboard.
                history.push('/')

            })
            .catch((err) => {

                this.setState({
                    ...this.state,
                    submitted: false,
                    errorMsg: err.msg
                });

            })
        }
    }

    render() {

        return (
            <div className="col-lg-8 offset-lg-2">
                {this.state.errorMsg && <div className="alert alert-danger">{this.state.errorMsg}</div>
                }
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} className={'form-control' + (this.state.submitted && !this.state.email ? ' is-invalid' : '')} />
                        {this.state.submitted && !this.state.email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" defaultValue={this.state.password} onChange={this.handleChange} className={'form-control' + (this.state.submitted && !this.state.password ? ' is-invalid' : '')} />
                        {this.state.submitted && !this.state.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {this.state.submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserLogin;