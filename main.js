function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}
function dateString(timeZone) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    if (timeZone === "OCE") {
        today = convertTZ(new Date(), "Australia/Melbourne");
    } else if (timeZone === "EU") {
        today = convertTZ(new Date(), "Europe/Oslo");
    }
    return {
        day: days[today.getDay()],
        month: months[today.getMonth()],
        dayNum: today.getDate()
    }
};

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function startTime() {
    var today = convertTZ(new Date(), "Europe/Oslo");
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('EUclock').innerHTML =
        h + ":" + m + ":" + s;
    setTimeout(startTime, 500);
}
startTime();

function startTimMelb() {
    var today = convertTZ(new Date(), "Australia/Melbourne");

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('OCEclock').innerHTML =
        h + ":" + m // + ":" + s;
    setTimeout(startTimMelb, 500);
}
startTimMelb();


var week = getWeekNumber(new Date());
var OCEweek = getWeekNumber(convertTZ(new Date(), "Australia/Melbourne"));
var EUdate = dateString("EU");
var OCEdate = dateString("OCE");

document.getElementById('EUdate').innerHTML = `${EUdate.month} ${EUdate.dayNum}`
document.getElementById('OCEdate').innerHTML = `${OCEdate.month} ${OCEdate.dayNum}`
document.getElementById('EUweek').innerHTML = 'Week ' + week[1];
document.getElementById('OCEweek').innerHTML = 'Week ' + OCEweek[1];

// weather api
// melbourne weather
fetch('https://api.openweathermap.org/data/2.5/weather?q=Keysborough,AU&appid=' + weaterApiKey + '&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('OCEweather').innerHTML = `${data.weather[0].description} ${Math.round(data.main.temp)}°C`;
    })
    .catch(error => console.error('Error fetching weather data:', error));

// trondheim weather
fetch('https://api.openweathermap.org/data/2.5/weather?q=Trondheim,NO&appid=' + weaterApiKey + '&units=metric')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        document.getElementById('EUweather').innerHTML = `${data.weather[0].description} ${Math.round(data.main.temp)}°C`;
    })
    .catch(error => console.error('Error fetching weather data:', error));


// noise generated
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawNoise() {
    ctx.fillStyle = 'rgba(20, 20, 21, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        //ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    requestAnimationFrame(drawNoise);
}
drawNoise();