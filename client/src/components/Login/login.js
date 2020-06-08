import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { API_BASE_URL } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = (e) => {
        props.showError(null);
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(API_BASE_URL + 'login', payload)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.rows) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful. Redirecting to home page..'
                        }));
                        localStorage.setItem('userID', response.data.rows.id);
                        const userID = localStorage.getItem('userID');
                        localStorage.setItem('email', response.data.rows.email);
                        const email = localStorage.getItem('email');
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Username does not exist!");
                    }
                }
                else if (response.status === 204) {
                    props.showError("Username and password do not match!");
                }
                else {
                    props.showError("Username does not exist!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Voyage Planner')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Voyage Planner');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (state.email.length && state.password.length) {
            sendDetailsToServer()
        } else {
            props.showError('Please enter valid username and password')
        }
    }

    return (
        <div className="container d-flex align-items-center flex-column" style={{ paddingTop: "80px" }}>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <span className="headerStyle">Login Here</span>
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address*</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password*</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check">
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >Submit</button>
                </form>
                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
                <div className="registerMessage">
                    <span>Don't have an account? </span>
                    <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);