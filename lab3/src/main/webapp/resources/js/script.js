setInterval(() => {
    const timeDiv = document.getElementById("time-enclosing")
    let currentDate = new Date();
    timeDiv.innerHTML = "Last Sync: " + currentDate.getDate() + "/"
        + (currentDate.getMonth()+1)  + "/"
        + currentDate.getFullYear() + " @ "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds();
}, 1000)