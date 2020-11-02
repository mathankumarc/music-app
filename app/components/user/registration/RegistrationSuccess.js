import { Link } from 'react-router-dom'
import React from 'react'

export default function () {
    return (
        <div className="col-lg-8 offset-lg-2">
            <div className="alert alert-success" role="alert">
                <h1> Your registration is Successful.</h1> <Link to="/login" className="alter-link" > Click here to Login. </Link>.
            </div>
        </div>
    );
}
