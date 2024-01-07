let points = [];
const SVG_SIZE_HALF = 150;
const SCALE_SIZE = 100;

function redirectToMain() {
    window.href.location = '/lab3-1.0/index.xhtml';
}

function getCurrentTime() {
    let currentDate = new Date();

    let timestamp = "Current Time: " + currentDate.getDate() + "/"
        + (currentDate.getMonth() + 1)  + "/"
        + currentDate.getFullYear() + " @ ";

    if (currentDate.getHours() < 10){
        timestamp += "0";
    }

    timestamp += currentDate.getHours();

    if (currentDate.getMinutes() < 10){
        timestamp += "0";
    }

    timestamp += currentDate.getMinutes();

    if (currentDate.getSeconds() < 10){
        timestamp += "0";
    }

    timestamp += currentDate.getSeconds();

    return timestamp;
}

function raiseErrorForUser(message){
    const errorTag = document.getElementById("error-message");
    errorTag.innerHTML = message;

    setTimeout(() => {
        errorTag.innerHTML = "";
    }, 3000);
}

function checkHit(x, y, R) {
        if (x < 0 && y < 0) {
            return (y > -R) && (x > -R);
        } else if (x > 0 && y < 0) {
            return y > (x / 2 - R / 2);
        } else if (x < 0 && y > 0) {
            return (Math.sqrt(x * x + y * y) < R);
        } else return false;
}

function createCircle(event) {
    const point = svg.createSVGPoint();
    const boundary = svg.getBoundingClientRect();
    point.x = event.clientX - boundary.left;
    point.y = event.clientY - boundary.top;

    const rSelect = document.getElementById("data_form:r-slider");
    let selectedR = rSelect.value;

    if (selectedR.trim() !== '0.0') {
        selectedR = parseFloat(selectedR);

        const scaleValue = 150 / (1.5 * selectedR);

        let scaledX = (point.x - 150) / scaleValue;
        let scaledY = (-point.y + 150) / scaleValue;

        points.push({x: scaledX,
                     y: scaledY,
                     r: selectedR
        })

        pushFromGraph(([{name: "x", value: scaledX},
                        {name: "y", value: scaledY},
                        {name: "r", value: selectedR}
        ]));

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 3);

        if (checkHit(scaledX, scaledY, selectedR)) {
            circle.setAttribute("fill", "green");
        } else {
            circle.setAttribute("fill", "red");
        }

        svg.appendChild(circle);
    } else {
        raiseErrorForUser("R is not set!");
    }
}

function updatePoints() {
    let selectedR = document.getElementById("data_form:r-slider").value;
    selectedR = parseFloat(selectedR);
    const svg = document.getElementById("svg-container");

    if (selectedR !== 0.0){
        if (points) {
            let circles = svg.querySelectorAll('circle');

            circles.forEach(function(circle) {
                circle.remove();
            });
            //вот тут не очень уверен насчет верности логики, провалидируйте, пожалуйста, но вроде норм
            //P.S сейчас 31 декабря и во мне много вина, поэтому ваш свежий взгляд будет очень кстати

            points.forEach((element) => {

                let x = element.x * element.r * element.r * SCALE_SIZE / selectedR + SVG_SIZE_HALF;
                let y = -element.y * element.r * element.r * SCALE_SIZE / selectedR + SVG_SIZE_HALF;

                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", 3);

                if (checkHit(element.x, element.y, selectedR)) {
                    circle.setAttribute("fill", "green");
                } else {
                    circle.setAttribute("fill", "red");
                }

                svg.appendChild(circle);
            })
        }
    }
}