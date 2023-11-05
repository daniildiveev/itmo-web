<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
                    <option value=""></option>
                </select>
            </div>

            <div id="submit-enclosing" class="enclosing">
                <input type="button" id="submit-results" value="Проверить"/>
            </div>
        </form>

        <div id="error-message"></div>
    </div>


    <div id="plotArea" onclick="handleImageClick(event)">
        <img src="lab2_graph.svg" alt="Plot Image" id="plotImage">
    </div>
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
            newButton.addEventListener('click', function() {
                selectButton(this);
            });
            newButton.value = (-2 + i * 0.5).toString();

            xButtons.append(newButton);
        }
    })

    function handleImageClick(event) {
        const rSelect = document.getElementById("r-select");

        let selectedR = rSelect.value;

        if (selectedR.trim() !== "") {
            selectedR = parseFloat(selectedR);

            const plotImage = document.getElementById('plotImage');
            const imageRect = plotImage.getBoundingClientRect();

            let mouseX = event.clientX - imageRect.left - 200;
            let mouseY = event.clientY - imageRect.top - 200;

            const scaleValue = 400 / (2.5 * selectedR);

            mouseX = mouseX / scaleValue;
            mouseY = mouseY / scaleValue;

            sendRequest(mouseX, mouseY, selectedR);
        } else {
            const errorTag = document.getElementById("error-message");
            errorTag.innerHTML = "R not set!";

            setTimeout(() => {
                errorTag.innerHTML = "";
            }, 3000);
        }
    }

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
        }).then(data => data.json())
            .then(data=>console.log(data))
            .catch(error => {
                console.error('error: ', error);
            })
    }

    function validate() {
        const x = getX();
        const y = parseFloat(document.getElementById("y").value);
        const r = parseFloat(document.getElementById("r-select").value);

        sendRequest(x, y, r);
    }

    document.getElementById("submit-results").onclick = validate;

</script>
</body>
</html>
