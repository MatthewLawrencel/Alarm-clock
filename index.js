const display = document.getElementById('clock');


// setting audio for alarm
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // stored alarms



// Rings the audio on time
function ringing(now){
    audio.play();
    alert(`Times up! ${now}`)
}


// update time every second 
function updateTime() {
    var today = new Date();
    var hour = formatTime((today.getHours()-12));
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    
    let currentDate = new Date();
     let AM_PM = currentDate.toLocaleTimeString();
     console.log(AM_PM); 

    //display.innerText=`${hour}:${minutes}:${seconds}`;
    
    display.innerText=AM_PM;
    console.log(alarmList[0],AM_PM);
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called and the audio will ring
    if(alarmList.includes(AM_PM) ){
        ringing(AM_PM);
    } 
}


// set the correct format of time
function formatTime(time) {
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === ''){
        new_h = '00'
    }
    if(new_h <10){
        new_h = `${new_h}`
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === ''){
        new_m = '00'
    }
    if(new_m <10){
        new_m = `${new_m}`
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === ''){
        new_s = '00'
    }
    if(new_s <10){
        new_s = `${new_s}`
    }
    let new_AM=formatTime(addAlarm.ampm.value);
    console.log(new_AM);

    
    const newAlarm = `${new_h}:${new_m}:${new_s} ${new_AM}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);

