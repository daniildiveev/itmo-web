document.addEventListener("DOMContentLoaded", () => {
    const rSelect = document.getElementById("r-select");

    for (let i = 0; i < 5; i++) {
        let newOption = document.createElement("option");
        newOption.value = (1 + i * 0.5).toString();
        newOption.innerHTML = (1 + i * 0.5).toString();

        rSelect.append(newOption);
    }

    const xButtons = document.getElementById("x-buttons");

    for (let i = 0; i < 9; i++) {
        let newButton = document.createElement("input")
        newButton.type = "button";
        newButton.name = "x";
        newButton.classList = "selectable-button";
        newButton.addEventListener('click', function () {
            selectButton(this);
        });
        newButton.value = (-2 + i * 0.5).toString();

        xButtons.append(newButton);
    }

    const svg = document.getElementById("svg-container")
    svg.addEventListener("click", function (event) {
        const point = svg.createSVGPoint();
        const boundary = svg.getBoundingClientRect();
        point.x = event.clientX - boundary.left;
        point.y = event.clientY - boundary.bottom;

        console.log(point.x, point.y);

        // You can adjust the circle attributes (e.g., radius and color)
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 3); // Radius of the circle
        circle.setAttribute("fill", "red"); // Circle color
        svg.appendChild(circle);

        const rSelect = document.getElementById("r-select");
        let selectedR = rSelect.value;

        if (selectedR.trim() !== "") {
            selectedR = parseFloat(selectedR);

            const scaleValue = 150 / (1.5 * selectedR);

            let scaledX = (point.x - 150) / scaleValue;
            let scaledY = (-point.y - 150) / scaleValue;

            console.log(scaledX, scaledY)

            sendRequest(scaledX, scaledY, selectedR);
        } else {
            raiseParameterError("R is not set!");
        }
    })
})

function selectButton(button) {
    const buttons = document.querySelectorAll('.selectable-button');
    buttons.forEach(button => button.classList.remove('selected-button'));

    button.classList.add('selected-button');
    x = parseFloat(button.value);
}

function getX() {
    const button = document.querySelectorAll('.selected-button')[0];

    return parseFloat(button.value);
}

function sendRequest(x, y, r) {
    const url = `/lab2-1.0-SNAPSHOT/controller?x=` + x + `&y=` + y + `&r=` + r;

    console.log(x, y, r);

    fetch(url, {
        method: "POST",
    })
        .then(data=> {
            console.log(data)
            return data
        })
        .then(data => {
            window.location.href = "results.jsp"
        })
        .catch(error => {
            console.error('error: ', error);
        })
}

function validate() {
    const x = getX();
    const y = parseFloat(document.getElementById("y").value);
    const r = parseFloat(document.getElementById("r-select").value);

    if (!isNaN(x) && !isNaN(y) &&!isNaN(y)) {
        if ((y >= -3) && (y <=5)){
            sendRequest(x, y, r);
        } else {
            raiseParameterError("Y must float in range [-3, 5]");
        }
    } else {
        raiseParameterError("Some parameters are not a number");
    }
}

function raiseParameterError(message){
    const errorTag = document.getElementById("error-message");
    errorTag.innerHTML = message;

    setTimeout(() => {
        errorTag.innerHTML = "";
    }, 3000);
}

document.getElementById("submit-results").onclick = validate;
