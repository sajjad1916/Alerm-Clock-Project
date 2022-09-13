const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const alarmBtn = document.querySelector('button');
let content = document.querySelector('.content');

let alarmTime, isAlarmSet = false,
ringtone = new Audio('Calling-Santa.mp3') ;

for(let i=12; i>0; i--){
    i = i < 10 ? "0" + i : i;
    let option =   `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59; i>=0; i--){
    i = i < 10 ? "0" + i : i;
    let option =   `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2; i>0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option =   `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() => {
    // getting hour, mins, secs
    let date = new Date();
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if( h>= 12){
        h = h-12;
        ampm = "PM"
    }
    
    // if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;
    // adding 0 before hr, min, sec if this value is less than 10 
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    
    currentTime.innerHTML = (`${h} : ${m} : ${s} : ${ampm}`)
    if(alarmTime == `${h}:${m}:${ampm}`){
        console.log("Alarm ringing....")
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);

function setAlarm(){
    if(isAlarmSet) {  // working if isAlarmSet is true
        alarmTime = ""; 
        ringtone.pause();
        content.classList.remove("disable");
        alarmBtn.innerText = "Set Alarm"
        return isAlarmSet = false;
    }
    // getting hour, minute and ampm time
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`
    
    // validate if correct time is selected
    if(time.includes("Hour") ||time.includes("Minute") ||time.includes("AM/PM")  ){
        return alert("Please, select a valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    alarmBtn.innerText = "Clear Alarm"


    
}

alarmBtn.addEventListener('click', setAlarm);