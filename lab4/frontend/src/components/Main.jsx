import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../actions/actions";
import {useNavigate} from "react-router-dom";
import {FormAndCanvas} from "./FormAndCanvas";
import {Footer, Header} from "./main-components";
import {Table} from "./Table";

export const Main = () => {
    const credentials = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const previousPoints  = useSelector(state => state.points.points);

    const logOut = () => {
        dispatch(userLogout())
        localStorage.clear();
        navigate("/");
    }

    if (credentials.isAuthenticated) {
        return (
            <div>
                <div id="user">
                    <div id="logout-button-enclosing">
                        <button onClick={logOut} type="button" id="logout-button">Sortir</button>
                    </div>
                </div>
                <Header />

                <FormAndCanvas />

                <Table points={previousPoints} />

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