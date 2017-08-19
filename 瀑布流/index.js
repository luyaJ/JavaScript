function createDiv() {
    for(var i=0 ; i<20 ; i++){
        var div = document.createElement('div');
        var high = Math.floor(Math.random()*350 + 50); //随机产生50~350px
        div.style.height = high + 'px';
        div.innerHTML = i;
        document.body.appendChild(div);
    }
    change();
}

function change(){
    var aDiv = document.getElementsByTagName('div');
    var windowCW = document.documentElement.clientWidth;
    // console.log(windowCW);   //windowCW = 1581px
    var n = Math.floor(windowCW / 210); //1581/210 = 7.5,所以 n = 7;
    if(n <= 0){
        return;
    }
    var center = (windowCW - n * 210) / 2; //居中,(1581-7*210)/2=55.5
    var arrH = []; //定义一个数组用来存放div高度
    for(var i=0 ; i<aDiv.length ; i++){ //i<20
        var j = i % n; //j=0%7=0
        if(arrH.length == n){ //一行排满后换行
            var min = findMin(arrH); //从最矮的排起
            aDiv[i].style.left = center + min * 210 + 'px';
            aDiv[i].style.top = arrH[min] + 10 + 'px';
            arrH[min] += aDiv[i].offsetHeight + 10;
        } else {
            arrH[j] = aDiv[i].offsetHeight;
            aDiv[i].style.left = center + 200*j+10*j + 'px';
            aDiv[i].style.top = 0;
        }
    }
}

window.onresize = function () {
    change();
}

window.onscroll = function () {
    var windowHeight = document.documentElement.clientHeight; //可视区高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的高度
    var scrollH = document.body.scrollHeight;
    if(scrollTop + windowHeight >= scrollH){
        createDiv();
    }
}

function findMin(arr) {
    var m = 0 ;
    for(var i=0 ; i<arr.length ; i++){
        m = Math.min(arr[m],arr[i]) == arr[m] ? m : i;
    }
    return m;
}

createDiv();