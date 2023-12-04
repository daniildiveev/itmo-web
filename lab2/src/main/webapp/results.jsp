<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <h1>Проверка точки</h1>
    <p>ФИО: Дивеев Даниил Андреевич</p>
    <p>Группа: P3225</p>
    <p>Вариант: 861206</p>
</header>
<div id="result-div" class="enclosing">
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
            <tr>
                <td>${resultRow.getX()}</td>
                <td>${resultRow.getY()}</td>
                <td>${resultRow.getR()}</td>
                <td>${resultRow.getHit()}</td>
                <td>${resultRow.getTimestamp()}</td>
                <td>${resultRow.getExecutionTime()}</td>

            </tr>
        </tbody>
    </table>
</div>
<div id="button-enclosing" class="enclosing">
    <input type="button" id="return-button" value="Вернуться"/>
</div>

<div class="enclosing" id="footer-enclosing">
    <footer>
        <p>&copy; 2023 Даниил Дивеев</p>
    </footer>
</div>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const returnButton = document.getElementById("return-button");
        returnButton.onclick = () => {
            window.location.href = "index.jsp";
        }
    })
</script>
</body>
</html>
