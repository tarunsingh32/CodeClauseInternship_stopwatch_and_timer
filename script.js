$(".stopwatch-btn").click(function() {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show stopwatch wrapper
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

$(".back-btn").click(function() {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".clock").slideDown();
    //update type text
    $(".type").html("Clock");
});

$(".timer-btn").click(function() {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show stopwatch wrapper
    $(".timer").slideDown();
    //update type text
    $(".type").html("Timer");
});

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
}

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    // converting 24 hours to 12
    hours = hours % 12 || 12;

    //add trailing zeros if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

//call the function on page load
updateTime();

//call function after second
setInterval(updateTime, 1000);


//Stopwatch

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => {
    //increase milisecond by one
    stopwatchMiliseconds++;
    
    if(stopwatchMiliseconds === 100){
        //if stopwatch milisecond equals 100 increase one second and set as 0
        stopwatchSeconds++;
        stopwatchMiliseconds = 0;
    }

    if(stopwatchSeconds === 60){
        //same with minutes
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60 ){
        //same with hours
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    //show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliseconds));


};   

//function to start stopwatch
const startStopwatch = () => {
    if (!stopwatchRunning){
        //if stopwatch not already running
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};

//function to stop stopwatch
const stopStopwatch = () => {
    clearInterval(stopStopwatchInterval);
    stopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () => {
    //clear interval and set all values to default
    clearInterval(stopwatchInterval);

    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    laps = 0;

    //update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
  };
  
//start stopwatch on start button
$(".start-stopwatch").click(function(){
    startStopwatch();
    //hide start button and show lap button
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function(){
    resetStopwatch();
    //hide lap button and show start button
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
    $(".laps").html("");
});

$(".lap-stopwatch").click(function(){
    //on lap button click
    laps++;
    //remove active class 
    $(".lap").removeClass("active");
    $(".laps").prepend(
      `  <div class="lap active">
            <p>lap ${laps}</p>
            <p>
               ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} 
               : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliseconds)}
            </p>
        </div>
        `
    );
});

//Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerRunning = false,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    //convert time to seconds
    time = time * 60;
    //update timer defaults
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);
    timerMiliseconds = 0;

    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

}

 const timer = () => {
    timerMiliseconds--;
    if (timerMiliseconds === -1){
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if (timerSeconds === -1){
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes === -1){
        timerMinutes = 59;
        timerHours--;
    }

    //update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

    //check timeup on every interval
    timeUp();
 };

 const startTimer = () => {
    //before starting check if valid time given
    if (timerHours === 0 && timerMinutes === 0
         && timerSeconds === 0 && timerMiliseconds === 0){
       // if all values are zero get time
       getTime() ;
    } else {
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
 };

 const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
 };

 const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
 };

 //check if time remaining 0
 const timeUp = () => {
    if(
       timerHours === 0 && 
       timerMinutes === 0 &&
       timerSeconds === 0 &&
       timerMiliseconds === 0
    ){
        resetTimer();
        alert("Time's up");
    }
 };

$(".start-timer").click(function(){
    startTimer();
});

$(".stop-timer").click(function(){
    stopTimer();
});

$(".reset-timer").click(function(){
    resetTimer();
})



