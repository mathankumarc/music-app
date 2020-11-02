import React from 'react'
import UserService from './../../../services/UserService'
import history from './../../util/history';

class UserRegistration extends React.Component {
    constructor(props) {
        super(props);

        // Initial State.
        this.state = {
            password: "",
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: "",
            submitted: false,
            errorMsg: ''
        }

        // Bind the event to the Component context.
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

        this.setState({
            ...this.state,
            submitted: true
        });

        if (this.state.firstName && this.state.email && this.state.password && (this.state.password === this.state.confirmPassword)) {

            UserService.register({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            .then((response) => {

                // Redirect the User to Success Page.
                history.push('/register/success');

            })
            .catch((error) => {

                this.setState({
                    ...this,
                    errorMsg: error.msg,
                    submitted: false
                })

            });
        }
    }

    render() {
        return (
            <div className="col-lg-8 offset-lg-2">
                {this.state.errorMsg && <div className="alert alert-danger">{this.state.errorMsg}</div>
                }
                <h2>Registration</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange} className={'form-control' + (this.state.submitted && !this.state.firstName ? ' is-invalid' : '')} />
                        {this.state.submitted && !this.state.firstName &&
                            <div className="invalid-feedback">First Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange} className={'form-control'} />
                    </div>
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
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" defaultValue={this.state.confirmPassword} onChange={this.handleChange} className={'form-control' + (this.state.submitted && (this.state.password !== this.state.confirmPassword) ? ' is-invalid' : '')} />
                        {this.state.submitted && (this.state.password !== this.state.confirmPassword) &&
                            <div className="invalid-feedback">Passwords Do not Match</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {this.state.submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserRegistration;
