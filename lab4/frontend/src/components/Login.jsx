import './App.css';
import {UsernameInput, PasswordInput} from "./login-components";
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { userLogin } from '../actions/actions';
import { login } from '../services/loginService';
//import {getUsername} from './redux/actions'


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = login(e.target.username.value, e.target.password.value);
            dispatch(userLogin(user))

            navigate('/main');

        } catch (error) {
            setErrorMessage("Invalid username or password")

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
                    {UsernameInput()}
                    {PasswordInput()}

                    <div id="error-message" className="enclosing">
                        {errorMessage}
                    </div>

                    <div className="enclosing">
                        <button id="login-submit-button">Connecter</button>
                        <button id="signup-submit-button">Inscrire</button>
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