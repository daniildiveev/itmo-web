import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../actions/actions";
import {useNavigate} from "react-router-dom";
import {FormAndCanvas} from "./FormAndCanvas";
import {Footer, Header} from "./main-components";

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
        return (
            <div>
                <div id="user">
                    <div>
                        User: {credentials.user.username}
                    </div>
                    <div id="logout-button-enclosing">
                        <button onClick={logOut} type="button" id="logout-button">Sortir</button>
                    </div>
                </div>
                <Header />

                <FormAndCanvas />

                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Header />

                <div id="not-logged-in" className="enclosing">
                    <h1>You are not logged in!</h1>
                </div>

                <div id="logout-button-enclosing" className="enclosing">
                    <button onClick={logOut} type="button" id="logout-button">Login</button>
                </div>

                <Footer/>
        </div>
        )
    }
}