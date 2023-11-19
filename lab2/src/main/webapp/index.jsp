<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap">
    <link rel="stylesheet" href="style.css">
</head>
<head>
    <meta charset="UTF-8">
    <title>Проверка точки</title>
</head>
<body>
<div id="header">
    <header>
        <h1>Проверка точки</h1>
        <p>ФИО: Дивеев Даниил Андреевич</p>
        <p>Группа: P3225</p>
        <p>Вариант: 861206</p>
    </header>
</div>

<div id="form-and-canvas-and-error-encloser">
    <div id="form-and-canvas-encloser">
        <form>
            <div id = "x-enclosing" class="enclosing">
                <label for="x">X</label>
                <div id="x-buttons"></div>
            </div>

            <div id="y-enclosing" class = "enclosing">
                <label for="y">Y (от -3 до 5):</label>
                <input id="y" name="y" step="0.01" placeholder="Y input" required>
            </div>

            <div id="r-enclosing" class="enclosing">
                <label for="r">R</label>
                <select name="r" id="r-select">
                    <option value=" "> </option>
                </select>
            </div>

            <div id="error-message" class="enclosing"></div>

            <div id="submit-enclosing" class="enclosing">
                <input type="button" id="submit-results" value="Проверить"/>
            </div>
        </form>
    </div>


    <div id="plotArea" >
        <svg height="300"
             width="300"
             xmlns="http://www.w3.org/2000/svg"
             id="svg-container"
             class="no-select">

            <c:forEach  var="point"
                        items="${resultTable.getHits()}">
                <circle r="3"
                        fill="red"
                        cx="${point.getX() * 100 + 150}"
                        cy="${-point.getY() * 100 + 150}">
                </circle>
            </c:forEach>

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
                     class="svg-arrow"
                     points="150,0 144,15 156,15"
                     stroke="white"
            ></polygon>
            <polygon fill="black"
                     class="svg-arrow"
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
                     fill-opacity="0.1"
                     points="250,150 150,150 150,250 250,250"
                     stroke="blue"
            ></polygon>

            <polygon fill="blue"
                     fill-opacity="0.1"
                     points="50,150 150,150 150,250"
                     stroke="blue"
            ></polygon>

            <path d="M150,100 A50,50 0 0,1 200,150 L150, 150"
                  fill="blue"
                  fill-opacity="0.1"
                  stroke="blue"
            ></path>
        </svg>
    </div>
</div>

<div id="table-enclosing" class="enclosing">
    <table>
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>RESULT</th>
            <th>TIME</th>
            <th>EXECUTION TIME</th>
        </tr>
        </thead>

        <tbody>
            <c:forEach var="row"
                       items="${resultTable.getHits()}">
                <tr>
                    <td>${row.getX()}</td>
                    <td>${row.getY()}</td>
                    <td>${row.getR()}</td>
                    <td>${row.getHit()}</td>
                    <td>${row.getTimestamp()}</td>
                    <td>${row.getExecutionTime()}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<div class="enclosing" id="footer-enclosing">
    <footer>
        <p>&copy; 2023 Даниил Дивеев</p>
    </footer>
</div>

<script>
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

</script>
</body>
</html>
