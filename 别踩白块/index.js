
var clock = null;
var speed = 4;

//根据id来get Dom元素
function $(id) {
    return document.getElementById(id);
}

//初始化
function init() {
    for(var i=0 ; i<4 ; i++){
        createRow();
    }
    $('main').onclick = function (ev) {
        judge(ev);
    };
    clock = window.setInterval('move()',30);
}

//判断用户是否点击到了黑块
function judge(ev) {
    if(ev.target.className.indexOf('green') === -1){
        var pass;
        pass;
    } else {
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1;  //定义属性pass，表明此行row的黑块已经被点击
        score();
    }
}

//创建div
function createDiv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

//创建row并且有四个节点cell
function createRow() {
    var con = $('con');
    var row = createDiv('row'); //创建div className=row
    var arr = creatcell(); //定义div cell的类名,其中一个为cell black

    con.appendChild(row); // 添加row为con的子节点

    for(var i = 0; i < 4; i++){
        row.appendChild(createDiv(arr[i])); //添加row的子节点 cell
    }

    if(con.firstChild == null){
        con.appendChild(row);
    }else{
        con.insertBefore(row, con.firstChild);
    }
}

//随机生成黑块的位置
function creatcell() {
    var temp = ['cell','cell','cell','cell',];
    var location = Math.floor(Math.random() * 4);
    temp[location] = 'cell green';
    return temp;
}

//使黑块向下移动
function move() {
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con,null)['top']);

    if(speed + top > 0){
        top = 0;
    } else {
        top += speed;
    }
    con.style.top = top + 'px';

    if(top === 0){
        createRow();
        con.style.top = '-100px';
        delrow();
    } else if(top == (-100 + speed)){
        var rows = con.childNodes;
        if((rows.length == 5) && (rows[rows.length - 1].pass !== 1)){
            fail();
        }
    }
}

function fail() {
    clearInterval(clock);
    confirm('你最终的得分是： ' + parseInt($('score').innerHTML));
}

//加速函数
function speedUp() {
    speed += 1;
    if(speed == 20){
        alert('你超神了');
    }
}

//删除con节点的最后那个row
function delrow() {
    var con = $('con');
    if(con.childNodes.length == 6){
        con.removeClass(con.lastElementChild);
    }
}

//计分
function score(){
    var newscore = parseInt($('score').innerHTML) + 1;
    $('score').innerHTML = newscore;
    if(newscore % 10 == 0){
        speedUp();
    }
}

function start() {
    clearInterval(clock);
    init();
}



