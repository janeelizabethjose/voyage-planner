import React, { useState } from 'react';
import axios from 'axios';
import './registration.css';
import { API_BASE_URL } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import ButterToast, { Cinnamon, POS_BOTTOM, POS_CENTER } from 'butter-toast';

function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password
            }
            axios.post(API_BASE_URL + 'createUser', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToLogin();
                        props.showError(null)
                    } else {
                        showErrorMessage("Some error ocurred!");
                    }
                })
                .catch(function (error) {
                    showErrorMessage("Some error ocurred!");
                });
        } else {
            showErrorMessage('Please enter username and password!')
        }

    }
    const redirectToLogin = () => {
        props.updateTitle('Voyage Planner')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            showErrorMessage('Passwords do not match!');
        }
    }

    const showErrorMessage = (message) => {
        return ButterToast.raise({
            content: <Cinnamon.Crisp scheme={Cinnamon.Crisp.SCHEME_GREY}
                content={() => <div>{message}</div>}
                title="Oops!" />
        });
    }

    return (
        <>
            <div className="container d-flex align-items-center flex-column" style={{ paddingTop: "80px" }}>
                <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                    <span className="headerStyle">Register Here</span>
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
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputPassword1">Confirm Password*</label>
                            <input type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={state.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmitClick}
                        >
                            Register
                </button>
                    </form>
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
                    </div>
                </div>
            </div>
            <div>
                <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_CENTER }} />
            </div>
        </>
    )
}

export default withRouter(RegistrationForm);