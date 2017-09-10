window.onload = function(){

    var rightDiv = document.getElementById('right');
    //鼠标移动事件
    window.onmousemove = function(e){

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

}