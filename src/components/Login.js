import React, { useState, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
import '../scss/Login.css';
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../constants";
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [usernameOrEmail, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();
        console.log(checkBtn.current.context._errors.length === 0)

        if (checkBtn.current.context._errors.length === 0) {
            console.log('ok')
            AuthService.login(usernameOrEmail, password)
                .then( (res) => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    // console.log(error.data)
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="usernameOrEmail">UsernameOrEmail</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="usernameOrEmail"
                            value={usernameOrEmail}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                    <div className="social-login">
                        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                            <img src={googleLogo} alt="Google" /> Log in with Google</a>
                        <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                            <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                            <img src={githubLogo} alt="Github" /> Log in with Github</a>
                    </div>



                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Login;