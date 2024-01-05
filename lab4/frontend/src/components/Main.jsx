import './App.css';
import {Logo} from "./Svg";
import {XButtons, YInput, RButtons} from "./main-components";
import {useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../actions/actions";
import {useNavigate} from "react-router-dom";

export const Main = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const credentials = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(credentials);

    const logOut = () => {
        dispatch(userLogout())
        navigate("/");
    }

    const validate = (x, y, r) => {
        if (isNaN(y)){
            setErrorMessage("Y doit un flotteur valide");
            return false;
        }

        if (y === "") {
            setErrorMessage("Vous devez spécifier Y")
        }

        y = parseFloat(y)

        if (y < -5 || y > 3) {
            setErrorMessage("Y doit être dans la plage [-5; 3]");
            return false;
        }

        if (x == null) {
            setErrorMessage("Vous devez spécifier X")
            return false;
        }

        if (r == null) {
            setErrorMessage("Vous devez spécifier R")
            return false;
        }

        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let x = null, y, r = null;

        const rData = event.target.r;
        const xData = event.target.x;

        for (let i=0; i < rData.length; i++) {
            let buttonClasses = Array.from(rData[i].classList)

            if (buttonClasses.includes("selected-button")) {
                r = rData[i].value;
            }
        }

        for (let i=0; i < xData.length; i++) {
            let buttonClasses = Array.from(xData[i].classList)

            if (buttonClasses.includes("selected-button")) {
                x = xData[i].value;
            }
        }

        y = event.target.y.value;
        let validation = validate(x, y, r)

        if(!validation){
            setTimeout(() => {
                setErrorMessage("");
            }, 2000)
        }
    }
    if (credentials.isAuthenticated) {
        return (<div>
                <div id="user">
                    <div>
                        User: {credentials.user.username}
                    </div>
                    <div id="logout-button-enclosing">
                        <button onClick={logOut} type="button" id="logout-button">Sortir</button>
                    </div>
                </div>
                <div className="enclosing">
                    <div id="header-enclosing">
                        <h1>Vérification du point 4</h1>
                        <p>Prenom: Diveyev Daniil Andreevich</p>
                        <p>Groupe: P3225</p>
                        <p>Variante: 861574</p>
                    </div>
                </div>

                <div id="form-and-canvas-and-error-enclosing" className="enclosing">
                    <div id="form-and-error-enclosing" className="enclosing">
                        <form onSubmit={handleSubmit}>
                            {XButtons()}
                            {YInput()}
                            {RButtons()}

                            <div id="error-enclosing" className="enclosing">
                                {errorMessage}
                            </div>

                            <div id="submit-button-enclosing" className="enclosing">
                                <button id="submit-button" type="submit">Envoyer</button>
                            </div>
                        </form>
                    </div>

                    {Logo()}
                </div>

                <div className="enclosing" id="footer-enclosing">
                    <footer>
                        <p>&copy; 2023 Diveyev Daniil</p>
                    </footer>
                </div>
            </div>
        );
    } else {
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

                <div id="not-logged-in" className="enclosing">
                    <h1>You are not logged in!</h1>
                </div>

                <div id="logout-button-enclosing" className="enclosing">
                    <button onClick={logOut} type="button" id="logout-button">Login</button>
                </div>

                <div className="enclosing" id="footer-enclosing">
                    <footer>
                        <p>&copy; 2023 Diveyev Daniil</p>
                    </footer>
                </div>
        </div>
        )
    }
}