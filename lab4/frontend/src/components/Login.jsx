import './App.css';
import {UsernameInput, PasswordInput} from "./login-components";
import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { userLogin } from '../actions/actions';
import { authenticate } from '../services/loginService';


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let register = e.nativeEvent.submitter.value === "register"

        try {
            const { username: usernameField, password: passwordField } = e.target;
            const registerData = await  authenticate(usernameField.value, passwordField.value, register);

            if (!(registerData).jwt) {
                throw new Error((registerData).message)
            }

            console.log("1")

            dispatch(userLogin({jwt: (registerData).jwt}))
            navigate('/main');

        } catch (error) {
            setErrorMessage(error.message);

            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        }
    };

    return (
        <div>
            <div className="enclosing">
                <div id="header-enclosing">
                    <h1>Vérification du point 4</h1>
                    <p>Prenom: Diveyev Daniil Andreevich</p>
                    <p>Groupe: P3225</p>
                    <p>Variante: 861574</p>
                </div>
            </div>

            <div id="form-enclosing" className="enclosing" onSubmit={handleSubmit}>
                <form>
                    <UsernameInput />
                    <PasswordInput />

                    <div id="error-message" className="enclosing">
                        {errorMessage}
                    </div>

                    <div className="enclosing">
                        <button id="login-submit-button" value="login">Connecter</button>
                        <button id="signup-submit-button" value="register">Inscrire</button>
                    </div>
                </form>
            </div>

            <div className="enclosing" id="footer-enclosing">
                <footer>
                    <p>&copy; 2023 Diveyev Daniil</p>
                </footer>
            </div>
        </div>
    )
}