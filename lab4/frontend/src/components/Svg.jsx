import React, {useEffect, useRef} from "react";
import checkHit from '../utils/utils'
import {useDispatch, useSelector} from "react-redux";
import {addPoint} from "../actions/actions";

export const Logo = () => {
    const svgRef = useRef(null);
    const divSvgRef = useRef(null);
    const dispatch = useDispatch();
    const currentRObject = useSelector(state => state.r) || {r: 1};
    const currentR = currentRObject.r;
    const previousPointsObject = useSelector(state => state.points) || {points: []};
    const previousPoints = previousPointsObject.points;

    console.log(currentR);

    const plot = (x, y, fill) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 3);
        circle.setAttribute("fill", fill);

        svgRef.current.appendChild(circle);
    }

    useEffect(() => {
        if (previousPoints) {
            for (const point of previousPoints) {
                const hit = checkHit(point.x, point.y, point.r / currentR);
                let fill;

                const x = point.x * point.r * point.r * 100 / currentR + 150;
                const y = -point.y * point.r * point.r * 100 / currentR + 150;

                if (hit) {
                    fill = "green";
                } else {
                    fill = "red";
                }

                plot(x, y, fill);
            }
        }
    }, []);

    const handleAddPoint = (x, y, r) => {
        const point = {
            x: x,
            y: y,
            r: r
        }

        dispatch(addPoint(point));
    }

    const handleClick = (event) => {
        const rect = divSvgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let fill;

        const scaleValue = 100 / currentR;

        let scaledX = (x - 150) / scaleValue;
        let scaledY = (-y + 150) / scaleValue;

        const hit = checkHit(scaledX, scaledY, currentR);

        if (hit) {
            fill = "green";
        } else {
            fill = "red"
        }

        plot(x, y, fill);
        handleAddPoint(scaledX, scaledY, currentR);
    };

    return (
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
    );
}