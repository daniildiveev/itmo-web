import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import checkHit from "../utils/utils";
import {addPoint, setDefaultPoints} from "../actions/actions";
import {RButtons, XButtons, YInput} from "./main-components";
import {getAllPoints, sendPoint} from "../services/pointService";

const SCALE_VALUE = 100;
const SVG_SIZE = 150;

export const FormAndCanvas = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const divSvgRef = useRef(null);

    const currentR = useSelector(state => state.r.r);
    const previousPoints = useSelector(state => state.points.points);
    const jwt = useSelector(state => state.auth.jwt);

    const plot = (x, y, fill) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 3);
        circle.setAttribute("fill", fill);

        svgRef.current.appendChild(circle);
    }

    function removeAllPoints(){
        const circles = svgRef.current.querySelectorAll('circle');
        circles.forEach((circle) => circle.remove());
    }

     const plotPrevious = () => {
        if (previousPoints) {
            for (const point of previousPoints) {
                const hit = checkHit(point.x, point.y, point.r * point.r / currentR);
                let fill;

                const x = point.x * point.r * point.r * SCALE_VALUE / currentR + SVG_SIZE;
                const y = -point.y * point.r * point.r  * SCALE_VALUE / currentR + SVG_SIZE;

                if (hit) {
                    fill = "green";
                } else {
                    fill = "red";
                }

                plot(x, y, fill);
            }
        }
    }

    useEffect(() => {
        async function start() {
            dispatch(await setDefaultPoints(jwt));
            plotPrevious();
        }

        start();
    }, [jwt]);

     const handleAddPoint = async (x, y, r) => {
        const newPoint = await sendPoint(x, y, r, jwt);
        dispatch(addPoint(newPoint));
    }

    const handleClick = async (event) => {
        const rect = divSvgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let fill;

        const scaleValue = SCALE_VALUE / currentR;

        let scaledX = (x - SVG_SIZE) / scaleValue;
        let scaledY = (-y + SVG_SIZE) / scaleValue;

        const hit = checkHit(scaledX, scaledY, currentR);

        if (hit) {
            fill = "green";
        } else {
            fill = "red"
        }

        plot(x, y, fill);
        await handleAddPoint(scaledX, scaledY, currentR);
    };

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

    const handleSubmit = async (event) => {
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
        } else {
            const hit = checkHit(x, y, r);
            let fill;

            if (hit) {
                fill = "green";
            } else {
                fill = "red"
            }

            await handleAddPoint(x, y, r);

            x = x * SCALE_VALUE + SVG_SIZE;
            y = -y * SCALE_VALUE + SVG_SIZE;
            plot(x, y, fill);
        }
    }

    return (
        <div id="form-and-canvas-and-error-enclosing" className="enclosing">
            <div id="form-and-error-enclosing" className="enclosing">
                <form onSubmit={handleSubmit}>
                    <XButtons />
                    <YInput />
                    <RButtons
                        remove={removeAllPoints}
                        plotPrevious={plotPrevious}
                    />

                    <div id="error-enclosing" className="enclosing">
                        {errorMessage}
                    </div>

                    <div id="submit-button-enclosing" className="enclosing">
                        <button id="submit-button" type="submit">Envoyer</button>
                    </div>
                </form>
            </div>

            <div id="plotArea" onClick={handleClick} ref={divSvgRef}>
                <svg height="300"
                     width="300"
                     xmlns="http://www.w3.org/2000/svg"
                     id="svg-container"
                     className="no-select"
                     ref={svgRef}>

                    <line stroke="blue"
                          x1="0"
                          x2="300"
                          y1="150"
                          y2="150"
                    ></line>
                    <line stroke="black"
                          x1="150"
                          x2="150"
                          y1="0"
                          y2="300"
                    ></line>
                    <polygon fill="black"
                             className="svg-arrow"
                             points="150,0 144,15 156,15"
                             stroke="white"
                    ></polygon>
                    <polygon fill="black"
                             className="svg-arrow"
                             points="300,150 285,156 285,144"
                             stroke="white"
                    ></polygon>

                    <line stroke="black"
                          x1="200"
                          x2="200"
                          y1="155"
                          y2="145"
                    ></line>
                    <line stroke="black"
                          x1="250"
                          x2="250"
                          y1="155"
                          y2="145"></line>

                    <line stroke="black"
                          x1="50"
                          x2="50"
                          y1="155"
                          y2="145"></line>

                    <line stroke="black"
                          x1="100"
                          x2="100"
                          y1="155"
                          y2="145"></line>

                    <line stroke="black"
                          x1="145"
                          x2="155"
                          y1="100"
                          y2="100"></line>

                    <line stroke="black"
                          x1="145"
                          x2="155"
                          y1="50"
                          y2="50"></line>

                    <line stroke="black"
                          x1="145"
                          x2="155"
                          y1="200"
                          y2="200"></line>

                    <line stroke="black"
                          x1="145"
                          x2="155"
                          y1="250"
                          y2="250"></line>


                    <text fill="black"
                          x="195"
                          y="140"
                    >R/2
                    </text>
                    <text fill="black"
                          x="248"
                          y="140"
                    >R
                    </text>

                    <text fill="black"
                          x="40"
                          y="140"
                    >-R
                    </text>
                    <text fill="black"
                          x="90"
                          y="140"
                    >-R/2
                    </text>

                    <text fill="black"
                          x="160"
                          y="105"
                    >R/2
                    </text>
                    <text fill="black"
                          x="160"
                          y="55"
                    >R
                    </text>

                    <text fill="black"
                          x="160"
                          y="205"
                    >-R/2
                    </text>
                    <text fill="black"
                          x="160"
                          y="255"
                    >-R
                    </text>

                    <text fill="black"
                          x="160"
                          y="10"
                    >Y
                    </text>
                    <text fill="black"
                          x="290"
                          y="140"
                    >X
                    </text>

                    <polygon fill="blue"
                             fillOpacity="0.1"
                             points="150,150 200,150 200,250 150,250"
                             stroke="blue"
                    ></polygon>

                    <polygon fill="blue"
                             fillOpacity="0.1"
                             points="100,150 150,50 150,150"
                             stroke="blue"
                    ></polygon>

                    <path d="M50,150 A100,100 0 0,0 150,250 L150,150 Z"
                          fill="blue"
                          fillOpacity="0.1"
                          stroke="blue"></path>
                </svg>
            </div>
        </div>
    )
}