const clock = document.getElementById("clock");
const cronometer = document.getElementById("cronometer");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");

const lapList = document.getElementById("lapList");

let isWorking = false;
let totalSecond = 0;
let cronometerInterval;
let lapAmount = 0;

function updateClock() {
    const now = new Date();

    let hour = String(now.getHours()).padStart(2, "0");
    let minute = String(now.getMinutes()).padStart(2, "0");
    let second = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${hour}:${minute}:${second}`;
}

updateClock();
setInterval(updateClock, 1000);

function updateCronometer() {
    totalSecond++;

    let hour = String(Math.floor(totalSecond / 3600)).padStart(2, "0");
    let minute = String(Math.floor((totalSecond % 3600) / 60)).padStart(2, "0");
    let second = String(totalSecond % 60).padStart(2, "0");

    cronometer.textContent = `${hour}:${minute}:${second}`;
}

start.addEventListener("click", function () {
    if (!isWorking) {
        cronometerInterval = setInterval(updateCronometer, 1000);
        isWorking = true;
    }
});

stop.addEventListener("click", function () {
    clearInterval(cronometerInterval);
    isWorking = false;
});

reset.addEventListener("click", function () {
    clearInterval(cronometerInterval);

    totalSecond = 0;
    isWorking = false;

    cronometer.textContent = "00:00:00";

    lapList.innerHTML = "";
    lapAmount = 0;
});

lap.addEventListener("click", function () {
    if (isWorking) {
        lapAmount++;

        const newLap = document.createElement("li");
        newLap.textContent = `${lapAmount}. lap - ${cronometer.textContent}`;

        lapList.appendChild(newLap);
    }
});