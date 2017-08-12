window.onload = function () {
    showTime();
}

function showTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var week = date.getDay();
    var weekday = new Array(7);
    weekday[0] = "星期天";
    weekday[1] = "星期一";
    weekday[2] = "星期二";
    weekday[3] = "星期三";
    weekday[4] = "星期四";
    weekday[5] = "星期五";
    weekday[6] = "星期六";
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    minute = checkTime(minute);
    seconds = checkTime(seconds);

    document.getElementById("show").innerHTML = y + "年" + m + "月" + d + "日 " + weekday[week] + "\t" + hour + ":" + minute + ":" + seconds;
    setTimeout(function () {
        showTime();
    },500);
}

function checkTime(i){
    if(i<10){
        i = "0" + i;
    }
        return i;
}

