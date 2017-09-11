window.onload = function(){
    //图片选中 不会出现蓝色效果
    document.onselectstart = new Function('event.returnValue = false;');

    //图片拖拽功能 要引入两个jquery文件
    $("#main").draggable({ containment: 'parent' ,drag: setChoice});

    var rightDiv = document.getElementById('right');
    var upDiv = document.getElementById('up');
    var leftDiv = document.getElementById('left');
    var downDiv = document.getElementById('down');
    var leftUpDiv = document.getElementById('left-up');
    var rightUpDiv = document.getElementById('right-up');
    var rightDownDiv = document.getElementById('right-down');
    var leftDownDiv = document.getElementById('left-down');

    var mainDiv = document.getElementById('main');
    var ifKeyDown = false; //鼠标按下状态
    var contact = ""; //表示被按下的触点

    //鼠标按下事件
    rightDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "right";
    };
    upDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "up";
    };
    leftDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "left";
    };
    downDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "down";
    };
    leftUpDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "left-up";
    };
    rightUpDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "right-up";
    };
    rightDownDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "right-down";
    };
    leftDownDiv.onmousedown = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        ifKeyDown = true;
        contact = "left-down";
    };

    //鼠标松开事件
    window.onmouseup = function () {
        ifKeyDown = false;
    };

    //鼠标移动事件
    window.onmousemove = function(e){
        if(ifKeyDown == true){
            switch(contact){
                case "right":
                    rightMove(e); break;
                case "up":
                    upMove(e); break;
                case "left":
                    leftMove(e); break;
                case "down":
                    downMove(e); break;
                case "left-up":
                    leftMove(e);
                    upMove(e); break;
                case "right-up":
                    rightMove(e);
                    upMove(e); break;
                case "right-down":
                    rightMove(e);
                    downMove(e); break;
                case "left-down":
                    leftMove(e);
                    downMove(e); break;
                default:
            }
            // if(contact == "right"){
            //     rightMove(e);
            // } else if(contact == "up"){
            //     upMove(e);
            // } else if(contact == "left"){
            //     leftMove(e);
            // } else if(contact == "down"){
            //     downMove(e);
            // } else if(contact == "left-up"){
            //     leftMove(e);
            //     upMove(e);
            // } else if(contact == "right-up"){
            //     rightMove(e);
            //     upMove(e);
            // } else if(contact == "right-down"){
            //     rightMove(e);
            //     downMove(e);
            // } else if(contact == "left-down") {
            //     leftMove(e);
            //     downMove(e);
            // }
        }
        setChoice();
        setPreview();
    };

    //右边移动
    function rightMove(e) {
        var x = e.clientX; //鼠标x坐标
        var addWidth = ''; //鼠标移动后选取框增加的宽度
        var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
        addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加的宽度
        mainDiv.style.width = addWidth + widthBefore + 'px'; //选取框变化后宽度
    }

    //上边移动
    function upMove(e) {
        var y = e.clientY; //鼠标纵坐标
        var mainY = getPosition(mainDiv).top; //选取框相对于屏幕上边的距离
        var addHeight = mainY - y; //增加的高度
        var heightBefore = mainDiv.offsetHeight - 2; //原来的高度
        mainDiv.style.height = heightBefore + addHeight + 'px';
        mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px';
    }

    //左边移动
    function leftMove(e) {
        var x = e.clientX; //鼠标x坐标
        var mainX = getPosition(mainDiv).left;
        var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
        var addWidth = mainX - x; //增加的宽度
        mainDiv.style.width = widthBefore + addWidth + 'px';
        mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px';
    }

    //下边移动
    function downMove(e) {
        var y = e.clientY;
        var heightBefore = mainDiv.offsetHeight - 2;
        var mainY = getPosition(mainDiv).top;
        var addHeight = y - heightBefore - mainY; //增加的高度
        mainDiv.style.height = addHeight + heightBefore + "px";
    }

    //获取元素相对于屏幕左边的距离 利用offsetLeft
    function getPosition(node){
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while(parent != null){
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {"left":left,"top":top};
    }

    //设置选取区域高亮可见
    function setChoice() {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var img2 = document.getElementById('img2');
        img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    }

    //图片预览
    function setPreview() {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var img3 = document.getElementById('img3');
        img3.style.top = -top + "px";
        img3.style.left = -left + "px"; //style.top和style.left使得图片3固定在左上方
        img3.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";

    }

};


