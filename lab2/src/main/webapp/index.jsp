<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
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
            <label for="x">X</label>

            <div id="x-buttons"></div>

            <br>

            <label for="y">Y (от -3 до 5):</label>
            <br>
            <input id="y" name="y" step="0.01" required>

            <br>

            <label for="r">R</label>
            <select name="r" id="r-select">
                <option value=""></option>
            </select>

            <br>

            <input type="button" id="submit-results" value="Проверить"/>
        </form>

        <div id="error-message"></div>
    </div>


    <div id="plotArea" onclick="handleImageClick(event)">
        <img src="../resources/lab2_graph.png" alt="Plot Image" id="plotImage">
    </div>
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

        const selectedR = rSelect.value;

        if (selectedR.trim() !== "") {
            const plotImage = document.getElementById('plotImage');
            const imageRect = plotImage.getBoundingClientRect();

            let mouseX = event.clientX - imageRect.left - 150;
            let mouseY = event.clientY - imageRect.top - 150;

            const scaleValue = 300 / (2.5 * selectedR);

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

        console.log(x, y, r);
        sendRequest(x, y, r);
    }

    document.getElementById("submit-results").onclick = validate;

</script>

<style>
    #header {
        display: flex;
        justify-content: space-evenly;
    }

    .selected-button {
        background-color: #3498db;
        color: #fff;
    }

    .selectable-button {
        padding: 10px 20px;
        margin: 5px;
        border: none;
    }


    header {
        text-align: center;
    }

    #form-and-canvas-and-error-encloser {
        display: flex;
        justify-content: space-evenly;
        height: 300px;
    }

    form {
        border: 3px;
        border-color: black;
        background-color: aquamarine;
        border-radius: 10px;
    }

    #x-buttons {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    #plotArea {
        position: relative;
    }

    #plotImage {
        width: 300px; /* Установите размеры по вашему усмотрению */
        height: 300px; /* Установите размеры по вашему усмотрению */
    }

</style>
</body>
</html>
