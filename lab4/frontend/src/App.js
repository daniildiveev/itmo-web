import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login';
import {Main} from './components/Main';
import {Provider} from "react-redux";
import store from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

const persister = persistStore(store);

const App = () => {
    return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </Router>
        </PersistGate>
    </Provider>
    );
};

export default App;