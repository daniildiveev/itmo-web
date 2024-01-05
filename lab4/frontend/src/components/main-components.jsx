import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {setR} from "../actions/actions";

const xValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
const rValues = [1, 2, 3, 4]

const XButtons = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleButtonClick = (value) => {
        setSelectedValue(value);
    };

    return (
        <div id="x-buttons" className="enclosing">
            X:
            {xValues.map((button, i) => (
                <button
                    type="button"
                    name="x"
                    key={i}
                    value={i - 4}
                    className={selectedValue === i - 4 ? 'selected-button' : null}
                    onClick={() => handleButtonClick(i - 4)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

const RButtons = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const dispatch = useDispatch();

    const handleButtonClick = (value) => {
        dispatch(setR(value));
        setSelectedValue(value);
    };

    return (
        <div id="r-buttons" className="enclosing">
            R:
            {rValues.map((button, i) => (
                <button
                    type="button"
                    name="r"
                    key={i}
                    value={i + 1}
                    className={selectedValue === i + 1 ? 'selected-button' : null}
                    onClick={() => handleButtonClick(i + 1)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

const YInput = () => {
    return (
        <div id="y-input-enclosing" className="enclosing">
            <label htmlFor="y-input">Y:</label>
            <input id="y-input" type="text" name="y" inputMode="numeric" />
        </div>
    );
};

export { XButtons, YInput, RButtons};
