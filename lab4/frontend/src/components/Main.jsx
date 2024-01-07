import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../actions/actions";
import {useNavigate} from "react-router-dom";
import {FormAndCanvas} from "./FormAndCanvas";

export const Main = () => {
    const credentials = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        dispatch(userLogout())
        navigate("/");
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

                <FormAndCanvas />

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